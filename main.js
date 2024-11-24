"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//QA MANUAL TESTING
/*TEST DE LECTURA DE TXT*/
//leerTXT('./instructivos/tragamonedas.txt');
//leerTXT('./instructivos/dados.txt');
function imprimirMatriz(matriz) {
    console.log(" ");
    console.log("-------------------");
    for (var i = 0; i < matriz.length; i++) {
        console.log(" | " + matriz[i].join(" ") + " | "); // Imprime cada fila unida por un espacio
    }
    console.log("-------------------");
}
// imprimirMatriz();
var simbolos = ["9", "10", "J", "Q", "K", "A"];
function generarMatriz() {
    var salida = [];
    for (var i = 0; i < 3; i++) {
        var fila = [];
        for (var j = 0; j < 5; j++) {
            var indice = Math.floor(Math.random() * simbolos.length);
            fila.push(simbolos[indice]);
        }
        salida.push(fila);
    }
    return salida;
}
imprimirMatriz(generarMatriz());
