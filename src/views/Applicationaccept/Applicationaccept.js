import React, { Component } from 'react';
import { Link  , Redirect } from 'react-router-dom';
import { Label, Button, Card, CardBody, CardHeader, FormGroup,ListGroup,ListGroupItem, CardGroup,Modal,ModalBody,ModalFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config.json';
import Pricon from '../../assets/img/student/personal-icon.svg';
import Flagicon from '../../assets/img/student/flag-my-icon.svg';
import deakinlogo from '../../assets/img/university/deakin_logo.jpg';
import backarrow from '../../assets/img/university/back_arrow.svg';
import Downicon from '../../assets/img/download-icon.svg';
import './style.css';
import $ from "jquery";
var baseurl = `${config.baseurl}`;
//API Base Url



class Applicationaccept extends Component {

  constructor(props) {
    super(props);


    this.state = {
		large: false,
		layout: 'normal',
		description:'',
		url: '',
		id_st: '',
		emailst: '',
		account_type_st: '',
		lastname_st: '',
		name_st :'',
		upload_photo: [],
		fileLength: '',
		errors: {},
		name: '',
		account_type: '',
		phone: '',
		email: '',
		capusidid: '',
		//for subsection start
		university_id: '',
		layout: 'normal',
		heading: '',
		id:[],
		
		upload_photo: [],
		schemas: [],
	    schemas_id: [],
	    inv_name: [],
	    inv_email: [],
	    inv_acc: [],
	    inv_id: [],
	    invblk_id: [],
	    dates: [],
	    name: [],
	    email: [],
	    account_type: [],
	    lastname: [],
	    imgfile: '',
		imgfile1: '',
		inv_count: 0,
		acc_type:[],
		acc_type_id:[],
		formData: new FormData()
    };
	//alert(this.state.email_st);
	this.validate = this.validate.bind(this);
	this.toggleLarge = this.toggleLarge.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
	
 var param = localStorage.getItem('universityid');	
	axios.get(baseurl+'/get_stafflandingpages/'+param).then(response => {	

         this.setState({
                   id: response.data.id,
                   name: response.data.name,
                   email: response.data.email,
                   acc_type: response.data.acc_type,
                   acc_type_id: response.data.acc_type_id,
                   lastname: response.data.lastname,
                   account_type: response.data.account_type
				   });
        })
  }
 
handleCloseClick = param => e => 
{
	this.setState({large: false});
}
  
toggleLarge() {
	
    this.setState({
      large: !this.state.large,
	  
    });
  }
 

filterInvites(param1) {
  axios.get(baseurl+'get_staffinvitesfilter/'+param1).then(response => {
	  console.log(response.data.acc_type_id);
          this.setState({
                   inv_name: response.data.inv_name,
                   inv_email: response.data.inv_email,
                   inv_acc: response.data.inv_acc,
                   inv_id: response.data.inv_id,
                   invblk_id: response.data.invblk_id,
                   dates: response.data.dates,
                   acc_type: response.data.acc_type,
                   inv_status: response.data.inv_status,
                   inv_count: response.data.inv_count,
                   acc_type_id: response.data.acc_type_id
               });
        })
}
handleChange = param => e => 
{
	var univ_id = localStorage.getItem('universityid');
	axios.get(baseurl+'/get_stafflandingpagesfilter/'+param+'/'+univ_id).then(response => 
	{
			this.setState({
				id: response.data.id,
				name: response.data.name,
				email: response.data.email,
				acc_type: response.data.acc_type,
				acc_type_id: response.data.acc_type_id,
				lastname: response.data.lastname,
				account_type: response.data.account_type
			});
    })
	e.preventDefault();
	document.querySelector('li.active').classList.remove('active');
	e.target.className = "list-group-item active";
};
handleNameChange = event => {
	this.setState({name_st: event.target.value});
}

handlePhoneChange = event => {
	this.setState({phone_st: event.target.value});
}

handleEmailChange = event => {
	this.setState({emailst: event.target.value});
}


handleAcctypeChange = event => {
	//alert(event.target.value);
	this.setState({account_type_st: event.target.value});
}

handleLastnameChange = event => {
	//alert(event.target.value);
	this.setState({lastname_st: event.target.value});
}
updateStaff(id,name,lastname,email,account_type) 
{
	this.setState({id_st: id});
	this.setState({name_st: name});
	this.setState({lastname_st: lastname});
	this.setState({emailst: email});
	this.setState({account_type_st: account_type});
	this.toggleLarge();
}

validate() {
     const errors = {};
	 var minmax = /^.{0,15}$/
				
	 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	     const email = this.state.emailst;
	 if(this.state.name_st === ''){
	 errors.name_st = 'Name is required';
	 }else if(this.state.lastname_st === ''){
	 errors.lastname_st = 'Last Name is required';
	 }else if(this.state.emailst === ''){
	 errors.emailst = 'Email is required';
     }else if(!email.match(re)) {
	 errors.emailst = 'Invalid email';
     }else if(this.state.account_type_st === '') {
	 errors.account_type_st = 'Select campus';
     }else{
		this.onSubmit(); 
	 }  
	 
	 
   	 this.setState({ errors });
};
onSubmit() {
  // e.preventDefault()
   
   this.setState({large: false});
   var id = this.state.id_st;
   var name = this.state.name_st;
   var email = this.state.emailst; 
   var phone = this.state.phone_st;
   var lastname = this.state.lastname_st;
   var account_type = this.state.account_type_st;
   var university_id = localStorage.getItem('universityid');
  
				
		const products ={
					id: id,
					name: name,
					email: email,
					account_type: account_type,
					lastname: lastname,
					university_id:university_id
					}	
		let uri = baseurl+'/update_invites';
		const post = axios.post(uri, products).then((response) => {
		if(response.data.status_code =="200")
		{
		
		toast.success(response.data.message);
		setTimeout(function () 
		{ 
		window.location.reload(true);

		}, 3000);
		}
		else
		{
			toast.error(response.data.message);  
		}
		});

   
  
}
getAccIndex(indexid) 
{ 
	var arr = this.state.acc_type_id;
	var index = arr.indexOf(parseInt(indexid));
	return this.state.acc_type[index];
}
handleAllchange = event => {
	var param = localStorage.getItem('universityid');	
	axios.get(baseurl+'/get_stafflandingpages/'+param).then(response => {	

         this.setState({
                   id: response.data.id,
                   name: response.data.name,
                   email: response.data.email,
                   acc_type: response.data.acc_type,
                   acc_type_id: response.data.acc_type_id,
                   lastname: response.data.lastname,
                   account_type: response.data.account_type
				   });
        })
}

	render() {
		const { errors } = this.state;
	 const { showhide } = this.state;
	console.log(this.state.showhide);
    return (
      <div className="foe-studen-container send-app-page">
        <div className="foe-student-box">
          <Container>
		  <ToastContainer/>
            <Row>
            <Col xs="12" sm="3" xl="3" md="3" lg="3" >
           <div className="mb-4"> <a className="col-12 backarrow mt-3" style={{cursor:"pointer"}} ><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a></div>
              <Card className="uni-left-card">
                <CardBody>
                <ListGroup>
				  <ListGroupItem><a href="" className="active">Application Overview</a></ListGroupItem>
				  <ListGroupItem><a href="">Enrollment Form</a></ListGroupItem>
				  <ListGroupItem><a href="">Note</a></ListGroupItem>
				</ListGroup>
                </CardBody>
              </Card>
            </Col>

            <Col xs="12" sm="9" xl="9" md="9" lg="9" className="sendapp-inprogress">
            <Row className="mx-0">
				<div className="col-md-9">
				<h3 className="app-title">Application Overview</h3>
				</div>
				<div className="col-md-3 right-btn-align search-icon">
                        <InputGroup className="mb-0">
                            
							<Input type="select" name="application_fee" className="form-control">
                              <option value=""> Other Applications </option>
                              <option value='1'>Above 100</option>
                                                          
                            </Input>
                          </InputGroup>
				</div>
				</Row>
              <Card className="uni-left-card app-inprogress">
                <CardBody className="pr-0">
{/**buttons &images **/}
					<div className="row mx-0">
					<div className="col-12 row">
					<div className="col-3">
						<h3><img src={deakinlogo} alt="" /></h3>
					</div>
					<div class="col-9 mt-3 float-right d-flex justify-content-between acc-down">
					<Button color="outline-primary" className="add-staff-bn mr-1"><img src={Downicon} alt="" className="uni-icon" /></Button>
					</div>
					</div>
					</div>
{/** end ofbuttons and images**/}
{/**profile details**/}
					<div class="col-12 Clearfix view-prof-detail">
				
          <h5 className="mb-4 app-sub-heading">Bachelor of Arts - Business Administration - Management
- Human Resource Management </h5>
					<div className="row view-app-detail">
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Level :
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
4-Year Bachelor's Degree
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Required Level :
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 Grade 12 / High School
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Application ID :
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 496827
</div>

</div>
					</div>
					<div className="col-12 mt-3">
					<div className="col-md-10 col-12 row accept-level">
					<div className="pl-0 col-9">
					<label className="card-label">Start Date (s) :</label>
					<div className="row">
					    <div className="col-md-6">
							<label className="uni-label">ESL</label>
							<select class="form-control w-100 checksame" value="" id="" name="" required="">
							<option value="">N/A</option>
							</select>
						</div>
						<div className="col-md-6">
							<label className="uni-label">AcademicLikely Open</label>
							<select class="form-control w-100 checksame" value="" id="" name="" required="">
							<option value="">2020 - May</option>
							</select>
						</div>
					</div>
					</div>
					<div className="col-3">
					<label className="card-label">status:</label>
					<Button color="outline-primary" className="add-staff-bn mr-1">Accepted</Button>
					</div>
					</div>
{/**end of Tab_content**/}
{/**Tab_content**/}
					<div className="px-0 col-12 mt-3 view-application-tab">
					<div className="row">
                <div className="profile-student col-12">
               
              <div id="main">
					<div className="container px-0">
					<div className="accordion" id="faq">
{/**accordian_1**/}					
                    <div className="card">
                        <div className="card-header" id="faqhead1">
                            <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq1"
                            aria-expanded="true" aria-controls="faq1">General Information</a>
                        </div>
                        <div id="faq1" className="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                            <div className="card-body">
													<div className="row view-app-detail">
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Formee Express ID :
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
4-Year Bachelor's Degree
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Student Name :
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 Grade 12 / High School
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Login Email :
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 496827
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Primary Email :

</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 496827
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Birthday :

</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 496827
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Phone Number :
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 496827
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
First Language : 
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 496827
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Gender : 
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 496827
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Marital Status :
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 496827
</div>
<div className="col-12 col-sm-3 col-lg-3 col-md-3 col-xl-3 view-app-left">
Passport Number :
</div>
<div className="col-12 col-sm-8 col-lg-8 col-md-8 col-xl-8 view-app-right">
 496827
</div>

</div>
                              </div>
                        </div>
                    </div>
{/**accordian_2**/}	
                    <div className="card">
                        <div className="card-header" id="faqhead2">
                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq2"
                            aria-expanded="true" aria-controls="faq2">Education History</a>
                        </div>

                        <div id="faq2" className="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                            <div className="card-body">
							
                              
                            </div>
                        </div>
                    </div>
{/**accordian_3**/}	
                    <div className="card">
                        <div className="card-header" id="faqhead3">
                            <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq3"
                            aria-expanded="true" aria-controls="faq3">Test Scores</a>
                        </div>

                        <div id="faq3" className="collapse" aria-labelledby="faqhead3" data-parent="#faq">
                            <div className="card-body">
						
								
                            </div>
                        </div>
                    </div>
{/**accordian_4**/}	
					                    <div className="card">
                        <div className="card-header" id="faqhead4">
                            <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq4"
                            aria-expanded="true" aria-controls="faq4">Background Information
</a>
                        </div>

                        <div id="faq4" className="collapse" aria-labelledby="faqhead4" data-parent="#faq">
                            <div className="card-body">
                              xzvxv      
                            </div>
                        </div>
                    </div>
					         <div className="card">
                        <div className="card-header" id="faqhead5">
                            <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq5"
                            aria-expanded="true" aria-controls="faq5">Upload Documents</a>
                        </div>

                        <div id="faq5" className="collapse" aria-labelledby="faqhead5" data-parent="#faq">
                            <div className="card-body">
                              xzvxv      
                            </div>
                        </div>
                    </div>
					
					     <div className="card">
                        <div className="card-header" id="faqhead6">
                            <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq6"
                            aria-expanded="true" aria-controls="faq6">Payment</a>
                        </div>

                        <div id="faq6" className="collapse" aria-labelledby="faqhead6" data-parent="#faq">
                            <div className="card-body">
                              xzvxv      
                            </div>
                        </div>
                    </div>
					
					  <div className="card">
                        <div className="card-header" id="faqhead7">
                            <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq7"
                            aria-expanded="true" aria-controls="faq7">Letter of Offer</a>
                        </div>

                        <div id="faq7" className="collapse" aria-labelledby="faqhead7" data-parent="#faq">
                            <div className="card-body">
                              xzvxv      
                            </div>
                        </div>
                    </div>
					
                </div>
    </div>
  </div>
 
                </div>
				</div>
				{/**End of tab content**/}
				
 

              </div>
					
					
					</div>
                </CardBody>
              </Card>
            </Col>
           
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Applicationaccept;
