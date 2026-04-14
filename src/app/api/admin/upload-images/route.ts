import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@src/lib/cloudinary";

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
    const files = form.getAll("files") as File[];
    const folder = form.get("folder") as string;

    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadSingle = async (file: File): Promise<UploadedImageResponse> => {
      const bytes = await file.arrayBuffer();
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

      return {
        url: res.secure_url,
        publicId: res.public_id,
        width: res.width,
        height: res.height,
      };
    };

    const uploadedImages = await Promise.all(files.map(uploadSingle));

    return NextResponse.json(uploadedImages);
  } catch (err) {
    console.error("Cloudinary error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}