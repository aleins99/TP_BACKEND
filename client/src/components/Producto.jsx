import { useState, useEffect, useRef } from "react";

export default function Producto({
  productos,
  setProductos,
  setProductosMesa,
  productosMesa,
}) {
  // Estado para mantener los checkboxes y sus cantidades

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setProductosMesa((prevCheckboxes) => {
      if (checked) {
        return [...prevCheckboxes, id];
      } else {
        return prevCheckboxes.filter((checkboxId) => checkboxId !== id);
      }
    });
  };

  const handleQuantityChange = (event, id) => {
    const { value } = event.target;
    console.log(value);
    setProductos((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, quantity: parseInt(value) }
          : checkbox
      )
    );
  };

  useEffect(() => {
    fetch(`http://localhost:3000/Producto`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProductos(data.map((checkbox) => ({ ...checkbox, quantity: 0 })));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const checkboxRef = useRef();
  /*
  const handleChange = (e) => {
    const el = document.getElementsByClassName("checkboxRef");
    console.dir(el);
    let input = checkboxRef.current.children;
    for (let elemento of el) {
      if (elemento.children[0].checked === true) {
        const cantidad = elemento.children[3].value;

        const idProducto = elemento.children[0].value;
        const pl = [...productosMesa];
        const data = { idProducto, cantidad };
        const ps = pl.push(data);
        const productosFilter = productosMesa.filter((el) => {
          console.log(el.idProducto === idProducto);
        });
        console.log("mesaaa", productosMesa);
        console.log(productosFilter);
        if (productosFilter) setProductosMesa(pl);
      }
    }
  };*/
  return (
    <div>
      {productos.length > 0 ? (
        productos.map((producto, index) => (
          <div className="checkboxRef" ref={checkboxRef} key={producto.id}>
            <input
              type="checkbox"
              name="producto"
              id={producto.id}
              value={producto.id}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={producto.id}>{producto.nombre_producto} </label>
            <label htmlFor="cantidad" style={{ marginLeft: 15 }}>
              {" "}
              Cantidad:{" "}
            </label>
            <input
              name="cantidad"
              type="number"
              onChange={(event) => handleQuantityChange(event, producto.id)}
            />
            <br />
          </div>
        ))
      ) : (
        <p>No hay productos</p>
      )}
    </div>
  );
}
