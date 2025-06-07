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
    const [members, setMembers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [clickSettle, setClickSettle] = useState(null);
    const [checkAmountClick, setCheckAmountClick] = useState(false);


    useEffect(() => {
        setLoading(true);
        const fetchMembers = async () => {
            try {
                if (clickSettle) {
                    const options = {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ member_id: clickSettle })//passing memberId
                    }
                    const response = await fetch("http://localhost:8000/amount/settle", options)
                    if (response.status === 200) {
                        setClickSettle(null);
                    }
                }
                await fetch(`http://localhost:8000/group/members/${group_id}`, {
                    method: "GET",
                }).then((res) => res.json())
                    .then((data) => {
                        setLoading(false);
                        setMembers(data.members);
                        // console.log(data.members)
                    })
            } catch (error) {
                setLoading(false);
                console.log(error)
            }
        }
        fetchMembers();
    }, [group_id, refresh, clickSettle, checkAmountClick]);

    useEffect(() => {
        setLoading(true);
        const fetchGroup = async () => {
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
        fetchGroup();
    }, [group_id]);
    return (
        <div className="fixed inset-0 overflow-hidden bg-gray-300 bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-3/5 h-3/4 overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-black">{groupName}</h3>
                    <button className="text-black text-4xl font-semibold cursor-pointer hover:text-red-500" onClick={() => navigate('/dashboard')}>&times;</button>
                </div>
                {loading && <h3 className='w-full flex justify-center items-center'>Loding...</h3>}
                <button className=" bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 cursor-pointer active:bg-blue-900 text-xs font-medium" onClick={() => setAddMemModalOpen(true)}>
                    Add Member
                </button>
                {
                    members.length > 0 ? members.map((item, index) => {
                        return (<MemberCard key={index} totalMember={members.length} memberName={item.memberName} group_id={group_id} member_id={item._id} owe={item.owe} lent={item.lent} setClickSettle={setClickSettle} setCheckAmountClick={setCheckAmountClick} />)
                    }) : <p className='h-full w-full flex items-center justify-center'>No Members yet</p>
                }

            </div>
            {addMemModalOpen && <AddMemberModal setAddMemModalOpen={setAddMemModalOpen} group_id={group_id} groupName={groupName} setRefresh={setRefresh} />}
        </div>
    );
};

export default GroupInside;
