import React from "react";
import './index.css';
import { NavLink } from "react-router-dom";

function COmaterials() {

    return (
        <div className='Materials'>
            <h1 id="heading">COURSE MATERIALS</h1>
            <table id="table">
                <thead>
                    <th id="th">SI No.</th>
                    <th id="th">Course Material</th>
                    <th id="th">Author(s)</th>
                </thead>
                <tbody>
                    <tr>
                        <td id="td">1</td>
                        <td id="td">"Computer Organization and Design"</td>
                        <td id="td">David A. Patterson and John L. Hennessy</td>
                    </tr>
                    <tr>
                        <td id="td">2</td>
                        <td id="td">“Structured Computer Organization”</td>
                        <td id="td">Andrew S. Tanenbaum</td>
                    </tr>
                    <tr>
                        <td id="td">3</td>
                        <td id="td">“Introduction to Computer Organization”</td>
                        <td id="td">Robert Plantz</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );


}

export default COmaterials;
