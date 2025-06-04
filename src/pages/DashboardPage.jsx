import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify"
import GroupFormModal from '../modal/GroupForm';
import GroupCard from '../components/GroupCard';
import { Outlet } from 'react-router-dom';
const Dashboard = () => {
    const [isGroupFormModalOpen, setIsGroupFormModalOpen] = useState(false);
    const [isGroupCardModalOpen, setIsGroupCardModalOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [allGroups, setAllGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                await fetch('http://localhost:8000/groups', {
                    method: "GET",
                }).then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        setAllGroups(data.groups);
                    })
            } catch (error) {
                console.log(error)
            }
        }
        fetchGroups();
    }, [groupName]);



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
                    setIsGroupFormModalOpen(false);
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
                onClick={() => setIsGroupFormModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Create Group
            </button>

            {isGroupFormModalOpen && (
                <GroupFormModal
                    groupName={groupName}
                    setGroupName={setGroupName}
                    onClose={() => setIsGroupFormModalOpen(false)}
                    onCreate={handleCreateGroup}
                />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                {
                    allGroups.length > 0 ? (
                        allGroups.map((item, index) => {
                            return (
                                <GroupCard key={index} setIsGroupCardModalOpen={setIsGroupCardModalOpen} groupName={item.name} group_id={item._id} />
                            )
                        })
                    ) : <p>No Groups yet</p>
                }
            </div>
            <Outlet />

            <ToastContainer position='bottom-left' />
        </div>
    )
};

export default Dashboard;
