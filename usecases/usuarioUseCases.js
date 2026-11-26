const { prisma } = require('../db');
const Usuario = require('../entities/usuario');

const cadastraUsuarioDB = async (body) => {
    try {
        const { email, senha, telefone, nome } = body;

        if (!email || !senha || !telefone || !nome) {
            throw "Email, senha, telefone e nome são obrigatórios.";
        }

        const existente = await prisma.usuarios.findUnique({
            where: { email: email }
        });

        if (existente) {
            throw "Já existe um usuário cadastrado com este email.";
        }

        const criado = await prisma.usuarios.create({
            data: {
                email: email,
                senha: senha,
                tipo: 'U',
                telefone: telefone,
                nome: nome
            }
        });

        return new Usuario(criado.email, criado.tipo, criado.telefone, criado.nome);
    } catch (err) {
        throw "Erro ao cadastrar usuário: " + err;
    }
};

const getProprioUsuarioDB = async (emailLogado) => {
    try {
        const usuario = await prisma.usuarios.findUnique({
            where: { email: emailLogado }
        });

        if (!usuario) {
            throw "Usuário não encontrado.";
        }

        return new Usuario(usuario.email, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw "Erro ao consultar dados do usuário: " + err;
    }
};

const atualizaProprioUsuarioDB = async (emailLogado, body) => {
    try {
        const { nome, telefone, senha } = body;

        if (!nome || !telefone) {
            throw "Nome e telefone são obrigatórios.";
        }

        const dadosAtualizacao = {
            nome: nome,
            telefone: telefone
        };

        if (senha && senha.trim() !== "") {
            dadosAtualizacao.senha = senha;
        }

        const atualizado = await prisma.usuarios.update({
            where: { email: emailLogado },
            data: dadosAtualizacao
        });

        return new Usuario(atualizado.email, atualizado.tipo, atualizado.telefone, atualizado.nome);
    } catch (err) {
        throw "Erro ao atualizar dados do usuário: " + err;
    }
};

module.exports = {
    cadastraUsuarioDB,
    getProprioUsuarioDB,
    atualizaProprioUsuarioDB
};