import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/pagesStyle.css';

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

      <div className='container'>
        <div className='area'>
          <h1>Veteriner Yönetim Sistemine Hoşgeldiniz</h1>

          <h2>Yönetim Paneli</h2>
          <p>Patili Dostlarımız için aşağıdaki İşlemleri gerçekleştirebilirsiniz</p>

          <div className='buttons-area'>
            <button onClick={navigateCustomer}>Müşteri</button>
            <button onClick={navigateAnimal}>Hayvan</button>
            <button onClick={navigateDoctor}>Veteriner</button>
            <button onClick={navigateAppointment}>Randevu</button>
            <button onClick={navigateVaccination}>Aşı</button>
            <button onClick={navigateReport}>Rapor</button>
          </div>
        </div>
      </div>
    </>


  )
}

export default welcome