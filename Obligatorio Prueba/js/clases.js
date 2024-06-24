// creado por Bautista Landaboure (316326)

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

    estaTema(tema) {
        for (let i = 0; i < this.listaTemas.length; i++) {
            if (this.listaTemas[i].nombre.toLowerCase() === tema.nombre.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    agregarTema(unTema) {
        if (!this.estaTema(unTema)) {
            this.listaTemas.push(unTema);
            return true;
        }
        return false;
    }

    estaPregunta(pregunta) {
        for (let i = 0; i < this.listaPreguntas.length; i++) {
            if (this.listaPreguntas[i].texto.toLowerCase() === pregunta.texto.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    agregarPregunta(unaPregunta) {
        if (!this.estaPregunta(unaPregunta)) {
            this.listaPreguntas.push(unaPregunta);
            return true;
        }
        return false;
    }

}

