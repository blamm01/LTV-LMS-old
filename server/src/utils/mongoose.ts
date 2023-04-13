import mongoose from "mongoose"
import { v5 as uuidv5 } from "uuid"
import config from "config"

export function generateUUID(uniqueIdentifier: string | null = null) {
    if(!uniqueIdentifier) uniqueIdentifier = (new mongoose.Types.ObjectId()).toString()
    return uuidv5(uniqueIdentifier, config.get("uuid.namespace") as string)
}