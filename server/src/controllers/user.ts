import { Producto } from "../models/galleta";
import { Request, Response } from "express";
import HttpStatusCode from "../utils/http-status-code";
import { errorHandler, CustomError } from "../utils/error_handler";
import { Comuna, Direccion, Region, Usuario } from "../models/usuario.";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/usuario.";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

const findUserByEmail = async (email: string) => {
  return await Usuario.findOne({ where: { email } });
};

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

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

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Usuario o contraseña incorrectas ",
      });
    }

    const isMatch = await bcrypt.compare(password, user.get("pass") as string);
    if (!isMatch) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Usuario o contraseña incorrectas"
      });
    }

    const address = await Direccion.findOne({
      where: {
      id_usuario: user.get("id_usuario")},
    });

    const region = await Region.findOne({
      where: {id_region: address?.get("id_region")},
    });
    const comuna = await Comuna.findOne({
      where: {id_comuna: address?.get("id_comuna")},
    });

    const isAdmin = await Admin.findOne({ where: { email } });


    const userData = {
      nombre: toTitleCase(user.get("nombre") as string),
      apellidos: toTitleCase(user.get("apellidos") as string),
      email: user.get("email"),
      telefono: user.get("telefono"),
      direccion: {
        calle: address?.get("calle"),
        numero: address?.get("numero"),
        comuna: comuna?.get("nombre_comuna"),
        region: region?.get("nombre_region"),
      },
      isAdmin: !!isAdmin,
    }

    const tokenPayload = {
      id: user.get("id_usuario"),
      isAdmin: Boolean(isAdmin),
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string, { expiresIn: "2h" });


    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Login exitoso para:" + email,
      user: userData,
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

const editUserPersonalData = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  const { nombre, apellidos, telefono, newEmail } = req.body;

  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: "No autorizado" });
  }

  try {
    if (!nombre || !apellidos || !telefono || !newEmail) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Todos los datos son obligatorios",
        success: false,
      });
    }

    const user = await Usuario.findOne({ where: { id_usuario: userId } }); 

    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "Usuario no encontrado",
        success: false,
      });
    }

    user.update({
      nombre,
      apellidos,
      email: newEmail,
      telefono,
    });

    await user.save();

    res.status(HttpStatusCode.OK).json({
      mensaje: "Usuario actualizado exitosamente",
      usuario: user,
    });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
  }
};
export { createUser, getLocations, loginUser, editUserPersonalData };
