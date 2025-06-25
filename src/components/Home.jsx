import React from 'react';
import { Link } from 'react-router-dom';
import {assets} from "../assets/index.js";

const Home = () => {
    return (
        <div className="container mt-4">
            {/* Корпоративное изображение сверху */}
            <div className="text-center mb-4">
                <img src={assets.mega_corp} alt="Mega" style={{ height: '150px' }} />
            </div>

            {/* Приветствие */}
            <div className="text-center mb-4">
                <h4>Уважаемые Коллеги!</h4>
                <p className="fs-5">
                    Мы рады приветствовать Вас на внутреннем корпоративном портале компании <strong>МЕГА</strong>!
                </p>
            </div>

            {/* Кнопка */}
            <div className="text-center">
                <Link to="/repair-requests" className="btn btn-success btn-lg d-inline-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tada" width="24"
                         height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                         fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"/>
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1"/>
                    </svg>
                    Заявки на офисное обслуживание
                </Link>
            </div>
        </div>
    );
};

export default Home;
