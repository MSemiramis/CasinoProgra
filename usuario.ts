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
    public setNombre(nombreUsuario:string){
        this.nombreUsuario = nombreUsuario;
    }

    public setSaldo(saldo:number){
        this.saldo = saldo;
    }

    public setId(id:string){
        this.id = id;
    }

    public setPass(pass:string){
        this.pass = pass;
    }
    //GETTERS//
    public getId(){
        return this.id;
    }

    public getNombreUsuario(){
        return this.nombreUsuario;
    }
    
    public getSaldo(){
        return this.saldo;
    }

    public validarPass(pass: string): boolean {
        return this.pass === pass;
    }
}