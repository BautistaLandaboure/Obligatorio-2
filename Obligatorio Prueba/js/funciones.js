// creado por Bautista Landaboure (316326)

window.addEventListener("load", inicio);

let sistema = new Sistema();
let juegoEnCurso = false;
let puntajeMaximo = 0;
let preguntasMostradas = [];
let puntaje = 0;
let coloresPorTema = {};
let temasRegistrados = [];

function inicio() {

  mostrarDescripcion();

  document.getElementById("linkDescripcion").addEventListener("click", function () {
      terminarJuegoSiEstaEnCurso();
      mostrarDescripcion();
    });

  document.getElementById("linkGestion").addEventListener("click", function () {
    terminarJuegoSiEstaEnCurso();
    mostrarGestion();
  });

  document.getElementById("linkJugar").addEventListener("click", function () {
    terminarJuegoSiEstaEnCurso();
    mostrarJugar();
  });

  document.getElementById("botonaJugar").addEventListener("click", Jugar);

  document.getElementById("botonAyuda").addEventListener("click", mostrarAyuda);

  document.getElementById("IDopcioncreciente").addEventListener("click", function () {
      ordenarPreguntas("creciente");
    });

  document.getElementById("IDopciondecreciente").addEventListener("click", function () {
      ordenarPreguntas("decreciente");
    });

  document.getElementById("botonSiguientePregunta").addEventListener("click", cambiarPregunta);

  document.getElementById("botonTerminar").addEventListener("click", terminarJuego);

  document.getElementById("formAltaTemas").onsubmit = agregarTemas;

  document.getElementById("formAltaPregunta").onsubmit = agregarPreguntas;

  let deseaCargarDatos = confirm("¿Desea que hayan datos cargados?");

  if (deseaCargarDatos) {
    datosPrecargados(preguntas);
  }

  actualizarPuntaje(0);
}

function mostrarDescripcion() {
  document.getElementById("descripciongeneral").style.display = "block";
  document.getElementById("gestion").style.display = "none";
  document.getElementById("partejugarmostrable").style.display = "none";
  document.getElementById("partejugarnomostrar").style.display = "none";
  desbloquearSelectores();
}

function mostrarGestion() {
  document.getElementById("descripciongeneral").style.display = "none";
  document.getElementById("gestion").style.display = "block";
  document.getElementById("partejugarmostrable").style.display = "none";
  document.getElementById("partejugarnomostrar").style.display = "none";
  desbloquearSelectores();
}

function mostrarJugar() {
  document.getElementById("descripciongeneral").style.display = "none";
  document.getElementById("gestion").style.display = "none";
  document.getElementById("partejugarmostrable").style.display = "block";
  document.getElementById("partejugarnomostrar").style.display = "none";
  desbloquearSelectores();
}

function generarColorAleatorio() {
 
  let r = Math.floor(Math.random() * 56 + 150);
  let g = Math.floor(Math.random() * 101 + 50); 
  let b = Math.floor(Math.random() * 56); 

 
  let color = 'rgb(' + r + ', ' + g + ', ' + b + ')';

  return color;
}

function datosPrecargados(preguntas) {
    temasRegistrados = [];
    limpiarTabla();
  
    for (let i = 0; i < preguntas.length; i++) {
      let pregunta = preguntas[i];
      sistema.agregarPregunta(pregunta);
      agregarFilaPregunta(pregunta);
    }
  
    actualizarContadorPreguntas();
    actualizarContadorTemas();
    actualizarListaTemas();
    actualizarSelectTemas();
    actualizarSelectTemas2();
    actualizarPromedioPreguntas();
  }

  function agregarTemas(event) {
    event.preventDefault();
  
 
    let nombre = document.getElementById("IDnombre").value.toLowerCase();
    let descripcion = document.getElementById("IDdescripcion").value;
  
   
    if (temasRegistrados.includes(nombre)) {
      alert("El tema ya existe.");
    } else {
     
      let nuevoTema = new Tema(nombre, descripcion);
      sistema.agregarTema(nuevoTema);
  
    
      temasRegistrados.push(nombre);
  
     
      if (!coloresPorTema[nombre]) {
        coloresPorTema[nombre] = generarColorAleatorio();
      }
  
   
      actualizarListaTemas();
      actualizarSelectTemas();
      actualizarSelectTemas2();
      actualizarContadorTemas();
      actualizarPromedioPreguntas();
      actualizarTemasSinPreguntas();
    }
  
   
    document.getElementById("formAltaTemas").reset();
  }
  
  
  

  function limpiarTabla() {
    let tbody = document.getElementById("tabla2-tbody");
    tbody.innerHTML = "";
  }
  
  function agregarFilaPregunta(pregunta) {
    let tbody = document.getElementById("tabla2-tbody");

  if (!temasRegistrados.includes(pregunta.tema.nombre.toLowerCase())) {
    temasRegistrados.push(pregunta.tema.nombre.toLowerCase());

    if (!coloresPorTema[pregunta.tema.nombre.toLowerCase()]) {
      coloresPorTema[pregunta.tema.nombre.toLowerCase()] =
        generarColorAleatorio();
    }
  }

  let tr = document.createElement("tr");
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

function actualizarContadorTemas() {
    let contadorTemas = document.getElementById("total-temas");
    contadorTemas.innerHTML = "Total de temas registrados:"  + temasRegistrados.length;
  }

  function actualizarListaTemas() {
    let listaTemas = document.getElementById("lista-temas");
  
    listaTemas.innerHTML = "";
  
    if (temasRegistrados.length === 0) {
      let sinDatos = document.createElement("li");
      sinDatos.innerHTML = "Sin Datos";
      listaTemas.appendChild(sinDatos);
    } else {
      for (let i = 0; i < temasRegistrados.length; i++) {
        let tema = temasRegistrados[i];
        let elementoLista = document.createElement("li");
        elementoLista.innerHTML = tema;
        listaTemas.appendChild(elementoLista);
      }
    }
  }

  function actualizarPromedioPreguntas() {
  
    let preguntasEnSistema = [];
    for (let i = 0; i < preguntas.length; i++) {
      if (sistema.listaPreguntas.includes(preguntas[i])) {
        preguntasEnSistema.push(preguntas[i]);
      }
    }
  
    let totalPreguntas = preguntasEnSistema.length;
    let totalTemas = temasRegistrados.length;
    let promedio = totalTemas === 0 ? "sin datos" : (totalPreguntas / totalTemas).toFixed(2);
    
    let promedioElement = document.getElementById("promedio");
    promedioElement.innerHTML = "Promedio de preguntas por tema (cantidad total de preguntas/cantidad total de temas):" + promedio;
  }

  function actualizarTemasSinPreguntas() {
    let temasConPreguntas = [];
    for (let i = 0; i < preguntas.length; i++) {
      temasConPreguntas.push(preguntas[i].tema.nombre.toLowerCase());
    }
  
    let temasSinPreguntas = [];
    for (let j = 0; j < temasRegistrados.length; j++) {
      let temaRegistrado = temasRegistrados[j].toLowerCase();
      if (!temasConPreguntas.includes(temaRegistrado)) {
        temasSinPreguntas.push(temaRegistrado);
      }
    }
  
    let listaTemasSinPreguntas = document.getElementById("lista-temas-sin-preguntas");
    listaTemasSinPreguntas.innerHTML = "";
  
    if (temasSinPreguntas.length === 0) {
      let sinDatos = document.createElement("li");
      sinDatos.textContent = "Sin Datos";
      listaTemasSinPreguntas.appendChild(sinDatos);
    } else {
      for (let k = 0; k < temasSinPreguntas.length; k++) {
        let elementoLista = document.createElement("li");
        elementoLista.textContent = temasSinPreguntas[k];
        listaTemasSinPreguntas.appendChild(elementoLista);
      }
    }
  }
  

  function agregarPreguntas(event) {
    event.preventDefault();
  
    let tema = document.getElementById("IDtema").value.toLowerCase();
    let nivel = parseInt(document.getElementById("IDnivel").value);
    let textoPregunta = document.getElementById("IDtextopregunta").value;
    let respuestaCorrecta = document.getElementById("IDrespcorrecta").value.trim();
    let respuestasIncorrectas = document.getElementById("IDrespincorrecta").value.split(",");
  
   
    for (let i = 0; i < respuestasIncorrectas.length; i++) {
      respuestasIncorrectas[i] = respuestasIncorrectas[i].trim();
    }
  
    if (respuestasIncorrectas.indexOf(respuestaCorrecta) !== -1) {
      alert(
        "La respuesta correcta no puede ser igual a ninguna de las respuestas incorrectas."
      );
      return;
    }
  
    let nuevaPregunta = new Pregunta(textoPregunta, respuestaCorrecta, respuestasIncorrectas, nivel, { nombre: tema });
  
    if (!sistema.agregarPregunta(nuevaPregunta)) {
      alert("Esta pregunta ya existe.");
    } else {
      preguntas.push(nuevaPregunta);
  
      agregarFilaPregunta(nuevaPregunta);
      actualizarTemasSinPreguntas(preguntas);
      actualizarContadorPreguntas();
      actualizarContadorTemas();
      actualizarPromedioPreguntas();
    }
  
    event.target.reset();
  }

  function actualizarSelectTemas() {
    let selectTemas = document.getElementById("IDtemaElegir");
    selectTemas.innerHTML =
      '<option value="" disabled selected hidden>Elija una opción</option>';
  
    for (let i = 0; i < temasRegistrados.length; i++) {
      let tema = temasRegistrados[i];
      let opcion = document.createElement("option");
      opcion.value = tema.toLowerCase();
      opcion.innerHTML = tema;
      selectTemas.appendChild(opcion);
    }
  }
  
  function actualizarSelectTemas2() {
    let selectTemas = document.getElementById("IDtema");
    selectTemas.innerHTML =
      '<option value="" disabled selected hidden>Elija una opción</option>';
  
    for (let i = 0; i < temasRegistrados.length; i++) {
      let tema = temasRegistrados[i];
      let opcion = document.createElement("option");
      opcion.value = tema.toLowerCase();
      opcion.innerHTML = tema;
      selectTemas.appendChild(opcion);
    }
  }


function actualizarContadorPreguntas() {
    let tbody = document.getElementById("tabla2-tbody");
    let filasVisibles = tbody.querySelectorAll("tr");
  
    let contadorPreguntasVisibles = 0;
    for (let i = 0; i < filasVisibles.length; i++) {
      let fila = filasVisibles[i];
      if (fila.style.display !== "none") {
        contadorPreguntasVisibles++;
      }
    }
  
    let contador = document.getElementById("contador-preguntas");
    contador.innerHTML =
      "Total de preguntas registradas: " +
      contadorPreguntasVisibles +
      " preguntas";
  }

  function ordenarPreguntas(tipoOrden) {
    let preguntasOrdenadas = sistema.listaPreguntas.slice();
  
    if (tipoOrden === "creciente") {
      preguntasOrdenadas.sort(function(a, b) {
        if (a.tema.nombre < b.tema.nombre) {
          return -1;
        }
        if (a.tema.nombre > b.tema.nombre) {
          return 1;
        }
        return a.nivel - b.nivel;
      });
    } else if (tipoOrden === "decreciente") {
      preguntasOrdenadas.sort(function(a, b) {
        if (a.tema.nombre > b.tema.nombre) {
          return -1;
        }
        if (a.tema.nombre < b.tema.nombre) {
          return 1;
        }
        return b.nivel - a.nivel;
      });
    }
  
    datosPrecargados(preguntasOrdenadas);
  }

  function Jugar(event) {
    event.preventDefault();
    preguntasMostradas = [];
  
    let temaSeleccionado = document.getElementById("IDtemaElegir").value.toLowerCase();
    let nivelSeleccionado = parseInt(document.getElementById("IDnivelJuego").value );
  
    if (temaSeleccionado && nivelSeleccionado) {
      temaSeleccionado = temaSeleccionado.toLowerCase();
  
     
      let preguntasFiltradas = [];
      for (let i = 0; i < preguntas.length; i++) {
        let pregunta = preguntas[i];
        if (
          pregunta.tema.nombre.toLowerCase() === temaSeleccionado && pregunta.nivel === nivelSeleccionado) {
          preguntasFiltradas.push(pregunta);
        }
      }
      
      if (preguntasFiltradas.length === 0) {
        alert(
          "No hay preguntas disponibles para el tema y nivel seleccionados. Seleccione otro tema o nivel."
        );
        return; 
      }
  
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
  
    
      let colorTema = coloresPorTema[temaSeleccionado];
  
     
      let textopregunta = document.getElementById("textopregunta");
      textopregunta.style.backgroundColor = colorTema;
  
     
      let filaBotones = document.querySelector(".fila-botones");
      filaBotones.style.backgroundColor = colorTema;
    }
  }

  function mostrarPreguntaSegunSeleccion(temaSeleccionado, nivelSeleccionado) {
  
    let preguntasFiltradas = [];
    for (let i = 0; i < preguntas.length; i++) {
        let pregunta = preguntas[i];
        if (
            pregunta.tema.nombre.toLowerCase() === temaSeleccionado &&
            pregunta.nivel === nivelSeleccionado
        ) {
         
            if (!preguntasMostradas.includes(pregunta.texto)) {
                preguntasFiltradas.push(pregunta);
            }
        }
    }
 
  
    if (preguntasFiltradas.length === 0) {
        alert("No hay más preguntas disponibles para este tema y nivel.");
        terminarJuego();
        return;
    }
 
   
    let preguntaAleatoriaEncontrada = false;
    let preguntaAleatoria;
    
    while (!preguntaAleatoriaEncontrada) {
      preguntaAleatoria = preguntasFiltradas[Math.floor(Math.random() * preguntasFiltradas.length)];
    
      if (!preguntasMostradas.includes(preguntaAleatoria.texto)) {
        preguntaAleatoriaEncontrada = true;
      }
    }
    
  
    let preguntaElement = document.getElementById("textopregunta");
    preguntaElement.innerHTML = preguntaAleatoria.texto;
 
   
    let filaBotones = document.querySelector(".fila-botones");
    filaBotones.innerHTML = "";
 
   
    let respuestasIncorrectas = preguntaAleatoria.respuestasIncorrectas.slice();

    
    if (!respuestasIncorrectas.includes(preguntaAleatoria.respuestaCorrecta)) {
        respuestasIncorrectas.push(preguntaAleatoria.respuestaCorrecta); 
    }
    respuestasIncorrectas.sort(function() {
        return Math.random() - 0.5;
    });
 
   
    for (let j = 0; j < respuestasIncorrectas.length; j++) {
        let respuesta = respuestasIncorrectas[j];
        let botonRespuesta = document.createElement("button");
        botonRespuesta.className = "botonrespuesta";
        botonRespuesta.innerHTML = respuesta;
 
      
        botonRespuesta.style.backgroundColor = coloresPorTema[temaSeleccionado];
 
       
        botonRespuesta.addEventListener("click", function () {
            manejarRespuesta(botonRespuesta, respuesta, preguntaAleatoria.respuestaCorrecta);
        });
 
        filaBotones.appendChild(botonRespuesta);
    }
 
 
    preguntasMostradas.push(preguntaAleatoria.texto);
}


  

 function obtenerRespuestaCorrecta() {
    let textoRespuestaCorrecta = "";
  
   
    let preguntaElement = document.getElementById("textopregunta");
    let preguntaTexto = preguntaElement.innerHTML.trim();
  
   
    for (let i = 0; i < preguntas.length; i++) {
      if (preguntas[i].texto === preguntaTexto) {
        textoRespuestaCorrecta = preguntas[i].respuestaCorrecta;
        break; 
      }
    }
  
    return textoRespuestaCorrecta;
  }
  
  function manejarRespuesta(boton, respuestaSeleccionada, respuestaCorrecta) {
    if (respuestaSeleccionada === respuestaCorrecta) {
      boton.style.backgroundColor = "green";
      reproducirSonido("audio/respuestacorrecta.mp3");
      deshabilitarBotonesRespuestas();
      actualizarPuntaje(10);
    } else {
      boton.style.backgroundColor = "red";
      boton.disabled = true;
      reproducirSonido("audio/respuestaincorrecta.mp3");
      actualizarPuntaje(-1);
    }
  }
  
  function deshabilitarBotonesRespuestas() {
    let botonesRespuestas = document.querySelectorAll(".botonrespuesta");
    for (let i = 0; i < botonesRespuestas.length; i++) {
      botonesRespuestas[i].disabled = true;
    }
  }

  function mostrarAyuda() {
   
    let respuestaCorrecta = obtenerRespuestaCorrecta();
  
    if (respuestaCorrecta) {
    
      let primerCaracter = respuestaCorrecta.charAt(0);
  
      
      alert(
        "La primera letra o número de la respuesta correcta es:" + primerCaracter
      );
    }
  }




  function cambiarPregunta() {
 
    if (juegoEnCurso) {
      let temaSeleccionado = document.getElementById("IDtemaElegir").value;
      let nivelSeleccionado = parseInt(document.getElementById("IDnivelJuego").value);
  
      if (temaSeleccionado && nivelSeleccionado) {
        temaSeleccionado = temaSeleccionado.toLowerCase();
        mostrarPreguntaSegunSeleccion(temaSeleccionado, nivelSeleccionado);
      }
    }
  }

  function reproducirSonido(nombreArchivo) {
    let audio = new Audio(nombreArchivo);
    audio.play();
  }

  function actualizarPuntaje(puntos) {
    puntaje += puntos;
  
    let puntajeElement = document.getElementById("puntaje");
    puntajeElement.innerHTML = "Puntaje acumulado en esta Partida:" + puntaje;
  }

  function terminarJuegoSiEstaEnCurso() {
    if (juegoEnCurso) {
      terminarJuego();
    }
  }


function cambiarASeccion(seccion) {
  
    if (juegoEnCurso) {
      terminarJuego();
    }
  
   
    if (seccion === "descripcion") {
      mostrarDescripcion();
    } else if (seccion === "gestion") {
      mostrarGestion();
    }
  }
  
  function terminarJuego() {
    preguntasMostradas = [];
    
    if (juegoEnCurso) {
      alert("Puntaje acumulado en esta partida:" + puntaje);
  
  
      if (puntaje > puntajeMaximo) {
        puntajeMaximo = puntaje;
        document.getElementById(
          "puntajemaximo"
        ).innerHTML = "Máximo puntaje obtenido por un jugador:" + puntajeMaximo;
  
       
      }
  
   
      document.getElementById("IDtemaElegir").disabled = false;
      document.getElementById("IDnivelJuego").disabled = false;
  
      preguntasMostradas = [];
      juegoEnCurso = false;
  
    
      puntaje = 0;
      document.getElementById(
        "puntaje"
      ).innerHTML = "Puntaje acumulado en esta partida:" + puntaje;
  
     
      mostrarJugar();
    }
  }

  function desbloquearSelectores() {
    let tema = document.getElementById("IDtemaElegir");
    let nivel = document.getElementById("IDnivelJuego");
    tema.disabled = false;
    nivel.disabled = false;
    nivel.readOnly = false;
  }

  
  

