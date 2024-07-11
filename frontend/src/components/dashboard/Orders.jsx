import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import DashboardSideNav from "./DashboardSideNav";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./Dashboard.css";
import "./Orders.css";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import {
  Button,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

const Orders = () => {
  const { orders } = useSelector((state) => state.allOrders);
  const [status, setStatus] = useState();
  const [editFormData, setEditFormData] = useState({
    user: "",
  });

  const [openEditPopup, setOpenEditPopup] = useState(false);

  const handleOpenEditPopUp = (id) => {
    setOpenEditPopup(true);
    const selectedOrder = orders?.orders.find((order) => order._id === id);
    if (selectedOrder) {
      setEditFormData({
        user: selectedOrder.user,
      });
      setStatus(selectedOrder.orderStatus);
      console.log(selectedOrder);
    }
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };

  const handleEditProduct = () => {};
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.id]: e.target.value,
    });
  };

  const handleShipStatus = (e) => {
    setStatus(e.target.value);
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    {
      field: "pId",
      headerName: "ProductId",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "product",
      headerName: "Product Name",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Order Date",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "action",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          <Link
            onClick={() => handleOpenEditPopUp(params.row.id)}
            className="action-link-edit"
          >
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
  orders &&
    orders.orders.forEach((item) => {
      rows.push({
        id: item._id,
        pId: item.orderItems[0]._id,
        product: item.orderItems[0].name,
        date: item.createdAt.toString().slice(0, 10),
        status: item.orderStatus,
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
            <div className="orders-container">
              <div className="orders-feeds">
                <div className="orders-heading">
                  <h4 className="order-admin-heading">Orders</h4>
                </div>

                <div>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    // initialState={{
                    //   pagination: {
                    //     paginationModel: {
                    //       pageSize: 10,
                    //     },
                    //   },
                    // }}
                    pageSizeOptions={[10, 25, 50, 100]}
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
      {/* Edit Popup */}
      <Dialog
        open={openEditPopup}
        onClose={handleCloseEditPopup}
        aria-labelledby="edit-product-title"
        fullWidth
      >
        <DialogTitle id="edit-product-title">Edit Product</DialogTitle>
        <DialogContent>
          {/* Add form fields for editing product */}
          <Typography>Product ID :</Typography>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Customer Name"
            fullWidth
            value={editFormData.user}
            onChange={handleEditChange}
          />

          {/* Category selection dropdown */}
          <TextField
            select
            margin="dense"
            id="status"
            label="Order Status"
            fullWidth
            value={status}
            onChange={handleShipStatus}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Processing"}>Processing</MenuItem>
            <MenuItem value={"Shipped"}>Shipped</MenuItem>
            <MenuItem value={"Delevered"}>Delevered</MenuItem>
          </TextField>
          {/* End of category selection dropdown */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditPopup}>Cancel</Button>
          <Button onClick={handleEditProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
