
export class NotaEnfermeriaDTO {

    id: string;
    idPaciente: string;
    numeroCuarto: string;
    numeroCama: string;
    fechaNota: Date;
    horaNota: string;
    observacion: string;
    tensionArterialSistolico: number;
    tensionArterialDiastolico: number;
    tensionArterial: string;
    frecuenciaCardiaca: number;
    frecuenciaRespiratoria: number;
    temperatura:number;
    saturacion:number;
    glucometria: number;
    idEnfermera: string;
    nombrePaciente: string;
    apellidoPaciente: string;
    documentoPaciente: number;
    nombreEnfermera: string;
    apellidoEnfermera: string;
    documentoEnfermera:number;


}