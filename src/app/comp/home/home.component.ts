import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/global-constants';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: ApiService) { }
  userCnt: number = 0;
  productCnt: number = 0;
  categoryCnt: number = 0;

  ngOnInit(): void {
    if (localStorage.getItem("isFirstPulled") !== "true") {
      localStorage.setItem('isFirstPulled', "true");
      // console.log("🔰", "Pulled from DB")
      // ! g_Products
      // if (localStorage.getItem("g_Products") === undefined) {
      this.service.getAllProducts().subscribe(x => {
        // GlobalConstants.g_Products = x;
        localStorage.setItem('g_Products', JSON.stringify(x));
        localStorage.setItem('g_productCnt', String(x.length));

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
      })

      // } else {
      //   this.userCnt = JSON.parse(localStorage.getItem("g_Users") as any).length
      // }
    }

    this.productCnt = parseInt(localStorage.getItem("g_productCnt") as string)
    this.categoryCnt = parseInt(localStorage.getItem("g_categoryCnt") as string)
    this.userCnt = parseInt(localStorage.getItem("g_userCnt") as string)

  }

}
