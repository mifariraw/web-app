'use client';

import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { 
  cn, downloadImagesAsZip, ImageForZip 
} from '@lib/utils';
import { 
  IconDownload, IconLoader2, 
  IconPhotoCancel, IconSquare, 
  IconSquareCheck, IconTrash 
} from '@tabler/icons-react';
import justifiedLayout from 'justified-layout';
import Image from 'next/image';
import { 
  useEffect, useMemo, 
  useRef, useState 
} from 'react';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import { deleteEventImages } from '@lib/admin';
import { toast } from 'sonner';

export type EventPhoto = {
  url: string;
  publicId: string;
  width: number;
  height: number;
};

interface GalleryProps {
  id: string;
  photos: EventPhoto[];
  folder: string;
  noPhotosText: string;
  isDisabled?: boolean
}

export default function Gallery({ 
  id, 
  photos, 
  folder, 
  isDisabled = false, 
  noPhotosText 
}: GalleryProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [index, setIndex] = useState<number | null>(null);
  const [isDeleteing, setIsDeleteing] = useState<boolean>(false)
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
        targetRowHeight: width < 600 ? 120 :( width < 1200 ? 250 : 320),
      }
    );
  }, [photos, width]);

  async function handleDelete() {
    setIsDeleteing(true)

    try {
      const images = photos.filter(ph => selected.has(ph.publicId))
      const urls = images.map(i => i.publicId)
      
      await deleteEventImages(id, urls, folder)

      toast.success('Imagini sterse')
    } catch {
      toast.error('Eroare in stergerea imaginiilor')
    }

    setIsDeleteing(false)
    setDialogOpen(false)
  }

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

  const toggleAll = (action: string) => {
    for (const photo of photos) {
      setSelected((prev) => {
        const next = new Set(prev);
        if (action === 'toggle') {
          if (!next.has(photo.publicId)) {
            next.add(photo.publicId)
          } 
        } else if (action === 'untoggle') {
          if (next.has(photo.publicId)) {
            next.delete(photo.publicId)
          } 
        }

        return next
      })
    }
  }

  const manageDownload = () => {
    const urls: ImageForZip[] = []

    for (const photo of photos) {
      if (selected.has(photo.publicId)) {
        urls.push({ url: photo.url })
      }
    }

    downloadImagesAsZip(urls)
  }

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      setWidth(containerRef.current.getBoundingClientRect().width);
    };

    requestAnimationFrame(() => {
      measure();
    });

    window.addEventListener('resize', measure);

    return () => {
      window.removeEventListener('resize', measure);
    };
  }, [photos]);

  if (!photos.length) {
    return (
      <div className='flex flex-col gap-2 items-center justify-center py-8'>
        <IconPhotoCancel size={86} className='opacity-40' />
        <span className='z-10'>{noPhotosText}</span>
      </div>
    )
  }

  return (
    <>
      <div className='flex-center-between my-2'>
        {!isDisabled && (
          selected.size === photos.length ? (
            <IconSquareCheck 
              size={20}
              onClick={() => toggleAll('untoggle')}
            />
          ) : (
            <IconSquare 
              size={20}
              onClick={() => toggleAll('toggle')}
            />
          )
        )}

        <Lightbox
          open={index !== null}
          close={() => setIndex(null)}
          index={index ?? 0}
          slides={photos.map((p) => ({
            src: p.url,
            width: p.width,
            height: p.height,
          }))}
        />

        <div className='flex-center gap-4'>
          <Dialog 
            open={dialogOpen} 
            onOpenChange={setDialogOpen}
          >
            <DialogTrigger 
              asChild 
              disabled={selected.size === 0}
              className={cn(selected.size === 0 && 'pointer-events-none opacity-40', isDisabled && 'hidden')}
            >
              <IconTrash size={20} className='text-destructive' />
            </DialogTrigger>
            <DialogContent className='max-h-120 overflow-y-scroll'>
              <DialogHeader>
                <DialogTitle>Sterge fotografii</DialogTitle>
              </DialogHeader>
              <DialogDescription className={'flex flex-col gap-2'}>
                Urmeaza sa stergi aceste fotografii. Actiunea este permanenta
              </DialogDescription>
              <DialogFooter>
                <DialogClose className='cursor-pointer text-gray-600 rounded-sm px-4 py-1 border'> 
                  Anuleaza
                </DialogClose>
                <Button
                  disabled={isDeleteing}
                  onClick={handleDelete}
                  className='cursor-pointer text-white bg-destructive rounded-sm px-4 py-1 border'
                >
                  {isDeleteing ? (
                    <IconLoader2 className='rotate' />
                  ) : (
                    <span>Sterge</span>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {!isDisabled && (
            <IconDownload 
              size={20} 
              className={cn(selected.size === 0 && 'pointer-events-none opacity-40')}
              onClick={manageDownload}
            />
          )}
        </div>
      </div>
      <div className="w-full">
        <div
          ref={containerRef}
          className={cn(
            'relative h-100 overflow-y-scroll mt-2',
            'sm:h-150',
            'xl:h-200',
            '2xl:h-250'
          )}
        >
          {layout?.boxes.map((box, i) => {
            const photo = photos[i];
            const isSelected = selected.has(photo.publicId);

            return (
              <div
                key={photo.publicId}
                style={{
                  position: 'absolute',
                  top: box.top,
                  left: box.left,
                  width: box.width,
                  height: box.height,
                }}
                onClick={() => toggle(photo.publicId)}
                className='cursor-pointer group'
              >
                {/* <Image
                  src={photo.url}
                  alt=''
                  fill
                  className={`object-cover rounded-md transition-transform duration-200 ease-in-out ${
                    isSelected ? 'opacity-70 scale-95' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    setIndex(i)
                  }}
                /> */}
                <Image
                  src={photo.url}
                  alt=''
                  fill
                  priority
                  loading='eager'
                  className={`object-cover rounded-md transition-transform duration-200 ease-in-out ${
                    isSelected ? 'opacity-70 scale-95' : ''
                  }`}
                  onLoad={() => console.log('loaded', photo.publicId)}
                />

                {!isDisabled && (
                  <div className='absolute top-1 let-1 ml-2 opacity-100 group-hover:opacity-100'>
                    {isSelected ? (
                      <IconSquareCheck className='bg-black text-white' />
                    ) : (
                      <IconSquare className='text-white bg-black' />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}