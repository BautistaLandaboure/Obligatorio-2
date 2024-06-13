let agenda = new Agenda();
window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("IdBotonAgregar").addEventListener("click", agregarContacto);
    document.getElementById("IdBotonJovenes").addEventListener("click", consultarjovenes);
    document.getElementById("IDbotoneliminar").addEventListener("click", eliminar);
}

function consultarjovenes() {
    cargartabla();
}

function agregarContacto() {
    let miForm = document.getElementById("IdFormulario");
    if (miForm.reportValidity()) {
        let nombre = document.getElementById("IdNombre").value;
        let apellido = document.getElementById("IdApellido").value;
        let edad = document.getElementById("IdEdad").value;
        let telefono = document.getElementById("IdTelefono").value;

        if (!agenda.estaTelefono(telefono)) {
            agenda.agregar(new Contacto(nombre, apellido, edad, telefono));
            miForm.reset();
            actualizar();
            alert("El promedio de edad es " + agenda.promedio());
        } else {
            alert("Teléfono repetido");
        }
    }
}

function actualizar() {
    cargarLista();
    limpiartabla();
    cargarcombo();
}

function limpiartabla() {
    document.getElementById("IdTablaJovenes").innerHTML = "";
}

function cargarLista() {
    let lista = document.getElementById("IdLista");
    lista.innerHTML = "";
    let datos = agenda.darTodos();
    for (let elem of datos) {
        let nodo = document.createElement("li");
        let nodoT = document.createTextNode(elem.toString());
        nodo.appendChild(nodoT);
        lista.appendChild(nodo);
    }
}

function cargartabla() {
    limpiartabla();
    let datos = agenda.DarJovenes();
    let tabla = document.getElementById("IdTablaJovenes");
    if (datos.length === 0) {
        tabla.innerHTML = "Sin datos";
    } else {
        let cabezal = tabla.createTHead();
        let filaTit = cabezal.insertRow();
        let celdaTit1 = filaTit.insertCell();
        celdaTit1.innerHTML = "Nombre";
        let celdaTit2 = filaTit.insertCell();
        celdaTit2.innerHTML = "Apellido";
        let celdaTit3 = filaTit.insertCell();
        celdaTit3.innerHTML = "Telefono";
        for (let elem of datos) {
            let fila = tabla.insertRow();
            let celda1 = fila.insertCell();
            celda1.innerHTML = elem.nombre;
            let celda2 = fila.insertCell();
            celda2.innerHTML = elem.apellido;
            let celda3 = fila.insertCell();
            celda3.innerHTML = elem.telefono;
        }
    }
}

function cargarCombo(){
	let combito = document.getElementById("idComboContactos");
	combito.innerHTML = ""; // vacio
	let datos= agenda.darTodos();
	for (let elemento of datos){
		let nodoC = document.createElement("option");
		let nodoTextoC = document.createTextNode(elemento);
		nodoC.appendChild(nodoTextoC);
		combito.appendChild(nodoC);
	}
}
function eliminar(){
	let elegido = document.getElementById("idComboContactos").selectedIndex;  // asumo no hay reorden
	agenda.eliminar(elegido);
	actualizar();
}

