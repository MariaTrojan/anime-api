const { pool } = require('../config');
const Acompanhamento = require('../entities/acompanhamento');

const getAcompanhamentosDB = async () => {
    try {
        const query = `
            SELECT 
                ac.id, 
                ac.status, 
                ac.episodios_assistidos, 
                ac.nota, 
                ac.anime_id, 
                an.titulo AS anime_titulo,
                an.genero AS anime_genero,
                an.total_episodios AS anime_total_episodios,
                es.prenome AS estudio_prenome
            FROM acompanhamentos ac
            JOIN animes an ON ac.anime_id = an.id
            LEFT JOIN estudios es ON an.estudio_id = es.id
            ORDER BY ac.id ASC
        `;
        const { rows } = await pool.query(query);
        return rows.map((acomp) => new Acompanhamento(
            acomp.id,
            acomp.status,
            acomp.episodios_assistidos,
            acomp.nota,
            acomp.anime_id,
            acomp.anime_titulo,
            acomp.estudio_prenome,
            acomp.anime_genero,
            acomp.anime_total_episodios
        ));
    } catch (err) {
        throw "Erro ao consultar acompanhamentos: " + err;
    }
};

const getAcompanhamentoPorIdDB = async (id) => {
    try {
        const query = `
            SELECT ac.id, ac.status, ac.episodios_assistidos, ac.nota, ac.anime_id, an.titulo AS anime_titulo
            FROM acompanhamentos ac
            JOIN animes an ON ac.anime_id = an.id
            WHERE ac.id = $1
        `;
        const results = await pool.query(query, [id]);
        if (results.rowCount === 0) {
            throw "Nenhum registro encontrado com o id: " + id;
        }
        const acomp = results.rows[0];
        return new Acompanhamento(
            acomp.id,
            acomp.status,
            acomp.episodios_assistidos,
            acomp.nota,
            acomp.anime_id,
            acomp.anime_titulo
        );
    } catch (err) {
        throw "Erro ao recuperar o acompanhamento: " + err;
    }
};

const addAcompanhamentoDB = async (body) => {
    try {
        const { status, episodios_assistidos, nota, anime_id } = body;

        // 1. Bloquear episódios negativos
        const eps = parseInt(episodios_assistidos) || 0;
        if (eps < 0) {
            throw "A quantidade de episódios assistidos não pode ser negativa.";
        }

        // 2. Bloquear episódios além do total usando o Prisma
        const anime = await prisma.animes.findUnique({
            where: { id: parseInt(anime_id) }
        });

        if (anime && anime.total_episodios && eps > anime.total_episodios) {
            throw `Episódios assistidos (${eps}) excede o total do anime (${anime.total_episodios}).`;
        }

        // 3. Salvar via Prisma ORM
        return await prisma.acompanhamentos.create({
            data: {
                status,
                episodios_assistidos: eps,
                nota: nota !== undefined && nota !== null && nota !== '' ? parseFloat(nota) : null,
                anime_id: parseInt(anime_id)
            }
        });
    } catch (err) {
        throw "Erro ao inserir o acompanhamento: " + err;
    }
};

const updateAcompanhamentoDB = async (body) => {
    try {
        const { id, status, episodios_assistidos, nota, anime_id } = body;

        // 1. Trava contra episódios negativos
        const eps = parseInt(episodios_assistidos) || 0;
        if (eps < 0) {
            throw "A quantidade de episódios assistidos não pode ser negativa.";
        }

        // 2. Trava contra episódios maiores que o total do anime via Prisma
        const anime = await prisma.animes.findUnique({
            where: { id: parseInt(anime_id) }
        });
        if (anime && anime.total_episodios && eps > anime.total_episodios) {
            throw `Episódios assistidos (${eps}) excede o total do anime (${anime.total_episodios}).`;
        }

        // 3. Atualização via Prisma ORM
        return await prisma.acompanhamentos.update({
            where: { id: parseInt(id) },
            data: {
                status,
                episodios_assistidos: eps,
                nota: nota !== undefined && nota !== null && nota !== '' ? parseFloat(nota) : null,
                anime_id: parseInt(anime_id)
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