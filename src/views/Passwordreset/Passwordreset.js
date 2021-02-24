import React, { Component } from 'react';
import { Link  , Redirect , withRouter } from 'react-router-dom';
import {  
   Badge,
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
  NavLink, CardGroup, ListGroup, Modal, ModalBody, ModalFooter,ListGroupItem } from 'reactstrap';
import axios from 'axios';
import config from '../../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var baseurl = `${config.baseurl}`;

class Passwordreset extends Component {

   constructor(props) {
    super(props);
	
    this.state = {
      large: false,
	  current:'',
	  password:'',
	  cpassword:'',
	  errors:{},
	  checkpass:'',
	  
    };
	
	this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
	 
	
	
  }

 
  
  toggleLarge() {
    this.setState({
      large: !this.state.large,
	  
    });
  }
 
validate() {
	 const errors = {};
	 
	
	 

     var pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	 //alert(this.state.checkpass.trim());		
	 if(this.state.current.trim() === ''){
	 errors.current = 'Current Password is required';
	 }else if(this.state.password.trim() === ''){
	 errors.password = 'Password is required';
	 }else if(this.state.cpassword.trim() === ''){
	 errors.cpassword = 'Confirm password is required';
     }else if(this.state.cpassword.trim() !== this.state.password.trim()){
	 errors.cpassword = 'Password does not match';
     }else if(!this.state.password.match(pwd)) {
			errors.password = 'Minimum 8 characters with combination of uppercase,lowercase,number,special character required';
		}else{
		this.onSubmit(); 
	 }  
	 
	 
   	 this.setState({ errors });
	
};
 
 
handleCurrentpasswordChange = event => {
	this.setState({current: event.target.value});
}

handlePasswordChange = event => {
	this.setState({password: event.target.value});
}

handleCpasswordChange = event => {
	this.setState({cpassword: event.target.value});
}


onSubmit() {
  // e.preventDefault()

   
   var password = this.state.password;
   var currentpassword = this.state.current;
   var id = localStorage.getItem('universityid'); 
   //alert(id);
   //var email = this.state.email;
  
   
       axios.post(
				baseurl+'/updatepassword',
					{
					password: password,
					id:id,
					currentpassword:currentpassword
					}
				)

				.then(function(response) {
					//alert(response.data);
						if(response.data === 1){
						toast.success("Password updated successfully"); 
						setTimeout(function(){ 
						localStorage.clear();
	                    sessionStorage.clear();
						window.location = "/#/login";
						}, 
						4000);
						}else{
						toast.error("Current password incorrect");	
						}
				
				
				})
				.catch(function(error) {
				//toast.success("Error occured");
				})

   
  
}
    
  render() {
	//console.log(this.state.checkpass);
	const { errors } = this.state;
    return (
      <div className="animated fadeIn foe-register">
        <Row className="uni-no-mar">
          <Col>
              <CardBody>
                
                <a onClick={this.toggleLarge} className="mr-1 register-btn">Reset password</a>
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
							<Input type="password" name="current" value={this.state.current} placeholder="Enter current password" onChange={this.handleCurrentpasswordChange}/>
							</InputGroup>
							 <h6 style={{color: 'red'}}>{errors.current}</h6>
							
               </div>
			    <div className="col-md-4">
                 
					        <label className="card-label">New Password</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							 <Input type="password" name="password" placeholder="Enter new password" value={this.state.password} onChange={this.handlePasswordChange}/>
							</InputGroup>
							 <h6 style={{color: 'red'}}>{errors.password}</h6>
							
                 </div>
                 <div className="col-md-4">
                   						 
							<label className="card-label">Re-enter New Password</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							 <Input type="password" name="cpassword" placeholder="Enter confirm new password" value={this.state.cpassword} onChange={this.handleCpasswordChange}/>
							</InputGroup>
							 <h6 style={{color: 'red'}}>{errors.cpassword}</h6>
							
                 </div>
              
          </div>
					
							 
						    <ModalFooter>

							<Button color="primary" onClick={this.validate}>SAVE</Button>
							</ModalFooter>
					
					 </Form>
                  </ModalBody>
                </Modal>

              </CardBody>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Passwordreset;
