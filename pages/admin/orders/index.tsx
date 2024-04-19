import { OrderWithOrderlines } from "@/pages/api/admin/orders";
import { config } from "@/src/config/config";
import AdminTable from "@/ui/AdminTable";
import AdminLayout from "@/ui/components/AdminLayout";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [items, setItems] = useState<OrderWithOrderlines[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${config.apiAdminUrl}/orders`);
      if (!res.ok) {
        return window?.alert("res is not ok");
      }
      const data = (await res.json()) as OrderWithOrderlines[];
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <AdminLayout title="Orders">
      <AdminTable items={items} />
    </AdminLayout>
  );
};

export default OrdersPage;
