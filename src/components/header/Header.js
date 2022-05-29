import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
    return (
        <header>
            <Link to="/" ><button className="menu-btn">HOME</button></Link>
            <Link to="/create" ><button className="menu-btn">CREATE PRODUCT</button></Link>
        </header>
    )
}