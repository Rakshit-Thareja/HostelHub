import React from 'react'
import { Funnel } from 'lucide-react';

const ComplaintsHeader = () => {
  return (
    <div className='flex justify-between p-8 items-center'>

        <div className='flex flex-col justify-between gap-8'>

            <div className='flex flex-col gap-2'>

                <h1 className='text-white font-bold text-3xl'>Complaints</h1>
                <h3 className='text-[#909297]'>File and track your complaints</h3>

            </div>

            <div className='flex gap-2 text-white items-center'>
    
                <Funnel size={18}/>
                <select className='border border-[#2A2A2C] py-1 px-2 rounded-xl w-50'>
                    <option>all</option>
                </select>

            </div>

        </div>

        <div className='flex flex-col justify-between gap-12 '>

            <button className='bg-white text-black font-medium px-2 py-1 rounded-xl'>+ File New Complaint</button>

            <h5 className='text-[#909297] text-sm text-right '>Showing 3 of 3</h5>

        </div>
      
    </div>
  )
}

export default ComplaintsHeader
