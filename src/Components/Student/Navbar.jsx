import React from 'react'
import NavbarHeader from './NavbarHeader'
import NavbarMiddle from './NavbarMiddle'
import NavbarBottom from './NavbarBottom'

const Navbar = () => {
  return (
    <div className='bg-[#1E1E20] w-64 h-screen flex flex-col text-white border border-[#2A2A2C]  '>
      
        <NavbarHeader/>

        <NavbarMiddle/>

        <NavbarBottom/>

    </div>
  )
}

export default Navbar
