import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/pagesStyle.css';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [update, setUpdate] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
    });
    const [updateCustomer, setUpdateCustomer] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
    });

   
    const [searchCustomer, setSearchCustomer] = useState({
        name: "",
    });

    const [alert, setAlert] = useState(false);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/customers")
            .then((res) => {
                setCustomers(res.data.content);
                setUpdate(false);
            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
            });
    }, [update]);

    const handleNewCustomerInputChange = (e) => {
        const { name, value } = e.target;

        setNewCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddNewCustomer = () => {
        axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/customers", newCustomer)
            .then((res) => {
                console.log(res);
                setUpdate(true);
                setNewCustomer({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    city: "",
                });
            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
            });
    };

    const handleDeleteCustomer = (id) => {
        axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers/${id}`)
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

    const handleUpdateCustomerInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const handleUpdateCustomer = () => {
        const { id } = updateCustomer;
        axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers/${id}`, updateCustomer)
            .then((res) => {
                console.log("Customer updated:", res.data);
                setUpdate(true)
                setUpdateCustomer({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    city: "",
                });
            })
            .catch(() => {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000)
            });
    };

    const handleUpdateCustomerBtn = (customer) => {
        setUpdateCustomer(customer);
    };





    const handleSearchCustomerByName = () => {

    

        axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/customers/searchByName?name=" + searchCustomer.name)
        .then((res) => {
            setCustomers(res.data.content);
            // setUpdate(false);
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


    const showAll = () => {
        setUpdate(true);
     
    }

    return (
        <div className='container'>
            {alert && <Alert severity="error">Opss...Bir şeyler ters gitti.</Alert>}

            {/* CREATE */}

            <div className='area'>
                <h3>Yeni Müşteri Ekleme</h3>
                <TextField
                    variant="standard"
                    type='text'
                    name='name'
                    placeholder='İsim'
                    value={newCustomer.name}
                    onChange={handleNewCustomerInputChange}
                />

                <TextField
                    variant="standard"
                    type='text'
                    name='phone'
                    placeholder='Telefon'
                    value={newCustomer.phone}
                    onChange={handleNewCustomerInputChange}
                />
                <TextField
                    variant="standard"
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={newCustomer.email}
                    onChange={handleNewCustomerInputChange}
                />
                <TextField
                    variant="standard"
                    type='text'
                    name='address'
                    placeholder='Adres'
                    value={newCustomer.address}
                    onChange={handleNewCustomerInputChange}
                />
                <TextField
                    variant="standard"
                    type='text'
                    name='city'
                    placeholder='Şehir'
                    value={newCustomer.city}
                    onChange={handleNewCustomerInputChange}
                />

                <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddNewCustomer}>Ekle</Button>
            </div>

            {/* UPDATE */}
            <div className='area'>
                <h3>Müşteri Güncelle</h3>
                <TextField
                    variant="standard"
                    type='text'
                    name='name'
                    placeholder='İsim'
                    value={updateCustomer.name}
                    onChange={handleUpdateCustomerInputChange}
                />
                <TextField
                    variant="standard"
                    type='text'
                    name='phone'
                    placeholder='Telefon'
                    value={updateCustomer.phone}
                    onChange={handleUpdateCustomerInputChange}
                />
                <TextField
                    variant="standard"
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={updateCustomer.email}
                    onChange={handleUpdateCustomerInputChange}
                />
                <TextField
                    variant="standard"
                    type='text'
                    name='address'
                    placeholder='Adres'
                    value={updateCustomer.address}
                    onChange={handleUpdateCustomerInputChange}
                />
                <TextField
                    variant="standard"
                    type='text'
                    name='city'
                    placeholder='Şehir'
                    value={updateCustomer.city}
                    onChange={handleUpdateCustomerInputChange}
                />

                <Button variant="contained" endIcon={<EditIcon />} onClick={handleUpdateCustomer}>Güncelle</Button>
            </div>



            {/* List
            <ul className='customer-list'>
                {showAll && customers && customers.map((customer) => (
                    <li className='list-item' key={customer.id}>
                        {customer.name} - {customer.city}
                        <span onClick={() => handleDeleteCustomer(customer.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
                            DELETE
                        </span>
                        <span onClick={() => handleUpdateCustomerBtn(customer)} style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}>
                            UPDATE
                        </span>
                    </li>
                ))}
            </ul> */}

            <div className='area'>

                <h3>Müşteri Listesi</h3>

                {/* Arama kutusu */}
                <TextField
                        variant="standard"
                        type="text"
                        name="name"
                        placeholder="Müşteri ismi"
                        value={searchCustomer.name}
                        onChange={handleSearchCustomerInputChange}
                    />
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleSearchCustomerByName}>Ara</Button>
                    
                <Button variant="contained" endIcon={<ListIcon />} onClick={showAll} >Tümünü Listele</Button>
                <div className='content'>

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
                                {customers?.map((row) => (
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

                                            <span onClick={() => handleUpdateCustomerBtn(row)} style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}>
                                                <EditIcon />
                                            </span>
                                            <span onClick={() => handleDeleteCustomer(row.id)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>
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
        </div>
    );
}

export default Customer;

