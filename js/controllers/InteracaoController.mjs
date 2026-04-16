import { InteracaoService } from '../services/InteracaoService.mjs';
import { CoreService } from '../services/CoreService.mjs';
import { ConteudoService } from '../services/ConteudoService.mjs';
import { mostrarAlerta } from './UIUtils.mjs';

const svc = new InteracaoService();
const coreSvc = new CoreService();
const contSvc = new ConteudoService();

export function renderMatriculas() {
    const tbody = document.getElementById('listaMatriculas');
    if (!tbody) return;
    const lista = svc.listar('matriculas');

    const usuarios = coreSvc.listar('usuarios');
    const cursos = coreSvc.listar('cursos');
    const nomeUsuario = Object.fromEntries(usuarios.map(u => [u.id, u.nome]));
    const nomeCurso = Object.fromEntries(cursos.map(c => [c.id, c.titulo]));

    tbody.innerHTML = lista.map(m => `
        <tr>
            <td>${m.id.substring(0,8)}...</td>
            <td>${nomeUsuario[m.idUsuario] || m.idUsuario.substring(0,8) + '...'}</td>
            <td>${nomeCurso[m.idCurso] || m.idCurso.substring(0,8) + '...'}</td>
            <td>${new Date(m.dataMatricula).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('matriculas', '${m.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function renderProgressos() {
    const tbody = document.getElementById('listaProgresso');
    if (!tbody) return;
    const lista = svc.listar('progressos');

    const usuarios = coreSvc.listar('usuarios');
    const aulas = contSvc.listar('aulas');
    const nomeUsuario = Object.fromEntries(usuarios.map(u => [u.id, u.nome]));
    const nomeAula = Object.fromEntries(aulas.map(a => [a.id, a.titulo]));

    tbody.innerHTML = lista.map(p => `
        <tr>
            <td>${nomeUsuario[p.idUsuario] || p.idUsuario.substring(0,8) + '...'}</td>
            <td>${nomeAula[p.idAula] || p.idAula.substring(0,8) + '...'}</td>
            <td>${p.status}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('progressos', '${p.idUsuario}:${p.idAula}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function renderAvaliacoes() {
    const tbody = document.getElementById('listaAvaliacoes');
    if (!tbody) return;
    const lista = svc.listar('avaliacoes');

    const usuarios = coreSvc.listar('usuarios');
    const cursos = coreSvc.listar('cursos');
    const nomeUsuario = Object.fromEntries(usuarios.map(u => [u.id, u.nome]));
    const nomeCurso = Object.fromEntries(cursos.map(c => [c.id, c.titulo]));

    tbody.innerHTML = lista.map(a => `
        <tr>
            <td>${nomeUsuario[a.idUsuario] || a.idUsuario.substring(0,8) + '...'}</td>
            <td>${nomeCurso[a.idCurso] || a.idCurso.substring(0,8) + '...'}</td>
            <td>${a.nota}★</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('avaliacoes', '${a.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function salvarInteracao(form, entidade) {
    const dados = Object.fromEntries(new FormData(form));
    try {
        const id = form.dataset.editId;
        id ? svc.atualizar(entidade, id, dados) : svc.salvar(entidade, dados);
        form.reset();
        delete form.dataset.editId;
        bootstrap.Modal.getInstance(form.closest('.modal'))?.hide();
        
        if (entidade === 'matriculas') renderMatriculas();
        if (entidade === 'progressos') renderProgressos();
        if (entidade === 'avaliacoes') renderAvaliacoes();
        
        mostrarAlerta('Salvo com sucesso!', 'success');
    } catch (e) {
        mostrarAlerta(e.message, 'danger');
    }
}
