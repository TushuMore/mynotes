"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useEffect, useState } from "react";

// Icons import
import { IoPersonCircle } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

import LinkButton from "./LinkButton";
import { useSession } from "next-auth/react";
import Profile from "./Profile";
import NotesForm from "./NotesForm";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotesForm, setShowNotesForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: session } = useSession();

  return (
    <>
      <nav
        className={`sticky flex items-center justify-between top-0 left-0 w-full h-20 z-50 px-5 lg:px-80 sm:px-20
      ${isScrolled ? "bg-secondary/20 backdrop-blur-sm " : "border-b-[1px]"}`}
      >
        {/* Logo */}
        <h1 className="text-lg sm:text-xl italic font-bold text-primary">
          MyNotes<span className="text-white">.com</span>
        </h1>

        <div className="flex items-center justify-center gap-2 sm:gap-5">
          {/* Create note button  */}
          {/* <LinkButton linkName="Create note" linkPath="/" /> */}
          <Button
            className="cursor-pointer"
            onClick={() => setShowNotesForm(!showNotesForm)}
          >
            {
              showNotesForm ? ("Close form"): ("Create note")
            }
          </Button>

          {/* Profile icon or Auth buttons */}
          {session ? (
            <>
              {/* Profile icon  */}
              <div>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  aria-label="profile"
                >
                  {
                    showProfile ? (<>
                        
                        <RxCross2 className="text-3xl text-foreground cursor-pointer" />
                      </> ):
                    (
                      
                      <IoPersonCircle className="text-3xl text-foreground cursor-pointer" />
                    )
                  }
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Auth buttons  */}
              <div>
                <LinkButton linkName="Signin" linkPath="/login" />
              </div>
            </>
          )}
        </div>
      </nav>

      {showProfile && session ? <Profile /> : null}

      {showNotesForm && session ? (
        <div className="w-screen h-full bg-amber-50">
          <NotesForm />
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
