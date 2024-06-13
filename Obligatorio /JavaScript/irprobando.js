
let sistema = new Sistema();

window.addEventListener("load", inicio);

function inicio() {
  mostrarDescripcion();
  document.getElementById("linkDescripcion").addEventListener("click", mostrarDescripcion);
  document.getElementById("linkGestion").addEventListener("click", mostrarGestion);
  document.getElementById("linkJugar").addEventListener("click", mostrarJugar);
  document.getElementById("botonAgregarTema").addEventListener("click", agregarTemas);
  document.getElementById("formAltaPregunta").addEventListener("submit", agregarPreguntas);
  document.getElementById("configuracion-juego").addEventListener("submit", iniciarJuego);

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
  actualizarTemasEnJuego();
}

function inicializarDatosPrueba() {
  preguntas.forEach(pregunta => {
    if (!sistema.estaTema(pregunta.tema)) {
      sistema.agregar(new Tema(pregunta.tema.nombre, pregunta.tema.descripcion));
    }
    sistema.listaPreguntas.push(pregunta);
  });
}

function agregarTemas(event) {
  event.preventDefault();
  const nombre = document.getElementById("IDnombre").value;
  const descripcion = document.getElementById("IDdescripcion").value;
  
  if (nombre && descripcion) {
    const tema = new Tema(nombre, descripcion);
    if (!sistema.estaTema(tema)) {
      sistema.agregar(tema);
      actualizarListaTemas();
      actualizarContadores();
      alert("Tema agregado correctamente.");
    } else {
      alert("El tema ya existe.");
    }
  } else {
    alert("Por favor, complete todos los campos.");
  }
}

function agregarPreguntas(event) {
  event.preventDefault();
  const temaSeleccionado = document.getElementById("IDtema").value;
  const nivel = parseInt(document.getElementById("IDnivel").value);
  const textoPregunta = document.getElementById("IDtextopregunta").value;
  const respuestaCorrecta = document.getElementById("IDrespcorrecta").value;
  const respuestasIncorrectas = document.getElementById("IDrespincorrecta").value.split(",");

  const tema = sistema.listaTemas.find(t => t.nombre === temaSeleccionado);

  if (tema && nivel && textoPregunta && respuestaCorrecta && respuestasIncorrectas.length) {
    const pregunta = new Pregunta(textoPregunta, respuestaCorrecta, respuestasIncorrectas, nivel, tema);
    sistema.listaPreguntas.push(pregunta);
    actualizarContadores();
    alert("Pregunta agregada correctamente.");
  } else {
    alert("Por favor, complete todos los campos correctamente.");
  }
}

function actualizarListaTemas() {
  const listaTemasElement = document.getElementById("lista-temas");
  listaTemasElement.innerHTML = '';

  if (sistema.listaTemas.length === 0) {
    listaTemasElement.innerHTML = '<li>Sin Datos</li>';
  } else {
    sistema.listaTemas.forEach(tema => {
      const li = document.createElement("li");
      li.textContent = `${tema.nombre}: ${tema.descripcion}`;
      listaTemasElement.appendChild(li);
    });
  }
}

function actualizarContadores() {
  const totalTemasElement = document.getElementById("total-temas");
  const contadorPreguntasElement = document.getElementById("contador-preguntas");
  const promedioElement = document.getElementById("promedio");

  const totalTemas = sistema.listaTemas.length;
  const totalPreguntas = sistema.listaPreguntas.length;
  const promedioPreguntas = totalTemas ? (totalPreguntas / totalTemas).toFixed(2) : "sin datos";

  totalTemasElement.textContent = `Lista de temas (total de temas: ${totalTemas})`;
  contadorPreguntasElement.textContent = `Total de preguntas registradas: ${totalPreguntas} preguntas`;
  promedioElement.textContent = `Promedio de preguntas por tema (cantidad total de preguntas/cantidad total de temas): ${promedioPreguntas}`;
}

function actualizarTemasEnJuego() {
  const temaJuegoElement = document.getElementById("IDtemaElegir");
  temaJuegoElement.innerHTML = '';

  sistema.listaTemas.forEach(tema => {
    const option = document.createElement("option");
    option.value = tema.nombre;
    option.textContent = tema.nombre;
    temaJuegoElement.appendChild(option);
  });
}

function iniciarJuego(event) {
  event.preventDefault();
  const temaSeleccionado = document.getElementById("IDtemaElegir").value;
  const nivelSeleccionado = parseInt(document.getElementById("nivel").value);

  if (temaSeleccionado && nivelSeleccionado) {
    const preguntasFiltradas = sistema.listaPreguntas.filter(
      pregunta => pregunta.tema.nombre === temaSeleccionado && pregunta.nivel === nivelSeleccionado
    );

    if (preguntasFiltradas.length > 0) {
      mostrarPregunta(preguntasFiltradas);
    } else {
      alert("No hay preguntas disponibles para el tema y nivel seleccionados.");
    }
  } else {
    alert("Por favor, complete todos los campos.");
  }
}

function mostrarPregunta(preguntas) {
  const preguntaActual = preguntas[Math.floor(Math.random() * preguntas.length)];
  const respuestas = [...preguntaActual.respuestasIncorrectas, preguntaActual.respuestaCorrecta];
  respuestas.sort(() => Math.random() - 0.5);

  document.getElementById("partejugarmostrable").style.display = "none";
  document.getElementById("partejugarnomostrar").style.display = "block";
  document.getElementById("textopregunta").textContent = preguntaActual.texto;

  const botonesRespuesta = document.querySelectorAll(".botonrespuesta");
  botonesRespuesta.forEach((boton, index) => {
    boton.textContent = respuestas[index];
    boton.onclick = () => validarRespuesta(preguntaActual, boton.textContent);
  });
}

function validarRespuesta(pregunta, respuestaSeleccionada) {
  if (respuestaSeleccionada === pregunta.respuestaCorrecta) {
    alert("¡Respuesta correcta!");
  } else {
    alert("Respuesta incorrecta.");
  }
  mostrarJugar();
}