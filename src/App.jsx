import { useState } from 'react'
import './App.css'
import NavBar from './Components/Navbar/Navbar'
import Animal from './Pages/Animal/animal'
import Welcome from './Pages/Welcome/welcome'
import Appointment from './Pages/Appointment/appointment'
import Customer from './Pages/Customer/Customer'
import Doctor from './Pages/Doctor/Doctor'
import Vaccination from './Pages/Vaccination/vaccination'
import WorkDay from './Pages/WorkDay/WorkDay'
// import Report from './Pages/Report/report'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'


function App() {
  

  return (
    <>
      <NavBar />
     
      <div>
      <Router>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/animal' element={<Animal />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/vaccination' element={<Vaccination />} />
          <Route path='/work-day' element={<WorkDay />} />
          {/* <Route path='/report' element={<Report />} /> */}
        </Routes>
      </Router>
      
       
      </div>
    </>
  )
}

export default App
