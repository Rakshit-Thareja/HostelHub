import React from 'react'
import { LayoutDashboard } from 'lucide-react';
import { FileText } from 'lucide-react';
import { Bell } from 'lucide-react';
import { CircleCheck } from 'lucide-react';
import { Utensils } from 'lucide-react';
import { Search } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { useNavigate } from 'react-router'

const NavbarMiddle = () => {

  const navigate = useNavigate()

  return (
    <div className='flex flex-col p-4 gap-2 items-center flex-1'>

        <button onClick={()=>
            {navigate('/')
          }} 
          className='text-md font-medium p-2 px-4 w-full bg-[#E5E5E5] text-black rounded-xl active:scale-95 flex gap-2 items-center '><LayoutDashboard size={20} /> 
          <span>Dashboard</span></button>

        <button onClick={()=>
            {navigate('/Complaints')
          }} 
        className='text-md font-medium p-2 px-4 w-full bg-[#E5E5E5] text-black rounded-xl active:scale-95 flex gap-2 items-center '><FileText size={20}/><span>Complaints</span></button>

        <button onClick={()=>
            {navigate('/Notices')
          }} 
        className='text-md font-medium p-2 px-4 w-full bg-[#E5E5E5] text-black rounded-xl active:scale-95 flex gap-2 items-center '><Bell size={20}/><span>Notices</span></button>

        <button onClick={()=>
            {navigate('/LeaveApplication')
          }} 
        className='text-md font-medium p-2 px-4 w-full bg-[#E5E5E5] text-black rounded-xl active:scale-95 flex gap-2 items-center '><CircleCheck/><span>Leave Application</span></button>

        <button onClick={()=>
            {navigate('/MessMenu')
          }}
        className='text-md font-medium p-2 px-4 w-full bg-[#E5E5E5] text-black rounded-xl active:scale-95 flex gap-2 items-center '><Utensils/><span>Mess Menu</span></button>

        <button onClick={()=>
            {navigate('/LostFound')
          }}
        className='text-md font-medium p-2 px-4 w-full bg-[#E5E5E5] text-black rounded-xl active:scale-95 flex gap-2 items-center '><Search/><span>Lost & Found</span></button>

        <button onClick={()=>
            {navigate('/Profile')
          }}
         className='text-md font-medium p-2 px-4 w-full bg-[#E5E5E5] text-black rounded-xl active:scale-95 flex gap-2 items-center '><UserRound/><span>Profile</span></button>
      
    </div>
  )
}

export default NavbarMiddle
