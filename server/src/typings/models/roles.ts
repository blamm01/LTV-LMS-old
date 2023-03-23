import mongoose from "mongoose"

export type RoleType = {
    name: 'staff' | 'teacher' | 'student',
    id: string | ""
}
export const RoleArrays = {
    name: {
        type: String,
        enum: ['staff', 'teacher', 'student'],
        required: true
    } as mongoose.SchemaDefinitionProperty<RoleType>,
    id: {
        type: String,
        default: "",
        required: true
    } as mongoose.SchemaDefinitionProperty<string>
}