"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_component/QuestionSection';
import VideoSection from './_component/VideoSection';
import { eq } from 'drizzle-orm';
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

function StartInterview({ params }) {
const router =useRouter()
    const [interviewData, setInterviewData] = useState()
    const [MockInterviewData, setMockInterviewData] = useState()
    const [activeQuestion, setActiveQuestion] = useState(0)
    const Getdetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.InterviewID))
        const jsonMock = JSON.parse(result[0].jsonMockResp)
        setMockInterviewData(jsonMock)
        setInterviewData(result[0])
    }

    useEffect(() => {
        Getdetails()
    }, [])
    return (

        <div>
            <div className='grid md:grid-cols-1 lg:grid-cols-3 border mt-10 justify-around'>
                {/* Question Section */}
                <QuestionSection ActiveQuestion={activeQuestion} MockInterviewData={MockInterviewData}></QuestionSection>


                {/* Video Recording Section */}
                <VideoSection ActiveQuestion={activeQuestion} MockInterviewData={MockInterviewData} InterviewData={interviewData}></VideoSection>
            </div>

            <div className='flex justify-around mt-7'>
                {activeQuestion > 0 && <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>Prev Question</Button>}
                {activeQuestion != MockInterview.length - 1 && <Button onClick={() => { setActiveQuestion(activeQuestion + 1) }}>Next Question</Button>}
                {activeQuestion == 9&& <Button onClick={()=>{router.push('/dashboard/interview/'+params.InterviewID+'/feedback')}}>End Interview</Button>}
            </div>
        </div>
    )
}

export default StartInterview
