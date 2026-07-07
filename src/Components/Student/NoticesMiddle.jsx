import React from 'react'
import { Bell } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { Calendar } from 'lucide-react';

const NoticesMiddle = () => {
  return (
    <div className='flex flex-col gap-3 mt-5 px-8'>

        {/* Notice 1 */}
        <div className='flex flex-col gap-2 bg-[#EEF6FE] pt-10 px-4 rounded-2xl pb-4' >

            <div className='flex justify-between'>
                
                <div className='flex gap-2 text-xl items-center font-medium'><Bell/><h1>New hostel rules effective from August</h1></div>

                <div className='bg-[#FFE3E3] px-2 py-1 text-red-900 rounded-xl border border-[#2A2A2C]'>High</div>

            </div>

            <h3 className='text-[#909297] text-sm'>Please find attached the updated hostel rules and regulations effective from February 2024. All students must comply with these rules.</h3>

            <div className='flex gap-4 text-[#909297] items-center'>

                <UserRound size={16}/>
                <h4>Warden - Mr. Sharma</h4>
                <Calendar size={16}/>
                <h4>2024-01-12</h4>
                <div className='bg-[#FEF6ED] px-2 py-1 textg-xs rounded border border-[#2A2A2C]'>General</div>

            </div>
            
        </div>     

        {/* Notice 2 */}
        <div className='flex flex-col gap-2 bg-[#F0FCF5] pt-10 px-4 rounded-2xl pb-4' >

            <div className='flex justify-between'>
                
                <div className='flex gap-2 text-xl items-center font-medium'><Bell/><h1>Mess Menu for next week</h1></div>

                <div className='bg-[#FFE3E3] px-2 py-1 text-red-900 rounded-xl border border-[#2A2A2C]'>High</div>

            </div>

            <h3 className='text-[#909297] text-sm'>The mess menu for the next week (15-21 Jan) has been updated. Check the mess section for details.</h3>

            <div className='flex gap-4 text-[#909297] items-center'>

                <UserRound size={16}/>
                <h4>Coordinator - Ms. Patel</h4>
                <Calendar size={16}/>
                <h4>2024-01-11</h4>
                <div className='bg-[#FEF6ED] px-2 py-1 textg-xs rounded border border-[#2A2A2C]'>Mess</div>

            </div>
            
        </div> 

        {/* Notice 3 */}
        <div className='flex flex-col gap-2 bg-[#FAF4FE] pt-10 px-4 rounded-2xl pb-4' >

            <div className='flex justify-between'>
                
                <div className='flex gap-2 text-xl items-center font-medium'><Bell/><h1>Maintenance Work on Block A</h1></div>

                <div className='bg-[#FFE3E3] px-2 py-1 text-red-900 rounded-xl border border-[#2A2A2C]'>High</div>

            </div>

            <h3 className='text-[#909297] text-sm'>Maintenance work will be carried out on Block A from 9 AM to 5 PM on Saturday. Please plan accordingly.</h3>

            <div className='flex gap-4 text-[#909297] items-center'>

                <UserRound size={16}/>
                <h4>Warden - Mr. Sharma</h4>
                <Calendar size={16}/>
                <h4>2024-01-09</h4>
                <div className='bg-[#FEF6ED] px-2 py-1 textg-xs rounded border border-[#2A2A2C]'>Maintenance</div>

            </div>
            
        </div> 

    </div>
  )
}

export default NoticesMiddle
