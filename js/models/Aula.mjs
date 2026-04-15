export class Aula {
    constructor({ id = null, idModulo, titulo, tipo, urlConteudo, duracao, ordem }) {
        this.id = id ?? crypto.randomUUID();
        this.idModulo = idModulo;
        this.titulo = titulo;
        this.tipo = tipo;
        this.urlConteudo = urlConteudo;
        this.duracao = parseInt(duracao);
        this.ordem = parseInt(ordem);
    }

    static validar(dados) {
        const erros = [];
        if (!dados.idModulo) erros.push('Módulo é obrigatório');
        if (!dados.titulo?.trim()) erros.push('Título da aula é obrigatório');
        if (!dados.tipo) erros.push('Tipo de conteúdo é obrigatório');
        return erros;
    }
}
