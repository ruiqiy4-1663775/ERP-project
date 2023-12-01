import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { LOCAL_STORAGE_KEY } from '../../utils/constants';
import {API_ENDPOINT} from '../../utils/constants'

function Nav({user}) {
    const [isOpen, setIsOpen] = useState(true);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const toList = ["/sales", "/inventory", "human_resource", "finance", "admin"]
    const label = ['Sales', 'Inventory', 'Human Resource', 'Finance', 'Admin']
    return (
        <div className='z-10 from-[#170c4e] via-[#7175a9c5] bg-gradient-to-r shrink-0 w-full'>
            <nav className="hidden md:flex h-full items-center text-white px-6 drop-shadow-2xl font-medium">
                <Link to={'/'} className="flex items-center mr-6 block ">
                    <span className="font-semibold text-xl italic select-none">My Company</span>
                </Link>
                <div className="flex flex-grow items-center justify-between">
                    <div className="text-lg h-full">
                        {toList.map((url, index) => 
                            <NavLink to={url} key={index} className={({isActive}) => ` 
                            px-3 py-1 rounded select-none
                            ${isActive ? 'bg-violet-500' : 'hover:bg-violet-400'}`}>
                            {label[index]}
                        </NavLink>
                        )}
                    </div>
                    <Dropdown username={user}></Dropdown>
                </div>
            </nav>

            <nav className="md:hidden w-full items-center text-slate-300 px-3 py-1 drop-shadow-2xl">
                <div className="flex items-center justify-between ">
                    <div className='flex'>
                        <svg onClick={toggleDropdown} xmlns="http://www.w3.org/2000/svg" fill="none" 
                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <span className="font-semibold text-xl text-white italic">My Company</span>
                    </div>
                    <Dropdown username={user}></Dropdown>
                </div>
                {isOpen &&
                    <div className="w-full ">
                        <div onClick={() => setIsOpen(false)} className="text-lg">
                            <Link className='block mb-1 rounded-full' to={'/'}>Home</Link>
                            <Link className='block mb-1 rounded-full' to={'sales'}>Sales</Link>
                            <Link className='block mb-1 rounded-full' to={'inventory'}>Inventory</Link>
                            <Link className='block mb-1 rounded-full' to={'human_resource'}>Human Resource</Link>
                            <Link className='block mb-1 rounded-full' to={'finance'}>Finance</Link>
                            <Link className='block mb-1 rounded-full' to={'admin'}>Admin</Link>
                            {/* <LinkDropdown arr={[
                                { 'Sales Order': 'sales/sales_order' },
                                { 'Customer Data': 'sales/customer' },
                                { 'Price Management': 'sales/price_management' },
                            ]}>
                                Sales
                            </LinkDropdown>
                            <LinkDropdown arr={[
                                { 'Products List': 'inventory/items' }
                            ]}>
                                Inventory
                            </LinkDropdown>
                            <LinkDropdown arr={[
                                { 'Employees': 'human_resource' },
                            ]}>
                                Human Resource
                            </LinkDropdown>
                            <LinkDropdown arr={[
                                { 'Users': 'admin/users' },
                                {'Audition': 'admin/audition'},
                                {'Requests': 'admin/requests'}
                            ]}>
                                Admin
                            </LinkDropdown> */}
                        </div>
                    </div>
                }
            </nav>
        </div>
    )
}

// const LinkDropdown = ({ arr, children }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggleDropdown = () => setIsOpen(!isOpen);

//     return (
//         <div className="w-full relative">
//             <div onClick={toggleDropdown} className="w-full text-lg py-1 ">
//                 {children}
//             </div>
//             {isOpen && (
//                 <div className="w-full px-4 rounded-full">
//                     {arr.map((row, index) => <Link className='block mb-1 rounded-full shadow-lg' 
//                     to={row[Object.keys(row)[0]]} key={index} >{Object.keys(row)[0]}</Link>)}
//                 </div>
//             )}
//         </div>
//     );
// };

const Dropdown = ({ username }) => {
    const [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const logOut = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        navigate('/login');
    }
    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center text-lg">
                <img src={`${API_ENDPOINT}/avatar/avatar1.jpg`} alt="User Avatar" className="w-9 h-9 rounded-full"/>
            </button>
            {isOpen && (
                <div className="absolute bg-white flex flex-col rounded-lg shadow-lg py-3 px-4 min-w-max right-0">
                    <span className="text-sky-400">Role: {username}</span>
                    <Link to="requests" className="text-sky-400">
                        My requests
                    </Link>
                    <span className='text-red-500 hover:cursor-pointer' onClick={logOut}> Log Out</span>
                </div>
            )}
        </div>
    );
};

export default Nav;