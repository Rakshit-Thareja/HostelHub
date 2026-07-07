import React from 'react'
import { CircleCheck } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { X } from 'lucide-react';

const LeaveAppMiddle = () => {
  return (
    <div className='flex flex-col gap-5 mx-6'>
      
        {/* Application Numbers */}
        <div className='flex gap-3 '>

            <div className='flex-1 p-4 flex flex-col justify-between gap-5 bg-[#171717] rounded-xl border border-[#2A2A2C] text-white '>
        
                <h2 className='text-md font-normal'>Total Applications</h2>
                <h1 className='text-xl font-bold'>3</h1>

            </div>

            <div className=' flex-1 p-4 flex flex-col justify-between gap-5 bg-[#171717] rounded-xl border border-[#2A2A2C] text-white '>
        
                <h2 className='text-md font-normal'>Approved</h2>
                <h1 className='text-xl font-bold'>1</h1>

            </div>

            <div className=' flex-1 p-4 flex flex-col justify-between gap-5 bg-[#171717] rounded-xl border border-[#2A2A2C] text-white '>
        
                <h2 className='text-md font-normal'>Pending</h2>
                <h1 className='text-xl font-bold'>1</h1>

            </div>

        </div>

        {/* Application 1 */}
        <div className='flex justify-between pt-10 px-4 rounded-2xl pb-4 bg-[#171717] border border-[#2A2A2C]' >

                <div className='flex flex-col gap-2'>

                    <div className='flex gap-2 items-center'>

                        <CircleCheck color="green" />

                        <div className='flex flex-col gap-2'>

                            <h1 className='text-white'>Family emergency</h1>
                            <div className='flex gap-2 text-[#909297] text-s items-center'><Calendar size={16}/><span>2024-01-15 to 2024-01-18</span> </div>

                        </div>

                    </div>

                    <div>
                    
                        <h5 className='text-[#909297] text-xs'>Approved by Warden - Mr. Sharma on 2024-01-12</h5>

                    </div>

                </div>

                <button className='bg-[#DBFCE7] text-green-800 h-6 px-2 rounded-xl text-xs font-medium'>Approved</button>

        </div>

        {/* Application 2 */}
        <div className='flex justify-between pt-10 px-4 rounded-2xl pb-4 bg-[#171717] border border-[#2A2A2C]' >

                <div className='flex flex-col gap-2'>

                    <div className='flex gap-2 items-center'>

                        <Clock size={20} color="orange" />

                        <div className='flex flex-col gap-2'>

                            <h1 className='text-white'>Home visit</h1>
                            <div className='flex gap-2 text-[#909297] text-s items-center'><Calendar size={16}/><span>2024-01-20 to 2024-01-22</span> </div>

                        </div>

                    </div>

                    <div>
                    
                        <h5 className='text-[#909297] text-xs'></h5>

                    </div>

                </div>

                <button className='bg-[#FFF9C3] text-[#D2A448] h-6 px-2 rounded-xl text-xs font-medium'>Pending</button>

        </div>

        {/* Application 3 */}
        <div className='flex justify-between pt-10 px-4 rounded-2xl pb-4 bg-[#171717] border border-[#2A2A2C]' >

                <div className='flex flex-col gap-2'>

                    <div className='flex gap-2 items-center'>

                        <X size={20} color="red" />

                        <div className='flex flex-col gap-2'>

                            <h1 className='text-white'>Medical appointment</h1>
                            <div className='flex gap-2 text-[#909297] text-s items-center'><Calendar size={16}/><span>2024-01-10 to 2024-01-12</span> </div>

                        </div>

                    </div>

                    <div>
                    
                        <h5 className='text-[#909297] text-xs'>Rejected by Coordinator - Ms. Patel on 2024-01-09</h5>

                    </div>

                </div>

                <button className='bg-[#FFE3E3] text-red-800 h-6 px-2 rounded-xl text-xs font-medium'>Rejected</button>

        </div>
    </div>
  )
}

export default LeaveAppMiddle
