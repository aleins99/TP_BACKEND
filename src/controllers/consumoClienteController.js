import {
  ConsumoClienteCabecera,
  ConsumoClienteDetalle,
} from "../models/models";

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
