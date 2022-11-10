import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  uid: string | null;
  uname: string | null;
  uadmin: string | null;

  constructor(public router: Router, private authServ: LoginService) { }

  ngOnInit(): void {
    this.uid = localStorage.getItem('g_uid')
    this.uname = localStorage.getItem('g_uname')
    this.uadmin = localStorage.getItem('g_uadmin')
    console.log(this.uid, this.uname);
    this.authServ.loginUser(this.uid !== null)
    this.authServ.getEmitter().subscribe(x => console.log(x))
  }

  reloadComponent(self: boolean, urlToNavigateTo?: string) {
    //skipLocationChange:true means dont update the url to / when navigating
    console.log("Current route I am on:", this.router.url);
    const url = self ? this.router.url : urlToNavigateTo;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${url}`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`)
      })
    })
  }

  reloadPage() {
    window.location.reload()
    console.log(`:${this.router.url} reloaded`)
  }

}
