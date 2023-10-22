import mongoose from "mongoose";

export interface IDepartment extends mongoose.Document {
    _id: string
    name: string
    createdAt: Date
    updatedAt: Date
}

const schema = new mongoose.Schema<IDepartment>({
    _id: String,
    name: String,
}, { timestamps: true })

export const staffDepartmentModel = mongoose.model('staff_departments', schema)