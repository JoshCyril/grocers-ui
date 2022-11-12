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
      this.service.getAllProducts().subscribe(x => {
        this.product = x;
        localStorage.setItem('g_count_product', String(x.length))
      })
    } else {
      this.router.navigate(['/home']);
      // update message
      localStorage.setItem('g_msg_update', "true")
      localStorage.setItem('g_msg_color', "warning")
      localStorage.setItem('g_msg_title', "Permission Denied:")
      localStorage.setItem('g_msg_text', "You don't have admin access")
    }
  }

  delete(id: string) {
    this.product = this.product.filter(u => u._id !== id)
    this.service.removeProductById(String(id)).subscribe(x => console.log(x));

    // update message
    localStorage.setItem('g_msg_update', "true")
    localStorage.setItem('g_msg_color', "danger")
    localStorage.setItem('g_msg_title', "Deleted:")
    localStorage.setItem('g_msg_text', "Product")

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
