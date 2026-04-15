import { ConteudoService } from '../services/ConteudoService.mjs';
import { mostrarAlerta } from './UIUtils.mjs';

const svc = new ConteudoService();

export function renderModulos() {
    const tbody = document.getElementById('listaModulos');
    if (!tbody) return;
    const lista = svc.listar('modulos');
    tbody.innerHTML = lista.map(m => `
        <tr>
            <td>${m.id.substring(0, 8)}...</td>
            <td>ID Curso: ${m.idCurso.substring(0, 5)}...</td>
            <td>${m.titulo}</td>
            <td>${m.ordem}º</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editar('modulos', '${m.id}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('modulos', '${m.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function renderAulas() {
    const tbody = document.getElementById('listaAulas');
    if (!tbody) return;
    const lista = svc.listar('aulas');
    tbody.innerHTML = lista.map(a => `
        <tr>
            <td>${a.id.substring(0, 8)}...</td>
            <td>ID Mod: ${a.idModulo.substring(0, 5)}...</td>
            <td>${a.titulo}</td>
            <td>${a.tipo}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editar('aulas', '${a.id}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('aulas', '${a.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function salvarConteudo(form, entidade) {
    const dados = Object.fromEntries(new FormData(form));
    try {
        const id = form.dataset.editId;
        id ? svc.atualizar(entidade, id, dados) : svc.salvar(entidade, dados);
        form.reset();
        delete form.dataset.editId;
        bootstrap.Modal.getInstance(form.closest('.modal'))?.hide();

        entidade === 'modulos' ? renderModulos() : renderAulas();
        mostrarAlerta('Salvo com sucesso!', 'success');
    } catch (e) {
        mostrarAlerta(e.message, 'danger');
    }
}
