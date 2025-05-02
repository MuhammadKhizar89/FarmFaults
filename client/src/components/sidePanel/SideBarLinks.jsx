import {Link} from "react-router-dom";
const SideBarLinks = ({href, svg, text, onClick}) => {
    return (
        <Link  onClick={onClick} className="flex items-center gap-1 sm:gap-3" to={href}>
            <div>{svg}</div>
            <p className="text-lg xl:text-2xl text-nowrap">{text}</p>
        </Link>
    );
};

export default SideBarLinks;
