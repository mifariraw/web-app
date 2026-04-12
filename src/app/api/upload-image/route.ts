import cloudinary from "@src/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const img: File | null = form.get("file") as File | null;
    const folder: string = form.get("folder") as string;

    if (!img || img.size === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await img.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const res: unknown = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: (res as { secure_url: string }).secure_url });
  } catch (err) {
    console.error("Cloudinary error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
