"use client";

import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import Hr from "./Hr";
import { IoTrashSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import dayjs from "dayjs";
import toast from "react-hot-toast";

interface Note {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

const AllNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");

  // fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes");
        if(loading) return "loading"
        const data = await res.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [loading]);

  // handle delete
  const handleDelete = async (note: Note) => {
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/notes/${note._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updatedRes = await fetch("/api/notes");
        const updatedNotes = await updatedRes.json();
        setNotes(updatedNotes);
        toast.success('Successfully Deleted!')
      } else {
        toast.error("Failed to delete note!")
      }
    } catch (err) {
       toast.error("Delete error!")
       console.log(err)
    }
  };

  // start editing a note
  const handleEditClick = (note: Note) => {
    setEditingId(note._id);
    setEditedTitle(note.title);
    setEditedDesc(note.description);
  };

  // save updated note
  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDesc,
        }),
      });

      if (!res.ok)  toast.error("Failed to update!")

      // re-fetch notes after update
      const updatedRes = await fetch("/api/notes");
      const updatedNotes = await updatedRes.json();
      setNotes(updatedNotes);
      toast.success('Successfully updated!')
      setEditingId(null); // exit editing
    } catch (err) {
       toast.error("Errot to update!")
       console.log(err)
    }
  };

  return (
    <>
      <h1 className="text-center text-5xl font-bold uppercase text-primary my-10 mb-20">
        All Notes
      </h1>

      <div className="flex flex-wrap gap-5 items-center justify-start w-[70%] mx-auto">
        {notes.map((note) => (
          <Card key={note._id} className="w-[300px] h-[300px] p-5">
            {editingId === note._id ? (
              <>
                <input
                  className=" w-full text-xl text-foreground focus:outline-none focus:ring-0 focus:border-transparent font-semibold"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                 <Hr className="via-primary/50" />
                <textarea
                  className="w-full text-[13px] text-foreground/50 h-[60%] resize-none focus:outline-none focus:ring-0 focus:border-transparent"
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                />
                <button
                  onClick={() => handleSave(note._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-700 transition-all duration-150"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold">{note.title}</h1>
                <Hr className="via-primary/50" />
                <p className="h-[60%] text-[13px] text-foreground/50 overflow-hidden">
                  {note.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm text-foreground/40">
                    {dayjs(note.createdAt).format("DD MMM YYYY")}
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => handleEditClick(note)} className="border p-1 rounded cursor-pointer">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(note)} className="border p-1 rounded cursor-pointer">
                      <IoTrashSharp />
                    </button>
                  </div>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
    </>
  );
};

export default AllNotes;
