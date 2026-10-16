class Anime {
    constructor(id, titulo, genero, total_episodios, estudio_id, estudio_prenome = null) {
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
        this.total_episodios = total_episodios;
        this.estudio_id = estudio_id;
        this.estudio_prenome = estudio_prenome;
    }
}

module.exports = Anime;