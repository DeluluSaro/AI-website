"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
  const [feedback, setFeedBack] = useState([])
  useEffect(() => {
    GetPrompt()
  }, [])
  const GetPrompt = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockId, params.InterviewID))
      .orderBy(UserAnswer.id)
    setFeedBack(result)
    console.log(result)

  }
const router =useRouter()
  return (
    <div className=' p-10'>
      <h1 className='text-green-400 font-bold text-5xl mt-5'>Congratulations on Your Interview</h1>
      {feedback?.length==0?<><h1 className='font-bold text-2xl'>Sorry!!! No Records Found</h1></>:<>
        <p className='text-xl font-bold mt-6'>Here is Your Feedback for the Interview</p>
      <p>Here is the Rating for your Interview <strong>7/10</strong></p>
      {feedback && feedback.map((item, index) => (

        <Collapsible key={index}>
          <CollapsibleTrigger className='p-2 bg-secondary rounded-xl my-2 hover:text-primary transition-all duration-1000 hover:mt-4'>{item?.question}</CollapsibleTrigger>
          <CollapsibleContent>
            <div className='flex flex-col gap-5'>
              <h2 className='text-red-500 p-2 border rounded-lg bg-red-300'><strong>Rating:</strong>{item?.rating}</h2>
              <h2 className='p-2 border bg-yellow-200 rounded-lg'><strong>YourAnswer:</strong>{item?.userAns}</h2>
              <h2 className='p-2 border rounded-lg bg-green-400'><strong>CorrectAns:</strong>{item?.correctAns}</h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
  

      ))

      }
      </>}
     

      <Button onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  )
}

export default Feedback
Feedback