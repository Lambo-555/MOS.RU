import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Side  from '../Side/Side'
import Loader from '../Loader/Loader'

import $ from 'jquery';
import './Afisha.css';


function Afisha() {

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
        $("#feedContent__block").append(htmlObject);
        $("#feedContent__block").append(loader);
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

}); }); }


$.ajax({
    type: "GET",
    url: '/categories',
    headers: {
        'AccessToken': AccessToken,
    }}).done(function(categories) {
        $("#categories_scroll").html('');
        categories['categories'].forEach((results, index, self) => {
        if (results['is_followed'] == true) {
            var buttonText   = 'Подписки';
            var buttonClass  = 'catSub_btn_active'
        } else {
            var buttonText   = 'Подписаться';
            var buttonClass  = ''
        }
        var htmlObject = document.createElement('div');
        htmlObject.className = 'categories_mini';
        htmlObject.innerHTML = '<img class="catImage" src="' + results['preview'] + '"><div class="catBottom"><span class="catTitle" style="color:' + results['font_color'] + ';">' + results['title'].substring(0, 70) + '</span><span class="catSub_btn ' + buttonClass + '" catHash="' + btoa(results['id']) + '">' + buttonText + '</span></div>';
        $("#categories_scroll").append(htmlObject);
    }); }).fail(function(err) {

    toast.error('Не удалось выполнить запрос, повторите попытку позже', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide
    }); });


$( document ).on( "click", ".catSub_btn", function() {

 if (JSON.parse(localStorage.getItem('user')) !== null) {
 if (JSON.parse(localStorage.getItem('user'))['session_key'] !== 'undefined') {

 var CategoryHash = $(this).attr('catHash').toString();
 var AccessToken  = JSON.parse(localStorage.getItem('user'))['session_key'];
 var subButton    = $(this);
 console.log(AccessToken);

  $.ajax({
    type: "GET",
    url:  '/followCategory',
    headers: {
         'AccessToken': AccessToken,
         'categoryHash' : CategoryHash
    }}).done(function(response) {
    console.log(response['is_followed']);
    if (response['is_followed'] == true) {
        subButton.addClass('catSub_btn_active');
        subButton.html('Подписки');
    } else {
        subButton.removeClass('catSub_btn_active');
        subButton.html('Подписаться');        
    }}).fail(function(err) {
    toast.error('Не удалось выполнить подписку, повторите попытку позже', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide
    }); }); } else {
        window.location.replace("/login");
    }} else {
        window.location.replace("/login");
    }}); });

    return (

        <div className="moduleContent">

            <Side />

            <div className="afishaMain">
            <span className="dirSubtitle">Чем вы интересуетесь?</span>
            <span className="dirSubContent"> Выберите, какие темы вам нравятся, чтобы получать больше интересных материалов в ленту </span>
            <div id="innerContent">
            <div className="categories_block">
            <div className="categories_scroll" id="categories_scroll" >
            <div className="categories_mini"></div>
            <div className="categories_mini"></div>
            <div className="categories_mini"></div>
            <div className="categories_mini"></div>
            <div className="categories_mini"></div>
            <div className="categories_mini"></div>
            </div>
            </div>
            </div>

            <span className="dirTitle"> Ваша лента </span>
            <div className="feedContent__block" id="feedContent__block">
            <Loader />
            </div>

          
            <div className="booksContent__block" id="booksContent__block">

            <span className="dirSubtitle">Рекомендуем к прочтению</span>
            <span className="dirSubContent"> Коллекция создана на основе ваших интересов </span>

            <div className="booksContent__relative">
            <div className="booksContent__scroll">
            <div className="bookItem__container">
            <div className="bookItem__block">
            <img src="https://cv6.litres.ru/pub/c/elektronnaya-kniga/cover_200/42600762-sergey-lukyanenko-porog.jpg" className="bookItem__preview" />
            </div>
            <span className="bookItem__title">Порог</span>
            </div>


            <div className="bookItem__container">
            <div className="bookItem__block">
            <img src="https://cv8.litres.ru/pub/c/elektronnaya-kniga/cover_200/128084-sergey-lukyanenko-chernovik.jpg" className="bookItem__preview" />
            </div>
            <span className="bookItem__title">Черновик</span>
            </div>


            <div className="bookItem__container">
            <div className="bookItem__block">
            <img src="https://cv1.litres.ru/pub/c/elektronnaya-kniga/cover_200/19063017-hel-elrod-magiya-utra-kak-pervyy-chas-dnya-opredelyaet-vash-uspeh.jpg" className="bookItem__preview" />
            </div>
            <span className="bookItem__title">Магия утра</span>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Afisha;