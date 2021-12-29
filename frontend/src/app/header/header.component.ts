import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {faBullhorn} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService} from '../services/token-storage.service';
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  grade;

  constructor(private router: Router, private authService: AuthService,
              private tokenStorage: TokenStorageService) {
  }


  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    if (!!this.tokenStorage.getToken()) {
      this.grade = JSON.parse(this.tokenStorage.getUser()).grade;
      return true;
    }
    return false;
  }

  onLogout(): void {
    this.authService.logout();
    this.grade = null;
  }

}
