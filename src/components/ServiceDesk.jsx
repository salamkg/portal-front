// src/components/ServiceDesk.jsx

import React from 'react';

const ServiceDesk = () => {
    return (
        <div className="container mt-4">
            <div className="alert alert-primary fw-bold">
                Единая точка приема обращений по сервисам ИТ — <span className="text-decoration-underline">Servicedesk!</span>
            </div>

            <div className="mt-4">
                <h3>Как подать обращение:</h3>
                <p>Вы можете создать заявку через наш портал ServiceDesk для решения любых ИТ-вопросов.</p>
                <ul>
                    <li>Проблемы с оборудованием</li>
                    <li>Заявки на доступ</li>
                    <li>Ошибки в программном обеспечении</li>
                    <li>Прочие технические вопросы</li>
                </ul>
                <p>Чтобы подать заявку, перейдите по ссылке ниже:</p>
                <a
                    href="https://servicedesk.megacom.kg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                >
                    Заявка в ServiceDesk
                </a>
            </div>
        </div>
    );
};

export default ServiceDesk;
