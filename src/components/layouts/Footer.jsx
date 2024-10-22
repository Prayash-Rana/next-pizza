import React from 'react'

import Link from "next/link";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className='text-white w-full  bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700'>
      
      <div className='container mx-auto flex flex-wrap py-2 flex-col md:flex-row items-center justify-between '>

      <Link href={"/"} className="flex items-center">
          <Image alt="navbar logo" src={"/Pizza.svg"} width={60} height={60}/>
          <p className="font-bold text-xl mx-4">Pizza Wizza</p>
         
        </Link>

        <p>@copyRight towards Pizza Wizza</p>

      </div>
    </footer>
  )
}

export default Footer
