import React from 'react'
import { IoSchool } from "react-icons/io5";
const Logo = () => {
  return (
     <div className='flex items-center gap-3 '>
        <IoSchool className='text-[#DDF246]'  size={32} />
        <h1 className='text-2xl text-white font-bold'>
            UniPath
        </h1>
    </div>
  )
}

export default Logo