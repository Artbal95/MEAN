import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {MaterialService} from "../shared/classes/material.service";

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
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(
        null,
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        null,
        [Validators.required, Validators.minLength(6)]
      )
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Now you can log in using your data')
      } else if (params['accessDenied']) {
        MaterialService.toast('To get started, log in to the system')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Please login again')
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

    this.aSub = this.auth.login(this.form.value).subscribe({
      next: (): void => {
        this.router.navigate(['/overview'])
      },
      error: (error: any): void => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      },
    })
  }

}
