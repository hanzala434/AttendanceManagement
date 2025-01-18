import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/auth/authSlice';  // Assuming you have authSlice
import avatar from '../assets/avatar.png';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  if (isLoading) {
    return <div className="text-center text-xl text-gray-600">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">Error fetching profile data: {error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">User Profile</h2>

      {profile ? (
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex justify-center items-center">
            <img
              src={profile.image || avatar}
              alt="User Profile"
              className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-md"
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.role}</p>
            <div className="mt-4 space-y-2 text-gray-700">
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate('/edit-profile')}
                type="button"
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-lg shadow-md hover:bg-blue-700 focus:outline-none"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-600">User not found</div>
      )}
    </div>
  );
};

export default Profile;
