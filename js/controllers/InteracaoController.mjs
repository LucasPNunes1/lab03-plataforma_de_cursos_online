import { InteracaoService } from '../services/InteracaoService.mjs';
import { mostrarAlerta } from './UIUtils.mjs';

const svc = new InteracaoService();

export function renderMatriculas() {
    const tbody = document.getElementById('listaMatriculas');
    if (!tbody) return;
    const lista = svc.listar('matriculas');
    tbody.innerHTML = lista.map(m => `
        <tr>
            <td>${m.id.substring(0,8)}...</td>
            <td>User: ${m.idUsuario.substring(0,5)}...</td>
            <td>Curso: ${m.idCurso.substring(0,5)}...</td>
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
    tbody.innerHTML = lista.map(p => `
        <tr>
            <td>ID User: ${p.idUsuario.substring(0,5)}...</td>
            <td>ID Aula: ${p.idAula.substring(0,5)}...</td>
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
    tbody.innerHTML = lista.map(a => `
        <tr>
            <td>User: ${a.idUsuario.substring(0,5)}...</td>
            <td>Curso: ${a.idCurso.substring(0,5)}...</td>
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
