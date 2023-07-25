import { useAdmin } from "@/src/store/slices/adminSlice";
import AdminCard from "@/ui/components/AdminCard";
import { navLinks } from "@/ui/components/AdminDrawer";
import AdminLayout from "@/ui/components/AdminLayout";
import DialogButton from "@/ui/components/DialogButton";
import CreateCategory from "@/ui/components/categories/CreateCategory";
import { Box, Button, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        <Box sx={{ display: "felx" }}>
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            alignItems={"center"}
            maxWidth={"1000px"}
            mx={"auto"}
          >
            {showCategories.map((category) => (
              <Box
                key={category.id}
                component={motion.div}
                initial={{ opacity: 0.2, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <AdminCard
                  href={`/admin/categories/${category.id}`}
                  name={category.name}
                />
              </Box>
            ))}
          </Stack>
        </Box>
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
