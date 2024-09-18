export class Usuario {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public senha?: string,
    public perfil?: string,
    public dataCriacao?: string,
    public dataAlteracao?: string
  ) {}

  // Converte de dd/mm/aaaa para aaaa-mm-dd
  dateToRest() {
    if (this.dataCriacao) {
      let dia, mes, ano;
      if (this.dataCriacao.indexOf('/') == -1) {
        dia = this.dataCriacao.substring(0, 2);
        mes = this.dataCriacao.substring(2, 4);
        ano = this.dataCriacao.substring(4);
      } else {
        [dia, mes, ano] = this.dataCriacao.split('/');
      }
      this.dataCriacao = ano + '-' + mes + '-' + dia;
    }
  }

  // Converte de aaaa-mm-dd para dd/mm/aaaa
  dateFromRest() {
    if (this.dataCriacao) {
      const [ano, mes, dia] = this.dataCriacao.split('-');
      this.dataCriacao = dia + '/' + mes + '/' + ano;
    }
  }
}
