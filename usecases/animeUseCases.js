const { prisma } = require('../db');

const getAnimesDB = async () => {
    try {
        return await prisma.animes.findMany({
            orderBy: { id: 'asc' }
        });
    } catch (err) {
        throw "Erro ao consultar animes: " + err;
    }
};

const getAnimePorIdDB = async (id) => {
    try {
        const anime = await prisma.animes.findUnique({
            where: { id: parseInt(id) }
        });
        if (!anime) {
            throw "Nenhum anime encontrado com o id: " + id;
        }
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

        const estId = parseInt(estudio_id);
        if (isNaN(estId)) {
            throw "O identificador do estúdio é inválido.";
        }

        const eps = total_episodios !== undefined && total_episodios !== null && total_episodios !== ''
            ? parseInt(total_episodios)
            : null;

        if (eps !== null && eps <= 0) {
            throw "O total de episódios do anime deve ser maior que zero.";
        }

        return await prisma.animes.create({
            data: {
                titulo: String(titulo).trim(),
                genero: genero ? String(genero).trim() : null,
                total_episodios: eps,
                estudio_id: estId
            }
        });
    } catch (err) {
        throw "Erro ao inserir o anime: " + err;
    }
};

const updateAnimeDB = async (body) => {
    try {
        const { id, titulo, genero, total_episodios, estudio_id } = body;

        const estId = parseInt(estudio_id);
        const eps = total_episodios !== undefined && total_episodios !== null && total_episodios !== ''
            ? parseInt(total_episodios)
            : null;

        if (eps !== null && eps <= 0) {
            throw "O total de episódios do anime deve ser maior que zero.";
        }

        return await prisma.animes.update({
            where: { id: parseInt(id) },
            data: {
                titulo: String(titulo).trim(),
                genero: genero ? String(genero).trim() : null,
                total_episodios: eps,
                estudio_id: estId
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