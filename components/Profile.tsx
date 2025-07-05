"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import Hr from "./Hr";

const Profile = () => {
  const { data: session } = useSession();
  return (
    <section className="fixed right-5 lg:right-80 sm:right-60 mt-5 w-max h-max px-10 py-10 rounded-md bg-secondary/20 backdrop-blur-sm ">
      <div className="">
        <h1 className="text-center text-2xl font-bold uppercase pb-5">
          Profile
        </h1>
        <Hr className="via-primary/50 mb-5"/>
        <p>
          Name :{" "}
          <span className="text-foreground/60">{session?.user.username}</span>
        </p>
        <p>
          Email :{" "}
          <span className="text-foreground/60">{session?.user.email}</span>
        </p>

        <Button
          className="mt-5 cursor-pointer hover:text-background"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </Button>
      </div>
    </section>
  );
};

export default Profile;
