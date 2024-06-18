class Tema {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

class Pregunta {
    constructor(texto, respuestaCorrecta, respuestasIncorrectas, nivel, tema) {
        this.texto = texto;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestasIncorrectas = respuestasIncorrectas;
        this.nivel = nivel;
        this.tema = new Tema(tema.nombre, tema.descripcion);
    }
}

    class Sistema {
        constructor() {
            this.listaPreguntas = [];
            this.listaTemas = [];
        }

        agregar(unTema) {
            this.listaTemas.push(unTema);
        }

        estaTema(tema) {
            return this.listaTemas.some(t => t.nombre === tema.nombre);
        }
    }


let preguntas = [

    new Pregunta(
        "¿Cuál es la capital de Francia?",
        "París",
        ["Londres", "Berlín", "Madrid"],
        1,
        { nombre: "Geografía", descripcion: "Temas de geografía del mundo" }
    ),
    new Pregunta(
        "¿Cuál río es más largo?",
        "Amazonas",
        ["Uruguay", "Rin", "Misisipi"],
        4,
        { nombre: "Geografía", descripcion: "Temas de geografía del mundo" }
    ),
    new Pregunta(
        "¿Cuánto es 5 + 7?",
        "12",
        ["10", "8", "15", "20"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 3 - 2?",
        "1",
        ["5", "2", "0", "4"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 8 + 4?",
        "12",
        ["10", "14", "6", "16"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 6 - 3?",
        "3",
        ["9", "2", "5", "0"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 9 + 2?",
        "11",
        ["13", "8", "15", "10"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 4 - 1?",
        "3",
        ["5", "2", "0", "4"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 7 + 6?",
        "13",
        ["10", "14", "8", "16"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 10 - 5?",
        "5",
        ["9", "2", "7", "3"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 3 + 4?",
        "7",
        ["10", "5", "8", "6"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 6 - 1?",
        "5",
        ["9", "2", "7", "3"],
        1,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 15 + 8?",
        "23",
        ["18", "25", "12", "20"],
        2,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 10 - 4?",
        "6",
        ["14", "7", "2", "9"],
        2,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 24 + 9?",
        "33",
        ["27", "15", "18", "30"],
        3,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 14 - 7?",
        "7",
        ["9", "2", "5", "10"],
        2,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿En qué año fue el descubrimiento de América?",
        "1492",
        ["1292", "1500", "1600", "1700"],
        4,
        { nombre: "Historia", descripcion: "Historia mundial" }
    ),
    new Pregunta(
        "¿Cuánto es 19 + 12?",
        "31",
        ["28", "15", "22", "25"],
        3,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 18 - 6?",
        "12",
        ["14", "9", "15", "10"],
        2,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 32 + 17?",
        "49",
        ["45", "25", "38", "50"],
        4,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 21 - 9?",
        "12",
        ["14", "18", "15", "10"],
        2,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuánto es 121 - 11?",
        "110",
        ["111", "109", "15", "210"],
        4,
        { nombre: "Matemáticas", descripcion: "Operaciones básicas" }
    ),
    new Pregunta(
        "¿Cuál es la montaña más alta del mundo?",
        "Monte Everest",
        ["Monte Kilimanjaro", "Monte McKinley", "Monte Aconcagua"],
        5,
        { nombre: "Geografía", descripcion: "Temas de geografía del mundo" }
    ),
    new Pregunta(
        "¿En qué año comenzó la Primera Guerra Mundial?",
        "1914",
        ["1900", "1920", "1939", "1950"],
        5,
        { nombre: "Historia", descripcion: "Historia mundial" }
    ),
    new Pregunta(
        "¿En qué continente se encuentra Egipto?",
        "África",
        ["Asia", "Europa", "Oceanía", "América"],
        2,
        { nombre: "Geografía", descripcion: "Temas de geografía del mundo" }
    ),
    new Pregunta(
        "¿Cuál es la capital de España?",
        "Madrid",
        ["Barcelona", "Lisboa", "Roma", "Atenas", "París", "Berlín"],
        1,
        { nombre: "Geografía", descripcion: "Temas de geografía del mundo" }
    ),
    new Pregunta(
        "¿Cuál es el deporte más popular en todo el mundo?",
        "Fútbol",
        ["Baloncesto", "Tenis", "Cricket", "Golf"],
        1,
        { nombre: "Deporte", descripcion: "Deportes en general" }
    ),
    new Pregunta(
        "¿Cuál es el plural de 'análisis'?",
        "Análisis",
        ["Análisises", "Análisi", "Análisos", "Anális"],
        3,
        { nombre: "Lenguaje", descripcion: "Lingüística y gramática" }
    ),
    new Pregunta(
        "¿Cuántos jugadores hay en un equipo de voleibol?",
        "6",
        ["5", "7", "8", "9"],
        1,
        { nombre: "Deporte", descripcion: "Deportes en general" }
    ),
    new Pregunta(
        "¿Cuál es el evento deportivo más grande del mundo?",
        "Juegos Olímpicos",
        ["Copa del Mundo de Fútbol", "Super Bowl", "UEFA Champions League", "Copa Mundial de Rugby"],
        2,
        { nombre: "Deporte", descripcion: "Deportes en general" }
    ),
    new Pregunta(
        "¿Quién pintó La Última Cena?",
        "Leonardo da Vinci",
        ["Vincent van Gogh", "Pablo Picasso", "Michelangelo", "Claude Monet"],
        3,
        { nombre: "Arte", descripcion: "Cine, teatro, pintura, etc" }
    ),
    new Pregunta(
        "¿Quién escribió la obra de teatro Romeo y Julieta?",
        "William Shakespeare",
        ["Anton Chekhov", "George Bernard Shaw", "Oscar Wilde", "Jane Austen"],
        4,
        { nombre: "Arte", descripcion: "Cine, teatro, pintura, etc" }
    ),
    new Pregunta(
        "¿Cuál es la escultura de Miguel Ángel?",
        "David",
        ["El Pensador", "Venus de Milo", "Toro de Wall Street"],
        3,
        { nombre: "Arte", descripcion: "Cine, teatro, pintura, etc" }
    ),
    new Pregunta(
        "¿Cuál es la capital de Argentina?",
        "Buenos Aires",
        ["Salta", "Montevideo", "La Paz", "Córdoba", "Punta del Este"],
        3,
        { nombre: "Geografía", descripcion: "Temas de geografía del mundo" }
    ),
    new Pregunta(
        "¿Cuál es el instrumento musical más grande de la familia de las cuerdas?",
        "Contrabajo",
        ["Violín", "Cello", "Guitarra"],
        2,
        { nombre: "Arte", descripcion: "Cine, teatro, pintura, etc" }
    ),
    new Pregunta(
        "¿Qué científico propuso la teoría de la relatividad?",
        "Albert Einstein",
        ["Isaac Newton", "Galileo Galilei", "Niels Bohr", "Stephen Hawking"],
        4,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿Cuál es la capa más externa de la atmósfera terrestre?",
        "Exosfera",
        ["Troposfera", "Estratosfera", "Mesosfera", "Termosfera"],
        3,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿Qué proceso convierte la luz solar en energía química en las plantas?",
        "Fotosíntesis",
        ["Respiración", "Metabolismo", "Digestión", "Fermentación"],
        3,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿En qué país se originó el judo?",
        "Japón",
        ["China", "Corea del Sur", "Rusia", "Brasil"],
        4,
        { nombre: "Deporte", descripcion: "Deportes en general" }
    ),
    new Pregunta(
        "¿Cuál es la partícula subatómica con carga positiva?",
        "Protón",
        ["Electrón", "Neutrón", "Quark", "Bosón"],
        2,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿Qué fenómeno natural es medido por la escala Richter?",
        "Terremoto",
        ["Tornado", "Huracán", "Inundación", "Erupción volcánica", "Tsunami"],
        1,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿En qué año se llevó a cabo el primer viaje tripulado a la Luna?",
        "1969",
        ["1950", "1956", "1971", "1975", "1983", "1991"],
        4,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿Qué elemento químico tiene el símbolo 'H'?",
        "Hidrógeno",
        ["Helio", "Oxígeno", "Nitrógeno", "Carbono", "Oro", "Plata"],
        2,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿Cuál es el satélite natural de la Tierra?",
        "Luna",
        ["Marte", "Júpiter", "Venus", "Saturno"],
        3,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿Cuál es la forma que tienen las estrellas al mirarlas desde la Tierra?",
        "Redonda",
        ["Cuadrada", "Triangular", "Alargada", "Rectangular"],
        4,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿Cuál es el hueso más largo del cuerpo humano?",
        "Fémur",
        ["Tibia", "Húmero", "Radio"],
        3,
        { nombre: "Ciencia", descripcion: "Ciencia y Naturaleza" }
    ),
    new Pregunta(
        "¿Cuál es el sinónimo de 'efervescente'?",
        "Burbujeante",
        ["Calmo", "Agitado", "Ferviente", "Vibrante"],
        3,
        { nombre: "Lenguaje", descripcion: "Lingüística y gramática" }
    ),
    new Pregunta(
        "¿Cuál es la lengua oficial de Brasil?",
        "Portugués",
        ["Español", "Inglés", "Francés", "Italiano"],
        1,
        { nombre: "Lenguaje", descripcion: "Lingüística y gramática" }
    ),
    new Pregunta(
        "¿Cuál es el antónimo de 'optimista'?",
        "Pesimista",
        ["Alegre", "Contento", "Esperanzado", "Positivo", "Feliz"],
        1,
        { nombre: "Lenguaje", descripcion: "Lingüística y gramática" }
    ),
    new Pregunta(
        "¿Cuál es la función principal de los adjetivos en una oración?",
        "Describir sustantivos",
        ["Expresar acciones", "Conectar oraciones", "Indicar tiempo", "Definir verbos"],
        3,
        { nombre: "Lenguaje", descripcion: "Lingüística y gramática" }
    ),
    new Pregunta(
        "¿Qué es un palíndromo?",
        "Una palabra que se lee igual al derecho y al revés",
        ["Un anagrama", "Una rima", "Un acrónimo", "Un número que se lee igual al derecho y al revés"],
        4,
        { nombre: "Lenguaje", descripcion: "Lingüística y gramática" }
    ),
    new Pregunta(
        "¿Cuál es la cadena montañosa más larga del mundo?",
        "Los Andes",
        ["Los Himalayas", "Los Alpes", "Los Apalaches", "Los Urales"],
        5,
        { nombre: "Geografía", descripcion: "Temas de geografía del mundo" }
    ),
    new Pregunta(
        "¿Cuál es el plural de 'hipótesis'?",
        "Hipótesis",
        ["Hipótesises", "Hipótesi", "Hipótesisos", "Hipótesi"],
        3,
        { nombre: "Lenguaje", descripcion: "Lingüística y gramática" }
    )
];
   
