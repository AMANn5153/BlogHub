import React from 'react'
import {Outlet} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { motion } from "motion/react" 


const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
}

const Layout = () => {
  return (
  <>
    <motion.div 
  transition={transition}>
    <div className='bg-white text-black grid grid-row-3 gap-4 min-h-screen '>
      <div className='row-span-1 h-20 flex items-center justify-center flex-shrink-0 sticky top-8 z-50'>
        <Navbar/>
      </div>
        <main className='m-9 flex-grow'>
          <Outlet/>   
        </main>
      <div className='flex-shrink-0'>
        <Footer/>
      </div>
    </div>
    </motion.div>
    </>
  )
}

export default Layout