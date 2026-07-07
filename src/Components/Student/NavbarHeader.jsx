import React from 'react'

const NavbarHeader = () => {
  return (
    <div className='w-full flex flex-col'>

        {/* HostelHub name & logo */}
        <div className='p-6 flex gap-2 items-center border border-[#2A2A2C] '>

            <div>

                <h1 className='text-black bg-white p-2 rounded-xl font-bold  '>HM</h1>

            </div>

            <h1 className='font-bold text-md'>HostelHub</h1>

        </div>

        {/* Student Name and Room Number */}
        <div className='flex flex-col p-6 gap-2 border-[#2A2A2C] border'>

            <div className='flex gap-3 items-center '>

                <div className='p-3 text-white bg-[#2A2A2C] rounded-full font-bold text-sm' > 

                    <h1>S</h1>

                </div>

                <div className='flex flex-col'>

                    <h2 className='text-md'>Satyam Mall</h2>

                    <h5 className='text-xs text-[#909297] font-light'>Student</h5>

                </div>

            </div>

            <div>
                
                <h5 className='text-[#909297] text-sm '>Block B | Room-529 </h5>

            </div>

        </div>

    </div>
  )
}

export default NavbarHeader
