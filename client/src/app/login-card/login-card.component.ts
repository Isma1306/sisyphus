import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIClientService } from '../api-client.service';
import { AppRoutingModule } from '../app-routing.module';
import { User } from '../interfaces';
import { NotificationsService } from '../notifications.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  public login: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.max(50)]),
    password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
  });

  hide = true;

  constructor(
    private route: AppRoutingModule,
    private http: APIClientService,
    private notification: NotificationsService,
    private userService: UserService
  ) { }


  getErrorMessage() {
    if (this.login.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.login.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordError() {
    if (this.login.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }


  LoginUser(user: User) {
    if (this.login.valid) {
      this.http.loginUser(user).subscribe((user) => {
        this.login.reset();
        this.userService.updateUser(user);
        this.userService.updateLoggedin(true);
        this.notification.createNotification(`Welcome back, ${user.name}!`);
        this.route.sendTo('dashboard');
      });
    }
  }



  ngOnInit(): void {
  }

}
