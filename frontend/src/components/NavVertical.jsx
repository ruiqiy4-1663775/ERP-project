import Link from './Link';
import { useState } from 'react';

function NavVertical({ arr }) {
    const [open, setOpen] = useState(true) // control the opening of the side bar
    return (
        <div className='relative flex z-10'>
            {open && <div className='flex flex-col w-max space-y-3 bg-gradient-to-r 
                from-[#403a84f8] to-slate-100 pt-5'>
                    {arr.map((row, index) => <Link dest={row.dest} key={index} >
                        <span className="mr-1 select-none">{row.icon}</span>{row.label}
                    </Link>)}
            </div>
            }
            <svg onClick={() => setOpen(!open)} xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8
                text-purp/60 hover:text-purp hover:w-9 hover:h-9 absolute left-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
        </div>
    )
}

export default NavVertical;