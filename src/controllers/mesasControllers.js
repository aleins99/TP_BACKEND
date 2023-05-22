import { Mesas } from "../models/models.js";
import { Reservas } from "../models/models.js";
import { Restaurante } from "../models/models.js";
export const getMesas = async (req, res) => {
  const mesas = await Mesas.findAll();
  res.json(mesas);
};

export const postMesas = async (req, res) => {
  const { nombre, idRestaurante, posicionX, posicionY, piso, capacidad } =
    req.body;
  const mesa = await Mesas.create({
    nombre,
    idRestaurante,
    posicionX,
    posicionY,
    piso,
    capacidad,
  });
  res.json(mesa);
};

export const putMesas = async (req, res) => {
  const { nombre, idRestaurante, posicionX, posicionY, piso, capacidad } =
    req.body;
  const { id } = req.params;
  const mesa = await Mesas.update(
    { nombre, idRestaurante, posicionX, posicionY, piso, capacidad },
    { where: { id } }
  );
  res.json(mesa);
};

export const deleteMesas = async (req, res) => {
  const { id } = req.params;
  const mesa = await Mesas.destroy({ where: { id } });
  res.json(mesa);
};

export const mesasDisponibles = async (req, res) => {
  const { idRestaurante, fecha, horario_inicio, horario_fin } = req.body;
  const mesas = await Mesas.findAll({
    where: {
      idRestaurante,
    },
  });
  const reservas = await Reservas.findAll({
    where: {
      idRestaurante,
    },
  });
  /* There is a syntax error in the code. The line `console.log("mesas"mesas);` should have a comma
	between the string and the variable, like this: `console.log("mesas", mesas);`. This line is
	logging the value of the `mesas` variable to the console, along with the string "mesas" for
	context. */
  const mesasDisponibles = mesas.filter((mesa) => {
    return (
      reservas.find(
        (reserva) =>
          reserva.idMesa === mesa.id &&
          (horario_inicio >= reserva.horario_fin ||
            horario_fin <= reserva.horario_inicio) &&
          new Date(fecha).getDate() === new Date(reserva.fecha).getDate()
      ) === undefined
    );
  });

  console.log("mesas", reservas);

  console.log(mesasDisponibles);
  res.json(mesasDisponibles);
};
