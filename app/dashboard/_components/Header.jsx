"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import AddnewInterview from './AddnewInterview'

function Header() {


    const path=usePathname()
    console.log(path)
  return (
    <div className='flex  justify-between item shadow-xl '>
   <Image src='/logo.svg' width={140} height={100}></Image>

   <ul className='hidden md:flex gap-20 align-middle items-center '>
    <li className={`hover:text-primary hover:font-bold cursor-pointer transition-all duration-1000 hover:tracking-[2px] ${path=='/dashboard'&&'text-primary font-bold'}`}>Dashboard</li>
    <li className={`hover:text-primary hover:font-bold cursor-pointer transition-all duration-1000 hover:tracking-[2px] ${path=='/dashboard/how'&&'text-primary font-bold'}` }>How it Works?</li>
    <li className={`hover:text-primary hover:font-bold cursor-pointer transition-all duration-1000 hover:tracking-[2px] ${path=='/dashboard/upgrade'&&'text-primary font-bold'}`}>Upgrade</li>
    <li className={`hover:text-primary hover:font-bold cursor-pointer transition-all duration-1000 hover:tracking-[2px] ${path=='/dashboard/questions'&&'text-primary font-bold'}`}>Questions</li>
   </ul>

   <div className='items-center m-5'>
   <UserButton></UserButton>
   </div>
   
    </div>

    
  )
}

export default Header
