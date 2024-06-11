"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewCard({Interview}) {
    const router =useRouter()
  return (
   <div className=''>
     <div className=' border shadow-sm m-2 p-4 rounded-lg'>
     <h2 className='font-bold text-primary'>{Interview?.jobPosition}</h2>
     <h2 className='text-sm text-gray-500'>{Interview.jobExperience} Years of Experience</h2>
     <h2 className='text-xs text-gray-500'>Created At:{Interview?.createdAt}</h2>
        <div className='flex justify-between my-2'>
            <Button onClick={()=>{router.push('/dashboard/interview/'+Interview?.mockId)}} variant="outline">Feedback</Button>
            <Button onClick={()=>router.push('/dashboard/interview/'+Interview?.mockId+'/feedback')}>Start</Button>
        </div>
    </div>
   </div>
  )
}

export default InterviewCard
// 