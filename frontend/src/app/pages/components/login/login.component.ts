import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Login, SignUp} from "../../state/pages.actions";
import {Store} from "@ngxs/store";
import notify from "devextreme/ui/notify";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  signUpForm: FormGroup;
  isSubmitted: boolean = false;
  isLoginSubmitted: boolean = false;
  subscriptions = new Subscription();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
    console.log(this.isSubmitted)
  }

  ngOnInit(): void {
    this.initLoginForms();
    this.initSignUPForms();
  }

  initLoginForms(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(7)]]
    });
  }

  initSignUPForms(): void {
    this.signUpForm = this.fb.group({
      firstName: new FormControl("", [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl("", [Validators.required, Validators.minLength(2)]),
      contactNumber: new FormControl("", [Validators.required, Validators.minLength(2)]),
      password: new FormControl("", [Validators.required, Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')])
    });
  }

  login() {
    const formValue = this.loginForm.value;
    if (this.loginForm.valid) {
      this.isLoginSubmitted = true;
      this.subscriptions.add(
      this.store.dispatch(new Login(formValue))
        .pipe(
          catchError(err => {
            return of('')
          })
        ).subscribe(res => {
        this.router.navigate(['pages','users']);
        this.showMessage('Login Successfully', 'success')
      })
      );
    }else{
      this.isLoginSubmitted = false;
      this.showMessage('Check All Fields ', 'failed')
    }
  }

  signUp() {
    const formValue = this.signUpForm.value;
    if (this.signUpForm.valid) {
      this.isSubmitted = true;
      this.subscriptions.add(
      this.store.dispatch(new SignUp(formValue)).pipe(
        catchError(err => {
          return of('')
        })
      ).subscribe(res => {
        this.showMessage('Registration Successfully', 'success')
      })
      );
    }else{
      this.isSubmitted = false;
      this.showMessage('Check All Fields', 'failed')
    }
  }

  private showMessage(msg: string, type: string, time: number = 600): void {
    notify({
      message: msg,
      type: type,
      displayTime: time,
      width: 300,
    });
  }
 ngOnDestroy() {
    this.subscriptions.unsubscribe();
 }
}
