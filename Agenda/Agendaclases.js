class Contacto {
    constructor(nombre, apellido, edad, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.telefono = telefono;
    }

    esJoven() {
        return parseInt(this.edad) < 25;
    }

    toString() {
        return `Contacto ${this.nombre} ${this.apellido}, Edad: ${this.edad}, Tel: ${this.telefono}`;
    }
    compararcontacto(otro) {
        return this.edad - otro.edad;
    }
}

class Agenda { /*Clase sistema en el obl */
    constructor() {
        this.lista = [];
    }

    agregar(unElemento) {
        this.lista.push(unElemento);
    }

    darTodos() {
        return this.lista;
    }

    estaTelefono(tel) {
        return this.lista.some(contacto => contacto.telefono === tel);
    }

    Jovenes() {
        return this.lista.filter(contacto => contacto.esJoven());
    }

    DarJovenes() {
        return this.lista.filter(contacto => contacto.esJoven());
    }

    promedio() {
        let suma = 0;
        for (let elem of this.lista) {
            suma += parseInt(elem.edad);
        }
        return suma / this.lista.length;
    }
    ordenar(){
        this.lista.sort(function(a,b){
           return a.compararcon(b);}) // esto va en clase contaco ya que la comparacion se hace con contactos
    }
    eliminar(posicion) {	
        this.lista.splice(posicion, 1);   
    }
    darDiferencia(){
        let res = "sin resultados";
        if(this.lista.length >=2){
            let min = this.lista[0].edad;
            let max = this.lista[0].edad;
            for(let i=0 ; i<this.lista.length; i++){
                if(this.lista[i].edad>max){
                    max = this.lista[i].edad;
                }
                if(this.lista[i].edad<min){
                    min = this.lista[i].edad;
                }
            }
            res = max - min;
        }
        return res;
    }
}
