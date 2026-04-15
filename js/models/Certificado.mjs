export class Certificado {
    constructor({ id = null, idUsuario, idCurso, idTrilha = null, codigoVerificacao = null, dataEmissao = null }) {
        this.id = id ?? crypto.randomUUID();
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.idTrilha = idTrilha;
        this.codigoVerificacao = codigoVerificacao ?? `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        this.dataEmissao = dataEmissao ?? new Date().toISOString();
    }

    static validar(dados) {
        const erros = [];
        if (!dados.idUsuario) erros.push('Usuário é obrigatório');
        return erros;
    }
}
