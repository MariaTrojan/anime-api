const { Router } = require('express');
const {
    getAnimes,
    addAnime,
    updateAnime,
    deleteAnime,
    getAnimePorId
} = require('../controllers/animeController');

const { verificaJWT, verificaAdmin } = require('../controllers/segurancaController');

const rotasAnimes = new Router();

rotasAnimes.route('/anime')
    .get(verificaJWT, getAnimes)
    .post(verificaJWT, addAnime)
    .put(verificaJWT, updateAnime);

rotasAnimes.route('/anime/:id')
    .get(verificaJWT, getAnimePorId)
    .delete(verificaJWT, verificaAdmin, deleteAnime);

module.exports = { rotasAnimes };