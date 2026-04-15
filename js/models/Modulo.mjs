export class Modulo {
    constructor({ id = null, idCurso, titulo, ordem }) {
        this.id = id ?? crypto.randomUUID();
        this.idCurso = idCurso;
        this.titulo = titulo;
        this.ordem = parseInt(ordem);
    }

    static validar(dados) {
        const erros = [];
        if (!dados.idCurso) erros.push('Curso é obrigatório');
        if (!dados.titulo?.trim()) erros.push('Título do módulo é obrigatório');
        if (!dados.ordem) erros.push('Ordem é obrigatória');
        return erros;
    }
}
