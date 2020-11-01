import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Footer.css'

function Footer() {
	return (
		<div className="footer" id="footer">
		<div className="cf_title_block">
		<div className="cft_center">
		<div className="ctf_info_block">
		<span className="cf_title">
		Не официальный портал Мэра и Правительства Москвы
		</span>
		<span className="cf_adress">125032 Москва, ул. Тверская, 13</span>
		</div>
		<div className="ctf_apps_block">
		<img src="https://www.mos.ru/front/markup/header-footer/media/apple_ru.04ee2b55.svg" className="ctf_app" />
		<img src="https://www.mos.ru/front/markup/header-footer/media/google_ru.815e3fd5.svg" className="ctf_app" />
		</div>
		</div>
		</div>
		<div className="center_footer">

		<div className="cf_mini_column">
		<Link to="/news" className="cfm_title"> Новости </Link>
		<Link to="/news" className="cfm_item"> Социальная сфера </Link>
		<Link to="/news" className="cfm_item"> Транспорт </Link> 
		<Link to="/news" className="cfm_item"> Экономика </Link> 
		<Link to="/news" className="cfm_item"> Строительство </Link> 
		<Link to="/news" className="cfm_item"> Городское  хозяйство </Link> 
		</div>

		<div className="cf_mini_column">
		<Link to="/news" className="cfm_title"> Афиша </Link>
		<Link to="/news" className="cfm_item"> Все события </Link>
		<Link to="/news" className="cfm_item"> Спектакли </Link> 
		<Link to="/news" className="cfm_item"> Выставки </Link> 
		<Link to="/news" className="cfm_item"> Концерты </Link> 
		<Link to="/news" className="cfm_item"> Образование </Link> 
		</div>

		<div className="cf_mini_column">
		<Link to="/news" className="cfm_title"> Власть </Link>
		<Link to="/news" className="cfm_item"> Структура </Link>
		<Link to="/news" className="cfm_item"> Органы власти </Link> 
		<Link to="/news" className="cfm_item"> Тер. устройство </Link> 
		<Link to="/news" className="cfm_item"> Документы </Link> 
		<Link to="/news" className="cfm_item"> Ведомства </Link> 
		</div>

		<div className="cf_mini_column">
		<Link to="/news" className="cfm_title"> Инструкции </Link>
		<Link to="/news" className="cfm_item"> Образование </Link>
		<Link to="/news" className="cfm_item"> Здоровье </Link> 
		<Link to="/news" className="cfm_item"> Транспорт </Link> 
		<Link to="/news" className="cfm_item"> Платежи </Link> 
		<Link to="/news" className="cfm_item"> Соцподдрежка </Link> 
		</div>

		<div className="cf_mini_column">
		<Link to="/news" className="cfm_title"> Услуги </Link>
		<Link to="/news" className="cfm_item"> Каталог услуг </Link>
		<Link to="/news" className="cfm_item"> Центр госуслуг </Link> 
		<Link to="/news" className="cfm_item"> Вопросы и ответы </Link> 
		<Link to="/news" className="cfm_item"> Мои платежи </Link> 
		<Link to="/news" className="cfm_item"> О городских услугах </Link> 
		</div>

		<div className="social_networks_block">
		<img src="https://www.mos.ru/front/markup/header-footer/media/vk.aecd1574.svg" className="snb_icon" />
		<img src="https://www.mos.ru/front/markup/header-footer/media/instagram.0f9139fe.svg" className="snb_icon" />
		<img src="https://www.mos.ru/front/markup/header-footer/media/fb.ec1e09ea.svg" className="snb_icon" />
		<img src="https://www.mos.ru/front/markup/header-footer/media/ok.faaeafab.svg" className="snb_icon" />
		<img src="https://www.mos.ru/front/markup/header-footer/media/twitter.3c4b2361.svg" className="snb_icon" />
		<img src="https://www.mos.ru/front/markup/header-footer/media/telegram.1b6ab9d2.svg" className="snb_icon" />
		<img src="https://www.mos.ru/front/markup/header-footer/media/rss.550ff104.svg" className="snb_icon" />
		<img src="https://www.mos.ru/front/markup/header-footer/media/viber.58c5f110.svg" className="snb_icon" />

		</div>

		</div>
		</div>
	)
}

export default Footer