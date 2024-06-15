import * as React from "react";
import "../../css/navBar.css";
import PetsIcon from '@mui/icons-material/Pets';

import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'





function Navbar() {


    // const navigate = useNavigate();
    // const navigateCustomer = () => { navigate('/customer') };


    return (
        <>
            <nav>
                <div className="logo">

                    <div className="icon">
                        <PetsIcon />
                    </div>
                   
                    <a  href={`/`} className="web-name"  >Patile</a>
                </div>

                <div>
                    <ul>
                        <li> <a href={`/customer`}>Müşteri</a></li>
                        <li><a href={`/animal`}>Hayvan</a></li>
                        <li><a href={`/doctor`}>Veteriner</a></li>
                        <li><a href={`/appointment`}>Randevu</a></li>
                        <li><a href={`/vaccination`}>Aşı</a></li>
                        <li><a href={`/report`}>Rapor</a></li>
                   
                    </ul>
                </div>
            </nav>
        </>
    );
}
export default Navbar;
