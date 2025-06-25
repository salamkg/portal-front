import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Library = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLibrary = async () => {
            try {
                const res = await fetch('/api/v1/knowledge-base/library');
                if (!res.ok) throw new Error("Ошибка загрузки библиотеки");
                const data = await res.json();
                setItems(data);
                setFilteredItems(data);
            } catch (e) {
                setError(e.message);
            }
        };
        loadLibrary();
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        setFilteredItems(
            items.filter(item =>
                item.name?.toLowerCase().includes(term) ||
                item.author?.toLowerCase().includes(term) ||
                item.field?.name?.toLowerCase().includes(term)
            )
        );
    }, [searchTerm, items]);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Поиск элемента"
                    style={{ maxWidth: '300px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link to="/add-library-item" className="btn btn-primary">Добавить элемент</Link>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <table className="table table-responsive align-middle">
                <thead>
                <tr>
                    <th style={{ width: '40px' }}></th>
                    <th style={{ width: '50px' }}>№</th>
                    <th>Название</th>
                    <th>Автор</th>
                    <th>Тематика</th>
                    <th>Кол-во копий</th>
                    <th>На руках</th>
                </tr>
                </thead>
                <tbody>
                {filteredItems.map((item, index) => (
                    <tr key={item.id || index}>
                        <td>
                            {item.libraryFiles && item.libraryFiles.length > 0 && (
                                <a
                                    href={item.libraryFiles[0].url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Открыть файл"
                                >
                                    <i className="ti ti-file-description" style={{ fontSize: '1.2rem' }}></i>
                                </a>
                            )}
                        </td>
                        <td>{index + 1}</td>
                        <td>
                            <Link to={`/library/${item.id}`} className="text-decoration-none">
                                {item.name}
                            </Link>
                        </td>
                        <td>{item.author}</td>
                        <td>{item.field?.name || '—'}</td>
                        <td>{item.copies}</td>
                        <td>{item.location}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Library;
