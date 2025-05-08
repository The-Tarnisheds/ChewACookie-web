import { Producto } from "../models/galleta";
import { Request, Response } from "express";
import HttpStatusCode from "../utils/http-status-code";
import { errorHandler, CustomError } from "../utils/error_handler";
import { Comuna, Direccion, Region, Usuario } from "../models/usuario.";
import bcrypt from 'bcryptjs';

const findUserByEmail = async (email : string) => {
    return await Usuario.findOne({where: {email}})
  }

const createUser = async (req: Request, res: Response): Promise<any> =>  {
    const {nombres, apellidos, email, calle, numCalle, telefono, nombre_comuna, pass, pass2} = req.body
    try {

      if(!nombres || !apellidos || !email || !calle || !numCalle || !telefono || !nombre_comuna || !pass || !pass2){
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
      //Encriptar contraseñas
      const hashedPassword = await bcrypt.hash(pass, 10);
      const hashedPassword2 = await bcrypt.hash(pass2, 10);
        
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
            pass: hashedPassword,
            pass2: hashedPassword2
          });
          console.log('Nuevo usuario:', nuevoUsuario.toJSON());


          const nuevaDireccion = await Direccion.create({
            id_usuario: nuevoUsuario.get('id_usuario'),
            calle,
            numero: numCalle,
            id_comuna: comuna?.get('id_comuna'),
            id_region: comuna?.get('id_region'),
          })
        
          res.status(HttpStatusCode.OK).json(
            { mensaje: 'Cuenta creada exitosamente', 
              usuario: nuevoUsuario
            });
            
    } catch (error) {
        errorHandler(error as CustomError | undefined, req, res)
    }
}

const getLocations = async (req: Request, res: Response): Promise<any> =>  {
  try {
      
      const regiones = await Region.findAll()

      const comunas = await Comuna.findAll()

      console.log(regiones)
      res.status(HttpStatusCode.OK).json({
        mensaje: 'Locations fetched succesfully',
        data: {regiones, comunas}
      });

  } catch (error) {
      errorHandler(error as CustomError | undefined, req, res)
  }
}

export {
    createUser,
    getLocations
}