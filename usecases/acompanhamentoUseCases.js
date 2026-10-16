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
        const results = await pool.query(
            `INSERT INTO acompanhamentos (status, episodios_assistidos, nota, anime_id)
             VALUES ($1, $2, $3, $4)
             RETURNING id, status, episodios_assistidos, nota, anime_id`,
            [status, episodios_assistidos, nota, anime_id]
        );
        const acomp = results.rows[0];
        return new Acompanhamento(acomp.id, acomp.status, acomp.episodios_assistidos, acomp.nota, acomp.anime_id);
    } catch (err) {
        throw "Erro ao inserir o acompanhamento: " + err;
    }
};

const updateAcompanhamentoDB = async (body) => {
    try {
        const { id, status, episodios_assistidos, nota, anime_id } = body;
        const results = await pool.query(
            `UPDATE acompanhamentos
             SET status = $2, episodios_assistidos = $3, nota = $4, anime_id = $5
             WHERE id = $1
             RETURNING id, status, episodios_assistidos, nota, anime_id`,
            [id, status, episodios_assistidos, nota, anime_id]
        );
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
        }
        const acomp = results.rows[0];
        return new Acompanhamento(acomp.id, acomp.status, acomp.episodios_assistidos, acomp.nota, acomp.anime_id);
    } catch (err) {
        throw "Erro ao alterar o acompanhamento: " + err;
    }
};

const deleteAcompanhamentoDB = async (id) => {
    try {
        const results = await pool.query('DELETE FROM acompanhamentos WHERE id = $1', [id]);
        if (results.rowCount === 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        }
        return "Acompanhamento removido com sucesso";
    } catch (err) {
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