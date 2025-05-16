import { connectDb } from "./config/mongo"
import { Schema, model, } from "mongoose";

process.loadEnvFile
connectDb()

interface IFiesta {
    fecha: string,
    nombre: string,
    edad: number,
    horario: string
    pago: string
}

const fiestaSchema = new Schema({
    fecha: { type: String, required: true },
    nombre: { type: String, required: true },
    edad: { type: Number },
    horario: { type: String, required: true },
    pago: { type: String, required: true, default: 'pendiente' },
})

const fiesta = model("fiesta", fiestaSchema)

const addNewFiesta = async (newFiesta: IFiesta) => {
    try {
        const { fecha, nombre, edad, horario, pago } = newFiesta
        if (!fecha || !nombre || !edad || !horario || !pago) {
            return { succes: false, error: 'Datos invalidos' }
        }
        const newFiestaToDb = new fiesta({ fecha, nombre, edad, horario, pago })
        await newFiestaToDb.save()
        return {
            succes: true,
            data: newFiestaToDb,
            message: 'Nueva Fiesta'
        }
    } catch (error: any) {
        return { succes: false, error: error.message }
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












const main = async () => {
    await connectDb()

    const saveFiesta = await addNewFiesta({ fecha: '11/06/25', nombre: 'Horacio Massare', edad: 56, horario: '18hs', pago: "$50.000" })

    console.log(saveFiesta)
}

main()



