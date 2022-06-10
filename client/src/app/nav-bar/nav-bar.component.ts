import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserService } from "../user.service";
import { APIClientService } from '../api-client.service';
import { User } from '../interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: User | null = null;
  subscription: Subscription | undefined;

  constructor(private breakpointObserver: BreakpointObserver, private http: APIClientService, private userService: UserService) { }

  logoutHandler() {
    this.http.logoutUser().subscribe((res) => console.log('response :>> ', res));
  }
  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      console.log('user :>> ', user);
      this.user = user;
    });
  }


}
