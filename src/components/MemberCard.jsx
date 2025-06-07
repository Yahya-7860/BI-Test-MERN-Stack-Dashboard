import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const MemberCard = ({ memberName, owe, lent, totalMember, group_id, member_id, setClickSettle, setCheckAmountClick }) => {

    const [amount, setAmount] = useState('');
    const handleAmount = async () => {
        if (amount) {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ totalMember, amount, group_id, member_id })
            }
            try {
                await fetch("http://localhost:8000/amount/update", options)
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data)
                        // toast.success("Amount Shared");
                        setAmount('')
                        setCheckAmountClick(pre => !pre)
                    })
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="w-full flex items-center justify-between bg-blue-100 shadow rounded px-4 py-3 mt-2 ">
            <div className="w-1/6 font-medium overflow-hidden text-gray-800">
                {memberName}
            </div>

            <form className="w-1/4 flex justify-center items-center gap-2 ">
                <input
                    type="number"
                    placeholder="You paid..."
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <FaCheckCircle className='text-2xl hover:text-green-800 active:text-green-600 cursor-pointer' onClick={handleAmount} />
            </form>

            <div className="w-1/6 text-center">
                <p className="text-xs text-gray-500">Owe</p>
                <p className="text-sm text-gray-800 font-semibold">₹{owe ? owe : 0}</p>
            </div>

            <div className="w-1/6 text-center">
                <p className="text-xs text-gray-500">Lent</p>
                <p className="text-sm text-gray-800 font-semibold">₹{lent ? lent : 0}</p>
            </div>

            <div className="w-1/5 text-right">
                <button className="bg-green-500 hover:bg-green-600 active:bg-green-800 cursor-pointer text-white text-sm px-3 py-1 rounded" onClick={() => setClickSettle(member_id)}>
                    Settled Up
                </button>
            </div>
            {/* <ToastContainer position='bottom-left' /> */}
        </div>
    );
};

export default MemberCard;
