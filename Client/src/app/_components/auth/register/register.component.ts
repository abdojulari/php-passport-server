import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public email = '';
  public name = '';
  public password = '';
  public warningMessage: string;

  constructor(private authService: AuthenticationService,
    private router: Router) {

  }

  ngOnInit() {

  }

  onRegister() {
    this.authService.register(this.name, this.email, this.password).subscribe(res => {
      this.warningMessage = '';
      if (Array.isArray(res.email)) {
        this.warningMessage += res.email[0];
      }
      if (Array.isArray(res.name)) {
        this.warningMessage += res.name[0];
      }
      if (Array.isArray(res.password)) {
        this.warningMessage += res.password[0];
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
