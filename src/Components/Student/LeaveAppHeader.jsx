import React from 'react'

const LeaveAppHeader = () => {
  return (
    <div className='flex justify-between p-8 items-center'>

        <div className='flex flex-col justify-between gap-8'>

            <div className='flex flex-col gap-2'>

                <h1 className='text-white font-bold text-3xl'>Leave Application</h1>
                <h3 className='text-[#909297]'>Apply for and track your leave requests</h3>

            </div>

        </div>

        <div className='flex flex-col justify-between gap-12 '>

            <button className='bg-white text-black font-medium px-2 py-1 rounded-xl active:scale-95'>+ Apply for leave</button>

        </div>
      
    </div>
  )
}

export default LeaveAppHeader
