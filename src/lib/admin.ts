import { formSchema as addEventFormSchema } from '@src/app/admin/dashboard/AddEventDialog';
import { formSchema as editEventFormSchema } from '@src/app/admin/event/[id]/EditEventDialog';
import { formSchema as editEventImageFormSchema } from '@src/app/admin/event/[id]/EditImageDialog';
import { toast } from 'sonner';
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
  folder: string,
) {
  const data = await uploadMultipleImages(files, folder)
  
  const res = await fetch(`/api/admin/event/${id}/upload-images`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ images: data, folder }),
  })

  const eventData = await res.json();

  if (!res.ok) {
    throw new Error(eventData.message || "unknown_error");
  }

  return eventData;
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

export async function uploadMultipleImages(files: File[], folder: string): Promise<UploadedImageResponse> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('folder', folder);

  const res = await fetch('/api/admin/upload-images', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Eroare la upload');
  }

  return data;
}