import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserDB } from 'src/app/models/userDB.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  //form declareds
  user: User = new User();
  userDB: UserDB[];
  registerForm: FormGroup;
  submitted: boolean = false;
  isUserExist: boolean = false;
  forUser: number;
  userExistMsg: string = "";
  isEditable: boolean = false;
  id: string | null;

  constructor(private builder: FormBuilder,
    private service: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == null) {
      this.isEditable = false
      this.registerForm = this.builder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],

      })
    } else {
      this.isEditable = true
      this.service.getUserById(String(this.id)).subscribe(x => this.user = x);
      this.registerForm = this.builder.group({
        name: [this.user.name, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        password: [this.user.password],
        isAdmin: [this.user.isAdmin],

      })
    }

    console.log("Edit: ", this.isEditable)



    this.service.chkUserExist().subscribe(x => { this.userDB = x });

  }
  get form() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    this.userDB.forEach((e: { name: string; email: string; }) => {
      if (e.name === this.user.name) {
        this.isUserExist = true
        this.forUser = 0
        this.userExistMsg = "Username already taken";
        return;
      } else if (e.email === this.user.email) {
        this.isUserExist = true
        this.forUser = 1
        this.userExistMsg = "Email already taken";
        return;
      } else {
        this.isUserExist = false
        this.userExistMsg = "";
        //return;
      }
    });

    if (this.registerForm.invalid)
      return;
    else {
      console.log(this.user)
      if (!this.isUserExist) {
        if (this.isEditable) {
          this.service.modifyUser(this.user, String(this.id)).subscribe(x => console.log(x, 'user modified'));
          this.router.navigate(['e/users']);
        } else {
          this.service.addUser(this.user).subscribe(x => console.log(x, 'user added'));
          // this.router.navigate(['e/users']);
        }

      }
    }
  }

}
