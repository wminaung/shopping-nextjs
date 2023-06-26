import { SvgIcon } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";

const ShopperLogo = () => {
  return (
    <div>
      <Image src="/favicon.svg" alt="Example SVG" width={80} height={50} />
    </div>
  );
};

export default ShopperLogo;
