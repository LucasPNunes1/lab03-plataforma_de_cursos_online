/* ================================================
   Construtores
   ================================================ */
class Usuario {
    constructor(id, nome, email, senhaHash, dataCadastro) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
        this.dataCadastro = dataCadastro ? new Date(dataCadastro) : new Date();
    }
}

class Categoria {
    constructor(id, nome, descricao) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
    }
}

class Curso {
    constructor(id, titulo, descricao, idInstrutor, idCategoria, nivel, dataPublicacao, totalAulas, totalHoras) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.idInstrutor = idInstrutor;
        this.idCategoria = idCategoria;
        this.nivel = nivel;
        this.dataPublicacao = dataPublicacao ? new Date(dataPublicacao) : new Date();
        this.totalAulas = totalAulas;
        this.totalHoras = totalHoras;
    }
}

class Modulo {
    constructor(id, idCurso, titulo, ordem) {
        this.id = id;
        this.idCurso = idCurso;
        this.titulo = titulo;
        this.ordem = ordem;
    }
}

class Aula {
    constructor(id, idModulo, titulo, tipo, urlConteudo, duracao, ordem) {
        this.id = id;
        this.idModulo = idModulo;
        this.titulo = titulo;
        this.tipo = tipo;
        this.urlConteudo = urlConteudo;
        this.duracao = duracao;
        this.ordem = ordem;
    }
}

class Matricula {
    constructor(id, idUsuario, idCurso, dataMatricula, dataConclusao) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.dataMatricula = dataMatricula ? new Date(dataMatricula) : new Date();
        this.dataConclusao = dataConclusao ? new Date(dataConclusao) : null;
    }
}

class ProgressoAula {
    constructor(idUsuario, idAula, dataConclusao, status) {
        this.idUsuario = idUsuario;
        this.idAula = idAula;
        this.dataConclusao = dataConclusao ? new Date(dataConclusao) : new Date();
        this.status = status;
    }
}

class Avaliacao {
    constructor(id, idUsuario, idCurso, nota, comentario, dataAvaliacao) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.nota = nota;
        this.comentario = comentario;
        this.dataAvaliacao = dataAvaliacao ? new Date(dataAvaliacao) : new Date();
    }
}

class Trilha {
    constructor(id, titulo, descricao, idCategoria) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.idCategoria = idCategoria;
    }
}

class TrilhaCurso {
    constructor(idTrilha, idCurso, ordem) {
        this.idTrilha = idTrilha;
        this.idCurso = idCurso;
        this.ordem = ordem;
    }
}

class Certificado {
    constructor(id, idUsuario, idCurso, idTrilha, codigoVerificacao, dataEmissao) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idCurso = idCurso;
        this.idTrilha = idTrilha;
        this.codigoVerificacao = codigoVerificacao;
        this.dataEmissao = dataEmissao ? new Date(dataEmissao) : new Date();
    }
}

class Plano {
    constructor(id, nome, descricao, precoMensal, duracaoMeses) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.precoMensal = precoMensal;
        this.duracaoMeses = duracaoMeses;
    }
}

class Assinatura {
    constructor(id, idUsuario, idPlano, dataInicio, dataFim, status) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.idPlano = idPlano;
        this.dataInicio = dataInicio ? new Date(dataInicio) : new Date();
        this.dataFim = dataFim ? new Date(dataFim) : null;
        this.status = status;
    }
}

class Pagamento {
    constructor(id, idAssinatura, valorPago, dataPagamento, metodoPagamento, idTransacaoGateway, dataFim) {
        this.id = id;
        this.idAssinatura = idAssinatura;
        this.valorPago = valorPago;
        this.dataPagamento = dataPagamento ? new Date(dataPagamento) : new Date();
        this.metodoPagamento = metodoPagamento;
        this.idTransacaoGateway = idTransacaoGateway;
        this.dataFim = dataFim ? new Date(dataFim) : null;
    }
}

/* ==========================================================
   PERSISTÊNCIA DE DADOS
   ========================================================== */
const db = {
    usuarios: JSON.parse(localStorage.getItem('usuarios')) || [],
    categorias: JSON.parse(localStorage.getItem('categorias')) || [],
    cursos: JSON.parse(localStorage.getItem('cursos')) || [],
    modulos: JSON.parse(localStorage.getItem('modulos')) || [],
    aulas: JSON.parse(localStorage.getItem('aulas')) || [],
    matriculas: JSON.parse(localStorage.getItem('matriculas')) || [],
    progressos: JSON.parse(localStorage.getItem('progressos')) || [],
    avaliacoes: JSON.parse(localStorage.getItem('avaliacoes')) || [],
    trilhas: JSON.parse(localStorage.getItem('trilhas')) || [],
    trilhaCursos: JSON.parse(localStorage.getItem('trilhaCursos')) || [],
    certificados: JSON.parse(localStorage.getItem('certificados')) || [],
    planos: JSON.parse(localStorage.getItem('planos')) || [],
    assinaturas: JSON.parse(localStorage.getItem('assinaturas')) || [],
    pagamentos: JSON.parse(localStorage.getItem('pagamentos')) || []
};

function salvar(tabela) {
    localStorage.setItem(tabela, JSON.stringify(db[tabela]));
}

/* ==========================================================
   AÇÕES E CADASTROS
   ========================================================== */
const formUsuario = document.getElementById('formUsuario');
if (formUsuario) {
    formUsuario.addEventListener('submit', function (e) {
        e.preventDefault();
        const user = new Usuario(
            db.usuarios.length + 1,
            document.getElementById('nomeUsuario').value,
            document.getElementById('emailUsuario').value,
            document.getElementById('senhaUsuario').value
        );
        db.usuarios.push(user);
        salvar('usuarios');
        renderizarUsuarios();
        carregarSelects();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalUsuario')).hide();
    });
}

const formCategoria = document.getElementById('formCategoria');
if (formCategoria) {
    formCategoria.addEventListener('submit', function (e) {
        e.preventDefault();
        const cat = new Categoria(
            db.categorias.length + 1,
            document.getElementById('nomeCategoria').value,
            document.getElementById('descCategoria').value
        );
        db.categorias.push(cat);
        salvar('categorias');
        renderizarCategorias();
        carregarSelects();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalCategoria')).hide();
    });
}

const formCurso = document.getElementById('formCurso');
if (formCurso) {
    formCurso.addEventListener('submit', function (e) {
        e.preventDefault();
        const curso = new Curso(
            db.cursos.length + 1,
            document.getElementById('tituloCurso').value,
            document.getElementById('descCurso').value,
            document.getElementById('idInstrutorCurso').value,
            document.getElementById('idCategoriaCurso').value,
            document.getElementById('nivelCurso').value,
            null, 0,
            document.getElementById('horasCurso').value
        );
        db.cursos.push(curso);
        salvar('cursos');
        renderizarCursos();
        carregarSelects();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalCurso')).hide();
    });
}

const formModulo = document.getElementById('formModulo');
if (formModulo) {
    formModulo.addEventListener('submit', function (e) {
        e.preventDefault();
        const mod = new Modulo(
            db.modulos.length + 1,
            document.getElementById('idCursoModulo').value,
            document.getElementById('tituloModulo').value,
            document.getElementById('ordemModulo').value
        );
        db.modulos.push(mod);
        salvar('modulos');
        renderizarModulos();
        carregarSelects();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalModulo')).hide();
    });
}

const formAula = document.getElementById('formAula');
if (formAula) {
    formAula.addEventListener('submit', function (e) {
        e.preventDefault();
        const aula = new Aula(
            db.aulas.length + 1,
            document.getElementById('idModuloAula').value,
            document.getElementById('tituloAula').value,
            document.getElementById('tipoAula').value,
            document.getElementById('urlAula').value,
            document.getElementById('duracaoAula').value,
            document.getElementById('ordemAula').value
        );
        db.aulas.push(aula);
        salvar('aulas');
        renderizarAulas();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalAula')).hide();
    });
}

const formMatricula = document.getElementById('formMatricula');
if (formMatricula) {
    formMatricula.addEventListener('submit', function (e) {
        e.preventDefault();
        const mat = new Matricula(
            db.matriculas.length + 1,
            document.getElementById('idUsuarioMatricula').value,
            document.getElementById('idCursoMatricula').value,
            null, null
        );
        db.matriculas.push(mat);
        salvar('matriculas');
        renderizarMatriculas();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalMatricula')).hide();
    });
}

const formProgresso = document.getElementById('formProgresso');
if (formProgresso) {
    formProgresso.addEventListener('submit', function (e) {
        e.preventDefault();
        const prog = new ProgressoAula(
            document.getElementById('idUsuarioProgresso').value,
            document.getElementById('idAulaProgresso').value,
            null,
            document.getElementById('statusProgresso').value
        );
        db.progressos.push(prog);
        salvar('progressos');
        renderizarProgressos();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalProgresso')).hide();
    });
}

const formAvaliacao = document.getElementById('formAvaliacao');
if (formAvaliacao) {
    formAvaliacao.addEventListener('submit', function (e) {
        e.preventDefault();
        const ava = new Avaliacao(
            db.avaliacoes.length + 1,
            document.getElementById('idUsuarioAvaliacao').value,
            document.getElementById('idCursoAvaliacao').value,
            document.getElementById('notaAvaliacao').value,
            document.getElementById('comentarioAvaliacao').value
        );
        db.avaliacoes.push(ava);
        salvar('avaliacoes');
        renderizarAvaliacoes();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalAvaliacao')).hide();
    });
}

const formTrilha = document.getElementById('formTrilha');
if (formTrilha) {
    formTrilha.addEventListener('submit', function (e) {
        e.preventDefault();
        const trilha = new Trilha(
            db.trilhas.length + 1,
            document.getElementById('tituloTrilha').value,
            document.getElementById('descTrilha').value,
            document.getElementById('idCategoriaTrilha').value
        );
        db.trilhas.push(trilha);
        salvar('trilhas');
        renderizarTrilhas();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalTrilha')).hide();
    });
}

const formCertificado = document.getElementById('formCertificado');
if (formCertificado) {
    formCertificado.addEventListener('submit', function (e) {
        e.preventDefault();
        const cert = new Certificado(
            db.certificados.length + 1,
            document.getElementById('idUsuarioCertificado').value,
            document.getElementById('idCursoCertificado').value,
            null,
            document.getElementById('codigoCertificado').value
        );
        db.certificados.push(cert);
        salvar('certificados');
        renderizarCertificados();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalCertificado')).hide();
    });
}

const formAssinatura = document.getElementById('formAssinatura');
if (formAssinatura) {
    formAssinatura.addEventListener('submit', function (e) {
        e.preventDefault();
        const ass = new Assinatura(
            db.assinaturas.length + 1,
            document.getElementById('idUsuarioAssinatura').value,
            document.getElementById('idPlanoAssinatura').value,
            null, null, 'Ativa'
        );
        db.assinaturas.push(ass);
        salvar('assinaturas');
        renderizarAssinaturas();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalAssinatura')).hide();
    });
}

const formPlano = document.getElementById('formPlano');
if (formPlano) {
    formPlano.addEventListener('submit', function (e) {
        e.preventDefault();
        const plano = new Plano(
            db.planos.length + 1,
            document.getElementById('nomePlano').value,
            '',
            document.getElementById('precoPlano').value,
            document.getElementById('duracaoPlano').value
        );
        db.planos.push(plano);
        salvar('planos');
        renderizarPlanos();
        carregarSelects();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalPlano')).hide();
    });
}

const formPagamento = document.getElementById('formPagamento');
if (formPagamento) {
    formPagamento.addEventListener('submit', function (e) {
        e.preventDefault();
        const pag = new Pagamento(
            db.pagamentos.length + 1,
            document.getElementById('idAssinaturaPagamento').value,
            document.getElementById('valorPagamento').value,
            null,
            document.getElementById('metodoPagamento').value
        );
        db.pagamentos.push(pag);
        salvar('pagamentos');
        renderizarPagamentos();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('modalPagamento')).hide();
    });
}

/* ==========================================================
   INTERFACE (RENDERIZAÇÃO)
   ========================================================== */

function renderizarUsuarios() {
    const tbody = document.getElementById('listaUsuarios');
    if (!tbody) return;
    tbody.innerHTML = db.usuarios.map(u => `
        <tr><td>${u.id}</td><td>${u.nome}</td><td>${u.email}</td></tr>
    `).join('');
}

function renderizarCategorias() {
    const tbody = document.getElementById('listaCategorias');
    if (!tbody) return;
    tbody.innerHTML = db.categorias.map(c => `
        <tr><td>${c.id}</td><td>${c.nome}</td><td>${c.descricao || '-'}</td></tr>
    `).join('');
}

function renderizarCursos() {
    const tbody = document.getElementById('listaCursos');
    if (!tbody) return;
    tbody.innerHTML = db.cursos.map(c => `
        <tr><td>${c.id}</td><td>${c.titulo}</td><td>ID Instrutor: ${c.idInstrutor}</td><td>${c.nivel}</td></tr>
    `).join('');
}

function renderizarModulos() {
    const tbody = document.getElementById('listaModulos');
    if (!tbody) return;
    tbody.innerHTML = db.modulos.map(m => `
        <tr><td>${m.id}</td><td>ID Curso: ${m.idCurso}</td><td>${m.titulo}</td><td>${m.ordem}º</td></tr>
    `).join('');
}

function renderizarAulas() {
    const tbody = document.getElementById('listaAulas');
    if (!tbody) return;
    tbody.innerHTML = db.aulas.map(a => `
        <tr><td>${a.id}</td><td>ID Mod: ${a.idModulo}</td><td>${a.titulo}</td><td>${a.tipo}</td></tr>
    `).join('');
}

function renderizarMatriculas() {
    const tbody = document.getElementById('listaMatriculas');
    if (!tbody) return;
    tbody.innerHTML = db.matriculas.map(m => `
        <tr><td>${m.id}</td><td>User: ${m.idUsuario}</td><td>Curso: ${m.idCurso}</td><td>${new Date(m.dataMatricula).toLocaleDateString()}</td></tr>
    `).join('');
}

function renderizarProgressos() {
    const tbody = document.getElementById('listaProgresso');
    if (!tbody) return;
    tbody.innerHTML = db.progressos.map(p => `
        <tr><td>ID User: ${p.idUsuario}</td><td>ID Aula: ${p.idAula}</td><td>${p.status}</td></tr>
    `).join('');
}

function renderizarAvaliacoes() {
    const tbody = document.getElementById('listaAvaliacoes');
    if (!tbody) return;
    tbody.innerHTML = db.avaliacoes.map(a => `
        <tr><td>ID User: ${a.idUsuario}</td><td>ID Curso: ${a.idCurso}</td><td>${a.nota}★</td><td>${a.comentario}</td></tr>
    `).join('');
}

function renderizarTrilhas() {
    const tbody = document.getElementById('listaTrilhas');
    if (!tbody) return;
    tbody.innerHTML = db.trilhas.map(t => `
        <tr><td>${t.id}</td><td>${t.titulo}</td><td>ID Cat: ${t.idCategoria}</td></tr>
    `).join('');
}

function renderizarCertificados() {
    const tbody = document.getElementById('listaCertificados');
    if (!tbody) return;
    tbody.innerHTML = db.certificados.map(c => `
        <tr><td>${c.codigoVerificacao}</td><td>ID User: ${c.idUsuario}</td><td>ID Curso: ${c.idCurso}</td><td>${new Date(c.dataEmissao).toLocaleDateString()}</td></tr>
    `).join('');
}

function renderizarPlanos() {
    const tbody = document.getElementById('listaPlanos');
    if (!tbody) return;
    tbody.innerHTML = db.planos.map(p => `
        <tr><td>${p.id}</td><td>${p.nome}</td><td>R$ ${p.precoMensal}</td><td>${p.duracaoMeses} meses</td></tr>
    `).join('');
}

function renderizarAssinaturas() {
    const tbody = document.getElementById('listaAssinaturas');
    if (!tbody) return;
    tbody.innerHTML = db.assinaturas.map(a => `
        <tr><td>${a.id}</td><td>User: ${a.idUsuario}</td><td>Plano: ${a.idPlano}</td><td>${a.status}</td></tr>
    `).join('');
}

function renderizarPagamentos() {
    const tbody = document.getElementById('listaPagamentos');
    if (!tbody) return;
    tbody.innerHTML = db.pagamentos.map(p => `
        <tr><td>${p.id}</td><td>ID Ass: ${p.idAssinatura}</td><td>R$ ${p.valorPago}</td><td>${p.metodoPagamento}</td></tr>
    `).join('');
}

/* ==========================================================
   SELECTS DINÂMICOS (FKs)
   ========================================================== */

function carregarSelects() {
    const sCat = document.querySelectorAll('#idCategoriaCurso, #idCategoriaTrilha');
    sCat.forEach(s => {
        s.innerHTML = '<option value="">Selecione...</option>' +
            db.categorias.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
    });

    const selCursos = document.querySelectorAll('.sel-cursos');
    selCursos.forEach(s => {
        s.innerHTML = '<option value="">Selecione o Curso...</option>' +
            db.cursos.map(c => `<option value="${c.id}">${c.titulo}</option>`).join('');
    });

    const selUsers = document.querySelectorAll('.sel-usuarios');
    selUsers.forEach(s => {
        s.innerHTML = '<option value="">Selecione o Usuário...</option>' +
            db.usuarios.map(u => `<option value="${u.id}">${u.nome}</option>`).join('');
    });

    const selPlanos = document.getElementById('idPlanoAssinatura');
    if (selPlanos) selPlanos.innerHTML = '<option value="">Selecione o Plano...</option>' +
        db.planos.map(p => `<option value="${p.id}">${p.nome}</option>`).join('');

    carregarModulosNoSelect();
}

function carregarModulosNoSelect() {
    const select = document.getElementById('idModuloAula');
    if (!select) return;
    select.innerHTML = '<option value="">Selecione o Módulo...</option>' +
        db.modulos.map(m => `<option value="${m.id}">${m.titulo}</option>`).join('');
}

/* ==========================================================
   INICIALIZAÇÃO
   ========================================================== */
window.addEventListener('DOMContentLoaded', () => {
    renderizarUsuarios();
    renderizarCategorias();
    renderizarCursos();
    renderizarModulos();
    renderizarAulas();
    renderizarMatriculas();
    renderizarProgressos();
    renderizarAvaliacoes();
    renderizarTrilhas();
    renderizarCertificados();
    renderizarPlanos();
    renderizarAssinaturas();
    renderizarPagamentos();

    carregarSelects();
});