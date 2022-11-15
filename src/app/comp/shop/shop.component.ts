import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-constants';
import { ApiService } from 'src/app/services/api.service';
import { iif } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  CategoryObject: any;
  ProductObject: any;
  products: any;
  id: string | null;
  cat_name: string | null;
  avaProduct: any;

  constructor(private router: Router, private service: ApiService, private route: ActivatedRoute) { }

  title = 'instant-search';
  public searchInput: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id == null) {
      if (this.ProductObject === undefined) {
        this.service.getAllProducts().subscribe(x => {
          localStorage.setItem('g_count_product', String(x.length))
          localStorage.setItem('g_products', JSON.stringify(x))
          this.ProductObject = JSON.parse(localStorage.getItem('g_products') as any);
          this.products = this.ProductObject
        })
      }

      if (this.CategoryObject === undefined) {
        this.service.getAllCategory().subscribe(x => {
          localStorage.setItem('g_count_category', String(x.length))
          localStorage.setItem('g_categories', JSON.stringify(x))
          this.CategoryObject = JSON.parse(localStorage.getItem('g_categories') as any);
        })
      }
      this.cat_name = "All Products"
    } else {
      this.CategoryObject = JSON.parse(localStorage.getItem('g_categories') as any);
      this.ProductObject = JSON.parse(localStorage.getItem('g_products') as any);
      this.products = this.ProductObject.filter((u: { category_id: string | null; }) => u.category_id === this.id)
      this.cat_name = this.findCategoryName(this.id)
    }

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
  addToCart(getProductId: string) {
    const ctrProduct = this.products.filter((x: { _id: string; }) => x._id === getProductId)

    //percentage price
    let F_Price = ""
    if (ctrProduct[0].discount[0].isDiscounted) {

      F_Price = (ctrProduct[0].price * ((100 - ctrProduct[0].discount[0].percentage) / 100)).toFixed(2);
    } else {
      F_Price = (ctrProduct[0].price).toFixed(2)
    }
    ctrProduct[0].quantity--
    ctrProduct[0].NofItems = 1
    ctrProduct[0].F_price = parseFloat(F_Price)

    //Add Cart
    GlobalConstants.Cart_Items.push(ctrProduct[0])
    GlobalConstants.cartCount++

    //Duplicate product
    this.avaProduct = GlobalConstants.Cart_Items
    console.log(this.avaProduct);
    for (let i = 0; i <= this.avaProduct.length - 1; i++) {
      console.log(i + 1, this.avaProduct[i].name);
      if (this.avaProduct[i]._id === getProductId && (this.avaProduct.length - 1 !== i)) {
        console.log(i + 1, this.avaProduct[i].name);
        this.avaProduct[i].NofItems++
        GlobalConstants.Cart_Items.splice(GlobalConstants.Cart_Items.length - 1, 1);
        GlobalConstants.cartCount--
      }
    }

    // update message
    localStorage.setItem('g_msg_update', "true")
    localStorage.setItem('g_msg_color', "secondary")
    localStorage.setItem('g_msg_title', "Item:")
    localStorage.setItem('g_msg_text', "Added to Cart")
  }
}