import { useState, useEffect } from "react";
import Reserva from "./components/Reserva.jsx";
import "./App.css";

function App() {
  const [reservas, setReservas] = useState();
  const [mesas, setMesas] = useState();
  const [clientes, setClientes] = useState();
  const [restaurantes, setRestaurantes] = useState();
  useEffect(() => {
    getReservas();
  }, []);
  async function getReservas() {
    const response = await fetch("http://localhost:3000/Reservas");
    const cliente = await fetch("http://localhost:3000/Cliente");
    const restaurante = await fetch("http://localhost:3000/Restaurante");
    const mesa = await fetch("http://localhost:3000/Mesas");

    const data = await response.json();
    const dataCliente = await cliente.json();
    const dataRestaurante = await restaurante.json();
    const dataMesa = await mesa.json();

    // sort by date and horario_inicio with horario_fin
    data.sort((a, b) => {
      if (a.fecha > b.fecha) {
        return 1;
      } else if (a.fecha < b.fecha) {
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
    data.forEach((reserva) => {
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
    setReservas(data);
  }
  async function getMesas() {
    setMesas(data);
    console.log(data);
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
      <button>Filtrar</button>
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
              <td>{reserva.idRestaurante}</td>
              <td>{reserva.idCliente}</td>
              <td>{reserva.idMesa}</td>
              <td>{reserva.fecha}</td>
              <td>{reserva.horario_inicio}</td>
              <td>{reserva.horario_fin}</td>
              <td>{reserva.capacidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
