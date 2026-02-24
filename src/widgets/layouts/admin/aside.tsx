import Link from "next/link";
import { paths } from "shared/navigation/paths";

export const AdminAside = () => {
  return (
    <aside className="px-4 py-3 border h-fit">
      <nav>
        <ul>
          <li>
            <Link href={paths.adminProducts}>Продукты</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
