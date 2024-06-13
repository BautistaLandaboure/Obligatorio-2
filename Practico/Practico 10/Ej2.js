// Definir la función para mostrar el número ingresado y si es par o impar
function mostrarNumero() {
    // Obtener el valor del número ingresado
    var numero = parseInt(document.getElementById("numero").value);
    // Determinar si el número es par o impar
    var esPar = numero % 2 === 0;
    // Crear un elemento de lista para mostrar el número y su estado
    var item = document.createElement("li");
    // Asignar el texto al elemento de lista
    item.textContent = numero + " es " + (esPar ? "par" : "impar");
    // Agregar el elemento de lista al elemento ul
    document.getElementById("idlista").appendChild(item);
}

// Cargar la función 'mostrarNumero' cuando el documento esté completamente cargado
window.addEventListener("load", function() {
    // Agregar un evento de clic al botón 'botonclick' para llamar a la función 'mostrarNumero'
    document.getElementById("botonclick").addEventListener("click", mostrarNumero);
});
