import CheckoutForm from "@/components/CheckoutForm";
import CheckoutOrderList from "@/components/CheckoutOrderList";
import { CartItem, OrderItem, Product } from "@/types/types";
import { GetStaticProps } from "next";
import { Dispatch, SetStateAction } from "react";

interface Props {
  products: Array<Product>;
  orderItems: OrderItem[];
  setOrderItems: Dispatch<SetStateAction<CartItem[]>>;
}

const CheckoutPage = ({ products, orderItems, setOrderItems }: Props) => {
  console.log(orderItems, "orderItems");

  const orderList = orderItems.map((cartItem) => {
    const foundProduct = products.find((product) => product.id === cartItem.id);
    if (!foundProduct) return {} as OrderItem;
    return {
      ...foundProduct,
      quantity: cartItem.quantity,
    };
  });

  return (
    <div>
      <h1>Checkout Page</h1>
      <CheckoutOrderList orderItems={orderList} />
      <CheckoutForm setOrderItems={setOrderItems} />
    </div>
  );
};

export default CheckoutPage;
export const getStaticProps: GetStaticProps = async () => {
  const resProducts = await fetch("https://fakestoreapi.com/products");
  const products = await resProducts.json();

  return {
    props: {
      products,
    },
  };
};
