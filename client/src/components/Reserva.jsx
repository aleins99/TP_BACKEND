import { useState, useEffect } from "react";

export default function Reserva() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}></form>
    </div>
  );
}
