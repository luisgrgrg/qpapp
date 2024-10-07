import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import Evaldesem from './Pages/Evaldesem';
import { Navbar,Nav,NavDropdown, Container, Col, Row } from 'react-bootstrap'

function App() {
  return (
    <div className="App">
      <div>
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
          <Container>
          <Navbar.Brand href="/">
          <img
              alt=""
              src="/images-brand/QualityPeople-Icon.png"
              width="50"
              height="50"
              className="d-inline-block"
            /> Quality People - APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto m-3">
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/evaldesem">Eval. Desempeño</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/evaldesem" element={<Evaldesem />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
