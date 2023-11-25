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
    'CLASSES/TEACHERS': '/classes/teachers'
}

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
]

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />} />
            <Route path={APP_ROUTES.LOGIN} element={<AuthLogin />} />
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                {routes.map(v => {
                    if (v?.children?.length > 0 || !v.appRouteLinkTo) {
                        return (<Route key={v.id}>
                            {v.children.map(child => <Route key={child.appRouteLinkTo} path={APP_ROUTES[child.appRouteLinkTo.toUpperCase()]} element={child?.element || <></>} />)}
                        </Route>)
                    } else {
                        return <Route key={v.id} path={APP_ROUTES[v.appRouteLinkTo.toUpperCase()]} element={v?.element || <></>} />
                    }
                })}
            </Route>
        </>
    )
)