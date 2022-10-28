const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      sprite: {
        type: DataTypes.STRING,
        defaultValue:
          "https://cdn.discordapp.com/emojis/891059618208444437.webp?size=96&quality=lossless",
      },
      hp: {
        type: DataTypes.INTEGER,
        defaultValue: 500,
      },
      attack: {
        type: DataTypes.INTEGER,
        defaultValue: 25,
      },
      defense: {
        type: DataTypes.INTEGER,
        defaultValue: 25,
      },
      speed: {
        type: DataTypes.INTEGER,
        defaultValue: 50,
      },
      height: {
        type: DataTypes.FLOAT,
        defaultValue: 5,
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: 500,
      },
    },
    { timestamps: false }
  );
};
