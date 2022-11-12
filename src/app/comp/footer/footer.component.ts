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
    // localStorage.setItem('g_msg_color', this.msgColor as any)
    // localStorage.setItem('g_msg_title', this.msgTitle as any)
    // localStorage.setItem('g_msg_text', this.msgText as any)
    // localStorage.setItem('g_msg_update', "true")
  }

  closeBtn() {
    localStorage.setItem('g_msg_update', "false")
    localStorage.setItem('g_msg_color', "")
    localStorage.setItem('g_msg_title', "")
    localStorage.setItem('g_msg_text', "")
    this.isClosed = true
  }

  updateMsg() {

    this.msgUpdate = localStorage.getItem('g_msg_update')

    if (this.msgUpdate === "true") {
      this.msgColor = localStorage.getItem('g_msg_color')
      this.msgTitle = localStorage.getItem('g_msg_title')
      this.msgText = localStorage.getItem('g_msg_text')
      this.isClosed = false
      return true
    } else {
      return false
    }
  }

}
