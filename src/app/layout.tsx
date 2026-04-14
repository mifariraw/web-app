import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileNavbar from "@src/components/MobileNavbar";
import { Toaster } from "sonner";
import { IconAlertTriangle, IconCircleCheck, IconCircleX, IconInfoCircle } from "@tabler/icons-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MifariRaw",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="flex flex-col bg-black relative overflow-hidden overflow-x-hidden">
        <MobileNavbar />
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />

        <div className="flex flex-col min-h-full w-dvw overflow-x-hidden">
          {children}

          <Toaster
            icons={{
              success: <IconCircleCheck color="green" size={20} />,
              info: <IconInfoCircle color="blue" size={20} />,
              warning: <IconAlertTriangle color="#dbac02" size={20} />,
              error: <IconCircleX color="red" size={20} />,
            }}
            toastOptions={{
              style: {
                fontSize: "16px"
              }
            }}
          />
        </div>
      </body>
    </html>
  );
}
