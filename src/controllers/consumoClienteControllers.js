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

export const getTotalConsumicionMesa = async (req, res) => {
  try {
    const json = req.body;
    const total = await calcularTotalConsumicion(json,req.params);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function calcularTotalConsumicion(json,params) {
  try {
    let total = 0;
    const {idConsumoClienteCabecera} =params
    for (const item of json) {
      const precio = item.precio_venta;
      const idProducto = item.id;
      const cantidad = item.quantity;
      total += precio * cantidad;
      const consumoClienteDetalle = await ConsumoClienteDetalle.create({
        idProducto,
        idConsumoClienteCabecera,
        cantidad
      });
    }
    return total;
  } catch (error) {
    throw new Error('Error al calcular el total de la consumición: ' + error.message);
  }
}