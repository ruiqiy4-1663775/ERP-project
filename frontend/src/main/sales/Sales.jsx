import { Outlet } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

function Sales() {
    return (
        <div className="h-full w-full overflow-auto flex flex-col py-5 relative bg-slate-100">
            {/* <div className='w-full'> */}
            <Outlet />
            {/* </div> */}
        </div>
    );
}

export default Sales;
