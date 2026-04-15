export class Matricula {
    constructor({ id = null, idUsuario, idCurso, dataMatricula = null, dataConclusao = null }) {
        this.id = id ?? crypto.randomUUID();
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.dataMatricula = dataMatricula ?? new Date().toISOString();
        this.dataConclusao = dataConclusao;
    }

    static validar(dados) {
        const erros = [];
        if (!dados.idUsuario) erros.push('Usuário é obrigatório');
        if (!dados.idCurso) erros.push('Curso é obrigatório');
        return erros;
    }
}
