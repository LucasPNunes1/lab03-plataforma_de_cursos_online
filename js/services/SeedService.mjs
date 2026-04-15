export class SeedService {
    static popular(svcs) {
        if (localStorage.getItem('usuarios')) return;

        const uId = crypto.randomUUID();
        const catId = crypto.randomUUID();
        const curId = crypto.randomUUID();
        const modId = crypto.randomUUID();
        const planoId = crypto.randomUUID();
        const matId = crypto.randomUUID();

        localStorage.setItem('usuarios', JSON.stringify([{
            id: uId, nome: 'Usuário Seed', email: 'seed@exemplo.com', senhaHash: '123'
        }]));

        localStorage.setItem('categorias', JSON.stringify([{
            id: catId, nome: 'Programação', descricao: 'Cursos de TI'
        }]));

        localStorage.setItem('cursos', JSON.stringify([{
            id: curId, titulo: 'JavaScript Moderno', idCategoria: catId, idInstrutor: uId, nivel: 'Iniciante', totalHoras: 40, descricao: 'Tudo sobre ES6+'
        }]));

        localStorage.setItem('modulos', JSON.stringify([{
            id: modId, idCurso: curId, titulo: 'Introdução ao ECMAScript', ordem: 1
        }]));

        localStorage.setItem('aulas', JSON.stringify([{
            id: crypto.randomUUID(), idModulo: modId, titulo: 'Configurando o Ambiente', tipo: 'Vídeo', urlConteudo: 'http...', duracao: 15, ordem: 1
        }]));

        localStorage.setItem('planos', JSON.stringify([{
            id: planoId, nome: 'Plano Premium', preco: 49.90, duracaoMeses: 12
        }]));

        localStorage.setItem('matriculas', JSON.stringify([{
            id: matId, idUsuario: uId, idCurso: curId, dataMatricula: new Date().toISOString()
        }]));

        localStorage.setItem('assinaturas', JSON.stringify([{
            id: crypto.randomUUID(), idUsuario: uId, idPlano: planoId, status: 'Ativa'
        }]));

        localStorage.setItem('pagamentos', JSON.stringify([{
            id: crypto.randomUUID(), idAssinatura: matId, valorPago: 49.90, metodoPagamento: 'Pix'
        }]));

        localStorage.setItem('trilhas', JSON.stringify([{
            id: curId, titulo: 'Fullstack Developer', idCategoria: catId, descricao: 'De zero a herói'
        }]));

        localStorage.setItem('trilhaCursos', JSON.stringify([{
            idTrilha: curId, idCurso: curId, ordem: 1
        }]));
        
        localStorage.setItem('certificados', JSON.stringify([{
            id: crypto.randomUUID(), idUsuario: uId, idCurso: curId, codigoVerificacao: 'ABC-123', dataEmissao: new Date().toISOString()
        }]));

        localStorage.setItem('progressos', JSON.stringify([{
            id: uId + ':aula1', idUsuario: uId, idAula: 'aula1', status: 'Concluído'
        }]));

        localStorage.setItem('avaliacoes', JSON.stringify([{
            id: crypto.randomUUID(), idUsuario: uId, idCurso: curId, nota: 5, comentario: 'Excelente!'
        }]));
    }
}
