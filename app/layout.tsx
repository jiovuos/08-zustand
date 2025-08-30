import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap"
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Notes made simple",
  openGraph: {
    title: "NoteHub",
    description: "Notes made simple",
    url: "https://08-zustand.vercel.app",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"]
  }
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
