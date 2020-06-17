export class Empleado {
    codigo: string;
    mensaje: string;
    error: boolean;
    data: {
        dniEmpleado: string;
        contrasenia: string;
        nombres: string;
        celular: string;
        correo: string;
        sexo: string;
        urlImg: string;
        fkUsuarioCrea: string;
        tipoUsuario: {
            estado: string,
            tipId: number,
            tipo: string,
        },
        fechaCreacion: string;
        direccionDomicilio: string;
        estado: string;
        token?: string;
        base64Img: string;
        censoZona: string;
    }
}