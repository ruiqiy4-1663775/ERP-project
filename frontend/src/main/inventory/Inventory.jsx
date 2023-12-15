import { Outlet } from 'react-router-dom';


function Inventory() {
    return (
        <div className="w-full bg-slate-100 h-full overflow-y-auto flex flex-col space-y-10">
            <Outlet />
        </div>

    );
}

export default Inventory;