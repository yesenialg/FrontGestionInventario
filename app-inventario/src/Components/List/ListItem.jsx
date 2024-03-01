import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './style.css';

export default function BasicListItem(props) {
  return (
          <ListItem disablePadding>
            <ListItemButton onClick={props.onClick}>
              <ListItemText primary={props.name} />
            </ListItemButton>
          </ListItem>
  );
}