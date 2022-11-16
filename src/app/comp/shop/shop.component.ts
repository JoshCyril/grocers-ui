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
  isItemAdded: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  title = 'instant-search';
  public searchInput: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.products = JSON.parse(localStorage.getItem("g_Products") as any)
    this.CategoryObject = JSON.parse(localStorage.getItem("g_Categories") as any)

    console.log(this.products)

    if (this.id == null) {

      this.ProductObject = this.products
      this.cat_name = "All Products"

    } else {

      this.ProductObject = this.products.filter((u: { category_id: string | null; }) => u.category_id === this.id)
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
    const ctrProduct = this.ProductObject.filter((x: { _id: string; }) => x._id === getProductId)

    // ! percentage price
    let F_Price = ""
    if (ctrProduct[0].discount[0].isDiscounted) {

      F_Price = (ctrProduct[0].price * ((100 - ctrProduct[0].discount[0].percentage) / 100)).toFixed(2);
    } else {
      F_Price = (ctrProduct[0].price).toFixed(2)
    }
    ctrProduct[0].quantity--
    ctrProduct[0].NofItems = 1
    ctrProduct[0].F_price = parseFloat(F_Price)


    for (let i = 0; i <= this.ProductObject.length - 1; i++) {
      if (this.ProductObject[i]._id === getProductId) {
        this.ProductObject[i].NofItems = ctrProduct[0].NofItems
        this.ProductObject[i].quantity = ctrProduct[0].quantity
        this.ProductObject[i].F_price = ctrProduct[0].F_price
        break;
      }
    }

    // ! Add Cart
    this.isItemAdded = true
    GlobalConstants.Cart_Items.push(ctrProduct[0])
    GlobalConstants.cartCount++

    // ! Duplicate product
    // this.avaProduct = GlobalConstants.Cart_Items
    // console.log(this.avaProduct);
    // for (let i = 0; i <= this.avaProduct.length - 1; i++) {
    //   if (this.avaProduct[i]._id === getProductId) {
    //     this.avaProduct[i].NofItems++
    //     GlobalConstants.Cart_Items.splice(GlobalConstants.Cart_Items.length - 1, 1);
    //     GlobalConstants.cartCount--
    //   }
    // }

    // this.products = GlobalConstants.Cart_Items

    // ! update global variable
    let Old_id = this.products.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    let New_id = this.ProductObject.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    let New_obj = this.ProductObject[New_id];

    this.products.splice(Old_id, 1, New_obj);
    // GlobalConstants.g_Products = this.products
    localStorage.setItem('g_Products', JSON.stringify(this.products));

    //~ update message
    localStorage.setItem('g_msg_update', "true")
    localStorage.setItem('g_msg_color', "secondary")
    localStorage.setItem('g_msg_title', "Item:")
    localStorage.setItem('g_msg_text', "Added to Cart")
  }

  addOneItem(getProductId: string) {

    this.avaProduct = GlobalConstants.Cart_Items
    for (let i = 0; i <= this.avaProduct.length - 1; i++) {
      if (this.avaProduct[i]._id === getProductId) {
        this.avaProduct[i].quantity--
        this.avaProduct[i].NofItems++
        GlobalConstants.cartCount++
        break;
      }

      // ! update global variable
      let Old_id = this.products.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
      let New_id = this.avaProduct.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
      let New_obj = this.avaProduct[New_id];

      this.products.splice(Old_id, 1, New_obj);
      // GlobalConstants.g_Products = this.products
      localStorage.setItem('g_Products', JSON.stringify(this.products));

    }
    // for (let i = 0; i <= this.products.length - 1; i++) {
    //   if (this.products[i]._id === getProductId) {
    //     console.log("💙", this.products[i].NofItems)
    //     this.products[i].NofItems++
    //     console.log("💙", this.products[i].NofItems)
    //     this.products[i].quantity--
    //     break;
    //   }
    // }
  }

  removeOneItem(getProductId: string) {

    this.avaProduct = GlobalConstants.Cart_Items
    for (let i = 0; i <= this.avaProduct.length - 1; i++) {
      if (this.avaProduct[i]._id === getProductId) {
        this.avaProduct[i].quantity++
        this.avaProduct[i].NofItems--
        GlobalConstants.cartCount--
        if (this.avaProduct[i].NofItems == 0) {
          GlobalConstants.Cart_Items.splice(i, 1);
        }
        break;
      }
    }

    // ! update global variable
    let Old_id = this.products.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    let New_id = this.avaProduct.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    let New_obj = this.avaProduct[New_id];

    this.products.splice(Old_id, 1, New_obj);
    // GlobalConstants.g_Products = this.products
    localStorage.setItem('g_Products', JSON.stringify(this.products));

    // for (let i = 0; i <= this.products.length - 1; i++) {
    //   if (this.products[i]._id === getProductId) {
    //     this.products[i].NofItems--
    //     this.products[i].quantity++
    //     break;
    //   }
    // }

  }


}