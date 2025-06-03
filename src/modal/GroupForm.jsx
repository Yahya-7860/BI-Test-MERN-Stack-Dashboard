import React from 'react';

const GroupFormModal = ({ groupName, setGroupName, onClose, onCreate }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-10">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-xl font-semibold mb-4">Create Group</h2>

                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />

                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onCreate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupFormModal;
