
import { NavLink } from 'react-router-dom';
import img from '../assets/logo.jpg';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo" style={{display: 'flex'}}>
                <img src={img} alt="Logo" style={{ transform: 'transLateY(.8rem)' }} />
                <p style={{color: 'white', transform: 'transLateY(-.2rem)', marginLeft: '1rem', fontSize: '1.5rem'}}>Food Recovery Network</p>
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" className="nav-link">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className="nav-link">About</NavLink>
                </li>
                <li>
                    <NavLink to="/shop" className="nav-link">Shop</NavLink>
                </li>
                <li>
                    <NavLink to="/invent" className="nav-link">Inventory</NavLink>
                </li>
                <li>
                    <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
