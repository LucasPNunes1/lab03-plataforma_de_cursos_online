export class Plano {
    constructor({ id = null, nome, descricao = "", preco, duracaoMeses }) {
        this.id = id ?? crypto.randomUUID();
        this.nome = nome;
        this.descricao = descricao;
        this.preco = parseFloat(preco);
        this.duracaoMeses = parseInt(duracaoMeses);
    }

    static validar(dados) {
        const erros = [];
        if (!dados.nome?.trim()) erros.push('Nome do plano é obrigatório');
        if (isNaN(dados.preco) || dados.preco <= 0) erros.push('Preço inválido');
        if (isNaN(dados.duracaoMeses) || dados.duracaoMeses <= 0) erros.push('Duração inválida');
        return erros;
    }
}
