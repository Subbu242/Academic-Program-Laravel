import React from "react";
import './index.css';
import { NavLink } from "react-router-dom";

function OSmaterials() {

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
                        <td id="td">"Operating System Concepts"</td>
                        <td id="td">Abraham Silberschatz and Peter Galvin</td>
                    </tr>
                    <tr>
                        <td id="td">2</td>
                        <td id="td">“Operating System: A Design-oriented Approach”</td>
                        <td id="td">Charles Crowley</td>
                    </tr>
                    <tr>
                        <td id="td">3</td>
                        <td id="td">“Operating Systems: A Concept-Based Approach”</td>
                        <td id="td">D M Dhamdhere</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );


}

export default OSmaterials;
