import React, { Component } from 'react';
import { Link  , Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup,Modal, ModalBody, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import Register from '../Register/Register';
import llogo from '../../../assets/img/brand/university-logo.svg';	
import { ToastContainer, toast } from 'react-toastify';
import config from '../../../config.json';
import 'react-toastify/dist/ReactToastify.css';
import Closebtn from '../../../assets/img/close-btn.svg';
var baseurl = `${config.baseurl}`;

class Studentforgot extends Component {

  constructor(props) {
    super(props);

	this.onSubmit = this.onSubmit.bind(this);
    this.state = {
	  email :'',
	  registersuccess: false,
	  errors:{}
    };
	this.toggleSuccess = this.toggleSuccess.bind(this);
  }

 toggleSuccess() {
    this.setState({
      registersuccess: !this.state.registersuccess,
	  
    });
  }
  

handleEmailChange = event => {
	this.setState({email: event.target.value});
}

closeall(){	
    window.location.reload();
  }


validate = () => {
     const errors = {};
	 if(this.state.email.trim() === '')
		{
		errors.email = 'Email is required';
		}else{	
		 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	     const email = this.state.email;
		 if(!email.match(re)) {
		 errors.email = 'Invalid email';
         //return false;
		 }
	 }
	
   	 return Object.keys(errors).length === 0 ? null : errors;
};



 onSubmit = e => {
   e.preventDefault()
   
	const errors = this.validate();
	this.setState({ errors });
	if (errors) return;
   
    const data = {
           
			  email : this.state.email,
              type : "student"
		}
		
            // console.log(products);
		 
		   const post = axios.post(baseurl+'/checkemail', data).then((response) => {
			    if(response.data == 0){
					 toast.error("Email not exists");
					 //alert("Email not exists");
				}else{
					this.setState({ registersuccess: true });
				}
                    
               // this.props.history.push('/clients/view');
               // toast.success("Updated successfully!..");

            });



		
	this.setState({ email: '' });
	this.setState({ errors: '' }); 
	
	
	}
	
	render() {
	const { errors } = this.state;
    return (
     <div className="app login-bg" >
	 <Register/>
	          <Modal isOpen={this.state.registersuccess} toggle={this.toggleSuccess}
                       className={'modal-md ' + 'register-popup' + ' ' + this.props.className}>
                  <ModalBody className="success-msg text-center">
				  <div className="modal_header mb-4">
						  <span>&nbsp;&nbsp;&nbsp;<img src={Closebtn} alt="close-icon" onClick={this.closeall}  className="uni-icon" /></span>
					  </div>
				  <div className="p-5"><h5 className="modal-heading">Reset Password</h5>
				  <div>Please check your email - the password should be there!</div>
				  <div></div>
				  <Link to="/login">
                          <Button color="link" className="px-0 mt-3 mb-5 no-icon">Login</Button>
						   </Link>
                       
				  </div>
				  </ModalBody>
				  </Modal>
				  
          <div className="mx-auto login-bos">
           <Link to="/login"><img src={llogo} alt="formee-logo"  className="login-logo" /></Link>
          </div>
        <div className="foe-login">
 
          <Row className="justify-content-center uni-no-mar">
            <Container>
			 <ToastContainer/>
            <Col md="8" className="foe-login-inner mx-auto">
            <h1>Reset Password</h1>
			 <center><div style={{color:'#fff'}}>Enter your email address and we will send you</div> <div style={{color:'#fff'}}>a password reset email</div></center>
              <CardGroup className="custom_group">
                <Card className="p-4">
                  <CardBody>
                    <Form>
                    
                  
                      <InputGroup className="mb-3">
                      <label className="foe-login-label">email</label>
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon> */}
                         <Input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
                      </InputGroup>
					  <h6 style={{color: 'red'}}>{errors.email}</h6>
                     
                      <Row className="uni-no-mar">
                        <Col xs="12" className="login-button">
                          <Button color="primary"  type="submit" onClick={this.onSubmit.bind(this)} className="px-4">Reset password</Button>
                        </Col>
						 <Col xs="7" className="text-right">
						<Link to="/login">
                          <Button color="link" style={{color:'#fff'}} className="px-0 no-icon">Login</Button>
						   </Link>
                        </Col>  
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
						{<Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
						</Link>}
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
    </Container>
          </Row>
     
        </div>
      </div>
    );
  }
}

export default Studentforgot;
