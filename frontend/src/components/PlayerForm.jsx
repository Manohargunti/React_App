import React, { useState } from 'react';
import axios from 'axios'; //axios is used to make an API call to server

const PlayerForm = () => {
    const [player, setPlayer] = useState({ name: '', age: '', role: '', matches: '', average_score: '' });
    const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        if (!player.name) newErrors.name = 'Name is required';
        if (!player.Number || player.Number < 0) newErrors.Number = 'Number must be a positive number';
        if (!player.Position) newErrors.Position = 'Position is required';
        return newErrors;
    };

    const handleChange = (e) => {
        setPlayer({ ...player, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        console.log('Submitting player:', player);

        try {
            const response = await axios.post('http://localhost:3000/api/players', player);
            alert('Player added successfully');
            console.log('Response:', response.data);
            setPlayer({ name: '', Number: '', Position: ''});
            setErrors({});
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('Error adding player');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#203731] p-4">
            <div className="bg-[#FFB612] p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-[#203731]">
                <h2 className="text-3xl font-bold mb-6 text-center text-[#203731]">Add Green Bay Packer Player</h2>
                <form onSubmit={handleSubmit} className="text-[#203731]">
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-medium text-[#203731]">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={player.name}
                            onChange={handleChange}
                            placeholder="Enter player's name"
                            className="w-full mb-2 p-3 bg-white text-[#203731] border-2 border-[#203731] rounded focus:outline-none focus:ring-2 focus:ring-[#FFB612]"
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="age" className="block font-medium text-[#203731]">Number</label>
                        <input
                            type="number"
                            name="Number"
                            id="Number"
                            value={player.Number}
                            onChange={handleChange}
                            placeholder="Enter player's number"
                            className="w-full mb-2 p-3 bg-white text-[#203731] border-2 border-[#203731] rounded focus:outline-none focus:ring-2 focus:ring-[#FFB612]"
                        />
                        {errors.Number && <p className="text-red-500">{errors.Number}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block font-medium text-[#203731]">Position</label>
                        <select
                            name="Position"
                            id="Position"
                            value={player.Position}
                            onChange={handleChange}
                            className="w-full mb-2 p-3 bg-white text-[#203731] border-2 border-[#203731] rounded focus:outline-none focus:ring-2 focus:ring-[#FFB612]"
                        >
                            <option value="">Select Position</option>
                            <option value="Quarterback">Quarterback</option>
                            <option value="RunningBack">Running Back</option>
                            <option value="WideReceiver">Wide Receiver</option>
                            <option value="TightEnd">Tight End</option>
                            <option value="Fullback">Fullback</option>
                            <option value="LeftTackle">Left Tackle</option>
                            <option value="LeftGuard">Left Guard</option>
                            <option value="Center">Center</option>
                            <option value="RightGuard">Right Guard</option>
                            <option value="RightTackle">Right Tackle</option>
                            <option value="DefensiveEnd">Defensive End</option>
                            <option value="DefensiveTackle">Defensive Tackle</option>
                            <option value="Linebacker">Linebacker</option>
                            <option value="Cornerback">Cornerback</option>
                            <option value="FreeSafety">Free Safety</option>
                            <option value="StrongSafety">Strong Safety</option>
                            <option value="Kicker">Kicker</option>
                            <option value="Punter">Punter</option>
                            <option value="KickReturner">Kick Returner</option>
                            <option value="PuntReturner">Punt Returner</option>
                            <option value="LongSnapper">Long Snapper</option>
                            <option value="Holder">Holder</option>
                        </select>
                        {errors.Position && <p className="text-red-500">{errors.Position}</p>}
                    </div>

                    <button type="submit" className="bg-[#203731] text-white px-6 py-3 rounded-lg w-full hover:bg-[#FFB612] hover:text-[#203731] transition-colors duration-300">Submit Player</button>
                </form>
            </div>
        </div>
    );
};

export default PlayerForm;
