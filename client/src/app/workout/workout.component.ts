import { ExerciseSets, SetList } from './../interfaces';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Day, Routine } from '../interfaces';
import { UserService } from '../user.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {


  public user: any;
  public activeRoutine: any;

  public baseDate = new Date(Date.now());
  public workout: any;

  public exerciseList: ExerciseSets[] = [];

  public newExerciseName: any;



  exercisesArray = new FormArray([]);



  public workoutForm: FormGroup = this.fb.group({
    exercises: this.exercisesArray
  });




  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
    this.userService.activeRoutine.subscribe((routine) => {
      console.log('routine :>> ', routine);
      if (routine) {
        this.activeRoutine = routine;
        this.setRoutineDay(routine);
        if (this.workout) {
          this.setSets();
          this.createExercisesGroups();
        }
      }
    });
  }





  createExercisesGroups() {
    this.exerciseList.forEach((exercise) => {
      this.exercisesArray.push(
        this.fb.group({
          exerciseName: exercise.exerciseName,
          reps: exercise.reps,
          sets: this.createSetsGroups(exercise)
        })
      );
    });
  }

  createSetsGroups(exercise: any) {
    const setsArray = new FormArray([
    ]);
    exercise.setList.forEach((set: SetList) => {
      setsArray.push(
        this.fb.group({
          reps: set.reps,
          weight: 0,
          isDone: set.isDone,
          isFail: set.isFail,
        })
      );
    });
    return setsArray;

  }



  setRoutineDay(routine: Routine) {
    routine.days.forEach((workout: Day) => {
      if (workout.weekDays.includes(this.baseDate.getDay())) {
        this.workout = workout;
      }
    });
  }


  // exercise logic

  exercises(): FormArray {
    return this.workoutForm.get('exercises') as FormArray;
  }
  addExercise() {
    this.exercises().push(this.fb.group({
      exerciseName: this.newExerciseName,
      reps: 0,
      sets: new FormArray([])

    }));
  }

  removeExercise(exerciseIndex: number) {
    this.exercises().removeAt(exerciseIndex);
  }

  onKey(event: any) {
    this.newExerciseName = event.target.value;
  }

  newExercise(): FormGroup {
    return this.fb.group({
      exerciseName: '',
      reps: 0,
      sets: new FormArray([])

    });
  }

  // set logic

  setSets() {
    if (this.workout.exercises) {
      this.workout.exercises.forEach((exercise: any) => {
        const exerciseSets: ExerciseSets = { exerciseName: exercise.exerciseName, setList: [], reps: exercise.reps };
        for (let i = 0; i < exercise.sets; i++) {
          exerciseSets.setList.push({ reps: exercise.reps, isFail: false, isFinished: false });
        }
        this.exerciseList.push(exerciseSets);
      });
    }
  }

  sets(exerciseIndex: number): FormArray {
    return this.exercises()
      .at(exerciseIndex)
      .get('sets') as FormArray;
  }

  addSet(exerciseIndex: number) {
    console.log('object :>> ', this.exercises().value[exerciseIndex]);
    this.sets(exerciseIndex).push(this.fb.group(
      {
        reps: this.exercises().value[exerciseIndex].reps,
        weight: 0,
        isDone: false,
        isFail: false,
      }
    ));
  }
  removeSets(exerciseIndex: number, setIndex: number) {
    this.sets(exerciseIndex).removeAt(setIndex);
  }


  resetForm() {
    this.exercisesArray = new FormArray([]);
    this.createExercisesGroups();
  }

  finishWorkout() {
    this.user.isDone = true;
    this.userService.updateUser(this.user);
  }

  onSubmit() {
    console.log('this.workoutForm :>> ', this.workoutForm.value.exercises);
  }
}



