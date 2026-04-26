import { OrderList } from "widgets/admin-order/order-list";
import { withAdminLayout } from "widgets/layouts/admin";

const AdminOrdersPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <OrderList />
    </div>
  );
};

export default withAdminLayout(AdminOrdersPage);
