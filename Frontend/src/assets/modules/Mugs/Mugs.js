import React  from 'react';
import Side   from '../Side/Side'
import Loader from '../Loader/Loader'

import './Mugs.css';

function Mugs() {
    return (
        <div className="moduleContent">
        <Side />
        <div className="afishaMain">
        <span className="dirTitle"> Кружки </span>
        </div>
        </div>
	)
}

export default Mugs