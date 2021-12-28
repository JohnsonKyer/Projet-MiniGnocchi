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

  constructor(private router: Router, private authService: AuthService,
              private tokenStorage: TokenStorageService) {
  }


  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return !!this.tokenStorage.getToken();
  }

  onLogout(): void {
    this.authService.logout();
  }

}
