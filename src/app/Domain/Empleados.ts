import { TipoUsuario } from './TipoUsuario';

export class Empleados {
    dniEmpleado: string;
    contrasenia: string;
    nombres: string;
    celular: number;
    correo: string;
    urlImg: string;
    fkUsuarioCrea: string;
    tipoUsuario: TipoUsuario;
    fechaCreacion: string;
    direccionDomicilio: string;
    estado: string;
    token: string;
    base64Img: string;
    censoZona: string;

}