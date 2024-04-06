import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SesionNuevaDTO} from '../../openapi/lifefitAPI/model/sesionNuevaDTO';

@Component({
  selector: 'app-formulario-sesion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule, MatInputModule, MatIconModule, MatCheckboxModule,
    
  ],
  templateUrl: './formulario-sesion.component.html',
  styleUrl: './formulario-sesion.component.css',
  providers: [DatePipe]
})

export class FormularioSesionComponent {  //Reactive form

  /***********************************DATE ATTRIBUTES***********************************/
  private currentDate : string | null = '';
  private currentTime : string | null = '';
  private cTimePlusHour : string | null = '';
  planId: number | undefined;
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
      idPlan: undefined,
      inicio: [this.currentDate, Validators.required],
      fin: [this.currentDate, Validators.required],
      trabajoRealizado: '',
      decripcion: '',
      multimedia: this.fb.array([]),
      presencial: false,
      datosSalud: this.fb.array([]),
      //id: undefined,
    }, 
    {
      validators: [this.checkIfEndTimeAfterStartTime] //We need to validate that the end time is later than the start time
    });
    this.agregarMultimedia(); 
    this.agregarDatosSalud();
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

  convertirFormASesion(): SesionNuevaDTO{
    const formulario = this.workoutForm.value;
    const sesion: SesionNuevaDTO ={
      idPlan: formulario.idPlan,
      inicio: formulario.inicio,
      fin: formulario.fin,
      trabajoRealizado: formulario.trabajoRealizado,
      multimedia: formulario.multimedia,
      decripcion: formulario.decripcion,
      presencial: formulario.presencial,
      datosSalud: formulario.datosSalud,
      //id: formulario.id
    };
    return sesion;
  }

  agregarMultimedia(): void{
    const url = this.fb.group({
      video: '',
      foto: ''
    })
    this.multimedia.push(url);
  }

  get multimedia(){
    return this.workoutForm.controls["multimedia"] as FormArray;
  }

  
  agregarDatosSalud(): void{
    const salud = this.fb.group({
      peso: '',
      calorias: '',
      pulsaciones: ''
    });

    this.datosSalud.push(salud);

  }
  
  get datosSalud(){
    return this.workoutForm.controls["datosSalud"] as FormArray;
  }

  onSubmit(){
    //this.agregarDatosSalud();
    //console.log(this.workoutForm.value);
    console.log(this.convertirFormASesion());
    this.modal.close(this.workoutForm);
  }

  closeForm(): void {
    this.modal.dismiss(this);
  }

}





 