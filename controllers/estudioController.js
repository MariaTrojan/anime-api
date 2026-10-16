const {
    getEstudiosDB,
    getEstudioPorIdDB,
    addEstudioDB,
    updateEstudioDB,
    deleteEstudioDB
} = require('../usecases/estudioUseCases');

const getEstudios = async (request, response) => {
    await getEstudiosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os estúdios: ' + err
        }));
};

const getEstudioPorId = async (request, response) => {
    await getEstudioPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const addEstudio = async (request, response) => {
    await addEstudioDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Estúdio criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const updateEstudio = async (request, response) => {
    await updateEstudioDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Estúdio alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const deleteEstudio = async (request, response) => {
    await deleteEstudioDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success",
            message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

module.exports = {
    getEstudios,
    getEstudioPorId,
    addEstudio,
    updateEstudio,
    deleteEstudio
};