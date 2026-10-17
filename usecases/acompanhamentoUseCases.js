const { prisma } = require('../db');

const getAcompanhamentosDB = async () => {
    try {
        const dados = await prisma.acompanhamentos.findMany({
            include: {
                animes: true
            },
            orderBy: { id: 'asc' }
        });

        // Achata o objeto para o frontend receber diretamente anime_titulo
        return dados.map((item) => ({
            id: item.id,
            status: item.status,
            episodios_assistidos: item.episodios_assistidos,
            nota: item.nota !== null ? Number(item.nota) : null,
            anime_id: item.anime_id,
            anime_titulo: item.animes?.titulo || `Anime #${item.anime_id}`
        }));
    } catch (err) {
        throw "Erro ao consultar acompanhamentos: " + err;
    }
};

const getAcompanhamentoPorIdDB = async (id) => {
    try {
        const item = await prisma.acompanhamentos.findUnique({
            where: { id: parseInt(id) },
            include: { animes: true }
        });

        if (!item) {
            throw "Nenhum registro encontrado com o id: " + id;
        }

        return {
            id: item.id,
            status: item.status,
            episodios_assistidos: item.episodios_assistidos,
            nota: item.nota !== null ? Number(item.nota) : null,
            anime_id: item.anime_id,
            anime_titulo: item.animes?.titulo || `Anime #${item.anime_id}`
        };
    } catch (err) {
        throw "Erro ao recuperar o acompanhamento: " + err;
    }
};

const addAcompanhamentoDB = async (body) => {
    try {
        const { status, episodios_assistidos, nota, anime_id } = body;

        // Regra: Bloquear episódios negativos
        const eps = parseInt(episodios_assistidos) || 0;
        if (eps < 0) {
            throw "A quantidade de episódios assistidos não pode ser negativa.";
        }

        const animeIdNum = parseInt(anime_id);
        if (!animeIdNum) {
            throw "O identificador do anime é obrigatório.";
        }

        // Regra: Não ultrapassar total de episódios do anime
        const anime = await prisma.animes.findUnique({
            where: { id: animeIdNum }
        });

        if (anime && anime.total_episodios && eps > anime.total_episodios) {
            throw `Episódios assistidos (${eps}) excede o total do anime (${anime.total_episodios}).`;
        }

        return await prisma.acompanhamentos.create({
            data: {
                status: status || 'Assistindo',
                episodios_assistidos: eps,
                nota: nota !== undefined && nota !== null && nota !== '' ? parseFloat(nota) : null,
                anime_id: animeIdNum
            }
        });
    } catch (err) {
        throw "Erro ao inserir o acompanhamento: " + err;
    }
};

const updateAcompanhamentoDB = async (body) => {
    try {
        const { id, status, episodios_assistidos, nota, anime_id } = body;

        const eps = parseInt(episodios_assistidos) || 0;
        if (eps < 0) {
            throw "A quantidade de episódios assistidos não pode ser negativa.";
        }

        const animeIdNum = parseInt(anime_id);

        const anime = await prisma.animes.findUnique({
            where: { id: animeIdNum }
        });

        if (anime && anime.total_episodios && eps > anime.total_episodios) {
            throw `Episódios assistidos (${eps}) excede o total do anime (${anime.total_episodios}).`;
        }

        return await prisma.acompanhamentos.update({
            where: { id: parseInt(id) },
            data: {
                status,
                episodios_assistidos: eps,
                nota: nota !== undefined && nota !== null && nota !== '' ? parseFloat(nota) : null,
                anime_id: animeIdNum
            }
        });
    } catch (err) {
        throw "Erro ao alterar o acompanhamento: " + err;
    }
};

const deleteAcompanhamentoDB = async (id) => {
    try {
        await prisma.acompanhamentos.delete({
            where: { id: parseInt(id) }
        });
        return "Acompanhamento removido com sucesso";
    } catch (err) {
        if (err.code === 'P2025') {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        }
        throw "Erro ao remover o acompanhamento: " + err;
    }
};

module.exports = {
    getAcompanhamentosDB,
    getAcompanhamentoPorIdDB,
    addAcompanhamentoDB,
    updateAcompanhamentoDB,
    deleteAcompanhamentoDB
};