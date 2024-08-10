var minas = [] //Creación de un array vacío para las minas
var jugador = [] //Creación de un array vacío para el jugador
var instrucciones = document.getElementById("instrucciones")

function randomMines() {
    minas = []
    for (let i = 0; i < 8; i++) {
        let filaMinas = []
        for (let j = 0; j < 8; j++) {
            filaMinas.push(" ")
        }
        minas.push(filaMinas)
        filaMinas = []
    }

    for (let i = 0; i < 8; i += 2) {
        for (let j = 0; j < Math.round(Math.random() * 3 + 2); j++) {
            minas[Math.round(Math.random() + i)][Math.round(Math.random() * 7)] = "#"

        }

    }
}

function vaciarArrayJugador() {
    jugador = []
    for (let i = 0; i < 8; i++) {
        let filaJugador = []
        for (let j = 0; j < 8; j++) {
            filaJugador.push(" ")
        }
        jugador.push(filaJugador)
        filaJugador = []
    }
}


function imprimir() {
    let numeros = 64
    var tablero = "-------------------------------------------------<br>"

    for (let i = 0; i < 8; i++) {
        tablero += "|"
        for (let j = 0; j < 8; j++) {

            if (numeros < 10) {
                tablero += "    " + numeros + "|"
            } else {
                tablero += "   " + numeros + "|"
            }
            numeros--
        }
        tablero += "<br>|"
        for (let j = 0; j < 8; j++) {
            tablero += minas[i][j] + " " + jugador[i][j] + "  |"
        }
        tablero += "<br>-------------------------------------------------<br>"
    }

    let juego = document.getElementById("juego")
    juego.innerHTML = ("<pre>" + tablero + "</pre>")
}


function tema() {
    let fondo = document.getElementById("tablero")
    let tema = document.getElementById("tema")
    let body = document.getElementById("body")
    let contenedor = document.getElementById("contenedor")
    if (tema.value == 0) {
        juego.style.color = "black"
        fondo.style.backgroundColor = "white"
        instrucciones.style.color = "black"
        instrucciones.style.backgroundColor = "white"
        body.style.backgroundColor= "rgb(187, 223, 255)"
        body.style.color="black"
        contenedor.style.backgroundColor="rgb(188, 191, 244)"
    } else {
        juego.style.color = "white"
        fondo.style.backgroundColor = "black"
        instrucciones.style.color = "white"
        instrucciones.style.backgroundColor = "black"
        body.style.backgroundColor= "rgb(30, 36, 42)"
        body.style.color="white"
        contenedor.style.backgroundColor="rgb(35, 42, 89)"
    }

}

var posicion = 1
var posicionFila = 7
var posicionColumna = 7

function dado() {

    vaciarArrayJugador();

    let tiro = Math.round(Math.random() * 5 + 1)
    posicion += tiro
    posicionColumna -= tiro

    if (posicionColumna < 0) {
        posicionFila -= 1
        posicionColumna += 8
    }

    if (posicionFila < 0) {
        posicionFila = 0
        posicionColumna = 0
        posicion = 64
    }

    if (posicion == 64) {
        instrucciones.innerHTML = "El dado ha caido en " + tiro + ".<br><br>Has avanzado hasta la casilla 64.<br><br><br><br><br><br><br>-------- ¡Felicidades! Has ganado :D --------"
    } else {
        if (minas[posicionFila][posicionColumna] == "#") {
            posicionFila++
            instrucciones.innerHTML = "El dado ha caido en " + tiro + ".<br><br>¡Oh no! Habías avanzado hasta la casilla " + posicion + " pero era una trampa.<br><br>Has caido 1 nivel."
            posicion -= 8
            if (posicionFila > 7) {
                posicionFila = 7
                posicionColumna = 7
                posicion = 1
            }
        } else {
            instrucciones.innerHTML = "El dado ha caido en " + tiro + ".<br><br>Has avanzado hasta la casilla " + posicion + "."
        }

    }

    jugador[posicionFila][posicionColumna] = "@"


    imprimir();
}


function reiniciar() {
    randomMines();
    vaciarArrayJugador();
    jugador[7][7] = "@";
    imprimir();
    instrucciones.innerHTML = "Bienvenido al juego, ahora mismo estás en la casilla 1.<br><br>- Si das clic a Tirar Dado saldrá un número entre 1 y 6, y avanzarás ese número de casillas. <br><br> - Si caes en una trampa caerás un nivel. <br><br> ¡Buena suerte!"
    posicion = 1
    posicionFila = 7
    posicionColumna = 7
}

reiniciar()
