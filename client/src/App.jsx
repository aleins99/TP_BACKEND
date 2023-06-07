import { useState, useEffect } from "react";
import Reserva from "./components/Reserva.jsx";
import "./App.css";

function App() {
  let [reservas, setReservas] = useState();
  let [mesas, setMesas] = useState();
  let [clientes, setClientes] = useState();
  let [restaurantes, setRestaurantes] = useState();
  let [restauranteInput, setRestauranteInput] = useState("");
  let [dia, setDia] = useState("");
  let [mes, setMes] = useState("");
  let [ano, setAno] = useState("");

  useEffect(() => {
    reiniciar();
    getReservas();
  }, []);

  function reiniciar() {
    setRestauranteInput("");
    setDia(0);
    setMes(0);
    setAno(0);

    getReservas();
  }

  async function getReservas() {
    const response = await fetch("http://localhost:3000/Reservas");
    const cliente = await fetch("http://localhost:3000/Cliente");
    const restaurante = await fetch("http://localhost:3000/Restaurante");
    const mesa = await fetch("http://localhost:3000/Mesas");

    const dataReserva = await response.json();
    const dataCliente = await cliente.json();
    const dataRestaurante = await restaurante.json();
    const dataMesa = await mesa.json();

    dataReserva.forEach((reserva) => {
      reserva.timestamp = new Date(reserva.fecha).getTime();
      reserva.horario_inicio = parseInt(reserva.horario_inicio);
      reserva.horario_fin = parseInt(reserva.horario_fin);
    });

    // sort by date and horario_inicio with horario_fin
    dataReserva.sort((a, b) => {
      if (a.timestamp > b.timestamp) {
        return 1;
      } else if (a.timestamp < b.timestamp) {
        return -1;
      } else {
        if (a.horario_inicio > b.horario_inicio) {
          return 1;
        } else if (a.horario_inicio < b.horario_inicio) {
          return -1;
        } else {
          if (a.horario_fin > b.horario_fin) {
            return 1;
          } else if (a.horario_fin < b.horario_fin) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    });

    dataReserva.forEach((reserva) => {
      const restaurante1 = dataRestaurante.find(
        (restaurante) => restaurante.id === reserva.idRestaurante
      );
      const cliente1 = dataCliente.find(
        (cliente) => cliente.id === reserva.idCliente
      );
      const mesa1 = dataMesa.find((mesa) => mesa.id === reserva.idMesa);
      reserva.idMesa = mesa1?.nombre;
      reserva.idCliente = cliente1?.nombre;
      reserva.idRestaurante = restaurante1?.nombre;
    });

    reservas = dataReserva;
    setReservas(dataReserva);
  }

  async function filtrar(event) {
    event.preventDefault();

    await getReservas();
    console.log("reservas0", reservas);
    console.log("dia && mes && ano", typeof dia, typeof mes, typeof ano);

    dia.length === 1 ? (dia = "0" + dia) : "";
    mes.length === 1 ? (mes = "0" + mes) : "";

    if (restauranteInput) {
      const result = reservas.filter((reserva) =>
        reserva.idRestaurante
          .toLowerCase()
          .includes(restauranteInput.toLowerCase())
      );
      reservas = result;
      setReservas(result);
    }

    if (dia && mes && ano) {
      const fechaString = `${ano}-${mes}-${dia}`;
      const result = reservas.filter((reserva) =>
        reserva.fecha.includes(fechaString)
      );
      reservas = result;
      setReservas(result);
    }
  }

  useEffect(() => {
    console.log("reservas actualizadas:", reservas);
  }, [reservas]);

  async function getMesas() {
    setMesas(dataReserva);
    console.log(dataReserva);
  }

  async function getClientes() {
    const response = await fetch("http://localhost:3000/Cliente");
    const data = await response.json();
    setClientes(data);
  }

  async function getRestaurantes() {
    const response = await fetch("http://localhost:3000/Restaurante");
    const data = await response.json();
    setRestaurantes(data);
  }

  return (
    <div className="table-wrapper">
      <h1>Lista de Reservas</h1>
      <table className="fl-table">
        <thead>
          <tr>
            <th>Restaurante</th>
            <th>Cliente</th>
            <th>Mesa</th>
            <th>Fecha</th>
            <th>HorarioInicio</th>
            <th>HorarioFin</th>
            <th>Capacidad</th>
          </tr>
        </thead>
        <tbody>
          {reservas?.map((reserva) => (
            <tr key={reserva.id}>
              <td className="tdColor">{reserva.idRestaurante}</td>
              <td className="tdColor">{reserva.idCliente}</td>
              <td className="tdColor">{reserva.idMesa}</td>
              <td className="tdColor">{reserva.fecha}</td>
              <td className="tdColor">{reserva.horario_inicio}</td>
              <td className="tdColor">{reserva.horario_fin}</td>
              <td className="tdColor">{reserva.capacidad}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-5">
        <form className="container" onSubmit={filtrar}>
          <div className="mb-3">
            <label className="form-label">Pone un restaurante:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Pizza Hut"
              value={restauranteInput}
              onChange={(event) => setRestauranteInput(event.target.value)}
            />
          </div>
          <br />

          <div className="mb-3">
            <label className="form-label mt-3">Dia: </label>
            <input
              type="number"
              className="form-control"
              placeholder="Dia"
              value={dia}
              onChange={(event) => setDia(event.target.value)}
            />

            <label className="form-label mt-2">Mes: </label>
            <input
              type="number"
              className="form-control"
              placeholder="Mes"
              value={mes}
              onChange={(event) => setMes(event.target.value)}
            />

            <label className="form-label mt-2">Año: </label>
            <input
              type="number"
              className="form-control"
              placeholder="Año"
              value={ano}
              onChange={(event) => setAno(event.target.value)}
            />
          </div>
          <br />

          <button onClick={filtrar}>Filtrar</button>
          <button onClick={reiniciar}>Reiniciar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
