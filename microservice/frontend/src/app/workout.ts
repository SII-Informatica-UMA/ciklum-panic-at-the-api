export interface Workout{
    start_date: Date;
    end_date: Date;
    exercise_completed: string;
    comments: string;
    isInPerson: boolean;
    beat: string; //pulsaciones
    weight: string;
    burned_calories: string;
    video: File | undefined;
    photo: File | undefined;
    id: number | undefined; //backend
}