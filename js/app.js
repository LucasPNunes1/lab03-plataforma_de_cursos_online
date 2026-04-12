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
