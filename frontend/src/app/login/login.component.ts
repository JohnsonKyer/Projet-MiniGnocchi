import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  errorReason = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const {mail, mdp} = this.form;

    this.authService.login(mail, mdp).subscribe(
      data => {
        data = JSON.parse(data);
        this.tokenStorage.saveToken(JSON.stringify(data.accessToken));
        this.tokenStorage.saveUser(JSON.stringify(data));

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        window.location.reload();
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;
        this.errorReason = JSON.parse(err.error).reason;
        this.isLoginFailed = true;
      }
    );
  }
}
