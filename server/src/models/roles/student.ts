import mongoose from "mongoose"
import { StudentClassSchemaObj, StudentClassType } from "../../typings/models/classes"
import { ParentSchemaObj, ParentType } from "../../typings/models/parent"

export interface IStudent extends mongoose.Document {
    _id: string
    mom: ParentType
    dad: ParentType
    classes: mongoose.Types.Array<StudentClassType>,
    userId: string
    createdAt: Date
    updatedAt: Date
}

const schema = new mongoose.Schema<IStudent>({
    _id: String,
    mom: ParentSchemaObj,
    dad: ParentSchemaObj,
    classes: [StudentClassSchemaObj],
    userId: String
}, { timestamps: true })

export const studentModel = mongoose.model('students', schema)