export class Product {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  discount: [{
    isDiscounted: boolean;
    percentage: number;
  }];
  category_id: string;
  imgUrls: [string];
  tags: [string];
}
