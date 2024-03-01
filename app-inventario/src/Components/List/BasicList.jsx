import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import BasicListItem from './ListItem';
import './style.css';
import { getAllProducts } from '../../Services/Axios'
import DialogGeneric from '../DialogGeneric/DialogGeneric';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SnackbarMessage from '../Snackbar/SnackbarMessage';

export default function BasicList() {

  const [products, setProducts] = useState([]);
  const [dialogOpen, setdialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  const handleSnackbarClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

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
      const { error, data } = await getAllProducts();
        if (error) {
            setProducts([]);
            setSnackbarSeverity('error');
            setSnackbarMessage('Hubo un error al consultar los productos. Por favor, inténtalo de nuevo.');
            setOpenSnackbar(true);
            console.log("Error al obtener los productos:", error);
        } else {
            setProducts(data);
        }
    } catch (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Hubo un error al consultar los productos. Por favor, inténtalo de nuevo.');
      setOpenSnackbar(true);
      console.log("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <SnackbarMessage
        openSnackbar={openSnackbar}
        handleSnackbarClose={handleSnackbarClose} 
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}/>
      <PrimaryButton icon={AddCircleIcon} text="Crear nuevo producto" onClick={handleDialogClickCreate}/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '80%', bgcolor: 'background.paper'}}>
          <nav aria-label="secondary mailbox folders">
            <List>
            {( !products || products.length === 0 ) ? (
              <p>No hay productos disponibles</p>
            ) : (
              products.map((product, index) => (
                  <BasicListItem 
                    onClick={() => handleDialogClickEdit(product)} 
                    key={index} 
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    stock={product.stock}
                    icon={ModeEditIcon} />
              )))}
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