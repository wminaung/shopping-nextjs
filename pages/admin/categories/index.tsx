import { useAdmin } from "@/src/store/slices/adminSlice";
import AdminCard from "@/ui/components/AdminCard";
import { navLinks } from "@/ui/components/AdminDrawer";
import AdminLayout from "@/ui/components/AdminLayout";
import DialogButton from "@/ui/components/DialogButton";
import CreateCategory from "@/ui/components/categories/CreateCategory";
import { Box, Stack } from "@mui/material";

const CategoriesPage = () => {
  const {
    state: { categories, admin },
    actions,
    dispatch,
  } = useAdmin();

  const nav = navLinks.find((nav) => nav.name === admin.navTitle);

  return (
    <AdminLayout>
      <Stack>
        <Stack direction={"column"} alignItems={"end"} sx={{ mr: 5, mt: 8 }}>
          <DialogButton title="Create Category">
            <CreateCategory />
          </DialogButton>
        </Stack>
        <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"}>
          {categories.map((category) => (
            <Box sx={{ mx: "auto" }} key={category.id}>
              <AdminCard
                href={`/admin/categories/${category.id}`}
                nav={nav}
                name={category.name}
              />
            </Box>
          ))}
        </Stack>
      </Stack>
    </AdminLayout>
  );
};

export default CategoriesPage;
