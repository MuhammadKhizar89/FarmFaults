import SideBarLinks from "./SideBarLinks";
import Account from "../../svgs/sidePanelSvgs/Account.svg";
import DashboardSvg from "../../svgs/sidePanelSvgs/dashboard.svg";
import LeaderBoardSvg from "../../svgs/sidePanelSvgs/LeaderBoard.svg";
import ReportErrorSVG from "../../svgs/sidePanelSvgs/ReportError.svg";
import ViewMapSvg from "../../svgs/sidePanelSvgs/ViewMap.svg";
import Logout from "../../svgs/sidePanelSvgs/Logout";
import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";
import { Link } from "react-router-dom";


const SidePanel = () => {
    const [active, setActive] = useState(true);
    const sidebarLinksData = [
        {
            href: "/dashboard",
            svg: <DashboardSvg className="w-4" />,
            text: "Dashboard",
        },
        {
            href: "/report-error",
            svg: <ReportErrorSVG className="w-4 border" />,
            text: "Report an Error",
        },
        {
            href: "/view-map",
            svg: <ViewMapSvg className="w-4" />,
            text: "View Map",
        },
        {
            href: "/leaderboard",
            svg: <LeaderBoardSvg className="w-4" />,
            text: "Leaderboard",
        },
        {
            href: "/account",
            svg: <Account className="w-4" />,
            text: "Account",
        },
        {
            href: "/logout",
            svg: <Logout className="w-4" />,
            text: "Logout",
        },
    ];

    return (
        <>
            <h1 className="cursor-pointer font-extrabold text-2xl lg:heading-lg absolute top-2 left-3">
                <Link to="/dashboard">Farm Faults</Link>
            </h1>

            <span className="z-40 top-0 right-0 fixed absolute  lg:hidden">
                <Hamburger toggled={active} toggle={setActive} />
            </span>
            {active && (
                <div className="min-h-screen h-full bg-secondary px-8 fixed top-0 left-0 lg:static z-30 shadow-xl xl:shadow-none">
                    <h1 className="text-center text-xl xl:text-3xl mt-10 font-extrabold text-nowrap">Farm Faults</h1>
                    <div className="flex flex-col gap-[25px] mt-10">
                        {sidebarLinksData.map((link, index) => (
                            <SideBarLinks
                                onClick={() => {
                                    if (window.innerWidth <= 768) setActive(false);
                                }}
                                key={index}
                                href={link.href}
                                svg={link.svg}
                                text={link.text}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default SidePanel;
