import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../assets';

const Navbar = () => {
    const handleEmployeesClick = async () => {
        // e.preventDefault();
        try {
            // const response = await fetch('/api/v1/employees');
            // const data = await response.json();
            // console.log('Сотрудники:', data);
            // можно сохранить в state, передать в props, отобразить и т.д.
        } catch (err) {
            console.error('Ошибка при получении сотрудников:', err);
        }
    };

    return (
        <>
            <div className="navbar-wrapper">
                <div className="bg-body-tertiary py-2 px-4 d-flex justify-content-between align-items-center">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Поиск" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Поиск</button>
                    </form>

                    <div className="dropdown">
                        <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            John Doe Doevich
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#">Мои параметры</a></li>
                            <li><a className="dropdown-item" href="#">Кадровые данные</a></li>
                            <li><a className="dropdown-item" href="#">Выход</a></li>
                        </ul>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-mini">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={assets.logo} alt="Mega" style={{ height: '30px' }} />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Главная</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/news_blog">Новости</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Твоя компания
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Миссия и ценности Компании</a></li>
                                    <li><a className="dropdown-item" href="#">Корпоративный кодекс</a></li>
                                    <li><a className="dropdown-item" href="#">Политика в области качества</a></li>
                                    <li><Link className="dropdown-item" to="/employees" onClick={handleEmployeesClick}>Справочник
                                        сотрудников</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    База знаний
                                </a>
                                <ul className="dropdown-menu">
                                    {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"*/}
                                    {/*     className="feather feather-bell">*/}
                                    {/*    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>*/}
                                    {/*    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>*/}
                                    {/*</svg>*/}
                                    <li><Link className="dropdown-item" to="/library">Библиотека</Link></li>
                                    <li><a className="dropdown-item" href="#">Инструкция по работе с HRM-табели</a></li>
                                    <li><a className="dropdown-item" href="#">Работа с DocVision</a></li>
                                    <li><a className="dropdown-item" href="#">Регламенты ЗАО "Альфа-Телеком"</a></li>
                                    <li><a className="dropdown-item" href="#">Реестр внешних регламентов</a></li>
                                    <li><a className="dropdown-item" href="#">Реестр Кд и ПД</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Обучение персонала
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Обучение по направлению обслуживание
                                        клиентов</a></li>
                                    <li><a className="dropdown-item" href="#">Школа Эффективного Менеджера</a></li>
                                    <li><a className="dropdown-item" href="#">Электронная библиотека</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Административный раздел
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Бронь Автомобилей</a></li>
                                    <li><Link className="dropdown-item" to="/calendar">Бронь конференц зала</Link></li>
                                    <li><Link className="dropdown-item" to="/repair-request">Заявки на офисное обслуживание</Link></li>
                                    <li><a className="dropdown-item" href="#">Реестр жалоб и предложений на процесс закупок
                                        и снабжения</a></li>
                                    <li><a className="dropdown-item" href="#">Реестр жалоб на документооборот</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Сервисы ИТ
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="https://dv">DocsVision</Link></li>
                                    <li><Link className="dropdown-item" to="/service-desk">ServiceDesk(описание)</Link></li>
                                    <li><a className="dropdown-item" href="#">ServiceDesk(создать заявку)</a></li>
                                    <li><a className="dropdown-item" href="#">HRM-табели</a></li>
                                </ul>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <a className="nav-link" href="#">Кадровые данные</a>*/}
                            {/*</li>*/}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                   aria-expanded="false">
                                    Ресурсы отделов
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Контакт-Центр On-Line</a></li>
                                    <li><a className="dropdown-item" href="#">Отдел внутреннего контроля</a></li>
                                    <li><a className="dropdown-item" href="#">Наша жизнь в ОО</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
        </>
    );
};

export default Navbar;
