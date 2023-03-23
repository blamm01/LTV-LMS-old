import mongoose from "mongoose"

export type StudentClassType = {
    id: string
    index: number
}

export const StudentClassSchemaObj = {
    id: {
        type: String,
        required: true
    } as mongoose.SchemaDefinitionProperty<string>,
    index: {
        type: Number,
        required: true
    } as mongoose.SchemaDefinitionProperty<number>
}

export type TeacherClassType = {
    id: string
    head: boolean
}

export const TeacherClassSchemaObj = {
    id: {
        type: String,
        required: true
    } as mongoose.SchemaDefinitionProperty<string>,
    head: {
        type: Boolean,
        required: true,
        default: false
    } as mongoose.SchemaDefinitionProperty<boolean>
}