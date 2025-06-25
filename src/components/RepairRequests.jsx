import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const RepairRequests = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await fetch('/api/v1/repairRequests');
                if (!res.ok) throw new Error('Ошибка загрузки заявок');
                const data = await res.json();
                setRequests(data);
                setFilteredRequests(data);
            } catch (e) {
                setError(e.message);
            }
        };
        fetchRequests();
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        setFilteredRequests(
            requests.filter(r =>
                r.repairLocation?.toLowerCase().includes(term) ||
                r.repairDescription?.toLowerCase().includes(term) ||
                r.employeeFullName?.toLowerCase().includes(term) ||
                r.department?.toLowerCase().includes(term)
            )
        );
    }, [searchTerm, requests]);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <h2 className="text-primary m-0">Заявки на офисное обслуживание</h2>
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Поиск по заявке"
                        style={{ maxWidth: '250px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to="/repair-requests/create" className="btn btn-success">
                        <i className="ti ti-tools me-1"></i>
                        Новая заявка
                    </Link>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm p-3">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Заказчик</th>
                            <th>Отдел</th>
                            <th>Цель</th>
                            <th>Время подачи</th>
                            <th>Затраты времени</th>
                            <th>Исполнители</th>
                            <th>Статус</th>
                            <th>Примечания</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRequests.length > 0 ? (
                            filteredRequests.map((req, index) => (
                                <tr key={req.id}>
                                    <td>{index + 1}</td>
                                    <td>{req.employeeFullName}</td>
                                    <td>{req.department}</td>
                                    <td>{req.repairDescription}</td>
                                    <td>{req.createdAt
                                            ? moment(req.createdAt, 'DD.MM.YYYY HH:mm:ss').format('D MMMM YYYY')
                                            : '—'}</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center text-muted py-4">
                                    Ничего не найдено
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RepairRequests;
