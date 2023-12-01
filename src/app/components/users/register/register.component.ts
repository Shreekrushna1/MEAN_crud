import { Component } from '@angular/core';
import { NonNullableFormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { WebService } from 'src/app/services/webServices/web.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private fb: NonNullableFormBuilder, private web: WebService, private router: Router) { }
  size: NzButtonSize = 'large';
  isLoading: boolean = false;
  isRegister: boolean = false;
  message: string = '';
  msgType: any = '';
  registerForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?) |0)?[0-9]{10}$")]),
  });
  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  submitForm(): void {
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    this.isRegister = true;
    setTimeout(() => {
      const userData = {
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        mobile: this.registerForm.value.mobile,
      }
      this.web.postData('register', userData).subscribe((res: any) => {
        this.registerForm.reset();
        this.message = res.message;
        this.msgType = 'success';
        setTimeout(() => {
          this.isRegister = false;
          this.router.navigate(['dashboard']);
        }, 2000);
      }, (err) => {
        this.isRegister = true;
        setTimeout(() => {
          this.isRegister = false;
          this.msgType = 'error';
          this.message = err.error.message;
          console.error('register api failed:- ', err);
        }, 2000);
      })
    }, 2000);
  }
}
