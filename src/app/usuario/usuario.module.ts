import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InserirEditarUsuarioComponent } from './inserir-editar-usuario/inserir-editar-usuario.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';



@NgModule({
  declarations: [
    InserirEditarUsuarioComponent,
    ModalUsuarioComponent,
    ListarUsuarioComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsuarioModule { }
