
import { NavLink } from 'react-router-dom';
import img from '../assets/logo.jpg';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={img} alt="Logo" style={{height: '4rem', width: '4rem'}}/>
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
