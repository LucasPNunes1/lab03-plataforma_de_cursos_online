import { Modulo } from '../models/Modulo.mjs';
import { Aula } from '../models/Aula.mjs';

export class ConteudoService {
    constructor() {
        this.keys = {
            modulos: 'modulos',
            aulas: 'aulas'
        };
    }

    listar(entidade) {
        const dados = localStorage.getItem(this.keys[entidade]);
        return dados ? JSON.parse(dados) : [];
    }

    salvar(entidade, dados) {
        const lista = this.listar(entidade);
        let novo;
        
        if (entidade === 'modulos') {
            const erros = Modulo.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Modulo(dados);
        } else if (entidade === 'aulas') {
            const erros = Aula.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Aula(dados);
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
