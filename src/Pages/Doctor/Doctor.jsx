import React, { useEffect, useState } from 'react';

import '../../css/pagesStyle.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import WorkDay from '../../Components/WorkDay/WorkDay';
import Alert from '@mui/material/Alert';


function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: ""
    });
    const [updateDoctor, setUpdateDoctor] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: ""
    });

    const [alert, setAlert] = useState(false);




    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = () => {
        axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/doctors")
            .then((res) => {
                setDoctors(res.data.content);
            })
            .catch(error => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
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
        axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/doctors", newDoctor)
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
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
                console.error('There was an error adding the doctor!', error);
            });
    };

    const handleDeleteDoctor = (doctorId) => {
        axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors/${doctorId}`)
            .then(() => {
                console.log("Doctor deleted:", doctorId);
                fetchDoctors(); // Doktor silindikten sonra doktor listesini yeniden çağırır
            })
            .catch(error => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
                console.error('There was an error deleting the doctor!', error);
            });
    };

    const handleUpdateDoctorInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateDoctor((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const handleUpdateDoctor = () => {
        const { id } = updateDoctor;
        axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors/${id}`, updateDoctor)
            .then((res) => {
                console.log("Doctor updated:", res.data);
                fetchDoctors(); // Doktor güncellendikten sonra doktor listesini yeniden çağırır
                setUpdateDoctor({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    city: ""
                });
            })
            .catch(error => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
                console.error('There was an error updating the doctor!', error);
            });
    };

    const handleUpdateDoctorBtn = (doctor) => {

        setUpdateDoctor(doctor)
    }

    return (
        <div className='container'>
              {alert && <Alert severity="error">Opss...Bir şeyler ters gitti.</Alert>}
            
            <div className="area">
            {/* Doktor bilgileri giriş alanları */}
            <h3>Veteriner Ekleme</h3>
            <TextField
                variant="standard"
                type="text"
                name="name"
                placeholder="Adı Soyadı"
                value={newDoctor.name}
                onChange={handleNewDoctorInputChange}
            />
            <TextField
                variant="standard"
                type="text"
                name="phone"
                placeholder="Telefon"
                value={newDoctor.phone}
                onChange={handleNewDoctorInputChange}
            />
            <TextField
                variant="standard"
                type="text"
                name="email"
                placeholder="E-mail"
                value={newDoctor.email}
                onChange={handleNewDoctorInputChange}
            />
            <TextField
                variant="standard"
                type="text"
                name="address"
                placeholder="Adres"
                value={newDoctor.address}
                onChange={handleNewDoctorInputChange}
            />
            <TextField
                variant="standard"
                type="text"
                name="city"
                placeholder="Şehir"
                value={newDoctor.city}
                onChange={handleNewDoctorInputChange}
            />


            {/* Ekle butonu */}
            <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddNewDoctor}>Ekle</Button>

</div>

            <div className="area">

            {/* Doktor güncelleme alanları */}


            <h3>Veteriner Güncelleme</h3>
            <TextField
                variant="standard"
                type="text"
                name="name"
                placeholder="Adı Soyadı"
                value={updateDoctor.name}
                onChange={handleUpdateDoctorInputChange}
            />
            <TextField
                variant="standard"
                type="text"
                name="phone"
                placeholder="Telefon"
                value={updateDoctor.phone}
                onChange={handleUpdateDoctorInputChange}
            />
            <TextField
                variant="standard"
                type="text"
                name="email"
                placeholder="E-mail"
                value={updateDoctor.email}
                onChange={handleUpdateDoctorInputChange}
            />
            <TextField
                variant="standard"
                type="text"
                name="address"
                placeholder="Adres"
                value={updateDoctor.address}
                onChange={handleUpdateDoctorInputChange}
            />
            <TextField
                variant="standard"
                type="text"
                name="city"
                placeholder="Şehir"
                value={updateDoctor.city}
                onChange={handleUpdateDoctorInputChange}
            />


            {/* Güncelle butonu */}
            <Button variant="contained" endIcon={<EditIcon />} onClick={handleUpdateDoctor}>Güncelle</Button>
</div>
          

            <div className="area">

               
                <h3>Veteriner Listesi</h3>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Ad Soyad</TableCell>
                                <TableCell align="right">Telefon</TableCell>
                                <TableCell align="right">E-mail</TableCell>
                                <TableCell align="right">Adres</TableCell>
                                <TableCell align="right">Şehir</TableCell>
                                <TableCell align="right">İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doctors?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.address}</TableCell>
                                    <TableCell align="right">{row.city}</TableCell>
                                    <TableCell align="right">

                                        <span onClick={() => handleUpdateDoctorBtn(row)} id={row.id} style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}>
                                            <EditIcon />
                                        </span>
                                        <span onClick={() => handleDeleteDoctor(row.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
                                            <DeleteForeverIcon />
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>




            <WorkDay />

        </div>
    );
}

export default Doctor;
