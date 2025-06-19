import React from 'react'
import Connect1 from "./components/Connect1.jsx"
import Connect2 from './components/Connect2.jsx'
import Connect3 from './components/Connect3.jsx'
import ContactSection2 from '../GeneralComponents/Contact/ContactSection2.jsx'
import HomePage6 from "../HomePage/Components/HomePage5.jsx"

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-[50px] lg:gap-[100px] bg-[#fbfbfb] overflow-hidden'>
      <Connect1 />
      <Connect2 />
      <Connect3 />
      <ContactSection2 />
      <HomePage6 />
    </div>
  )
}

export default page