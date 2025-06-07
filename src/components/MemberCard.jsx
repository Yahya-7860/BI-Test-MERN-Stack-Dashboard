import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";


const MemberCard = ({ memberName, owe, lent, totalMember, group_id, member_id }) => {

    //ab yaha par wo fetch logic likhna hai jisse amount server par jayega 
    // or uske sath hi sari values jese groupid, memberid, ye sab jayegi
    const [amount, setAmount] = useState(null);



    const handleAmount = async () => {
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
                    console.log(data)
                    setAmount(null)
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full flex items-center justify-between bg-blue-100 shadow rounded px-4 py-3 mt-2 ">
            <div className="w-1/6 font-medium overflow-hidden text-gray-800">
                {memberName}
            </div>

            {/* Amount Input */}
            <div className="w-1/4 flex justify-center items-center gap-2 ">
                <input
                    type="number"
                    placeholder="You paid..."
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <FaCheckCircle className='text-2xl hover:text-green-800 active:text-green-600 cursor-pointer' onClick={handleAmount} />

            </div>

            {/* You Owe */}
            <div className="w-1/6 text-center">
                <p className="text-xs text-gray-500">You Owe</p>
                <p className="text-sm text-gray-800 font-semibold">₹{owe ? owe : 0}</p>
            </div>

            {/* You Lent */}
            <div className="w-1/6 text-center">
                <p className="text-xs text-gray-500">You Lent</p>
                <p className="text-sm text-gray-800 font-semibold">₹{lent ? lent : 0}</p>
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
