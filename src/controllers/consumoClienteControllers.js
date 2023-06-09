import {
  ConsumoClienteCabecera,
  ConsumoClienteDetalle,
  Producto,
} from "../models/models.js";

export const getConsumoClienteCabecera = async (req, res) => {
  const ConsumoClienteCabeceras = await ConsumoClienteCabecera.findAll();
  res.json(ConsumoClienteCabeceras);
};
export const postConsumoClienteCabecera = async (req, res) => {
  const { idMesa, idCliente, total } = req.body;
  const estado = "cerrado";
  const consumoClienteCabecera = await ConsumoClienteCabecera.create({
    idCliente,
    idMesa,
    total,
    estado,
  });
  res.json(consumoClienteCabecera);
};
export const putConsumoClienteCabecera = async (req, res) => {
  const { idMesa, idCliente, estado } = req.body;
  const { id } = req.params;
  const consumoClienteCabecera = await ConsumoClienteCabecera.update(
    { idCliente, estado },
    { where: { id } }
  );
  res.json(consumoClienteCabecera);
};
export const deleteConsumoClienteCabecera = async (req, res) => {
  const { id } = req.params;
  const consumoClienteCabecera = await ConsumoClienteCabecera.destroy({
    where: { id },
  });
  const consumoClienteDetalle = await ConsumoClienteDetalle.destroy({
    where: { idConsumoClienteCabecera: id },
  });

  res.json(consumoClienteCabecera);
};
export const deleteConsumoClienteDetalle = async (req, res) => {
  const { id } = req.params;
  const consumoClienteDetalle = await ConsumoClienteDetalle.destroy({
    where: { id },
  });
  res.json(consumoClienteDetalle);
};
// get all the products buy a client
export const getProductosMesa = async (req, res) => {
  const { idMesa } = req.params;
  const mesaConsumoCliente = await ConsumoClienteCabecera.findAll({
    where: { idMesa },
  });
  let productos = [];
  for (const item of mesaConsumoCliente) {
    const consumoClienteDetalle = await ConsumoClienteDetalle.findAll({
      where: { idConsumoClienteCabecera: item.id },
    });
    for (const detalle of consumoClienteDetalle) {
      const producto = await Producto.findByPk(detalle.idProducto);
      productos.push(producto);
    }
  }

  res.json(productos);
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
    const total = await calcularTotalConsumicion(json, req.params);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function calcularTotalConsumicion(json, params) {
  try {
    let total = 0;

    const { idConsumoClienteCabecera } = params;
    // get the total of the consumicion

    let id = idConsumoClienteCabecera;
    const consumoClienteCabecera = await ConsumoClienteCabecera.findByPk(id);
    total = consumoClienteCabecera.total;
    total = parseInt(total);
    for (const item of json) {
      const precio = item.precio_venta;
      const idProducto = item.id;
      const cantidad = item.quantity;
      total += precio * cantidad;
      const consumoClienteDetalle = await ConsumoClienteDetalle.create({
        idProducto,
        idConsumoClienteCabecera,
        cantidad,
      });
      const consumoClienteCabecera = await ConsumoClienteCabecera.update(
        { total },
        { where: { id } }
      );
    }
    return total;
  } catch (error) {
    throw new Error(
      "Error al calcular el total de la consumición: " + error.message
    );
  }
}
