import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Modal,Form, Input, InputGroup, ModalBody,InputGroupAddon, ModalFooter, ModalHeader, Row, InputGroupText } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
class Modals extends Component {

  constructor(props) {
    super(props);
	
    this.state = {
      large: false,
	  institute:'',
	  country:'',
	  firstname:'',
	  position:'',
	  email:'',
	  lastname:'',
	  phone:'',
	  website:'',
	  message:'',
	  errors:{},
	  selectedIndex: 0,

    };
	
	
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.step1validate = this.step1validate.bind(this);
    this.step2validate = this.step2validate.bind(this);
    this.handleSelect1 = this.handleSelect1.bind(this);
    this.handleButtonClick1 = this.handleButtonClick1.bind(this);
	
	
  }

  handleSelect1 = index => {
    this.setState({ selectedIndex: index });
  };
  
  handleButtonClick1 = () => {
    this.setState({ selectedIndex: 0 });
  };
  handleButtonClick2 = () => {
    this.setState({ selectedIndex: 1 });
  };
 
  
  toggleLarge() {
    this.setState({
      large: !this.state.large,
	  
    });
  }
  
 

  
  
  step1validate(){
	    const errors = {}; 
	    if(this.state.institute.trim() === '')
		errors.institute = 'Institute name is required';
		if(this.state.country.trim() === '')
		errors.country = 'Country name is required';
	    this.setState({ errors });
		//console.log{(this.state.errors)};
		this.setState({ selectedIndex: 1 });
		//debugger;
		
		
  }
  
   step2validate(){
	    const errors = {}; 
	    if(this.state.firstname.trim() === '')
		errors.firstname = 'firstname name is required';
		if(this.state.position.trim() === '')
		errors.position = 'position is required';
	    if(this.state.email.trim() === '')
		errors.email = 'email is required';
	    if(this.state.lastname.trim() === '')
		errors.lastname = 'lastname is required';
	    if(this.state.phone.trim() === '')
		errors.phone = 'phone is required';
	    if(this.state.website.trim() === '')
		errors.website = 'website is required';
	    this.setState({ errors });
		this.setState({ selectedIndex: 2 });
  }
  
 handleInstituteChange = event => {
	this.setState({institute: event.target.value});
}

handlestatusDropdownChange = event => {
	this.setState({country: event.target.value});
}

handleFnameChange = event => {
	this.setState({firstname: event.target.value});
}

handlePositionChange = event => {
	this.setState({position: event.target.value});
}

handleEmailChange = event => {
	this.setState({email: event.target.value});
}

handleLastnameChange = event => {
	this.setState({lastname: event.target.value});
}

handlePhoneChange = event => {
	this.setState({phone: event.target.value});
}

handleWebsiteChange = event => {
	this.setState({website: event.target.value});
}

handleMessageChange = event => {
	this.setState({message: event.target.value});
}


onSubmit = e => {
   e.preventDefault()

   
 /*  alert(this.state.institute);
   alert(this.state.country);
   alert(this.state.firstname);
   alert(this.state.position);
   alert(this.state.email);
   alert(this.state.lastname);
   alert(this.state.phone);
   alert(this.state.website);
   alert(this.state.message);  */
   
   var institute = this.state.institute;
   var country = this.state.country; 
   var firstname = this.state.firstname;
   var position = this.state.position; 
   var email = this.state.email; 
   var lastname = this.state.lastname; 
   var phone = this.state.phone; 
   var website = this.state.website; 
   var message = this.state.message; 
   
       axios.post(
				'http://localhost:2000/api/universityregis',
					{
					institute: institute,
					country:country,
					firstname: firstname,
					position: position,
					email:email,
					lastname : lastname,
					phone:phone,
					website:website,
					message:message
					}
				)

				.then(function(response) {
				console.log(response);
				//window.location = '/#/managecontact/view';
				//toast.success("Manage contact updated successfully");
				
				})
				.catch(function(error) {
				//toast.success("Error occured");
				})

   
  
}
    
  render() {
	console.log(this.state.currentTab);
	const { errors } = this.state;
    return (
      <div className="animated fadeIn foe-register">
        <Row className="uni-no-mar">
          <Col>
              <CardBody>
                
                <Button onClick={this.toggleLarge} className="mr-1 register-btn">Sign Up</Button>
                <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                       className={'modal-lg ' + 'register-popup' + ' ' + this.props.className}>
                  <ModalBody>
					
				    <Form>
					<Tabs selectedIndex={this.state.selectedIndex} onSelect={this.handleSelect1} >
					<TabList>
					<Tab className="step1">Step 1</Tab>
					<Tab className="step2">Step 2</Tab>
					<Tab className="step3">Step 3</Tab>
					</TabList>
					
					<TabPanel className="step1">
					        <label>Institute name</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							<Input type="text" name="institute" placeholder="Enter Institute Name" value={this.state.institute} onChange={this.handleInstituteChange} required />
							</InputGroup>
							 <h6 style={{color: 'red'}}>{errors.institute}</h6>

					        <label>Country</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							<Input type="select" name="country" id="country" onChange={this.handlestatusDropdownChange}>
							<option value="">Select</option>
							<option value="1">A</option>
							<option value="0">B</option>
							</Input>
							</InputGroup>
							 <h6 style={{color: 'red'}}>{errors.country}</h6>
						    <ModalFooter>

							<Button onClick={this.step1validate}>START</Button>
							</ModalFooter>
					</TabPanel>
							
					<TabPanel className="step2">
					    
							<div className="container">
							<span className="tab-subtitle">Contact Person</span>
							<div className="row">
							
							   
								<div className="col-sm">
								<label>First name</label>
								<InputGroup className="mb-3">
								<InputGroupAddon addonType="prepend">
								</InputGroupAddon>
								<Input type="text" name="firstname" placeholder="Enter Firstname Name" value={this.state.firstname} onChange={this.handleFnameChange} />
								</InputGroup>
								<h6 style={{color: 'red'}}>{errors.firstname}</h6>

                                <label>Position</label>
								<InputGroup className="mb-3">
								<InputGroupAddon addonType="prepend">
								</InputGroupAddon>
								<Input type="text" name="position" placeholder="Enter Position" value={this.state.position} onChange={this.handlePositionChange} />
								</InputGroup>
								<h6 style={{color: 'red'}}>{errors.position}</h6>

                               <label>Email address</label>
								<InputGroup className="mb-3">
								<InputGroupAddon addonType="prepend">
								</InputGroupAddon>
								<Input type="email" name="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleEmailChange} />
								</InputGroup>
								 <h6 style={{color: 'red'}}>{errors.email}</h6>
								</div>
								
								
								<div className="col-sm">
								<label>Last name</label>
								<InputGroup className="mb-3">
								<InputGroupAddon addonType="prepend">
								</InputGroupAddon>
								<Input type="text" name="lastname" placeholder="Enter lastname" value={this.state.lastname} onChange={this.handleLastnameChange} />
								</InputGroup>
								<h6 style={{color: 'red'}}>{errors.lastname}</h6>
								
                                <label>Phone</label>
								<InputGroup className="mb-3 foe-phone">
								<InputGroupAddon addonType="prepend">
								<InputGroupText>+00</InputGroupText>
								</InputGroupAddon>
								<Input type="text" name="phone" placeholder="Enter phone" value={this.state.phone} onChange={this.handlePhoneChange} />
								</InputGroup>
								<h6 style={{color: 'red'}}>{errors.phone}</h6>

                                <label>Website</label>
								<InputGroup className="mb-3">
								<InputGroupAddon addonType="prepend">
								</InputGroupAddon>
								<Input type="text" name="website" placeholder="Enter website" value={this.state.website} onChange={this.handleWebsiteChange} />
								</InputGroup>	
								<h6 style={{color: 'red'}}>{errors.website}</h6>
								</div>

							</div>
							</div>
							
							<ModalFooter>

							<Button color="primary" onClick={this.handleButtonClick1} className="px-4 back-btn">BACK</Button>
						    <Button color="secondary" onClick={this.step2validate}>NEXT</Button>
							</ModalFooter>
						 
					</TabPanel>
					
					<TabPanel className="step3">
					    
							<div className="container">
							<div className="row">
							<div className="col-sm">
							<label className="tab-subtitle">Message</label>
							<div className="tell-us">Tell us about yourself</div>
							<InputGroup className="mb-3 foe-textbox">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							<textarea type="text" name="message" placeholder="Enter message" cols={100} rows={10} value={this.state.message} onChange={this.handleMessageChange} />
							</InputGroup>
							</div>
							</div>
							</div>
					   
					        <ModalFooter>
							<Button color="primary" onClick={this.handleButtonClick2} className="px-4 back-btn">BACK</Button>
							<Button color="primary"  type="submit" onClick={this.onSubmit.bind(this)} className="px-4">SEND ENQUIRY</Button>
							
							
							</ModalFooter>
						 
					    </TabPanel>		
					
						
					    </Tabs>
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

export default Modals;
