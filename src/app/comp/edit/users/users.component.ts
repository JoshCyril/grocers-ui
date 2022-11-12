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
    this.uadmin = localStorage.getItem('g_uadmin')
    if (this.uadmin === "true") {
      this.service.getAllUsers().subscribe(x => {
        this.users = x;
        localStorage.setItem('g_count_user', String(x.length))
      })
    } else {
      this.router.navigate(['/home']);
      // update message
      localStorage.setItem('g_msg_update', "true")
      localStorage.setItem('g_msg_color', "warning")
      localStorage.setItem('g_msg_title', "Permission Denied:")
      localStorage.setItem('g_msg_text', "You don't have admin access")
    }
  }

  delete(id: string) {
    this.users = this.users.filter(u => u._id !== id)
    this.service.removeUserById(String(id)).subscribe(x => console.log(x));

    // update message
    localStorage.setItem('g_msg_update', "true")
    localStorage.setItem('g_msg_color', "danger")
    localStorage.setItem('g_msg_title', "Deleted:")
    localStorage.setItem('g_msg_text', "User")
  }
}
