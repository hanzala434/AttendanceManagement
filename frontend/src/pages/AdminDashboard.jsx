import React from 'react'
import AdminLayout from '../components/layout/AdminLayout'
import AdminAttendanceTable from '../components/AdminAttendanceTable'
import AdminLeaveTable from '../components/AdminLeaveTable'

const AdminDashboard = () => {
  return (
    <>
    <AdminLayout>
      <AdminAttendanceTable/>
      <AdminLeaveTable/>
    </AdminLayout>
    </>
  )
}

export default AdminDashboard
