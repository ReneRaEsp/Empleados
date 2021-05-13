import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.sass']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];
  constructor(private _empleadoService: EmpleadoService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.listarEmpleados();
  }

  listarEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data =>{
      this.empleados = [];
      data.forEach((element: any) => {
        //console.log(element.payload.doc.data());
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.empleados);
    });
  };
  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(()=>{
      console.log('empleado eliminado con exito');
      this.toastr.error(`Eempleado eliminado con exito`, 'Empleado elminado', {
        positionClass: 'toast-bottom-right',
      });
    }).catch(error =>{
      console.log(error);
    });
  };

}
