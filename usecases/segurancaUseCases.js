const { prisma } = require('../db');
const Usuario = require('../entities/usuario');

const autenticaUsuarioDB = async (body) => {
    try {
        const { email, senha } = body;

        const usuario = await prisma.usuarios.findFirst({
            where: {
                email: email,
                senha: senha
            }
        });

        if (!usuario) {
            throw "Usuário ou senha inválidos";
        }

        return new Usuario(
            usuario.email,
            usuario.tipo,
            usuario.telefone,
            usuario.nome
        );
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }
};

module.exports = {
    autenticaUsuarioDB
};