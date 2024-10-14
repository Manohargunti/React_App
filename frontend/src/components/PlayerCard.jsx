import React from 'react';

const PlayerCard = ({ player }) => {
    return (
        <div className="bg-[#FFB612] bg-opacity-80 text-[#203731] rounded-lg p-4 mb-4 shadow-md">
            <h1 className="text-lg font-bold">{player.name}</h1>
            <h2>Number: {player.Number}</h2>
            <h2>Position: {player.Position}</h2>
        </div>
    );
};

export default PlayerCard;
