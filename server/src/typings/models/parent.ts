import mongoose from "mongoose"

export type ParentType = {
    name: string
    phone: string
    job: string
    company: string
}

export const ParentSchemaObj = {
    name: {
        type: String,
        required: true
    } as mongoose.SchemaDefinitionProperty<string>,
    phone: {
        type: String,
        required: true
    } as mongoose.SchemaDefinitionProperty<string>,
    job: {
        type: String,
        required: true
    } as mongoose.SchemaDefinitionProperty<string>,
    company: {
        type: String,
        required: true
    } as mongoose.SchemaDefinitionProperty<string>,
}