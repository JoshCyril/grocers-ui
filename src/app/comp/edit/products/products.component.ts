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
    this.uadmin = sessionStorage.getItem('g_uadmin')
    // this.CategoryObject = GlobalConstants.g_Categories
    this.CategoryObject = JSON.parse(sessionStorage.getItem("g_Categories") as any)

    if (this.uadmin === "true") {
      this.service.getAllProducts().subscribe(x => {
        this.product = x;
        // GlobalConstants.g_Products = x;
        sessionStorage.setItem('g_Products', JSON.stringify(x));
      })
    } else {
      this.router.navigate(['/home']);
      // update message
      sessionStorage.setItem('g_msg_update', "true")
      sessionStorage.setItem('g_msg_color', "warning")
      sessionStorage.setItem('g_msg_title', "Permission Denied:")
      sessionStorage.setItem('g_msg_text', "You don't have admin access")
    }
  }

  delete(id: string) {
    this.product = this.product.filter(u => u._id !== id)
    this.service.removeProductById(String(id)).subscribe(x => console.log(x));

    // update message
    sessionStorage.setItem('g_msg_update', "true")
    sessionStorage.setItem('g_msg_color', "danger")
    sessionStorage.setItem('g_msg_title', "Deleted:")
    sessionStorage.setItem('g_msg_text', "Product")

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
