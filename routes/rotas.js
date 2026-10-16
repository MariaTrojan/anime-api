const { Router } = require('express');
const { rotasEstudios } = require('./rotasEstudios');
const { rotasAnimes } = require('./rotasAnimes');
const { rotasAcompanhamentos } = require('./rotasAcompanhamentos');

const rotas = new Router();

rotas.use(rotasEstudios);
rotas.use(rotasAnimes);
rotas.use(rotasAcompanhamentos);

module.exports = rotas;