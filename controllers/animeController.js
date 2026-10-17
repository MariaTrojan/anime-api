const {
    getAnimesDB,
    getAnimePorIdDB,
    addAnimeDB,
    updateAnimeDB,
    deleteAnimeDB
} = require('../usecases/animeUseCases');

const getAnimes = async (request, response) => {
    await getAnimesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message || err
        }));
};

const getAnimePorId = async (request, response) => {
    await getAnimePorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message || err
        }));
};

const addAnime = async (request, response) => {
    await addAnimeDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Anime criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message || err
        }));
};

const updateAnime = async (request, response) => {
    await updateAnimeDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Anime alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message || err
        }));
};

const deleteAnime = async (request, response) => {
    await deleteAnimeDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success",
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err.message || err
        }));
};

module.exports = {
    getAnimes,
    getAnimePorId,
    addAnime,
    updateAnime,
    deleteAnime
};