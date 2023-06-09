import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Producto from "./Producto";
export default function GestionConsumo() {
  const [mesas, setMesas] = useState([]);
  const [mesa, setMesa] = useState(0);
  const [mesaDisponible, setMesaDisponible] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [busquedaCliente, setBusquedaCliente] = useState("hola");
  const checkboxRef = useRef();
  const [productos, setProductos] = useState([]);
  const [productosMesa, setProductosMesa] = useState([]);
  const [checkCliente, setCheckCliente] = useState({
    check: false,
    id: 0,
  });

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
        if (data.length === 0) return;
        setMesaDisponible(data.estado === "abierto");
        if (data.estado === "abierto") {
          setValue("estado", data.estado);
          setValue("cliente", data.idCliente);
          setValue("mesa", data.idMesa);
          setValue("total", data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mesa]);

  useEffect(() => {
    fetch(`http://localhost:3000/Cliente`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
    const busqueda = busquedaCliente.split(" ");
    const nombreBusqueda =
      busqueda.length > 2 ? busqueda[0] + " " + busqueda[1] : busqueda[0];
    const apellidoBusqueda =
      nombreBusqueda.split(" ").length > 1 ? busqueda[2] : busqueda[1];

    return (
      cedula?.includes(busqueda[0]) ||
      (nombre?.includes(nombreBusqueda?.toLowerCase()) &&
        apellido?.includes(apellidoBusqueda?.toLowerCase())) ||
      (nombre?.includes(nombreBusqueda) && busqueda.length <= 1)
    );
  });
  const handleClientesSeleccionados = (e) => {
    for (const iterator of checkboxRef.current.children) {
      if (iterator.localName == "input") {
        if (checkCliente.check == true && checkCliente.id != iterator.value) {
          iterator.checked = false;
        } else if (
          checkCliente.check === true &&
          checkCliente.id == iterator.value &&
          iterator.checked === false
        )
          setCheckCliente({ check: false, id: 0 });
        if (iterator.checked == true && checkCliente.check === false) {
          setCheckCliente({ check: true, id: iterator.value });
        }
      }
    }
  };
  console.log(productosMesa);
  const handleSubmit = (e) => {
    e.preventDefault();
    const checkedCheckboxes = productos.filter((checkbox) =>
      productosMesa.includes(checkbox.id.toString())
    );
    console.log(checkedCheckboxes);
  };
  return (
    <form onSubmit={handleSubmit}>
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
          {busquedaCliente.length > 4 ? (
            <ul ref={checkboxRef} onChange={handleClientesSeleccionados}>
              {clientesFiltrados.map((cl, index) => (
                <>
                  <label>
                    {cl.nombre} {cl.apellido} {cl.cedula}
                  </label>
                  <input
                    key={cl.id}
                    type="checkbox"
                    name="cliente"
                    value={cl.id}
                  />
                  <br />
                </>
              ))}
            </ul>
          ) : (
            <div>No se encuentra el Cliente</div>
          )}

          <br />
          <Producto
            productos={productos}
            setProductos={setProductos}
            setProductosMesa={setProductosMesa}
            productosMesa={productosMesa}
          />
          <p></p>
        </>
      ) : (
        <button type="submit">Cerrar mesa</button>
      )}
      <input type="submit" value="Cargar" />
    </form>
  );
}
