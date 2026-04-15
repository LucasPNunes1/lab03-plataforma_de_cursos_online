export class Curso {
    constructor({ id = null, titulo, descricao, idInstrutor, idCategoria, nivel, dataPublicacao = null, totalAulas = 0, totalHoras = 0 }) {
        this.id = id ?? crypto.randomUUID();
        this.titulo = titulo;
        this.descricao = descricao;
        this.idInstrutor = idInstrutor;
        this.idCategoria = idCategoria;
        this.nivel = nivel;
        this.dataPublicacao = dataPublicacao ?? new Date().toISOString();
        this.totalAulas = totalAulas;
        this.totalHoras = totalHoras;
    }

    static validar(dados) {
        const erros = [];
        if (!dados.titulo?.trim()) erros.push('Título do curso é obrigatório');
        if (!dados.idInstrutor) erros.push('Instrutor é obrigatório');
        if (!dados.idCategoria) erros.push('Categoria é obrigatória');
        return erros;
    }
}
