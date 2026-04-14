"use client";

import { IconPhotoCancel } from "@tabler/icons-react";
import justifiedLayout from "justified-layout";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type EventPhoto = {
  url: string;
  publicId: string;
  width: number;
  height: number;
};

export default function Gallery({ photos }: { photos: EventPhoto[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const layout = useMemo(() => {
    if (!width) return null;

    return justifiedLayout(
      photos.map((p) => ({
        width: p.width,
        height: p.height,
      })),
      {
        containerWidth: width,
        targetRowHeight: width < 600 ? 120 : 250,
        // gap: 8,
      }
    );
  }, [photos, width]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next;
    });
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  if (!photos.length) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center pt-4">
        <IconPhotoCancel size={86} className="opacity-40" />
        <span>Nu exista poze pentru acest eveniment</span>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative h-100 overflow-y-scroll mt-2"
    >
      {layout?.boxes.map((box, i) => {
        const photo = photos[i];
        const isSelected = selected.has(photo.publicId);

        return (
          <div
            key={photo.publicId}
            style={{
              position: "absolute",
              top: box.top,
              left: box.left,
              width: box.width,
              height: box.height,
            }}
            onClick={() => toggle(photo.publicId)}
            className="cursor-pointer group"
          >
            <Image
              src={photo.url}
              alt=""
              fill
              className={`object-cover rounded ${
                isSelected ? "opacity-70 scale-95" : ""
              }`}
            />

            {/* Overlay */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100">
              ⬇️
            </div>

            {isSelected && (
              <div className="absolute inset-0 border-4 border-blue-500 rounded" />
            )}
          </div>
        );
      })}
    </div>
  );
}