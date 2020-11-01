import React from "react";
import Loader from '../Loader/Loader'
import '../../css/index.css';
import './Authority.css';

function Services() {
    return (
        <span className="moduleContent">
            <span className="dirTitle"> Власть </span>
            <div id="innerContent">
                <Loader />
            </div>
        </span>
    )
}

export default Services;