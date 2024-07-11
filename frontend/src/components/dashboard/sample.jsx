import React from 'react'
import DashboardSideNav from './DashboardSideNav'
import './Dashboard.css'
const Orders = () => {
  return (
    <div>
      <div className="dashboard-container-wrapper">
        <div className="dashboard-container">
            <div className="dashboard-left-container">
                <DashboardSideNav/>
            </div>
            <div className="dashboard-Right-container">
            <h3>orders</h3>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Orders
