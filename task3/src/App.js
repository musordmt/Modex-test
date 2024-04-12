import React from "react";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import UserList from "./components/UserList";

import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <Navbar.Brand>
                <Link to={"/create_user"} className='nav-link'>
                  Modex : Vlad
                </Link>
              </Navbar.Brand>

              <Nav className='justify-content-end'>
                <Nav>
                  <Link to={"/create_user"} className='nav-link'>
                    Create User
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/user_list"} className='nav-link'>
                    User List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className='wrapper'>
                <Routes>
                  <Route exact path='/' element={<CreateUser />} />
                  <Route path='/create_user' element={<CreateUser />} />
                  <Route path='/edit_user/:userId' element={<EditUser />} />
                  <Route path='/user_list' element={<UserList />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
