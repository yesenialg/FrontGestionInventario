import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import BasicListItem from './ListItem';
import './style.css';
import { getAllProducts } from '../../Services/Axios'
import DialogGeneric from '../DialogGeneric/DialogGeneric';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function BasicList() {

  const [products, setProducts] = useState([]);
  const [dialogOpen, setdialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  
  const handleDialogClickCreate = () => {
    setdialogOpen(true);
  };

  const handleCloseDialog = () => {
    setdialogOpen(false);
  };

  const handleDialogClickEdit = (product) => {
    setProductToEdit(product);
    setdialogOpen(true);
  };

  const fetchData = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.log("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <PrimaryButton icon={AddCircleIcon} text="Crear nuevo producto" onClick={handleDialogClickCreate}/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '80%', bgcolor: 'background.paper'}}>
          <nav aria-label="secondary mailbox folders">
            <List>
            {products.map((product, index) => (
                <BasicListItem 
                  onClick={() => handleDialogClickEdit(product)} 
                  key={index} 
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  stock={product.stock} />
              ))}
            </List>
          </nav>
        </Box>
        <DialogGeneric 
        productToEdit={productToEdit} 
        setProductToEdit={setProductToEdit} 
          open={dialogOpen} 
          onClose={handleCloseDialog} 
          title="PRODUCTO"
          reloadList={fetchData}
        />
      </div>
    </div>
  );
}