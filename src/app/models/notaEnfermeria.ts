export class NotaEnfermeria{

    idPaciente:string;
	numeroCuarto:number;
	numeroCama:number;
	fechaNota:Date;
	horaNota:string;
	observacion:string;
	tensionArterialSistolico:number;
	tensionArterialDiastolico:number;
	tensionArterial:string;
	frecuenciaCardiaca:number;
	frecuenciaRespiratoria:number;
	temperatura:number;
	saturacion:number;
	glucometria:number;
	idEnfermera:string;

	constructor(idPaciente:string,numeroCuarto:number,numeroCama:number,fechaNota:Date,horaNota:string,observacion:string,tensionArterialSistolico:number,tensionArterialDiastolico:number,tensionArterial:string,frecuenciaCardiaca:number,frecuenciaRespiratoria:number,temperatura:number,saturacion:number,glucometria:number,idEnfermera:string)
	{
		this.idPaciente = idPaciente;
		this.numeroCuarto = numeroCuarto;
		this.numeroCama = numeroCama;
		this.fechaNota = fechaNota;
		this.horaNota = horaNota;
		this.observacion = observacion;
		this.tensionArterialSistolico = tensionArterialSistolico;
		this.tensionArterialDiastolico = tensionArterialDiastolico;
		this.tensionArterial = tensionArterial;
		this.frecuenciaCardiaca = frecuenciaCardiaca;
		this.frecuenciaRespiratoria = frecuenciaRespiratoria;
		this.temperatura = temperatura;
		this.saturacion = saturacion;
		this.glucometria = glucometria;
		this.idEnfermera = idEnfermera;
	}

}