import { Component } from '@angular/core';
import { APIClientService } from './api-client.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sisyphus';
  constructor(private http: APIClientService, private userService: UserService,) { }
  ngOnInit(): void {
    this.http.getUser().subscribe(user => {
      this.userService.updateUser(user);
      this.userService.updateLoggedin(true);
    });
  }
}
