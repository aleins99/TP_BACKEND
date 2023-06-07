import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Reserva() {
  const rangoHoras = [
    "12 a 13",
    "13 a 14",
    "14 a 15",
    "19 a 20",
    "20 a 21",
    "21 a 22",
    "22 a 23",
  ];
  const [checkedState, setCheckedState] = useState(
    new Array(rangoHoras.length).fill(false)
  );
  const [clicked, setClicked] = useState(false);
  const [capacidad, setCapacidad] = useState(0);
  const [existeCliente, setExisteCliente] = useState(false);
  const [mesasDisponibles, setMesasDisponibles] = useState([]);
  const [horario_inicio, setHorario_inicio] = useState("");
  const [horario_fin, setHorario_fin] = useState("");
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      return index === position ? !item : item;
    });

    setCheckedState(updatedCheckedState);
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre_cliente = document.getElementById("nombre_cliente").value;
    const apellido_cliente = document.getElementById("apellido_cliente").value;
    const cedula_cliente = document.getElementById("cedula_cliente").value;
    const idRestaurante = document.getElementsByName("restaurantes")[0].value;
    const fecha = document.getElementById("fecha").value;
    const idMesa = document.getElementsByName("idMesa")[0].value;
    console.log(horario_inicio, horario_fin, fecha, idMesa, idRestaurante);
    const capacidad = mesasDisponibles.find(
      (mesa) => mesa.id == idMesa
    ).capacidad;
    fetch("http://localhost:3000/Reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_cliente: nombre_cliente,
        apellido_cliente: apellido_cliente,
        cedula_cliente: cedula_cliente,
        capacidad: capacidad,
        fecha: fecha,
        horario_inicio: horario_inicio + "",
        horario_fin: horario_fin + "",
        idMesa: idMesa,
        idRestaurante: idRestaurante,
      }),
    }).then((response) => {
      console.log(response.json().then((data) => console.log(data)));
      navigate("/");
    });
  };

  const buscarMesas = () => {
    let cont_ini = 10;
    let cont_fin = 0;
    checkedState.forEach((item, index) => {
      if (item) {
        if (index > cont_fin) cont_fin = index;
        if (index < cont_ini) cont_ini = index;
      }
    });

    setHorario_inicio(rangoHoras[cont_ini].split(" ")[0]);
    setHorario_fin(rangoHoras[cont_fin].split(" ")[2]);
    // get fecha
    const fecha = document.getElementById("fecha").value;
    const idRestaurante = document.getElementsByName("restaurantes")[0].value;

    fetch("http://localhost:3000/Mesas/Disponibles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fecha: fecha,
        horario_inicio: horario_inicio,
        horario_fin: horario_fin,
        idRestaurante: idRestaurante,
      }),
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
        data.forEach((mesa) => {
          setMesasDisponibles((mesasDisponibles) => [
            ...mesasDisponibles,
            mesa,
          ]);
        });
        setClicked(true);
        console.log("1313", mesasDisponibles);
      });
    });
  };
  const [restaurantes, setRestaurantes] = useState();
  useEffect(() => {
    getRestaurantes();
  }, []);
  async function getRestaurantes() {
    const response = await fetch("http://localhost:3000/Restaurante");
    const data = await response.json();
    console.log(data);
    setRestaurantes(data);
  }

  return (
    <div>
      <h1>Reserva</h1>
      <form action="POST" onSubmit={handleSubmit}>
        <label htmlFor="nombre_cliente">Nombre: </label>
        <input type="text" name="nombre_cliente" id="nombre_cliente" />
        <br />
        <label htmlFor="apellido_cliente">Apellido: </label>
        <input type="text" name="apellido_cliente" id="apellido_cliente" />
        <br />
        <label htmlFor="cedula_cliente">Cedula: </label>
        <input type="text" name="cedula_cliente" id="cedula_cliente" />
        <br />

        <label htmlFor="">Restaurante: </label>
        <select name="restaurantes">
          {restaurantes?.map((restaurante) => (
            <option value={restaurante.id} key={restaurante.id}>
              {restaurante.nombre}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="fecha">Fecha: </label>
        <input type="date" name="fecha" id="fecha" />
        <br />
        <label htmlFor="horario">Horario: </label>
        <br />
        {rangoHoras.map((horario, index) => (
          <div key={index}>
            <input
              type="checkbox"
              name="horario"
              id={horario}
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor={horario}>{horario}</label>
          </div>
        ))}

        {!clicked ? (
          <u style={{ cursor: 'pointer' }} onClick={buscarMesas}> Buscar Mesas disponibles </u>
        ) : (
          <div>
            <br />
            {mesasDisponibles.length === 0 ? (
              <p> No hay mesas disponibles para esa capacidad </p>
            ) : (
              mesasDisponibles.map((mesa) => (
                <div key={mesa.id}>
                  <p> Mesa: {mesa.nombre} </p>
                  <p> Capacidad: {mesa.capacidad} </p>
                  <input
                    type="checkbox"
                    name="idMesa"
                    id="mesa-checkbox"
                    value={mesa.id}
                  />
                </div>
              ))
            )}
          </div>
        )}
        <button type="submit">Enviar Datos</button>
      </form>
    </div>
  );
}
