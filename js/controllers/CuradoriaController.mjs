import { CuradoriaService } from '../services/CuradoriaService.mjs';
import { mostrarAlerta } from './UIUtils.mjs';

const svc = new CuradoriaService();

export function renderTrilhas() {
    const tbody = document.getElementById('listaTrilhas');
    if (!tbody) return;
    const lista = svc.listar('trilhas');
    tbody.innerHTML = lista.map(t => `
        <tr>
            <td>${t.id.substring(0,8)}...</td>
            <td>${t.titulo}</td>
            <td>ID Cat: ${t.idCategoria.substring(0,5)}...</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editar('trilhas', '${t.id}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('trilhas', '${t.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function renderCertificados() {
    const tbody = document.getElementById('listaCertificados');
    if (!tbody) return;
    const lista = svc.listar('certificados');
    tbody.innerHTML = lista.map(c => `
        <tr>
            <td>${c.id.substring(0,8)}...</td>
            <td>User: ${c.idUsuario.substring(0,5)}...</td>
            <td>Curso: ${c.idCurso.substring(0,5)}...</td>
            <td>${c.codigoVerificacao}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('certificados', '${c.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function renderTrilhasCursos() {
    const tbody = document.getElementById('listaTrilhasCursos');
    if (!tbody) return;
    const lista = svc.listar('trilhas_cursos');
    tbody.innerHTML = lista.map(tc => `
        <tr>
            <td>Trilha: ${tc.idTrilha.substring(0,5)}...</td>
            <td>Curso: ${tc.idCurso.substring(0,5)}...</td>
            <td>${tc.ordem}º</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('trilhas_cursos', '${tc.idTrilha}:${tc.idCurso}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function salvarCuradoria(form, entidade) {
    const dados = Object.fromEntries(new FormData(form));
    try {
        const id = form.dataset.editId;
        id ? svc.atualizar(entidade, id, dados) : svc.salvar(entidade, dados);
        form.reset();
        delete form.dataset.editId;
        bootstrap.Modal.getInstance(form.closest('.modal'))?.hide();
        
        if (entidade === 'trilhas') { renderTrilhas(); carregarSelects(); }
        if (entidade === 'certificados') renderCertificados();
        if (entidade === 'trilhas_cursos') renderTrilhasCursos();
        
        mostrarAlerta('Salvo com sucesso!', 'success');
    } catch (e) {
        mostrarAlerta(e.message, 'danger');
    }
}
