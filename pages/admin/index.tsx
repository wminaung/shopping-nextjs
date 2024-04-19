import { theme } from "@/src/utils/theme";
import AdminLayout from "@/ui/components/AdminLayout";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/orders");
  }, []);

  return (
    <AdminLayout title="Admin">
      <Typography color={"primary"}>hello world</Typography>

      <Button variant="contained" color="secondary">
        ok
      </Button>
    </AdminLayout>
  );
};

export default AdminPage;
