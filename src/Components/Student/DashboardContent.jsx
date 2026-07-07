import React from 'react'
import { FileText } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Bell } from 'lucide-react';

const DashboardContent = () => {
  return (
    <div className='flex flex-col gap-3 px-6  '>

        <div className='flex flex-wrap sm:flex-nowrap mt-10 gap-3'>

            {/* Active Complaints */}
            <div className='bg-[#171717] w-full flex flex-col p-6 rounded-2xl justify-between gap-6 border border-[#2A2A2C] '>

                <div className='text-white flex gap-2 items-center font-medium  '>
                
                    <FileText size={16} /><span>Active Complaints</span>
            
                </div>

                <div className='flex flex-col '>

                    <h1 className='text-white text-2xl font-bold' >3</h1>

                    <h4 className='text-[#909297] text-sm'>Total filed</h4>

                </div>

            </div>

            {/* Pending Approvals */}
            <div className='bg-[#171717] w-full flex flex-col p-6 rounded-2xl justify-between gap-6 border border-[#2A2A2C] '>

                <div className='text-white flex gap-2 items-center font-medium  '>
                
                    <Clock size={16} /><span >Pending Approvals</span>
            
                </div>
 
                <div className='flex flex-col '>

                    <h1 className='text-white text-2xl font-bold' >1</h1>

                    <h4 className='text-[#909297] text-sm'>Leave Applications</h4>

                </div>

            </div>

            {/* New Notices */}
            <div className='bg-[#171717] w-full flex flex-col p-6 rounded-2xl justify-between gap-6 border border-[#2A2A2C]'>

                <div className='text-white flex gap-2 items-center font-medium  '>
                
                    <Bell size={16} /><span >New Notices</span>
            
                </div>
 
                <div className='flex flex-col '>

                    <h1 className='text-white text-2xl font-bold' >4</h1>

                    <h4 className='text-[#909297] text-sm'>Unread</h4>

                </div>

            </div>
        </div>

        <div className='flex gap-3'>
            {/* Your Complaints */}
            <div className='bg-[#171717] flex flex-col p-6 w-2/3 rounded-2xl border border-[#2A2A2C]'>
                
                {/* Header */}
                <div className='flex justify-between items-center'>

                    <div className='flex flex-col'>

                        <h1 className='text-white font-medium '>Your Complaints</h1>

                        <h3 className='text-[#909297] font-normal text-sm gap-1'>Recent issues you've reported</h3>

                    </div>

                    <div>

                        <button className='text-white bg-[#0B0A0B] py-1 px-2 rounded-lg text-sm border border-[#2A2A2C] active:scale-95'>View All</button>

                    </div>

                </div>

                {/* Complaints */}
                <div className='flex flex-col gap-1 mt-4 border border-[#2A2A2C] rounded-xl p-6 '>

                   <div className='flex gap-2 items-center'>

                        <h1 className='text-white'>Water Leakage in bathroom</h1>
                        <div className='p-0.5 px-2 bg-[#DAEAFF] text-xs rounded-xl font-medium text-blue-700'>In Progress</div>

                   </div>

                   <h4 className='text-[#909297] font-normal text-sm '>Maintenance</h4>

                   <h5 className='text-[#909297] font-normal text-xs '>2024-01-10</h5>

                </div>

                <div className='flex flex-col gap-1 mt-4 border border-[#2A2A2C] rounded-xl p-6 '>

                   <div className='flex gap-2 items-center'>

                        <h1 className='text-white'>Noisy Neighbours</h1>
                        <div className='p-0.5 px-2 bg-[#DBFCE7] text-xs rounded-xl font-medium text-[#1C6F49]'>Resolved</div>

                   </div>

                   <h4 className='text-[#909297] font-normal text-sm '>Discipline</h4>

                   <h5 className='text-[#909297] font-normal text-xs '>2024-01-08</h5>

                </div>

                <div className='flex flex-col gap-1 mt-4 border border-[#2A2A2C] rounded-xl p-6 '>

                   <div className='flex gap-2 items-center'>

                        <h1 className='text-white'>Internet Connectivity Issues</h1>
                        <div className='p-0.5 px-2 bg-[#F2E9FF] text-xs rounded-xl font-medium text-[#853DBD]'>Open</div>

                   </div>

                   <h4 className='text-[#909297] font-normal text-sm '>Technical</h4>

                   <h5 className='text-[#909297] font-normal text-xs '>2024-01-12</h5>

                </div>
                
            </div>

            {/* Right Side divs */}
            <div className='flex flex-col flex-1 gap-3 '>

                {/* Quick Actions */}
                <div className='flex flex-col gap-3 p-6 bg-[#171717] text-white border border-[#2A2A2C] rounded-xl'>

                    <h1 className='font-medium'>Quick Actions</h1>

                    <div className='flex flex-col gap-2 '>

                        <div className='bg-[#0B0A0B] py-1 px-3 text-sm font-medium flex-1 border border-[#2A2A2C] rounded-xl'>+  File Complaint</div>

                        <div className='bg-[#0B0A0B] py-1 px-3 text-sm font-medium flex-1 border border-[#2A2A2C] rounded-xl'>+  Apply for Leave</div>

                        <div className='bg-[#0B0A0B] py-1 px-3 text-sm font-medium flex-1 border border-[#2A2A2C] rounded-xl'>+  View Mess Menu</div>

                        <div className='bg-[#0B0A0B] py-1 px-3 text-sm font-medium flex-1 border border-[#2A2A2C] rounded-xl'>+  Lost & Found</div>

                    </div>

                </div>

                {/* Latest Notice */}
                <div className='flex flex-col gap-3 p-6 bg-[#171717] border border-[#2A2A2C] rounded-xl'>
            
                    {/* Header */}
                    <div className='flex gap-3 text-white '>

                        <Bell/>
                        <span>Latest Notice</span>

                    </div>

                    <div className='flex flex-col gap-2'>
                        
                        <h2 className='text-white text-sm font-medium'>New hostel rules effective from August</h2>

                        <p className='text-[#909297] text-xs'>Please find attached the updated hostel rules and regulations effective from February 2024. All students must comply with these rules.</p>

                        <div className='flex justify-between'>

                            <h3 className='text-[#909297] text-xs'>2024-01-12</h3>

                            <div className='text-white bg-[#272726] text-xs py-1 px-2 rounded-xl'>General</div>

                        </div>

                        <button className='text-white text-sm active:scale-95'>Read All Notices</button>

                    </div>

                </div>

            </div>

        </div>

    </div>
  )
}

export default DashboardContent
