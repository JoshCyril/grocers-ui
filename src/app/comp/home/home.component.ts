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

    this.service.getAllProducts().subscribe(x => {
      // GlobalConstants.g_Products = x;
      localStorage.setItem('g_Products', JSON.stringify(x));
      this.productCnt = x.length;
    })

    this.service.getAllCategory().subscribe(x => {
      // GlobalConstants.g_Categories = x;
      localStorage.setItem('g_Categories', JSON.stringify(x));
      this.categoryCnt = x.length;
    })

    this.service.getAllUsers().subscribe(x => {
      // GlobalConstants.g_Users = x;
      localStorage.setItem('g_Users', JSON.stringify(x));
      this.userCnt = x.length;
    })

  }

}
