import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './style.css';

export default function BasicListItem(props) {
  
  const Icon = props.icon;

  return (
          <ListItem disablePadding>
            <ListItemButton onClick={props.onClick}>
              <ListItemText primary={props.name} />
              {Icon && <Icon className="estyleIconEdit"/>}
            </ListItemButton>
          </ListItem>
  );
}