const { DataTypes } = require('sequelize');
const {UUIDV4} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    ID: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
        
    },              
    Dificultad: {
      type: DataTypes.INTEGER,
      someAttribute : {
        min: 1.0, 
        max: 5.0
      } 
    }, 
    Duracion: {
      type: DataTypes.STRING,
    }, 
    Temporada: {
        type: DataTypes.ENUM(
            "Summer",
            "Winter",
            "Autumn",
            "Spring",
        )
    }
    });
};
