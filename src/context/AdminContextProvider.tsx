import { config } from "@/src/config/config";
import { product, rating } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface DefaultValue {
  products: product[];
  ratings: rating[];
  fetchData: (callback?: () => void) => Promise<void>;
  updateData: React.Dispatch<React.SetStateAction<DefaultValue>>;
}

const defaultValue: DefaultValue = {
  products: [],
  ratings: [],
  fetchData: async () => {},
  updateData: () => {},
};

const AdminContext = createContext<DefaultValue>(defaultValue);

/***********************/

// Hook
export const useAdmin = () => useContext(AdminContext);

// Provider
interface Props {
  children: React.ReactNode;
}
const AdminContextProvider = ({ children }: Props) => {
  const [data, updateData] = useState({ ...defaultValue });

  const fetchData = async (callback?: () => void) => {
    const res = await fetch(`${config.apiBaseUrl}/data`);
    const resData = (await res.json()) as DefaultValue;
    const { products, ratings } = resData;
    updateData({ ...data, products, ratings });

    callback && callback();
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
