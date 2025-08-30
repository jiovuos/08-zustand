import type { Metadata } from "next";
import css from "./NotFound.module.css";

export const metadata: Metadata = {
  title: "Page not found - NoteHub",
  description: "The page you are looking for does not exist",
  openGraph: {
    title: "Page not found - NoteHub",
    description: "The page you are looking for does not exist",
    url: "https://08-zustand.vercel.app/not-found",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function NotFoundPage() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, this page does not exist.</p>
    </main>
  );
}
