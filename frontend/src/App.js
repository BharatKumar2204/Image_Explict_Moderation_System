import React from 'react';
import './App.css';

import Upload from './components/Upload';
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Upload An Image For Processing
        </p>
        <Upload />
        
        
      </header>
    </div>
  );
}

export default App;
