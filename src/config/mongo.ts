
import mongoose from "mongoose";

const URI_DB = process.env.URI_DB || ""

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017")
        console.log("Conectado a MongoDB")
    } catch (error) {
        console.error("Error al conectar a MongoDB")

    }
}
export { connectDb }