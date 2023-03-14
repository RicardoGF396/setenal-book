import express from "express";
import cors from "cors";
import booksRoutes from './routes/libros.routes.js'
import {PORT} from './config.js'

const app = express()

app.use(express.json())
/* Permite que cualquiera dirección pueda consumir la API */
app.use(cors())

app.use(booksRoutes)
app.listen(PORT)
console.log(`Server running on port ${PORT}`);