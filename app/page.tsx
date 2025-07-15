"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import AllNotes from "@/components/AllNotes";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <AllNotes />
      ) : (
        <section className="w-full min-h-screen bg-gradient-to-b from-background to-muted py-20 px-4 flex items-center justify-center">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            {/* TEXT CONTENT */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                Organize Your Thoughts Effortlessly <br />
                With <span className="text-indigo-600">MyNotes.com</span>
              </h1>

              <p className="text-muted-foreground text-base sm:text-lg md:text-xl mb-8">
                MyNotes is your personal digital notebook — take quick notes,
                structure your ideas, and access them anytime from anywhere.
              </p>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Link href="/login">
                  <Button className="text-base sm:text-lg px-6 py-3">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="ghost" className="text-base sm:text-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            
          </div>
        </section>
      )}
    </>
  );
}
