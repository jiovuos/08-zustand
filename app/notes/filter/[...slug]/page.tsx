import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

type PageProps = {
  params?: Promise<{ slug?: string[] }>;
};

export default async function NotesFilterPage({ params }: PageProps) {
  const resolved = await Promise.resolve(params);
  const slug = resolved?.slug ?? [];

  const rawTag = slug[0] ?? "All";

  const currentTag =
    rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase();

  const validTags: (NoteTag | "All")[] = [
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "All",
  ];

  if (!validTags.includes(currentTag as NoteTag | "All")) {
    notFound();
  }

  const page = 1;
  const search = "";
  const tagParam: NoteTag | undefined =
    currentTag === "All" ? undefined : (currentTag as NoteTag);

  const queryClient = new QueryClient();

  const initialNotes: FetchNotesResponse = await fetchNotes({
    page,
    perPage: 6,
    search,
    tag: tagParam,
  });

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, currentTag],
    queryFn: () => Promise.resolve(initialNotes),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialPage={page}
        initialSearch={search}
        initialNotes={initialNotes}
        tag={currentTag}
      />
    </HydrationBoundary>
  );
}
