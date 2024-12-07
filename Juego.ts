import { Usuario } from "./Usuario";

export interface Juego {
    jugar(usuario: Usuario, apuesta :number): void; //Metodo que debe implementar cada juego del casino
    pagarPremio(apuesta:number );//Metodo que debe pagar al jugador dependiendo el juego
    restarApuesta(apuesta:number): void;//Metodo para restar la apuesta del saldo del jugador
}


//En ambos metodos se pasa un usuario, que va a jugar, y la apuesta realizada.
//
