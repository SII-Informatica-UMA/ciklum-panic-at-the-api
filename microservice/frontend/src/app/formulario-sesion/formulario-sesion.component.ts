import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SesionNuevaDTO} from '../../openapi/lifefitAPI/model/sesionNuevaDTO';
import {MatSelectModule} from '@angular/material/select';
import { PlanbackendFakeServiceTsService } from '../planbackend.fake.service.ts.service';
import { SesionDTO } from '../../openapi/lifefitAPI/model/sesionDTO';


/**
 *  ESTE ES EL FORMULARIO QUE SE ABRE AL CREAR UNA SESIÓN NUEVA
 */



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

  planId: number = 0;

  
  workoutForm : FormGroup;

  constructor(private fb: FormBuilder, public modal: NgbActiveModal,private planesService: PlanbackendFakeServiceTsService) {
    /****WORKOUT SESSION-FORM*****/
    this.workoutForm = this.fb.group({
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      trabajoRealizado: ['', [Validators.maxLength(255)]],
      decripcion: ['', [Validators.maxLength(255)]],
      multimedia: this.fb.array([]),
      presencial: false,
      datosSalud: this.fb.array([]),
    });
    this.agregarMultimedia(); 
    this.agregarDatosSalud();
  }


  get form(){
    return this.workoutForm;
  }

  get fcontrols(){
    return this.workoutForm.controls;
  }


  convertirFormASesion(): SesionDTO{
    const formulario = this.workoutForm.value;
    const sesion: SesionDTO = {
      idPlan: this.planId,
      inicio: formulario.inicio,
      fin: formulario.fin,
      trabajoRealizado: formulario.trabajoRealizado,
      multimedia: this.convertirMultimediaToString(),
      descripcion: formulario.decripcion,
      presencial: formulario.presencial,
      datosSalud: this.convertirDatosSaludToString(),
      id: 6                   //TMP TMP TMP CAMBIAR ESTO CAMBIAR ESTO!!!!!
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

  submitSesionToBackend(){
    let sesionNueva = this.convertirFormASesion();
    this.planesService.postSesion(sesionNueva);
  }

  onSubmit(){
    const sesionCreada: SesionNuevaDTO = this.convertirFormASesion();
    console.log(sesionCreada);
    //REALIZAR ENVIO DE FORMULARIO AL BACKEND AQUI
    this.submitSesionToBackend();
    this.modal.close(this.workoutForm);
  }

  closeForm(): void {
    this.modal.dismiss(this);
  }

  convertirMultimediaToString(): Array<string> {
    const obj = this.workoutForm.get('multimedia') as FormArray;
    let arrURL: Array<string> = []
    obj.controls.forEach((control: AbstractControl<any, any>) => {
      const video = (control as FormGroup).get('video')?.value;
      const foto = (control as FormGroup).get('foto')?.value;
      arrURL.push(video)
      arrURL.push(foto)
    });
    return arrURL;
  }

  convertirDatosSaludToString(): Array<string> {
    const obj = this.workoutForm.get('datosSalud') as FormArray;
    let arr: Array<string> = []
    obj.controls.forEach((control: AbstractControl<any, any>) => {
      const peso = (control as FormGroup).get('peso')?.value;
      const calorias = (control as FormGroup).get('calorias')?.value;
      const pulsaciones = (control as FormGroup).get('pulsaciones')?.value;
      arr.push(peso)
      arr.push(calorias)
      arr.push(pulsaciones)
    });
    return arr;
  }

  campoRequerido(control: string): boolean{
    return this.form.controls[control].touched && this.form.controls[control].invalid
  }

}





 