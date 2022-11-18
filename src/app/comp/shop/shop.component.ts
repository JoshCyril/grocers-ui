import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { iif } from 'rxjs';
import { Wishlist } from 'src/app/models/wishlist.model';

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
  cartItems: string[] = [];
  cartCount: any;
  isIDEnabled: boolean = false;
  wishlist: Wishlist = new Wishlist();
  uid: any;


  constructor(private router: Router, private route: ActivatedRoute, private service: ApiService) { }

  title = 'instant-search';
  public searchInput: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.uid = sessionStorage.getItem('g_uid')

    this.products = JSON.parse(sessionStorage.getItem("g_Products") as any)
    this.CategoryObject = JSON.parse(sessionStorage.getItem("g_Categories") as any)

    if (this.id == null) {
      this.isIDEnabled = false
      this.ProductObject = this.products
      this.cat_name = "All Products"

    } else {
      this.isIDEnabled = true
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


    this.cartItems = JSON.parse(sessionStorage.getItem("g_cartItems") as any)
    this.cartCount = JSON.parse(sessionStorage.getItem("g_cartCount") as any)
    // ! Add Cart
    this.isItemAdded = true
    if (this.cartItems === null) {
      this.cartItems = []
    }
    this.cartItems.push(ctrProduct[0])
    this.cartCount++
    // GlobalConstants.Cart_Items.push(ctrProduct[0])
    // this.cartCount++

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
    sessionStorage.setItem('g_cartItems', JSON.stringify(this.cartItems));
    sessionStorage.setItem('g_cartCount', JSON.stringify(this.cartCount));

    let Old_id = this.products.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    let New_id = this.ProductObject.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    let New_obj = this.ProductObject[New_id];

    this.products.splice(Old_id, 1, New_obj);
    // GlobalConstants.g_Products = this.products
    sessionStorage.setItem('g_Products', JSON.stringify(this.products));

    //~ update message
    sessionStorage.setItem('g_msg_update', "true")
    sessionStorage.setItem('g_msg_color', "secondary")
    sessionStorage.setItem('g_msg_title', "🛒:")
    sessionStorage.setItem('g_msg_text', "Updated")
  }

  addOneItem(getProductId: string) {

    this.avaProduct = JSON.parse(sessionStorage.getItem("g_cartItems") as any)
    this.cartCount = JSON.parse(sessionStorage.getItem("g_cartCount") as any)

    for (let i = 0; i <= this.avaProduct.length - 1; i++) {
      if (this.avaProduct[i]._id === getProductId) {
        this.avaProduct[i].quantity = parseInt(this.avaProduct[i].quantity) - 1
        this.avaProduct[i].NofItems = parseInt(this.avaProduct[i].NofItems) + 1
        this.cartCount = parseInt(this.cartCount) + 1

        break;
      }
    }

    // ! update global variable
    sessionStorage.setItem('g_cartItems', JSON.stringify(this.avaProduct));
    sessionStorage.setItem('g_cartCount', JSON.stringify(this.cartCount));

    let Old_id = this.products.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    let New_id = this.avaProduct.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    let New_obj = this.avaProduct[New_id];

    this.products.splice(Old_id, 1, New_obj);
    // GlobalConstants.g_Products = this.products
    sessionStorage.setItem('g_Products', JSON.stringify(this.products));


    // for (let i = 0; i <= this.products.length - 1; i++) {
    //   if (this.products[i]._id === getProductId) {
    //     console.log("💙", this.products[i].NofItems)
    //     this.products[i].NofItems++
    //     console.log("💙", this.products[i].NofItems)
    //     this.products[i].quantity--
    //     break;
    //   }
    // }

    // ! update products
    this.products = JSON.parse(sessionStorage.getItem("g_Products") as any)
    if (this.isIDEnabled) {
      this.ProductObject = this.products.filter((u: { category_id: string | null; }) => u.category_id === this.id)
    } else {
      this.ProductObject = this.products
    }
  }

  removeOneItem(getProductId: string) {

    this.avaProduct = JSON.parse(sessionStorage.getItem("g_cartItems") as any)
    this.cartCount = JSON.parse(sessionStorage.getItem("g_cartCount") as any)

    for (let i = 0; i <= this.avaProduct.length - 1; i++) {
      if (this.avaProduct[i]._id === getProductId) {
        this.avaProduct[i].quantity = parseInt(this.avaProduct[i].quantity) + 1
        this.avaProduct[i].NofItems = parseInt(this.avaProduct[i].NofItems) - 1
        this.cartCount = parseInt(this.cartCount) - 1
        if (this.avaProduct[i].NofItems == 0) {
          this.avaProduct.splice(i, 1);
        }
        break;
      }
    }


    for (let i = 0; i <= this.products.length - 1; i++) {
      if (this.products[i]._id === getProductId) {
        this.products[i].NofItems--
        this.products[i].quantity++
        break;
      }
    }

    // ! update global variable\
    sessionStorage.setItem('g_cartItems', JSON.stringify(this.avaProduct));
    sessionStorage.setItem('g_cartCount', JSON.stringify(this.cartCount));

    // let Old_id = this.products.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    // let New_id = this.avaProduct.map(function (x: { _id: string; }) { return x._id; }).indexOf(getProductId);
    // let New_obj = this.avaProduct[New_id];

    // this.products.splice(Old_id, 1, New_obj);
    // GlobalConstants.g_Products = this.products
    sessionStorage.setItem('g_Products', JSON.stringify(this.products));


    // ! update products
    this.products = JSON.parse(sessionStorage.getItem("g_Products") as any)
    if (this.isIDEnabled) {
      this.ProductObject = this.products.filter((u: { category_id: string | null; }) => u.category_id === this.id)
    } else {
      this.ProductObject = this.products
    }

  }

  changeOnClick(isl: boolean, p_id: string, w_id: string) {
    console.log(isl, p_id, w_id)
    if (!isl) {
      // ~ Add to wishlist - FALSE
      this.wishlist = {
        user_id: this.uid,
        product_id: p_id,
        isLiked: true
      }
      this.service.addWishList(this.wishlist).subscribe((x: any) => {
        console.log(x, 'updated wishlist')
        //updated product
        this.products = JSON.parse(sessionStorage.getItem("g_Products") as any)
        let Old_id = this.products.map(function (x: { _id: string; }) { return x._id; }).indexOf(p_id);
        this.products[Old_id].w_id = x._id
        this.products[Old_id].isLiked = true
        sessionStorage.setItem('g_Products', JSON.stringify(this.products));
        location.href = this.router.url;
      });


    } else if (isl) {
      // ~ Remove from wishlist - TRUE
      this.service.removeWishListById(String(w_id)).subscribe(x => { });

      this.products = JSON.parse(sessionStorage.getItem("g_Products") as any)
      let Old_id = this.products.map(function (x: { _id: string; }) { return x._id; }).indexOf(p_id);
      this.products[Old_id].isLiked = false
      this.products[Old_id].w_id = ""
      sessionStorage.setItem('g_Products', JSON.stringify(this.products));
      location.href = this.router.url
      //updated product


    }
  }

}