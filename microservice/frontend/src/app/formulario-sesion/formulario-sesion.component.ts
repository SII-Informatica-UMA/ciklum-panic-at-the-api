import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-formulario-sesion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './formulario-sesion.component.html',
  styleUrl: './formulario-sesion.component.css',
  providers: [DatePipe, NgbActiveModal]
})

export class FormularioSesionComponent {  //Reactive form

  /***********************************DATE ATTRIBUTES***********************************/
  private currentDate : string | null = '';
  private currentTime : string | null = '';
  private cTimePlusHour : string | null = '';
  /*************************************************************************************/
  
  workoutForm : FormGroup;

  constructor(private fb: FormBuilder, private datePipe: DatePipe, public modal: NgbActiveModal) {
    
    /****DATE*****/
    let currentDateAndTime = new Date();
    let tmpOneMoreHour = new Date();
    tmpOneMoreHour.setTime(tmpOneMoreHour.getTime() + 60*60*1000);  //We add one hour to the start date
    this.currentDate = this.datePipe.transform(currentDateAndTime, 'yyyy-MM-dd'); //Default start date value
    this.currentTime = this.datePipe.transform(currentDateAndTime, 'HH:mm');  //Default start time value
    this.cTimePlusHour = this.datePipe.transform(tmpOneMoreHour, 'HH:mm');  //Default end time value
    
    /****WORKOUT SESSION*****/
    this.workoutForm = this.fb.group({
      startdate: [this.currentDate, Validators.required],
      starttime: [this.currentTime, Validators.required],
      endtime: [this.cTimePlusHour, Validators.required],
      exercise_completed: '',
      comments: ['', Validators.maxLength(300)],
      isInPerson: false,
      workoutRegister : this.fb.group({
        beats: '',
        weight: '',
        burned_calories: ['', Validators.maxLength(5)],
      }),
      //Falta añadir video y foto. Tal vez ID?
    }, 
    {
      validators: [this.checkIfEndTimeAfterStartTime] //We need to validate that the end time is later than the start time
    });
  }

  /***********************************DATE FUNCTIONS***********************************/
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

  get startdate(){
    return this.workoutForm.get('startdate');
  }
  get starttime(){
    return this.workoutForm.get('starttime');
  }
  get endtime(){
    return this.workoutForm.get('endtime');
  }

  /*************************************************************************************/

  get form(){
    return this.workoutForm;
  }
  get fcontrols(){
    return this.workoutForm.controls;
  }
    
  ngOnInit() {
    
  }

  onSubmit(){
    console.log('submitted!! :3');
    console.log(this.workoutForm.value);
  }

  /*
  saveForm(): void {
    this.modal.close(this.workoutForm); //Esto guarda el formulario (creo)
    //this.modal.dismiss(this.workoutForm);
  }*/
  closeForm(): void {
    //this.modal.close(this.workoutForm);
    this.modal.dismiss(this);
  }
}





  /*
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
  */