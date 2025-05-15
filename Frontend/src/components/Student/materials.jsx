import React from "react";
import './index.css';
import { NavLink } from "react-router-dom";

function Materials() {

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
                        <td id="td">“Introduction to Algorithms”</td>
                        <td id="td">Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein</td>
                    </tr>
                    <tr>
                        <td id="td">2</td>
                        <td id="td">“Algorithms Unlocked”</td>
                        <td id="td">Thomas H. Cormen</td>
                    </tr>
                    <tr>
                        <td id="td">3</td>
                        <td id="td">“Data Structures and Algorithms Made Easy: Data Structures and Algorithmic Puzzles”</td>
                        <td id="td">Narasimha Karumanchi</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );


}

export default Materials;
