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
        if (!this.estaTema(unTema)) {
            this.listaTemas.push(unTema);
            return true;
        }
        return false;
    }

    estaTema(tema) {
        return this.listaTemas.some(t => t.nombre.toLowerCase() === tema.nombre.toLowerCase());
    }

    agregarPregunta(unaPregunta) {
        if (!this.estaPregunta(unaPregunta)) {
            this.listaPreguntas.push(unaPregunta);
            return true;
        }
        return false;
    }

    estaPregunta(pregunta) {
        return this.listaPreguntas.some(p => p.texto.toLowerCase() === pregunta.texto.toLowerCase());
    }
}
