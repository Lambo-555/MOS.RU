import React  from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader'
import Side   from '../Side/Side'

import $ from 'jquery';
import '../../css/index.css';
import './News.css';


function News() {

$(document).ready(function() {

 var AccessToken = "";

 if (JSON.parse(localStorage.getItem('user')) !== null) {
 if (JSON.parse(localStorage.getItem('user'))['session_key'] !== 'undefined') {
    AccessToken = JSON.parse(localStorage.getItem('user'))['session_key'];
 }}

 var feedSettings = {
    'newsPage'  : 1,
    'newsCount' : 10,
    'loadMore'  : false
 }

let loader = '<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

getNews(feedSettings['newsPage'],feedSettings['newsCount']); 

 $(window).scroll(function() {
   if(!feedSettings['loadMore']) {
   if ($(window).scrollTop() + $(window).height() > $(document).height() - $('.footer').height()) {
       feedSettings['loadMore'] = true;
       getNews(feedSettings['newsPage'],feedSettings['newsCount']); 
       getNews(feedSettings['newsPage']++,feedSettings['newsCount']); 
   } }
});

function getNews(page, count) {
$.ajax({
    type: "GET",
    url: '/news',
    headers: {
        'AccessToken' : AccessToken,
        'page'        : page,
        'count'       : count
    }}).done(function(response) {
        $('.lds-ellipsis').remove();
        response['items'].forEach((results, index, self) => {
        var htmlObject = document.createElement('a');
        htmlObject.className = 'feedContent__container';
        htmlObject.id = results['id'];
        htmlObject.innerHTML = '<div class="feedItem__block"> <span class="feedItem__title"> ' + results['title'] + ' </span> <img src="' + 'https://mos.ru' + results['image']['middle']['src'] + '" class="feedItem__preview" />  </div> <div class="feedContent__side_nav"> <span class="material-icons feedContent__icon f_icon_like"> thumb_up </span> <span class="material-icons feedContent__icon f_icon_dislike" > thumb_down </span> <span class="material-icons feedContent__icon f_icon_save"> bookmark </span> </div>'
        $("#newsContent__block").append(htmlObject);
        $("#newsContent__block").append(loader);
        feedSettings['loadMore'] = false;
        feedSettings['newsPage']++;
    });
    }).fail(function(err) {

    toast.error('Не удалось выполнить запрос, повторите попытку позже', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide

}); }); } });


    return (
        <div className="moduleContent">
        <Side />
        <div className="afishaMain">
        <span className="dirTitle"> Новости </span>
        <div className="newsContent__block" id="newsContent__block">
        <Loader />
        </div>
        </div>
        </div>
    )
}

export default News;