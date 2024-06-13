
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

// Función para mostrar la sección de descripción
function mostrarDescripcion() {
  document.getElementById("descripciongeneral").style.display = "block";
  document.getElementById("gestion").style.display = "none";
  document.getElementById("partejugarmostrable").style.display = "none";
  document.getElementById("partejugarnomostrar").style.display = "none";
}

// Función para mostrar la sección de gestión
function mostrarGestion() {
  document.getElementById("descripciongeneral").style.display = "none";
  document.getElementById("gestion").style.display = "block";
  document.getElementById("partejugarmostrable").style.display = "none";
  document.getElementById("partejugarnomostrar").style.display = "none";
}

// Función para mostrar la sección de jugar
function mostrarJugar() {
    document.getElementById("descripciongeneral").style.display = "none";
    document.getElementById("gestion").style.display = "none";
    document.getElementById("partejugarmostrable").style.display = "block";
    document.getElementById("partejugarnomostrar").style.display = "none";
}

// Función para agregar datos
function agregarDatos(preguntas) {
  let tbody = document.querySelector(".tabla2 tbody");

  // Limpiar el array de temas registrados antes de agregar nuevos datos
  temasRegistrados = [];

  // Limpiar la tabla antes de agregar nuevas filas
  limpiarTabla();

  for (let i = 0; i < preguntas.length; i++) {
    let pregunta = preguntas[i];

    // Verificar si el tema ya está registrado en temasRegistrados
    if (!temasRegistrados.includes(pregunta.tema.nombre)) {
      temasRegistrados.push(pregunta.tema.nombre);
    }

    let tr = document.createElement("tr");

    // Añadir clases para el color según el tema
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
    tdRespuestasIncorrectas.innerHTML =
      pregunta.respuestasIncorrectas.join(", ");
    tr.appendChild(tdRespuestasIncorrectas);

    tbody.appendChild(tr);
  }

  // Actualizar elementos relacionados con temas y preguntas
  actualizarContadorPreguntas();
  actualizarContadorTemas();
  actualizarListaTemas();
  actualizarPromedioPreguntasPorTema();
  actualizarSelectTemas(); // Nueva función para actualizar el select de temas

}

// Función para limpiar la tabla de preguntas
function limpiarTabla() {
  let tbody = document.querySelector(".tabla2 tbody");
  tbody.innerHTML = ""; // Limpiar el contenido de la tabla
}

// Función para actualizar el contador de preguntas registradas
function actualizarContadorPreguntas() {
  let tbody = document.querySelector(".tabla2 tbody");
  let filasVisibles = tbody.querySelectorAll("tr"); // Seleccionar todas las filas en el tbody

  // Filtrar las filas visibles (aquí puedes añadir lógica adicional si las filas tienen una clase o atributo específico para visibilidad)
  let contadorPreguntasVisibles = 0;
  filasVisibles.forEach((fila) => {
    if (fila.style.display !== "none") {
      // Verificar si la fila está visible
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

  // Limpiar la lista actual
  listaTemas.innerHTML = "";

  // Verificar si hay temas registrados para agregar a la lista
  if (temasRegistrados.length === 0) {
    let sinDatos = document.createElement("li");
    sinDatos.textContent = "Sin Datos";
    listaTemas.appendChild(sinDatos);
  } else {
    // Iterar sobre temasRegistrados y crear un <li> para cada tema
    temasRegistrados.forEach((tema) => {
      let elementoLista = document.createElement("li");
      elementoLista.textContent = tema;
      listaTemas.appendChild(elementoLista);
    });
  }
}

// Función para actualizar el select de temas
function actualizarSelectTemas() {
  let selectTemas = document.getElementById("IDtemaElegir");

  // Limpiar las opciones actuales
  selectTemas.innerHTML =
    '<option value="" disabled selected hidden>Elija una opción</option>';

  // Agregar nuevas opciones basadas en los temas registrados
  temasRegistrados.forEach((tema) => {
    let opcion = document.createElement("option");
    opcion.value = tema.toLowerCase();
    opcion.textContent = tema;
    selectTemas.appendChild(opcion);
  });
}

// Función para ordenar las preguntas
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

function actualizarPromedioPreguntasPorTema() {
  let cantidadPreguntas = preguntas.length;
  let cantidadTemas = temasRegistrados.length; // Utilizar el array de temas registrados

  // Verificar si hay al menos un tema registrado para evitar división por cero
  if (cantidadTemas > 0) {
    let promedio = cantidadPreguntas / cantidadTemas;
    let promedioFormateado = promedio.toFixed(2); // Formatear el promedio a dos decimales
    let elementoP = document.getElementById("promedio");

    elementoP.textContent = `Promedio de preguntas por tema (${cantidadPreguntas} / ${cantidadTemas}): ${promedioFormateado}`;
  } else {
    let elementoP = document.getElementById("promedio");
    elementoP.textContent = "Promedio de preguntas por tema: sin datos";
  }
}
function generarColor(temaNombre) {
  let hash = 0;
  for (let i = 0; i < temaNombre.length; i++) {
      hash = temaNombre.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Asegurar que los valores de RGB estén dentro de los límites deseados
  let r = (hash % 128) + 128; // R entre 128 y 255 (evita colores muy oscuros)
  let g = (hash % 128) + 128; // G entre 128 y 255 (evita colores muy oscuros)
  let b = (hash % 128) + 128; // B entre 128 y 255 (evita colores muy oscuros)

  return `rgb(${r}, ${g}, ${b})`;
}
  function agregarUnNuevoTema() { 
    let sistema = new Sistema();
    let miForm = document.getElementById("formAltaTemas");
    if (miForm.reportValidity()){
        let tema = document.getElementById("IDnombre").value;
        let descripcion = document.getElementById("IDdescripcion").value;
        if (!sistema.estaTema(tema)){
          sistema.agregar( new Tema(tema, descripcion));
          miForm.reset();
          alert("el tema se agrego");

        }
    }
  }

  function Jugar(){
      event.preventDefault();
      document.getElementById("descripciongeneral").style.display = "none";
      document.getElementById("gestion").style.display = "none";
      document.getElementById("partejugarmostrable").style.display = "block";
      document.getElementById("partejugarnomostrar").style.display = "block";
  

      let temaSeleccionado = document.getElementById("IDtemaElegir").value;
      let nivelSeleccionado = parseInt(document.getElementById("IDnivelElegir").value);
    
      // Filtrar la pregunta basada en el tema y el nivel seleccionados
      let preguntaSeleccionada = preguntas.find(pregunta => 
        pregunta.tema.toLowerCase() === temaSeleccionado &&
        pregunta.nivel === nivelSeleccionado
      );
    
      // Actualizar el texto de la pregunta
      if (preguntaSeleccionada) {
        document.getElementById("textopregunta").innerHTML = preguntaSeleccionada.texto;
      } else {
        document.getElementById("textopregunta").innerHTML = "No hay preguntas disponibles para esta selección.";
      }
    }
    
    document.getElementById("IDtemaElegir").addEventListener("change", actualizarTextoPregunta);
    document.getElementById("IDnivelElegir").addEventListener("change", actualizarTextoPregunta);