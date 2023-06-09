import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Producto from "./Producto";
export default function GestionConsumo() {
  const [mesas, setMesas] = useState([]);
  const [mesa, setMesa] = useState(0);
  const [mesaDisponible, setMesaDisponible] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const checkboxRef = useRef();
  const [productos, setProductos] = useState([]);
  const [mesaCliente, setMesaCliente] = useState(undefined);
  const [productosMesa, setProductosMesa] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
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
        console.log(data);
        setMesas(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log("mesa", mesa);
    setMesaCliente(undefined);
    if (mesa === 0) return;
    fetch(`http://localhost:3000/ConsumoCliente/mesa/${mesa}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);

        if (data.length === 0) return;
        console.log(data[0]);
        setMesaDisponible(data[0].estado == "abierto");
        if (data[0].estado == "cerrado") {
          setMesaCliente(data[0].idCliente);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mesa]);
  useEffect(() => {
    if (mesaDisponible === false) {
      console.log("holaa");
      fetch(`http://localhost:3000/ConsumoCliente/mesa/${mesa}/productos`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("data", data);
          setProductosMesa(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
      productosSeleccionados.includes(checkbox.id.toString())
    );
    if (mesaDisponible === false) {
      fetch(`http://localhost:3000/ConsumoCliente/mesa/${mesa}/consumo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCliente: checkCliente.id,
          estado: "cerrado",
        }),
      }).then((response) => {
        return response.json();
      });
      return;
    }
    fetch("http://localhost:3000/ConsumoCliente/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idMesa: mesa,
        idCliente: checkCliente.id,
        estado: "cerrado",
        total: 0,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        fetch(`http://localhost:3000/ConsumoCliente/mesa/${data.id}/consumo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkedCheckboxes),
        }).then((response) => {
          return response.json();
        });
      });

    console.log(checkedCheckboxes);
  };
  const handleNombreCliente = () => {
    if (mesaCliente === undefined) return "";
    console.log(mesaCliente);
    const cliente = clientes.find((cliente) => cliente.id === mesaCliente);
    return cliente.nombre + " " + cliente.apellido;
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

      <label htmlFor="cliente">Cliente</label>
      <input
        type="text"
        name="cliente"
        id="cliente"
        value={busquedaCliente || handleNombreCliente()}
        onChange={handleCliente}
      />
      <br />
      {busquedaCliente.length > 4 && (
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
      {mesaDisponible === false && (
        <>
          <label htmlFor="estado">Estado</label>
          <select name="estado" id="estado">
            <option value="abierto">Abierto</option>
            <option value="cerrado">Cerrado</option>
          </select>
          {productosMesa.map((producto) => (
            <div key={producto.id}>
              <label htmlFor="producto">{producto.nombre_producto}</label>
              <input
                type="checkbox"
                name="producto"
                id="producto"
                disabled
                checked
                value={producto.id}
              />
            </div>
          ))}
        </>
      )}

      <br />
      <Producto
        productos={productos}
        setProductos={setProductos}
        setProductosMesa={setProductosSeleccionados}
        productosMesa={productosSeleccionados}
      />

      <input type="submit" value="Cargar" />
    </form>
  );
}
