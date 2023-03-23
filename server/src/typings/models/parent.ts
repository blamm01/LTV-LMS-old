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
    },
    phone: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
}