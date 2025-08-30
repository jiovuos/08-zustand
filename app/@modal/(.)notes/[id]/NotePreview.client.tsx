"use client";

import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

export default function NotePreview({ note }: { note: Note }) {
  const router = useRouter();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <div className={css.content}>{note.content}</div>
        <div className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </div>
        <button className={css.backBtn} onClick={() => router.back()}>
          ← Back
        </button>
      </div>
    </div>
  );
}
