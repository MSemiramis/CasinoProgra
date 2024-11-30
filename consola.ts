import * as readline from 'readline';
import { Usuario } from './usuario';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function inicioConsola(){
    console.clear();
    console.log("==============================================================");
    console.log("                 Bienvenido a Casino La Gaita                 ");
    console.log("==============================================================");
    console.log(" ");
}

function crearUsuario() {
    rl.question("¿Cuál es tu nombre? ", (nombre) => {
        rl.question("¿Cuál es tu saldo inicial? ", (saldo) => {
            const saldoNumerico = parseInt(saldo, 10);
            const usuario = new Usuario(nombre, saldoNumerico);
            rl.close();
        });
    });
}

function menuIncial(){
    console.clear();
    console.log(`
                =============Casino La Gaita=============`);
    console.log(`
                **Seleccione un juego para comenzar sus apuestas: 
                1: Jugar Tragamonedas Basico
                2: Jugar Tragamonedas por Linea
                3: Jugar Tragamonedas por cantidad
                4: Jugar Dados
                5: Jugar Ruleta
                6: Salir del casino

                =============Casino La Gaita=============                
                `);
}


inicioConsola();
crearUsuario();



