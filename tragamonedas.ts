import { leerTXT } from "./utils/utils";
import { Juego } from "./Juego";
import { Usuario } from "./Usuario";
import { Casino } from "./Casino";

export abstract class Tragamonedas implements Juego {

    protected simbolos: any [] = ["9", "10", "J", "Q", "K", "A"] ;
    protected minApuesta:number;
    protected multiplicadorApuesta:number;
    protected casino :Casino;
    protected usuario : Usuario;

    constructor(minApuesta:number, multiplicadorApuesta:number){
        this.simbolos = this.simbolos;
        this.minApuesta = minApuesta;
        this.multiplicadorApuesta = multiplicadorApuesta;
    }

    //METODOS//
    abstract jugar(usuario: Usuario, apuesta :number): void;
    abstract pagarPremio(apuesta:number ): void;
    abstract restarApuesta(apuesta:number): void;

    public leerReglamento(){
        leerTXT('./instructivos/tragamonedas.txt');
    }

    //Generador de Matriz para tragamonedas//
    public generarMatriz(){
        let salida:string [][] = [];

        for(let i=0; i<3; i++ ){
            let fila:string [] = [];
            for(let j=0; j<5; j++){
                let indice = Math.floor(Math.random()*this.simbolos.length);
                fila.push(this.simbolos[indice]);
            }
        salida.push(fila);
        }
        return salida;
    }

    //SETTERS//
    public setMinApuesta(minApuesta:number){
        this.minApuesta = minApuesta;
    }
    public setMultiplicadorApuesta(multiplicadorApuesta:number){
        this.multiplicadorApuesta = multiplicadorApuesta;
    }
    setUsuario (usuario:Usuario){
        this.usuario = usuario;
    }
    setCasino(casino:Casino){
        this.casino = casino;
    }

    //GETTER
    public getApuestaMinima():number{
        return this.minApuesta;
    }
    public getMultiplicadorApuesta(){
        return this.multiplicadorApuesta;
    }
    getUsuario(){
        return this.usuario;
    }
    getCasino(){
        return this.casino;
    }


}