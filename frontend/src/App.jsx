// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PlayersPage from './pages/PlayersPage';
import PlayerForm from './components/PlayerForm';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col">
                <Navbar />
                <div className="flex-1 p-6 ml-10"> {/* Adjusting the padding and margin to move content right */}
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/players" element={<PlayersPage />} />
                        <Route path="/add-player" element={<PlayerForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
