const { Router } = require('express');
const {
    getAcompanhamentos,
    addAcompanhamento,
    updateAcompanhamento,
    deleteAcompanhamento,
    getAcompanhamentoPorId
} = require('../controllers/acompanhamentoController');

const { verificaJWT, verificaAdmin } = require('../controllers/segurancaController');

const rotasAcompanhamentos = new Router();

rotasAcompanhamentos.route('/acompanhamento')
   .get(verificaJWT, getAcompanhamentos)
   .post(verificaJWT, addAcompanhamento)
   .put(verificaJWT, updateAcompanhamento);

rotasAcompanhamentos.route('/acompanhamento/:id')
   .get(verificaJWT, getAcompanhamentoPorId)
   .delete(verificaJWT, verificaAdmin, deleteAcompanhamento);

module.exports = { rotasAcompanhamentos };

