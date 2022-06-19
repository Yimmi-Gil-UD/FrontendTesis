export class Paciente {
    nombrePaciente:string;
	apellidoPaciente:string;
	numeroIdentificacionP:number;
	idTipoDocumentoP:string;
	fechaNacimiento:Date;
	direccion:string;
	telefono:number;
	idGenero:string;
	idCategoriaDiscapacidad:string;
	idGrupoSanguineo:string;

	constructor(nombrePaciente: string, apellidoPaciente:string,numeroIdentificacionP:number,idTipoDocumentoP:string,fechaNacimiento:Date,direccion:string,telefono:number,idGenero:string,idCategoriaDiscapacidad:string,idGrupoSanguineo:string)
	{
		this.nombrePaciente = nombrePaciente;
		this.apellidoPaciente = apellidoPaciente;
		this.numeroIdentificacionP = numeroIdentificacionP;
		this.idTipoDocumentoP = idTipoDocumentoP;
		this.fechaNacimiento = fechaNacimiento;
		this.direccion = direccion;
		this.telefono = telefono;
		this.idGenero = idGenero;
		this.idCategoriaDiscapacidad = idCategoriaDiscapacidad;
		this.idGrupoSanguineo = idGrupoSanguineo;

	}
}