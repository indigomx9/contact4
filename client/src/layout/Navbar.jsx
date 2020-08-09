import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Navbar = ({ title, icon }) => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon}>{title}</i>
            </h1>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </ul>
        </nav>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
};

// return (
    //     <React.Fragment>
    //         <li>Hello {user && user.name}</li>
    //         <li>
    //             <a href="#!">
    //                 <i className="fas fa-sign-out-alt">{' '}</i>
    //                 <span className="hide-sm">Logout</span>
    //             </a>
    //         </li>
    //     </React.Fragment>
    // );

