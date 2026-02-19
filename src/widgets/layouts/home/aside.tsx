import Link from "next/link";
import { paths } from "shared/navigation/paths";

export const Aside = async () => {
  return (
    <aside className="border p-4 h-fit">
      <nav>
        <ul>
          <li className="flex">
            <Link
              href={paths.sales}
              className="py-2 px-4 hover:bg-secondary w-full"
            >
              Скидки
            </Link>
          </li>
          <li className={"h-px border-b"} />
          <li className="flex">
            <Link
              href={paths.new}
              className="py-2 px-4 hover:bg-secondary w-full"
            >
              Новинки
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
