import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Animal() {
    const [animals, setAnimals] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [newAnimal, setNewAnimal] = useState({
        name: "",
        species: "",
        breed: "",
        gender: "",
        colour: "",
        dateOfBirth: "",
        customer: ""
    });

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/animals")
            .then((res) => {
                setAnimals(res.data.content);
            })
            .catch(error => {
                console.error('There was an error fetching the animals!', error);
            });

        axios.get("http://localhost:8080/api/v1/customers")
            .then((res) => {
                setCustomers(res.data.content);
            })
            .catch(error => {
                console.error('There was an error fetching the customers!', error);
            });
    }, []);

    const handleNewAnimalInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnimal((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddNewAnimal = () => {
        axios.post("http://localhost:8080/api/v1/animals", newAnimal)
            .then((res) => {
                console.log("New animal added:", res.data);
                setAnimals([...animals, res.data]); // Yeni hayvanı mevcut hayvanlar listesine ekler
                setNewAnimal({
                    name: "",
                    species: "",
                    breed: "",
                    gender: "",
                    colour: "",
                    dateOfBirth: "",
                    customer: ""
                });
            })
            .catch(error => {
                console.error('There was an error adding the animal!', error);
            });
    };

    const handleCustomerChange = (e) => {
        const customerId = e.target.value;
        setNewAnimal((prev) => ({
            ...prev,
            customer: customerId
        }));
    };

    return (
        <div>
            {/* Hayvan bilgileri giriş alanları */}
            <input
                type="text"
                name="name"
                placeholder="Hayvan Adı"
                value={newAnimal.name}
                onChange={handleNewAnimalInputChange}
            />
            <input
                type="text"
                name="species"
                placeholder="Türü"
                value={newAnimal.species}
                onChange={handleNewAnimalInputChange}
            />
            <input
                type="text"
                name="breed"
                placeholder="Cinsi"
                value={newAnimal.breed}
                onChange={handleNewAnimalInputChange}
            />
            <input
                type="text"
                name="gender"
                placeholder="Cinsiyet"
                value={newAnimal.gender}
                onChange={handleNewAnimalInputChange}
            />
            <input
                type="text"
                name="colour"
                placeholder="Renk"
                value={newAnimal.colour}
                onChange={handleNewAnimalInputChange}
            />
            <input
                type="date"
                name="dateOfBirth"
                placeholder="Doğum Tarihi"
                value={newAnimal.dateOfBirth}
                onChange={handleNewAnimalInputChange}
            />

            {/* Müşteri seçimi */}
            <select
                name="customer"
                value={newAnimal.customer}
                onChange={handleCustomerChange}
            >
                <option value="">Müşteri Seçiniz</option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
            </select>


            {/* Ekle butonu */}
            <button onClick={handleAddNewAnimal}>Ekle</button>

            {/* Hayvan listesi */}
            <ul>
                {animals.map((animal) => (
                    <li key={animal.id}>
                        {animal.name} - {animal.species} - {animal.customer.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Animal;
