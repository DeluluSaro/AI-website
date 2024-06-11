
import React from 'react'
import AddnewInterview from './_components/AddnewInterview'
import InterviewList from './_components/InterviewList'



function Dashboard() {
  return (
    <div>
     
      <div>
      <h1 className='font-bold text-5xl my-4 text-primary'>Dashboard</h1>
      <h2 className='text-gray-400'>Start your Interview now ... Easy to test Knowledge and much more </h2>
      </div>

      <div className='grid grid-flow-col md:grid-cols-1 lg:grid-cols-3 '>
      <AddnewInterview></AddnewInterview>
      </div>


      <div>
        <InterviewList></InterviewList>



      </div>
    </div>
  )
}

export default Dashboard
