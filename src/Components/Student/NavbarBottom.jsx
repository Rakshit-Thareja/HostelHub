import React from 'react'
import { LogOut } from 'lucide-react';

const NavbarBottom = () => {
  return (
    <div className='text-red-700 font-medium text-sm relative bottom-0 p-6 border border-[#2A2A2C] '>

        
        <button className='active:scale-95 flex gap-2 items-center'><LogOut size={16} /><span>Logout</span></button>
        
    </div>
  )
}

export default NavbarBottom
