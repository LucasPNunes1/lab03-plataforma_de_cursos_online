import { NegocioService } from '../services/NegocioService.mjs';
import { CoreService } from '../services/CoreService.mjs';
import { mostrarAlerta } from './UIUtils.mjs';

const svc = new NegocioService();
const coreSvc = new CoreService();

export function renderPlanos() {
    const tbody = document.getElementById('listaPlanos');
    if (!tbody) return;
    const lista = svc.listar('planos');
    tbody.innerHTML = lista.map(p => `
        <tr>
            <td>${p.id.substring(0,8)}...</td>
            <td>${p.nome}</td>
            <td>R$ ${Number(p.preco).toFixed(2)}</td>
            <td>${p.duracaoMeses} meses</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editar('planos', '${p.id}')">Editar</button>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('planos', '${p.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function renderAssinaturas() {
    const tbody = document.getElementById('listaAssinaturas');
    if (!tbody) return;
    const lista = svc.listar('assinaturas');

    const usuarios = coreSvc.listar('usuarios');
    const planos = svc.listar('planos');
    const nomeUsuario = Object.fromEntries(usuarios.map(u => [u.id, u.nome]));
    const nomePlano = Object.fromEntries(planos.map(p => [p.id, p.nome]));

    tbody.innerHTML = lista.map(a => `
        <tr>
            <td>${a.id.substring(0,8)}...</td>
            <td>${nomeUsuario[a.idUsuario] || a.idUsuario.substring(0,8) + '...'}</td>
            <td>${nomePlano[a.idPlano] || a.idPlano.substring(0,8) + '...'}</td>
            <td>${a.status}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('assinaturas', '${a.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function renderPagamentos() {
    const tbody = document.getElementById('listaPagamentos');
    if (!tbody) return;
    const lista = svc.listar('pagamentos');

    const assinaturas = svc.listar('assinaturas');
    const usuarios = coreSvc.listar('usuarios');
    const nomeUsuario = Object.fromEntries(usuarios.map(u => [u.id, u.nome]));
    const assinaturaMap = Object.fromEntries(assinaturas.map(a => [a.id, a.idUsuario]));

    tbody.innerHTML = lista.map(p => `
        <tr>
            <td>${p.id.substring(0,8)}...</td>
            <td>${nomeUsuario[assinaturaMap[p.idAssinatura]] || p.idAssinatura.substring(0,8) + '...'}</td>
            <td>R$ ${Number(p.valorPago).toFixed(2)}</td>
            <td>${p.metodoPagamento}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="excluir('pagamentos', '${p.id}')">Excluir</button>
            </td>
        </tr>
    `).join('');
}

export function salvarNegocio(form, entidade) {
    const dados = Object.fromEntries(new FormData(form));
    try {
        const id = form.dataset.editId;
        id ? svc.atualizar(entidade, id, dados) : svc.salvar(entidade, dados);
        form.reset();
        delete form.dataset.editId;
        bootstrap.Modal.getInstance(form.closest('.modal'))?.hide();
        
        if (entidade === 'planos') renderPlanos();
        if (entidade === 'assinaturas') renderAssinaturas();
        if (entidade === 'pagamentos') renderPagamentos();
        
        mostrarAlerta('Salvo com sucesso!', 'success');
    } catch (e) {
        mostrarAlerta(e.message, 'danger');
    }
}
