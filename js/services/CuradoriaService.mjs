import { Trilha } from '../models/Trilha.mjs';
import { TrilhaCurso } from '../models/TrilhaCurso.mjs';
import { Certificado } from '../models/Certificado.mjs';

export class CuradoriaService {
    constructor() {
        this.keys = {
            trilhas: 'trilhas',
            trilhas_cursos: 'trilhaCursos',
            certificados: 'certificados'
        };
    }

    listar(entidade) {
        const dados = localStorage.getItem(this.keys[entidade]);
        return dados ? JSON.parse(dados) : [];
    }

    salvar(entidade, dados) {
        const lista = this.listar(entidade);
        let novo;
        
        if (entidade === 'trilhas') {
            const erros = Trilha.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Trilha(dados);
        } else if (entidade === 'trilhas_cursos') {
            const erros = TrilhaCurso.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new TrilhaCurso(dados);
        } else if (entidade === 'certificados') {
            const erros = Certificado.validar(dados);
            if (erros.length) throw new Error(erros.join(' | '));
            novo = new Certificado(dados);
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
