import { config } from "@/src/config/config";
import { category, product, rating } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
import { CatToShow, GET } from "../types/types";

interface DefaultValue extends GET.API.ResponseData {
  catsToShow: CatToShow[];
  cartItems: any[];
  fetchData: () => void;
  updateData: React.Dispatch<React.SetStateAction<DefaultValue>>;
}

const defaultValue: DefaultValue = {
  products: [],
  categories: [],
  cartItems: [],
  ratings: [],
  catsToShow: [],
  fetchData: () => {},
  updateData: () => {},
};

const ShopperContext = createContext<DefaultValue>(defaultValue);

/***********************/

// Hook
export const useShopper = () => useContext(ShopperContext);

// Provider
interface Props {
  children: React.ReactNode;
}
const ShopperContextProvider = ({ children }: Props) => {
  const [data, updateData] = useState<DefaultValue>({ ...defaultValue });

  const fetchData = async () => {
    const res = await fetch(`${config.apiBaseUrl}/data`);
    const resData = (await res.json()) as DefaultValue;
    const { products, ratings, categories } = resData as GET.API.ResponseData;
    updateData({ ...data, products, ratings, categories });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ShopperContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </ShopperContext.Provider>
  );
};

export default ShopperContextProvider;
