import './App.css';
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import LeaveFormPage from './pages/LeaveFormPage';
import AdminLeaveDetailPage from './pages/AdminLeaveDetailPage';
import ProfilePage from './components/Profile';
import EditProfilePage from './pages/EditProfilePage';


function App() {
  return (
<>
    <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/register-user" element={<RegisterPage/>} />
    <Route path="/leave-form" element={<LeaveFormPage/>} />
    <Route path="/your-profile" element={<ProfilePage/>} />
    <Route path="/edit-profile" element={<EditProfilePage/>} />





    <Route path="/admin-login" element={<AdminLoginPage/>} />
    <Route path="/admin-dashboard" element={<AdminDashboard/>} />
    <Route path="/leave-detail/:id" element={<AdminLeaveDetailPage/>} />




          
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
</>
  );
}

export default App;
