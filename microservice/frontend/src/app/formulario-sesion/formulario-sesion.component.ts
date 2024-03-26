import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Workout } from '../workout';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-formulario-sesion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,],
  templateUrl: './formulario-sesion.component.html',
  styleUrl: './formulario-sesion.component.css',
  providers: [DatePipe, NgbActiveModal]
})
export class FormularioSesionComponent {  //Reactive form

  //Attributes
  WorkoutForm : FormGroup;

  sesion: Workout = {
    start_date: new Date(), 
    end_date: new Date(),
    exercise_completed: '',
    comments: '',
    isInPerson: true,
    beat: '',
    weight: '',
    burned_calories: '',
    video: undefined,
    photo: undefined,
    id: undefined,
  };

  //Default values
  private currentDate : string | null = '';
  private currentTime : string | null = '';
  private cTimePlusHour : string | null = '';

  constructor(private fb: FormBuilder,private datePipe: DatePipe, public modal: NgbActiveModal) {

    let currentDateAndTime = new Date();
    let tmpOneMoreHour = new Date();
    tmpOneMoreHour.setTime(tmpOneMoreHour.getTime() + 60*60*1000);  //We add one hour to the start date
    this.currentDate = this.datePipe.transform(currentDateAndTime, 'yyyy-MM-dd'); //Default start date value
    this.currentTime = this.datePipe.transform(currentDateAndTime, 'HH:mm');  //Default start time value
    this.cTimePlusHour = this.datePipe.transform(tmpOneMoreHour, 'HH:mm');  //Default end time value

    this.WorkoutForm = this.fb.group({      
      startdate: new FormControl(this.currentDate,[Validators.required]),
      starttime: new FormControl(this.currentTime, [Validators.required]),
      endtime: new FormControl(this.cTimePlusHour, [Validators.required])
    }, {validators: [this.checkIfEndTimeAfterStartTime]});  //We need to validate that the end time is later than the start time
    
  }

  ngOnInit() {
    
  }

  closeForm(): void {
    this.modal.close(this.sesion);
  }

  private checkIfEndTimeAfterStartTime (c: AbstractControl) {
    //Safety check
    if (!c.get('starttime')?.value || !c.get('endtime')?.value) { return null }
    //If the values are valid we need to return null
    //Otherwise we will set the error flag 'invalidEndTime' as true
    if(c.get('endtime')?.value > c.get('starttime')?.value){
      return null;
    }else{
      return {invalidEndTime: true}
    }
  }

  //Getters
  get startdate(){
    return this.WorkoutForm.get('startdate');
  }
  get starttime(){
    return this.WorkoutForm.get('starttime');
  }
  get endtime(){
    return this.WorkoutForm.get('endtime');
  }

  get form(){
    return this.WorkoutForm;
  }
  get fcontrols(){
    return this.WorkoutForm.controls;
  }
}


/*
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Workout } from '../workout';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-formulario-sesion',
  standalone: true,
  templateUrl: './formulario-sesion.component.html',
  styleUrl: './formulario-sesion.component.css'
})
export class FormularioSesionComponent {
  accion?: 'Enviar' | 'Cerrar'; // | 'Borrador' ?
  sesion: Workout = {
    start_date: new Date(), 
    end_date: new Date(),
    exercise_completed: '',
    comments: '',
    isInPerson: true,
    beat: '',
    weight: '',
    burned_calories: '',
    video: undefined,
    photo: undefined,
    id: undefined,
  };

  constructor(public modal: NgbActiveModal) {
  }
  
  closeForm(): void {
    this.modal.close(this.sesion);
  }

}
*/

/*
*/