import Link from "next/link";
import { paths } from "shared/navigation/paths";

export const AdminAside = () => {
  return (
    <aside className="px-4 py-3 border h-fit lg:w-48 shrink-0">
      <nav>
        <ul>
          <li>
            <Link href={paths.adminProducts}>Продукты</Link>
          </li>
          <li>
            <Link href={paths.adminUsers}>Пользователи</Link>
          </li>
          <li>
            <Link href={paths.adminOrders}>Заказы</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
