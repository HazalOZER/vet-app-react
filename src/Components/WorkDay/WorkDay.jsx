import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

function DoctorAvailability() {
    const [workDays, setWorkDays] = useState([]);
    const [newWorkDay, setNewWorkDay] = useState({
        workDay: "",
        doctorId: "",

    });
    const [doctor, setDoctor] = useState([]);

    const [alert, setAlert] = useState(false);
    const [update, setUpdate] = useState(false);





    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/available-dates")
            .then((res) => {
                setWorkDays(res.data.content);
                setUpdate(false);

            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(true);
                }, 3000)
            });

        axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/doctors").then((res) => {
            setDoctor(res.data.content);
            setUpdate(false);
        }).catch(() => {
            setAlert(true);
            setTimeout(() => {
                setAlert(true);
            }, 3000)
        });

    }, [update]);



    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name === "workDay") {
    //         setWorkDay(value);
    //     } else if (name === "doctorId") {
    //         setDoctorId(value);
    //     }
    // };

    // const handleSubmit = () => {
    //     if (!workDay || !doctorId) {
    //         setMessage("Lütfen tüm alanları doldurun.");
    //         return;
    //     }

    //     const data = {
    //         workDay: workDay,
    //         doctorId: doctorId
    //     };

    //     axios.post(import.meta.env.VITE_APP_BASEURL+ "/api/v1/available-dates", data)
    //         .then((res) => {
    //             console.log("Müsait gün başarıyla kaydedildi:", res.data.content);
    //             setMessage("Müsait gün başarıyla kaydedildi.");
    //         })
    //         .catch(error => {
    //             console.error('There was an error adding the doctor availability!', error);
    //             setMessage("Müsait gün kaydedilirken bir hata oluştu.");
    //         });
    // };

    const handleDoctorSelectChange = (e) => {
        const id = e.target.value;
        setNewWorkDay((prev) => ({
            ...prev,
            doctorId: id,
        }));
        console.log(newWorkDay)
    }


    const handleNewWorkDayInputChange = (e) => {
        const { name, value } = e.target;
        setNewWorkDay((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddNewWorkDay = () => {
        axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/available-dates", newWorkDay)
            .then(() => setUpdate(true))
            .then(() => setNewWorkDay({
                workDay: "",
                doctorId: "",
            })).catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
            });
    }

    const handleDeleteWorkDay = (id) => {
        axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates/${id}`)
            .then(() => {
                setUpdate(true);
            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
            });
    };
    return (
        <div>

            <div className='area' >

            {alert && <Alert severity="error">Opss...Bir şeyler ters gitti.</Alert>}
                <h2>Doktorun Müsait Günlerini Kaydet</h2>



                <Select
                    labelId="Doctor"
                    id="DoctorSelect"
                    value={newWorkDay.doctorId || ""}
                    onChange={handleDoctorSelectChange}
                >
                    {doctor?.map((doc, index) => (
                        <MenuItem key={index} value={doc.id}>{doc.name}</MenuItem>
                    ))}

                </Select>

                <TextField
                    variant="standard"
                    type="date"
                    name="workDay"
                    value={newWorkDay.workDay}
                    onChange={handleNewWorkDayInputChange}
                />

                <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddNewWorkDay}>Ekle</Button>

            </div>


            <div className='area'>

                <h3>Müsait Gün Listesi</h3>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Veteriner</TableCell>
                                <TableCell align="right">Müsait Gün</TableCell>
                                <TableCell align="right">İşlemler</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workDays?.map((row) => (
                                <TableRow
                                    key={row.workDay}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.doctor.name}
                                    </TableCell>
                                    <TableCell align="right">{row.workDay}</TableCell>

                                    <TableCell align="right">


                                        <span onClick={() => handleDeleteWorkDay(row.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
                                            <DeleteForeverIcon />
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>

        </div>
    );
}

export default DoctorAvailability;
