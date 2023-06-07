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

export const ConsumoClienteCabecera = sequelize.define("Consumo_Cliente_Mesa", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idMesa: {
    type: Sequelize.INTEGER,
  },
  idCliente: {
    type: Sequelize.INTEGER,
  },
  estado: {
    type: Sequelize.STRING,
  },
  total: {
    type: Sequelize.INTEGER,
  },
  fecha_inicio: {
    type: Sequelize.DATE,
  },
  fecha_fin: {
    type: Sequelize.DATE,
  },
  horario_inicio: {
    type: Sequelize.STRING,
  },
  horario_fin: {
    type: Sequelize.STRING,
  },
});

// creame una tabla que se llame consumo_cliente_detalle
// que tenga un id, idConsumoClienteCabecera, idProducto, cantidad
export const ConsumoClienteDetalle = sequelize.define(
  "Consumo_Cliente_Detalle",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idConsumoClienteCabecera: {
      type: Sequelize.INTEGER,
    },
    idProducto: {
      type: Sequelize.INTEGER,
    },
    cantidad: {
      type: Sequelize.INTEGER,
    },
  }
);
