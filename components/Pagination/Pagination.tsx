"use client";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      className={css.pagination}
      activeClassName={css.active}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      forcePage={currentPage - 1}
    />
  );
}
