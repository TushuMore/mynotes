"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Hr from "@/components/Hr";
import dayjs from "dayjs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

type Note = {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
};

export default function Home() {
  const { data: session } = useSession();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const deleteNote = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Note deleted!")
        setNotes((prev) => prev.filter((note) => note._id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const formatDate = (date: string) => {
    return dayjs(date).format("DD MMM YYYY"); // → "05 Jul 2025"
  };

  return (
    <>
      {session ? (
        <>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul className="space-y-3 w-full h-max flex flex-wrap gap-5 px-5 lg:px-40 sm:px-20 py-20 sm:py-40">
              {notes.map((note) => (
                <Card key={note._id} className="w-[300px] h-[350px] p-5">
                  <h1 className="font-bold text-xl">{note.title}</h1>
                  <Hr className="via-primary/50" />
                  <p className="text-foreground/50 min-h-[60%] text-[14px]">
                    {note.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-[12px] text-foreground/50">
                      {formatDate(note.createdAt.toString())}
                    </p>

                    <div className="flex gap-5 items-center justify-center">
                      <FaEdit />
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="cursor-pointer bg-foreground/50 p-2"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </ul>
          )}
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
