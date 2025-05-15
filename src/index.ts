
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

const fiestaSchema = new Schema({
    fecha: { type: Date, required: true },
    nombre: { type: String, requerid: true },
    edad: { type: Number },
    horario: { type: String, required: true },
    Pago: { type: String, requerid: true, enum: ['pendiente', 'señado', 'pagado'], default: 'pendiente' },
})

const fiesta = model("fiesta", fiestaSchema)

const addNewFiesta = async () => {
    try {

    } catch (error) {

    }
}

const getFiestas = async () => {
    try {

    } catch (error) {

    }
}

const getFiesta = async (id: string) => {
    try {

    } catch (error) {

    }
}

const updateFiesta = async (id: String) => {
    try {

    } catch (error) {

    }
}

const deleteFiesta = async (id: string) => {
    try {

    } catch (error) {

    }
}


















connectDb()