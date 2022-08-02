export class LogRegistro{

	usuarioId:string;
	accion:string;
	cambio:string;
	fecha:Date;
	hora:string;

	constructor(usuarioId:string,accion:string,cambio:string,fecha:Date,hora:string)
	{
        this.usuarioId=usuarioId;
        this.accion=accion;
        this.cambio=cambio;
        this.fecha=fecha;
        this.hora=hora;
	}

}