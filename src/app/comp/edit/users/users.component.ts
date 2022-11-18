import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iif } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  uadmin: string | null;

  constructor(private router: Router, private service: ApiService) { }

  users: User[]

  ngOnInit(): void {
    this.uadmin = sessionStorage.getItem('g_uadmin')
    if (this.uadmin === "true") {
      this.service.getAllUsers().subscribe(x => {
        // GlobalConstants.g_Users = x;
        sessionStorage.setItem('g_Users', JSON.stringify(x));
        this.users = x;
      })
    } else {
      this.router.navigate(['/home']);
      // update message
      sessionStorage.setItem('g_msg_update', "true")
      sessionStorage.setItem('g_msg_color', "warning")
      sessionStorage.setItem('g_msg_title', "Permission Denied:")
      sessionStorage.setItem('g_msg_text', "You don't have admin access")
    }
  }

  delete(id: string) {
    this.users = this.users.filter(u => u._id !== id)
    this.service.removeUserById(String(id)).subscribe(x => console.log(x));

    // update message
    sessionStorage.setItem('g_msg_update', "true")
    sessionStorage.setItem('g_msg_color', "danger")
    sessionStorage.setItem('g_msg_title', "Deleted:")
    sessionStorage.setItem('g_msg_text', "User")
  }
}
