export class Assinatura {
    constructor({ id = null, idUsuario, idPlano, dataInicio = null, dataFim = null, status = "Ativa" }) {
        this.id = id ?? crypto.randomUUID();
        this.idUsuario = idUsuario;
        this.idPlano = idPlano;
        this.dataInicio = dataInicio ?? new Date().toISOString();
        this.dataFim = dataFim;
        this.status = status;
    }

    static validar(dados) {
        const erros = [];
        if (!dados.idUsuario) erros.push('Usuário é obrigatório');
        if (!dados.idPlano) erros.push('Plano é obrigatório');
        return erros;
    }
}
