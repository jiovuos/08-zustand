import Link from "next/link";
import css from "./SideBarNotes.module.css";

const tags = ["All", "Work", "Personal", "Meeting", "Shopping"];

export default function DefaultSidebar() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
