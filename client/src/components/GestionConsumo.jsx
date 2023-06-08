import { useState, useEffect } from "react";

export default function GestionConsumo() {
  const [mesas, setMesas] = useState([]);
  const [mesa, setMesa] = useState(0);
  const [mesaDisponible, setMesaDisponible] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState("");
  const [busquedaCliente, setBusquedaCliente] = useState("");
  function statusChanged(event, index) {
    setMesa(() => {
      return event.target.value;
    });
  }

  useEffect(() => {
    fetch("http://localhost:3000/Mesas")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMesas(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (mesa === 0) return;
    fetch(`http://localhost:3000/ConsumoCliente/mesa/${mesa}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        if (data.length === 0) return;
        setMesaDisponible(data.estado === "abierto");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mesa]);
  useEffect(() => {
    fetch(`http://localhost:3000/Producto`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setProductos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:3000/Cliente`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setClientes(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function handleCliente(event) {
    setBusquedaCliente(event.target.value);
  }
  const clientesFiltrados = clientes.filter((cliente) => {
    const cedula = cliente.cedula?.toString();
    const nombre = cliente.nombre?.toLowerCase();
    const apellido = cliente.apellido?.toLowerCase();
    const busqueda = busquedaCliente?.toLowerCase();
    return (
      cedula?.includes(busqueda) ||
      nombre?.includes(busqueda) ||
      apellido?.includes(busqueda)
    );
  });

  return (
    <form>
      <label htmlFor="mesa">Mesa: </label>
      <select name="mesa" id="mesa" onChange={statusChanged}>
        {" "}
        {mesas.map((mesa, index) => (
          <option value={mesa.id} key={mesa.id}>
            {mesa.nombre}
          </option>
        ))}
      </select>
      <br />
      {!mesaDisponible ? (
        <>
          <label htmlFor="cliente">Cliente</label>
          <input
            type="text"
            name="cliente"
            id="cliente"
            value={busquedaCliente}
            onChange={handleCliente}
          />
          <br />
          <ul>
            {clientesFiltrados.map((cliente, index) => (
              <li key={index}>
                {cliente.nombre} {cliente.apellido}
              </li>
            ))}
          </ul>

          <br />

          {productos.length > 0 ? (
            productos.map((producto, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name="producto"
                  id={producto.id}
                  onChange={() => handleOnChange(index)}
                />
                <label htmlFor={producto.id}>{producto.nombre_producto}</label>
              </div>
            ))
          ) : (
            <p>No hay productos</p>
          )}
        </>
      ) : (
        <button type="submit">Cerrar mesa</button>
      )}
    </form>
  );
}
