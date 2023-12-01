// this is the link in NavVertical
import {NavLink} from 'react-router-dom';

function Link({dest, children}) {
    return (
        <NavLink 
            to={dest} 
            // end
            className={({isActive}) => `pl-2 pr-9 tracking-tight text-white select-none text-lg flex 
                subpixel-antialiased ${isActive ? "bg-violet-400" : "hover:bg-violet-300"} rounded`}
        >
            {children}
        </NavLink>
    )
}

export default Link;
