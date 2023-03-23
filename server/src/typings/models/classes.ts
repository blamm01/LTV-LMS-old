export type StudentClassType = {
    id: string
    index: number
}

export const StudentClassSchemaObj = {
    id: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
}

export type TeacherClassType = {
    id: string
    head: boolean
}

export const TeacherClassSchemaObj = {
    id: {
        type: String,
        required: true
    },
    head: {
        type: Boolean,
        required: true,
        default: false
    }
}