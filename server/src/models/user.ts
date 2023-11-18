import mongoose, { Types } from "mongoose"
import { GenderArrays } from "../typings/models/genders"
import { StatusesArray, StatusesType } from "../typings/models/status"

export interface IUser extends mongoose.Document {
    _id: string

    avatar: string
    username: string
    password: string
    email: string
    phone: string
    gender: string
    
    address: string
    birthday: Date
    
    role: 'student' | 'teacher' | string

    superuser: boolean

    status: StatusesType

    createdAt: Date
    updatedAt: Date
}

const defaultType = {
    type: String,
    required: true
}

const schema = new mongoose.Schema<IUser>({
    _id: defaultType,

    avatar: defaultType,
    username: defaultType,
    password: defaultType,
    email: defaultType,
    phone: defaultType,
    gender: {
        type: String,
        required: true,
        enum: GenderArrays
    },

    role: String,

    address: defaultType,
    birthday: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'active',
        enum: StatusesArray
    }
}, { timestamps: true })

export const userModel = mongoose.model('users', schema)