import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginDTO } from '../shared/models/login.dto';
import { RegistrationInput } from '../shared/models/registration.dto';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}
  form: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
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
  get firstname() {
    return this.form.get('firstname');
  }
  get lastname() {
    return this.form.get('lastname');
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    const registrationInput: RegistrationInput = { email: this.email?.value, password: this.password?.value, firstname: this.firstname?.value
        , lastname: this.lastname?.value
      }
    this.authService.register(registrationInput)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(["/login"]);
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        });
      }

}
