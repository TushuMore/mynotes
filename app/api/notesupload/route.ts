import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import Note from "@/models/Notes";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json({ message: "Title is must!" }, { status: 400 });
    }

    await connectToDatabase();

    const note = await Note.create({
      title,
      description,
      userEmail: session.user.email,
    });

    return NextResponse.json(
      { message: "Notes successfuly created!", note },
      { status: 200 }
    );
  } catch (error) {
    // return NextResponse.json(
     console.log(error)
    //   { error: "Failed to create note!" },
    //   { status: 400 }
    // );
  }
}
