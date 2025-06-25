import React from "react";

function Sidebar() {
    return (
        <div className="bg-light h-100 p-3" style={{ minWidth: "220px" }}>
            <ul className="nav flex-column">
                <li className="nav-item"><a className="nav-link" href="/employees">Список сотрудников</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Обучение</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Кадровый раздел</a></li>
                <li className="nav-item"><a className="nav-link" href="#">IT Сервисы</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;