import { Usuario } from '../models/Usuario.mjs';
import { Categoria } from '../models/Categoria.mjs';
import { Curso } from '../models/Curso.mjs';

export class CoreService {
    constructor() {
        this.keys = {
            usuarios: 'usuarios',
            categorias: 'categorias',
            cursos: 'cursos'
        };
    }

    listar(entidade) {
        const dados = localStorage.getItem(this.keys[entidade]);
        return dados ? JSON.parse(dados) : [];
    }

    salvar(entidade, dados) {
        const lista = this.listar(entidade);
        let novo;
        
        if (entidade === 'usuarios') {
            const erros = Usuario.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Usuario(dados);
        } else if (entidade === 'categorias') {
            const erros = Categoria.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Categoria(dados);
        } else if (entidade === 'cursos') {
            const erros = Curso.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Curso(dados);
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
