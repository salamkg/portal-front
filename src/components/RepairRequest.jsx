import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RepairRequestForm = () => {
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const params = new URLSearchParams();
            params.append("location", location);
            params.append("description", description);

            const response = await fetch(`/api/v1/repairRequests/create?${params.toString()}`, {
                method: "POST"
            });

            if (response.ok) {
                navigate('/repair-requests'); // 🔁 Перенаправление после успешной отправки
            } else {
                throw new Error("Ошибка при создании заявки");
            }
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Создать заявку на ремонт</h3>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Локация</label>
                    <input
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Описание</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Отправить заявку</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default RepairRequestForm;
