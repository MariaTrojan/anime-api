const { Router } = require('express');
const {
    getEstudios,
    addEstudio,
    updateEstudio,
    deleteEstudio,
    getEstudioPorId
} = require('../controllers/estudioController');

const rotasEstudios = new Router();

rotasEstudios.route('/estudio')
   .get(getEstudios)
   .post(addEstudio)
   .put(updateEstudio);

rotasEstudios.route('/estudio/:id') 
   .get(getEstudioPorId)
   .delete(deleteEstudio);

module.exports = { rotasEstudios };
