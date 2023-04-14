import mongoose, { Types } from "mongoose"
import { GenderArrays } from "../typings/models/genders"
import { RoleArrays, RoleType } from "../typings/models/roles"
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
    
    permissions: Types.Array<string>
    superuser: boolean
    role: RoleType

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

    address: defaultType,
    birthday: {
        type: Date,
        required: true
    },

    permissions: [String],
    superuser: {
        type: Boolean,
        required: false,
        default: false
    },
    role: RoleArrays,

    status: {
        type: String,
        required: true,
        default: 'active',
        enum: StatusesArray
    }
}, { timestamps: true })

export const userModel = mongoose.model('users', schema)