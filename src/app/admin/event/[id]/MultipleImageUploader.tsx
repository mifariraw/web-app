"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@src/components/ui/dialog"
import { IconLoader2, IconPhotoPlus, IconPlus } from "@tabler/icons-react";
import { Button } from "@src/components/ui/button";
import { cn } from "@src/lib/utils";
import { uploadEventImages } from "@src/lib/admin";

export default function ImageUploader({
  id,
  folder,
}: {
  id: string;
  folder: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleFiles = (fileList: FileList) => {
    setFiles(Array.from(fileList));
  };

  const uploadFiles = () => {
    setIsUploading(true);

    uploadEventImages(id, files, folder)
      .finally(() => {
        setIsUploading(false)
        setOpen(false)
      })
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconPlus size={24} />
      </DialogTrigger>
      <DialogContent className='max-h-120 overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Incarca noi fotografii</DialogTitle>
        </DialogHeader>
        <DialogDescription className={"flex flex-col gap-2"}>
        </DialogDescription>

        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-2 py-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative group",
            files.length === 0 && "cursor-pointer",
          )}
          onClick={() => files.length === 0 && inputRef.current?.click()}
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
          onDrop={(e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!e.dataTransfer.files) return;
            handleFiles(e.dataTransfer.files);
          }}
        >
          {files.length ? (
            <ImagesPreview photos={files} />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <span className="text-gray-500 opacity-50 text-2xl text-center select-none">
                Alege fotografiile
              </span>
              <IconPhotoPlus size={128} className="opacity-50" />
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={"image/*"}
          className="hidden"
          onChange={handleChange}
        />

        <DialogFooter>
          <DialogClose className="cursor-pointer text-gray-600 rounded-sm px-4 py-1 border"> 
            Anuleaza
          </DialogClose>
          <Button
            disabled={isUploading || files.length === 0}
            type='submit'
            form='form-new-event-image'
            onClick={uploadFiles}
            className="cursor-pointer text-white rounded-sm px-4 py-1 border"
          >
            {isUploading ? (
              <IconLoader2 className="rotate" />
            ) : (
              <span>Incarca fotografiile</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ImagesPreview = ({ photos }: { photos: File[] }) => {
  return (
    <div className="relative flex items-start gap-2 overflow-auto">
      {photos.map((file, i) => (
        <Image
          src={URL.createObjectURL(file)}
          key={i}
          width={100}
          height={100}
          alt=""
          className="w-1/2 aspect-square object-cover rounded-md"
        />
      ))}
    </div>
  )
} 