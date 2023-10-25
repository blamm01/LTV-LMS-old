import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AuthLogin from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Root from "../pages/Home/Root";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard/Root";
import * as icon from "@mui/icons-material"

export const APP_ROUTES = {
    LOGIN: "/auth/login",
    DASHBOARD: "/dashboard/"
}

export const Sidebar_Routes = [
    {
        id: 'dashboard',
        linkTo: '/dashboard',
        text: 'Trang điều khiển',
        icon: <icon.Dashboard />
    },
    {
        id: 'students',
        linkTo: '/students',
        text: 'Học sinh',
        icon: <icon.LocalLibrary />,
    },
    {
        id: 'teachers',
        linkTo: '/teachers',
        text: 'Giáo viên',
        icon: <icon.Group />,
        children: [
            {
                id: 'list',
                linkTo: '/teachers/list',
                text: 'Danh sách',
            },
            {
                id: 'teaching_subjects',
                linkTo: '/teachers/teaching_subjects',
                text: 'Giảng dạy'
            },
            {
                id: 'head_classes',
                linkTo: '/teachers/head_classes',
                text: 'Chủ nhiệm'
            }
        ]
    }
]

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />} />
            <Route path={APP_ROUTES.LOGIN} element={<AuthLogin />} />
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={'/students'} />
                <Route path={'/teachers'} />
            </Route>
        </>
    )
)