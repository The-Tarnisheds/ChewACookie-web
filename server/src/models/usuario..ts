import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Region = sequelize.define('region', {
    id_region:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    nombre_region: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    schema: 'dbo',
    tableName: 'region',
    timestamps: false,
})

const Comuna = sequelize.define('comuna', {
    id_comuna:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    nombre_comuna: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    id_region:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Region,
            key: 'id_region'
          }
    },
}, {
    schema: 'dbo',
    tableName: 'comuna',
    timestamps: false,
})

const Usuario = sequelize.define('usuario', {
    id_usuario:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pass:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    id_region:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Region,
            key: 'id_region'
          }
    },
    id_comuna:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Comuna,
            key: 'id_comuna'
          }
    },
}, {
    schema: 'dbo',
    tableName: 'usuario',
    timestamps: false,
});

const Direccion = sequelize.define('direccion', {
    id_direccion:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id_usuario'
        }
    },
    calle: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    id_comuna: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Comuna,
            key: 'id_comuna'
    }},
    id_region: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Region,
            key: 'id_region'
        }
    },
}, {
    schema: 'dbo',
    tableName: 'direccion',
    timestamps: false,
});


Region.hasMany(Comuna, {
    foreignKey: 'id_region'
});
Comuna.belongsTo(Region, {
    foreignKey: 'id_region'
});
Comuna.hasMany(Usuario, {
    foreignKey: 'id_comuna'
});
Usuario.belongsTo(Comuna, {
    foreignKey: 'id_comuna'
});
Region.hasMany(Usuario, {
    foreignKey: 'id_region'
});
Usuario.belongsTo(Region, {
    foreignKey: 'id_region'
});
Usuario.hasMany(Direccion, {
    foreignKey: 'id_usuario'
});
Direccion.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
});

export {
    Usuario,
    Region,
    Comuna,
    Direccion
 };