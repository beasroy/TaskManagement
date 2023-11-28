import React from 'react';

import Header from './component/Header.js';

import TaskList from './component/TaskList.js';


function App() {
 

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
);
}
export default App;
