import { Tragamonedas } from "./Tragamonedas";
import { Casino } from "./Casino";
import { Usuario } from "./Usuario";
import * as rls from "readline-sync";


export class TragamonedasCantidad extends Tragamonedas{

    constructor(casino:Casino, usuario :Usuario){
        super(100, 12);
        this.casino = casino;
        this.usuario = usuario;
    }

    public jugar(): void {
        let apuesta: number = 0;
        const saldoUsuario = this.usuario.getSaldo();
    
        while (apuesta < this.getApuestaMinima() || apuesta > saldoUsuario) {
            apuesta = rls.questionInt(`\nIngrese el monto a apostar (apuesta mínima ${this.getApuestaMinima()}): `);
        }
    
        let tienePremio = false;
        const partida = this.generarMatriz();
        console.log(partida);
        const contador: { [key: string]: number } = {};

        for (let i = 0; i < partida.length; i++) {
            const fila = partida[i];
    
            for (let j = 0; j < fila.length; j++) {
                const caracter = fila[j];
    
                if (contador[caracter]) {
                    contador[caracter] += 1;
                } else {
                    contador[caracter] = 1;
                }
            }
        }
        for (let caracter in contador) {
            if (contador[caracter] === 10) {
                tienePremio = true;
                this.pagarPremio(apuesta);
                console.log(`¡Has ganado con ${caracter} (aparece 10 veces)!`);
                break;
            }
        }
    
        if (!tienePremio) {
            console.log("La tirada no tiene premio.");
            this.restarApuesta(apuesta);
        }
    }

    public pagarPremio(apuesta:number ): void {
        const premio = (apuesta * this.multiplicadorApuesta) - apuesta;
        this.casino.modificarSaldo(this.usuario,premio);
        console.log("Usted a ganado un premio. Se ha pagado " + premio);        
    }

    public restarApuesta(apuesta:number){
        this.casino.modificarSaldo(this.usuario, -apuesta);
    }

}