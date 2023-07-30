import { theme } from "@/src/utils/theme";
import AdminLayout from "@/ui/components/AdminLayout";
import { Box, Button, Typography } from "@mui/material";

const AdminPage = () => {
  return (
    <AdminLayout title="Admin">
      <Typography color={"primary"}>hello world</Typography>
      <Box
        sx={{
          width: 200,
          height: 200,
          mx: "auto",
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        sdf
      </Box>
      <Button variant="contained" color="secondary">
        ok
      </Button>
    </AdminLayout>
  );
};

export default AdminPage;
