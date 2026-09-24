// =========================================
// PROTECCIÓN DE ACCESO AL CHALLENGE
// =========================================

const autorizado =
    sessionStorage.getItem("challengeIniciado");

if(autorizado !== "true"){

    window.location.href =
        "https://josueelirodrigueztec.github.io/Biblioteca-Challenge-Septiembre/index.html";

}

const preguntas = [

    {
        pregunta: "¿Qué flor es uno de los símbolos más representativos del Día de Muertos?",

        opciones: [
            "Flor de cempasúchil",
            "Rosa",
            "Tulipán",
            "Girasol"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/2354112"
    },

    {
        pregunta: "¿En qué fechas se celebra tradicionalmente el Día de Muertos en México?",

        opciones: [
            "1 y 2 de noviembre",
            "24 y 25 de diciembre",
            "14 y 15 de febrero",
            "15 y 16 de septiembre"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/3369955"
    },

    {
        pregunta: "¿Qué alimento tradicional se coloca en los altares del Día de Muertos?",

        opciones: [
            "Pan de muerto",
            "Pizza",
            "Hamburguesa",
            "Hot dog"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/6056976"
    },

    {
        pregunta: "¿Qué personaje es uno de los más representativos del Día de Muertos?",

        opciones: [
            "La Catrina",
            "Caperucita Roja",
            "Blancanieves",
            "Rapunzel"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/4207617"
    },

    {
        pregunta: "¿Qué elemento de papel decorativo suele colocarse en las ofrendas y celebraciones?",

        opciones: [
            "Papel picado",
            "Papel aluminio",
            "Cartón corrugado",
            "Periódico"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/3693721"
    },

    {
        pregunta: "¿Qué representan las veladoras en una ofrenda?",

        opciones: [
            "La luz que guía a los difuntos",
            "El clima",
            "La música",
            "La cosecha"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/5980090"
    },

    {
        pregunta: "¿Qué figura de azúcar es tradicional en el Día de Muertos?",

        opciones: [
            "Calavera de azúcar",
            "Galleta salada",
            "Paleta helada",
            "Dona glaseada"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/3666590"
    },

    {
        pregunta: "¿Qué se acostumbra colocar en una ofrenda para recordar a los seres queridos?",

        opciones: [
            "Fotografías",
            "Boletos de cine",
            "Tarjetas bancarias",
            "Revistas"
        ],

        correcta: 0,

        libro: "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/5443772"
    }

];

// Mezclar las preguntas
let preguntasJuego = [...preguntas]
.sort(() => Math.random() - 0.5)
.slice(0,5);

let preguntaActual = 0;

const lblPregunta = document.getElementById("pregunta");

const lblNumero = document.getElementById("contadorPregunta");

const botones = [

    document.getElementById("r0"),
    document.getElementById("r1"),
    document.getElementById("r2"),
    document.getElementById("r3")

];  

   function mezclarOpciones(pregunta){

    let opciones = pregunta.opciones.map((texto, indice) => ({
        texto: texto,
        correcta: indice === pregunta.correcta
    }));

    opciones.sort(() => Math.random() - 0.5);

    pregunta.opciones = opciones.map(o => o.texto);

    pregunta.correcta = opciones.findIndex(o => o.correcta);

}

function mostrarPregunta(){

    let p = preguntasJuego[preguntaActual];
    mezclarOpciones(p);

    lblNumero.innerHTML =
        "Pregunta " + (preguntaActual+1) + " de 5";

    lblPregunta.innerHTML = p.pregunta;



    // Ajustar el tamaño según la longitud de la pregunta
    if(p.pregunta.length > 55){

        lblPregunta.style.fontSize = "18px";

    }else{

        lblPregunta.style.fontSize = "22px";

    }

    for(let i=0; i<4; i++){

        if(p.opciones[i]){

            botones[i].style.display = "block";

            botones[i].innerHTML =
                String.fromCharCode(65+i) + ") " + p.opciones[i];

        }else{

            botones[i].style.display = "none";

        }

    }

}

mostrarPregunta();

for(let i=0; i<botones.length; i++){

    botones[i].onclick = function(){

        revisarRespuesta(i);

    };

}

function revisarRespuesta(indice){

    let pregunta = preguntasJuego[preguntaActual];

    // Desactivar botones
    botones.forEach(b=>b.disabled=true);

    if(indice == pregunta.correcta){

    botones[indice].classList.add("correcta");

    botones.forEach(b => b.disabled = true);

    setTimeout(()=>{

        abrirLibro(pregunta.libro);

    },800);

}
    else{

    botones[indice].classList.add("incorrecta");

    setTimeout(()=>{

        botones[indice].classList.remove("incorrecta");

        mostrarIncorrecto();

    },700);

}

}

function mostrarIncorrecto(){

    document.getElementById("modalIncorrecto").style.display="flex";

}

function cerrarIncorrecto(){

    document.getElementById("modalIncorrecto").style.display = "none";

    botones.forEach(b => {

        b.disabled = false;
        b.classList.remove("incorrecta");

    });

}

function abrirLibro(url){

    document.getElementById("iframeLibro").src = url;

    document.getElementById("modalLibro").style.display = "flex";

}

function cerrarLibro(){

    document.getElementById("modalLibro").style.display = "none";

    document.getElementById("iframeLibro").src = "";

    preguntaActual++;

    if(preguntaActual >= preguntasJuego.length){

        terminarTrivia();

    }else{

        botones.forEach(b=>{

            b.disabled = false;

            b.classList.remove("correcta");

            b.classList.remove("incorrecta");

        });

     

        mostrarPregunta();

    }

}

function terminarTrivia(){

    // Marcar que el alumno completó los 3 niveles
    sessionStorage.setItem("challengeCompletado", "true");

    document.getElementById("medallaOro").style.display = "flex";

    lanzarFuegos();

}

function lanzarFuegos(){

    const duracion = 4000;

    const fin = Date.now() + duracion;

    (function frame(){

        confetti({

            particleCount:4,

            angle:60,

            spread:70,

            origin:{x:0}

        });

        confetti({

            particleCount:4,

            angle:120,

            spread:70,

            origin:{x:1}

        });

        if(Date.now() < fin){

            requestAnimationFrame(frame);

        }

    })();

}

function finalizarJuego(){

    window.location.href = "registro.html";

}

let ultimoToque = 0;

document.addEventListener("touchend", function(e){

    const ahora = Date.now();

    if(ahora - ultimoToque <= 300){

        e.preventDefault();

    }

    ultimoToque = ahora;

}, { passive:false });


// =========================================
// PRUEBA DEL BOTÓN ATRÁS
// =========================================

history.pushState(null, "", location.href);

window.addEventListener("popstate", function () {

    alert("⚠️ Presionaste el botón Atrás");

    history.pushState(null, "", location.href);

});
