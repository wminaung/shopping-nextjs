import Footer from "@/ui/components/Footer";
import { Box, Button } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import AdminNavbar from "./AdminNavbar";
import { useAdmin } from "@/src/context/AdminContextProvider";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const { products } = useAdmin();

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <AdminNavbar />
      </Box>
      {products.length > 0 ? children : null}
    </Box>
  );
};

export default AdminLayout;
