import { Matricula } from '../models/Matricula.mjs';
import { ProgressoAula } from '../models/ProgressoAula.mjs';
import { Avaliacao } from '../models/Avaliacao.mjs';

export class InteracaoService {
    constructor() {
        this.keys = {
            matriculas: 'matriculas',
            progressos: 'progressos',
            avaliacoes: 'avaliacoes'
        };
    }

    listar(entidade) {
        const dados = localStorage.getItem(this.keys[entidade]);
        return dados ? JSON.parse(dados) : [];
    }

    salvar(entidade, dados) {
        const lista = this.listar(entidade);
        let novo;
        
        if (entidade === 'matriculas') {
            const erros = Matricula.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Matricula(dados);
        } else if (entidade === 'progressos') {
            const erros = ProgressoAula.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new ProgressoAula(dados);
        } else if (entidade === 'avaliacoes') {
            const erros = Avaliacao.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Avaliacao(dados);
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
