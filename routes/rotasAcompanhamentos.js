const { Router } = require('express');
const {
    getAcompanhamentos,
    addAcompanhamento,
    updateAcompanhamento,
    deleteAcompanhamento,
    getAcompanhamentoPorId
} = require('../controllers/acompanhamentoController');

const rotasAcompanhamentos = new Router();

rotasAcompanhamentos.route('/acompanhamento')
   .get(getAcompanhamentos)
   .post(addAcompanhamento)
   .put(updateAcompanhamento);

rotasAcompanhamentos.route('/acompanhamento/:id')
   .get(getAcompanhamentoPorId)
   .delete(deleteAcompanhamento);

module.exports = { rotasAcompanhamentos };