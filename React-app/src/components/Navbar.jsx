import { Link } from 'react-router-dom';


function Navbar() {
    return (
        <nav>
            <Link to = "/">Shop</Link>
            {" | "}
            <Link to = "/users">Users</Link>
        </nav>
    );
}

export default Navbar;