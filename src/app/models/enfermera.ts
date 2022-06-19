export class Enfermera {
    nombre:string;
	apellido:string;
	idTipoDocumentoE:string;
	numeroIdentificacion:number;
	correo:string;
	password:string;
	idGenero:string;
	idRol:string;

    constructor(nombre:string, apellido:string, idTipoDocumentoE:string, numeroIdentificacion:number,correo:string,password:string,idGenero:string,idRol:string)
    {
        this.nombre = nombre;
        this.apellido = apellido;
        this.idTipoDocumentoE = idTipoDocumentoE;
        this.numeroIdentificacion = numeroIdentificacion;
        this.correo = correo;
        this.password = password;
        this.idGenero = idGenero;
        this.idRol = idRol;
    }


}