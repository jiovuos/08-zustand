import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "@/components/TagsMenu/TagsMenu";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/notes/filter/All" className={css.navigationLink}>
              All notes
            </Link>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
