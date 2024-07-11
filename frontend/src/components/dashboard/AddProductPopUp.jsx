import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem // Import MenuItem component from Material-UI
} from "@mui/material";
import { createProduct } from "../../features/adminProducts";

const AddProductPopUp = ({
  setOpenAddPopup,
  openAddPopup,
  handleCloseAddPopup,
}) => {
  const dispatch = useDispatch();

  const [addFormData, setAddFormData] = useState({
    name: "",
    stock: 0,
    price: 0,
    category:"",
    description: "",
  });

 handleCloseAddPopup =()=>{
    setOpenAddPopup(false)
 }
  
const [category,setCategory] = useState("")
  const handleCategory =(e)=>{
    setCategory(e.target.value)
    
   
}

  const handleAddChange = (e) => {
    const { id, value } = e.target;
    setAddFormData({
      ...addFormData,
      [id]:  value ,
    });
  };
  
  

  const handleAddProduct = () => {
    if (
      addFormData.name &&
      addFormData.stock &&
      addFormData.price &&
   
      addFormData.description &&
      category
    ) {
        const formData = new FormData();
              formData.append("name",addFormData.name)
              formData.append("stock",addFormData.stock)
              formData.append("price",addFormData.price)
              formData.append("description",addFormData.description)
              formData.append("category",category);
      dispatch(createProduct(formData));
      setOpenAddPopup(false);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div>
      <Dialog
        open={openAddPopup}
        onClose={handleCloseAddPopup}
        aria-labelledby="add-product-title"
        fullWidth
      >
        <DialogTitle id="add-product-title">Add Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={addFormData.name}
            onChange={handleAddChange}
          />
          <TextField
            margin="dense"
            id="stock"
            label="Stock"
            type="number"
            fullWidth
            value={addFormData.stock}
            onChange={handleAddChange}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={addFormData.price}
            onChange={handleAddChange}
          />
          {/* Category selection dropdown */}
          <TextField
            select
            margin="dense"
            id="category"
            label="Category"
            fullWidth
            value={category}
            onChange={handleCategory}
          >
          
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'mobile'}>Mobile</MenuItem>
          <MenuItem value={'laptop'}>Laptop</MenuItem>
          <MenuItem value={'skincare'}>Skin Care</MenuItem>
        
          </TextField>
          {/* End of category selection dropdown */}
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={addFormData.description}
            onChange={handleAddChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddPopup}>Cancel</Button>
          <Button onClick={handleAddProduct} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProductPopUp;
