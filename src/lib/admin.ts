import { formSchema as addEventFormSchema } from '@src/app/admin/dashboard/AddEventDialog';
import { formSchema as editEventFormSchema } from '@src/app/admin/event/[id]/EditEventDialog';
import { formSchema as editEventImageFormSchema } from '@src/app/admin/event/[id]/EditImageDialog';
import z from 'zod';

// auth
export async function loginAdmin(email: string, password: string) {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "unknown_error");
  }

  return data;
}

export async function changePassword(oldPassword: string, newPassword: string) {
  const res = await fetch('/api/admin/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "unknown_error");
  }

  return data;
}

export async function logoutAdmin() {
  const res = await fetch('/api/admin/logout', {
    method: 'POST',
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "unknown_error");
  }

  return data;
}
 
// event management
export async function createNewEvent(data: z.infer<typeof addEventFormSchema>) {
  const url = await uploadImage(data.coverImageUrl, data.type)

  const res = await fetch('/api/admin/create-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      data: {
        ...data, 
        coverImageUrl: url 
      }
    }),
  })

  const eventData = await res.json();

  if (!res.ok) {
    throw new Error(eventData.message || "unknown_error");
  }

  return eventData;
}

export async function deleteEvent(id: string, folder: string) {
  const res = await fetch(`/api/admin/event/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folder })
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "unknown_error");
  }

  return data;
}

export async function updateEvent(id: string, data: z.infer<typeof editEventFormSchema>) {
  const res = await fetch(`/api/admin/event/${id}/update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  })

  const eventData = await res.json();

  if (!res.ok) {
    throw new Error(eventData.message || "unknown_error");
  }

  return eventData;
}

export async function updateEventImage(
  id: string, 
  folder: string,
  data: z.infer<typeof editEventImageFormSchema>
) {
  const { url } = await uploadImage(data.coverImageUrl, folder)
  
  const res = await fetch(`/api/admin/event/${id}/update-image`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, folder }),
  })

  const eventData = await res.json();

  if (!res.ok) {
    throw new Error(eventData.message || "unknown_error");
  }

  return eventData;
}

export async function uploadEventImages(
  id: string, 
  files: File[], 
  folder: string
) {
  const uploadedImages = await uploadMultipleImagesDirectly(files, folder);

  if (!uploadedImages || uploadedImages.length === 0) {
    throw new Error('Nu s-au putut incarca imaginile');
  }

  const dbRes = await fetch(`/api/admin/event/${id}/upload-images`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      images: uploadedImages, 
      folder 
    }),
  });

  if (!dbRes.ok) {
    const errorData = await dbRes.json() as { message?: string };
    throw new Error(errorData.message || 'Eroare la salvarea in baza de date');
  }

  const updatedEventData = await dbRes.json() as { updatedEvent: unknown };
  return updatedEventData;
}

export async function deleteEventImages(
  id: string,
  images: string[], 
  folder: string,
) {
  const res = await fetch(`/api/admin/event/${id}/delete-images`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ images, folder }),
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "unknown_error");
  }

  return data;
}

type UploadedImageResponse = {
  url: string;
  publicId: string;
  width: number;
  height: number;
};

type CloudinaryDirectResponse = {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  error?: { message: string };
};

export async function uploadImage(file: File, folder: string): Promise<UploadedImageResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const res = await fetch('/api/admin/upload-image', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Eroare la upload');
  }

  return data.url;
}

export async function uploadMultipleImagesDirectly(
  files: File[], 
  folder: string
): Promise<UploadedImageResponse[]> {
  
  // 1. Get the signature from your Next.js API
  const signRes = await fetch('/api/admin/sign-cloudinary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ folder }),
  });

  if (!signRes.ok) {
    throw new Error('Eroare la obtinerea semnaturii');
  }

  const signData = await signRes.json() as {
    signature: string;
    timestamp: number;
    folder: string;
    cloudName: string;
    apiKey: string;
  };

  // 2. Upload directly to Cloudinary from the browser
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', signData.apiKey);
    formData.append('timestamp', signData.timestamp.toString());
    formData.append('signature', signData.signature);
    formData.append('folder', signData.folder);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const cloudinaryData = await cloudinaryRes.json() as CloudinaryDirectResponse;

    if (!cloudinaryRes.ok) {
      throw new Error(cloudinaryData.error?.message || 'Eroare la upload in Cloudinary');
    }

    return {
      url: cloudinaryData.secure_url,
      publicId: cloudinaryData.public_id,
      width: cloudinaryData.width,
      height: cloudinaryData.height,
    };
  });

  return Promise.all(uploadPromises);
}

// export async function uploadMultipleImages(files: File[], folder: string): Promise<UploadedImageResponse> {
//   const formData = new FormData();

//   files.forEach((file) => {
//     formData.append('files', file);
//   });
//   formData.append('folder', folder);

//   const res = await fetch('/api/admin/upload-images', {
//     method: 'POST',
//     body: formData,
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || 'Eroare la upload');
//   }

//   return data;
// }