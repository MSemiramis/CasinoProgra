
export class Usuario{

    protected id: String;
    protected nombreUsuario:String;
    protected pass : String;
    protected saldo:number;

    constructor(id: String, nombreUsuario:String, pass:String, saldo:number){
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.saldo = saldo;
        this.pass = pass;
    }

    //SETTERS//
    setNombre(nombreUsuario:string){
        this.nombreUsuario = nombreUsuario;
    }
    setSaldo(saldo:number){
        this.saldo = saldo;
    }
    setId(id:string){
        this.id = id;
    }
    setPass(pass:string){
        this.pass = pass;
    }
    //GETTERS//
    getId(){
        return this.id;
    }
    getNombreUsuario(){
        return this.nombreUsuario;
    }
    
    getSaldo(){
        return this.saldo;
    }

    public validarPass(pass: string): boolean {
        return this.pass === pass;
    }
}