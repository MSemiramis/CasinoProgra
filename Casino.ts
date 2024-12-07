import { Usuario } from "./Usuario";
import * as fs from "fs";

export class Casino{
    protected usuarios: Usuario [];
    protected contador: number;
    readonly RUTA_DATOS : string = "./datos/casino.json"

    constructor(){
        this.usuarios = [];
        this.contador = 0;
        this.cargarDesdeJSON();
    }
    //Funciones para JSON

    guardarEnJSON(): void {
        if (this.usuarios && this.usuarios.length > 0) {
            const data = {
                usuarios: this.usuarios,
                contador: this.contador,
        };

        fs.writeFileSync(this.RUTA_DATOS, JSON.stringify(data, null, 2), "utf-8");
        
        console.log(`Datos Actualizados.`);
        }else{
            console.error("no hay usuario")
        }
    }

    modificarSaldo(usuario: Usuario, monto: number): void {
        if (!usuario) {
            console.log("Error de ejecución, usuario inválido.");
            return;
        }
        const indice = this.usuarios.findIndex((u) => u.getId() === usuario.getId());
        if (indice === -1) {
            console.log("Usuario no encontrado en el sistema.");
            return;
        }
        const nuevoSaldo = usuario.getSaldo() + monto;
        if (nuevoSaldo < 0) {
            console.log(
                "Usuario sin saldo. Por favor, cargar saldo para seguir jugando en Casino La Gaita."
            );
            this.usuarios[indice].setSaldo(0);
        } else if (nuevoSaldo > 0) {
            console.log("Su saldo actual es " + nuevoSaldo);
            this.usuarios[indice].setSaldo(nuevoSaldo);
        } else {
            console.log(
                "Error en el saldo. Contactar a soporte de Casino La Gaita."
            );
        }
        this.guardarEnJSON();
    }

    verificarUsuario(nombreUsuario: string): Usuario | undefined {
        return this.usuarios.find(
            (u) => u.getNombreUsuario() === nombreUsuario
        );
    }

    cargarDesdeJSON(): void {
        if (fs.existsSync(this.RUTA_DATOS)) {
            const data = JSON.parse(fs.readFileSync(this.RUTA_DATOS, "utf-8"));
            this.usuarios = data.usuarios.map((u: any) => 
              new Usuario(u.id,
                u.nombreUsuario, 
                u.pass, 
                u.saldo
            ));
            this.contador = parseInt(data.contador);
            console.log("Datos cargados correctamente.");
          } else {
            console.warn("No se encontró el archivo de datos. Se inicializa vacío.");
          }
    }

    public generarId(prefijo:string): string {
        this.contador++;
        return prefijo + this.contador; 
    }

    altaUsuario(nombreUsuario: String, pass:String, saldo: number): void {
        const id = this.generarId("U"); 
        const nuevoUsuario = new Usuario(id, nombreUsuario, pass, saldo); 
        this.usuarios.push(nuevoUsuario); 
        console.log(`Usuario ${nombreUsuario} agregada con ID: ${id}`);

        this.guardarEnJSON();

    }

    buscarUsuario(nombreUsuario: string, pass: string): Usuario | undefined {
        return this.usuarios.find(
            (u) => u.getNombreUsuario() === nombreUsuario && u.validarPass(pass)
          );
        }
}


