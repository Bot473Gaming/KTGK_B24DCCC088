import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Blog</Link>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Trang chủ
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
