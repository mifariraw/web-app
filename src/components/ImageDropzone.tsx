'use client';

import { cn } from '@lib/utils';
import Image from 'next/image';
import Cropper, { Area } from 'react-easy-crop';
import { 
  useRef, useState, 
  DragEvent, ChangeEvent 
} from 'react';
import { 
  IconPhotoPlus, IconLoader2, IconX 
} from '@tabler/icons-react';
import { toast } from 'sonner';
import { Button } from '@components/ui/button';
import { getCroppedImg } from '@lib/utils';

// 1. Define specific types for the preview state
type PreviewState = {
  url: string;
  type: 'image';
} | null;

interface ImageDropzoneProps {
  className?: string;
  onFileSelect?: (file: File | null) => void;
  selectText?: string;
  hasError?: boolean;
}

const ImageDropzone = ({
  className,
  onFileSelect,
  selectText,
  hasError = false,
}: ImageDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<PreviewState>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropAreaPixels, setCropAreaPixels] = useState<Area | null>(null);

  const [isSavingCrop, setIsSavingCrop] = useState(false);

  // 3. Use the Area type from react-easy-crop
  const handleCropComplete = (_: unknown, pixels: Area) => {
    setCropAreaPixels(pixels);
  };

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;


    const url = URL.createObjectURL(file);
    setPreview({
      url,
      type: 'image',
    });

    onFileSelect?.(file);
  };

  const saveCroppedImage = async (): Promise<File | undefined> => {
    if (!preview || preview.type !== 'image' || !cropAreaPixels) return;

    try {
      setIsSavingCrop(true);

      const croppedBlob = await getCroppedImg(
        preview.url,
        cropAreaPixels
      );

      // Handle null blob check
      if (!croppedBlob) {
        throw new Error('Blob creation failed');
      }

      const croppedFile = new File([croppedBlob as Blob], 'profile.jpg', {
        type: 'image/jpeg',
      });

      const newUrl = URL.createObjectURL(croppedFile);

      setPreview({
        url: newUrl,
        type: 'image',
      });

      onFileSelect?.(croppedFile);
      return croppedFile;
    } catch (err) {
      console.error('Crop error:', err);
      toast.error('Eroare la decupare');
    } finally {
      setIsSavingCrop(false);
    }
  };

  const removeFile = () => {
    setPreview(null);
    onFileSelect?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <>
      {preview && preview.type === 'image' && (
        <span className='block mb-2 text-lg'>
          Selectează zona dorită
        </span>
      )}

      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-2 py-4 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition relative group',
          !preview && 'cursor-pointer',
          hasError && 'border-destructive',
          className
        )}
        onClick={() => !preview && inputRef.current?.click()}
        onDragOver={(e: DragEvent) => e.preventDefault()}
        onDrop={(e: DragEvent) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        {preview && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
            className='absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-50'
          >
            <IconX size={20} />
          </button>
        )}

        {preview?.type === 'image' ? (
          <div className='relative w-72 h-72 overflow-hidden'>
            <Cropper
              image={preview.url}
              crop={crop}
              zoom={zoom}
              aspect={1}
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
            />
          </div>
        ) : preview?.type === 'image' ? (
          <Image
            src={preview.url}
            alt='preview'
            width={300}
            height={300}
            className='object-cover rounded-xl'
          />
        ) : preview?.type === 'pdf' ? (
          <div className='flex flex-col items-center gap-4 w-full'>
            <iframe
              src={preview.url}
              className='w-full h-120 rounded-lg border'
              title='PDF Preview'
            />
          </div>
        ) : (
          <div className='flex flex-col items-center gap-4'>
            <span className='text-gray-500 opacity-50 text-2xl text-center select-none'>
              {selectText}
            </span>
            <IconPhotoPlus size={128} className='opacity-50' />
          </div>
        )}

        {preview?.type === 'image' && (
          <Button
            disabled={isSavingCrop}
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              saveCroppedImage();
            }}
            className='mt-4'
          >
            {isSavingCrop ? <IconLoader2 className='animate-spin' /> : 'Salvează decupajul'}
          </Button>
        )}

        <input
          ref={inputRef}
          type='file'
          accept={'image/*'}
          className='hidden'
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
        />
      </div>

      {/* <Button
        disabled={isConfirmDisabled || isSavingCrop}
        onClick={handleConfirm}
        className={cn('mt-4 bg-black!')}
      >
        {isSavingCrop ? (
          <IconLoader2 className='animate-spin' />
        ) : (
          'Confirmă'
        )}
      </Button> */}
    </>
  );
};

export default ImageDropzone;