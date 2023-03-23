import mongoose, { Types } from "mongoose"
import { PermissionType } from "../../typings/permissions"

export interface IStaff extends mongoose.Document {
    _id: string
    userId: string
    permissions: Types.Array<PermissionType>
    createdAt: Date
    updatedAt: Date
}

const schema = new mongoose.Schema<IStaff>({
    _id: String,
    userId: String,
    permissions: [String]
}, { timestamps: true })

export const studentModel = mongoose.model('students', schema)