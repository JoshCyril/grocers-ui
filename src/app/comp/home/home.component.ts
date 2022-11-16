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

  constructor(private service: ApiService) { }
  userCnt: number = 0;
  productCnt: number = 0;
  categoryCnt: number = 0;

  ngOnInit(): void {
    this.uid = sessionStorage.getItem('g_uid')
    if (localStorage.getItem("isFirstPulled") !== "true") {
      localStorage.setItem('isFirstPulled', "true");
      // console.log("🔰", "Pulled from DB")
      // ! g_Products
      // if (localStorage.getItem("g_Products") === undefined) {
      this.service.getAllProducts().subscribe(x => {
        // GlobalConstants.g_Products = x;
        localStorage.setItem('g_Products', JSON.stringify(x));
        localStorage.setItem('g_productCnt', String(x.length));
        this.productCnt = parseInt(localStorage.getItem("g_productCnt") as string)

        if (this.uid !== null) {
          this.products = JSON.parse(localStorage.getItem("g_Products") as any)
          this.service.getWishListsByUserId(this.uid).subscribe(Wishlist => {
            for (let i = 0; i <= Wishlist.length - 1; i++) {
              for (let j = 0; j <= this.products.length - 1; j++) {
                if (this.products[j]._id === Wishlist[i].product_id) {
                  this.products[j].isLiked = Wishlist[i].isLiked
                }
              }
            }
          })
          localStorage.setItem('g_Products', JSON.stringify(this.products));
        }
      })

      // } else {
      //   this.productCnt = JSON.parse(localStorage.getItem("g_Products") as any).length
      // }

      // ! g_Categories
      // if (localStorage.getItem("g_Categories") === undefined) {
      this.service.getAllCategory().subscribe(x => {
        // GlobalConstants.g_Products = x;
        localStorage.setItem('g_Categories', JSON.stringify(x));
        localStorage.setItem('g_categoryCnt', String(x.length));
        this.categoryCnt = parseInt(localStorage.getItem("g_categoryCnt") as string)
      })

      // } else {
      //   this.categoryCnt = JSON.parse(localStorage.getItem("g_Categories") as any).length
      // }

      // ! g_Users
      // if (localStorage.getItem("g_Users") === undefined) {
      this.service.getAllUsers().subscribe(x => {
        // GlobalConstants.g_Products = x;
        localStorage.setItem('g_Users', JSON.stringify(x));
        localStorage.setItem('g_userCnt', String(x.length));
        this.userCnt = parseInt(localStorage.getItem("g_userCnt") as string)
      })

    } else {
      this.productCnt = parseInt(localStorage.getItem("g_productCnt") as string)
      this.categoryCnt = parseInt(localStorage.getItem("g_categoryCnt") as string)
      this.userCnt = parseInt(localStorage.getItem("g_userCnt") as string)
    }
  }



}
