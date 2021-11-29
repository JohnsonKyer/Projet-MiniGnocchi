import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {faBullhorn} from '@fortawesome/free-solid-svg-icons'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { TokenStorageService } from '../services/token-storage.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faCoffee = faCoffee;
  faBullhorn = faBullhorn;
  faBell = faBell;
  faUserCircle = faUserCircle;

  constructor(private token: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
  }
  clickOnUser(){
    if (this.token.getToken()){
      this.router.navigateByUrl("/profilUtilisateur")
    }
    else {
      this.router.navigateByUrl("/register")
    }
  }

}
