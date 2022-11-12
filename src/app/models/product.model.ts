export class Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  discount: [{
    isDiscounted: string;
    percentage: number;
  }] = [{
    isDiscounted: "false",
    percentage: 0
  }];

  category_id: string;
  imgUrls: [string];
  tags: [string];
}
