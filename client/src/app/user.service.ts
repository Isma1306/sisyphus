import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Routine, User } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject<User | null>(null);
  private activeRoutineSource = new BehaviorSubject<Routine | null>(null);

  currentUser = this.userSource.asObservable();
  activeRoutine = this.activeRoutineSource.asObservable();

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
}
