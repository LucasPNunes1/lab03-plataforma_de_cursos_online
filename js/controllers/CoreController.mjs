import { CoreService } from '../services/CoreService.mjs';
import { mostrarAlerta } from './UIUtils.mjs';

const svc = new CoreService();

export function renderUsuarios() {
    const tbody = document.getElementById('listaUsuarios');
    if (!tbody) return;
    const lista = svc.listar('usuarios');
    tbody.innerHTML = lista.map(u => `
        <tr>
            <td>${u.id.substring(0, 8)}...</td>
            <td>${u.nome}</td>
            <td>${u.email}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editar('usuarios', '${u.id}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('usuarios', '${u.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function renderCategorias() {
    const tbody = document.getElementById('listaCategorias');
    if (!tbody) return;
    const lista = svc.listar('categorias');
    tbody.innerHTML = lista.map(c => `
        <tr>
            <td>${c.id.substring(0, 8)}...</td>
            <td>${c.nome}</td>
            <td>${c.descricao || '-'}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editar('categorias', '${c.id}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('categorias', '${c.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function renderCursos(filtroId = 'todos') {
    const tbody = document.getElementById('listaCursos');
    if (!tbody) return;
    let lista = svc.listar('cursos');

    if (filtroId !== 'todos') {
        lista = lista.filter(c => c.idCategoria === filtroId);
    }

    tbody.innerHTML = lista.map(c => `
        <tr>
            <td>${c.id.substring(0, 8)}...</td>
            <td>${c.titulo}</td>
            <td>ID Instrutor: ${c.idInstrutor.substring(0, 5)}...</td>
            <td>${c.nivel}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editar('cursos', '${c.id}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('cursos', '${c.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function salvarCore(form, entidade) {
    const dados = Object.fromEntries(new FormData(form));
    try {
        const id = form.dataset.editId;
        id ? svc.atualizar(entidade, id, dados) : svc.salvar(entidade, dados);
        form.reset();
        delete form.dataset.editId;

        const modal = bootstrap.Modal.getInstance(form.closest('.modal'));
        if (modal) modal.hide();

        if (entidade === 'usuarios') renderUsuarios();
        if (entidade === 'categorias') { renderCategorias(); carregarSelects(); }
        if (entidade === 'cursos') renderCursos();

        mostrarAlerta('Salvo com sucesso!', 'success');
    } catch (e) {
        mostrarAlerta(e.message, 'danger');
    }
}
