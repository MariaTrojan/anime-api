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
        const anoAtual = new Date().getFullYear();
        let ano = null;

        if (ano_fundacao) {
            ano = parseInt(ano_fundacao);
            if (ano < 1900 || ano > anoAtual) {
                throw `Ano de fundação inválido. Deve ser entre 1900 e ${anoAtual}.`;
            }
        }

        return await prisma.estudios.create({
            data: {
                prenome,
                pais_origem: pais_origem || 'Japão',
                ano_fundacao: ano
            }
        });
    } catch (err) {
        throw "Erro ao inserir o estúdio: " + err;
    }
};

const updateEstudioDB = async (body) => {
    try {
        const { id, prenome, pais_origem, ano_fundacao } = body;
        const anoAtual = new Date().getFullYear();
        let ano = null;

        if (ano_fundacao) {
            ano = parseInt(ano_fundacao);
            if (ano < 1900 || ano > anoAtual) {
                throw `Ano de fundação inválido. Deve ser entre 1900 e ${anoAtual}.`;
            }
        }

        return await prisma.estudios.update({
            where: { id: parseInt(id) },
            data: {
                prenome,
                pais_origem: pais_origem || 'Japão',
                ano_fundacao: ano
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