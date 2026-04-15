export class Categoria {
    constructor({ id = null, nome, descricao = "" }) {
        this.id = id ?? crypto.randomUUID();
        this.nome = nome;
        this.descricao = descricao;
    }

    static validar(dados) {
        const erros = [];
        if (!dados.nome?.trim()) erros.push('Nome da categoria é obrigatório');
        return erros;
    }
}
