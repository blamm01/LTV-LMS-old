import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/MainLayout.css"

export default function MainLayout() {
    return <div id="content">
        <Sidebar />
        <div id="interaction_area">
            {/* <h1 style={{ height: 1000 }}>Hii</h1> */}
            <Outlet />
        </div>
    </div>
}