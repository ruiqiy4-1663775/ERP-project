import { useNavigate, NavLink } from 'react-router-dom';
import Link from '../../components/Link';
import { useState } from 'react';
import { LOCAL_STORAGE_KEY } from '../../utils/constants';
import { API_ENDPOINT } from '../../utils/constants'

function Nav({ user }) {
    const [open, setOpen] = useState(true)
    const [isOpen, setIsOpen] = useState(true);
    const toggleDropdown = () => setIsOpen(!isOpen);
    return (
        <div className='relative h-full z-10'>
            <svg onClick={() => setOpen(!open)} xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8
                text-purp/60 hover:text-purp hover:w-9 hover:h-9 absolute left-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
            {open &&
                <div className='h-full w-52 flex flex-col space-y-3 bg-gradient-to-r 
        from-[#403a84f8] to-slate-100 pt-5 text-white'>
                    <NavLink to={'/'} className="flex items-center pl-2 mr-6 block ">
                        <span className="font-semibold text-xl italic select-none whitespace-nowrap ">My Company</span>
                    </NavLink>

                    <div className="flex flex-col flex-grow items-center justify-between overflow-y-auto pb-5">
                        <div className="text-lg w-full h-full flex flex-col space-y-2 mb-5">
                            <div className='border-t'></div>
                            <LinkDropdown arr={[
                                {
                                    label: 'Sales Order',
                                    dest: 'sales/sales_order',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                },
                                {
                                    label: 'Price',
                                    dest: 'sales/price_management',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                },
                                {
                                    label: 'Customer',
                                    dest: 'sales/customer',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>

                                },
                            ]}>
                                Sales
                            </LinkDropdown>
                            <div className='border-t'></div>
                            <LinkDropdown arr={[
                                {
                                    label: 'Item List',
                                    dest: 'inventory/items',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                },
                                {
                                    label: 'Purchase',
                                    dest: 'inventory/purchase',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                },
                                {
                                    label: 'Supplier',
                                    dest: 'inventory/supplier',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                                    </svg>
                                },
                                {
                                    label: 'Stock',
                                    dest: 'inventory/stock',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                    </svg>
                                },
                                {
                                    label: 'Location',
                                    dest: 'inventory/location',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>

                                }
                            ]}>
                                Inventory
                            </LinkDropdown>
                            <div className='border-t'></div>
                            <LinkDropdown arr={[
                                {
                                    label: 'Employees',
                                    dest: 'human_resource/employees',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>
                                },
                                {
                                    label: 'Commissions',
                                    dest: 'human_resource/commissions',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                    </svg>
                                },
                                {
                                    label: 'Payroll',
                                    dest: 'human_resource/payroll',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                },
                            ]}>
                                Human Resource
                            </LinkDropdown>
                            <div className='border-t'></div>
                            <LinkDropdown arr={[

                            ]}>
                                Finance
                            </LinkDropdown>
                            <div className='border-t'></div>
                            <LinkDropdown arr={[
                                {
                                    label: 'Users',
                                    dest: 'admin/users',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                    </svg>
                                },
                                {
                                    label: 'Audition',
                                    dest: 'admin/audition',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                },
                                {
                                    label: 'Requests',
                                    dest: 'admin/requests',
                                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                                    </svg>
                                }
                            ]}>
                                Admin
                            </LinkDropdown>
                        </div>

                        <Dropdown username={user}></Dropdown>

                    </div>

                    <nav className="hidden w-full items-center text-slate-300 px-3 py-1 drop-shadow-2xl">
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
            }
        </div>
    )
}

const LinkDropdown = ({ arr, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    return (
        <div className="w-full relative">
            <div onClick={toggleDropdown} className={`w-full text-lg py-0.5 px-3 rounded select-none
                whitespace-nowrap hover:bg-violet-400`} >
                <span className='subpixel-antialiased'>{children}</span>

            </div>
            {isOpen && (
                <div className='flex flex-col w-max min-w-full space-y-3'> {arr.map((row, index) => <Link dest={row.dest} key={index} >
                    <span className="pl-5 mr-1 select-none">{row.icon}</span>{row.label}
                </Link>)} </div>
            )}
        </div>
    );
};

const Dropdown = ({ username }) => {
    const [isOpen, setIsOpen] = useState(false);
    let navigate = useNavigate();

    const toggleDropdown = () => setIsOpen(!isOpen);

    const logOut = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        navigate('/login');
    }
    return (
        <div className="w-full pl-2 relative">
            <button onClick={toggleDropdown} className="flex items-center text-lg">
                <img src={`${API_ENDPOINT}/avatar/avatar1.jpg`} alt="User Avatar" className="w-9 h-9 rounded-full" />
            </button>
            {isOpen && (
                <div className="absolute bottom-full z-10 translate-x-1 bg-white flex flex-col rounded-lg shadow-lg py-3 px-4 min-w-max">
                    <span className="text-sky-400">Role: {username}</span>
                    <NavLink to="requests" className="text-sky-400">
                        My requests
                    </NavLink>
                    <span className='text-red-500 hover:cursor-pointer' onClick={logOut}> Log Out</span>
                </div>
            )}
        </div>
    );
};

export default Nav;