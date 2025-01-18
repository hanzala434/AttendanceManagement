import React from 'react'
import Layout from '../components/layout/Layout'
import Dashboard from '../components/Dashboard'
import UserAttendanceTable from '../components/UserAttendanceTable'
import UserLeaveTable from '../components/UserLeaveTable'

const HomePage = () => {
  return (
    <>
    <Layout  title="Dashboard - AMS">
        <Dashboard/>
        <UserAttendanceTable/>
        <UserLeaveTable/>
    </Layout>
    </>
  )
}

export default HomePage
