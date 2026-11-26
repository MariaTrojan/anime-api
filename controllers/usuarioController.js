const {
    cadastraUsuarioDB,
    getProprioUsuarioDB,
    atualizaProprioUsuarioDB
} = require('../usecases/usuarioUseCases');

const cadastraUsuario = async (request, response) => {
    await cadastraUsuarioDB(request.body)
        .then(usuario => response.status(200).json({
            status: "success",
            message: "Usuário cadastrado com sucesso",
            objeto: usuario
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }));
};

const getProprioUsuario = async (request, response) => {
    await getProprioUsuarioDB(request.usuario.email)
        .then(usuario => response.status(200).json(usuario))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }));
};

const atualizaProprioUsuario = async (request, response) => {
    await atualizaProprioUsuarioDB(request.usuario.email, request.body)
        .then(usuario => response.status(200).json({
            status: "success",
            message: "Dados atualizados com sucesso",
            objeto: usuario
        }))
        .catch(err => response.status(400).json({
            status: "error",
            message: err
        }));
};

module.exports = {
    cadastraUsuario,
    getProprioUsuario,
    atualizaProprioUsuario
};