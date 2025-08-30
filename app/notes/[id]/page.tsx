import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const description =
      note.content && note.content.trim() !== ""
        ? note.content.slice(0, 100) + (note.content.length > 100 ? "..." : "")
        : "Note details";

    return {
      title: `${note.title} - NoteHub`,
      description,
      openGraph: {
        title: `${note.title} - NoteHub`,
        description,
        url: `https://08-zustand.vercel.app/notes/${id}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"]
      }
    };
  } catch {
    return {
      title: "Note not found - NoteHub",
      description: "This note does not exist",
      openGraph: {
        title: "Note not found - NoteHub",
        description: "This note does not exist",
        url: `https://08-zustand.vercel.app/notes/${id}`,
        images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"]
      }
    };
  }
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
