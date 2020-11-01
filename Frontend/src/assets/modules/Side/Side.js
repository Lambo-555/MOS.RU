import React from 'react';
import { NavLink } from 'react-router-dom';

function Books() {

function checkActivePath(path_title) {
    var path = window.location.pathname;
}

    return (
        <div className="afishaSide">
            <span                    className="dirTitle"> Афиша </span>
            <NavLink  to="/afisha"   className="as_side" activeClassName="as_active"> Ваша лента </NavLink >
            <NavLink  to="/books"    className="as_side" activeClassName="as_active"> Книги </NavLink >
            <NavLink  to="/news"     className="as_side" activeClassName="as_active"> Новости </NavLink >
            <NavLink  to="/activity" className="as_side" activeClassName="as_active"> События </NavLink >
            <NavLink  to="/mugs"     className="as_side" activeClassName="as_active"> Кружки </NavLink >
            <NavLink  to="/test"     className="as_side" activeClassName="as_active"> Выставки </NavLink >
            <NavLink  to="/test"     className="as_side" activeClassName="as_active"> Парки </NavLink >
        </div>
    )
}

export default Books