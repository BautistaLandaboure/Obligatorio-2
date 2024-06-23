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
        for (let i = 0; i < this.listaPreguntas.length; i++) {
            if (this.listaPreguntas[i].texto === pregunta.texto) {
                return true;
            }
        }
        return false;
    }
}