import React from 'react'
import { Link } from 'react-router-dom'
import PetsIcon from '@mui/icons-material/Pets';
import "../../css/navBar.css";

const pagesRouter = [
    // { route: '', title: 'Home' },
    { route: 'animal', title: 'Animal' },
    { route: 'appointment', title: 'Appointment' },
    { route: 'customer', title: 'Customer' },
    { route: 'doctor', title: 'Doctor' },

    { route: 'report', title: 'Report' },
    { route: 'vaccination', title: 'Vaccination' },

]
function navi() {
    return (
        <nav>
            <div className="logo">
                <div className="icon">
                    <PetsIcon />
                </div>
                <Link className='web-name' to={'/'}>Patile</Link>
            </div>
            <div>
                <ul>
                    {pagesRouter.map((page, index) => (
                        <li
                            key={index}
                        >
                            <Link to={page.route}>{page.title}</Link>
                        </li>
                    ))}
                    <li><Link to={'animal'}>Animal</Link> </li>
                </ul>
            </div>
        </nav>
    )
}

export default navi