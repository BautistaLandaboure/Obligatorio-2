
let sistema = new Sistema();
let temasRegistrados = [];

// Función que se ejecuta al cargar la página
window.addEventListener("load", inicio);

function inicio() {
    mostrarDescripcion();
    document.getElementById("linkDescripcion").addEventListener("click", mostrarDescripcion);
    document.getElementById("linkGestion").addEventListener("click", mostrarGestion);
    document.getElementById("linkJugar").addEventListener("click", mostrarJugar);
    document.getElementById("botonAgregarTema").addEventListener("click", agregarUnNuevoTema);
    document.getElementById("botonaJugar").addEventListener("click", Jugar);

    let deseaCargarDatos = confirm("¿Desea que hayan datos cargados?");
    if (deseaCargarDatos) {
        agregarDatos(preguntas);
    }

    document.getElementById("IDopcioncreciente").addEventListener("change", function () {
        ordenarPreguntas("creciente");
    });
    document.getElementById("IDopciondecreciente").addEventListener("change", function () {
        ordenarPreguntas("decreciente");
    });
}

function mostrarDescripcion() {
    document.getElementById("descripciongeneral").style.display = "block";
    document.getElementById("gestion").style.display = "none";
    document.getElementById("partejugarmostrable").style.display = "none";
    document.getElementById("partejugarnomostrar").style.display = "none";
}

function mostrarGestion() {
    document.getElementById("descripciongeneral").style.display = "none";
    document.getElementById("gestion").style.display = "block";
    document.getElementById("partejugarmostrable").style.display = "none";
    document.getElementById("partejugarnomostrar").style.display = "none";
}

function mostrarJugar() {
    document.getElementById("descripciongeneral").style.display = "none";
    document.getElementById("gestion").style.display = "none";
    document.getElementById("partejugarmostrable").style.display = "block";
    document.getElementById("partejugarnomostrar").style.display = "none";
}

function agregarDatos(preguntas) {
    let tbody = document.querySelector(".tabla2 tbody");

    temasRegistrados = [];
    limpiarTabla();

    for (let i = 0; i < preguntas.length; i++) {
        let pregunta = preguntas[i];

        if (!temasRegistrados.includes(pregunta.tema.nombre)) {
            temasRegistrados.push(pregunta.tema.nombre);
        }

        let tr = document.createElement("tr");

        if (pregunta.tema.nombre === "Geografía") {
            tr.classList.add("tema-geografia");
        } else if (pregunta.tema.nombre === "Matemáticas") {
            tr.classList.add("tema-matematicas");
        } else if (pregunta.tema.nombre === "Historia") {
            tr.classList.add("tema-historia");
        } else if (pregunta.tema.nombre === "Deporte") {
            tr.classList.add("tema-deporte");
        } else if (pregunta.tema.nombre === "Lenguaje") {
            tr.classList.add("tema-lenguaje");
        } else if (pregunta.tema.nombre === "Ciencia") {
            tr.classList.add("tema-ciencia");
        } else if (pregunta.tema.nombre === "Arte") {
            tr.classList.add("tema-arte");
        }
        tr.classList.add(`tema-${pregunta.tema.nombre.toLowerCase()}`);

        let tdTema = document.createElement("td");
        tdTema.innerHTML = pregunta.tema.nombre;
        tr.appendChild(tdTema);

        let tdNivel = document.createElement("td");
        tdNivel.innerHTML = pregunta.nivel;
        tr.appendChild(tdNivel);

        let tdTexto = document.createElement("td");
        tdTexto.innerHTML = pregunta.texto;
        tr.appendChild(tdTexto);

        let tdRespuestaCorrecta = document.createElement("td");
        tdRespuestaCorrecta.innerHTML = pregunta.respuestaCorrecta;
        tr.appendChild(tdRespuestaCorrecta);

        let tdRespuestasIncorrectas = document.createElement("td");
        tdRespuestasIncorrectas.innerHTML = pregunta.respuestasIncorrectas.join(", ");
        tr.appendChild(tdRespuestasIncorrectas);

        tbody.appendChild(tr);
    }

    actualizarContadorPreguntas();
    actualizarContadorTemas();
    actualizarListaTemas();
    actualizarPromedioPreguntasPorTema();
    actualizarSelectTemas();
}

function limpiarTabla() {
    let tbody = document.querySelector(".tabla2 tbody");
    tbody.innerHTML = "";
}

function actualizarContadorPreguntas() {
    let tbody = document.querySelector(".tabla2 tbody");
    let filasVisibles = tbody.querySelectorAll("tr");

    let contadorPreguntasVisibles = 0;
    filasVisibles.forEach((fila) => {
        if (fila.style.display !== "none") {
            contadorPreguntasVisibles++;
        }
    });

    let contador = document.getElementById("contador-preguntas");
    contador.innerHTML = `Total de preguntas registradas: ${contadorPreguntasVisibles} preguntas`;
}

function actualizarContadorTemas() {
    let contadorTemas = document.getElementById("total-temas");
    contadorTemas.textContent = `Total de temas registrados: ${temasRegistrados.length}`;
}

function actualizarListaTemas() {
    let listaTemas = document.getElementById("lista-temas");

    listaTemas.innerHTML = "";

    if (temasRegistrados.length === 0) {
        let sinDatos = document.createElement("li");
        sinDatos.textContent = "Sin Datos";
        listaTemas.appendChild(sinDatos);
    } else {
        temasRegistrados.forEach((tema) => {
            let elementoLista = document.createElement("li");
            elementoLista.textContent = tema;
            listaTemas.appendChild(elementoLista);
        });
    }
}

function actualizarSelectTemas() {
    let selectTemas = document.getElementById("IDtemaElegir");

    selectTemas.innerHTML = '<option value="" disabled selected hidden>Elija una opción</option>';

    temasRegistrados.forEach((tema) => {
        let opcion = document.createElement("option");
        opcion.value = tema.toLowerCase();
        opcion.textContent = tema;
        selectTemas.appendChild(opcion);
    });
}

function ordenarPreguntas(tipoOrden) {
    let preguntasOrdenadas = preguntas.slice();

    if (tipoOrden === "creciente") {
        preguntasOrdenadas.sort(function (a, b) {
            if (a.tema.nombre < b.tema.nombre) return -1;
            if (a.tema.nombre > b.tema.nombre) return 1;
            return a.nivel - b.nivel;
        });
    } else if (tipoOrden === "decreciente") {
        preguntasOrdenadas.sort(function (a, b) {
            if (a.tema.nombre > b.tema.nombre) return -1;
            if (a.tema.nombre < b.tema.nombre) return 1;
            return b.nivel - a.nivel;
        });
    }

    agregarDatos(preguntasOrdenadas);
}

function actualizarPromedioPreguntasPorTema() {
    let cantidadPreguntas = preguntas.length;
    let cantidadTemas = temasRegistrados.length;

    if (cantidadTemas > 0) {
        let promedio = cantidadPreguntas / cantidadTemas;
        document.getElementById("promedio-preguntas-por-tema").textContent = `Promedio de preguntas por tema: ${promedio.toFixed(2)}`;
    } else {
        document.getElementById("promedio-preguntas-por-tema").textContent = `Promedio de preguntas por tema: 0`;
    }
}