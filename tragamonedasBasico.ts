import { Tragamonedas } from "./tragamonedas";
import { Usuario } from "./usuario";


class TragamonedasBasico extends Tragamonedas{

    constructor(){
        //Apuesta minima 1 para el juego basico
        //Multiplicador de ganancia 20%
        super(1, 1.20);
    }

    public jugar(usuario :Usuario, apuesta:number ):void {
        let contador = 0;
        const partida = this.generarMatriz();
        for(let i = 0; i < 3; i++){
            let fila = partida[i];
            for(let j=0; j<partida.length -2; j++){
                if(fila[j] === fila[j+1] &&
                   fila[j+1] === fila[j+2]
                ){
                    this.pagarPremio(usuario, apuesta);
                }
            }
        }
        console.log("La tirada no tiene premio");
        this.restarApuesta(usuario, apuesta);

    }

    //Verificar si estos metodos pasan al padre, se pueden reutilizar.
    public pagarPremio(usuario :Usuario, apuesta:number ): void {
        apuesta = apuesta * this.multiplicadorApuesta;
        usuario.sumarApuesta(apuesta);
        console.log("Usted a ganado un premio. Se ha pagado " + apuesta);        
    }

    public restarApuesta(usuario :Usuario, apuesta:number){
        usuario.restarApuesta(apuesta);
    }

}