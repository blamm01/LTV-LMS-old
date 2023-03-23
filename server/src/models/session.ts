import config from "config"
import mongoose from "mongoose";

export interface ISession extends mongoose.Document {
    _id: string
    userId: string
    expiresIn: number

    createdAt: Date
    updatedAt: Date
}

const schema = new mongoose.Schema<ISession>({
    _id: String,
    userId: String,
    expiresIn: {
        type: Number,
        default: config.get("jwt.expiresIn.number")
    }
})

export const sessionModel = mongoose.model('sessions', schema)