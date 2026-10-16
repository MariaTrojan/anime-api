const { prisma } = require('../db');

const getEstudiosDB = async () => {
    try {
        return await prisma.estudios.findMany({
            orderBy: { prenome: 'asc' }
        });
    } catch (err) {
        throw "Erro ao consultar estúdios: " + err;
    }
};

const getEstudioPorIdDB = async (id) => {
    try {
        const estudio = await prisma.estudios.findUnique({
            where: { id: parseInt(id) }
        });
        if (!estudio) {
            throw "Nenhum registro encontrado com o id: " + id;
        }
        return estudio;
    } catch (err) {
        throw "Erro ao recuperar o estúdio: " + err;
    }
};

const addEstudioDB = async (body) => {
    try {
        const { prenome, pais_origem, ano_fundacao } = body;
        return await prisma.estudios.create({
            data: {
                prenome,
                pais_origem,
                ano_fundacao: ano_fundacao ? parseInt(ano_fundacao) : null
            }
        });
    } catch (err) {
        throw "Erro ao inserir o estúdio: " + err;
    }
};

const updateEstudioDB = async (body) => {
    try {
        const { id, prenome, pais_origem, ano_fundacao } = body;
        return await prisma.estudios.update({
            where: { id: parseInt(id) },
            data: {
                prenome,
                pais_origem,
                ano_fundacao: ano_fundacao ? parseInt(ano_fundacao) : null
            }
        });
    } catch (err) {
        throw "Erro ao alterar o estúdio: " + err;
    }
};

const deleteEstudioDB = async (id) => {
    try {
        await prisma.estudios.delete({
            where: { id: parseInt(id) }
        });
        return "Estúdio removido com sucesso";
    } catch (err) {
        throw "Erro ao remover o estúdio: " + err;
    }
};

module.exports = {
    getEstudiosDB,
    getEstudioPorIdDB,
    addEstudioDB,
    updateEstudioDB,
    deleteEstudioDB
};