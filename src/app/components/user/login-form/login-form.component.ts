import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router
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
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['cars']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }
}
