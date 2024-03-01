import React from 'react';
import './PrimaryButton.css';

const PrimaryButton = (props) => {

  const Icon = props.icon;

  return (
    <button className="estiloBoton" onClick={props.onClick} disabled={props.disabled}>
      {Icon && <Icon className="estiloIcon"/>}
      <br/>
      <span>{props.text}</span>
    </button>
  );
};

export default PrimaryButton;