import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import JSZip from "jszip";
import { saveAs } from "file-saver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (error) => reject(error));
    img.src = url;
  });
}

export const getCroppedImg = async (imageSrc: string, cropArea: { width: number; height: number; x: number; y: number }) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = cropArea.width;
  canvas.height = cropArea.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  ctx.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    cropArea.width,
    cropArea.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
};

export const getCloudinaryPublicId = (profileImage: string) => {
  if (!(profileImage.length > 0)) return ""

  const lastSlash = profileImage.lastIndexOf("/")
  const lastPoint = profileImage.lastIndexOf(".")

  return profileImage.slice(lastSlash + 1, lastPoint)
}

export type ImageForZip = {
  url: string;
  name?: string;
};

export async function downloadImagesAsZip(images: ImageForZip[]) {
  const zip = new JSZip();

  await Promise.all(
    images.map(async (img, index) => {
      const response = await fetch(img.url);
      const blob = await response.blob();

      const fileName =
        img.name || `image-${index}.${blob.type.split("/")[1]}`;

      zip.file(fileName, blob);
    })
  );

  const content = await zip.generateAsync({ type: "blob" });

  saveAs(content, "photos.zip");
}