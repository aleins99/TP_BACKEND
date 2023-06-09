import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Producto from "./Producto";
import ClienteForm from "./ClienteForm";
export default function GestionConsumo() {
  const [mesas, setMesas] = useState([]);
  const [mesa, setMesa] = useState(0);
  const [mesaDisponible, setMesaDisponible] = useState(true);
  const clientesState = useState([]);
  const [productos, setProductos] = useState([]);
  const [mesaCliente, setMesaCliente] = useState(undefined);
  const [productosMesa, setProductosMesa] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [checkCliente, setCheckCliente] = useState({
    check: false,
    id: 0,
  });
  const [idConsumocabecera, setIdConsumocabecera] = useState(0);
  const [total, setTotal] = useState(0);
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
        setMesa(data[0].id);
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
          setTotal(data[0].total);
          setIdConsumocabecera(data[0].id);
          setCheckCliente({ check: true, id: data[0].idCliente });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mesa]);
  useEffect(() => {
    if (mesaDisponible == false) {
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
  }, [mesaDisponible]);

  console.log(productosMesa);
  const handleSubmit = (e) => {
    e.preventDefault();
    const checkedCheckboxes = productos.filter((checkbox) =>
      productosSeleccionados.includes(checkbox.id.toString())
    );
    const form = e.target;
    const data = new FormData(form);
    if (mesaDisponible === false) {
      //
      const estado = data.get("estado");
      if (estado == "abierto") {
        fetch(`http://localhost:3000/ConsumoCliente/${idConsumocabecera}`, {
          method: "DELETE",
        });
        return;
      }
      fetch(`http://localhost:3000/ConsumoCliente/${idConsumocabecera}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idMesa: mesa,
          idCliente: checkCliente.id,
          estado: estado,
        }),
      });
      if (checkedCheckboxes.length > 0) {
        fetch(
          `http://localhost:3000/ConsumoCliente/mesa/${idConsumocabecera}/consumo`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(checkedCheckboxes),
          }
        ).then((response) => {
          return response.json();
        });
      }

      console.log(estado);
    } else {
      fetch("http://localhost:3000/ConsumoCliente/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idMesa: mesa,
          idCliente: checkCliente.id,
          total: 0,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          fetch(
            `http://localhost:3000/ConsumoCliente/mesa/${data.id}/consumo`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(checkedCheckboxes),
            }
          ).then((response) => {
            return response.json();
          });
        });
    }
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
      <ClienteForm
        clientesState={clientesState}
        mesaCliente={mesaCliente}
        setCheckCliente={setCheckCliente}
        checkCliente={checkCliente}
      />

      {mesaDisponible === false && (
        <>
          <label htmlFor="estado">Estado</label>
          <select name="estado" id="estado">
            <option value="abierto">Abierto</option>
            <option value="cerrado" selected>
              Cerrado
            </option>
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
      {mesaDisponible === false && (
        <h2 style={{ color: "black" }}>Total: {total}</h2>
      )}

      <input type="submit" value="Cargar" />
    </form>
  );
}
