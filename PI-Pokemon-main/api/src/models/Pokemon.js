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
          "https://i.pinimg.com/550x/dd/20/84/dd208480c6937eb68a91f73df5ca904a.jpg",
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
      created: {
        type: DataTypes.STRING,
        defaultValue: "db",
      },
    },
    { timestamps: false }
  );
};
