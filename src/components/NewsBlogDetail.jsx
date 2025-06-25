import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const NewsBlogDetail = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch(`/api/v1/news_blog/${id}`);
                if (!res.ok) throw new Error('Новость не найдена');
                const data = await res.json();
                setNews(data);
            } catch (e) {
                setError(e.message);
            }
        };
        fetchNews();
    }, [id]);

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">{error}</div>
                <Link to="/news_blog" className="btn btn-secondary">Назад к списку</Link>
            </div>
        );
    }

    if (!news) {
        return (
            <div className="container mt-4">
                <p>Загрузка...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <Link to="/news_blog" className="btn btn-link mb-3">← Назад к списку новостей</Link>

            <h2>{news.title}</h2>
            <p className="text-muted">
                {news.createdAt
                    ? moment(news.createdAt, 'DD.MM.YYYY HH:mm:ss').format('D MMMM YYYY [в] HH:mm')
                    : '—'}{' '}
                | Автор: {news.createdBy}
            </p>

            <div className="mt-4">
                <p>{news.content}</p>
            </div>

            {news.newsBlogFiles && news.newsBlogFiles.length > 0 && (
                <div className="mt-4">
                    <h5>Файлы:</h5>
                    <ul>
                        {news.newsBlogFiles.map((file, index) => (
                            <li key={index}>
                                <a href={`/${file.filePath}`} target="_blank" rel="noopener noreferrer">
                                    {file.fileName}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NewsBlogDetail;