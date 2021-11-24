import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private messageService: MessageService){}

  ngOnInit(): void {
  }

  registerUser(user): void {
    console.log(user)
    this.messageService.registerUser(user);
  }

}
