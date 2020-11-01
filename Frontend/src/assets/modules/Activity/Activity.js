import React  from 'react';
import Side   from '../Side/Side'
import Loader from '../Loader/Loader'

import './Activity.css';

function Activity() {
    return (
        <div className="moduleContent">
        <Side />
        <div className="afishaMain">
        <span className="dirTitle">События</span>
        </div>
        </div>
	)
}

export default Activity