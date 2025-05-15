import React from "react";
import './index.css';
import { NavLink } from "react-router-dom";

function AImaterials() {

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
                        <td id="td">“Artificial Intelligence Basics: A Non-Technical Introduction”</td>
                        <td id="td">Tom Taulli</td>
                    </tr>
                    <tr>
                        <td id="td">2</td>
                        <td id="td">“Artificial Intelligence and Machine Learning”</td>
                        <td id="td">Vinod Chandra S. S and Anand Hareendran S</td>
                    </tr>
                    <tr>
                        <td id="td">3</td>
                        <td id="td">“Artificial Intelligence – A Modern Approach”</td>
                        <td id="td">StJohn D. Kelleher, Brian Mac Namee, Aoife D’Arcyuart Russell & Peter Norvig</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );


}

export default AImaterials;
