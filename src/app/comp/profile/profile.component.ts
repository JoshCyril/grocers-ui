import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderN } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { WishlistN } from 'src/app/models/wishlist.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  wishlist: WishlistN[]
  order: OrderN[]
  id: any;
  isEditable: boolean;
  products: any;

  constructor(private service: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // update message
    sessionStorage.setItem('g_msg_update', "true")
    sessionStorage.setItem('g_msg_color', "primary")
    sessionStorage.setItem('g_msg_title', "Updated:")
    sessionStorage.setItem('g_msg_text', "Profile")

    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getUserById(String(this.id)).subscribe(x => this.user = x);
    this.service.getWishListsByUserId(this.id).subscribe(x => this.wishlist = x);
    this.service.getOrdersByUserId(this.id).subscribe(x => this.order = x);

    if (this.id == null) {
      this.isEditable = false
    } else {
      this.isEditable = true
    }
  }
  findProductName(id: string) {
    this.products = JSON.parse(localStorage.getItem("g_Products") as any)
    return this.products.filter((x: { _id: string; }) => x._id === id).map((x: { name: string; }) => x.name);
  }
}
