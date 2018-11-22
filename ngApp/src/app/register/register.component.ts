import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registeredUserData = {
    'email': '',
    'password': '',
    'password_confirm': '',
    'accept': ''
  };

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    if(this.registeredUserData.password === this.registeredUserData.password_confirm) {
      this._auth.registerUser(this.registeredUserData).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this._router.navigate(['/dashboard']);
        },
        err => console.log(err)
      );
    } else {
      console.log('Password missmatch');
    }
  }

}
