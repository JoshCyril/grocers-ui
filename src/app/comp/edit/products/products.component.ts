import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product[]
  uadmin: string | null;
  CategoryObject: any;

  constructor(private router: Router, private service: ApiService) { }

  ngOnInit(): void {
    this.uadmin = localStorage.getItem('g_uadmin')
    this.CategoryObject = JSON.parse(localStorage.getItem('g_categories') as any);

    if (this.uadmin === "true") {
      this.service.getAllProducts().subscribe(x => this.product = x)
    } else {
      this.router.navigate(['/home']);
    }
  }

  delete(id: string) {
    this.product = this.product.filter(u => u._id !== id)
    this.service.removeProductById(String(id)).subscribe(x => console.log(x));
  }

  findCategoryName(id: string) {
    return this.CategoryObject.filter((x: { _id: string; }) => x._id === id).map((x: { name: string; }) => x.name);
  }

  calDiscountAmount(price: number, percen: number) {
    return (price * ((100 - percen) / 100)).toFixed(2);
  }

  chkDiscount(val: any) {
    if (val) {
      return true
    } else {
      return false
    }
  }
}
