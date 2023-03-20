export type PermissionsObject = {
    classes: {
        'create_class': boolean,
        'update_class': boolean,
        'delete_class': boolean,

        'add_students_to_class': boolean,
        'remove_students_from_class': boolean,
        
        'add_teachers_to_class': boolean,
        'remove_teachers_from_class': boolean
    },
    scores: {
        'edit_scores': boolean,

        'lock_score_sheets': boolean,
        'unlock_score_sheets': boolean,
        'view_score_sheets': boolean
    },
    users: {
        'create_user': boolean,
        'update_user': boolean,
        'delete_user': boolean,
        
        'update_user_role': boolean,
        'update_user_permissions': boolean
    }
}