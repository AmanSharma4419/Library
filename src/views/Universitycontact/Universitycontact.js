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

var baseurl = `${config.baseurl}/`;

class Universitycontact extends Component {

   constructor(props) {
    super(props);
	
    this.state = {
      large: false,
	  email:'',
	  heading:'',
	  phone:'',
	  contact:[],
	  errors:{},
	  schemas: [],
	  schemas_id: [],
	  campusid:'',
	  
    };
	
	  this.validate = this.validate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getContactdetails = this.getContactdetails.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
	 
	 this.getContactdetails();
	 
	  var universityid = localStorage.getItem('universityid');
	 
	  axios.get(baseurl+'getcampusesinfo/'+universityid).then(response => {
          this.setState({
                   schemas: response.data.heading,
                   schemas_id: response.data.id
               });
        })
	
  }
  
  
  
  getContactdetails(){
	  
	 axios.get(baseurl+'get_contact/'+localStorage.getItem('universityid')).then(response => {
		console.log(response);
		//this.setState({data: [...json]});
         this.setState({
                  contact: response.data,
               });
        }) 
	  
  }

 
  
  toggleLarge() {
    this.setState({
      large: !this.state.large,
	  
    });
  }
 
validate() {
     const errors = {};
	 var minmax = /^.{0,15}$/
				
	 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	     const email = this.state.email;
	 
	 if(this.state.heading.trim() === ''){
	 errors.heading = 'Heading is required';
	 }else if(this.state.phone.trim() === ''){
	 errors.phone = 'Phone number is required';
	 }else if(!this.state.phone.match(minmax)) {
	 errors.phone = 'Enter Phone number between 15 digits';
	 }else if(this.state.email.trim() === ''){
	 errors.email = 'Email is required';
     }else if(!email.match(re)) {
	 errors.email = 'Invalid email';
     }else if(this.state.campusid === '') {
	 errors.campus = 'Select campus';
     }else{
		this.onSubmit(); 
	 }  
	 
	 
   	 this.setState({ errors });
};
 
 
handleHeadingChange = event => {
	this.setState({heading: event.target.value});
}

handlePhoneChange = event => {
	this.setState({phone: event.target.value});
}

handleEmailChange = event => {
	this.setState({email: event.target.value});
}

handleCampusChange = event => {
	//alert(event.target.value);
	this.setState({campusid: event.target.value});
}


onSubmit() {
  // e.preventDefault()
   this.setState({large: false});
   
   var heading = this.state.heading;
   var phone = this.state.phone; 
   var email = this.state.email;
   var campusid = this.state.campusid;
   var university_id = localStorage.getItem('universityid');
  
   
       axios.post(
				baseurl+'storecontact',
					{
					heading: heading,
					phone:phone,
					email: email,
					university_id:university_id,
					campusid:campusid
					}
				)

				.then(function(response) {
			     //this.getContactdetails();
				 toast.success("Saved successfully");
				 setTimeout(function(){ window.location.reload(); }, 3000);
				
				//
				
				
				})
				.catch(function(error) {
				//toast.success("Error occured");
				})

   
  
}

	render() {
	const { errors } = this.state;
    return (
      <div className="app university-box" >
   
        <Container>
          <Row>
    
            <Col xs="12" sm="10" xl="10" md="10" lg="10" className="uni-right-card">
           
                
                <CardGroup className="custom_group">
                <Card className="uni-right-card">
                  <CardBody>
                
                <Modal isOpen={this.state.large} toggle={this.toggleLarge}
                       className={'modal-lg ' + this.props.className}>
                  <ModalBody>
				    <Form>
					<div className="row">
               <div className="col-md-8">
               <label className="card-label">Heading</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							<Input type="text" name="heading" placeholder="Enter heading" value={this.state.heading} onChange={this.handleHeadingChange} />
							</InputGroup>
							<h6 style={{color: 'red'}}>{errors.heading}</h6>
               </div>
               <div className="col-md-8">
                 
					        <label className="card-label">Phone number</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							<Input type="number" name="phone" placeholder="Enter phone number" value={this.state.phone} onChange={this.handlePhoneChange} />
							</InputGroup>
							 <h6 style={{color: 'red'}}>{errors.phone}</h6>
                 </div>
                 <div className="col-md-8">
                   						 
							<label className="card-label">Email</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							<Input type="text" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
							</InputGroup>
							 <h6 style={{color: 'red'}}>{errors.email}</h6>
                 </div>
				 <div className="col-md-8">
                   						 
							<label className="card-label">Campus</label>
							<InputGroup className="mb-3">
							<InputGroupAddon addonType="prepend">
							</InputGroupAddon>
							
							<Input type="select" name="capusidid" id="capusidid" value={this.state.capusidid}  onChange={this.handleCampusChange}>
							<option value="0">Select Campus</option>
							{this.state.schemas.map((schema, index) => ( 
							<option value={ this.state.schemas_id[index] }>{ schema }</option>
							))}
							</Input>
							
							</InputGroup>
							 <h6 style={{color: 'red'}}>{errors.campus}</h6>
                 </div>
          </div>
					
							 
						    <ModalFooter>

							<Button color="primary" onClick={this.validate}>SAVE</Button>
							</ModalFooter>
					
					 </Form>
                  </ModalBody>
                </Modal>
                   <div className="row">
				   {/* <div className="col-xl-4 col-md-4 "> 
                   <label className="card-label" >General campus information</label>
                   </div>
                   <div className="col-xl-4 col-md-4 "> 
                   <label className="card-label" >Application help</label>
                   </div>
                   <div className="col-xl-4 col-md-4 "> 
                   <label className="card-label" >Scholarship help</label>
                   </div>  */}
                     </div>  
			    <div className="row">
				{this.state.contact.map( ( {id, heading , email ,phone, location} ) => {
				return  <div className="col-md-4" key={id}>
          <div className="flex-dir"> 
          <div className="div-form-group">
          <Label className="card-label label-heading"> {heading}</Label>
         
             </div>
		  <div className="div-form-group"> 	
				<InputGroup className="mb-3">
				<Label className="card-label"> Phone Number</Label>
				<div className="form-control">{phone}</div>
				</InputGroup>
		  </div>
		  <div className="div-form-group">
				<InputGroup className="mb-3">
				<Label className="card-label"> Email</Label>
				<div className="form-control">{email}</div>
				</InputGroup>
				</div>
		 <div className="div-form-group">
				<InputGroup className="mb-3">
				<Label className="card-label"> Campus Location</Label>
				<div className="form-control">{location}</div>
				</InputGroup>
				</div>
				
          </div>
          
         
          </div>
		  
				})	}
				</div>
                             
              </CardBody>
            <div className="mx-auto"> <Button onClick={this.toggleLarge} className="mr-1 add-cn-btn">+ Add contacts</Button> </div> 
                </Card>
              
              </CardGroup>
                         
            </Col>
			
             <Card className="col-md-2 list-card uni-no-padd">
					  <CardHeader className="card-list-header">
					  <span className="card-list-head"><strong>Contact details</strong></span>
						
					  </CardHeader>
					  <CardBody className="uni-no-padd">
					  {/*  <a data-toggle="tab" href="#Campus" role="tab" className="btn btn-primary campus-btn">+ Add more campus</a>  */}
					  </CardBody>
					</Card>
			
          </Row>
        </Container>
      </div>
    );
  }
}

export default Universitycontact;
