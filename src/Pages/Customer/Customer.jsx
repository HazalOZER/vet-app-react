import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/customer.css';

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

    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/customers")
            .then((res) => {
                setCustomers(res.data.content);
                setUpdate(false);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
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
        axios.post("http://localhost:8080/api/v1/customers", newCustomer)
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
            .catch(error => {
                console.error('There was an error adding the customer!', error);
            });
    };

    const handleDeleteCustomer = (id) => {
        axios.delete(`http://localhost:8080/api/v1/customers/${id}`)
            .then(() => {
                setUpdate(true);
            })
            .catch(error => {
                console.error('There was an error deleting the customer!', error);
            });
    };

    const handleUpdateCustomerBtn = (customer) => {
        setNewCustomer(customer);
    };


    const handleSearch = () => {
        const filtered = customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCustomers(filtered); // Filtrelenmiş müşterileri güncelle
        setShowAll(false);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value); // Arama terimini güncelle
    };


    const showAllFunc = ()=> {
        setShowAll(true);
        
    };

    return (
        <div>
            {/* CREATE */}
            <div>
                <h3>Yeni Müşteri Ekleme</h3>
                <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={newCustomer.name}
                    onChange={handleNewCustomerInputChange}
                />
                <br />
                <input
                    type='text'
                    name='phone'
                    placeholder='Phone'
                    value={newCustomer.phone}
                    onChange={handleNewCustomerInputChange}
                />
                <br />
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={newCustomer.email}
                    onChange={handleNewCustomerInputChange}
                />
                <br />
                <input
                    type='text'
                    name='address'
                    placeholder='Address'
                    value={newCustomer.address}
                    onChange={handleNewCustomerInputChange}
                />
                <br />
                <input
                    type='text'
                    name='city'
                    placeholder='City'
                    value={newCustomer.city}
                    onChange={handleNewCustomerInputChange}
                />
                <br />
                <button onClick={handleAddNewCustomer}>Ekle</button>
            </div>


 {/* Arama kutusu */}
 <input
                type="text"
                placeholder="Müşteri ara..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Ara</button>
            <button onClick={showAllFunc} >Tümünü Listele</button>

            {/* Filtrelenmiş müşteri listesi */}
            <ul>
                {!showAll&& filteredCustomers.map((customer) => (
                    <li key={customer.id}>
                        {customer.name} - {customer.phone} - {customer.email}
                    </li>
                ))}
            </ul>

            {/* List */}
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
            </ul>
        </div>
    );
}

export default Customer;

