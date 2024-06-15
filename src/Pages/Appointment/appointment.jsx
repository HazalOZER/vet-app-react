import React, { useEffect, useState } from 'react'
import '../../css/pagesStyle.css';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function appointment() {

  const [appointment, setAppointment] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    doctor: {},
    animal: {},
  });
  const [updateAppointment, setUpdateAppointment] = useState(
    {
      appointmentDate: "",
      doctor: {},
      animal: {},
    }
  );
  const [doctor, setDoctor] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [formatedDate, setFormatedDate] = useState("");
  const [searchDateAppointment, setSearchDateAppointment] = useState({
    startDate: "",
    endDate: ""
  });
  const [animalID, setAnimalID] = useState("");
  const [doctorID, setDoctorID] = useState("");

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/appointments")
      .then((res) => {
        setAppointment(res.data.content);
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

    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals").then((res) => {
      setAnimal(res.data.content);
      setUpdate(false);
    }).catch(() => {
      setAlert(true);
      setTimeout(() => {
        setAlert(true);
      }, 3000)
    });
  }, [update]);

  // const change (e) => {
  //   e.target.value = e.target.value.replace((prev) => { ...prev, ".0000"});
  // }

  const handleNewAppointmentInputChange = (e) => {


    const { name, value } = e.target;




    setNewAppointment((prev) => ({
      ...prev,
      [name]: value
    }));
    console.log(e.target.value);
  };

  const newLocalDate = (e) => {
    const date = e.target.value;
    setFormatedDate(date + ":00.000");
    console.log(formatedDate);
    setNewAppointment((prev) => ({
      ...prev,
      appointmentDate: formatedDate
    }));
  }

  const handleAnimalSelectChange = (e) => {
    const id = e.target.value;
    const newAnimal = animal.find((ani) => ani.id === +id)
    setNewAppointment((prev) => ({
      ...prev,
      animal: newAnimal
    }));
    console.log(newAppointment);
  }

  const handleDoctorSelectChange = (e) => {
    const id = e.target.value;
    const newDoctor = doctor.find((doc) => doc.id === +id)
    setNewAppointment((prev) => ({
      ...prev,
      doctor: newDoctor
    }));
    console.log(newAppointment);

  }

  const handleAddNewAppointment = () => {
    axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/appointments", newAppointment)
      .then(() => setUpdate(true))
      .then(() => setNewAppointment({
        appointmentDate: "",
        doctor: {},
        animal: {},
      })).catch(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000)
      });
  }

  const updateLocalDate = (e) => {
    const date = e.target.value;
    setFormatedDate(date + ":00.000");
    console.log(formatedDate);
    setUpdateAppointment((prev) => ({
      ...prev,
      appointmentDate: formatedDate
    }));
  }

  const handleUpdateAnimalSelectChange = (e) => {
    const id = e.target.value;
    const newAnimal = animal.find((ani) => ani.id === +id)
    setUpdateAppointment((prev) => ({
      ...prev,
      animal: newAnimal
    }));

  }

  const handleUpdateDoctorSelectChange = (e) => {
    const id = e.target.value;
    const newDoctor = doctor.find((doc) => doc.id === +id)
    setUpdateAppointment((prev) => ({
      ...prev,
      doctor: newDoctor
    }));
    console.log(newAppointment);

  }

  const handleUpdateAppointment = () => {
    const { id } = updateAppointment;
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/${id}`, updateAppointment)
      .then((res) => {
        console.log("appointments updated:", res.data);
        setUpdate(true)
        setUpdateAppointment({
          appointmentDate: "",
          doctor: {},
          animal: {},
        });
      })
      .catch(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000)
      });


  }

  const handleUpdateAppointmentBtn = (appointment) => {
    setUpdateAppointment(appointment);
  };

  const handleDeleteAppointment = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/${id}`)
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

const handleSearchDateAppointmentInputChange = (e) => {
  const { name, value } = e.target;
  setSearchDateAppointment((prev) => ({
    ...prev,
    [name]: value
  }));
  console.log(searchDateAppointment);

};

const handleAnimalSelectSearch = (e) => {
  const id = e.target.value;

  setAnimalID(id);
  console.log(animalID);
}

const handleDoctorSelectSearch = (e) => {
  const id = e.target.value;

  setDoctorID(id);
  console.log(doctorID);
}

const handlesearchDate = () => {
  axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/searchByDoctorAndDateRange?startDate=${searchDateAppointment.startDate}&endDate=${searchDateAppointment.endDate}`)
    .then((res) => {
      setAppointment(res.data.content);
      setUpdate(false);
    })
    .catch(() => {
      setAlert(true);
      setTimeout(() => {
        setAlert(true);
      }, 3000)
    });
}

const handleSearchDoctor = () => {
  axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/searchByDoctorAndDateRange?id=${doctorID}&startDate=${searchDateAppointment.startDate}&endDate=${searchDateAppointment.endDate}`)
    .then((res) => {
      setAppointment(res.data.content);
      setUpdate(false);
    })
    .catch(() => {
      setAlert(true);
      setTimeout(() => {
        setAlert(true);
      }, 3000)
    });
}

const handleSearchAnimal = () => {
  axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/searchByAnimalAndDateRange?id=${animalID}&startDate=${searchDateAppointment.startDate}&endDate=${searchDateAppointment.endDate}`)
    .then((res) => {
      setAppointment(res.data.content);
      setUpdate(false);
    })
    .catch(() => {
      setAlert(true);
      setTimeout(() => {
        setAlert(true);
      }, 3000)
    });
}
const showAll = () => {
  setUpdate(true);
}
  return (
    <>
      <div className='container'>
      {alert && <Alert severity="error">Opss...Bir şeyler ters gitti.</Alert>}

      <div className='area'>
        <h3>Randevu Ekle</h3>
        <input

          type="datetime-local"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={newLocalDate}
        />
        <Select
          labelId="Animal"
          id="AnimalSelect"
          value={newAppointment.animal.id || ""}
          label="Age"
          onChange={handleAnimalSelectChange}
        >
          {animal?.map((cus, index) => (
            <MenuItem key={index} value={cus.id}>{cus.name}</MenuItem>
          ))}

        </Select>

        <Select
          labelId="Doctor"
          id="DoctorSelect"
          value={newAppointment.doctor.id || ""}
          label="Age"
          onChange={handleDoctorSelectChange}
        >
          {doctor?.map((doc, index) => (
            <MenuItem key={index} value={doc.id}>{doc.name}</MenuItem>
          ))}

        </Select>

        <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddNewAppointment}>Ekle</Button>
</div>

        <div className='area'>
          <h3>Randevu Güncelle</h3>
          <input

            type="datetime-local"
            name="appointmentDate"
            value={updateAppointment.appointmentDate}
            onChange={updateLocalDate}
          />
          <Select
            labelId="Animal"
            id="AnimalSelectUpdate"
            value={updateAppointment.animal.id || ""}
            label="Age"
            onChange={handleUpdateAnimalSelectChange}
          >
            {animal?.map((cus, index) => (
              <MenuItem key={index} value={cus.id}>{cus.name}</MenuItem>
            ))}

          </Select>

          <Select
            labelId="Doctor"
            id="DoctorSelectUpdate"
            value={updateAppointment.doctor.id || ""}
            label="Age"
            onChange={handleUpdateDoctorSelectChange}
          >
            {doctor?.map((cus, index) => (
              <MenuItem key={index} value={cus.id}>{cus.name}</MenuItem>
            ))}

          </Select>

          <Button variant="contained" endIcon={<EditIcon />} onClick={handleUpdateAppointment}>Güncelle</Button>
        </div>

        
      <div className='area'>
        <h3>Randevu Listesi</h3>



        <div className="label">
          <label htmlFor="startDate" >*Başlangıç Tarihi </label>
          <TextField
            variant="standard"
            type="date"
            name="startDate"
            id="startDate"
            // label="Bitiş Tarihi"
            value={searchDateAppointment.startDate}
            onChange={handleSearchDateAppointmentInputChange}
          />
        </div>

        <div className="label">
          <label htmlFor="endDate" >*Bitiş Tarihi</label>
          <TextField
            variant="standard"
            type="date"
            name="endDate"
            id="endDate"
            // label="Bitiş Tarihi"
            value={searchDateAppointment.endDate}
            onChange={handleSearchDateAppointmentInputChange}
          />
        </div>
 <Button variant="contained" endIcon={<EditIcon />} onClick={handlesearchDate}>Tarih Aralığındakiler</Button>
        <Select
            labelId="Animal"
            id="AnimalSelect"
            value={animalID || ""}
            onChange={handleAnimalSelectSearch}
          >
            {animal?.map((cus, index) => (
              <MenuItem key={index} value={cus.id}>{cus.name}</MenuItem>
            ))}

          </Select>
 <Button variant="contained" endIcon={<EditIcon />} onClick={handleSearchAnimal}>Hayvan Özelinde Tarih Aralığı</Button>
          <Select
            labelId="Doctor"
            id="DoctorSelect"
            value={doctorID || ""}
            label="Age"
            onChange={handleDoctorSelectSearch}
          >
            {doctor?.map((cus, index) => (
              <MenuItem key={index} value={cus.id}>{cus.name}</MenuItem>
            ))}

          </Select>

         
         
          <Button variant="contained" endIcon={<EditIcon />} onClick={handleSearchDoctor}>Veteriner Özelinde Tarih Aralığı</Button>

          <Button variant="contained" endIcon={<SendIcon />} onClick={showAll}>Tümünü Listele</Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Randevu </TableCell>

                <TableCell align="right">Doktor</TableCell>
                <TableCell align="right">Hayvan</TableCell>

                <TableCell align="right">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointment?.map((row) => (
                <TableRow
                  key={row.appointmentDate}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell >{row.appointmentDate}</TableCell>
                  <TableCell align="right">{row.doctor.name}</TableCell>
                  <TableCell align="right">{row.animal.name}</TableCell>

                  <TableCell align="right">

                    <span onClick={() => handleUpdateAppointmentBtn(row)} style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}>
                      <EditIcon />
                    </span>
                    <span onClick={() => handleDeleteAppointment(row.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
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
    </>
  )
}

export default appointment