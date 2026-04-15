export class Usuario {
    constructor({ id = null, nome, email, senhaHash, dataCadastro = null }) {
        this.id = id ?? crypto.randomUUID();
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
        this.dataCadastro = dataCadastro ?? new Date().toISOString();
    }

    static validar(dados) {
        const erros = [];
        if (!dados.nome?.trim()) erros.push('Nome é obrigatório');
        if (!dados.email?.trim()) erros.push('E-mail é obrigatório');
        if (dados.email && !/\S+@\S+\.\S+/.test(dados.email)) erros.push('E-mail inválido');
        if (!dados.senhaHash?.trim()) erros.push('Senha é obrigatória');
        return erros;
    }
}
