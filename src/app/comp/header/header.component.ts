import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
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
    this.uid = localStorage.getItem('g_uid')
    this.uname = localStorage.getItem('g_uname')
    this.uadmin = localStorage.getItem('g_uadmin')
    // console.log(this.uid, this.uname);
    // this.reloadPage()
  }

  getVal() {

    this.uid = localStorage.getItem('g_uid')
    this.uname = localStorage.getItem('g_uname')
    this.uadmin = localStorage.getItem('g_uadmin')

    if (this.uid !== null) {
      // console.log("uID: true", this.uid)
      return true
    } else {
      // console.log("uID: false", this.uid)
      return false
    }
  }
  logout() {
    localStorage.removeItem('g_uid')
    localStorage.removeItem('g_uname')
    localStorage.removeItem('g_uadmin')
    return true
  }

  isUserAdmin() {
    this.uadmin = localStorage.getItem('g_uadmin')
    if (this.uadmin === "true") {
      return true
    } else {
      return false
    }

  }
}
