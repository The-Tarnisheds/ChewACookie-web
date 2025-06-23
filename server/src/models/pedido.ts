import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import { Usuario } from './usuario.'; 
import { Producto } from './galleta';

const Pedido = sequelize.define('pedido', {
    id_pedido:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING(50),
    }
}, {
    schema: 'dbo',
    tableName: 'pedido',
    timestamps: false,
})

const DetallePedido = sequelize.define('Detalle_pedido', {
    id_detalle_pedido:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'id_pedido'
        }
    },
    id_producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'id_producto'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING(50),
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    schema: 'dbo',
    tableName: 'Detalle_pedido',
    timestamps: false,
})

const Promo = sequelize.define('Promocion', {
    id_promocion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fecha_vigencia: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    puntos:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    schema: 'dbo',
    tableName: 'Promocion',
    timestamps: false,
})

Pedido.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
});
DetallePedido.belongsTo(Pedido, {
    foreignKey: 'id_pedido'
});
Promo.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
})

export {
    Pedido,
    DetallePedido,
    Promo
 };