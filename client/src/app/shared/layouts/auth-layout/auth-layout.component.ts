import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      this.router.navigate(['/overview'])
    }
  }

}
