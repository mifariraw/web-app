import type { Metadata } from "next";
import AdminPanel from "./AdminPanel";
import { TooltipProvider } from "@src/components/ui/tooltip"
// import { IconAlertTriangle, IconCircleCheck, IconCircleX, IconInfoCircle } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Dashboard | MifariRaw",
  description: "",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <TooltipProvider>
        <AdminPanel>
            {children}
        </AdminPanel>
      </TooltipProvider>
  );
}
