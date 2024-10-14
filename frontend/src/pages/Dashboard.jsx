import React, { useState, useEffect } from 'react';
import axios from 'axios'; // To make API calls
import PlayerCard from '../components/PlayerCard'; // Component for displaying player details

const Dashboard = () => {
    const [players, setPlayers] = useState([]); // State to hold player data
    const [playerError, setPlayerError] = useState(null); // State for error handling

    // Fetch players on component load
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/players');
                if (Array.isArray(response.data)) {
                    setPlayers(response.data.slice(-5)); // Get the latest 5 players
                } else {
                    throw new Error('Data format is not an array');
                }
            } catch (error) {
                setPlayerError('Error fetching players');
                console.error('Error fetching players:', error);
            }
        };
        fetchPlayers();
    }, []); // Empty dependency array to run once on component mount

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center text-white"
        >
            {/* Header Section */}
            <header className="bg-[#203731] bg-opacity-80 p-6">
                <h1 className="text-3xl font-bold text-center">Welcome to Packers Players Management</h1>
                <p className="text-center mt-3">Track the Green Bay Packers players easily</p>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-col items-center justify-center px-6">
                {/* About Section */}
                <section className="bg-[#FFB612] bg-opacity-80 p-6 rounded-lg shadow-lg mt- 10 mb-10 w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-4 text-center text-[#203731]">About the Website</h2>
                    <p className="text-[#203731] text-center">
                        This website allows you to manage the Green Bay Packers player roster by adding, viewing, and removing players. Stay updated with the latest roster changes and manage your team information efficiently.
                    </p>
                </section>

                {/* Recent Players Section */}
                <section className="bg-[#203731] bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-4xl">
                    <h2 className="text-xl font-bold mb-4 text-[#FFB612] text-center">Recent Players</h2>
                    {playerError ? (
                        <p className="text-red-500 text-center">{playerError}</p>
                    ) : players.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {players.map(player => (
                                <PlayerCard key={player._id} player={player} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-white text-center">No recent players found.</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
