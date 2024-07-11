import React, { Fragment,useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, deleteProduct, clearMessage,updateProduct,clearError} from "../../features/adminProducts";
import DashboardSideNav from "./DashboardSideNav";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AdminProducts.css";
import "./Dashboard.css";
import AddProductPopUp from "./AddProductPopUp";

const AdminProducts = () => {

  const dispatch = useDispatch();
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    stock: 0,
    price: 0,
    category:"",
    description:"",
  });


  
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const { products, message ,error} = useSelector((state) => state.adminProducts);
  const product = products?.products;

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 240, flex: 1 },
    { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
    { field: "category", headerName: "Category", minWidth: 160, flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", minWidth: 100, flex: 1 },
    { field: "price", headerName: "Price", type: "number", minWidth: 150, flex: 1 },
    {
      field: "action",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Fragment>
          
            <EditIcon onClick={() => handleOpenEditPopup(params.row.id)} />

          <Button onClick={() => handleDeleteProduct(params.row.id)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      )
    }
  ];

  const rows = product ? product.map(item => ({
    id: item._id,
    stock: item.stock,
    price: item.price,
    name: item.name,
    category: item.category,
  })) : [];

  const handleDeleteProduct = (id) => {
    setDeleteProductId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteProduct = () => {
    dispatch(deleteProduct(deleteProductId));
    setOpenDeleteDialog(false);
  };

  const cancelDeleteProduct = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenEditPopup = (id) => {
    setEditProductId(id);
    
    setOpenEditPopup(true);
    // Fetch product details using the id and set them to editFormData
    const selectedProduct = product.find(product => product._id === id);
    if (selectedProduct) { 
      setEditFormData({
        name: selectedProduct.name,
        stock: selectedProduct.stock,
        price: selectedProduct.price
      });
    }
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
    setEditProductId(null);
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.id]: e.target.value
    });
  };


  // <<<<<<<<<======================== ADMIN ADD PRODUCT =========================>>>>>>>>>>>>>>>>>>>>>>>
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const handleOpenAddPopup = () => {
    setOpenAddPopup(true);
  };
  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
  };
  


  const handleEditProduct = () => {
  
    // Dispatch action to update the product with editFormData
    // You need to implement this part based on your Redux setup

    const formData = new FormData();
          formData.append("name" , editFormData.name);
          formData.append("price" , editFormData.price);
          formData.append("stock" , editFormData.stock);
          
    dispatch(updateProduct({editProductId,formData}));

    setOpenEditPopup(false);
    setEditProductId(null);
  };

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [product?.length]);

  useEffect(() => {
     if (message) {
      toast.success(message);
      dispatch(clearMessage());
     }
     if(error){
      toast.error(error);
      dispatch(clearError());
     }
  }, [message,error]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectedProductIds(newSelection);
    console.log(newSelection);
  };


  return (
    <div>
      <ToastContainer />
      <div className="dashboard-container-wrapper">
        <div className="dashboard-container">
          <div className="dashboard-left-container">
            <DashboardSideNav />
          </div>
          <div className="admin-Right-container">
            <div className="admin-right-contents">
              <div className="admin-products-heading">
                <h3 className="admin-products-sub-heading">All Products</h3>
                <div className="create-product-container">
                  <div className="create-btn" onClick={handleOpenAddPopup }>
                    <AddIcon /><p>Add Product</p>
                  </div>

                  {/* ADD PRODUCT POPUP */}
                  <AddProductPopUp openAddPopup={openAddPopup} setOpenAddPopup={setOpenAddPopup} />
                </div>
               
                {/* DATA GRID */}
               <DataGrid
                  rows={rows}
                  columns={columns}
                   pageSizeOptions={[10,25,50,100]}
                   checkboxSelection
                   disableRowSelectionOnClick
                   onRowSelectionModelChange={handleSelectionModelChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={cancelDeleteProduct}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this product?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteProduct}>Cancel</Button>
          <Button onClick={confirmDeleteProduct} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

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
          <Typography>
            Product ID : {editProductId}
          </Typography>


          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={editFormData.name}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="stock"
            label="Stock"
            type="number"
            fullWidth
            value={editFormData.stock}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={editFormData.price}
            onChange={handleEditChange}
          />
         
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={editFormData.description}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditPopup}>Cancel</Button>
          <Button onClick={handleEditProduct} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
