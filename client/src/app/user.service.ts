import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Routine, User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject<User | null>(null);
  private activeRoutineSource = new BehaviorSubject<Routine | null>(null);
  private isLoggedinSource = new BehaviorSubject<boolean>(false);

  currentUser = this.userSource.asObservable();
  activeRoutine = this.activeRoutineSource.asObservable();
  isLoggedin = this.isLoggedinSource.asObservable();

  constructor() { }

  updateActiveRoutine(routines: Routine[]) {
    routines.map((routine) => {
      if (routine.isActive) {
        this.activeRoutineSource.next(routine);
      }
    });
  }

  updateUser(user: User) {
    this.userSource.next(user);
    this.updateActiveRoutine(user.routines);
  }

  updateLoggedin(boolean: boolean) {
    this.isLoggedinSource.next(boolean);
  }
}
