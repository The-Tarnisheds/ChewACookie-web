import { Producto } from "../models/galleta";
import { Request, Response } from "express";
import HttpStatusCode from "../utils/http-status-code";
import { errorHandler, CustomError } from "../utils/error_handler";
import { Comuna, Usuario } from "../models/usuario.";

const findUserByEmail = async (email : string) => {
    return await Usuario.findOne({where: {email}})
  }

const createUser = async (req: Request, res: Response): Promise<any> =>  {
    const {nombres, apellidos, email, telefono, nombre_comuna, pass, pass2} = req.body
    try {
        
        if(!nombres || !apellidos || !email || !telefono || !nombre_comuna || !pass || !pass2){
            return res.status(HttpStatusCode.BAD_REQUEST).json({
              message: 'Todos los datos son obligatorios',
              success: false
            })
          } if (pass !== pass2) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({
              message: 'Las contraseñas no coinciden',
              success: false
            });
          }
          const comuna = await Comuna.findOne({
            where: {nombre_comuna: nombre_comuna}
          })

        const nuevoUsuario = await Usuario.create({
            nombres,
            apellidos,
            email,
            telefono,
            id_region: comuna?.get('id_region'),
            id_comuna: comuna?.get('id_comuna'),
          });
          res.status(HttpStatusCode.OK).json(
            { mensaje: 'Cuenta creada exitosamente', 
              usuario: nuevoUsuario 
            });
            
    } catch (error) {
        errorHandler(error as CustomError | undefined, req, res)
    }
}

export {
    createUser
}