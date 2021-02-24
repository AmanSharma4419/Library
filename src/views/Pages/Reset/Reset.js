import React, { Component } from 'react';
import { Link  , Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup,Modal, ModalBody, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import llogo from '../../../assets/img/brand/university-logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import config from '../../../config.json';
import 'react-toastify/dist/ReactToastify.css';
import Closebtn from '../../../assets/img/close-btn.svg';
import Register from '../Register/Register';
var baseurl = `${config.baseurl}`;

class Reset extends Component {

  constructor(props) {
    super(props);

	this.onSubmit = this.onSubmit.bind(this);
    this.state = {
	  password :'',
	  cpassword : '',
	  registersuccess: false,
	  errors:{},
	  token:''
    };
	this.toggleSuccess = this.toggleSuccess.bind(this);
  }
  
componentDidMount(){

    const query = new URLSearchParams(this.props.location.search);
	const token = query.get('token');
	this.setState({token: token});

}	

 toggleSuccess() {
    this.setState({
      registersuccess: !this.state.registersuccess,
	  
    });
  }
  

handlePasswordChange = event => {
	this.setState({password: event.target.value});
}

handleCpasswordChange = event => {
	this.setState({cpassword: event.target.value});
}

closeall(){	
    window.location.reload();
  }
  
validate = () => {
     const errors = {};
		if(this.state.password.trim() === '')
		{
			errors.password = 'Password is required';
		}else{
			var pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
			const password = this.state.password;
			if(!password.match(pwd)) {
			errors.password = 'Minimum 8 characters with combination of uppercase,lowercase,number,special character required';
		}
		}

		if(this.state.cpassword.trim() === '')
		{
		errors.cpassword = 'Confirm password is required';
		}
		if((this.state.password.trim() !== '') && (this.state.cpassword.trim() !== '')){ 
		if(this.state.password.trim() !==  this.state.cpassword.trim())
		{
		errors.cpassword = 'Password does not match';
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
           
			  password : this.state.password,
              token : this.state.token,
			  type : 'student'
        
		}
		
            // console.log(products);
		      const post = axios.post(baseurl+'/resetpassword', data).then((response) => {

//console.log(response);
				  if(response.data == '1'){
                   // this.props.history.push('/clients/view');
                  this.setState({ registersuccess: true });
					 }else{
						 
					toast.error('Already reseted');	 
					 }
            });



		
	this.setState({ password: '' });
	this.setState({ cpassword: '' });
	this.setState({ errors: '' }); 
	
	
	}
	
	render() {
	const { errors } = this.state;
    return (
      <div className="app login-bg" >
	  <Register  /> 
	               <Modal isOpen={this.state.registersuccess} toggle={this.toggleSuccess}
                       className={'modal-md ' + 'register-popup' + ' ' + this.props.className}>
                  <ModalBody className="success-msg text-center p-5">
				  <div className="modal_header mb-4">
						  <span>&nbsp;&nbsp;&nbsp;<img src={Closebtn} alt="close-icon" onClick={this.closeall}  className="uni-icon" /></span>
				  </div>
				 <div className="p-5"><h5 className="modal-heading">Password Changed!</h5>
				  <div className="mb-5">Your password has been changed successfully.</div>
				  <div></div>
				  
                       
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
          
              <CardGroup className="custom_group">
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h2>Reset Password</h2>
                   
					     <InputGroup className="mb-3">
                      <label className="foe-login-label">New Password</label>
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon> */}
						
                         <Input type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                      </InputGroup>
					  <h6 style={{color: 'red'}}>{errors.password}</h6>
                      <InputGroup className="mb-4">
                      <label className="foe-login-label">Re-enter New Password</label>
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input type="password" name="cpassword" value={this.state.cpassword} onChange={this.handleCpasswordChange}/>
                      </InputGroup>
					  <h6 style={{color: 'red'}}>{errors.cpassword}</h6>
					   <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                         
                        </InputGroupAddon>
                      </InputGroup>
					  
                      <Row className="uni-no-mar">
                        <Col xs="6" className="login-button">
                          <Link to="/login"><Button color="primary" className="px-4">Cancel</Button></Link>
                        </Col>
										
                    
                        <Col xs="6" className="login-button save-btn">
                           <Button color="primary"  type="submit" onClick={this.onSubmit.bind(this)} className="px-4">Save</Button>
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

export default Reset;
