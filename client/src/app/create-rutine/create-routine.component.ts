import { Day } from './../interfaces';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { APIClientService } from '../api-client.service';
import { NotificationsService } from '../notifications.service';



@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
  styleUrls: ['./create-routine.component.css']
})
export class CreateRoutineComponent implements OnInit {

  displayedColumns: string[] = ['name', 'sets', 'reps'];

  public firstFormGroup = this.fb.group({
    routineName: '',
  });


  public routineForm: FormGroup = this.fb.group({
    days: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private http: APIClientService,
    private notification: NotificationsService,
  ) { }

  ngOnInit() {
  }

  // day handling

  days(): FormArray {
    return this.routineForm.get('days') as FormArray;
  }

  newDay(): FormGroup {
    return this.fb.group({
      dayName: '',
      exercises: this.fb.array([])
    });
  }

  addDay() {
    this.days().push(this.newDay());
  }

  removeDay(dayIndex: number) {
    this.days().removeAt(dayIndex);
  }

  addWeekdays(days: Day[]) {
    if (days.length === 2) {
      days[0].weekDays = [1, 4];
      days[1].weekDays = [2, 5];
    } else if (days.length === 3) {
      days[0].weekDays = [1];
      days[1].weekDays = [3];
      days[2].weekDays = [5];
    }
    else if (days.length === 4) {
      days[0].weekDays = [1];
      days[1].weekDays = [2];
      days[2].weekDays = [4];
      days[3].weekDays = [5];
    } else if (days.length === 5) {
      days[0].weekDays = [1];
      days[1].weekDays = [2];
      days[2].weekDays = [3];
      days[3].weekDays = [4];
      days[4].weekDays = [5];
    }
    return days;
  }



  // exercise handling


  exercises(dayIndex: number): FormArray {
    return this.days()
      .at(dayIndex)
      .get('exercises') as FormArray;
  }

  newExercise(): FormGroup {
    return this.fb.group({
      exerciseName: '',
      sets: 1,
      reps: 1,

    });
  }

  addExercise(dayIndex: number) {
    this.exercises(dayIndex).push(this.newExercise());
  }

  removeExercise(dayIndex: number, skillIndex: number) {
    this.exercises(dayIndex).removeAt(skillIndex);
  }

  // submit handling

  onSubmit() {
    const routine = {
      routineName: this.firstFormGroup.value.routineName,
      days: this.addWeekdays(this.routineForm.value.days),
      exercises: this.addExercise(this.routineForm.value.days)
    };
    const exercise = {
      exerciseName: this.addExercise(this.routineForm.value.days),
      reps: this.addExercise(this.routineForm.value.reps)
    }
    this.http.SaveRoutine(routine)
      .subscribe((res) => {
        this.notification.createNotification(`New Routine: ${res.routineName}, created!`);
      });
    this.http.SaveRoutine(exercise)
    .subscribe((res) => {
      this.notification.createNotification(`New Routine: ${res.exerciseName}, created!`);
  })



}


