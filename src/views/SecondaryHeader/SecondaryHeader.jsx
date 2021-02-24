import "./SecondaryHeader.css";
import React from "react";
import {  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,Modal, ModalBody, ModalFooter } from 'reactstrap';
import { AppSidebarToggler, AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/university-sub-logo.svg';
import Usericon from '../../assets/img/user-icon.svg';
import Userprofileicon from '../../assets/img/user-profile-icon.svg';
import Settingsicon from '../../assets/img/settings-icon.svg';
import Calendaricon from '../../assets/img/calendar-icon.svg';
import Squareicon from '../../assets/img/square-icon.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
import Passreset from '../Passwordreset/Passwordreset';


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
            <NavLink to="#" className="nav-link uni-account" >Account</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
        <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><img src={Usericon} alt="home-icon"  className="uni-icon" /></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><img src={Userprofileicon} alt="home-icon"  className="uni-icon" /></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><img src={Calendaricon} alt="home-icon"  className="uni-icon" /></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><img src={Squareicon} alt="home-icon"  className="uni-icon" /></NavLink>
          </NavItem>
        <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><img src={Settingsicon} alt="home-icon"  className="uni-icon" /></NavLink>
          </NavItem>
		 <NavItem className="d-md-down-none">
          <a className="ml-1" style={{cursor:'pointer'}}><Passreset/> </a>
         </NavItem>
		
        </Nav>
    </Container>
	
	 <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                       className={'modal-lg ' + this.props.className}>
                  <ModalBody>
				    <Form>
					<div className="row">
               <div className="col-md-4">
               <label className="card-label">Current password</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							
							</InputGroup>
							
               </div>
			    <div className="col-md-4">
                 
					        <label className="card-label">New Password</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							
							</InputGroup>
							
                 </div>
                 <div className="col-md-4">
                   						 
							<label className="card-label">Re-enter New Password</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							
							</InputGroup>
							
                 </div>
              
          </div>
					
							 
						    <ModalFooter>

							<Button color="primary" onClick={this.validate}>SAVE</Button>
							</ModalFooter>
					
					 </Form>
                  </ModalBody>
                </Modal>
</React.Fragment>
  );
};

export default template;
