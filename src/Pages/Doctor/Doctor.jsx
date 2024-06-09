import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: ""
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        axios.get("http://localhost:8080/api/v1/doctors")
            .then((res) => {
                setDoctors(res.data.content);
            })
            .catch(error => {
                console.error('There was an error fetching the doctors!', error);
            });
    };

    const handleNewDoctorInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddNewDoctor = () => {
        axios.post("http://localhost:8080/api/v1/doctors", newDoctor)
            .then((res) => {
                console.log("New doctor added:", res.data);
                fetchDoctors(); // Yeni doktor ekledikten sonra doktor listesini yeniden çağırır
                setNewDoctor({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    city: ""
                });
            })
            .catch(error => {
                console.error('There was an error adding the doctor!', error);
            });
    };

    const handleDeleteDoctor = (doctorId) => {
        axios.delete(`http://localhost:8080/api/v1/doctors/${doctorId}`)
            .then((res) => {
                console.log("Doctor deleted:", doctorId);
                fetchDoctors(); // Doktor silindikten sonra doktor listesini yeniden çağırır
            })
            .catch(error => {
                console.error('There was an error deleting the doctor!', error);
            });
    };

    const handleUpdateDoctor = (doctorId, updatedDoctor) => {
        axios.put(`http://localhost:8080/api/v1/doctors/${doctorId}`, updatedDoctor)
            .then((res) => {
                console.log("Doctor updated:", res.data);
                fetchDoctors(); // Doktor güncellendikten sonra doktor listesini yeniden çağırır
            })
            .catch(error => {
                console.error('There was an error updating the doctor!', error);
            });
    };

    return (
        <div>
            {/* Doktor bilgileri giriş alanları */}
            <input
                type="text"
                name="name"
                placeholder="Adı Soyadı"
                value={newDoctor.name}
                onChange={handleNewDoctorInputChange}
            />
            <input
                type="text"
                name="phone"
                placeholder="Telefon"
                value={newDoctor.phone}
                onChange={handleNewDoctorInputChange}
            />
            <input
                type="text"
                name="email"
                placeholder="E-mail"
                value={newDoctor.email}
                onChange={handleNewDoctorInputChange}
            />
            <input
                type="text"
                name="address"
                placeholder="Adres"
                value={newDoctor.address}
                onChange={handleNewDoctorInputChange}
            />
            <input
                type="text"
                name="city"
                placeholder="Şehir"
                value={newDoctor.city}
                onChange={handleNewDoctorInputChange}
            />
           
            
            {/* Ekle butonu */}
            <button onClick={handleAddNewDoctor}>Ekle</button>

             {/* Doktor listesi */}
             <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id}>
                        {doctor.name} - {doctor.email} - {doctor.city}
                        <span onClick={() => handleDeleteDoctor(doctor.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
                            DELETE
                        </span>
                        <span onClick={() =>  handleUpdateDoctor(doctor)} style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}>
                            UPDATE
                        </span>
                       
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Doctor;
