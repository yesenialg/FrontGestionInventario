import React, {useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import "./DialogGeneric.css"
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { putProduct, postProduct } from '../../Services/Axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const DialogGeneric = (props) => {
  const { open, onClose, title, productToEdit, setProductToEdit, reloadList } = props;

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [stockError, setStockError] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const successSnackbar = () => {
    setSnackbarSeverity('success');
    setSnackbarMessage('¡Producto guardado exitosamente!');
    setOpenSnackbar(true);
  }
  
  const errorSnackbar = () => {
    setSnackbarSeverity('error');
    setSnackbarMessage('Hubo un error al guardar el producto. Por favor, inténtalo de nuevo.');
    setOpenSnackbar(true);
  }

  useEffect(() => {
    console.log(productToEdit)
    if (productToEdit) {
      setId(productToEdit.id || '');
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
    }
  }, [productToEdit]);

  const handleOnClose = () => {
    setNameError('');
    setDescriptionError('');
    setPriceError('');
    setStockError('');
    setId('');
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setProductToEdit(null);
    onClose();
  };

  const saveProduct = async () => {
    const newProduct = {
      name: name,
      description: description,
      price: price,
      stock: stock
    };
    if(id !== ''){
      newProduct.id = id;
      try {
        await putProduct(newProduct);
        successSnackbar();
      } catch (error) {
        errorSnackbar();
        console.log("Error al editar el producto ", error);
      }
    }else{
      try {
        await postProduct(newProduct);
        successSnackbar();
      } catch (error) {
        errorSnackbar();
        console.log("Error al crear el producto", error);
      }
    }
    setProductToEdit(null);
    reloadList();
    handleOnClose();
  };

  const handleChangeName = (e) => {
    const newName = e.target.value;
    setName(newName);

    if (!newName.trim()) {
      setNameError('El nombre no puede estar vacío');
    } else if (newName.length > 50) {
      setNameError('El nombre no puede exceder los 50 caracteres');
    } else {
      setNameError('');
    }
  };
  
  const handleChangeDescription = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    if (!newDescription.trim()) {
      setDescriptionError('La descripción no puede estar vacía');
    } else if (newDescription.length > 200) {
      setDescriptionError('La descripción no puede exceder los 200 caracteres');
    } else {
      setDescriptionError('');
    }
  };

  const handleChangePrice = (e) => {
    const numeric = e.target.value;
    const newPrice = numeric.replace(/\D/g, '');
    setPrice(newPrice);

    const integerPattern = /^\d*$/;

    if (!newPrice.trim()) {
      setPriceError('El precio no puede estar vacío');
    } else if (!integerPattern.test(newPrice)) {
      setPriceError('El precio debe ser un número entero');
    } else {
      setPriceError('');
    }
  };

  const handleChangeStock = (e) => {
    const numeric = e.target.value;
    const newStock = numeric.replace(/\D/g, '');
    setStock(newStock);

    const integerPattern = /^\d*$/;

    if (!newStock.trim()) {
      setStockError('La cantidad en stock no puede estar vacía');
    } else if (!integerPattern.test(newStock)) { 
      setStockError('La cantidad en stock debe ser un número entero');
    } else {
      setStockError('');
    }
  };

  return (
    <div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <Dialog open={open} maxWidth="sm" fullWidth onClose={handleOnClose}>
        <DialogTitle className='estiloDialogTitle'>{title}</DialogTitle>
        <DialogContent className="estiloDialogContent">
          <p className='estiloDialogContentText'>Ingrese la información del producto</p> 
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                value={name}
                onChange={handleChangeName}
                error={Boolean(nameError)}
                helperText={nameError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                value={description}
                onChange={handleChangeDescription}
                error={Boolean(descriptionError)}
                helperText={descriptionError}

              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Precio"
                variant="outlined"
                fullWidth
                value={price}
                onChange={handleChangePrice}
                error={Boolean(priceError)}
                helperText={priceError}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Cantidad en stock"
                variant="outlined"
                fullWidth
                value={stock}
                onChange={handleChangeStock}
                error={Boolean(stockError)}
                helperText={stockError}
              />
            </Grid>
          </Grid>
          <PrimaryButton onClick={saveProduct} icon={AddTaskIcon} text="Guardar"/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogGeneric;
