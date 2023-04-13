import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Upload from './components/Upload';
function App() {

  return (
    <div className="App">
      <Navbar collapseOnSelect expand="md" style={{position:'absolute',padding:'0px',color:'white'}}>
      <Container>
        <Navbar.Brand style={{color:'white'}}>Imgexpmo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
          </Nav>
          <Nav>
            <Nav.Link href="#deets" style={{color:'white'}}>About</Nav.Link>
            <Nav.Link eventKey={2} href="#memes" style={{color:'white'}}>
              Contact Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>
      <header className="App-header">
        <p>
          Upload An Image For Moderation
        </p>
        <Upload />
        
        
      </header>
    </div>
  );
}

export default App;
