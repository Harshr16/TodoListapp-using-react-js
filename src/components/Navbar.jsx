import React from 'react'

function Navbar() {
  return (
    <nav className='flex py-2 items-center justify-between bg-indigo-500 text-white'>
        <div className='logo'>
            <span className='font-bold text-2xl  mx-8'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-8'>
            <li className='cursor-pointer  hover:font-bold transition-all '>Home</li>
            <li className='cursor-pointer  hover:font-bold transition-all '>About</li>
        </ul>

    </nav>
  )
}

export default Navbar