import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.sass']
})
export class CreateEmpleadosComponent implements OnInit {
  //Variables
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  title = '';
  action = 'Agregar';
  actionMin = this.action.toLowerCase(); 
  id: string | null;

  constructor(private fb: FormBuilder,
    private _empleadosService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
    ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required ],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    });
    this.id =  this.aRoute.snapshot.paramMap.get('id');
    
   };

  ngOnInit(): void {
    this.isEdit();
  };

  agregarEmpleado() {
    this.loading = true;
    this.submitted = true;
    if(this.createEmpleado.invalid){
      this.loading = false;
      return;
    };
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()      
    };
    //Mensaje a la consola
    console.log(`registrando el empleado:  ${empleado.nombre} ${empleado.apellido} `);
    //Promesa
    this._empleadosService.agregarEmpleado(empleado).then(()=>{
      console.log(`Empleado: ${empleado.nombre} ${empleado.apellido} registrado con exito`);
      //Mostramos un toaster con mensaje de exito
      this.toastr.success(`empleado: ${empleado.nombre} ${empleado.apellido} agregado con exito`, 
      `Empleado registrado`,
      {positionClass: 'toast-bottom-right'}
      );
      //desactivamos el loading
      this.loading = false;
      //Redirigimos hacia el listado de empleados
      this.router.navigate(['/list-empleados']);
      //En caso de error
    }).catch(error => {
      console.log(`Error: ${error}`);
      this.toastr.error(`Empleado no agregado`);
      //desactivamos el loading
      this.loading = false;
    });
  };
  isEdit() {
    if(this.id !== null){
      this.title = 'Editar Empleado';
      this.action = 'Editar';
      this.actionMin = this.action.toLowerCase(); 
      this._empleadosService.getEmpleado(this.id).subscribe(data => {
        console.log(data.payload.data()['nombre']);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario']
        });
      });
      this.loading = false;
    } else {
      this.title = 'Agregar Empleado';
    };
  };
  editEmpleado(id:string){
    this.loading = true;
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaActualizacion: new Date()      
    };
    this._empleadosService.updateEmpleado(id, empleado).then(data =>{
      this.loading = false;
      this.toastr.info(`El empleado ${empleado.nombre} ${ empleado.apellido } actualizado extosamente`, 'Empleado Modificado',{
      positionClass: 'toast-bottom-right'});
      //Redirigimos hacia el listado de empleados
      this.router.navigate(['/list-empleados']);
    });
    
  };
  onAction(){
    if(this.id !== null){
      this.editEmpleado(this.id);
    } else {
      this.agregarEmpleado();
    };
  };
};
