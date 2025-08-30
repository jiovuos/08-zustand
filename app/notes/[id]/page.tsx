import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

// 🔹 SEO для сторінки
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const note = await fetchNoteById(id);
    return {
      title: note.title,
      description: note.content.slice(0, 100) + "...",
    };
  } catch {
    return {
      title: "Note not found",
    };
  }
}

// 🔹 Рендер сторінки з React Query
export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
