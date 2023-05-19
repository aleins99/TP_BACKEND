import express from "express"
import cors from "cors"
import {sequelize} from "./src/models/models.js"
import RestauranteRouter from "./src/routes/restaurantesRouter.js"
import ClienteRouter from "./src/routes/clienteRouter.js"
import MesasRouter from "./src/routes/mesasRouter.js" 
import ReservasRouter from "./src/routes/reservasRouter.js"

await sequelize.sync()

const app = express()

app.use(cors({
    origin: '*'
}));

app.use(express.json())

app.get("/", (req,res) => {
    res.send("Gestion de Restaurantes")
})

app.use("/Restaurante", RestauranteRouter)
app.use("/Cliente",ClienteRouter)
app.use("/Mesas",MesasRouter)
app.use("/Reservas",ReservasRouter)

const PORT = 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
 