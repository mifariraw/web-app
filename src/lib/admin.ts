import { toast } from "sonner";

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