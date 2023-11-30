import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthLogin from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Root from "../pages/Home/Root";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard/Root";
import * as icon from "@mui/icons-material"

export const APP_ROUTES = {
    LOGIN: "/auth/login",
    DASHBOARD: "/dashboard",
    STUDENTS: '/students',
    'TEACHERS/LIST': '/teachers/list',
    'TEACHERS/TEACHING_SUBJECTS': '/teachers/teaching_subjects',
    'TEACHERS/HEAD_CLASSES': '/teachers/head_classes',
    'SCORES/VIEW': '/scores/view',
    'SCORES/EDIT': '/scores/edit',
    'CLASSES/STUDENTS': '/classes/students',
    'CLASSES/TEACHERS': '/classes/teachers',
    'ADVANCED/SUBJECTS': '/advanced/subjects',
    'ADVANCED/SEMESTERS': '/advanced/semesters',
    'ADVANCED/GENERATIONS': '/advanced/generations',
    'ADMINISTRATION/PERMISSIONS': '/administration/permissions',
    'ADMINISTRATION/DEPARTMENTS': '/administration/departments'
}

// authenticated only
/** @type {Array<{id: string; text: string; linkNotExists?: boolean; icon: any; element?: any; appRouteLinkTo?: string; authorization?: { include: import("../typings/permissions").permsTypeOptional, required: import("../typings/permissions").permsTypeOptional, perms: import("../typings/permissions").permsType, requiredSuperuser: boolean }; children?: Array<{id: string; text: string; appRouteLinkTo: string; element?: string; authorization?: { include: import("../typings/permissions").permsTypeOptional, required: import("../typings/permissions").permsTypeOptional, perms: import("../typings/permissions").permsType, requiredSuperuser: boolean }}>}>} */
export const routes = [
    {
        id: 'dashboard',
        text: 'Trang điều khiển',
        linkNotExists: false,
        icon: <icon.Dashboard />,
        element: <Dashboard />,
        appRouteLinkTo: "dashboard",
    },
    {
        id: 'students',
        linkNotExists: false,
        text: 'Học sinh',
        icon: <icon.LocalLibrary />,
        appRouteLinkTo: "students",
        authorization: {
            include: {
                students: ['MANAGE_ALL_STUDENTS', 'MANAGE_OWN_STUDENTS']
            }
        }
    },
    {
        id: 'teachers',
        linkNotExists: true,
        text: 'Giáo viên',
        icon: <icon.Group />,
        children: [
            {
                id: 'list',
                text: 'Danh sách',
                appRouteLinkTo: "teachers/list",
                element: <Dashboard />,
                authorization: {
                    required: {
                        teachers: ['MANAGE_TEACHERS']
                    }
                }
            },
            {
                id: 'teaching_subjects',
                text: 'Giảng dạy',
                appRouteLinkTo: "teachers/teaching_subjects",
            },
            {
                id: 'head_classes',
                text: 'Chủ nhiệm',
                appRouteLinkTo: "teachers/head_classes"
            }
        ]
    },
    {
        id: 'scores',
        linkNotExists: true,
        text: 'Sổ điểm',
        icon: <icon.Book />,
        children: [
            {
                id: 'view',
                text: "Xem điểm",
                appRouteLinkTo: 'scores/view'
            },
            {
                id: 'edit',
                appRouteLinkTo: 'scores/edit',
                text: 'Sửa điểm'
            }
        ]
    },
    {
        id: 'classes',
        linkNotExists: true,
        text: 'Lớp',
        icon: <icon.School />,
        children: [
            {
                id: 'students',
                appRouteLinkTo: 'classes/students',
                text: "Học sinh",
                element: <Dashboard />
            },
            {
                id: "teachers",
                appRouteLinkTo: 'classes/teachers',
                text: "Giáo viên"
            }
        ]
    },
    {
        id: 'advanced',
        linkNotExists: true,
        text: 'Nâng cao',
        icon: <icon.Layers />,
        children: [
            {
                id: 'subjects',
                appRouteLinkTo: 'advanced/subjects',
                text: 'Môn học',
                element: <Dashboard />
            },
            {
                id: 'semesters',
                appRouteLinkTo: 'advanced/semesters',
                text: 'Học kỳ',
                element: <Dashboard />
            },
            {
                id: 'generations',
                appRouteLinkTo: 'advanced/generations',
                text: 'Năm học',
                element: <Dashboard />
            },
        ]
    },
    {
        id: 'administration',
        linkNotExists: true,
        text: 'Quản trị',
        icon: <icon.Settings />,
        children: [
            {
                id: 'permissions',
                appRouteLinkTo: 'administration/permissions',
                text: 'Phân quyền',
                element: <Dashboard />,
                authorization: {
                    required: {
                        staff: ['MANAGE_STAFF']
                    }
                }
            },
            {
                id: 'departments',
                appRouteLinkTo: 'administration/departments',
                text: 'Phòng ban',
                element: <Dashboard />
            }
        ]
    }
]

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />} />
            <Route path={APP_ROUTES.LOGIN} element={<AuthLogin />} />
            <Route element={<MainLayout />}>
                {routes.map(v => {
                    if (v?.children?.length > 0 || !v.appRouteLinkTo) {
                        return (<Route key={v.id}>
                            {v.children.map(child => <Route key={child.appRouteLinkTo} path={APP_ROUTES[child.appRouteLinkTo.toUpperCase()]} element={<ProtectedRoute authorization={child?.authorization || null}>{child?.element}</ProtectedRoute> || <></>} />)}
                        </Route>)
                    } else {
                        return <Route key={v.id} path={APP_ROUTES[v.appRouteLinkTo.toUpperCase()]} element={<ProtectedRoute authorization={v?.authorization || null}>{v?.element}</ProtectedRoute> || <></>} />
                    }
                })}
            </Route>
        </>
    )
)