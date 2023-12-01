import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageType } from 'ng-zorro-antd/message';
import { WebService } from 'src/app/services/webServices/web.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  constructor(private fb: NonNullableFormBuilder, private web: WebService, private router: Router) { }
  size: NzButtonSize = 'large';
  isLoading: boolean = false;
  isLogin: boolean = false;
  message: string = '';
  msgType: any = '';
  loginForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  submitForm(): void {
    if (!this.loginForm.valid) {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    this.isLogin = true;
    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    }
    this.web.postData('login', loginData).subscribe((res: any) => {
      this.message = res.message;
      this.msgType = 'success';
      localStorage.setItem('token', res.token);
      setTimeout(() => {
        this.isLogin = false;
        this.router.navigate(['dashboard']);
      }, 2000);
    }, (err) => {
      this.isLogin = true;
      setTimeout(() => {
        this.isLogin = false;
        this.msgType = 'error';
        this.message = err.error.message;
        console.error('login api failed:- ', err);
      }, 2000);
    })
  }
}
