import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../shared/models/usuario.model';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inserir-editar-usuario',
  templateUrl: './inserir-editar-usuario.component.html',
  styleUrl: './inserir-editar-usuario.component.css',
})
export class InserirEditarUsuarioComponent implements OnInit {
  @ViewChild('formUsuario') formUsuario!: NgForm;

  novoUsuario: boolean = true;
  id!: string;
  usuario: Usuario = new Usuario();
  loading: boolean = false;
  senhaAntigo: string = '';
  mensagem: string = '';
  mensagemDetahada: string = '';
  botaoDesabilitado: boolean = false;

  constructor(
    private readonly usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.loading = false;
    this.id = this.route.snapshot.params['id'];

    this.novoUsuario = !this.id;
    if (!this.novoUsuario) {
      this.usuarioService.buscarPorId(+this.id).subscribe({
        next: (data: Usuario | null) => {
          if (data == null) {
            this.mensagem = 'Usuário não encontrado!';
          } else {
            this.usuario = data;
            this.senhaAntigo = data.senha ? data.senha : '';
            this.usuario.senha = '';
            this.botaoDesabilitado = true;
          }
        },
        error: (err) => {
          this.mensagem = 'Erro ao buscar o usuário!';
          this.mensagemDetahada = `${err.statusText} (${err.status})`;
        },
      });
    }
  }

  salvar(): void {
    this.loading = true;
    if (this.formUsuario.form.valid) {
      if (this.novoUsuario) {
        this.usuarioService.inserir(this.usuario).subscribe({
          next: (data: Usuario | null) => {
            if (data == null) {
              this.mensagem = 'Erro ao salvar o usuário!';
              this.loading = false;
            } else {
              this.mensagem = 'Usuário salvo com sucesso!';
              this.loading = false;
              this.router.navigate(['/usuarios']);
            }
          },
          error: (err) => {
            this.mensagem = 'Erro ao salvar o usuário!';
            this.mensagemDetahada = `${err.statusText} (${err.status})`;
            this.loading = false;
          },
        });
      } else {
        this.usuarioService.alterar(this.usuario).subscribe({
          next: (data: Usuario | null) => {
            if (data == null) {
              this.mensagem = 'Erro ao salvar o usuário!';
              this.loading = false;
            } else {
              this.mensagem = 'Usuário salvo com sucesso!';
              this.loading = false;
              this.router.navigate(['/usuarios']);
            }
          },
          error: (err) => {
            this.mensagem = 'Erro ao salvar o usuário!';
            this.mensagemDetahada = `${err.statusText} (${err.status})`;
            this.loading = false;
          },
        });
      }
      this.loading = false;
    }
  }
}
