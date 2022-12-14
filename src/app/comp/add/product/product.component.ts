import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  //form declareds
  product: Product = new Product();
  // product: Product = {} as Product;
  registerForm: FormGroup;
  submitted: boolean = false;
  isEditable: boolean = false;
  id: string | null;
  CategoryObject: string | any = "";
  imgStr: string = "";
  tagStr: string = "";
  imgArr: string[] = [];
  tagArr: string[] = [];
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
          description: ['', Validators.required],
          price: ['', Validators.required],
          quantity: ['', Validators.required],
          percentage: [0, Validators.required],
          imgUrls: ['', Validators.required],
          tags: ['', Validators.required],
          category_id: ['']
        })
      } else {
        this.isEditable = true
        this.service.getProductById(String(this.id)).subscribe(x => { this.product = x; console.log(x) });
        this.registerForm = this.builder.group({
          name: [this.product.name, Validators.required],
          description: [this.product.description, Validators.required],
          price: [this.product.price, Validators.required],
          quantity: [this.product.quantity, Validators.required],
          percentage: [0, Validators.required],
          imgUrls: [this.product.imgUrls, Validators.required],
          tags: [this.product.tags, Validators.required],
          category_id: [this.product.category_id]

        })
      }

      // ~ Store Category in local storage
      this.service.getAllCategory().subscribe(x => {
        sessionStorage.setItem('g_categories', JSON.stringify(x))
      })

      this.CategoryObject = JSON.parse(sessionStorage.getItem('g_categories') as any);
      // console.log('Category Object: ', JSON.parse(this.CategoryObject) as any);

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

      this.imgStr = this.product.imgUrls.toString()
      this.tagStr = this.product.tags.toString()

      this.imgArr = this.imgStr.toString().split(",");
      this.tagArr = this.tagStr.toString().split(",");

      this.product.imgUrls = JSON.parse(JSON.stringify(this.imgArr))
      this.product.tags = JSON.parse(JSON.stringify(this.tagArr))

      if (this.isEditable) {
        this.service.modifyProduct(this.product, String(this.id)).subscribe(x => { console.log(x, 'product modified'); location.href = 'e/products' });
        // this.router.navigate(['e/products']);
        // update message
        sessionStorage.setItem('g_msg_update', "true")
        sessionStorage.setItem('g_msg_color', "primary")
        sessionStorage.setItem('g_msg_title', "Updated:")
        sessionStorage.setItem('g_msg_text', "Product")

      } else {
        this.service.addProduct(this.product).subscribe(x => { console.log(x, 'product added'); location.href = 'e/products' });
        // this.router.navigate(['']);
        // update message
        sessionStorage.setItem('g_msg_update', "true")
        sessionStorage.setItem('g_msg_color', "primary")
        sessionStorage.setItem('g_msg_title', "Added:")
        sessionStorage.setItem('g_msg_text', "Product")

      }
    }
  }
  public textUrl: string;

  onChange(UpdatedValue: string): void {
    this.imgArr = UpdatedValue.toString().split(",");
  }

}