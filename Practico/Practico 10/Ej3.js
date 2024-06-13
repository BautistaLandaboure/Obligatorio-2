window.addEventListener("load", inicio);

function inicio() {
    document.getElementById("boton").addEventListener("click", proceso);
}

function proceso() {
    let pal = document.getElementById("IDpalabra").value.toUpperCase();
    let palinvert = palinvertida(pal);
    if (pal === palinvert) {
        alert("Es un palíndromo");
    } else {
        alert("No es un palíndromo");
    }
}

function palinvertida(cadena) {
    var cadenaInvertida = '';
    // Recorrer la cadena desde el final hasta el principio
    for (var i = cadena.length - 1; i >= 0; i--) {
        // Agregar cada carácter al principio de la cadena invertida
        cadenaInvertida += cadena[i];
    }
    return cadenaInvertida;
}

