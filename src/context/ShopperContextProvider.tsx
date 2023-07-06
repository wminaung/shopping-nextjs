import { config } from "@/src/config/config";
import { product, rating } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface DefaultValue {
  products: product[];
  ratings: rating[];
  fetchData: () => void;
  updateData: React.Dispatch<React.SetStateAction<DefaultValue>>;
}

const defaultValue: DefaultValue = {
  products: [],
  ratings: [],
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
    const { products, ratings } = resData;
    updateData({ ...data, products, ratings });
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
