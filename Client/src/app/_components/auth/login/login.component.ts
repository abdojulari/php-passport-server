import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import {Router} from '@angular/router';
import 'hammerjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  public email = '';
  public password = '';
  public warningMessage: string;

  constructor(private authService: AuthenticationService,
    private router: Router) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  onLogIn() {
    this.authService.login(this.email, this.password).subscribe(res => {
      this.warningMessage = '';
      if (Array.isArray(res)) {
        this.warningMessage += res[0];
      }
      if (!this.warningMessage) {
        this.router.navigate(['home']);
      }
    }, error => {
      this.warningMessage = 'Invalid Credentials!';
      console.error(error);
    });
  }

}
