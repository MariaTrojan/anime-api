class Acompanhamento {
    constructor(id, status, episodios_assistidos, nota, anime_id, anime_titulo = null, estudio_prenome = null, anime_genero = null, anime_total_episodios = null) {
        this.id = id;
        this.status = status;
        this.episodios_assistidos = episodios_assistidos;
        this.nota = nota;
        this.anime_id = anime_id;
        this.anime_titulo = anime_titulo;
        this.estudio_prenome = estudio_prenome;
        this.anime_genero = anime_genero;
        this.anime_total_episodios = anime_total_episodios;
    }
}

module.exports = Acompanhamento;