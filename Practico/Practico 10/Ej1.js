// Agregar un evento de carga para ejecutar la función "inicio" después de que se cargue la página
window.addEventListener("load", inicio);

// Definir la función "inicio"
function inicio() {
    // No es necesario agregar eventos de cambio aquí
}

// Definir la función "suma" para calcular la suma de los dos números
function suma() {
    // Obtener los valores de los campos "IDnumero1" e "IDnumero2" y convertirlos a números
    let numero1 = parseFloat(document.getElementById("IDnumero1").value);
    let numero2 = parseFloat(document.getElementById("IDnumero2").value);
    // Retornar la suma de los dos números
    return numero1 + numero2;
}

// Definir la función "producto" para calcular el producto de los dos números
function producto() {
    // Obtener los valores de los campos "IDnumero1" e "IDnumero2" y convertirlos a números
    let numero1 = parseFloat(document.getElementById("IDnumero1").value);
    let numero2 = parseFloat(document.getElementById("IDnumero2").value);
    // Retornar el producto de los dos números
    return numero1 * numero2;
}

// Definir la función "mostrar" para mostrar el resultado de la suma en el campo de entrada "resultado"
function mostrar() {
    // Obtener el campo de entrada "resultado" y establecer su valor como la suma de los números
    document.getElementById("resultado").value = suma();
}

// Definir la función "mostrarp" para mostrar el resultado del producto en el campo de entrada "resultado"
function mostrarp() {
    // Obtener el campo de entrada "resultado" y establecer su valor como el producto de los números
    document.getElementById("producto").value = producto();
}

// Agregar un evento de clic al botón "suma" para llamar a la función "mostrar" cuando se haga clic en él
document.getElementById("suma").addEventListener("click", mostrar);

// Agregar un evento de clic al botón "mproducto" para llamar a la función "mostrarp" cuando se haga clic en él
document.getElementById("mproducto").addEventListener("click", mostrarp);
