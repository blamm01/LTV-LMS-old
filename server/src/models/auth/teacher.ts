import mongoose, { Types } from "mongoose"

export interface ITeacher extends mongoose.Document {
    _id: string
    userId: string
    createdAt: Date
    updatedAt: Date
}

const schema = new mongoose.Schema<ITeacher>({
    _id: String,
    userId: {
        type: String,
        ref: 'users'
    },
}, { timestamps: true })

export const studentModel = mongoose.model('teachers', schema)