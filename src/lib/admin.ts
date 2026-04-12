import { formSchema } from "@src/app/admin/dashboard/AddEventDialog";
import { IEvent } from "@src/models/interfaces";
import { toast } from "sonner";
import z from "zod";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export async function loginAdmin(email: string, password: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json();
  
  if (!res.ok) {
    toast.error(data.message || "Login failed");
  }

  toast.success("Logged In");
}
 
export async function createNewEvent(data: z.infer<typeof formSchema>) {
  const uploadedUrl = await uploadImage(data.coverImageUrl, data.type)
  
  const res = await fetch("/api/create-event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      data: {
        ...data, 
        coverImageUrl: uploadedUrl 
      }
    }),
  })

  const eventData: ApiResponse<unknown> = await res.json();
  
  if (!res.ok) {
    toast.error(eventData.message || "Eroare");
  }

  toast.success("Eventul a fost creat");
}

export async function changePassword(oldPassword: string, newPassword: string) {
  const res = await fetch("/api/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  })

  const data = await res.json();
  
  if (!res.ok) {
    toast.error(data.message || "Eroare");
  }

  toast.success("Parola a fost schimbată");
}

export async function logoutAdmin() {
  const res = await fetch("/api/logout", {
    method: "POST",
  })

  const data = await res.json();
  
  if (!res.ok) {
    toast.error(data.message || "Eroare");
  }

  toast.success("Logged Out");
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.message || "Eroare la upload");
    throw new Error(data.message || "Eroare la upload");
  }

  return data.url;
}