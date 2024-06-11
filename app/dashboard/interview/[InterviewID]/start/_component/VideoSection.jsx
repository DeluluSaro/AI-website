import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Heading2, Mic, Mic2 } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAimodal';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';
function VideoSection({ ActiveQuestion, MockInterviewData, InterviewData }) {
  const [userAnswer, setUserAnswer] = useState('')
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });


  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ))
  }, [results])
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateDatabase()
    }
  }, [userAnswer])
  const { user } = useUser()
  const UpdateDatabase = async () => {
    const Prompt = "Question : " + MockInterviewData[ActiveQuestion]?.question + ', User Answer :' +  userAnswer  + ',Depends on question and user answer for give interview question' + 'please give us rating for answer and feedback as area of improvement if any  in just 3 to 5 lines to improve it in JSON format with rating field and feedback field';
    const result = await chatSession.sendMessage(Prompt)
    const mockResp = (result.response.text()).replace('```json', '').replace('```', '')
    console.log(mockResp)
    const JsonMockResp = JSON.parse(mockResp)


    const resp = await db.insert(UserAnswer)
      .values({
        mockId: InterviewData?.mockId,
        question: MockInterviewData[ActiveQuestion]?.question,
        correctAns: MockInterviewData[ActiveQuestion]?.answer,
        createdAt: moment().format('DD-MM-yyyy'),
        userAns: userAnswer,
        feedback: JsonMockResp?.feedback,
        rating: JsonMockResp?.rating,
        userEmail: user?.primaryEmailAddress.emailAddress,




      })

    if (resp) {
      toast(`${user?.fullName} Response is Stored in DataBase`)
      setResults([])
    }

    setUserAnswer('')
    
  }
  return (

    <div>
      <div className='flex flex-col justify-center items-center w-[550px] h-[350px] mt-14 mx-10 bg-primary rounded-lg p-5'>
        <Image src={'/camera.png'} width={200} height={200} className='absolute'></Image>
        <Webcam mirrored={true} style={{ height: 300, width: '100%', zIndex: 10 }}></Webcam>
      </div>
      <Button className='flex ml-[250px] mt-2' onClick={async () => {
        if (isRecording) {
          stopSpeechToText()
          if (userAnswer?.length > 10) {
            toast('NO answer?')
            return;
          } else {
            toast('Record Answer Success')
          }


        } else {
          startSpeechToText()
        }
      }}>{isRecording ? <h2 className='text-red-500 flex gap-2 '>
        <Mic2></Mic2>
        Recording....
      </h2> : <h2>Start recording</h2>}</Button>
      
    </div>
  )
}

export default VideoSection
