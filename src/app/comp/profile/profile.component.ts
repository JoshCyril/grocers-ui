import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  id: any;
  isEditable: boolean;

  constructor(private service: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // update message
    localStorage.setItem('g_msg_update', "true")
    localStorage.setItem('g_msg_color', "primary")
    localStorage.setItem('g_msg_title', "Updated:")
    localStorage.setItem('g_msg_text', "Profile")

    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getUserById(String(this.id)).subscribe(x => this.user = x);
    if (this.id == null) {
      this.isEditable = false
    } else {
      this.isEditable = true
    }
  }

}
