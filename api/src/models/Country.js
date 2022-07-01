const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ID: {
      type: DataTypes.STRING(3),
        primaryKey: true,
        allowNull: false,
    },              
    Bandera: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'undefined'
      
    }, 
    Continente: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    Capital: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'undefined'
    }, 
    Subregion: {
      type: DataTypes.STRING
    },
    Area: {
      type: DataTypes.FLOAT
    },
    Poblacion: {
      type: DataTypes.INTEGER
    }
    });
};
