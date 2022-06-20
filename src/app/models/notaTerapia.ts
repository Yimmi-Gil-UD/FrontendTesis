export class NotaTerapia {

     idPaciente:string;
	 objetivo:string;
	 estructuraCorporal:string;
	 funcionCorporal:string;
	 pronostico:string;
	 planTrabajo:String;
	 fechaNotaTerapia:Date;
	 horaNotaTerapia:string;
	 observacion:string;
	 idTipoTerapia:string;
	 idEnfermera:string;

    constructor(idPaciente:string,objetivo:string,estructuraCorporal:string,funcionCorporal:string,pronostico:string,planTrabajo:string,fechaNotaTerapia:Date,horaNotaTerapia:string,observacion:string,idTipoTerapia:string,idEnfermera:string)
    {
        this.idPaciente = idPaciente;
        this.objetivo = objetivo;
        this.estructuraCorporal = estructuraCorporal;
        this.funcionCorporal = funcionCorporal;
        this.pronostico = pronostico;
        this.planTrabajo = planTrabajo;
        this.fechaNotaTerapia = fechaNotaTerapia;
        this.horaNotaTerapia = horaNotaTerapia;
        this.observacion = observacion;
        this.idTipoTerapia = idTipoTerapia;
        this.idEnfermera = idEnfermera;
    }

}