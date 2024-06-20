
window.addEventListener("load", inicio);

let sistema = new Sistema();
let juegoEnCurso = false;
let puntajeMaximo = 0;
let preguntasMostradas = [];
let puntaje = 0;
let coloresPorTema = {};

function inicio() {

    mostrarDescripcion();

    document.getElementById('formAltaTemas').onsubmit = agregarTemas;

    document.getElementById("linkDescripcion").addEventListener("click", function() {
        terminarJuegoSiEstaEnCurso();
        mostrarDescripcion();
    });
    document.getElementById("linkGestion").addEventListener("click", function() {
        terminarJuegoSiEstaEnCurso();
        mostrarGestion();
    });
    document.getElementById("linkJugar").addEventListener("click", function() {
        terminarJuegoSiEstaEnCurso();
        mostrarJugar();
    });
    document.getElementById("botonaJugar").addEventListener("click", Jugar); 
    document.getElementById("botonAyuda").addEventListener("click", mostrarAyuda);
    document.getElementById("IDopcioncreciente").addEventListener("click", function() {
        ordenarPreguntas("creciente");
    });
    document.getElementById("IDopciondecreciente").addEventListener("click", function() {
        ordenarPreguntas("decreciente");
    });
    document.getElementById("botonSiguientePregunta").addEventListener("click", cambiarPregunta);
    document.getElementById("botonTerminar").addEventListener("click", terminarJuego);

    // Verificar si se accede a otras pestañas
    window.addEventListener("blur", terminarJuego);

    let deseaCargarDatos = confirm("¿Desea que hayan datos cargados?");
    if (deseaCargarDatos) {
        datosPrecargados(preguntas);
    }
    // Inicializar el puntaje
    actualizarPuntaje(0);

}



function mostrarDescripcion() {
    document.getElementById("descripciongeneral").style.display = "block";
    document.getElementById("gestion").style.display = "none";
    document.getElementById("partejugarmostrable").style.display = "none";
    document.getElementById("partejugarnomostrar").style.display = "none";
    desbloquearSelectores()
}

function mostrarGestion() {
    document.getElementById("descripciongeneral").style.display = "none";
    document.getElementById("gestion").style.display = "block";
    document.getElementById("partejugarmostrable").style.display = "none";
    document.getElementById("partejugarnomostrar").style.display = "none";
    desbloquearSelectores()
}

function mostrarJugar() {
    document.getElementById("descripciongeneral").style.display = "none";
    document.getElementById("gestion").style.display = "none";
    document.getElementById("partejugarmostrable").style.display = "block";
    document.getElementById("partejugarnomostrar").style.display = "none";
    desbloquearSelectores()
}

// Objeto para almacenar colores por tema


function datosPrecargados(preguntas) {
    let tbody = document.querySelector(".tabla2 tbody");

    temasRegistrados = [];
    limpiarTabla();

    for (let i = 0; i < preguntas.length; i++) {
        let pregunta = preguntas[i];

        if (!temasRegistrados.includes(pregunta.tema.nombre)) {
            temasRegistrados.push(pregunta.tema.nombre);

            // Asignar un color aleatorio único al tema si no está registrado
            if (!coloresPorTema[pregunta.tema.nombre.toLowerCase()]) {
                coloresPorTema[pregunta.tema.nombre.toLowerCase()] = generarColorAleatorio();
            }
        }

        let tr = document.createElement("tr");

        // Asignar clase de tema y color según el tema
        let colorTema = coloresPorTema[pregunta.tema.nombre.toLowerCase()];
        tr.classList.add(`tema-${pregunta.tema.nombre.toLowerCase()}`);
        tr.style.backgroundColor = colorTema;

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
    actualizarSelectTemas2();
    actualizarPromedioPreguntas()
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

function actualizarSelectTemas2(){
    let selectTemas = document.getElementById("IDtema");
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

    datosPrecargados(preguntasOrdenadas);
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
        juegoEnCurso = true;

        document.getElementById("descripciongeneral").style.display = "none";
        document.getElementById("gestion").style.display = "none";
        document.getElementById("partejugarmostrable").style.display = "block";
        document.getElementById("partejugarnomostrar").style.display = "block";

        // Obtener el color del tema seleccionado
        let colorTema = coloresPorTema[temaSeleccionado];

        // Aplicar el color del tema a la pregunta
        let textopregunta = document.getElementById("textopregunta");
        textopregunta.style.backgroundColor = colorTema;

        // Aplicar el color del tema a las respuestas
        let filaBotones = document.querySelector(".fila-botones");
        filaBotones.style.backgroundColor = colorTema;
    } else {
        alert("Por favor seleccione un tema y un nivel antes de jugar.");
    }
}

function mostrarPreguntaSegunSeleccion(temaSeleccionado, nivelSeleccionado) {
    // Filtrar las preguntas por tema y nivel
    let preguntasFiltradas = preguntas.filter(pregunta => 
        pregunta.tema.nombre.toLowerCase() === temaSeleccionado && pregunta.nivel === nivelSeleccionado
    );

    // Filtrar las preguntas que ya se han mostrado
    let preguntasDisponibles = preguntasFiltradas.filter(pregunta => 
        !preguntasMostradas.includes(pregunta.texto)
    );
    // Verificar si hay preguntas disponibles
    if (preguntasDisponibles.length === 0) {
        alert("No hay más preguntas disponibles para este tema y nivel.");
        return;
    }

    // Obtener una pregunta aleatoria de las disponibles
    // Seleccionar una pregunta aleatoria de las disponibles
    let preguntaAleatoria = preguntasDisponibles[Math.floor(Math.random() * preguntasDisponibles.length)];

    // Agregar la pregunta mostrada al array de preguntas mostradas
    preguntasMostradas.push(preguntaAleatoria.texto);

    // Mostrar la pregunta
    let preguntaElement = document.getElementById("textopregunta");
    preguntaElement.textContent = preguntaAleatoria.texto;

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

        // Aplicar el color del tema a las respuestas
        botonRespuesta.style.backgroundColor = coloresPorTema[temaSeleccionado];

        // Agregar evento de click a cada botón de respuesta
        botonRespuesta.addEventListener("click", () => manejarRespuesta(botonRespuesta, respuesta, preguntaAleatoria.respuestaCorrecta));

        filaBotones.appendChild(botonRespuesta);
    });
}

function manejarRespuesta(boton, respuestaSeleccionada, respuestaCorrecta) {
    if (respuestaSeleccionada === respuestaCorrecta) {
        boton.style.backgroundColor = "green";
        reproducirSonido("audio/respuestacorrecta.mp3");

        // Deshabilitar todos los botones después de seleccionar una respuesta correcta
        let botonesRespuestas = document.querySelectorAll(".botonrespuesta");
        botonesRespuestas.forEach((boton) => {
            boton.disabled = true;
        });

        // Sumar puntos por respuesta correcta
        actualizarPuntaje(10);
    } else {
        boton.style.backgroundColor = "red";
        boton.disabled = true; // Deshabilitar solo el botón de respuesta incorrecta seleccionado
        reproducirSonido("audio/respuestaincorrecta.mp3");

        // Restar puntos por respuesta incorrecta
        actualizarPuntaje(-1);
    }
}

function reproducirSonido(nombreArchivo) {
    let audio = new Audio(nombreArchivo);
    audio.play();
}

function mostrarAyuda() {
    // Mostrar un mensaje informativo
    alert("La ayuda es solo para mostrar la primera letra o número de la respuesta correcta. No afecta el estado del juego.");
}

function obtenerRespuestaCorrecta() {
    // Obtener el texto de la respuesta correcta de la pregunta mostrada
    let textoRespuestaCorrecta = "";

    // Buscar la fila de la tabla donde se muestra la pregunta actual
    let tabla = document.querySelector(".tabla2");
    if (tabla) {
        let filas = tabla.querySelectorAll("tbody tr");
        filas.forEach((fila) => {
            if (fila.style.display !== "none") {
                let tdRespuestaCorrecta = fila.querySelector("td:nth-child(4)"); // Cambia el índice según la estructura de tu tabla
                if (tdRespuestaCorrecta) {
                    textoRespuestaCorrecta = tdRespuestaCorrecta.textContent.trim();
                }
            }
        });
    }

    return textoRespuestaCorrecta;
}

function generarColorAleatorio() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    // Convertir a color hexadecimal
    let colorHex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    // Verificar brillo y ajustar si es necesario
    // Convertir a HSL para evaluar el brillo
    let hsl = rgbToHsl(r, g, b);
    
    // Si el color es más claro que el amarillo, lo oscurecemos
    if (hsl[2] > 0.9) {
        return "#FFFF66"; // Amarillo claro
    }

    // Si el color es más oscuro que el marrón, lo aclaramos
    if (hsl[2] < 0.1) {
        return "#663300"; // Marrón oscuro
    }

    return colorHex;
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max == min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h, s, l];
}

function cambiarPregunta() {
    // Verificar si el juego está en curso antes de cambiar la pregunta
    if (juegoEnCurso) {
        let temaSeleccionado = document.getElementById("IDtemaElegir").value;
        let nivelSeleccionado = parseInt(document.getElementById("IDnivelJuego").value);

        if (temaSeleccionado && nivelSeleccionado) {
            temaSeleccionado = temaSeleccionado.toLowerCase();
            mostrarPreguntaSegunSeleccion(temaSeleccionado, nivelSeleccionado);
        }
}
}

function actualizarPuntaje(puntos) {
    puntaje += puntos;
    // Actualizar el puntaje en el elemento HTML correspondiente
    let puntajeElement = document.getElementById("puntaje");
    puntajeElement.textContent = `Puntaje acumulado en esta Partida: ${puntaje}`;
}

function terminarJuego() {
    // Mostrar puntaje acumulado solo si el juego estaba en curso
    if (juegoEnCurso) {
        alert(`Puntaje acumulado en esta partida: ${puntaje}`);

        // Actualizar el puntaje máximo si el puntaje actual es mayor
        if (puntaje > puntajeMaximo) {
            puntajeMaximo = puntaje;
            document.getElementById("puntajemaximo").textContent = `Máximo puntaje obtenido por un jugador: ${puntajeMaximo}`;

            // Guardar el puntaje máximo en localStorage
            localStorage.setItem("puntajeMaximo", puntajeMaximo);
        }

        // Reiniciar la interfaz de juego
        document.getElementById("IDtemaElegir").disabled = false;
        document.getElementById("IDnivelJuego").disabled = false;
        
        // Limpiar las preguntas mostradas y reiniciar estado de juego
        preguntasMostradas = [];
        juegoEnCurso = false;

        // Reiniciar el puntaje
        puntaje = 0;
        document.getElementById("puntaje").textContent = `Puntaje acumulado en esta partida: ${puntaje}`;

        // Actualizar la UI para mostrar la sección de jugar nuevamente si es necesario
        mostrarJugar();
    }
}

function actualizarPromedioPreguntas() {
    let totalPreguntas = preguntas.length;
    let totalTemas = temasRegistrados.length;
    let promedio = totalTemas === 0 ? "sin datos" : (totalPreguntas / totalTemas).toFixed(2);

    let promedioElement = document.getElementById("promedio");
    promedioElement.textContent = `Promedio de preguntas por tema (cantidad total de preguntas/cantidad total de temas): ${promedio}`;
}

function desbloquearSelectores() {
    let tema = document.getElementById("IDtemaElegir");
    let nivel = document.getElementById("IDnivelJuego");
    tema.disabled = false;
    nivel.disabled = false;
    nivel.readOnly = false;
}

function terminarJuegoSiEstaEnCurso() {
    if (juegoEnCurso) {
        terminarJuego();
    }
}

// Función para manejar el evento de envío del formulario
function agregarTemas(event) {
    event.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // Captura de valores del formulario
    const nombre = document.getElementById('IDnombre').value;
    const descripcion = document.getElementById('IDdescripcion').value;

    // Creación de un nuevo tema
    const nuevoTema = new Tema(nombre, descripcion);

    // Verificación de la existencia del tema en el sistema
    if (sistema.estaTema(nuevoTema)) {
        alert('El tema ya existe.');
    } else {
        sistema.agregar(nuevoTema);
        alert('Tema agregado exitosamente.');

        // Actualizar la lista de temas registrados
        temasRegistrados.push(nombre);

        // Asignar un color aleatorio único al tema si no está registrado
        if (!coloresPorTema[nombre.toLowerCase()]) {
            coloresPorTema[nombre.toLowerCase()] = generarColorAleatorio();
        }

        // Actualizar la tabla y los selectores
        actualizarListaTemas();
        actualizarSelectTemas();
        actualizarSelectTemas2();
        actualizarContadorTemas();
        actualizarPromedioPreguntas();
        actualizarTemasSinPreguntas();
    }

    // Limpia los campos del formulario
    document.getElementById('formAltaTemas').reset();
}

function actualizarTemasSinPreguntas() {
    let temasConPreguntas = preguntas.map(pregunta => pregunta.tema.nombre.toLowerCase());
    let temasSinPreguntas = temasRegistrados.filter(tema => !temasConPreguntas.includes(tema.toLowerCase()));

    let listaTemasSinPreguntas = document.getElementById("lista-temas-sin-preguntas");
    listaTemasSinPreguntas.innerHTML = "";

    if (temasSinPreguntas.length === 0) {
        let sinDatos = document.createElement("li");
        sinDatos.textContent = "Sin Datos";
        listaTemasSinPreguntas.appendChild(sinDatos);
    } else {
        temasSinPreguntas.forEach((tema) => {
            let elementoLista = document.createElement("li");
            elementoLista.textContent = tema;
            listaTemasSinPreguntas.appendChild(elementoLista);
        });
    }
}

