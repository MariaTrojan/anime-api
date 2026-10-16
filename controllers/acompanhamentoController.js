const {
    getAcompanhamentosDB,
    getAcompanhamentoPorIdDB,
    addAcompanhamentoDB,
    updateAcompanhamentoDB,
    deleteAcompanhamentoDB
} = require('../usecases/acompanhamentoUseCases');

const getAcompanhamentos = async (request, response) => {
    await getAcompanhamentosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os acompanhamentos: ' + err
        }));
};

const getAcompanhamentoPorId = async (request, response) => {
    await getAcompanhamentoPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const addAcompanhamento = async (request, response) => {
    await addAcompanhamentoDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Acompanhamento criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const updateAcompanhamento = async (request, response) => {
    await updateAcompanhamentoDB(request.body)
        .then(data => response.status(200).json({
            status: "success",
            message: "Acompanhamento alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const deleteAcompanhamento = async (request, response) => {
    await deleteAcompanhamentoDB(parseInt(request.params.id))
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
    getAcompanhamentos,
    getAcompanhamentoPorId,
    addAcompanhamento,
    updateAcompanhamento,
    deleteAcompanhamento
};