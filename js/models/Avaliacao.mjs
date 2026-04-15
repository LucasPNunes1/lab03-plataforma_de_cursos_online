export class Avaliacao {
    constructor({ id = null, idUsuario, idCurso, nota, comentario = "", dataAvaliacao = null }) {
        this.id = id ?? crypto.randomUUID();
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.nota = parseInt(nota);
        this.comentario = comentario;
        this.dataAvaliacao = dataAvaliacao ?? new Date().toISOString();
    }

    static validar(dados) {
        const erros = [];
        if (!dados.idUsuario) erros.push('Usuário é obrigatório');
        if (!dados.idCurso) erros.push('Curso é obrigatório');
        if (dados.nota < 1 || dados.nota > 5) erros.push('Nota deve ser entre 1 e 5');
        return erros;
    }
}
