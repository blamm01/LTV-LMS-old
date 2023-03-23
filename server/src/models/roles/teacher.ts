import mongoose, { Types } from "mongoose"
import { TeacherClassSchemaObj, TeacherClassType } from "../../typings/models/classes"
import { ParentSchemaObj, ParentType } from "../../typings/models/parent"

export interface ITeacher extends mongoose.Document {
    _id: string
    subjectIds: Types.Array<string>
    classes: mongoose.Types.Array<TeacherClassType>,
    userId: string
}

const schema = new mongoose.Schema<ITeacher>({
    _id: String,
    classes: [TeacherClassSchemaObj],
    userId: String,
    subjectIds: [String]
})

export const studentModel = mongoose.model('students', schema)