import React, { useEffect, useState } from 'react'
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
function vaccination() {

  const [vaccination, setVaccination] = useState([]);
  const [newVaccination, setNewVaccination] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalWithoutCustomer: {}
  });
  const [updateVaccination, setUpdateVaccination] = useState({
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalWithoutCustomer: {}
  });
  const [animalWithoutCustomer, setAnimalWithoutCustomer] = useState([]);
  const [alert, setAlert] = useState(false);
  const [update, setUpdate] = useState(false);
  const [searchDateVaccine, setSearhDateVaccine] = useState({
    startDate: "2024-06-09",
    endDate: "2024-06-09"
  });
  const [searchID, setSearchID] = useState("");
  const [searchedVaccination, setSearchedVaccination] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/vaccinations")
      .then((res) => {
        setVaccination(res.data.content);
        setUpdate(false);
      })
      .catch(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(true);
        }, 3000)
      });

    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals").then((res) => {
      setAnimalWithoutCustomer(res.data.content);
      setUpdate(false);
    }).catch(() => {
      setAlert(true);
      setTimeout(() => {
        setAlert(true);
      }, 3000)
    });


  }, [update]);

  const handleNewVaccinationInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccination((prev) => ({
      ...prev,
      [name]: value
    }));
    console.log(newVaccination);
  }
  const handleAnimalSelectChange = (e) => {
    const id = e.target.value;
    const newAnimal = animalWithoutCustomer.find((cus) => cus.id === +id)
 
    setNewVaccination((prev) => ({
      ...prev,
      animalWithoutCustomer: newAnimal
    }));
    console.log(newAnimal);
  }

  const handleAddNewVaccination = () => {
    axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/vaccinations", newVaccination)
      .then(() => setUpdate(true)).then(() => setNewVaccination({
        name: "",
        code: "",
        protectionStartDate: "",
        protectionFinishDate: "",
        animalWithoutCustomer: {}
      })).catch(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000)
      });
  }

  const handleDeleteVaccination = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations/${id}`)
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

  const handleAnimalSelectSearch = (e) => {
    const id = e.target.value;
    // const newAnimal = animalWithoutCustomer.find((cus) => cus.id === +id)
    // BAD REQUEST HATASI ALIYORUM CUSTOMER SİLİNECEK
    // setNewVaccination((prev) => ({
    //   ...prev,
    //   animalWithoutCustomer:
    // }));
    setSearchID(id);
    console.log(searchID);
  }

  const handleSearchDateVaccine = (e) => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccinations/searchByVaccinationRange?startDate=${searchDateVaccine.startDate}&endDate=${searchDateVaccine.endDate}`)
      .then((res) => {
        setVaccination(res.data.content);
        searched(true);
        setUpdate(false);
        console.log(vaccination)
      })
      .catch(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(true);
        }, 3000)
      });
  }

  const handleSearchAnimal = () => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/vaccinations/searchByAnimal?id=" + searchID).then((res) => {
      setVaccination(res.data.content);
      searched(true);
      setUpdate(false);
    }).catch(() => {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000)
    });
  }

  const showAll = () => {
    setUpdate(true);
}

const handleSearchDateVaccinationInputChange = (e) => {
  const { name, value } = e.target;
  setSearhDateVaccine((prev) => ({
    ...prev,
    [name]: value
  }));
  console.log(searchDateVaccine);
}
  return (
    <div className="container">
 {alert && <Alert severity="error">Opss...Bir şeyler ters gitti.</Alert>}
      <div className="area">
        <h3>Aşı Ekle</h3>
        <TextField
          variant="standard"
          type="text"
          name="name"
          placeholder="Aşı İsmi"
          value={newVaccination.name}
          onChange={handleNewVaccinationInputChange}
        />
        <TextField
          variant="standard"
          type="text"
          name="code"
          placeholder="Aşı kodu"
          value={newVaccination.code}
          onChange={handleNewVaccinationInputChange}
        />
        <div className="label">
          <label htmlFor="protectionStartDate" >Başlangıç Tarihi</label>
          <TextField
            variant="standard"
            // label="Başlangıç Tarihi"
            type="date"
            name="protectionStartDate"
            id="protectionStartDate"

            value={newVaccination.protectionStartDate}
            onChange={handleNewVaccinationInputChange}
          />

        </div>
        <div className="label">
          <label htmlFor="protectionFinishDate" >Bitiş Tarihi</label>
          <TextField
            variant="standard"
            type="date"
            name="protectionFinishDate"
            id="protectionFinishDate"
            // label="Bitiş Tarihi"
            placeholder="Doğum Tarihi"
            value={newVaccination.protectionFinishDate}
            onChange={handleNewVaccinationInputChange}
          />
        </div>
        <div className="label">
          <label htmlFor="AnimalSelect" >Hayvan</label>
          <Select
            labelId="Animal"
            id="AnimalSelect"
            value={newVaccination.animalWithoutCustomer.id || ""}
            label="Age"
            onChange={handleAnimalSelectChange}
          >

            {animalWithoutCustomer?.map((cus, index) => (
              <MenuItem key={index} value={cus.id}>{cus.name}</MenuItem>
            ))}

          </Select>
        </div>
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddNewVaccination}>Ekle</Button>


      </div>

      <div className="area">
        <h3>Aşı Listesi</h3>


        <div className="label">
          <label htmlFor="AnimalSelect" >Hayvan</label>
          <Select
            labelId="Animal"
            id="AnimalSearch"
            value={searchID || ""}
            label="Age"
            onChange={handleAnimalSelectSearch}
          >

            {animalWithoutCustomer?.map((cus, index) => (
              <MenuItem key={index} value={cus.id}>{cus.name}</MenuItem>
            ))}

          </Select>
        </div>
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSearchAnimal}>Ara</Button>
        <div className="label">
          <label htmlFor="startDate" >Başlangıç Tarihi</label>
          <TextField
            variant="standard"
            // label="Başlangıç Tarihi"
            type="date"
            name="startDate"
            id="startDate"

            value={searchDateVaccine.startDate}
            onChange={handleSearchDateVaccinationInputChange}
          />

        </div>
        <div className="label">
          <label htmlFor="endDate" >Bitiş Tarihi</label>
          <TextField
            variant="standard"
            type="date"
            name="endDate"
            id="endDate"
            // label="Bitiş Tarihi"
            value={searchDateVaccine.endDate}
            onChange={handleSearchDateVaccinationInputChange}
          />
        </div>
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSearchDateVaccine}>Ara</Button>
        <Button variant="contained" endIcon={<SendIcon />} onClick={showAll}>Tümünü Listele</Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Aşı İsmi</TableCell>
                <TableCell align="right">Aşı Kodu</TableCell>
                <TableCell align="right">Hayvan</TableCell>
                <TableCell align="right">Koruyuculuk Başlangıcı</TableCell>
                <TableCell align="right">Koruyuculuk Bitişi</TableCell>
                <TableCell align="right">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { vaccination?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.code}</TableCell>
                  <TableCell align="right">{row.animal.name}</TableCell>
                  <TableCell align="right">{row.protectionStartDate}</TableCell>
                  <TableCell align="right">{row.protectionFinishDate}</TableCell>
                  <TableCell align="right">

                    <span onClick={() => handleDeleteVaccination(row.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
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

export default vaccination