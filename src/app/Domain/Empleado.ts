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
            estado: string;
            tipId: number;
            tipo: string;
        };
        fechaCreacion: string;
        direccionDomicilio: string;
        estado: string;
        token?: string;
        base64Img: string;
        censoZona: {
            idCenZona: string;
            estado: string;
            zona: {
                idZona: string;
                zonas: string;
                descripcion: string;
                cantidadEmpleados: string;
                estado: string;
            };
            censo: {
                idCenso: string;
                nomCenso: string;
                fechaIni: string;
                fechaFin: string;
                fechaIniReal: string;
                fechaFinReal: string;
                estado: string;
                creoCenso: {
                    dniEmpleado: string;
                    contrasenia: string;
                    nombres: string;
                    celular: string;
                    correo: string;
                    sexo: string;
                    urlImg: string;
                    fkUsuarioCrea: string;
                    tipoUsuario: {
                        tipId: number;
                        tipo: string;
                        estado: string
                    };
                    fechaCreacion: string;
                    direccionDomicilio: string;
                    estado: string;
                    token: string;
                    base64Img: string;
                    censoZona: string
                }
            };
            empleado: {
                dniEmpleado: number;
                contrasenia: string;
                nombres: string;
                celular: number;
                correo: string;
                sexo: string;
                urlImg: string;
                fkUsuarioCrea: string;
                tipoUsuario: {
                    tipId: string;
                    tipo: string;
                    estado: string
                };
                fechaCreacion: string;
                direccionDomicilio: string;
                estado: string;
                token: string;
                base64Img: string;
                censoZona: string
            }
        }
    }
}