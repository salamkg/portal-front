import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'bootstrap-icons/font/bootstrap-icons.css'
import {BrowserRouter} from "react-router-dom"; // твои стили (если есть)

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
