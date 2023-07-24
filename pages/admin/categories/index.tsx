import { useAdmin } from "@/src/store/slices/adminSlice";
import AdminCard from "@/ui/components/AdminCard";
import { navLinks } from "@/ui/components/AdminDrawer";
import AdminLayout from "@/ui/components/AdminLayout";
import DialogButton from "@/ui/components/DialogButton";
import CreateCategory from "@/ui/components/categories/CreateCategory";
import { Box, Button, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const CategoriesPage = () => {
  const {
    state: { categories, admin, pagination },
    actions,
    dispatch,
  } = useAdmin();

  const {
    categories: { currentPage, endIndex, itemsPerPage, startIndex },
  } = pagination;
  const showCategories = categories.slice(startIndex, endIndex);

  return (
    <AdminLayout title="Categories">
      <Stack>
        <Stack direction={"column"} alignItems={"end"} sx={{ mr: 5 }}>
          <DialogButton title="Create Category">
            <CreateCategory />
          </DialogButton>
        </Stack>
        <Stack direction={"row"} flexWrap={"wrap"} alignItems={"center"}>
          {showCategories.map((category) => (
            <Box sx={{ mx: "auto" }} key={category.id}>
              <AdminCard
                href={`/admin/categories/${category.id}`}
                name={category.name}
              />
            </Box>
          ))}
        </Stack>
        <Stack alignItems={"center"}>
          <Pagination
            count={Math.ceil(categories.length / itemsPerPage)}
            page={currentPage}
            showFirstButton
            showLastButton
            onChange={(e, p) => {
              dispatch(
                actions.setCategoryPaination({
                  currentPage: p,
                  itemsPerPage: itemsPerPage,
                })
              );
            }}
          />
        </Stack>
      </Stack>
    </AdminLayout>
  );
};

export default CategoriesPage;
