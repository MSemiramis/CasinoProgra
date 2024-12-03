"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rls = require("readline-sync");
var readline = require("readline");
var Ruleta_1 = require("./Ruleta");
var MiJuegoDeDados_1 = require("./MiJuegoDeDados");
var usuario_1 = require("./usuario");
var elegirApuesta = menuRuleta();
var apuestaMin = 100;
var ruleta = new Ruleta_1.Ruleta(apuestaMin);
//QA MANUAL TESTING
/*TEST DE LECTURA DE TXT*/
//leerTXT('./instructivos/tragamonedas.txt');
//leerTXT('./instructivos/dados.txt');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function inicioConsola() {
    console.clear();
    console.log("==============================================================");
    console.log("                 Bienvenido a Casino La Gaita                 ");
    console.log("==============================================================");
    console.log(" ");
}
function crearUsuario() {
    rl.question("¿Cuál es tu nombre? ", function (nombre) {
        rl.question("¿Cuál es tu saldo inicial? ", function (saldo) {
            var saldoNumerico = parseInt(saldo, 10);
            var usuario = new usuario_1.Usuario(nombre, saldoNumerico);
            rl.close();
        });
    });
}
function menuIncial() {
    console.clear();
    console.log("\n                =============Casino La Gaita=============");
    console.log("\n                **Seleccione un juego para comenzar sus apuestas: \n                1: Jugar Tragamonedas Basico\n                2: Jugar Tragamonedas por Linea\n                3: Jugar Tragamonedas por cantidad\n                4: Jugar Dados\n                5: Jugar Ruleta\n                6: Salir del casino\n\n                =============Casino La Gaita=============                \n                ");
}
inicioConsola();
crearUsuario();
//------------------------------------------------TragaMonedas------------------------------------------------------
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
//------------------------------------------------Ruleta------------------------------------------------------
while (elegirApuesta != 0) {
    modoDeJuego(elegirApuesta);
    elegirApuesta = menuRuleta();
}
function volverAtras() {
    var entrada = rls.questionInt("\nIngrese 0 para volver atras: ");
    while (entrada != 0) {
        entrada = rls.questionInt("\nIngrese 0 para volver atras: ");
    }
}
function menuRuleta() {
    console.log("\n <-------------------> Ruleta <-------------------> \n");
    dibujarRuleta();
    console.log("\n <------------------------------------------------> \n");
    console.log("\n Seleccione el tipo de apuesta que quiere realizar");
    console.log("1. Numero simple.");
    console.log("2. Linea (horizontal)");
    console.log("3. Columna (vertical)");
    console.log("4. Tercios");
    console.log("5. Mitades");
    console.log("6. Pares");
    console.log("7. Impares");
    console.log("8. Rojas (marcados con *)");
    console.log("9. Negras");
    console.log("0. Volver al menú anterior");
    var entrada = rls.questionInt("\nIngrese una opcion: ");
    return entrada;
}
function modoDeJuego(tipoApuesta) {
    switch (tipoApuesta) {
        case 1: //Numero solo
            ruleta.pedirApuesta();
            ruleta.apostarNumSimpleReducido();
            volverAtras();
            break;
        case 2: //Linea horizontal
            ruleta.pedirApuesta();
            ruleta.apostarLinea();
            volverAtras();
            break;
        case 3: //Columna vertical
            ruleta.pedirApuesta();
            ruleta.apostarColumna();
            volverAtras();
            break;
        case 4: //Tercios
            ruleta.pedirApuesta();
            ruleta.apostarTercios();
            volverAtras();
            break;
        case 5: //Mitades
            ruleta.pedirApuesta();
            ruleta.apostarMitades();
            volverAtras();
            break;
        case 6: //Pares
            ruleta.pedirApuesta();
            ruleta.apostarPares();
            volverAtras();
            break;
        case 7: //Impares
            ruleta.pedirApuesta();
            ruleta.apostarImpares();
            volverAtras();
            break;
        case 8: //Rojas
            ruleta.pedirApuesta();
            ruleta.apostarRojas();
            volverAtras();
            break;
        case 9: //Negras
            ruleta.pedirApuesta();
            ruleta.apostarNegras();
            volverAtras();
            break;
        default:
            break;
    }
}
function dibujarRuleta() {
    console.log("               ___________________");
    console.log("        _______|________0________|_________");
    console.log("        |      |  1* |  2  |  3* |        |");
    console.log("        |  1er |  4  |  5* |  6  |        |");
    console.log("        |      |  7* |  8  |  9* |  1-18  |");
    console.log("        |______| 10  | 11  | 12* |        |");
    console.log("        |      | 13  | 14* | 15  |        |");
    console.log("        |  2do | 16* | 17  | 18* |________|");
    console.log("        |      | 19* | 20  | 21* |        |");
    console.log("        |______| 22  | 23* | 24  |        |");
    console.log("        |      | 25* | 26  | 27* | 19-36  |");
    console.log("        |  3er | 28  | 29  | 30* |        |");
    console.log("        |      | 31  | 32* | 33  |        |");
    console.log("        |______|_34*_|_35__|_36*_|________|");
    console.log("        |      |        |        |        |");
    console.log("        |  Par | Impar  |  Rojas | Negras |");
    console.log("        |______|________|________|________|\n");
}
//------------------------------------------------Ruleta------------------------------------------------------
var miJuego = new MiJuegoDeDados_1.MiJuegoDeDados(7, 10, 'Par');
// Jugar una ronda del juego
miJuego.jugar();
