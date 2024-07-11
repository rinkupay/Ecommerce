import React, { Fragment, useState } from "react";
import DashboardSideNav from "./DashboardSideNav";
import "./Dashboard.css";
import "./AdminUsers.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const AdminUsers = () => {
  const { users } = useSelector((state) => state.user);
  const user = users?.users;

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 250, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.2,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 250,
      flex: 0.5,
    },

    {
      field: "action",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/users`} className="action-link-edit">
            <EditIcon />
          </Link>
          <Button>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = [];
  user &&
    user.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        createdAt: item.createdAt.toString().slice(0, 10),
        name: item.name,
      });
    });

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const handleSelectionModelChange = (newSelection) => {
    setSelectedProductIds(newSelection);
    console.log(newSelection);
  };

  return (
    <div>
      <div className="dashboard-container-wrapper">
        <div className="dashboard-container">
          <div className="dashboard-left-container">
            <DashboardSideNav />
          </div>
          <div className="dashboard-Right-container">
            <div className="users-container">
              <div className="users-feeds">
                <div className="users-heading">
                  <h4 className="users-admin-heading">Users</h4>
                </div>

                <div>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[100, 50, 25, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={handleSelectionModelChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
