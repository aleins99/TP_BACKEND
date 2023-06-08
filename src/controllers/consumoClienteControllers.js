import {
  ConsumoClienteCabecera,
  ConsumoClienteDetalle,
} from "../models/models.js";

export const getConsumoClienteCabecera = async (req, res) => {
  const ConsumoClienteCabeceras = await ConsumoClienteCabecera.findAll();
  res.json(ConsumoClienteCabeceras);
};
export const postConsumoClienteCabecera = async (req, res) => {
  const { fecha, clienteId } = req.body;
  const ConsumoClienteCabecera = await ConsumoClienteCabecera.create({
    fecha,
    clienteId,
  });
  res.json(ConsumoClienteCabecera);
};
export const putConsumoClienteCabecera = async (req, res) => {
  const { idMesa, idCliente, total } = req.body;
  const { id } = req.params;
  const ConsumoClienteCabecera = await ConsumoClienteCabecera.update(
    { fecha, clienteId },
    { where: { id } }
  );
  res.json(ConsumoClienteCabecera);
};
export const getConsumoMesa = async (req, res) => {
  const { idMesa } = req.params;
  const mesaConsumoCliente = await ConsumoClienteCabecera.findAll({
    where: { idMesa },
  });
  res.json(mesaConsumoCliente);
};
