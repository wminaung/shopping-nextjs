import { useAppDispatch, useAppSelector } from "./hook";

const useProducts = () => {
  const state = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  return {};
};

export default useProducts;
