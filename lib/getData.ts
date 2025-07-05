import { connectToDatabase } from "@/lib/dbConnect";
import Notes, { NoteType } from "@/models/Notes";

// Fetch all notes from MongoDB
export const getData = async (): Promise<NoteType[]> => {
  try {
    await connectToDatabase();
    const notes = await Notes.find().lean(); // lean() improves performance
    return notes as NoteType[];
  } catch (err) {
    console.error("Error fetching notes:", err);
    throw new Error("Failed to fetch notes!");
  }
};

export const deletData = async (_id: string) => {
  try {
    await connectToDatabase();
    await Notes.findOneAndDelete({ _id });
  } catch (error) {
    console.error("Failed to delete", error);
    throw new Error("Failed to Delete note!");
  }
};
