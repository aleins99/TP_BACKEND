import { useState, useEffect } from "react";

export default function Reserva() {
  const handleSubmit = (e) => {
    e.preventDefault();
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
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Restaurante</label>
        <select name="restaurantes" id="">
          {restaurantes?.map((restaurante) => (
            <option value={restaurante.id} key={restaurante.id}>
              {restaurante.nombre}
            </option>
          ))}
        </select>
        <label htmlFor="fecha">Fecha</label>
        <input type="date" name="fecha" id="fecha" />
      </form>
    </div>
  );
}
