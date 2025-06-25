import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const DEFAULT_PHOTO = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [limit] = useState(25);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);

    // Фильтры
    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1000));

                const res = await fetch(`/api/v1/employees?pageNumber=${pageNumber}&limit=${limit}`);
                if (!res.ok) throw new Error("Ошибка загрузки сотрудников");
                const data = await res.json();
                setEmployees(data);
                setError(null);
                setHasMore(data.length === limit);
            } catch (e) {
                setError(e.message);
                setEmployees([]);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };
        loadEmployees();
    }, [pageNumber, limit]);

    const goPrev = () => {
        if (pageNumber > 0) setPageNumber(pageNumber - 1);
    };

    const goNext = () => {
        if (hasMore) setPageNumber(pageNumber + 1);
    };

    const handleFilter = () => {
        // Здесь можно подключить фильтрацию к API
        console.log('Фильтры:', { fullName, department, email, position });
    };

    return (
        <div className="row vh-100" style={{ backgroundColor: "#f5f5f5" }}>
            <div className="col-md-3 col-lg-2 sidebar-container" style={{ backgroundColor: "#fff" }}>
                <div className="sidebar-box">
                    <Sidebar />
                </div>
            </div>

            <div className="col-md-9 col-lg-10 p-4" style={{ backgroundColor: "#fff", color: "#000" }}>
                <h3 className="mb-3">Сотрудники</h3>

                {/* 🔍 Панель фильтрации */}
                <div className="mb-3 p-2 bg-light rounded shadow-sm small">
                    <div className="row g-2 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label mb-1">ФИО</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Введите ФИО"
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-1">Отдел</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                placeholder="Введите отдел"
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-1">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Введите email"
                            />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mb-1">Должность</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="Введите должность"
                            />
                        </div>

                        <div className="col-md-12 text-end mt-3">
                            <button className="btn btn-primary btn-sm" onClick={handleFilter}>
                                Применить фильтр
                            </button>
                        </div>
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {/* 💼 Список сотрудников или спиннер загрузки или сообщение об отсутствии данных */}
                <div className="d-flex flex-column gap-3">
                    {loading ? (
                        <div className="text-center d-flex gap-2 justify-content-center py-5">
                            <div className="spinner-grow text-blue" role="status"></div>
                            <div className="spinner-grow text-green" role="status"></div>
                            <div className="spinner-grow text-grey" role="status"></div>
                        </div>
                    ) : employees.length > 0 ? (
                        employees.map(emp => {
                            const photoUrl = emp.photo || DEFAULT_PHOTO;

                            return (
                                <div
                                    key={emp.id}
                                    className="d-flex justify-content-between align-items-center p-3 shadow-sm rounded"
                                    style={{ backgroundColor: "#fff" }}
                                >
                                    {/* Левая часть */}
                                    <div className="d-flex align-items-center gap-2" style={{ minWidth: "50%", maxWidth: "50%" }}>
                                        <img
                                            src={photoUrl}
                                            alt={`${emp.firstName} ${emp.lastName} ${emp.middleName || ''}`}
                                            style={{
                                                width: "90px",
                                                height: "90px",
                                                objectFit: "cover",
                                                border: "5px solid #ddd",
                                                borderRadius: "4px"
                                            }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                                                {emp.firstName} {emp.lastName} {emp.middleName || ''}
                                            </div>
                                            <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                                                {emp.departmentName?.name || "—"}
                                            </div>
                                            <div style={{ fontSize: "0.9rem" }}>
                                                <strong>Company #: </strong>{emp.companyNumber || "—"}
                                            </div>
                                            <div style={{ fontSize: "0.9rem" }}>
                                                <strong>Mobile: </strong>{emp.mobileNumber || "—"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Правая часть */}
                                    <div className="d-flex flex-column gap-1" style={{ minWidth: "50%", maxWidth: "50%" }}>
                                        <div><strong>Email: </strong>{emp.email || "—"}</div>
                                        <div><strong>Position: </strong>{emp.position || "—"}</div>
                                        <div><strong>Work Place: </strong>{emp.workPlace || "—"}</div>
                                        <div><strong>Work Office: </strong>{emp.workOffice || "—"}</div>
                                        <div><strong>1C ID: </strong>{emp.identificator_1C || "—"}</div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center py-5">Нет данных</div>
                    )}
                </div>

                {/* Пагинация */}
                <nav aria-label="Page navigation example" className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${pageNumber === 0 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                aria-label="Previous"
                                onClick={goPrev}
                                disabled={pageNumber === 0}
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>

                        <li className="page-item active">
                            <span className="page-link">{pageNumber + 1}</span>
                        </li>

                        <li className={`page-item ${!hasMore ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                aria-label="Next"
                                onClick={goNext}
                                disabled={!hasMore}
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Employees;
