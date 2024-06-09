import React from 'react'
import { useNavigate } from 'react-router-dom'

function welcome() {

    const navigate = useNavigate();
    const navigateAnimal = () => { navigate('/animal') };
    const navigateCustomer = () => { navigate('/customer') };
    const navigateDoctor = () => { navigate('/doctor') };
    const navigateVaccination = () => { navigate('/vaccination') };
    const navigateAppointment = () => { navigate('/appointment') };
    const navigateReport = () => { navigate('/report') };
  return (
    <>
           <div>welcome</div>
              
              <button onClick={navigateCustomer}>Müşteri</button>
              <button onClick={navigateAnimal}>Hayvan</button>
              <button onClick={navigateDoctor}>Veteriner</button>
              <button onClick={navigateAppointment}>Randevu</button>
              <button onClick={navigateVaccination}>Aşı</button>
              <button onClick={navigateReport}>Rapor</button>

    </>
 

  )
}

export default welcome