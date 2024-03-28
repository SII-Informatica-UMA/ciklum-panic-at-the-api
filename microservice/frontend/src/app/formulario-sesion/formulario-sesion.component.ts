import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox'; 

@Component({
  selector: 'app-formulario-sesion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule],
  templateUrl: './formulario-sesion.component.html',
  styleUrl: './formulario-sesion.component.css',
  providers: [DatePipe]
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
      beats: '',
      weight: '',
      burned_calories: ['', Validators.maxLength(5)],
      /*healthRegister : this.fb.group({
        beats: '',
        weight: '',
        burned_calories: ['', Validators.maxLength(5)],
      }),*/
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
    this.modal.dismiss(this);
  }

  closeForm(): void {
    //this.modal.close(this.workoutForm);
    this.modal.dismiss(this);
  }
}





 