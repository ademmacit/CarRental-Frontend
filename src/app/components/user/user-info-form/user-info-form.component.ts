import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'src/app/models/userInfo';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.css'],
})
export class UserInfoFormComponent implements OnInit {
  userInfoUpdateForm: FormGroup;
  userInfoId: number;
  constructor(
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createUserInfoUpdateForm();
    this.patchUserInfoUpdateForm();
  }

  createUserInfoUpdateForm() {
    this.userInfoUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  patchUserInfoUpdateForm() {
    const mail = this.localStorageService.Get('userMail');
    if (mail != null) {
      this.authService.getUserByEmail(mail).subscribe((response) => {
        let userInfoModel: UserInfo = response.data;
        this.userInfoUpdateForm.patchValue({
          firstName: userInfoModel.firstName,
          lastName: userInfoModel.lastName,
          email: userInfoModel.email,
        });
        this.userInfoId = userInfoModel.id;
      });
    } else {
      this.toastrService.error('error finding mail');
    }
  }

  update() {
    if (this.userInfoUpdateForm.valid) {
      let userInfoModel: UserInfo = Object.assign(
        {},
        this.userInfoUpdateForm.value
      );
      userInfoModel.id = this.userInfoId;
      this.authService.updateUserInfo(userInfoModel).subscribe((response) => {
        if (response.success) {
          this.localStorageService.Add('userMail', userInfoModel.email);
          this.localStorageService.Add(
            'userName',
            userInfoModel.firstName + ' ' + userInfoModel.lastName
          );

          this.toastrService.success('update successfull');
        } else {
          this.toastrService.error(response.message);
        }
      });
    }
  }
}
