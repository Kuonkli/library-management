import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to={`/`}>Books</Link></li>
                <li><Link to={`/authors`}>Authors</Link></li>
                <li><Link to={`/genres`}>Genres</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;