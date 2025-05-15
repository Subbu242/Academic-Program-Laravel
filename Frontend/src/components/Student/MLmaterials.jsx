import React from "react";
import './index.css';
import { NavLink } from "react-router-dom";

function MLmaterials() {

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
                        <td id="td">“Fundamentals of Machine Learning for Predictive Data Analytics (2nd Edition)”</td>
                        <td id="td">John D. Kelleher, Brian Mac Namee, Aoife D’Arcy</td>
                    </tr>
                    <tr>
                        <td id="td">2</td>
                        <td id="td">“Machine Learning for Hackers”</td>
                        <td id="td">Drew Conway and John Myles White</td>
                    </tr>
                    <tr>
                        <td id="td">3</td>
                        <td id="td">“Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow”</td>
                        <td id="td">Geron Aurelien</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );


}

export default MLmaterials;
