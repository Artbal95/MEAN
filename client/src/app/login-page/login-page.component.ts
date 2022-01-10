import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({})
  aSub!: Subscription

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(
        'test@test.ru',
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        'test123',
        [Validators.required, Validators.minLength(6)]
      )
    })

    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']){

      }else if(params['accessDenied']){

      }
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit(): void {
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => console.log('Navigate To Overview'),
      (error: any): void => {
        console.warn(error.error.message)
        this.form.enable()
      },
    )
  }

}
