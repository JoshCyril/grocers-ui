import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  uid: string | null;
  products: any;
  userExist: boolean = false

  constructor(private service: ApiService) { }
  userCnt: number = 0;
  productCnt: number = 0;
  categoryCnt: number = 0;

  ngOnInit(): void {
    this.uid = sessionStorage.getItem('g_uid')

    if (sessionStorage.getItem("isFirstPulled") !== "true") {

      sessionStorage.setItem('g_cartItems', JSON.stringify([]));
      sessionStorage.setItem('g_cartCount', JSON.stringify(0));

      sessionStorage.setItem('isFirstPulled', "true");
      // console.log("🔰", "Pulled from DB")
      // ! g_Products
      // if (sessionStorage.getItem("g_Products") === undefined) {
      this.service.getAllProducts().subscribe(x => {
        // GlobalConstants.g_Products = x;
        sessionStorage.setItem('g_Products', JSON.stringify(x));
        sessionStorage.setItem('g_productCnt', String(x.length));
        this.productCnt = parseInt(sessionStorage.getItem("g_productCnt") as string)

        if (this.uid !== null) {
          this.userExist = true
          this.products = JSON.parse(sessionStorage.getItem("g_Products") as any)

          for (let k = 0; k <= this.products.length - 1; k++) {
            this.products[k].isLiked = false
          }

          this.service.getWishListsByUserId(this.uid).subscribe(Wishlist => {
            for (let i = 0; i <= Wishlist.length - 1; i++) {
              for (let j = 0; j <= this.products.length - 1; j++) {
                if (this.products[j]._id === Wishlist[i].product_id) {
                  this.products[j].w_id = Wishlist[i]._id
                  this.products[j].isLiked = Wishlist[i].isLiked
                }
              }
            }
            sessionStorage.setItem('g_Products', JSON.stringify(this.products));
          })

        }
      })

      // } else {
      //   this.productCnt = JSON.parse(sessionStorage.getItem("g_Products") as any).length
      // }

      // ! g_Categories
      // if (sessionStorage.getItem("g_Categories") === undefined) {
      this.service.getAllCategory().subscribe(x => {
        // GlobalConstants.g_Products = x;
        sessionStorage.setItem('g_Categories', JSON.stringify(x));
        sessionStorage.setItem('g_categoryCnt', String(x.length));
        this.categoryCnt = parseInt(sessionStorage.getItem("g_categoryCnt") as string)
      })

      // } else {
      //   this.categoryCnt = JSON.parse(sessionStorage.getItem("g_Categories") as any).length
      // }

      // ! g_Users
      // if (sessionStorage.getItem("g_Users") === undefined) {
      this.service.getAllUsers().subscribe(x => {
        // GlobalConstants.g_Products = x;
        sessionStorage.setItem('g_Users', JSON.stringify(x));
        sessionStorage.setItem('g_userCnt', String(x.length));
        this.userCnt = parseInt(sessionStorage.getItem("g_userCnt") as string)
      })

    } else {
      if (this.uid !== null) {
        this.userExist = true
      } else {
        this.userExist = false
      }
      this.productCnt = parseInt(sessionStorage.getItem("g_productCnt") as string)
      this.categoryCnt = parseInt(sessionStorage.getItem("g_categoryCnt") as string)
      this.userCnt = parseInt(sessionStorage.getItem("g_userCnt") as string)
    }
  }



}
