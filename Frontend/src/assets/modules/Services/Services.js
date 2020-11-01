import React from "react";
import Loader from '../Loader/Loader'
import '../../css/index.css';
import './Services.css';

function Services() {
    return (
        <span className="moduleContent">
            <span className="dirTitle"> Услуги </span>
            <div id="innerContent">
                <Loader />
            </div>
        </span>
    )
}

export default Services;