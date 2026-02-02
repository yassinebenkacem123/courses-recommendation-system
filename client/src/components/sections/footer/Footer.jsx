import React from 'react'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
const Footer = () => {

    return (
        <section className='bg-black mb-10  p-20 rounded-2xl'>
            <div className='flex  flex-col gap-4 justify-between'>
                <div className='w-full flex justify-between'>
                    <div className='flex gap-10 items-center'>
                        <FaFacebook size={33} className='text-[#DDF246] cursor-pointer' />
                        <FaInstagram size={33} className='text-[#DDF246] cursor-pointer' />
                        <FaYoutube size={33} className='text-[#DDF246] cursor-pointer' />


                    </div>
                    <p className='text-white text-3xl font-light'>
                        Ready to Elevate Your Skills?
                    </p>

                </div>
                <h1 className='text-white font-bold text-9xl'>
                    Teaching Since 2026.
                </h1>

            </div>

            {/* Quick Links Section */}
            <div className='grid grid-cols-3 gap-12 mt-12 py-8 border-t border-gray-700'>
                <div>
                    <h3 className='text-[#DDF246] font-semibold text-lg mb-3'>Courses</h3>
                    <ul className='text-white text-sm space-y-2'>
                        <li className='hover:text-[#DDF246] cursor-pointer transition'>Web Development</li>
                        <li className='hover:text-[#DDF246] cursor-pointer transition'>AI & Machine Learning</li>
                        <li className='hover:text-[#DDF246] cursor-pointer transition'>Data Science</li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-[#DDF246] font-semibold text-lg mb-3'>Resources</h3>
                    <ul className='text-white text-sm space-y-2'>
                        <li className='hover:text-[#DDF246] cursor-pointer transition'>Documentation</li>
                        <li className='hover:text-[#DDF246] cursor-pointer transition'>Blog</li>
                        <li className='hover:text-[#DDF246] cursor-pointer transition'>Support</li>
                    </ul>
                </div>
                <div>
                    <h3 className='text-[#DDF246] font-semibold text-lg mb-3'>Company</h3>
                    <ul className='text-white text-sm space-y-2'>
                        <li className='hover:text-[#DDF246] cursor-pointer transition'>About Us</li>
                        <li className='hover:text-[#DDF246] cursor-pointer transition'>Contact</li>
                        <li className='hover:text-[#DDF246] cursor-pointer transition'>Privacy Policy</li>
                    </ul>
                </div>
            </div>

            {/* Creator Info */}
            <div className='mt-12 pt-8 border-t border-gray-700'>
                <div className='flex flex-col gap-4'>
                    <p className='text-white text-sm'>
                        <span className='text-[#DDF246] font-semibold'>Created Date:</span> January 24, 2026
                    </p>
                    <p className='text-white text-sm'>
                        <span className='text-[#DDF246] font-semibold'>Created By:</span> Meryam Kada, Yassine Ben Kacem, Aya Jabbour, Anass Hadioui, Chahd El haouari
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer