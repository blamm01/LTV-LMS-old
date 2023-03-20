import mongoose, { AnyArray } from "mongoose"
import { StatusesArray, StatusesType } from "../configurations/status"

interface IUser extends mongoose.Document {
    _id: string
    username: string
    password: string
    email: string
    phone: string
    address: string
    baseId: string
    roleId: string
    memberId: string
    permissions: mongoose.Types.Array<string>
    status: StatusesType
}

const defaultType = {
    type: String,
    required: true
}

const schema = new mongoose.Schema<IUser>({
    _id: defaultType,
    username: defaultType,
    password: defaultType,
    email: defaultType,
    phone: defaultType,
    address: defaultType,
    baseId: defaultType,
    roleId: defaultType,
    memberId: defaultType,
    permissions: {
        type: Array,
        default: [String],
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'active',
        enum: StatusesArray
    }
}, { timestamps: true })

const userModel = mongoose.model('users', schema)