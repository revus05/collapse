import { UserList } from "widgets/admin-user/user-list";
import { withAdminLayout } from "widgets/layouts/admin";

const AdminUsersPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <UserList />
    </div>
  );
};

export default withAdminLayout(AdminUsersPage);
