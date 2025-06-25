import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddNews = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Загрузка списка категорий с бэка
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/v1/news_blog/categories'); // Убедись, что этот endpoint существует
                if (!res.ok) throw new Error("Ошибка загрузки категорий");
                const data = await res.json();
                setCategories(data);
            } catch (e) {
                setError(e.message);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('categoryId', categoryId);
        for (let i = 0; i < files.length; i++) {
            formData.append('newsBlogFiles', files[i]);
        }

        try {
            const res = await fetch('/api/v1/news_blog/create', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Ошибка при добавлении новости');

            navigate('/news_blog'); // переход на страницу всех новостей
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Добавить новость</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Заголовок</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Содержание</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Категория</label>
                    <select
                        className="form-select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                        required
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Файлы</label>
                    <input
                        type="file"
                        className="form-control"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default AddNews;
