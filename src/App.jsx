import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Employees from "./components/Employees.jsx";
import RepairRequest from "./components/RepairRequest.jsx";
import AddLibraryItem from "./components/AddLibraryItem.jsx";
import Library from "./components/Library.jsx";
import NewsBlog from "./components/NewsBlog.jsx";
import AddNews from "./components/AddNews.jsx";
import NewsBlogDetail from "./components/NewsBlogDetail.jsx";
import LibraryDetail from "./components/LibraryDetail.jsx";
import ServiceDesk from "./components/ServiceDesk.jsx";
import Home from "./components/Home.jsx";
import RepairRequests from "./components/RepairRequests.jsx";
import EventBooking from "./components/EventBooking.jsx";

function App() {

  return (
    <>
      <Navbar />
        <div className="container-fluid">
            <Routes>
                <Route path="/employees" element={<Employees />} />
                <Route path="/repair-requests/create" element={<RepairRequest />} />
                <Route path="/repair-requests" element={<RepairRequests />} />
                <Route path="/add-library-item" element={<AddLibraryItem />} />
                <Route path="/library" element={<Library />} />
                <Route path="/library/:id" element={<LibraryDetail />} />
                <Route path="/news_blog" element={<NewsBlog />} />
                <Route path="/news_blog/create" element={<AddNews />} />
                <Route path="/news_blog/:id" element={<NewsBlogDetail />} />

                <Route path="/service-desk" element={<ServiceDesk />} />
                <Route path="/calendar" element={<EventBooking />} />

                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    </>
  )
}

export default App
