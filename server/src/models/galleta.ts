import { DataTypes } from 'sequelize';
import {sequelize} from '../config/db';  // Asegúrate de tener la conexión correcta con la base de datos

// Definición del modelo Categoria
const Categoria = sequelize.define('Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    schema: 'chew',
    tableName: 'categoria',
    timestamps: false,
});

// Definición del modelo Producto
const Producto = sequelize.define('Producto', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id_categoria',
        },
        allowNull: false,
    }
}, {
    schema: 'chew',
    tableName: 'producto',
    timestamps: false,
});

Producto.belongsTo(Categoria, { foreignKey: 'id_categoria' });
Categoria.hasMany(Producto, { foreignKey: 'id_categoria' });

export { Categoria, Producto };