import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../framework/authorisation/auth.service';
import { DataService } from '../../../framework/services/data.service';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public model: any;

  constructor(private dc: DataService, public router: Router, private auth: AuthService) {

  }

  ngOnInit() {
    this.model = (<any>Object).assign(new Object(), { LoginResult: null, UserName: '', Password: '' });
    //this.auth.logout(); 
  }

  login() {

    //this.dc.post('api/Login/LoginUser', this.model).subscribe((response: any) => {

    //  this.model.LoginResult = response.LoginResult;
    //  this.model.RoleCodes = response.RoleCodes;

    //  if (this.model.LoginResult.LoginSuccess == true) {

    //    this.model.UserName = this.model.Password = null;
    //    this.auth.login(this.model);
    //  }

    //  else {
    //   this.toastr.error(this.model.LoginResult.Message);
    //  }
    //});

    this.auth.login(this.model);

  }


  forgotpassword() {
    this.router.navigate(['/account/forgot-password']);
  }

}



