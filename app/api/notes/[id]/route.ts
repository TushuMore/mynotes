
import { connectToDatabase } from "@/lib/dbConnect";
import Notes from "@/models/Notes";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // safely extract ID from URL

  try {
    const deletedNote = await Notes.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting note", error }, { status: 500 });
  }
}
