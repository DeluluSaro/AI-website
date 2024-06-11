"use client"

import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard'

function InterviewList() {

    const { user } = useUser()
    const    [Interview, setInterview] = useState()
    useEffect(() => {
        user && getList()

    }, [user])


    const getList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview?.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id))

            console.log(result)
            setInterview(result)

    }
    return (
        <div className=''>
            <h1 className='font-bold text-4xl text-primary mt-10'>Previous Interview List</h1>

  <div className='grid md:grid-cols-1 lg:grid-cols-3 m-5 gap-5'>
  {Interview&&Interview.map((item,index)=>(

<InterviewCard key={index} Interview={item}></InterviewCard>

  ))}
  </div>

        </div>
    )
}

export default InterviewList
