import "./SecondaryHeaderProgram.css";
import React from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, Badge, Button } from 'reactstrap';
import { AppSidebarToggler, AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/university-sub-logo.svg';
import Usericon from '../../assets/img/user-icon.svg';
import Userprofileicon from '../../assets/img/user-profile-icon.svg';
import Settingsicon from '../../assets/img/settings-icon.svg';
import Calendaricon from '../../assets/img/calendar-icon.svg';
import Squareicon from '../../assets/img/university/degree-icon.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';

function template() {

	return (
    <React.Fragment>
    <Container>
    <AppSidebarToggler className="d-lg-none" display="md" mobile />
    <AppNavbarBrand
          full={{ src: logo, width: "100%", height: "auto", alt: 'University Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'University Logo' }}
        />
        <Nav className="d-md-down-none" navbar>
        <NavItem className="px-4">
            <NavLink to="#" className="nav-link uni-account" >Programs</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
     
          <NavItem className="d-md-down-none">
            <NavLink to="#" href="#/landingpages" className="nav-link"><Button color="primary" className="preview-btn">Preview Mode</Button></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#"  href="#/program" className="nav-link"><Button color="primary" className="edit-btn">Edit Mode</Button></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none active">
            <NavLink to="#" className="nav-link"><img src={Squareicon} alt="home-icon"  className="uni-icon" /></NavLink>
          </NavItem>
        <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><img src={Settingsicon} alt="home-icon"  className="uni-icon" /></NavLink>
          </NavItem>
        </Nav>
    </Container>
</React.Fragment>
  );
};

export default template;
