import mongoose from "mongoose"
import { StudentClassSchemaObj, StudentClassType } from "../../typings/models/classes"
import { ParentSchemaObj, ParentType } from "../../typings/models/parent"

export interface IStudent extends mongoose.Document {
    _id: string
    code: string
    mom: ParentType
    dad: ParentType
    userId: string
    createdAt: Date
    updatedAt: Date
}

const schema = new mongoose.Schema<IStudent>({
    _id: String,
    code: String,
    mom: ParentSchemaObj,
    dad: ParentSchemaObj,
    userId: {
        type: String,
        ref: 'users'
    }
}, { timestamps: true })

export const studentModel = mongoose.model('students', schema)