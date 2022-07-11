
export interface User {
  isDone?: boolean;
  id: string,
  name?: string,
  email: String,
  password: string,
  repeatPassword?: string,
  routines: Routine[],
  exercise: any[],
}

export interface ExerciseSets {
  reps: number,
  exerciseName: string,
  setList: [SetList];
}

export interface SetList {
  name: string,
  reps: number,
  isFail: boolean,
  isDone: boolean,

}

export interface ApiResponseUser {
  data: User;
  error: string;
}

export interface ApiResponseRoutine {
  data: Routine;
  error: string;
}
export interface ApiResponseRoutines {
  data: Routine[];
  error: string;
}


export interface Routine {
  isActive?: boolean;
  id?: string,
  routineName: string,
  days: any[],
}

export interface Day {
  id?: string,
  dayName: string,
  exercises: any[],
  weekDays: number[];
}

