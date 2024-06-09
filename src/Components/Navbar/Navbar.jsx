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

                    <h3 className="web-name"  >Patile</h3>
                </div>

                <div>
                    <ul>
                        <li> <a href={`/customer`}>Müşteri</a></li>
                        <li><a href={`/animal`}>Hayvan</a></li>
                        <li><a href={`/doctor`}>Veteriner</a></li>
                        <li><a href={`/appointment`}>Randevu</a></li>
                        <li><a href={`/vaccination`}>Aşı</a></li>
                        <li><a href={`/report`}>Rapor</a></li>
                        <li><a href={`/work-day`}>Çalışma Günü</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
export default Navbar;
