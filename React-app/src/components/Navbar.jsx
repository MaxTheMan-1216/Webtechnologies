import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to="/" className='navbar-logo'>
                WebShop
                </Link>

                <div className='navbar-links'>
                    <Link to="/">Shop</Link>
                    <Link to="/users">Users</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;