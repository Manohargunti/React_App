// Create this component to put the options on Navbar
import React from 'react';

const Navbar = () => {
    return (
        <div className="bg-[#203731] text-white px-10 py-8 flex justify-between items-center">
            <div className="px-25 text-lg font-bold">Packers Players Management</div>
            <div className="space-x-4">
                <a href="/" className="hover:text-secondary">Home</a>
                <a href="/players" className="hover:text-secondary">PlayersList</a>
                <a href="/add-player" className="hover:text-secondary">UpdatePlayer</a>
            </div>
        </div>
    );
};

export default Navbar;
