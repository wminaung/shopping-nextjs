import { config } from "@/src/config/config";
import { useAdmin } from "@/src/store/slices/adminSlice";
import { getGetDeleteRequesInit, isEqualTwoObjectArray } from "@/src/utils";
import { superbase } from "@/src/utils/superbase";
import AdminLayout from "@/ui/components/AdminLayout";
import FileDropzone from "@/ui/components/FileDropzone";
import { v4 as uuidv4 } from "uuid";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MultipleAutoCompleteChip from "@/ui/components/MultipleAutoCompleteChip";
import { Category, Product } from "@/src/types/types";
import { fetchCategoriesXProducts } from "@/src/store/slices/categoriesXProductsSlice";
import { TextareaAutosize } from "@mui/base";
const ProductEditPage = () => {
  const {
    state: { products, categories, categoriesXProducts },
    dispatch,
    actions,
  } = useAdmin();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [newSelectedCategories, setNewSelectedCategories] = useState<
    Category[]
  >([]);
  const [newProduct, setNewProduct] = useState<Prisma.productUpdateInput>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();
  const productId = router.query.id as string;
  const [file, setFile] = useState<File | null>(null);

  const oldProduct = products.find(
    (product) => String(product.id) === productId
  );

  useEffect(() => {
    if (oldProduct) {
      setNewProduct(oldProduct);
    }
    if (categories && categoriesXProducts) {
      const validCatIds = categoriesXProducts
        .filter((cxp) => String(cxp.productId) === String(productId))
        .map((cxp) => cxp.categoryId);

      const validCategories = categories.filter((cat) =>
        validCatIds.includes(cat.id)
      );
      setSelectedCategories(validCategories);
      setNewSelectedCategories(validCategories);
    }
  }, [oldProduct, categories, categoriesXProducts, productId]);

  if (!oldProduct || !newProduct) {
    return null;
  }
  /*
 sametile = sdesc == spr
  */
  // TODO -- UPDATE
  const updateProduct = async () => {
    if (!newProduct) {
      return;
    }
    const payload: Prisma.productUpdateInput = {
      ...newProduct,
    };

    let newImage = newProduct.image;
    if (file) {
      const { data, error } = await superbase.storage
        .from("winimg")
        .upload(`admin/products/${uuidv4()}-${file.name}`, file);

      if (error) {
        return alert("image upload something wrong");
      }
      const { path: imagePath } = data;

      newImage = `${config.baseImageUrl}/${imagePath}`;
      payload.image = newImage;
      console.log(newImage, "newImage");
    }
    console.log(payload);
    const isValid =
      oldProduct.title !== payload.title ||
      oldProduct.description !== payload.description ||
      oldProduct.price !== payload.price ||
      oldProduct.image !== payload.image ||
      !isEqualTwoObjectArray({
        objectArray1: selectedCategories,
        objectArray2: newSelectedCategories,
      });

    if (!isValid) {
      return alert("not valid");
    }

    const res = await fetch(`${config.apiAdminUrl}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        ...payload,
        categoryxproduct: {
          deleteMany: {},
          createMany: {
            data: newSelectedCategories.map((cat) => ({
              categoryId: cat.id,
            })),
          },
        },
      }),
    });

    if (!res.ok) {
      return alert("somethign wrong");
    }
    const updatedProduct = await res.json();

    dispatch(actions.updateProduct(updatedProduct));
    dispatch(fetchCategoriesXProducts());
    setFile(null);
    setImagePreview(null);
  };

  const isDisabled =
    oldProduct.title === newProduct.title &&
    oldProduct.description === newProduct.description &&
    oldProduct.price === newProduct.price &&
    file === null &&
    isEqualTwoObjectArray({
      objectArray1: selectedCategories,
      objectArray2: newSelectedCategories,
    });

  // TODO -- DELETE
  const handleDelete = async () => {
    const isValid = confirm("Are you sure want to delete this item?");

    if (!isValid) {
      return;
    }

    const res = await fetch(
      `${config.apiAdminUrl}/products/${productId}`,
      getGetDeleteRequesInit("DELETE")
    );

    if (!res.ok) {
      return alert("can not delete");
    }

    const deletedProduct = (await res.json()) as Product;
    dispatch(actions.archiveProduct(deletedProduct));
    dispatch(actions.archiveCategoryXProduct({ productId: deletedProduct.id }));
    await router.push("/admin/products");
  };
  const handleNewSelectedCategories = async (
    event: React.SyntheticEvent<Element, Event>,
    value: Category[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Category> | undefined
  ) => {
    setNewSelectedCategories(value);
  };

  return (
    <AdminLayout title="Edit Product">
      <Container maxWidth="sm" component={Paper} sx={{ px: 2, py: 4 }}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await updateProduct();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {newProduct.image && (
                <Image
                  src={newProduct.image as string}
                  width={120}
                  height={120}
                  alt="iamge"
                />
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Product title"
                  fullWidth
                  name="title"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  label="Price"
                  fullWidth
                  name="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: Number(e.target.value),
                    })
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MultipleAutoCompleteChip
                categories={categories}
                selectedCategories={newSelectedCategories}
                handleSelectedCategories={handleNewSelectedCategories}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextareaAutosize
                  value={(newProduct.description as string) || ""}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  style={{
                    backgroundColor: "inherit",
                    color: "inherit",
                    borderRadius: "3px",
                    borderColor: "inherit",
                  }}
                  minRows={5}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FileDropzone
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  file={file}
                  setFile={setFile}
                />
              </FormControl>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="outlined"
                color="error"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                disabled={isDisabled}
                variant="contained"
                color="primary"
                type="submit"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </AdminLayout>
  );
};

export default ProductEditPage;
