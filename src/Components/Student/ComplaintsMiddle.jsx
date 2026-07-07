import React from 'react'

const ComplaintsMiddle = () => {
  return (
    <div className='flex flex-col gap-3 mt-5 px-8'>
        <div className='flex justify-between  '>
      
            <div className='pt-10 bg-[#FEF3F3] rounded-xl border border-[#2A2A2C] p-6 flex justify-between gap-3 flex-1 align-middle'>

                <div className='flex flex-col gap-2'>

                    <h1 className='text-xl font-medium'>Water Leakage in Bathroom</h1>
                    <h3 className='text-[#909297] text-md font-normal'>There is continuous water leakage from the ceiling in the bathroom</h3>
                    <div className='flex gap-4 items-center'>

                        <div className='font-medium px-4 py-2'>Maintenance</div>
                        <div className='text-[#909297] font-normal text-sm'>2024-01-10</div>

                    </div>

                </div>

                <div className='flex flex-col gap-2'>
    
                    <div className='bg-[#DAEAFF] px-2 py-1 rounded-xl text-xs font-medium text-blue-600 border border-[#2A2A2C]'>In Progress</div>
                    <div className='bg-red-600 px-2 py-1 rounded-xl text-xs font-medium border border-[#2A2A2C]' >High Priority</div>

                </div>

            </div>
        </div>    

        <div className='flex justify-between'>
      
            <div className='pt-10 bg-[#FEFCE8] rounded-xl border border-[#2A2A2C] p-6 flex justify-between gap-3 flex-1 align-middle'>

                <div className='flex flex-col gap-2'>

                    <h1 className='text-xl font-medium'>Noisy Neighbours</h1>
                    <h3 className='text-[#909297] text-md font-normal'>Excessive noise during study hours</h3>
                    <div className='flex gap-4 items-center'>

                        <div className='font-medium px-4 py-2'>Discipline</div>
                        <div className='text-[#909297] font-normal text-sm'>2024-01-08</div>

                    </div>

                </div>

                <div className='flex flex-col gap-2'>
    
                    <div className='bg-[#DBFCE7] px-2 py-1 rounded-xl text-xs font-medium text-green-800 border border-[#2A2A2C]'>Resolved</div>
                    <div className='bg-yellow-600 px-2 py-1 rounded-xl text-xs font-medium border border-[#2A2A2C]' >Medium Priority</div>

                </div>

            </div>
        </div>  

        <div className='flex justify-between'>
      
            <div className='pt-10 bg-[#FEFCE8] rounded-xl border border-[#2A2A2C] p-6 flex justify-between gap-3 flex-1 align-middle'>

                <div className='flex flex-col gap-2'>

                    <h1 className='text-xl font-medium'>Internet Connectivity Issues</h1>
                    <h3 className='text-[#909297] text-md font-normal'>Wifi connection drops frequently in block B</h3>
                    <div className='flex gap-4 items-center'>

                        <div className='font-medium px-4 py-2'>Technical</div>
                        <div className='text-[#909297] font-normal text-sm'>2024-01-12</div>

                    </div>

                </div>

                <div className='flex flex-col gap-2'>
    
                    <div className='bg-purple-600 px-2 py-1 rounded-xl text-xs font-medium text-white border border-[#2A2A2C]'>Open</div>
                    <div className='bg-yellow-600 px-2 py-1 rounded-xl text-xs font-medium border border-[#2A2A2C]' >Medium Priority</div>

                </div>

            </div>
        </div>  

    </div>
  )
}

export default ComplaintsMiddle
