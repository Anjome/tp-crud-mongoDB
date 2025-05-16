import { connectDb } from "./config/mongo"
import { Schema, model, } from "mongoose";

process.loadEnvFile
connectDb()

interface IFiesta {
    fecha: string,
    nombre: string,
    edad: number,
    horario: string,
    pago: string,
    telefono?: string,
}

const fiestaSchema = new Schema({
    fecha: { type: String, required: true },
    nombre: { type: String, required: true },
    edad: { type: Number },
    horario: { type: String, required: true },
    pago: { type: String, required: true, default: 'pendiente' },
    telefono: { type: String, required: false }
}, {
    versionKey: false,
});
//nose xq me aparece --V siendo que puse versionKey:false???

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
        const fiestas = await fiesta.find()
        return { succes: true, data: fiestas, message: 'Fiestas recuperadas exitosamente' }
    } catch (error: any) {
        return { succes: false, error: error.message }
    }
}

const getFiesta = async (id: string) => {
    try {
        const foundFiesta = await fiesta.findById(id)
        if (!foundFiesta) {
            return { succes: false, message: 'Fiesta no encontrada' }
        }
        return {
            succes: true, data: foundFiesta, message: 'Fiesta encontrada'
        }
    } catch (error: any) {
        return {
            succes: false, error: error.message
        }
    }
}

const updateFiesta = async (id: String, newData: Partial<IFiesta>) => {
    try {
        const updatedFiesta = await fiesta.findByIdAndUpdate(id, newData, { new: true })
        if (!updatedFiesta) {
            return { succes: false, message: 'Fiesta no encontrada para actualizar' }
        }
        return { succes: true, data: updatedFiesta, message: 'Fiesta actualizada' }
    } catch (error: any) {
        return { succes: false, error: error.message }

    }
}

const deleteFiesta = async (id: string) => {
    try {

    } catch (error) {

    }
}












const main = async () => {
    await connectDb()

    //const saveFiesta = await addNewFiesta({ fecha: '11/06/25', nombre: 'Horacio Massare', edad: 56, horario: '18hs', pago: "$50.000" })
    //const fiestas = await getFiestas()
    //const fiesta = await getFiesta('6827574158b1ce562a5c27a1')
    const updatedFiesta = await updateFiesta('6827574158b1ce562a5c27a1', { telefono: '1123-4523' })

    console.log(updatedFiesta);
}

main()



