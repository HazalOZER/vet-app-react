import React, { useState } from 'react';
import axios from 'axios';

function DoctorAvailability() {
    const [workDay, setWorkDay] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "workDay") {
            setWorkDay(value);
        } else if (name === "doctorId") {
            setDoctorId(value);
        }
    };

    const handleSubmit = () => {
        if (!workDay || !doctorId) {
            setMessage("Lütfen tüm alanları doldurun.");
            return;
        }

        const data = {
            workDay: workDay,
            doctorId: doctorId
        };

        axios.post("http://localhost:8080/api/v1/available-dates", data)
            .then((res) => {
                console.log("Müsait gün başarıyla kaydedildi:", res.data.content);
                setMessage("Müsait gün başarıyla kaydedildi.");
            })
            .catch(error => {
                console.error('There was an error adding the doctor availability!', error);
                setMessage("Müsait gün kaydedilirken bir hata oluştu.");
            });
    };

    return (
        <div>
            <h2>Doktorun Müsait Günlerini Kaydet</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="workDay">Çalışma Günü:</label>
                    <input
                        type="date"
                        id="workDay"
                        name="workDay"
                        value={workDay}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="doctorId">Doktor ID:</label>
                    <input
                        type="number"
                        id="doctorId"
                        name="doctorId"
                        value={doctorId}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Kaydet</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default DoctorAvailability;
