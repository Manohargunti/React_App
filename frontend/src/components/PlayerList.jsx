import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState(null);
    const [selectedPlayerIds, setSelectedPlayerIds] = useState([]); // State to track selected players

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get('/api/players');
                if (Array.isArray(response.data)) {
                    setPlayers(response.data);
                } else {
                    throw new Error('Data format is not an array');
                }
            } catch (error) {
                setError('Error fetching players');
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    // Toggle player selection on double-click
    const handlePlayerSelect = (playerId) => {
        if (selectedPlayerIds.includes(playerId)) {
            setSelectedPlayerIds(selectedPlayerIds.filter(id => id !== playerId)); // Deselect player
        } else {
            setSelectedPlayerIds([...selectedPlayerIds, playerId]); // Select player
        }
    };

    // Delete selected players
    const deleteSelectedPlayers = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete the selected players?');
        if (!confirmDelete) {
            return;
        }

        try {
            // Perform deletion for each selected player
            await Promise.all(selectedPlayerIds.map(playerId => axios.delete(`/api/players/${playerId}`)));

            // Update the players state to exclude deleted players
            setPlayers(players.filter(player => !selectedPlayerIds.includes(player._id)));

            // Clear the selected player IDs
            setSelectedPlayerIds([]);

            alert('Selected players deleted successfully');
        } catch (error) {
            alert('Error deleting players');
            console.error('Error deleting players:', error);
        }
    };

    return (
        <div className="p-6 bg-[#203731] min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-4 text-[#FFB612]">Packers Player List</h1>

            {selectedPlayerIds.length > 0 && (
                <div className="mb-4">
                    <button
                        onClick={deleteSelectedPlayers}
                        className="bg-[#FFB612] text-[#203731] px-4 py-2 rounded hover:bg-[#ffcc40] flex items-center"
                    >
                        <FiTrash2 className="mr-2" /> Delete Selected
                    </button>
                </div>
            )}

            {error ? (
                <p className="text-red-500">{error}</p>
            ) : players.length > 0 ? (
                <>
                    {players.map(player => (
                        <div
                            key={player._id}
                            className={`mb-6 p-4 rounded-lg shadow-md border cursor-pointer ${
                                selectedPlayerIds.includes(player._id)
                                    ? 'bg-[#FFB612] text-[#203731]'
                                    : 'bg-[#ffffff] text-[#203731]'
                            }`}
                            onDoubleClick={() => handlePlayerSelect(player._id)} // Toggle selection on double-click
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-bold">{player.name}</h2>
                                    <p>Number: {player.Number}</p>
                                    <p>Position: {player.Position}</p>
                                </div>
                                {selectedPlayerIds.includes(player._id) && (
                                    <div className="text-[#203731] font-bold">Selected</div>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <p className="text-gray-400">No players found.</p>
            )}
        </div>
    );
};

export default PlayerList;
