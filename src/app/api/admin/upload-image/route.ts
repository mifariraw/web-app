import cloudinary from "@src/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

type UploadedImageResponse = {
  url: string;
  publicId: string;
  width: number;
  height: number;
};

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
};

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

    const res = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result as CloudinaryUploadResult);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      url: res.secure_url,
      publicId: res.public_id,
      width: res.width,
      height: res.height,
    } satisfies UploadedImageResponse);
  } catch (err) {
    console.error("Cloudinary error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
