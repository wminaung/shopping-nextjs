import { Box, Button } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import { useAdmin } from "@/src/store/slices/adminSlice";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const {
    state: { products, admin },
  } = useAdmin();

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <AdminNavbar />
      </Box>
      {admin.isLoading ? null : children}
    </Box>
  );
};

export default AdminLayout;
