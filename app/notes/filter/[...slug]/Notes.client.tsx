"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import type { FetchNotesResponse } from "@/lib/api";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import { NoteTag } from "@/types/note";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  initialPage: number;
  initialSearch: string;
  initialNotes: FetchNotesResponse;
  tag: string;
}

export default function NotesClient({
  initialPage,
  initialSearch,
  initialNotes,
  tag,
}: NotesClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 6,
        search: debouncedSearch,
        tag: tag === "All" ? undefined : (tag as NoteTag),
      }),
    placeholderData: (prev) => prev,
    initialData:
      page === initialPage && debouncedSearch === initialSearch && tag === "All"
        ? initialNotes
        : undefined,
  });

  const totalPages = data?.totalPages ?? 1;
  const notes = data?.data ?? [];

  const handleSearch = (query: string) => {
    setPage(1);
    setSearch(query);
  };

  useEffect(() => {
    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) {
      const div = document.createElement("div");
      div.id = "modal-root";
      document.body.appendChild(div);
    }
  }, []);

  return (
    <section className={css.app}>
      <div className={css.toolbar}>
        <div className={css.searchWrapper}>
          <SearchBox onSearch={handleSearch} />
        </div>

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Add note
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes: {error.message}</p>}
      {!isLoading && !error && notes.length > 0 && <NoteList notes={notes} />}
      {!isLoading && !error && notes.length === 0 && (
        <p>No notes found. Try adding a new one!</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </section>
  );
}
