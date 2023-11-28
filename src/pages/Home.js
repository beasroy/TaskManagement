import React from 'react'
import Header from '../component/Header'
import TaskList from '../component/TaskList'
const Home = () => {
  return (
    <main>
 
    <div className='main'>
        <div className='gradient' />
    </div>
    <div className='app'>
  <Header />
   <TaskList />
    </div>
    </main>
  )
}

export default Home