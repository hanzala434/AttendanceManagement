import React from 'react'
import Layout from '../components/layout/Layout'
import AdminAttendanceTable from '../components/AdminAttendanceTable'
import AdminLeaveTable from '../components/AdminLeaveTable'

const AdminDashboard = () => {
  return (
    <>
    <Layout>
      <AdminAttendanceTable/>
      <AdminLeaveTable/>
    </Layout>
    </>
  )
}

export default AdminDashboard
