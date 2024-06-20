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
        this.tema = new Tema(tema.nombre, tema.descripcion);
    }
}

 class Sistema {
        constructor() {
            this.listaPreguntas = [];
            this.listaTemas = [];
        }

        agregar(unTema) {
            this.listaTemas.push(unTema);
        }

        estaTema(tema) {
            return this.listaTemas.some(t => t.nombre === tema.nombre);
        }
    }


