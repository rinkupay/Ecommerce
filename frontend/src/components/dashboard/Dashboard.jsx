import React, { useEffect } from "react";
import "./Dashboard.css";
import DashboardSideNav from "./DashboardSideNav";
import {Link} from 'react-router-dom'
import {Doughnut ,Line} from  'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"
import { useSelector ,useDispatch } from "react-redux";
import { adminGetUsers } from "../../features/adminSlice";
import { allOrders } from "../../features/adminOrders";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products ,productCount} = useSelector((state)=>state.products)
  const {users} = useSelector((state)=>state.user)

  const {orders} = useSelector((state)=>state.allOrders)

  const lineState = {
    labels: ["Initial Amount" , "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor:["tomato"],
        hoverBackgroundColor:["rgb(197,72,49)"],
        data:[0,4000],
      },
    ],
  }

  const doughnutState = {
    labels : ["Out of Stock" , "InStock"],
    datasets:[
      {
        backgroundColor:["#00A6B4" , "#6800B4"],
        hoverBackgroundColor: ["#4B5000","#35014F"],
        data:[2,10],
      }
    ]
  }

  useEffect(()=>{
   dispatch(adminGetUsers());
   dispatch(allOrders());
  },[])
  return (
    <div>
      <div className="dashboard-container-wrapper">
        <div className="dashboard-container">
          <div className="dashboard-left-container">
            <DashboardSideNav />
          </div>
          <div className="dashboard-Right-container">
            <div className="dashboard-right-container-1">
              <h3 className="dashboard-heading">DASHBOARD</h3>
              <div className="total-order-price-overview">
                <h4>Total Price</h4>
                <p>₹2000</p>
              </div>
              <div className="total-order-price-overview-2">
                <Link to={"/admin/products"}>
                  <p>Product </p>
                  <p>{productCount}</p>
                </Link>
                <Link to={"/admin/orders"}>
                  <p>Orders </p>
                  <p>{orders?.orderCount}</p>
                </Link>
                <Link to={"/admin/users"}>
                  <p>Users </p>
                  <p>{users && users.userCount}</p>
                </Link>
                
              </div>

              <div className="line-chart">
                <Line data={lineState}/>
              </div>

              <div className="donought-chart">
                <Doughnut  data={doughnutState}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
