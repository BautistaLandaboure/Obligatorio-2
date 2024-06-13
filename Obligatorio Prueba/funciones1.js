

// Función que se ejecuta al cargar la página
window.addEventListener("load", inicio,);

function inicio() {
    mostrarDescripcion();
    document.getElementById("linkDescripcion").addEventListener("click", mostrarDescripcion);
    document.getElementById("linkGestion").addEventListener("click", mostrarGestion);
    document.getElementById("linkJugar").addEventListener("click", mostrarJugar);
    document.getElementById("botonaJugar").addEventListener("click", Jugar); 
    document.getElementById("IDopcioncreciente").addEventListener("click", function() {
        ordenarPreguntas("creciente");
    });
    document.getElementById("IDopciondecreciente").addEventListener("click", function() {
        ordenarPreguntas("decreciente");
    });

   
    let deseaCargarDatos = confirm("¿Desea que hayan datos cargados?");
    if (deseaCargarDatos) {
        agregarDatos(preguntas);
    }

   
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
    let preguntasOrdenadas = preguntas.slice(); // Crear una copia del array de preguntas
  
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

  function Jugar(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    let temaSeleccionado = document.getElementById("IDtemaElegir").value;
    let nivelSeleccionado = parseInt(document.getElementById("IDnivelJuego").value);

    if (temaSeleccionado && nivelSeleccionado) {
        temaSeleccionado = temaSeleccionado.toLowerCase();
        mostrarPreguntaSegunSeleccion(temaSeleccionado, nivelSeleccionado);
        
        let tema = document.getElementById("IDtemaElegir");
        let nivel = document.getElementById("IDnivelJuego");

        tema.disabled = true;
        nivel.disabled = true;
        nivel.readOnly = true;

        document.getElementById("descripciongeneral").style.display = "none";
        document.getElementById("gestion").style.display = "none";
        document.getElementById("partejugarmostrable").style.display = "block";
        document.getElementById("partejugarnomostrar").style.display = "block";
    } else {
        alert("Por favor seleccione un tema y un nivel antes de jugar.");
    }
}


function mostrarPreguntaSegunSeleccion(temaSeleccionado, nivelSeleccionado) {
    // Filtrar las preguntas por tema y nivel
    let preguntasFiltradas = preguntas.filter(pregunta => 
        pregunta.tema.nombre.toLowerCase() === temaSeleccionado && pregunta.nivel === nivelSeleccionado
    );

    // Obtener una pregunta aleatoria de las preguntas filtradas
    let preguntaAleatoria = preguntasFiltradas[Math.floor(Math.random() * preguntasFiltradas.length)];

    // Mostrar el texto de la pregunta en el elemento HTML correspondiente
    let textoPregunta = document.getElementById("textopregunta");
    textoPregunta.textContent = preguntaAleatoria.texto;

    // Limpiar las respuestas anteriores
    let filaBotones = document.querySelector(".fila-botones");
    filaBotones.innerHTML = "";

    // Crear botones para cada respuesta
    preguntaAleatoria.respuestasIncorrectas.push(preguntaAleatoria.respuestaCorrecta); // Agregar la respuesta correcta a las incorrectas
    preguntaAleatoria.respuestasIncorrectas.sort(() => Math.random() - 0.5); // Mezclar las respuestas

    preguntaAleatoria.respuestasIncorrectas.forEach((respuesta, index) => {
        let botonRespuesta = document.createElement("button");
        botonRespuesta.className = "botonrespuesta";
        botonRespuesta.textContent = respuesta;
        filaBotones.appendChild(botonRespuesta);
    });
}