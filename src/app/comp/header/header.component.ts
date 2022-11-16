import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { GlobalConstants } from 'src/app/global-constants';
import { ModelCartComponent } from '../model-cart/model-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  uid: string | null;
  uname: string | null;
  uadmin: string | null;
  modalRef: MdbModalRef<ModelCartComponent> | null = null;

  constructor(public router: Router, private modalService: MdbModalService) { }


  openModal() {
    this.modalRef = this.modalService.open(ModelCartComponent, {
      data: { title: 'Viewing Cart' },
    });
  }

  ngOnInit(): void {
    this.uid = sessionStorage.getItem('g_uid')
    this.uname = sessionStorage.getItem('g_uname')
    this.uadmin = sessionStorage.getItem('g_uadmin')
    // console.log(this.uid, this.uname);
    // this.reloadPage()
  }

  getVal() {

    this.uid = sessionStorage.getItem('g_uid')
    this.uname = sessionStorage.getItem('g_uname')
    this.uadmin = sessionStorage.getItem('g_uadmin')

    if (this.uid !== null) {
      // console.log("uID: true", this.uid)
      return true
    } else {
      // console.log("uID: false", this.uid)
      return false
    }
  }
  logout() {
    sessionStorage.removeItem('g_uid')
    sessionStorage.removeItem('g_uname')
    sessionStorage.removeItem('g_uadmin')

    this.router.navigate(['home']);

    // update message
    sessionStorage.setItem('g_msg_update', "true")
    sessionStorage.setItem('g_msg_color', "success")
    sessionStorage.setItem('g_msg_title', "User Signned Out")
    sessionStorage.setItem('g_msg_text', "")

    return true
  }

  isUserAdmin() {
    this.uadmin = sessionStorage.getItem('g_uadmin')
    if (this.uadmin === "true") {
      return true
    } else {
      return false
    }

  }
  getCartItems() {
    return GlobalConstants.cartCount
  }
}
