import React, { useState } from 'react';
import GroupModal from '../modal/GroupForm';
import { ToastContainer, toast } from "react-toastify"

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState('');

    const handleCreateGroup = async () => {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: groupName })
        }
        try {
            await fetch("http://localhost:8000/group/create", option)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    toast.success("Group Created");
                    setGroupName(' ');
                    setIsModalOpen(false);
                })
        } catch (error) {
            toast.error("Error in creating group")
            console.log(error)
        }
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

            <ToastContainer position='bottom-left' />
        </div>
    )
};

export default Dashboard;
