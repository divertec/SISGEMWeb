export class Censo {
    idCenso: number;
    nomCenso: string;
    fechaIni: string;
    fechaFin: string;
    fechaIniReal: string;
    fechaFinReal: string;
    estado: string;;
    creoCenso: {
        dniEmpleado: string;
        contrasenia: string;
        nombres: string;
        celular: string;
        correo: string;
        sexo: string;
        urlImg: string;
        fkUsuarioCrea: number;
        tipoUsuario: {
            tipId: number;
            tipo: string;
            estado: number
        };
        fechaCreacion: string;
        direccionDomicilio: string;
        estado: string;
        token: string;
        base64Img: string;
        censoZona: string;
    }
}