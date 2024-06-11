import { Lightbulb, Volume2,  } from 'lucide-react'
import React from 'react'

function QuestionSection({MockInterviewData,ActiveQuestion}) {
  const TexttoSpeech=(text)=>{
    if('speechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }else {
      toast("Your Window is not supporting Speech")

    }
  }
  return MockInterviewData&&(
    <div className='p-5 border rounded-lg m-5 '>    
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 '>
      {MockInterviewData&&MockInterviewData.map((question,index)=>(
        <h2 className={`text-[10px] m-3 text-center w-14 h-10  p-2  rounded-lg cursor-pointer ${ActiveQuestion==index&&'bg-primary text-white'}`}>Question #{index+1}</h2>
      ))}


     
      
      </div>
      {/* Questions */}
      <h2 className=' text-[15px] m-3 text-justify'>{MockInterviewData[ActiveQuestion]?.question}</h2>

      <Volume2 className='hover:text-primary cursor-pointer' onClick={()=>TexttoSpeech(MockInterviewData[ActiveQuestion]?.question)}></Volume2>


      <div className='p-4 bg-yellow-100 mt-10'>
      
        <h2 className='flex gap-2 text-yellow-400 '>
        <Lightbulb  ></Lightbulb>
            <strong>Note : </strong>
        </h2>
        <p className='text-yellow-400'>Click on Record ,when you need to answer the question and click finish Interview if you have answered all Questions 💛.</p>
      </div>
    </div>
  )
}

export default QuestionSection
