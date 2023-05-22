import Sequelize from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite3",
});

export const Restaurante = sequelize.define("Restaurante", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  direccion: {
    type: Sequelize.STRING,
  },
});

export const Cliente = sequelize.define("Cliente", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cedula: {
    type: Sequelize.STRING,
    unique: true,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  apellido: {
    type: Sequelize.STRING,
  },
});

export const Mesas = sequelize.define("Mesas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: Sequelize.STRING,
  },
  idRestaurante: {
    type: Sequelize.INTEGER,
  },
  posicionX: {
    type: Sequelize.INTEGER,
  },
  posicionY: {
    type: Sequelize.INTEGER,
  },
  piso: {
    type: Sequelize.INTEGER,
  },
  capacidad: {
    type: Sequelize.INTEGER,
  },
});

export const Reservas = sequelize.define("Reservas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idRestaurante: {
    type: Sequelize.INTEGER,
  },
  idMesa: {
    type: Sequelize.INTEGER,
  },
  fecha: {
    type: Sequelize.DATE,
  },
  horario_inicio: {
    type: Sequelize.STRING,
  },
  horario_fin: {
    type: Sequelize.STRING,
  },
  idCliente: {
    type: Sequelize.INTEGER,
  },
  capacidad: {
    type: Sequelize.INTEGER,
  },
});
