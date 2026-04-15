export class TrilhaCurso {
    constructor({ idTrilha, idCurso, ordem }) {
        this.idTrilha = idTrilha;
        this.idCurso = idCurso;
        this.ordem = parseInt(ordem);
    }

    static validar(dados) {
        const erros = [];
        if (!dados.idTrilha) erros.push('Trilha é obrigatória');
        if (!dados.idCurso) erros.push('Curso é obrigatório');
        return erros;
    }
}
