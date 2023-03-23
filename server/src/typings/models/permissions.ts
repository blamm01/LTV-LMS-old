export type PermissionsObject = {
    classes: {
        'manage_classes': boolean,
        'view_classes': boolean

        'manage_students_in_classes': boolean

        'manage_teachers_in_classes': boolean
    },
    scores: {
        'manage_scores': boolean,
        'view_scores': boolean,
        
        'manage_score_sheets': boolean,
    },
    users: {
        'manage_users': boolean
        'manage_user_permissions': boolean
    },
    generations: {
        'manage_generations': boolean
    },
    semesters: {
        'manage_semesters': boolean
    },
    grades: {
        'manage_grades': boolean,

    }
}