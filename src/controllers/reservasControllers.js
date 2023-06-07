import { Reservas } from "../models/models.js";
import { Cliente } from "../models/models.js";
export const getReservas = async (req, res) => {
  const reservas = await Reservas.findAll();
  res.json(reservas);
};

export const postReservas = async (req, res) => {
  const {
    idRestaurante,
    idMesa,
    fecha,
    horario_inicio,
    horario_fin,
    nombre_cliente,
    apellido_cliente,
    cedula_cliente,

    capacidad,
  } = req.body;
  let idCliente = null;
  let cliente = await Cliente.findAll({
    where: {
      cedula: cedula_cliente,
    },
  });
  if (cliente.length == 0) {
    cliente = await Cliente.create({
      nombre: nombre_cliente,
      apellido: apellido_cliente,
      cedula: cedula_cliente,
    });
    idCliente = cliente.id;
  } else {
    idCliente = cliente[0].id;
  }

  console.log(cliente);

  const reserva = await Reservas.create({
    idRestaurante,
    idMesa,
    fecha,
    horario_inicio,
    horario_fin,
    idCliente,
    capacidad,
  });
  res.json(reserva);
};

export const putReservas = async (req, res) => {
  const { idRestaurante, idMesa, fecha, horario, idCliente, capacidad } =
    req.body;
  const { id } = req.params;
  const reserva = await Reservas.update(
    { idRestaurante, idMesa, fecha, horario, idCliente, capacidad },
    { where: { id } }
  );
  res.json(reserva);
};

export const deleteReservas = async (req, res) => {
  const { id } = req.params;
  const reserva = await Reservas.destroy({ where: { id } });
  res.json(reserva);
};
