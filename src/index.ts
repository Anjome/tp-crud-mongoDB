
import { Schema, model, connect } from "mongoose";

process.loadEnvFile

const URI_DB = process.env.URI_DB || ""

const connectDb = async () => {
    try {
        await connect(URI_DB)
        console.log("Conectado a MongoDB")
    } catch (error) {
        console.error("Error al conectar a MongoDB")

    }
}

const salonSchema = new Schema({
    fecha: { type: Date, required: true },
    nombre: { type: String, requerid: true },
    edad: { type: Number },
    horario: { type: String, required: true },
    Pago: { type: String, requerid: true, enum: ['pendiente', 'señado', 'pagado'], default: 'pendiente' },
})

const salon = model("salon", salonSchema)




















connectDb()