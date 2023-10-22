import mongoose from "mongoose";

export interface IDepartment extends mongoose.Document {
    _id: string
    name: string
    description: String
    createdAt: Date
    updatedAt: Date
}

const schema = new mongoose.Schema<IDepartment>({
    _id: String,
    name: String,
    description: String
}, { timestamps: true })

export const staffDepartmentModel = mongoose.model('staff_departments', schema)