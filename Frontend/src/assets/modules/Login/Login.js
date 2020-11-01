import React from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import $ from 'jquery';


function Login() {

if (JSON.parse(localStorage.getItem('user')) !== null) {
if (JSON.parse(localStorage.getItem('user'))['session_key'] !== 'undefined') {
    window.location.replace("/news"); 
} }

function LoginAction() {

$.ajax({
    type: "POST",
    url: '/login',
    headers: {
    	'login'      : btoa($('input[name ="e_login"]').val()),
    	'password'   : btoa($('input[name ="e_password"]').val()),
    }}).done(function (response) {
        if (response['status'] == 'success' && response['status'] !== 'undefined') {
            
            delete response['status'];
            localStorage.setItem('user', JSON.stringify(response));

            toast.success('Добро пожаловать, ' + JSON.parse(localStorage.getItem('user'))['name'] + '!', {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide
            });

            window.setTimeout(function() {
                window.location.href = '/afisha';
            }, 2000);

        } else {
            toast.error(response['Message'], {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide
            });
        }
    }).fail(function (err)  {

            toast.error('Не удалось выполнить запрос, повторите попытку позже', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Slide
            });
});
}

	return(

		<div className="moduleContent">
            <ToastContainer />
            <div className="auth_center">
            <div className="auth_container">
            <span className="dirTitle"> Вход </span>
            <div className="group" id="group_big">      
            <input type="text" required autocomplete="off" name="e_login" />
            <span className="highlight"></span>
            <label for="h_emailInput">Email или телефон</label>
            </div>
            <div className="group" id="group_big">      
            <input type="password" required autocomplete="off" name="e_password" />
            <span className="highlight"></span>
            <label for="h_emailInput">Пароль</label>
            </div>
            <a href="#" className="authButton" onClick={LoginAction}> Войти </a>
            </div>
            </div>
        </div>
	)
}

export default Login;