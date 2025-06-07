import { Producto } from "../models/galleta";
import { Request, Response } from "express";
import HttpStatusCode from "../utils/http-status-code";
import { errorHandler, CustomError } from "../utils/error_handler";
import { Comuna, Direccion, Region, Usuario } from "../models/usuario.";
import bcrypt from "bcryptjs";

const findUserByEmail = async (email: string) => {
  return await Usuario.findOne({ where: { email } });
};

const createUser = async (req: Request, res: Response): Promise<any> => {
  const {
    nombre,
    apellidos,
    email,
    calle,
    numCalle,
    telefono,
    nombre_comuna,
    pass,
    pass2,
  } = req.body;
  try {
    if (
      !nombre ||
      !apellidos ||
      !email ||
      !calle ||
      !numCalle ||
      !telefono ||
      !nombre_comuna ||
      !pass ||
      !pass2
    ) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Todos los datos son obligatorios",
        success: false,
      });
    }
    if (pass !== pass2) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Las contraseñas no coinciden",
        success: false,
      });
    }

    const user = await findUserByEmail(email);

    if (user) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Usuario ya existe",
        success: false,
      });
    }
    //Encriptar contraseñas
    const hashedPassword = await bcrypt.hash(pass, 10);
    const hashedPassword2 = await bcrypt.hash(pass2, 10);

    const comuna = await Comuna.findOne({
      where: { nombre_comuna: nombre_comuna },
    });

    const nuevoUsuario = await Usuario.create({
      nombre,
      apellidos,
      email,
      telefono,
      id_region: comuna?.get("id_region"),
      id_comuna: comuna?.get("id_comuna"),
      pass: hashedPassword,
    });
    console.log("Nuevo usuario:", nuevoUsuario.toJSON());

    const nuevaDireccion = await Direccion.create({
      id_usuario: nuevoUsuario.get("id_usuario"),
      calle,
      numero: numCalle,
      id_comuna: comuna?.get("id_comuna"),
      id_region: comuna?.get("id_region"),
    });

    res
      .status(HttpStatusCode.OK)
      .json({ mensaje: "Cuenta creada exitosamente", usuario: nuevoUsuario });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
  }
};

const getLocations = async (req: Request, res: Response): Promise<any> => {
  try {
    const regiones = await Region.findAll();

    const comunas = await Comuna.findAll();

    console.log(regiones);
    res.status(HttpStatusCode.OK).json({
      mensaje: "Locations fetched succesfully",
      data: { regiones, comunas },
    });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
  }
};

// Controlador para el Login.
const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    console.log("Intento de login con:", email); // Log para depuración

    if (!email || !password) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Email y contraseña son requeridos",
      });
    }

    const user = await Usuario.findOne({
      where: { email },
      include: [
        {
          model: Direccion,
          include: [
            {
              model: Comuna,
              include: [Region],
            },
          ],
        },
      ],
    });

    if (!user) {
      console.log("Usuario no encontrado:", email);
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    console.log("Usuario encontrado:", user.get("email"));

    const isMatch = await bcrypt.compare(password, user.get("pass") as string);
    if (!isMatch) {
      console.log("Contraseña no coincide para:", email);
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const userData = user.get({ plain: true });
    delete userData.pass;

    console.log("Login exitoso para:", email);
    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Inicio de sesión exitoso",
      user: userData,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

export { createUser, getLocations, loginUser };
