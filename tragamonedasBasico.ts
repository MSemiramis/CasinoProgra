import { Tragamonedas } from "./tragamonedas";
import { Usuario } from "./usuario";


class TragamonedasBasico extends Tragamonedas{

    constructor(){
        //Apuesta minima 1 para el juego basico
        //Multiplicador de ganancia 20%
        super(1, 1.20);
    }



    public jugar():void {
        
    }

    public pagarPremio(): void {
        
    }


}