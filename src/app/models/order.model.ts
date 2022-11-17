export class Order {
  user_id: string;
  products: Array<[{
    product_id: string,
    product_count: number
  }]> = [];
  status: string;
  totalAmount: number;
}

export class OrderN {
  _id: string;
  user_id: string;
  products: Array<[{
    product_id: string,
    product_count: number
  }]> = [];
  status: string;
  totalAmount: number;
  createdAt: Date;
}