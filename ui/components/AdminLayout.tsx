import { Box, Button, Theme, useTheme } from "@mui/material";
import { useAdmin } from "@/src/store/slices/adminSlice";
import AdminDrawer from "./AdminDrawer";
import { memo, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout = ({ children, title }: Props) => {
  const {
    state: { admin },
  } = useAdmin();
  const session = useSession();
  const theme = useTheme() as Theme;

  return (
    <Box bgcolor={theme.palette.background.default} height={"100%"}>
      <Box bgcolor={theme.palette.background.default}>
        <Box sx={{ height: 80 }}></Box>
        <AdminDrawer title={title}>
          {admin.isLoading ? null : children}
        </AdminDrawer>
      </Box>
    </Box>
  );
};

export default memo(AdminLayout);
