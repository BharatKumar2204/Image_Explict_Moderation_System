import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
function Loader() {
  return (
    <Spinner animation='border' role='status' style={{
      height:'60px',
      width:'60px',
      margin:'auto',
      display:'block'
  }}>
  </Spinner>
  )
}

export default Loader