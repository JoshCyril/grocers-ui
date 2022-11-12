import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // update message
    localStorage.setItem('g_msg_update', "true")
    localStorage.setItem('g_msg_color', "danger")
    localStorage.setItem('g_msg_title', "Go Back:")
    localStorage.setItem('g_msg_text', "Click on the logo, top-left!")
  }

}
