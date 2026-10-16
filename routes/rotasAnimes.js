const { Router } = require('express');
const {
    getAnimes,
    addAnime,
    updateAnime,
    deleteAnime,
    getAnimePorId
} = require('../controllers/animeController');

const rotasAnimes = new Router();

rotasAnimes.route('/anime')
   .get(getAnimes)
   .post(addAnime)
   .put(updateAnime);

rotasAnimes.route('/anime/:id')
   .get(getAnimePorId)
   .delete(deleteAnime);

module.exports = { rotasAnimes };