import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ErrorResponse } from '../shared/models/error.response';
import { LoginDTO } from '../shared/models/login.dto';
import { LoginResponse } from '../shared/models/login.response';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}
  form: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


    // convenience getter for easy access to form fields
  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    const loginDTO: LoginDTO = { email: this.email?.value, password: this.password?.value }
    this.authService.login(loginDTO)
      .pipe(first())
      .subscribe(
        (data) => {
          if(data?.status != HttpStatusCode.Forbidden && data?.status != HttpStatusCode.NotFound) {
            this.router.navigate(["/all-products"]);
          }
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

}
