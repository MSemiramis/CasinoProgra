"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var usuario_1 = require("./usuario");
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
