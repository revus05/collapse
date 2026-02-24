import { CreateProductForm } from "features/products/create";
import { ProductList } from "widgets/admin-product/product-list/ui";
import { withAdminLayout } from "widgets/layouts/admin";

const AdminProductPage = () => {
  return (
    <div className="flex gap-4 flex-col w-full">
      <CreateProductForm />
      <ProductList />
    </div>
  );
};

export default withAdminLayout(AdminProductPage);
