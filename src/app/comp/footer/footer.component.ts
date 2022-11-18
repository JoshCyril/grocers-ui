import { Component, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isClosed: boolean = false;
  msgColor: string | null = "secondary";
  msgTitle: string | null = "Hello";
  msgText: string | null = "👋";
  msgUpdate: string | null = "true";


  constructor() { }

  ngOnInit(): void {
    // sessionStorage.setItem('g_msg_color', this.msgColor as any)
    // sessionStorage.setItem('g_msg_title', this.msgTitle as any)
    // sessionStorage.setItem('g_msg_text', this.msgText as any)
    // sessionStorage.setItem('g_msg_update', "true")
  }

  closeBtn() {
    sessionStorage.setItem('g_msg_update', "false")
    sessionStorage.setItem('g_msg_color', "")
    sessionStorage.setItem('g_msg_title', "")
    sessionStorage.setItem('g_msg_text', "")
    this.isClosed = true
  }

  updateMsg() {

    this.msgUpdate = sessionStorage.getItem('g_msg_update')

    if (this.msgUpdate === "true") {
      this.msgColor = sessionStorage.getItem('g_msg_color')
      this.msgTitle = sessionStorage.getItem('g_msg_title')
      this.msgText = sessionStorage.getItem('g_msg_text')
      this.isClosed = false
      return true
    } else {
      return false
    }
  }

}
