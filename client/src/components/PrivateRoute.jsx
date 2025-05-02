import { Outlet } from "react-router-dom";
import SidePanel from "./sidePanel/SidePanel";
export default function PrivateRoute() {
    return (
        <div className="flex bg-secondary">
            <SidePanel />
            <Outlet />
        </div>
    );
}
