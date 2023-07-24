import { Box, Button } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import { useAdmin } from "@/src/store/slices/adminSlice";
import AdminDrawer from "./AdminDrawer";
import { memo } from "react";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout = ({ children, title }: Props) => {
  const {
    state: { products, admin },
  } = useAdmin();

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ height: 80 }}></Box>
        <AdminDrawer title={title}>
          {admin.isLoading ? null : children}
        </AdminDrawer>
      </Box>
    </Box>
  );
};

export default memo(AdminLayout);
