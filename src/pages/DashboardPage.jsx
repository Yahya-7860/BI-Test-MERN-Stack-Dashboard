import React, { useState } from 'react';
import GroupModal from '../modal/GroupForm';

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState('');

    const handleCreateGroup = () => {
        // Placeholder for group creation logic
        console.log('Group Created:', groupName);
        setGroupName('');
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-8 ">Expense Sharing App</h1>

            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Create Group
            </button>

            {isModalOpen && (
                <GroupModal
                    groupName={groupName}
                    setGroupName={setGroupName}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateGroup}
                />
            )}
        </div>
    )
};

export default Dashboard;
