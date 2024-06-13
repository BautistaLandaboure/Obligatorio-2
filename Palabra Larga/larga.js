window.addEventListener("load" , inicio);

function inicio(){
    document.getElementById("IDboton").addEventListener("click" , proceso);
    document.getElementById("IDcombo").addEventListener("change" , seleccion); /* para el obl te muestra la opcion que elegiste*/
    document.getElementById("IdEnLista").addEventListener("click" , mostrar);
    document.getElementById("IdEnTabla").addEventListener("click" , mostrar); /* para el obl para ocultar paginas*/
}

function seleccion(){
    alert(document.getElementById("IDcombo").value); 
}

function proceso(){
    let pal = document.getElementById("IDpalabra").value;
    let res = pal;
    if(pal.length > 10){
        res = res + " es larga ";
        cargarLista(res);   
        cargarTabla(res);
        cargarCombo(res);
    }
    else{
        res = res + " no es larga ";
    }
    document.getElementById("IDresultado").innerHTML = res;
    mostrar();
}

function mostrar(){
    let selec = document.getElementById("IdEnTabla");
    if (selec.checked){
        document.getElementById("IDtabla").style.display="block";
        document.getElementById("IDlista").style.display="none";
    }
    else{
        document.getElementById("IDtabla").style.display="none";
        document.getElementById("IDlista").style.display="block";
    }
}



function cargarLista(texto){
    let nodo = document.createElement("li");
    let nodoTexto = document.createTextNode(texto);
    nodo.appendChild(nodoTexto);
    document.getElementById("IDlista").appendChild(nodo);
}

function cargarTabla(texto){
    let fila = document.getElementById("IDtabla").insertRow();
    let celda = fila.insertCell();
    celda.innerHTML = texto;
}

function cargarCombo(texto){
    let nodo = document.createElement("option");
    let nodoTexto = document.createTextNode(texto);
    nodo.appendChild(nodoTexto);
    document.getElementById("IDcombo").appendChild(nodo);

}