import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  //form declareds
  category: Category = new Category();
  registerForm: FormGroup;
  submitted: boolean = false;
  isEditable: boolean = false;
  id: string | null;
  uadmin: string | null;

  constructor(private builder: FormBuilder,
    private service: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.uadmin = sessionStorage.getItem('g_uadmin')
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.uadmin === "true") {
      if (this.id == null) {
        this.isEditable = false
        this.registerForm = this.builder.group({
          name: ['', Validators.required],
          imgUrl: ['', Validators.required],

        })
      } else {
        this.isEditable = true
        this.service.getCategoryById(String(this.id)).subscribe(x => this.category = x);
        this.registerForm = this.builder.group({
          name: [this.category.name, Validators.required],
          imgUrl: [this.category.imgUrl, Validators.required],

        })
      }
    } else {
      this.router.navigate(['/home']);
      // update message
      sessionStorage.setItem('g_msg_update', "true")
      sessionStorage.setItem('g_msg_color', "warning")
      sessionStorage.setItem('g_msg_title', "Permission Denied:")
      sessionStorage.setItem('g_msg_text', "You don't have admin access")
    }
  }
  get form() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid)
      return;
    else {
      console.log(this.category)
      if (this.isEditable) {
        this.service.modifyCategory(this.category, String(this.id)).subscribe(x => { console.log(x, 'category modified'); location.href = 'e/categories' });
        // this.router.navigate(['e/categories']);

        // update message
        sessionStorage.setItem('g_msg_update', "true")
        sessionStorage.setItem('g_msg_color', "primary")
        sessionStorage.setItem('g_msg_title', "Updated:")
        sessionStorage.setItem('g_msg_text', "Category")
      } else {
        this.service.addCategory(this.category).subscribe(x => { console.log(x, 'category added'); location.href = 'e/categories' });
        // this.router.navigate(['e/categories']);
        // update message
        sessionStorage.setItem('g_msg_update', "true")
        sessionStorage.setItem('g_msg_color', "primary")
        sessionStorage.setItem('g_msg_title', "Added:")
        sessionStorage.setItem('g_msg_text', "Category")
      }
    }
  }
  public textUrl: string;

  onChange(UpdatedValue: string): void {
    this.textUrl = UpdatedValue;
  }

}
