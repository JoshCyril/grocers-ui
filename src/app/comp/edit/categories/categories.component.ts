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
    this.uadmin = localStorage.getItem('g_uadmin')

    if (this.uadmin === "true") {
      this.service.getAllCategory().subscribe(x => this.category = x)
    } else {
      this.router.navigate(['/home']);
    }
  }

  delete(id: string) {
    this.category = this.category.filter(u => u._id !== id)
    this.service.removeCategoryById(String(id)).subscribe(x => console.log(x));
  }

}
