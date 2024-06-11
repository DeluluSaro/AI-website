"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { useUser, user } from '@clerk/nextjs'
import { eq, param } from 'drizzle-orm'
import { HeartIcon, Lightbulb, WebcamIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'


import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'


function interview({ params }) {
  useEffect(() => {
    console.log(params.InterviewID)
    Getdetails()
  }, [])
  // const [loading,setLoading]=useState(false)
  const { user } = useUser()
  const [getData, setGetData] = useState([])
  const [webCamEnabled, setWebCamEnabled] = useState(false)
const router=useRouter()
  const Getdetails = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.InterviewID))
    setGetData(result[0]);
  }
  return (
    <div className=''>
      <h1 className='font-bold m-10 text-[35px] text-center hover:tracking-[5px] transition-all duration-1000'>Lets <span className='text-primary hover:text-black transition-all duration-2000'> Get's</span> Started</h1>
      <div className='flex  gap-9 '>
        <div className='flex flex-col justify-center'>
          {webCamEnabled ? <div className='flex justify-center bg-primary w-[350px] h-[350px] rounded-xl mx-[150px]  hover:bg-black  transition-all duration-2000 '>
            <Webcam mirrored={true} onUserMedia={() => setWebCamEnabled(true)} onUserMediaError={() => setWebCamEnabled(false)} className='w-[300px] h-[300px] flex justify-center' ></Webcam>

          </div> :
            <div className='flex flex-col justify-center items-center gap-5 '>
              <WebcamIcon style={{ width: 300, height: 300, backgroundColor: "#ababab", borderRadius: 40 }} ></WebcamIcon>
              <Button className='my-2 w-40 p-4' onClick={() => setWebCamEnabled(true)}>Turn on Camera</Button>
            </div>
          }
        </div>


        <div className='flex flex-col text-justify  justify-center align-middle '>
          <h2><strong>Name : </strong>{user?.fullName}</h2>
          <h2><strong>Job Position / Job Role : </strong>{getData?.jobPosition}</h2>
          <h2><strong>Job Description : </strong>{getData?.jobDesc}</h2>
          <h2><strong>Job Experience : </strong>{getData?.jobExperience}</h2>
          <div className='bg-yellow-200 p-3 rounded-xl m-2'>
            <div className='flex  p-4 -mx-4'>
              <h1 className='font-bold text-xl'>Information</h1>
              <Lightbulb className='text-yellow-300'></Lightbulb>


            </div>
            <p className=''>Enable your camera to fully engage with our interactive features and participate in live interview . Click "Allow" when prompted and ensure your camera is connected and functioning properly.</p>
          </div>
        <div>
      
         <Button onClick={()=>router.push(`/dashboard/interview/${params.InterviewID}/start`)}>Let's  Start Interview</Button>
         
        </div>
        </div>

      </div>
    </div>
  )
}

export default interview
