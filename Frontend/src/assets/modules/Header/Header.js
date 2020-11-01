import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import './Header.css'
import $ from 'jquery';
import Search from '../Search/Search';

function Header() {

  let currentPost = 0;
  let startTime = Date.now();

  function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    return coords.top > windowHeight * 0.01
        && coords.top < windowHeight * 0.75;
  }

  function getStatistics(dataName) {
    let data = JSON.parse(localStorage.getItem('statistics'));
    if(data === null) {
      return false
    }
    if (dataName in data) {
      return data[dataName]
    }
  }

  function setStatistics(dataName, dataValue) {
    let pastItem = JSON.parse(localStorage.getItem('statistics'));
    let presentItem = {
      ...pastItem,
      [dataName]: dataValue
    };
    localStorage.setItem('statistics', JSON.stringify(presentItem))
  }

  function showVisible() {
    for (let img of document.querySelectorAll('.feedContent__container')) {
      if (isVisible(img)) {
        if (+img.id === currentPost) { } else {
          let timeSpend = Date.now() - startTime;
          console.log('Current Post', currentPost, timeSpend);
          getStatistics(currentPost)
              ? setStatistics(currentPost, getStatistics(currentPost) + timeSpend)
              : setStatistics(currentPost, timeSpend);
          startTime = Date.now();
          currentPost = +img.id
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', showVisible);
    showVisible();
    return () => {
      showVisible();
      window.removeEventListener('scroll', showVisible);
      sendData();
    }
  }, []);


  function sendData() {
      //localStorage.clear();
      let keys = Object.keys(localStorage);
      let toJSON = [];
      for (let key of keys) {
          if (typeof + key === 'number') {
              // console.log(`${key}: ${localStorage.getItem(key)}`);
              toJSON.push({postId: key, timeSpend: getStatistics(key)});
              //todo INFO: uncomment on production
              //localStorage.removeItem(key);
          }
      }

      toJSON = JSON.stringify(toJSON);

      $.ajax({
          type: "GET",
          url: '/verify_statistics',
          headers: {
              'statistics': toJSON,
          }

      }).done(function(response) { }).fail(function(err) { console.log(err); });

      console.log(toJSON);
  }


	$(document).ready(function() {	

	var $result = $('#search_result');
	
	$('.searchField').on('keyup', function(){
		var search = $(this).val();
		if ((search !== '') && (search.length > 1)){
			$.ajax({
				type: "POST",
				url: "/search/?question=" + search,
				success: function(msg){
					if(msg !== ''){
					$('.search_fieldContainer').addClass("search_active");
					$('#search_result').show();
					$result.html('');
					msg.forEach((results, index, self) => {
						$result.append('<a href="#" class="sr_item">' + results['title'] + '</a>');
					});
						$result.show();
					} else {
						$('.search_fieldContainer').removeClass("search_active");
						$result.hide();
						console.log('Empty');
					}
				}
			});
		 } else {
			$result.html('');
			$result.hide();
		 }
	});
 
	$(document).on('click', function(e){
		if (!$(e.target).closest('.search_box').length){
			$result.html('');
			$result.hide();
		}
	});
});

	   function showSearchInput(e) {
    	e.preventDefault();
        $("#search_box").show();
        $(".searchField").focus();
       }

       $('#search_box').click(function(e){
       	$("#search_box").hide();
       })

       $(document).keyup(function(e) {
       	if (e.key === "Escape") {
       		$("#search_box").hide();
       	}});

       let user   = JSON.parse(localStorage.getItem('user'));

       if (user !== 'undefined' && user !== null) {
       	var profilePic = <img src={user['avatar']} className='avatarHeader' />
       } else {
       	var profilePic = <Link to="/login" className="material-icons menu_icons"> perm_identity </Link>
       }

	   return (
	   	<>
		<div className="header" id="header">
		<div className="center_header">
		<div className="logo_block">
		<Link to="/news"><img className="logo" src={require('./logo.svg')} /></Link>
		<Link to="/news" className="logoTitle">mos.ru</Link>
		</div>
		<div className="menu_block">
		<Link to="/afisha"     onClick={sendData} className="menu_item">  Афиша   </Link> 
		<Link to="/services"   onClick={sendData} className="menu_item">  Услуги  </Link> 
		<Link to="/map"        onClick={sendData} className="menu_item">  Карта   </Link> 
		<Link to="/authority"  onClick={sendData} className="menu_item">  Власть  </Link>        
		</div>
		<div className="account_block">
		{profilePic}
		<span className="material-icons menu_icons" onClick={showSearchInput}> search </span>
		</div>
		</div>
		</div>
		<Search />
		</>
	    )
}

export default withRouter(Header)