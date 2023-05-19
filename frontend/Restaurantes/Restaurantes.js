//fetch
//document.getElementById

const API_URL = "http://localhost:3000/Restaurante"


const tablabody = document.getElementById("tabla-body")

async function mostrarTabla(){
    const Restaurantes = await obtenerRestaurantes()
    tablabody.innerHTML = ""
    Restaurantes.forEach(element => {
        const fila = crearFilaRestaurante(element)
        tablabody.appendChild(fila)
    });
}

async function obtenerRestaurantes(){
    try {
        const response = await fetch(API_URL)
        const restaurantes = await response.json()
        return(restaurantes)
    } catch (error) {
        console.error(error)
    }
}

function crearFilaRestaurante(Restaurante){
    const fila = document.createElement("tr")
    
    const id = document.createElement("td")
    id.textContent = Restaurante.id
    fila.appendChild(id)

    const nombre = document.createElement("td")
    nombre.textContent = Restaurante.nombre
    fila.appendChild(nombre)

    const direccion = document.createElement("td")
    direccion.textContent = Restaurante.direccion
    fila.appendChild(direccion)
    return fila
}

mostrarTabla()