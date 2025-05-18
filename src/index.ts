import { connectDb } from "./config/mongo"
import { Schema, model, } from "mongoose";

process.loadEnvFile



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
            return { success: false, error: 'Datos invalidos' }
        }
        const newFiestaToDb = new fiesta({ fecha, nombre, edad, horario, pago })
        await newFiestaToDb.save()
        return {
            success: true,
            data: newFiestaToDb,
            message: 'Nueva Fiesta'
        }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

const getFiestas = async () => {
    try {
        const fiestas = await fiesta.find()
        return { success: true, data: fiestas, message: 'Fiestas recuperadas exitosamente' }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

const getFiesta = async (id: string) => {
    try {
        const foundFiesta = await fiesta.findById(id)
        if (!foundFiesta) {
            return { success: false, message: 'Fiesta no encontrada' }
        }
        return {
            success: true, data: foundFiesta, message: 'Fiesta encontrada'
        }
    } catch (error: any) {
        return {
            success: false, error: error.message
        }
    }
}

const updateFiesta = async (id: String, newData: Partial<IFiesta>) => {
    try {
        const updatedFiesta = await fiesta.findByIdAndUpdate(id, newData, { new: true })
        if (!updatedFiesta) {
            return { success: false, message: 'Fiesta no encontrada para actualizar' }
        }
        return { success: true, data: updatedFiesta, message: 'Fiesta actualizada' }
    } catch (error: any) {
        return { success: false, error: error.message }

    }
}

const deleteFiesta = async (id: string) => {
    try {
        const deletedFiesta = await fiesta.findByIdAndDelete(id)
        if (!deletedFiesta)
            return {
                success: false, message: 'Fiesta no encontrada para eliminar'
            }
        return { success: true, data: deletedFiesta, message: 'Fiesta eliminada' }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}



const main = async () => {
    await connectDb()

    const saveFiesta = await addNewFiesta({ fecha: '22/11/25', nombre: 'Sofia Massare', edad: 18, horario: '22hs', pago: "$300.000" })
    //const fiestas = await getFiestas()
    //const fiesta = await getFiesta('6827574158b1ce562a5c27a1')
    //const updatedFiesta = await updateFiesta('6827574158b1ce562a5c27a1', { telefono: '1123-4523' })
    //const deletedFiesta = await deleteFiesta('68277eefa7f057009a80cf17')
    console.log(saveFiesta)

}

main()



