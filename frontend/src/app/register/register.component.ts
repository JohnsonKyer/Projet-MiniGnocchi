import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
    genre: null,
    date: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { genre, date } = this.form;
    const mdp = this.form.mdp;
    const mail = this.form.mail;
    this.authService.register(mail, mdp, genre, date).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        console.log(err)
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}