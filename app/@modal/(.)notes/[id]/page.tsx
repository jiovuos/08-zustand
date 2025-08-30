import BackModal from "@/components/Modal/BackModal";
import NotePreview from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";
import { notFound } from "next/navigation";

type PageProps = {
  params?: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: PageProps) {
  const resolved = await Promise.resolve(params);
  const id = resolved?.id;

  if (!id) {
    notFound();
  }

  const note = await fetchNoteById(id);

  return (
    <BackModal>
      <NotePreview note={note} />
    </BackModal>
  );
}
