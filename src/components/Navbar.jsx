import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Metamask from './Metamask';

const Navbar = () => {
    return (
        <nav>
            <ul>
            <li>
                <Link to="/collections">Home</Link>
                <Metamask />
            </li>
            </ul>
        </nav>
    );
};

export default Navbar;