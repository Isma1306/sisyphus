import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIClientService } from '../api-client.service';
import { User } from '../interfaces';
import { UserService } from '../user.service';
import { AppRoutingModule } from '../app-routing.module';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-signup-card',
  templateUrl: './signup-card.component.html',
  styleUrls: ['./signup-card.component.css']
})
export class SignupCardComponent implements OnInit {
  public signup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.max(50)]),
    name: new FormControl('', [Validators.required, Validators.max(40), Validators.pattern('[a-zA-Z ]*')]),
    password: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.min(6), Validators.max(20)]),
  });

  constructor(
    private route: AppRoutingModule,
    private http: APIClientService,
    private userService: UserService,
    private notification: NotificationsService,
  ) { }


  getErrorMessage() {
    if (this.signup.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.signup.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  AreMatching() {
    const matched: boolean = this.signup.get('password')?.value === this.signup.get('repeatPassword')?.value;
    if (matched) {
      this.signup.get('repeatPassword')?.setErrors(null);
    } else {
      this.signup.get('repeatPassword')?.setErrors({
        notMatched: true
      });
    }
    return matched;
  }

  getPasswordError() {
    if (this.signup.get('password')?.hasError('required')) {
      return 'You must enter a value';
    } if (this.signup.get('password')?.value !== this.signup.get('repeatPassword')?.value) {
      return 'password do not match!';
    }
    return '';
  }

  signUpUser(user: User) {
    this.AreMatching();
    if (this.signup.valid && this.signup.get('password')?.value === this.signup.get('repeatPassword')?.value) {
      delete user.repeatPassword;
      this.http.createUser(user).subscribe((newUser) => {
        this.signup.reset();
        this.userService.updateUser(newUser);
        this.userService.updateLoggedin(true);
        this.notification.createNotification(`Your account has been created!`);
        this.route.sendTo('dashboard');
      });
    }
  }

  ngOnInit(): void {
  }

}
