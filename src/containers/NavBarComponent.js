import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as routes from '../constants/routes';



function NavBarComponent() {

  return (
    <Navbar bg="primary" data-bs-theme="dark" className='mb-3'>
      <Container>
        <Navbar.Brand href="#home">Tickets Organics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to={routes.USUARIOS}>Usuarios</Nav.Link>
            <Nav.Link to={routes.OPERACOES}>Operacoes</Nav.Link>
            <NavDropdown title="Tickets" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Todos Tickets</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Tickets Cancelados
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Alterar Tickets</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className='disabled'>
                Historico Tickets
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Visões" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Visão Operacoes</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Visões Tickets
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Visão Carregamentos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;