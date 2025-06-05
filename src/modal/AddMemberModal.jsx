import { useState } from 'react';

function AddMemberModal({ setAddMemModalOpen, group_id, groupName }) {
    const [formData, setFormData] = useState({
        memberName: '',
        email: ''
    });

    const AuthUserEmail = localStorage.getItem('authUserEmail');
    const AuthUserName = localStorage.getItem('authUserName');

    const handleAddMember = async (e) => {
        e.preventDefault();
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData, AuthUserEmail, AuthUserName, groupName })
        }
        try {
            await fetch(`http://localhost:8000/group/member/${group_id}`, option)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setFormData({
                        memberName: '',
                        email: ''
                    })
                    setAddMemModalOpen(false);
                })
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <button
                    onClick={() => setAddMemModalOpen(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-3xl font-bold"
                >
                    &times;
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center">Add New Member</h2>

                <form onSubmit={handleAddMember} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={formData.memberName}
                            onChange={(e) => setFormData((pre) => ({ ...pre, memberName: e.target.value }))}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData((pre) => ({ ...pre, email: e.target.value }))}
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Member
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddMemberModal;
