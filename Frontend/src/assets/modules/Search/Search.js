import React from 'react'
import { withRouter } from 'react-router-dom';
import './Search.css'

function Search() {
return (
	<div id="search_box" className="search_box">
	<div className="search_box_center">
	<div className="search_container">
	<div className="search_fieldContainer">
	<span className="material-icons search_icon"> search </span>
	<input type="text" className="searchField" placeholder="Введите слово для поиска" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
	</div>
	<div id="search_result">
	</div>
	</div>
	</div>
	</div>
) }

export default withRouter(Search)