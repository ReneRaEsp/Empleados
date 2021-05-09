import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.sass']
})
export class CreateEmpleadosComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private _empleadosService: EmpleadoService,
    private router: Router) {
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
    this.submitted = true;
    if(this.createEmpleado.invalid){
      return;
    }
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()      
    }
    console.log(`registrando el empleado:  ${empleado.nombre} ${empleado.apellido} `);
    this._empleadosService.agregarEmpleado(empleado).then(()=>{
      console.log(`Empleado: ${empleado.nombre} ${empleado.apellido} registrado con exito`);
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      console.log(`Error: ${error}`);
    });
  }

}
