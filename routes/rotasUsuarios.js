const { Router } = require('express');
const {
    cadastraUsuario,
    getProprioUsuario,
    atualizaProprioUsuario
} = require('../controllers/usuarioController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasUsuarios = new Router();

rotasUsuarios.route('/usuario')
    .post(cadastraUsuario);

rotasUsuarios.route('/usuario/me')
    .get(verificaJWT, getProprioUsuario)
    .put(verificaJWT, atualizaProprioUsuario);

module.exports = { rotasUsuarios };