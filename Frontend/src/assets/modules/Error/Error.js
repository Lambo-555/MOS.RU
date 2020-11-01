import React from "react";
import { Link } from 'react-router-dom';
import '../../css/index.css';

function Map() {
    return (
        <span className="moduleContent">
            <span className="dirTitle"> Извините, </span>
            <span className="errorTitle"> такой страницы больше нет или она никогда не существовала. <br />Вы можете найти необходимую информацию через поиск. </span>
            <div id="innerContent">
                <Link to="/afisha" className="errorBtn"> Вернуться на главную страницу </Link>
            </div>
        </span>
    )
}

export default Map;