import React, { useEffect, useState } from 'react';
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

function Animal() {
    const [animals, setAnimals] = useState([]);
    const [update, setUpdate] = useState(false);
    const [newAnimal, setNewAnimal] = useState({
        name: "",
        species: "",
        breed: "",
        gender: "",
        colour: "",
        dateOfBirth: "",
        customer: {}
    },
    );
    const [updateAnimal, setUpdateAnimal] = useState({
        name: "",
        species: "",
        breed: "",
        gender: "",
        colour: "",
        dateOfBirth: "",
        customer: {}
    },
    );
    const [customer, setCustomer] = useState([]);
    const [alert, setAlert] = useState(false);
    const [searchAnimal, setSearchAnimal] = useState({
        name:"",
        species: "",
        breed: "",
        gender: "",
        colour: "",
        dateOfBirth: "",
        customer: {
           
        }
    });
    const [searchCustomer, setSearchCustomer] = useState({
        name: "",
    });

    const [searched, setSearched] = useState(false);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals")
            .then((res) => {
                setAnimals(res.data.content);
                setUpdate(false);
            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(true);
                }, 3000)
            });

        axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/customers")
            .then((res) => {
                setCustomer(res.data.content);
                setUpdate(false);
            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(true);
                }, 3000)
            });
    }, [update]);


    const handleNewAnimalInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnimal((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(newAnimal);
    };

    const handleCustomerSelectChange = (e) => {
        const id = e.target.value;
        const newCustomer = customer.find((cus) => cus.id === +id)
        setNewAnimal((prev) => ({
            ...prev,
            customer: newCustomer
        }));
        console.log(newAnimal);
    }

    const handleUpdateCustomerSelectChange = (e) => {
        const id = e.target.value;
        const newCustomer = customer.find((cus) => cus.id === +id)
        setUpdateAnimal((prev) => ({
            ...prev,
            customer: newCustomer
        }));
        console.log(newAnimal);
    }
    const handleAddNewAnimal = () => {
        axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals", newAnimal)
            .then(() => setUpdate(true)).then(() => setNewAnimal({
                name: "",
                species: "",
                breed: "",
                gender: "",
                colour: "",
                dateOfBirth: "",
                customer: {}
            })).catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
            });
    }

    const handleUpdateAnimalInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateAnimal((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(updateAnimal);
    }
    const handleUpdateAnimal = () => {
        const { id } = updateAnimal;
        axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals/${id}`, updateAnimal)
            .then((res) => {
                console.log("Animal updated:", res.data);
                setUpdate(true)
                setUpdateAnimal({
                    name: "",
                    species: "",
                    breed: "",
                    gender: "",
                    colour: "",
                    dateOfBirth: "",
                    customer: {},
                });
            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
            });


    }

    const handleUpdateAnimalBtn = (animal) => {
        setUpdateAnimal(animal);
    };


    const handleDeleteAnimal = (id) => {
        axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals/${id}`)
            .then(() => {
                setUpdate(true);
                setSearched(true);
            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
            });
    };

    const handleSearchAnimalInputChange = (e) => {
        const { name, value } = e.target;
        setSearchAnimal((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(searchAnimal);
    }

    const handleSearchAnimalByName = () => {

        // if(searched){ setUpdate(true);
        //     setSearched(false);
        // }
        
        axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals/searchByName?name=" + searchAnimal.name)
            .then((res) => {
                setAnimals(res.data.content);
                // setUpdate(false);
                // setSearched(true);
            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
            });

    }

    const handleSearchCustomerInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
        console.log(searchCustomer);
    }

    const handleSearchCustomerByName = () => {

    

        axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals/searchByCustomer?customerName=" + searchCustomer.name)
        .then((res) => {
            setAnimals(res.data.content);
            // setUpdate(false);
        })
        .catch(() => {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
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

                    {/* Hayvan bilgileri giriş alanları */}

                    <h3>Hayvan Ekle</h3>
                    <TextField
                        variant="standard"
                        type="text"
                        name="name"
                        placeholder="Hayvan Adı"
                        value={newAnimal.name}
                        onChange={handleNewAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="text"
                        name="species"
                        placeholder="Türü"
                        value={newAnimal.species}
                        onChange={handleNewAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="text"
                        name="breed"
                        placeholder="Cinsi"
                        value={newAnimal.breed}
                        onChange={handleNewAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="text"
                        name="gender"
                        placeholder="Cinsiyet"
                        value={newAnimal.gender}
                        onChange={handleNewAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="text"
                        name="colour"
                        placeholder="Renk"
                        value={newAnimal.colour}
                        onChange={handleNewAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="date"
                        name="dateOfBirth"
                        placeholder="Doğum Tarihi"
                        value={newAnimal.dateOfBirth}
                        onChange={handleNewAnimalInputChange}
                    />

                    <Select
                        labelId="Customer"
                        id="CustomerSelect"
                        value={newAnimal.customer.id || ""}
                        label="Age"
                        onChange={handleCustomerSelectChange}
                    >

                        {customer?.map((cus, index) => (
                            <MenuItem key={index} value={cus.id}>{cus.name}</MenuItem>
                        ))}

                    </Select>


                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddNewAnimal}>Ekle</Button>
                </div>
                <div className='area'>

                    <h3>Hayvan Güncelle</h3>
                    <TextField
                        variant="standard"
                        type="text"
                        name="name"
                        placeholder="Hayvan Adı"
                        value={updateAnimal.name}
                        onChange={handleUpdateAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="text"
                        name="species"
                        placeholder="Türü"
                        value={updateAnimal.species}
                        onChange={handleUpdateAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="text"
                        name="breed"
                        placeholder="Cinsi"
                        value={updateAnimal.breed}
                        onChange={handleUpdateAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="text"
                        name="gender"
                        placeholder="Cinsiyet"
                        value={updateAnimal.gender}
                        onChange={handleUpdateAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="text"
                        name="colour"
                        placeholder="Renk"
                        value={updateAnimal.colour}
                        onChange={handleUpdateAnimalInputChange}
                    />
                    <TextField
                        variant="standard"
                        type="date"
                        name="dateOfBirth"
                        placeholder="Doğum Tarihi"
                        value={updateAnimal.dateOfBirth}
                        onChange={handleUpdateAnimalInputChange}
                    />

                    <Select
                        labelId="Customer"
                        id="CustomerSelect"
                        value={updateAnimal.customer.id || ""}
                        label="Age"
                        onChange={handleUpdateCustomerSelectChange}
                    >

                        {customer?.map((cus, index) => (
                            <MenuItem key={index} value={cus.id}>{cus.name}</MenuItem>
                        ))}

                    </Select>


                    <Button variant="contained" endIcon={<EditIcon />} onClick={handleUpdateAnimal}>Güncelle</Button>

                </div>

                <div className='area'>
                    <h3>Hayvan Listesi</h3>

                    <TextField
                        variant="standard"
                        type="text"
                        name="name"
                        placeholder="Hayvan İsmi"
                        value={searchAnimal.name}
                        onChange={handleSearchAnimalInputChange}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleSearchAnimalByName}>Ara</Button>
                    <TextField
                        variant="standard"
                        type="text"
                        name="name"
                        placeholder="Müşteri ismi"
                        value={searchCustomer.name}
                        onChange={handleSearchCustomerInputChange}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleSearchCustomerByName}>Ara</Button>
                    
                    <Button variant="contained" endIcon={<SendIcon />} onClick={showAll}>Tümünü Listele</Button>
                        

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>İsim</TableCell>

                                    <TableCell align="right">Tür</TableCell>
                                    <TableCell align="right">Cins</TableCell>
                                    <TableCell align="right">Cinsiyet</TableCell>
                                    <TableCell align="right">Renk</TableCell>
                                    <TableCell align="right">Doğum Tarihi</TableCell>
                                    <TableCell align="right">Müşteri</TableCell>
                                    <TableCell align="right">İşlemler</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {animals?.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell>{row.name}</TableCell>
                                        <TableCell align="right">{row.species}</TableCell>
                                        <TableCell align="right">{row.breed}</TableCell>
                                        <TableCell align="right">{row.gender}</TableCell>
                                        <TableCell align="right">{row.colour}</TableCell>
                                        <TableCell align="right">{row.dateOfBirth}</TableCell>
                                        <TableCell align="right">{row.customer.name}</TableCell>
                                        <TableCell align="right">

                                            <span onClick={() => handleUpdateAnimalBtn(row)} style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}>
                                                <EditIcon />
                                            </span>
                                            <span onClick={() => handleDeleteAnimal(row.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
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
    );
}

export default Animal;
