import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.sass']
})
export class CreateEmpleadosComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required ],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  agregarEmpleado() {
    console.log('crear formulario');
  }

}
