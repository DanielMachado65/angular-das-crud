import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../shared/models/usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css',
})
export class ListarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  mensagem: string = '';
  mensagemDetalhada: string = '';

  constructor(
    private usuarioService: UsuarioService // private ngModal: NgbModal
  ) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): Usuario[] {
    this.usuarioService.listarTodos().subscribe({
      next: (data: Usuario[] | null) => {
        if (data == null) this.usuarios = [];
        else this.usuarios = data;
      },
      error: (err) => {
        this.mensagem = 'Erro ao listar os usuários!';
        this.mensagemDetalhada = `${err.statusText} (${err.status})`;
      },
    });
    return this.usuarios;
  }

  remover($event: any, usuario: Usuario): void {
    $event.preventDefault();
    if (confirm('Deseja realmente excluir o usuário ' + usuario.nome + '?')) {
      this.usuarioService.remover(usuario.id!).subscribe({
        complete: () => {
          this.listarTodos();
        },
        next: (data: Usuario | null) => {
          if (data == null) {
            this.mensagem = 'Usuário excluído com sucesso!';
            this.listarTodos();
          } else {
            this.mensagem = 'Erro ao excluir o usuário!';
            this.mensagemDetalhada = `${data.nome} (${data.email})`;
          }
        },
        error: (err) => {
          this.mensagem = 'Erro ao excluir o usuário!';
          this.mensagemDetalhada = `${err.statusText} (${err.status})`;
        },
      });
    }
  }

  // abrirModal(usuario: Usuario): void {
  // const modalRef = this.ngModal.open(ModalUsuarioComponent, { size: 'lg', backdrop: 'static' });
  // modalRef.componentInstance.usuario = usuario;
  // }
}
