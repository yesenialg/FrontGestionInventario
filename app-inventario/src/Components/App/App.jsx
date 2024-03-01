import React from 'react';
import './App.css';
import Appbar from '../AppBar/Appbar';
import BasicList from '../List/BasicList';

function App() {
  return (
    <div className="App">
        <Appbar />
        <div>
          <BasicList/>
        </div>
    </div>
  );
}

export default App;
