"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Hr from "./Hr";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";

const NotesForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      toast.error("Title is must!");
      return;
    }

    try {
      const res = await fetch("api/notesupload", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      await res.json();

      if (!res.ok) {
        toast.error("Failed to create note!");
      }

      toast.success("Note successfully created!");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xs sm:max-w-sm md:max-w-md">
        <Card className="w-full p-5 bg-secondary/20 backdrop-blur-sm">
          <h1 className="pt-4 text-2xl uppercase text-primary text-center">
            Create Note
          </h1>
          <Hr className="via-primary/50 mb-2" />

          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Note Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Write something..."
                className="resize-none h-[150px]"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button className="w-full" type="submit">
              Create
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default NotesForm;
