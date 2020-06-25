import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import  { Redirect,withRouter } from 'react-router-dom'
import Swal from 'sweetalert2';
import Clock from 'react-clock';
import { Link } from 'react-router-dom';
import LoginService from '../../Service/Login/LoginService';

class MenuComponent extends Component {
  constructor(props){
    super(props)
    this.state={
      date: new Date()
    }
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // setInterval(
    //   () => this.setState({ date: new Date() }),
    //   1000
    // );
  }


  logout(){
  LoginService.logout();
    this.props.history.push('/');
  window.location.reload(false);
  Swal.fire({icon: 'info',title: 'Sesión cerrada',text: `Has cerrado sesión con éxito!`})
  
  }

    render(){
      let username = LoginService.obtenerUsuario();
   //   console.log(username)
   //   console.log(LoginService.isAuthenticated())
   //console.log(username.id)
      if(LoginService.isAuthenticated()){
      return (
        <Card
          bg="secondary" key="secondary"
        >
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href=""> <Image src="circle-logo-parrot.png" style={{ width:50 }}></Image> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {
              LoginService.hasPermiso('EMPRESA_READ') ? <Nav.Link href="/empresa">Empresa</Nav.Link> : ""
            }
            { 
              LoginService.hasPermiso('EMPLEADO_READ') ? <Nav.Link href="/empleado">Empleados</Nav.Link> : ""
            }
            {
              LoginService.hasPermiso('PROFESION_READ') ?<Nav.Link href="/profesion">Profesiones</Nav.Link> : ""
            }
            {
              LoginService.hasPermiso('UNIDAD_ORGANIZACIONAL_READ') ? <Nav.Link href="/departamentos">Departamentos</Nav.Link> : ""
            }
           {
            LoginService.hasPermiso('PUESTO_TRABAJO_READ') ? <Nav.Link href="/puestotrabajo">Puestos de Trabajo</Nav.Link> : ""
           }

            
              <NavDropdown title="Configuraciones" id="basic-nav-dropdown">
              {
                 LoginService.hasPermiso('COSTO_READ') ?  <NavDropdown.Item href="/centro_costo_list/-1">Gestión de costos</NavDropdown.Item> : ""
              }
              {
                LoginService.hasPermiso('TIPO_INGRESO_READ') ? <NavDropdown.Item href="">Gestión tipos ingresos</NavDropdown.Item> : ""
              }
              {
                LoginService.hasPermiso('TIPO_DESCUENTO_READ') ? <NavDropdown.Item href="">Gestión tipos descuentos</NavDropdown.Item> : ""
              }
              {
                 LoginService.hasPermiso('USER_READ') ? <NavDropdown.Item href="/usuarios">Gestión usuario</NavDropdown.Item> : ""
              }
              {
                LoginService.hasPermiso('ROL_READ') ? <NavDropdown.Item href="/roles">Gestión roles</NavDropdown.Item> : ""
              }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
         <Clock
          value={this.state.date}
          />
          <NavDropdown title={`${username.username}`} id="basic-nav-dropdown">
          {
            LoginService.hasPermiso('USER_GENERAL_READ') ? <Link to={`/usuario/general/${username.id}`} className="dropdown-item">Mi perfíl</Link> : ""
          }
           
            <button onClick={()=>this.logout()} className="dropdown-item" type="submit">Sign Out</button>

              </NavDropdown>
        </Navbar>
        </Card>
      );
      } else {
        return <Redirect to='/' />
      }
    }
  }
  export default withRouter(MenuComponent);