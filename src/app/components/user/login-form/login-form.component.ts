import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let user: LoginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(user).subscribe(
        (response) => {
          this.toastrService.success('login succesfull');
          this.localStorageService.Add('token', response.data.token);
          this.authService.getUserByEmail(user.email).subscribe((response) => {
            this.localStorageService.Add(
              'userName',
              response.data.firstName + ' ' + response.data.lastName
            );
            this.localStorageService.Add('userMail', response.data.email);
            this.localStorageService.Add('userId', response.data.id.toString());
          });

          this.router.navigate(['cars']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
}
