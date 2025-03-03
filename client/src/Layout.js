import React from 'react'
import {Outlet} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';


const Layout = () => {
  return (
  <>
 
    <div className=' text-black grid grid-row-3 gap-4 min-h-screen '>
      <div className='row-span-1 h-20 flex items-center justify-center flex-shrink-0 sticky top-0 z-50'>
        <Navbar/>
      </div>
        <main className='  flex-grow'>
          <Outlet/>   
        </main>
      <div className=' flex-shrink-0'>
        {/* <Footer/> */}
      </div>
    </div>
    </>
  )
}

export default Layout