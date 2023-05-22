import { useState, useEffect } from "react";
import Reserva from "./components/Reserva.jsx";
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
      <Reserva />
    </div>
  );
}

export default App;
