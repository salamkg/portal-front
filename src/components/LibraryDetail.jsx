import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LibraryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`/api/v1/knowledge-base/library/${id}`);
                if (!res.ok) throw new Error("Ошибка загрузки элемента");
                const data = await res.json();
                setItem(data);
            } catch (e) {
                setError(e.message);
            }
        };
        fetchItem();
    }, [id]);

    const closeModal = () => {
        navigate(-1); // назад
    };

    if (error) {
        return <div className="alert alert-danger mt-4 container">{error}</div>;
    }

    if (!item) {
        return <div className="text-center mt-5">Загрузка...</div>;
    }

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Информация о библиотечном элементе</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <h4>{item.name}</h4>
                        <p><strong>Автор:</strong> {item.author}</p>
                        <p><strong>Тематика:</strong> {item.field?.name || '—'}</p>
                        <p><strong>Количество копий:</strong> {item.copies}</p>
                        <p><strong>На руках:</strong> {item.location}</p>
                        <p><strong>Создано:</strong> {item.createdAt}</p>
                        <p><strong>Создано пользователем:</strong> {item.createdBy}</p>

                        {item.libraryFiles?.length > 0 && (
                            <div className="mt-3">
                                <strong>Файлы:</strong>
                                <ul className="list-unstyled mt-2">
                                    {item.libraryFiles.map((file, i) => (
                                        <li key={i}>
                                            <a
                                                href={file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="d-flex align-items-center gap-2"
                                            >
                                                <i className="ti ti-file-description" style={{ fontSize: '1.2rem' }}></i>
                                                {file.fileName || `Файл ${i + 1}`}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryDetail;
