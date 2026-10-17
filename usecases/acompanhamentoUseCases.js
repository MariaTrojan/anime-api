const { prisma } = require('../db'); // ou '../db'

const getAnimesDB = async () => {
    try {
        return await prisma.animes.findMany({
            include: {
                estudios: true
            },
            orderBy: { id: 'asc' }
        });
    } catch (err) {
        throw "Erro ao consultar animes: " + err;
    }
};

const getAnimePorIdDB = async (id) => {
    try {
        const anime = await prisma.animes.findUnique({
            where: { id: parseInt(id) },
            include: {
                estudios: true
            }
        });
        if (!anime) throw "Nenhum registro encontrado com o id: " + id;
        return anime;
    } catch (err) {
        throw "Erro ao recuperar o anime: " + err;
    }
};

const addAnimeDB = async (body) => {
    try {
        const { titulo, genero, total_episodios, estudio_id } = body;

        if (!titulo || !estudio_id) {
            throw "Título e estúdio são obrigatórios.";
        }

        const eps = total_episodios ? parseInt(total_episodios) : null;
        if (eps !== null && eps <= 0) {
            throw "O total de episódios deve ser maior que zero.";
        }

        return await prisma.animes.create({
            data: {
                titulo: String(titulo).trim(),
                genero: genero ? String(genero).trim() : null,
                total_episodios: eps,
                estudio_id: parseInt(estudio_id)
            }
        });
    } catch (err) {
        throw "Erro ao inserir o anime: " + err;
    }
};

const updateAnimeDB = async (body) => {
    try {
        const { id, titulo, genero, total_episodios, estudio_id } = body;

        const eps = total_episodios ? parseInt(total_episodios) : null;
        if (eps !== null && eps <= 0) {
            throw "O total de episódios deve ser maior que zero.";
        }

        return await prisma.animes.update({
            where: { id: parseInt(id) },
            data: {
                titulo: String(titulo).trim(),
                genero: genero ? String(genero).trim() : null,
                total_episodios: eps,
                estudio_id: parseInt(estudio_id)
            }
        });
    } catch (err) {
        throw "Erro ao alterar o anime: " + err;
    }
};

const deleteAnimeDB = async (id) => {
    try {
        await prisma.animes.delete({
            where: { id: parseInt(id) }
        });
        return "Anime removido com sucesso";
    } catch (err) {
        if (err.code === 'P2025') {
            throw `Nenhum anime encontrado com o id ${id}`;
        }
        throw "Erro ao remover o anime: " + err;
    }
};

module.exports = {
    getAnimesDB,
    getAnimePorIdDB,
    addAnimeDB,
    updateAnimeDB,
    deleteAnimeDB
};