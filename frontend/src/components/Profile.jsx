import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/auth/authSlice';  // Assuming you have authSlice
import avatar from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { user, isLoading, error } = useSelector((state) => state.auth);
  
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error fetching profile data: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
      {profile ? (
        <div className="profile-container">
          <div className="flex items-center">
            <img
              src={profile.image || avatar}
              alt="User Profile"
              className="w-32 h-32 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-sm text-gray-500">{profile.role}</p>
            </div>
          </div>
          <div className="mt-6">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>
          <div>
            <button onClick={()=>{navigate('/edit-profile')}} type='button' className='bg-blue-700 p-2 rounded text-slate-50 hover:bg-blue-600'>Edit Profile</button>
          </div>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default ProfilePage;
