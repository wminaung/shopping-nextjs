import React, { useState } from "react";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useShopper } from "@/src/store/slices/shopperSlice";
import CheckoutForm from "@/ui/components/CheckoutForm";
import BaseLayout from "@/ui/components/BaseLayout";
import Link from "next/link";
import { config } from "@/src/config/config";

const CheckoutPage = () => {
  return (
    <BaseLayout>
      <Box>
        <CheckoutForm />
      </Box>
    </BaseLayout>
  );
};

export default CheckoutPage;
