import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [mesas, setMesas] = useState();
  useEffect(() => {
    getmesa();
  }, []);
  async function getmesa() {
    const response = await fetch("http://localhost:3000/Mesas");
    const data = await response.json();
    console.log(data);
    setMesas(data);
  }
  return (
    <div>
      <h1>mesae</h1>
      {mesas?.map((mesa) => (
        <div key={mesa.id}>
          <h2>
            {mesa.nombre} {mesa.idRestaurante}{" "}
          </h2>
          <h2>Piso: {mesa.piso}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
