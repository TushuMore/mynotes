"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import AllNotes from "@/components/AllNotes";

type Note = {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export default function Home() {
  const { data: session } = useSession();


  return (
    <>
      {session ? (
        <>
           <AllNotes/>
        </>
      ) : (
        <section className="w-full py-24 bg-gradient-to-b from-background">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Organize Your Thoughts Effortlessly <br />
              With <span className="text-indigo-600">MyNotes.com</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              MyNotes is your personal digital notebook—take quick notes,
              structure your ideas, and access them anytime from anywhere.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <Button className="text-base px-6 py-2">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="text-base">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
