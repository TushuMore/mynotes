import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Destructure username, email and password from the request body
    const { username, email, password } = await req.json();

    // Validate username, email and password
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          Error: "All field are required!",
        },
        { status: 401 }
      );
    }

    //connect to database
    await connectToDatabase();

    //Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          Error: "User already existed!",
        },
        { status: 400 }
      );
    }

    //if there is no existing user then create new
    const newUser = await User.create({
      username,
      email,
      password,
    });

    return NextResponse.json(
      { message: "User successfully register.", newUser },
      { status: 200 }
    );
  } catch (error) {
    // return NextResponse.json(
    //   {
    //     error: "Failed to register!",
    //   },
    //   { status: 400 }
    // );
    console.log(error)
  }
}
