import React from "react";
import './index.css';
import pageNotFoundImage from "../page-not-found/page-not-found.jpg"
import { NavLink } from "react-router-dom";

function PageNotFound() {

    return (
        <div className='notFound'>
            <img src={pageNotFoundImage} id= "pageNotFoundImage" className="loading" alt="header"/>
            <h1 id="pageNotFoumd">PLEASE LOGIN!</h1>
            <NavLink to="/login"><button id="login-button" className="btn buttonLogin">LOG IN</button></NavLink>
        </div>
    );


}

export default PageNotFound;
