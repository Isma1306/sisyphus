import { WorkoutComponent } from './workout/workout.component';
import { RoutineMenuComponent } from './routine-menu/routine-menu.component';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CreateRoutineComponent } from './create-rutine/create-routine.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginCardComponent } from './login-card/login-card.component';
import { SignupCardComponent } from './signup-card/signup-card.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'signup', component: SignupCardComponent },
  { path: 'login', component: LoginCardComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'create-routine', component: CreateRoutineComponent, canActivate: [AuthGuard] },
  { path: 'routine-menu', component: RoutineMenuComponent, canActivate: [AuthGuard] },
  { path: 'workout', component: WorkoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) { }

  sendTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
