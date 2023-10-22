import mongoose from "mongoose";
import { mongooseSchemaPerms, permsType } from "../../typings/permissions";

export interface IPermission extends mongoose.Document {
    _id: string
    belongTo: 'student' | 'teacher' | string
    permObj: permsType
    superuser: boolean
    createdAt: Date
    deletedAt: Date
}

const schema = new mongoose.Schema<IPermission>({
    _id: String,
    belongTo: String,
    permObj: mongooseSchemaPerms,
    superuser: Boolean,
}, { timestamps: true })

export const permissionModel = mongoose.model('permissions', schema)