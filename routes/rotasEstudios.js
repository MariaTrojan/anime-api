const { Router } = require('express');
const {
    getEstudios,
    addEstudio,
    updateEstudio,
    deleteEstudio,
    getEstudioPorId
} = require('../controllers/estudioController');

const { verificaJWT, verificaAdmin } = require('../controllers/segurancaController');

const rotasEstudios = new Router();

rotasEstudios.route('/estudio')
    .get(verificaJWT, getEstudios)
    .post(verificaJWT, addEstudio)
    .put(verificaJWT, updateEstudio);

rotasEstudios.route('/estudio/:id')
    .get(verificaJWT, getEstudioPorId)
    .delete(verificaJWT, verificaAdmin, deleteEstudio);

module.exports = { rotasEstudios };
