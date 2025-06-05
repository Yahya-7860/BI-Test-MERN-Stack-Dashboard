import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddMemberModal from '../modal/AddMemberModal';
import MemberCard from '../components/MemberCard';

const GroupInside = () => {

    const { group_id } = useParams();
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState('');
    const [loading, setLoading] = useState(false);
    const [addMemModalOpen, setAddMemModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchGroups = async () => {
            try {
                await fetch(`http://localhost:8000/group/${group_id}`, {
                    method: "GET",
                }).then((res) => res.json())
                    .then((data) => {
                        setLoading(false);
                        setGroupName(data.group.name)
                    })
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
        }
        fetchGroups();
    }, [group_id]);
    return (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-3/5 h-3/4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-black">{groupName}</h3>
                    <button className="text-black text-4xl font-semibold cursor-pointer hover:text-red-500" onClick={() => navigate('/dashboard')}>&times;</button>
                </div>
                {loading && <h3>Loding...</h3>}
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer active:bg-blue-900" onClick={() => setAddMemModalOpen(true)}>
                    Add Member
                </button>
                <MemberCard />
            </div>
            {addMemModalOpen && <AddMemberModal setAddMemModalOpen={setAddMemModalOpen} group_id={group_id} groupName={groupName} />}
        </div>
    );
};

export default GroupInside;
