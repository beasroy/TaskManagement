import React from 'react'

const Header = () => {
   
  return (
    <header className='w-full h-full flex justify-center items-center flex-col'>
         <nav className='flex flex-row justify-between items-center w-full pt-3 mb-10'>
          <p>Task</p>
            <button type='button' onClick={()=> Window.open('https://github.com/beasroy')} className='black_btn'>Github</button>
        </nav> 
        <h1 className='head_text'>
        Productive 
        <span className='pink_gradient'> Task Manager</span>
      </h1>
      <h2 className='desc'>
      Plan your daily work and covenient Task Manager for all
      </h2>
     

    </header>
  )
}

export default Header