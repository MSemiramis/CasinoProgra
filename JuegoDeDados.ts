// Archivo: JuegoDeDados.ts
import { Casino } from "./Casino";
import * as rls from "readline-sync";
import { Usuario } from "./Usuario";

// Clase base genérica para juegos de dados
export class JuegoDeDados {
  protected casino : Casino;
  protected usuario : Usuario;
  protected apuestaMinima:number = 2;
  protected multiplicarApuesta:number = 1.2;
  dado1: number;
  dado2: number;
  
  constructor(casino :Casino, usuario :Usuario) {
    this.dado1 = 0;
    this.dado2 = 0;
    this.casino = casino;
    this.usuario = usuario;
  }
  
  // Método para tirar los dados, generando valores aleatorios para dado1 y dado2
  public tirarDados(): void {
    this.dado1 = Math.floor(Math.random() * 6) + 1;
    this.dado2 = Math.floor(Math.random() * 6) + 1;
  }
  
  // Método para sumar los valores de los dados
  public sumarDados(): number {
    return this.dado1 + this.dado2;
  }

  public jugarPartida(){
    let apuesta = 0; 
    const saldoUsuario = this.usuario.getSaldo();
    console.log ("inicia el juego de dados");
    while (apuesta > this.apuestaMinima || apuesta > saldoUsuario) { 
        apuesta = rls.questionInt("\nIngrese el monto a apostar: ");
      }
    this.tirarDados();
    this.verificarPartida(apuesta);
  }

  pagarApuesta(apuesta:number){
    console.log("Usted ha ganado la tirada!")
    const premio = apuesta * this.multiplicarApuesta;
    this.casino.modificarSaldo(this.usuario, premio);
  }

  restarSaldo(apuesta:number){
    console.log("Partida perdida")
    this.casino.modificarSaldo(this.usuario, apuesta);
  }

  verificarPartida(apuesta:number){
    let resultado = this.sumarDados();
    if(resultado == 7 ||
      resultado == 11
    ){
      this.pagarApuesta(apuesta)
    }
    else if(resultado == 2 ||
            resultado == 3 ||
            resultado == 12
    ){
      this.restarSaldo(apuesta);
    }else{
      this,this.tirarDados();
      resultado = this.sumarDados();
      if(resultado == 7){
        this.pagarApuesta(apuesta);
      }else{
        this.restarSaldo(apuesta);
      }
    }
  }
}
  