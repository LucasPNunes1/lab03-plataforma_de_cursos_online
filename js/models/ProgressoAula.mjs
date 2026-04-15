export class ProgressoAula {
    constructor({ idUsuario, idAula, dataConclusao = null, status }) {
        this.idUsuario = idUsuario;
        this.idAula = idAula;
        this.dataConclusao = dataConclusao ?? new Date().toISOString();
        this.status = status;
    }

    static validar(dados) {
        const erros = [];
        if (!dados.idUsuario) erros.push('Usuário é obrigatório');
        if (!dados.idAula) erros.push('Aula é obrigatória');
        if (!dados.status) erros.push('Status é obrigatório');
        return erros;
    }
}
