import React from 'react';

const MemberCard = ({ memberName, amount, setAmount }) => {
    return (
        <div className="w-full flex items-center justify-between bg-white shadow rounded px-4 py-3 mb-2">
            {/* Member Name */}
            <div className="w-1/5 font-medium text-gray-800">
                Name
            </div>

            {/* Amount Input */}
            <div className="w-1/5">
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
            </div>

            {/* You Owe */}
            <div className="w-1/5 text-center">
                <p className="text-xs text-gray-500">You Owe</p>
                <p className="text-sm text-gray-800 font-semibold">₹0</p>
            </div>

            {/* You Lent */}
            <div className="w-1/5 text-center">
                <p className="text-xs text-gray-500">You Lent</p>
                <p className="text-sm text-gray-800 font-semibold">₹0</p>
            </div>

            {/* Settled Up Button */}
            <div className="w-1/5 text-right">
                <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded">
                    Settled Up
                </button>
            </div>
        </div>
    );
};

export default MemberCard;
