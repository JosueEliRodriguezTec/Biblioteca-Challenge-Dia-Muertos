// =========================================
// PROTECCIÓN DE ACCESO AL CHALLENGE
// =========================================

const autorizado =
    sessionStorage.getItem("challengeIniciado");

if(autorizado !== "true"){

    window.location.href =
        "https://josueelirodrigueztec.github.io/Biblioteca-Challenge-Dia-Muertos/";

}

let jugador = JSON.parse(localStorage.getItem("jugador"));

    if(!jugador){

        jugador = {

            puntos:0,

            monedas:0,

            nivel:1,

            librosVisitados:0,

            medalla:"Ninguna"

        };

    }

    let visitados = {

        libro1: false,

        libro2: false,

        libro3: false

    };

    let libroPendiente = null;

    document.getElementById("coins").innerHTML = jugador.monedas;

  
 // =========================================
 // BOTONES DE LIBROS
 // =========================================

function libro1() {
    if (visitados.libro1 || libroPendiente) return;

    abrirLibro(
        "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/6219113",
        "libro1"
    );
}

function libro2() {
    if (visitados.libro2 || libroPendiente) return;

    abrirLibro(
        "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/4450695",
        "libro2"
    );
}

function libro3() {
    if (visitados.libro3 || libroPendiente) return;

    abrirLibro(
        "https://libbyapp.com/search/bibliotecatec/search/query-dia%20de%20muertos/page-1/1332447",
        "libro3"
    );
}


// =========================================
// ABRIR LIBRO Y CERRARLO AUTOMÁTICAMENTE
// =========================================

function abrirLibro(url, nombreLibro) {

    const ventanaEbook = window.open(
        url,
        "bibliotecaEbook",
        "popup=yes,width=1000,height=750,resizable=yes,scrollbars=yes"
    );

    if (!ventanaEbook) {
        alert(
            "No se pudo abrir el libro. " +
            "Permite las ventanas emergentes e inténtalo de nuevo."
        );
        return;
    }

    libroPendiente = nombreLibro;

    let finalizado = false;
    let temporizadorCierre;

    function finalizarVisita() {

        if (finalizado) return;

        finalizado = true;

        clearInterval(vigilarVentana);
        clearTimeout(temporizadorCierre);

        if (libroPendiente === nombreLibro) {
            sumarMonedas(nombreLibro);
            libroPendiente = null;
        }
    }

    // Detectar si el alumno cierra la ventana manualmente
    const vigilarVentana = setInterval(() => {
        if (ventanaEbook.closed) {
            finalizarVisita();
        }
    }, 500);

    // Cerrar automáticamente después de 4.2 segundos
    temporizadorCierre = setTimeout(() => {

        if (!ventanaEbook.closed) {
            ventanaEbook.close();
        }

        setTimeout(() => {

            if (ventanaEbook.closed) {
                finalizarVisita();
            } else {

                const continuar = confirm(
                    "Si terminaste de consultar el libro, " +
                    "presiona Aceptar para continuar."
                );

                if (continuar) {
                    finalizarVisita();
                }
            }

        }, 300);

    }, 5000);
}

    function sumarMonedas(nombre){
        console.log("Entró a sumarMonedas:", nombre);

        if(visitados[nombre]){

            return;

        }

        visitados[nombre] = true;

        jugador.monedas += 5;

        document.getElementById("coins").innerHTML = jugador.monedas;

        //document.getElementById("progreso").innerHTML =
        //    jugador.monedas + " / 30 🪙";

            const anim = document.getElementById("coinAnimation");

anim.classList.remove("show");

void anim.offsetWidth;

anim.classList.add("show");

// Si ya llegó a 30 monedas
if(jugador.monedas >= 30){

    confetti({

        particleCount:250,

        spread:180,

        origin:{ y:0.6 }

    });

    document.getElementById("medallaBronce").style.display = "flex";

    const botonContinuar = document.getElementById("continuar");

    botonContinuar.disabled = false;

    botonContinuar.innerHTML = "Continuar al Nivel 2";

}
//   localStorage.setItem(
//     "jugador",
//     JSON.stringify(jugador)
// );

console.log("Va a cambiar el botón");

let boton = document.getElementById("btn" + nombre.charAt(0).toUpperCase() + nombre.slice(1));

console.log(boton);

boton.disabled = true;

boton.innerHTML = "✅ Visitado";

}

function cerrarMedalla(){

    document.getElementById("medallaBronce").style.display = "none";

}





//document.addEventListener("visibilitychange", function(){

   

    //if(document.visibilityState === "visible"){

        //if(libroPendiente){

        

        //    sumarMonedas(libroPendiente);

      //      libroPendiente = null;

    //    }

  //  }

//});

document.getElementById("continuar").addEventListener("click", function() {
    window.location.href = "transicion.html";
});
