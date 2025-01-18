import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API}/api/grade`;

// Update or Create Grade Record
const updateGrade = async ({userId},token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log({userId})
  const res = await axios.post(`${API_URL}/update`, {userId},config);
  return res.data;
};

// Get Grade by User ID
const getGradeByUser = async (userId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}/${userId}`,config);
  return res.data;
};

// Get All Grades (Admin Only)
const getAllGrades = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(API_URL,config);
  return res.data;
};

const gradeService = {
  updateGrade,
  getGradeByUser,
  getAllGrades,
};

export default gradeService;
