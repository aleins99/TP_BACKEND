import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ClienteForm({
  clientesState,
  mesaCliente,
  checkCliente,
  setCheckCliente,
}) {
  const checkboxRef = useRef();

  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [clientes, setClientes] = clientesState;
  const navigate = useNavigate();
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
  const handleAgregarCliente = () => {
    navigate("/agregarCliente");
  };
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
  const handleNombreCliente = () => {
    console.log("mesacliente", mesaCliente);
    if (mesaCliente === undefined) return "";
    console.log(mesaCliente === undefined);
    const cliente = clientes.find((cliente) => cliente.id === mesaCliente);
    return cliente.nombre + " " + cliente.apellido;
  };

  return (
    <>
      <label htmlFor="cliente">Cliente</label>
      <input
        type="text"
        name="cliente"
        id="cliente"
        value={busquedaCliente || handleNombreCliente()}
        onChange={handleCliente}
      />
      <br />
      {(busquedaCliente.length > 4 || mesaCliente == false) && (
        <ul ref={checkboxRef} onChange={handleClientesSeleccionados}>
          {clientesFiltrados.map((cl, index) => (
            <>
              <label>
                {cl.nombre} {cl.apellido} {cl.cedula}
              </label>
              <input key={cl.id} type="checkbox" name="cliente" value={cl.id} />
              <br />
            </>
          ))}
        </ul>
      )}
      {busquedaCliente.length > 4 && clientesFiltrados.length == 0 && (
        <>
          <h3>No se encuentra su cliente</h3>
          <button onClick={handleAgregarCliente}>Agregar Cliente</button>
        </>
      )}
      <br />
    </>
  );
}
