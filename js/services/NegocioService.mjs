import { Plano } from '../models/Plano.mjs';
import { Assinatura } from '../models/Assinatura.mjs';
import { Pagamento } from '../models/Pagamento.mjs';

export class NegocioService {
    constructor() {
        this.keys = {
            planos: 'planos',
            assinaturas: 'assinaturas',
            pagamentos: 'pagamentos'
        };
    }

    listar(entidade) {
        const dados = localStorage.getItem(this.keys[entidade]);
        return dados ? JSON.parse(dados) : [];
    }

    salvar(entidade, dados) {
        const lista = this.listar(entidade);
        let novo;
        
        if (entidade === 'planos') {
            const erros = Plano.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Plano(dados);
        } else if (entidade === 'assinaturas') {
            const erros = Assinatura.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Assinatura(dados);
        } else if (entidade === 'pagamentos') {
            const erros = Pagamento.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Pagamento(dados);
        }

        lista.push(novo);
        localStorage.setItem(this.keys[entidade], JSON.stringify(lista));
        return novo;
    }

    atualizar(entidade, id, dados) {
        const lista = this.listar(entidade).map(item => 
            item.id === id ? { ...item, ...dados, id } : item
        );
        localStorage.setItem(this.keys[entidade], JSON.stringify(lista));
    }

    excluir(entidade, id) {
        const lista = this.listar(entidade).filter(item => item.id !== id);
        localStorage.setItem(this.keys[entidade], JSON.stringify(lista));
    }

    buscarPorId(entidade, id) {
        return this.listar(entidade).find(item => item.id === id) || null;
    }
}
