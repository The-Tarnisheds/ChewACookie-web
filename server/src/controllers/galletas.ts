import { Categoria, Producto } from "../models/galleta";
import { Request, Response } from "express";
import HttpStatusCode from "../utils/http-status-code";
import { errorHandler, CustomError } from "../utils/error_handler";

const getProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await Producto.findAll();
    if (!products) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "No se encontro el producto.",
        success: false,
      });
    }

    res.status(HttpStatusCode.OK).json({
      message: "Fetched products successfully.",
      results: products,
    });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
  }
};

const createProduct = async (req: Request, res: Response): Promise<any> => {
  const { nombre, precio, descripcion, imagen, stock, id_categoria } = req.body;

  try {
    if (!nombre || !precio || !descripcion || !stock || !id_categoria) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Todos los campos son obligatorios.",
        success: false,
      });
    }

    const product = await Producto.findOne({
      where: { nombre },})

      if (product) {
        return res.status(HttpStatusCode.CONFLICT).json({
          message: "El producto ya existe.",
          success: false,
        });
      }

      const newProduct = await Producto.create({
        nombre,
        descripcion,
        precio,
        imagen,
        stock,
        id_categoria,
      });
      res.status(HttpStatusCode.CREATED).json({
        message: "Producto creado exitosamente.",
        result: newProduct,
      });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
    
  }
}

const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const product = await Producto.findByPk(id);
    if (!product) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "Producto no encontrado.",
        success: false,
      });
    }

    await product.destroy();
    res.status(HttpStatusCode.OK).json({
      message: "Producto eliminado exitosamente.",
      success: true,
    });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
  }
}

const editProduct = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { nombre, precio, descripcion, imagen, stock, id_categoria } = req.body;
  try {
    if (!nombre || !precio || !descripcion || !stock || !id_categoria) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Todos los campos son obligatorios.",
        success: false,
      });
    }
    const product = await Producto.findByPk(id);
    if (!product) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "Producto no encontrado.",
        success: false,
      });
    }

    await product.update({
      nombre,
      descripcion,
      precio,
      imagen,
      stock,
      id_categoria,
    });

    await product.save();

    res.status(HttpStatusCode.OK).json({
      message: "Producto actualizado exitosamente.",
      result: product,
      success: true,
    });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
  }
}

const getCategories = async (req: Request, res: Response): Promise<any> => {
  try {
    const categories = await Categoria.findAll({
      attributes: ['id_categoria', 'descripcion'],
      group: ['id_categoria', 'descripcion']
    });

    if (!categories) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "No se encontraron categorías.",
        success: false,
      });
    }

    res.status(HttpStatusCode.OK).json({
      message: "Fetched categories successfully.",
      results: categories,
    });
  } catch (error) {
    errorHandler(error as CustomError | undefined, req, res);
  }
};

export { getProducts, createProduct, deleteProduct, editProduct, getCategories };
