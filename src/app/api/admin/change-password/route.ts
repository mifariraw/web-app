import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@src/lib/mongodb";
import { Admin } from "@src/models/Admin";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { message: "Missing old or new password" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne();

    if (!admin) {
      return NextResponse.json(
        { message: "Admin user not found" },
        { status: 404 }
      );
    }
    
    const arePasswordsMatching = await bcrypt.compare(oldPassword, admin.password);

    if (!arePasswordsMatching) {
      return NextResponse.json(
        { message: "Old password is incorrect" },
        { status: 401 }
      );
    }
    
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();

    const res = NextResponse.json({ message: "Success" }, { status: 200 });

    return res;
    
  } catch (error: unknown) {
    console.error("Route Error:", error);
    const res = NextResponse.json(
      { message: "Internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
    
    return res;
  }
}