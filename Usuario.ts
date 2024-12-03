
export class Usuario{

    private nombre:string;
    private saldo:number;

    constructor(nombre:string, saldo:number){
        this.nombre = nombre;
        this.saldo = saldo;
    }

    //SETTERS//
    setNombre(nombre:string){
        this.nombre = nombre;
    }
    setSaldo(saldo:number){
        this.saldo = saldo;
    }
    
    //GETTERS//
    getNombre(){
        return this.nombre;
    }
    getSaldo(){
        return this.saldo;
    }

    sumarApuesta(premio:number){
        this.saldo = this.saldo + premio;
    }
    restarApuesta(apuesta:number){
        this.saldo = this.saldo - apuesta;
    }
}