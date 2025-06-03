import React from 'react';

const GroupCard = ({ setIsGroupCardModalOpen, groupName }) => {
    return (
        <div
            onClick={() => setIsGroupCardModalOpen(true)}
            className="bg-gray-300 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition w-50 h-30 max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold text-black">{groupName}</h2>
        </div>
    );
};

export default GroupCard;
