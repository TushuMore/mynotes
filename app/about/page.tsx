"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          About <span className="text-indigo-600">MyNotes.com</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl mb-6 max-w-2xl">
          MyNotes is your personal digital notebook—designed to simplify the way
          you capture and organize thoughts. Whether it’s jotting down ideas,
          outlining tasks, or journaling your day, MyNotes helps you do it all
          with ease and privacy.
        </p>

        <div className="text-left text-muted-foreground text-base md:text-lg mb-10 max-w-xl space-y-3">
          <p>✨ Clean, distraction-free interface to help you focus</p>
          <p>🔐 All notes are private and secure to your account</p>
          <p>📲 Access your notes anytime from any device</p>
          <p>🚀 Fast, responsive, and built for simplicity</p>
        </div>

        <Link href="/login">
          <Button size="lg" className="text-base">
            Start Using MyNotes
          </Button>
        </Link>
      </div>
    </main>
  );
}
