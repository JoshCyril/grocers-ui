export class Order {
  _id: string;
  user_id: string;
  products: [{
    product_id: string,
    product_count: number
  }]
  status: string;
  totalAmount: number;
  createdAt: Date;
}
