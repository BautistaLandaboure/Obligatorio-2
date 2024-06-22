class Tema {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

class Pregunta {
    constructor(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
        this.texto = texto;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestasIncorrectas = respuestasIncorrectas;
        this.nivel = nivel;
        this.tema = tema;
    }
}

class Sistema {
    constructor() {
        this.listaPreguntas = [];
        this.listaTemas = [];
    }

    agregarTema(unTema) {
        this.listaTemas.push(unTema);
    }

    estaTema(tema) {
        return this.listaTemas.some(t => t.nombre === tema.nombre);
    }

    agregarPregunta(unaPregunta) {
        this.listaPreguntas.push(unaPregunta);
    }

    estaPregunta(pregunta) {
        return this.listaPreguntas.some(p => p.texto === pregunta.texto);
    }
}