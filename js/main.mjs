import * as Core from './controllers/CoreController.mjs';
import * as Cont from './controllers/ConteudoController.mjs';
import * as Int from './controllers/InteracaoController.mjs';
import * as Cur from './controllers/CuradoriaController.mjs';
import * as Neg from './controllers/NegocioController.mjs';

import { CoreService } from './services/CoreService.mjs';
import { ConteudoService } from './services/ConteudoService.mjs';
import { InteracaoService } from './services/InteracaoService.mjs';
import { CuradoriaService } from './services/CuradoriaService.mjs';
import { NegocioService } from './services/NegocioService.mjs';
import { SeedService } from './services/SeedService.mjs';

const coreSvc = new CoreService();
const contSvc = new ConteudoService();
const intSvc = new InteracaoService();
const curSvc = new CuradoriaService();
const negSvc = new NegocioService();

const svcs = {
    usuarios: coreSvc, categorias: coreSvc, cursos: coreSvc,
    modulos: contSvc, aulas: contSvc,
    matriculas: intSvc, progressos: intSvc, avaliacoes: intSvc,
    trilhas: curSvc, certificados: curSvc,
    planos: negSvc, assinaturas: negSvc, pagamentos: negSvc
};

window.mostrarAlerta = (msg, tipo = 'success') => {
    const alerta = document.getElementById('alerta');
    if (!alerta) return;
    alerta.textContent = msg;
    alerta.className = `alert alert-${tipo} sticky-top`;
    alerta.classList.remove('d-none');
    setTimeout(() => alerta.classList.add('d-none'), 3000);
};

window.salvarEntidade = (form, modulo, entidade) => {
    if (modulo === 'core') Core.salvarCore(form, entidade);
    if (modulo === 'conteudo') Cont.salvarConteudo(form, entidade);
    if (modulo === 'interacao') Int.salvarInteracao(form, entidade);
    if (modulo === 'curadoria') Cur.salvarCuradoria(form, entidade);
    if (modulo === 'negocio') Neg.salvarNegocio(form, entidade);
};

window.excluir = (entidade, id) => {
    if (!confirm('Tem certeza que deseja excluir?')) return;
    svcs[entidade].excluir(entidade, id);
    renderAll();
};

window.editar = (entidade, id) => {
    const item = svcs[entidade].buscarPorId(entidade, id);
    if (!item) return;

    const formId = `form${entidade.charAt(0).toUpperCase() + entidade.slice(1, -1)}`;
    const form = document.getElementById(formId) || document.querySelector(`form[id*="${entidade}"]`);

    if (form) {
        Object.keys(item).forEach(key => {
            if (form[key]) form[key].value = item[key];
        });
        form.dataset.editId = id;

        const modalEl = form.closest('.modal');
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        }
    }
};

window.carregarSelects = () => {
    const cats = coreSvc.listar('categorias');
    const courses = coreSvc.listar('cursos');
    const users = coreSvc.listar('usuarios');
    const modes = contSvc.listar('modulos');
    const planes = negSvc.listar('planos');
    const trails = curSvc.listar('trilhas');

    document.querySelectorAll('.sel-trilhas').forEach(s => {
        s.innerHTML = '<option value="">Selecione a Trilha...</option>' +
            trails.map(t => `<option value="${t.id}">${t.titulo}</option>`).join('');
    });

    const sCat = document.querySelectorAll('#idCategoriaCurso, #idCategoriaTrilha, #filtroCategoriaCurso');
    sCat.forEach(s => {
        const currentVal = s.value;
        const isFilter = s.id === 'filtroCategoriaCurso';
        s.innerHTML = (isFilter ? '<option value="todos">Todas</option>' : '<option value="">Selecione...</option>') +
            cats.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
        s.value = currentVal;
    });

    document.querySelectorAll('.sel-cursos').forEach(s => {
        s.innerHTML = '<option value="">Selecione o Curso...</option>' +
            courses.map(c => `<option value="${c.id}">${c.titulo}</option>`).join('');
    });

    document.querySelectorAll('.sel-usuarios').forEach(s => {
        s.innerHTML = '<option value="">Selecione o Usuário...</option>' +
            users.map(u => `<option value="${u.id}">${u.nome}</option>`).join('');
    });

    const sMod = document.getElementById('idModuloAula');
    if (sMod) sMod.innerHTML = '<option value="">Selecione o Módulo...</option>' +
        modes.map(m => `<option value="${m.id}">${m.titulo}</option>`).join('');

    const sPlano = document.getElementById('idPlanoAssinatura');
    if (sPlano) sPlano.innerHTML = '<option value="">Selecione o Plano...</option>' +
        planes.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');
};

function renderAll() {
    Core.renderUsuarios();
    Core.renderCategorias();
    Core.renderCursos(document.getElementById('filtroCategoriaCurso')?.value || 'todos');
    Cont.renderModulos();
    Cont.renderAulas();
    Int.renderMatriculas();
    Int.renderProgressos();
    Int.renderAvaliacoes();
    Cur.renderTrilhas();
    Cur.renderCertificados();
    Cur.renderTrilhasCursos();
    Neg.renderPlanos();
    Neg.renderAssinaturas();
    Neg.renderPagamentos();
}

document.getElementById('filtroCategoriaCurso')?.addEventListener('change', (e) => {
    Core.renderCursos(e.target.value);
});

window.addEventListener('DOMContentLoaded', () => {
    SeedService.popular(svcs);
    renderAll();
    window.carregarSelects();
});
