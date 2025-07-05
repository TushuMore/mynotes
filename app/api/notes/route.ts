import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";
import Notes from "@/models/Notes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const notes = await Notes.find({ userEmail: session.user.email }).lean();
    return NextResponse.json(notes);
  } catch (error) {
    // 
    console.log(error)
    //   { error: "Failed to fetch notes" },
    //   { status: 500 }
    // );
  }
}
