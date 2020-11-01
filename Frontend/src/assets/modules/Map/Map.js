import React from "react";
import Loader from '../Loader/Loader'
import '../../css/index.css';
import './Map.css';

function Map() {
    return (
        <span className="moduleContent">
            <span className="dirTitle"> Карта </span>
            <div id="innerContent">
                <Loader />
            </div>
        </span>
    )
}

export default Map;