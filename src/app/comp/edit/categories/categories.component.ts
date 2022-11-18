import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private router: Router, private service: ApiService) { }

  category: Category[]
  uadmin: string | null;

  ngOnInit(): void {
    this.uadmin = sessionStorage.getItem('g_uadmin')

    if (this.uadmin === "true") {
      this.service.getAllCategory().subscribe(x => {
        sessionStorage.setItem('g_Categories', JSON.stringify(x));
        // GlobalConstants.g_Categories = x;
        this.category = x;
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
    this.category = this.category.filter(u => u._id !== id)
    this.service.removeCategoryById(String(id)).subscribe(x => console.log(x));

    // update message
    sessionStorage.setItem('g_msg_update', "true")
    sessionStorage.setItem('g_msg_color', "danger")
    sessionStorage.setItem('g_msg_title', "Deleted:")
    sessionStorage.setItem('g_msg_text', "Category")
  }

}
