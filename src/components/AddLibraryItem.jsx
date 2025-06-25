import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AddLibraryItem = () => {
    const navigate = useNavigate();
    const [itemName, setItemName] = useState('');
    const [author, setAuthor] = useState('');
    const [fieldId, setFieldId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [files, setFiles] = useState([]);
    const [fields, setFields] = useState([]); // список категорий
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Получение списка категорий (fields)
    useEffect(() => {
        const fetchFields = async () => {
            try {
                const res = await fetch('/api/v1/knowledge-base/all-fields');
                if (!res.ok) throw new Error('Ошибка загрузки категорий');
                const data = await res.json();
                setFields(data);
            } catch (e) {
                setError(e.message);
            }
        };

        fetchFields();
    }, []);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('itemName', itemName);
        formData.append('author', author);
        formData.append('fieldId', fieldId);
        formData.append('quantity', quantity);

        files.forEach(file => formData.append('libraryFiles', file));

        try {
            const response = await fetch('/api/v1/knowledge-base/addLibraryItem', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                setSuccess(true);
                setError(null);
                setItemName('');
                setAuthor('');
                setFieldId('');
                setQuantity(1);
                setFiles([]);
                navigate('/library');
            } else {
                throw new Error('Ошибка при создании элемента библиотеки');
            }
        } catch (e) {
            setError(e.message);
            setSuccess(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Добавить элемент в библиотеку</h3>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label">Название</label>
                    <input
                        type="text"
                        className="form-control"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Автор</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Раздел (категория)</label>
                    <select
                        className="form-select"
                        value={fieldId}
                        onChange={(e) => setFieldId(e.target.value)}
                        required
                    >
                        <option value="">Выберите категорию</option>
                        {fields.map(field => (
                            <option key={field.id} value={field.id}>
                                {field.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Количество</label>
                    <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Файлы</label>
                    <input
                        type="file"
                        className="form-control"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Добавить</button>
            </form>

            {success && <div className="alert alert-success mt-3">Элемент успешно добавлен!</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default AddLibraryItem;
