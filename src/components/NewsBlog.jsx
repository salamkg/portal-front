import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const NewsBlog = () => {
    const [newsList, setNewsList] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ добавили флаг загрузки

    useEffect(() => {
        const loadNews = async () => {
            try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500)); // Небольшая задержка
                const res = await fetch('/api/v1/news_blog');
                if (!res.ok) throw new Error("Ошибка загрузки новостей");
                const data = await res.json();
                setNewsList(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-primary m-0">Новости</h2>
                <Link to="/news_blog/create" className="btn btn-primary">
                    Добавить новость
                </Link>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center d-flex gap-2 justify-content-center py-5">
                    <div className="spinner-grow text-blue" role="status"></div>
                    <div className="spinner-grow text-success" role="status"></div>
                    <div className="spinner-grow text-secondary" role="status"></div>
                </div>
            ) : newsList.length === 0 ? (
                <p className="text-muted">Нет новостей для отображения.</p>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {newsList.map((item) => (
                        <div className="card w-100 bg-white shadow-sm rounded p-4" key={item.id}>
                            <h4 className="card-title mb-2">
                                <Link to={`/news_blog/${item.id}`} className="text-decoration-none text-dark">
                                    {item.title}
                                </Link>
                            </h4>
                            <p className="text-muted small mb-3">
                                {item.createdAt
                                    ? moment(item.createdAt, 'DD.MM.YYYY HH:mm:ss').format('D MMMM YYYY')
                                    : '—'}
                            </p>
                            <p className="card-text m-0">
                                {item.content.length > 150
                                    ? item.content.slice(0, 150) + '...'
                                    : item.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsBlog;