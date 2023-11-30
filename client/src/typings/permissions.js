const permsArray = [
    "MANAGE_ALL_STUDENTS",
    "MANAGE_OWN_STUDENTS",
    "RESET_STUDENT_PASSWORD",
    "MANAGE_TEACHERS",
    "RESET_TEACHER_PASSWORD",
    "MANAGE_STAFF",
    "RESET_STAFF_PASSWORD",
    "MANAGE_OWN_CLASSES",
    "MANAGE_ALL_CLASSES",
    "MANAGE_GRADES",
    "MANAGE_SUBJECTS",
    "MANAGE_TEACHING_SUBJECTS_SCORES",
    "MANAGE_OWN_CLASSES_SCORES",
    "MANAGE_ALL_SCORES",
    "MANAGE_GENERATIONS",
    "MANAGE_SEMESTERS",
];
exports.allPermsList = {
    students: [
        "MANAGE_ALL_STUDENTS",
        "MANAGE_OWN_STUDENTS",
        "RESET_STUDENT_PASSWORD",
    ],
    teachers: ["MANAGE_TEACHERS", "RESET_TEACHER_PASSWORD"],
    staff: ["MANAGE_STAFF", "RESET_STAFF_PASSWORD"],
    classes: ["MANAGE_OWN_CLASSES", "MANAGE_ALL_CLASSES"],
    grades: ["MANAGE_GRADES"],
    subjects: ["MANAGE_SUBJECTS"],
    scores: [
        "MANAGE_TEACHING_SUBJECTS_SCORES",
        "MANAGE_OWN_CLASSES_SCORES",
        "MANAGE_ALL_SCORES",
    ],
    generations: ["MANAGE_GENERATIONS"],
    semesters: ["MANAGE_SEMESTERS"],
};
exports.defaultPerm = {
    students: [],
    teachers: [],
    staff: [],
    classes: [],
    grades: [],
    subjects: [],
    scores: [],
    generations: [],
    semesters: []
};
exports.mongooseSchemaPerms = {
    students: { type: [String], enum: exports.allPermsList.students },
    teachers: { type: [String], enum: exports.allPermsList.teachers },
    staff: { type: [String], enum: exports.allPermsList.staff },
    classes: { type: [String], enum: exports.allPermsList.classes },
    grades: { type: [String], enum: exports.allPermsList.grades },
    subjects: { type: [String], enum: exports.allPermsList.subjects },
    scores: { type: [String], enum: exports.allPermsList.scores },
    generations: { type: [String], enum: exports.allPermsList.generations },
    semesters: { type: [String], enum: exports.allPermsList.semesters },
};
exports.perms_explanation = {
    students: {
        MANAGE_ALL_STUDENTS: "Quản lý tất cả học sinh",
        MANAGE_OWN_STUDENTS: "Quản lý học sinh của lớp chủ nhiệm",
        RESET_STUDENT_PASSWORD: "Thay đổi mật khẩu của học sinh (Yêu cầu quyền quản lý học sinh)",
        name: "Học sinh",
    },
    teachers: {
        MANAGE_TEACHERS: "Quản lý giáo viên",
        RESET_TEACHER_PASSWORD: "Thay đổi mật khẩu của giáo viên (Yêu cầu quyền quản lý giáo viên)",
        name: "Giáo viên",
    },
    staff: {
        MANAGE_STAFF: "Quản lý nhân viên",
        RESET_STAFF_PASSWORD: "Thay đổi mật khẩu của nhân viên (Yêu cầu quyền quản lý nhân viên)",
        name: "Nhân viên",
    },
    classes: {
        MANAGE_OWN_CLASSES: "Quản lý lớp chủ nhiệm",
        MANAGE_ALL_CLASSES: "Quản lý tất cả các lớp",
        name: "Lớp",
    },
    grades: {
        MANAGE_GRADES: "Quản lý khối",
        name: "Khối",
    },
    subjects: {
        MANAGE_SUBJECTS: "Quản lý môn học",
        name: "Môn học",
    },
    scores: {
        MANAGE_TEACHING_SUBJECTS_GRADES: "Quản lý sổ điểm môn học giảng dạy",
        MANAGE_OWN_CLASSES_GRADES: "Quản lý sổ điểm lớp chủ nhiệm",
        MANAGE_ALL_SCORES: "Quản lý sổ điểm toàn trường",
        name: "Sổ điểm",
    },
    generations: {
        MANAGE_GENERATIONS: "Quản lý năm học",
        name: "Năm học",
    },
    semesters: {
        MANAGE_SEMESTERS: "Quản lý học kì",
    },
};
