import React, { useEffect, useState } from 'react'
import '../../css/pagesStyle.css';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

function Report() {

  const [report, setReport] = useState([]);
  const [newReport, setNewReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointmentId: "",
  });
  const [updateReport, setUpdateReport] = useState({
    title: "",
    diagnosis: "",
    price: "",
    appointmentId: ""
  });

  const [appointment, setAppointment] = useState([]);
  const [alert, setAlert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [searchedID, setSearchedID] = useState("");


  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/reports")
      .then((res) => {
        setReport(res.data.content);
        setUpdate(false);

      })
      .catch(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000)
      });

    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/appointments").then((res) => {
      setAppointment(res.data.content);
      setUpdate(false);
    }).catch(() => {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000)
    });

  }, [update]);


  // CREATE

  const handleNewReportInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleAppointmentSelectChange = (e) => {
    const id = e.target.value;
    setNewReport((prev) => ({
      ...prev,
      appointmentId: id,
    }));
    console.log(newReport)
  };


  const handleAddNewReport = () => {
    axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/reports", newReport)
      .then(() => setUpdate(true))
      .then(() => setNewReport({
        title: "",
        diagnosis: "",
        price: "",
        appointmentId: "",
      })).catch(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000)
      });
  };


  // UPDATE
  const handleUpdateReportBtn = (report) => {
    setUpdateReport(report);
    console.log("updateReport BTN", updateReport)
  };


  const handleUpdateReportInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateReport((prev) => ({
      ...prev,
      [name]: value
    }));
    console.log("INPUT"+updateReport)
  };



    const handleUpdateAppointmentSelectChange = (e) => {
    const id = e.target.value;

    setUpdateReport((prev) => ({
        ...prev,
        appointmentId: id,
    }));
    console.log("İd"+id + "yazdır" + updateReport)

  }
  
  const handleUpdateReport = () => {
    const { id } = updateReport;
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports/${id}`, updateReport)
      .then((res) => {
        console.log("Report updated:", res.data);
        setUpdate(true)
        setUpdateReport({
          title: "",
          diagnosis: "",
          price: "",
          appointmentId: "",
        });
      })
      .catch(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000)
      });


  }



  // DELETE
  const handleDeleteReport = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports/${id}`)
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
    <div className='container'>
      {alert && <Alert severity="error">Opss...Bir şeyler ters gitti.</Alert>}
      <div className='area'>
        <h3>Rapor Ekle</h3>
        <TextField
          variant="standard"
          type='text'
          name='title'
          placeholder='Başlık'
          value={newReport.title}
          onChange={handleNewReportInputChange}
        />
        <TextField
          variant="standard"
          type='text'
          name='diagnosis'
          placeholder='Teşhis'
          value={newReport.diagnosis}
          onChange={handleNewReportInputChange}
        />
        <TextField
          variant="standard"
          type='number'
          name='price'
          placeholder='Ücret'
          value={newReport.price}
          onChange={handleNewReportInputChange}
        />
        <Select
          labelId="Appointment"
          id="AppointmentSelect"
          value={newReport.appointmentId || ""}
          onChange={handleAppointmentSelectChange}
        >
          {appointment?.map((doc, index) => (
            <MenuItem key={index} value={doc.id}>{doc.appointmentDate} - {doc.animal.name} - {doc.doctor.name} </MenuItem>
          ))}

        </Select>

        <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddNewReport}>Ekle</Button>
      </div>

      <div className='area'>
        <h3>Rapor Güncelle</h3>
        <TextField
          variant="standard"
          type='text'
          name='title'
          placeholder='Başlık'
          value={updateReport.title}
          onChange={handleUpdateReportInputChange}
        />
        <TextField
          variant="standard"
          type='text'
          name='diagnosis'
          placeholder='Teşhis'
          value={updateReport.diagnosis}
          onChange={handleUpdateReportInputChange}
        />
        <TextField
          variant="standard"
          type='number'
          name='price'
          placeholder='Ücret'
          value={updateReport.price}
          onChange={handleUpdateReportInputChange}
        />
        <Select
          labelId="AppointmentUpdate"
          id="AppointmentSelectUpdate"
          value={updateReport.appointmentId || ""}
          onChange={handleUpdateAppointmentSelectChange}
        >
          {appointment?.map((doc, index) => (
            <MenuItem key={index} value={doc.id}>{doc.appointmentDate} - {doc.animal.name} - {doc.doctor.name} </MenuItem>
          ))}

        </Select>

        <Button variant="contained" endIcon={<SendIcon />} onClick={handleUpdateReport}>Güncelle</Button>
      </div>

      <div className='area'>
        <h3>Rapor Listesi</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Başlık</TableCell>

                <TableCell align="right">Teşhis</TableCell>
                <TableCell align="right">Hayvan</TableCell>
                <TableCell align="right">Veteriner</TableCell>
                <TableCell align="right">Randevu</TableCell>
                <TableCell align="right">Ücret</TableCell>
                <TableCell align="right">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report?.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell >{row.title}</TableCell>
                  <TableCell align="right">{row.diagnosis}</TableCell>
                  <TableCell align="right">{row.appointment.animalName}</TableCell>
                  <TableCell align="right">{row.appointment.doctorName}</TableCell>
                  <TableCell align="right">{row.appointment.date}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">

                    <span onClick={() => handleUpdateReportBtn(row)} style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}>
                      <EditIcon />
                    </span>
                    <span onClick={() => handleDeleteReport(row.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
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
  )
}

export default Report