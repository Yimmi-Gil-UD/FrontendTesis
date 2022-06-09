export class LoginDTO{
    id:string;
    correo:string;
    password:string;
    constructor(id:string, correo:string, password:string)
    {
        this.id = id;
        this.correo = correo;
        this.password = password;
    }
}