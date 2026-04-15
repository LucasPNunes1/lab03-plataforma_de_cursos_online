export class Pagamento {
    constructor({ id = null, idAssinatura, valorPago, dataPagamento = null, metodoPagamento, idTransacaoGateway = null }) {
        this.id = id ?? crypto.randomUUID();
        this.idAssinatura = idAssinatura;
        this.valorPago = parseFloat(valorPago);
        this.dataPagamento = dataPagamento ?? new Date().toISOString();
        this.metodoPagamento = metodoPagamento;
        this.idTransacaoGateway = idTransacaoGateway ?? crypto.randomUUID();
    }

    static validar(dados) {
        const erros = [];
        if (!dados.idAssinatura) erros.push('Assinatura é obrigatória');
        if (isNaN(dados.valorPago) || dados.valorPago <= 0) erros.push('Valor pago inválido');
        if (!dados.metodoPagamento) erros.push('Método de pagamento é obrigatório');
        return erros;
    }
}
