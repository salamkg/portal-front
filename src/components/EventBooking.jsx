import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Calendar.css';

const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const EventBooking = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/calendar')
            .then(res => res.json())
            .then(setEvents)
            .catch(console.error);
    }, []);

    // Получить уникальные даты из событий
    const dates = Array.from(new Set(events.map(e => e.date))).sort();

    // Сгруппировать события по дню недели и дате
    const getEventsByDate = (day, date) => {
        return events.filter(e => e.day === day && e.date === date);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-primary">Календарь событий</h2>
                <button className="btn btn-success" onClick={() => navigate('/calendar/create')}>
                    Добавить событие
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="table-light">
                    <tr>
                        {DAYS.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                    <tr>
                        {DAYS.map(day => {
                            const matchingEvent = events.find(e => e.day === day);
                            return <th key={day}>{matchingEvent?.date || '—'}</th>;
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {DAYS.map(day => {
                            const dayEvents = events.filter(e => e.day === day);
                            return (
                                <td key={day} className="align-top">
                                    {dayEvents.map((event, idx) => (
                                        <div key={idx} className="mb-2">
                                            <strong>{event.time}</strong><br />
                                            {event.title}
                                        </div>
                                    ))}
                                </td>
                            );
                        })}
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventBooking;
