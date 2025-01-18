import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/auth/authSlice'; // Adjust the import path as needed
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserEditForm = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const {user}=useSelector((state)=>state.auth)
  const id=useSelector((state)=>state.auth.user?._id)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    // image: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  
  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };


  const handleFileUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('myFile', imageFile, imageFile.name);

    try {
      // const response = await axios.post('http://localhost:8080/api/upload', formData);
      const response = await axios.post(`${process.env.REACT_APP_API}/api/upload`, formData);
       const uploadedImagePath = response.data.filePath;
      console.log(uploadedImagePath);
      setFormData((prevState) => ({
        ...prevState,
        image: [...prevState.image, uploadedImagePath],
      }));
      console.log('Uploaded file:', uploadedImagePath);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      // image: imageFile || formData.image.name,
    };

    dispatch(updateUser({updatedData,id}))
      .unwrap()
      .then(() => {
        alert('User updated successfully');
      })
      .catch((error) => {
        alert('Failed to update user: ' + error.message);
      });
      console.log(updatedData)
      navigate('/your-profile')
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="User preview"
              className="mt-2 h-32 w-32 object-cover rounded"
            />
          )}
             <button
              type="button"
              onClick={handleFileUpload}
              className="mt-2 bg-blue-700 text-white px-3 py-1 rounded"
            >
              Upload Image
            </button>
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserEditForm;
