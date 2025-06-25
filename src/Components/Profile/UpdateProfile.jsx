import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const UpdateProfile = () => {
       const { user, updateUserProfile } = useContext(AuthContext);
       const navigate = useNavigate();
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const handleUpdate = async () => {
        try {
            await updateUserProfile(name, photoURL);
            toast.success('Profile updated successfully!');
            
        } catch (error) {
            toast.error('Failed to update profile. Please try again.');
        }
        navigate('/dashboard');
    }
    return (
        <div className='max-w-3xl mx-auto my-10 p-6 bg-base-200 shadow-xl rounded-xl'>
             <Helmet>
        <title>Upadate Profile || BillEase</title>
      </Helmet>
             <h2 className="text-3xl text-red-400 font-bold mb-4 text-center ">Update Profile</h2>

<div className="mb-4">
    <label className="block text-red-600 mb-1">Updated Name</label>
    <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Enter your name"
    />
</div>

<div className="mb-4">
    <label className="block text-red-600 mb-1">Updated Photo URL</label>
    <input
        type="text"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded"
        placeholder="Paste image URL"
    />
</div>

<button
    onClick={handleUpdate}
    className="cursor-pointer w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
 Update Profile
</button>
        </div>
    );
};

export default UpdateProfile;