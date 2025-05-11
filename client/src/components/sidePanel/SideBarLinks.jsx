import { Link, useLocation } from "react-router-dom";

const SideBarLinks = ({ href, svg, text, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === href;

    return (
        <Link
            onClick={onClick}
            to={href}
            className={`flex items-center rounded-2xl py-2 px-3 gap-1 sm:gap-3 ${isActive ? 'bg-[#f5dab1] border-[#726e68] border-[1px]' : 'bg-transparent'
                }`}
        >
            <div>{svg}</div>
            <p className={`text-lg xl:text-2xl text-nowrap `}>
                {text}
            </p>
        </Link>
    );
};

export default SideBarLinks;
