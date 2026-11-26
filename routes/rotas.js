const { Router } = require('express');
const { rotasEstudios } = require('./rotasEstudios');
const { rotasAnimes } = require('./rotasAnimes');
const { rotasAcompanhamentos } = require('./rotasAcompanhamentos');
const { rotasUsuarios } = require('./rotasUsuarios');
const { login } = require('../controllers/segurancaController')

const rotas = new Router();

rotas.route("/login").post(login);
rotas.use(rotasUsuarios);
rotas.use(rotasEstudios);
rotas.use(rotasAnimes);
rotas.use(rotasAcompanhamentos);

module.exports = rotas;