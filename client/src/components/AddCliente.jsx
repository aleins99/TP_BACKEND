import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function GestionConsumo() {
  const navigate = useNavigate();
  const handelSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const nombre = data.get("nombre");
    const apellido = data.get("apellido");
    const cedula = data.get("cedula");
    const cliente = {
      nombre: nombre,
      apellido: apellido,
      cedula: cedula,
    };
    fetch(`http://localhost:3000/Cliente`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        navigate("/gestion");
      });
  };
  return (
    <form onSubmit={handelSubmit}>
      <h3>Agregar un nuevo cliente</h3>
      <label htmlFor="nombre">Nombre</label>
      <input type="text" name="nombre" id="nombre" />
      <br />
      <label htmlFor="apellido">Apellido</label>
      <input type="text" name="apellido" id="apellido" />
      <br />
      <label htmlFor="cedula">Cedula</label>
      <input type="text" name="cedula" id="cedula" />
      <br />
      <input type="submit" />
    </form>
  );
}
