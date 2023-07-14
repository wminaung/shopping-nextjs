import Footer from "@/ui/components/Footer";
import { Box, Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import AdminNavbar from "./AdminNavbar";
import { useAdmin } from "@/src/context/AdminContextProvider";
import { useAdminSlice } from "@/src/store/slices/adminSlice";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const {
    state: { products, admin },
  } = useAdminSlice();

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
