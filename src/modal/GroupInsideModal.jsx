import React from 'react';

const GroupDetailsModal = () => {

    //we will fetch the members based on the group id
    //then will store in a state, and can easily loop thourgh


    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Group Name</h3>
                    <button className="text-red-500 text-lg font-semibold">X</button>
                </div>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Member
                </button>
            </div>
        </div>
    );
};

export default GroupDetailsModal;
