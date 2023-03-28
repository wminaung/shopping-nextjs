export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface CategoryCheck {
  category: string;
  isCheck: boolean;
}

export interface CartItem {
  id: number;
  quantity: number;
}
export interface OrderItem extends Product {
  quantity: number;
}
