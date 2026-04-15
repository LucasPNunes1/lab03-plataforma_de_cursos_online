export class Trilha {
    constructor({ id = null, titulo, descricao, idCategoria }) {
        this.id = id ?? crypto.randomUUID();
        this.titulo = titulo;
        this.descricao = descricao;
        this.idCategoria = idCategoria;
    }

    static validar(dados) {
        const erros = [];
        if (!dados.titulo?.trim()) erros.push('Título da trilha é obrigatório');
        if (!dados.idCategoria) erros.push('Categoria é obrigatória');
        return erros;
    }
}
