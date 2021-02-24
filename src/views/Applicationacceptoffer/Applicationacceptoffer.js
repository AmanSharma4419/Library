import React, { Component } from 'react';
import { Link  , Redirect } from 'react-router-dom';
import { Label, Button, Card, CardBody, CardHeader, FormGroup,ListGroup,ListGroupItem, CardGroup,Modal,ModalBody,ModalFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config.json';
import backarrow from '../../assets/img/university/back_arrow.svg';
import Offerletterlogo from '../../assets/img/university/deakin_logo.jpg';
import Closebtn from '../../assets/img/close-btn.svg';
import './style.css';
import $ from "jquery";
var baseurl = `${config.baseurl}`;
//API Base Url



class Applicationacceptoffer extends Component {

  constructor(props) {
    super(props);


    this.state = {
		success: false,
		layout: 'normal',
		failure: false,
		courseid: '',
		offervalid: '',
		appstatus: '',
		universitydetails: [],
		studentdetails: [],
		coursedetails: [],
		getallid: [],
		application: localStorage.getItem('applicationid'),
		
    };
	    this.toggleSuccess = this.toggleSuccess.bind(this);
		this.toggleFailure = this.toggleFailure.bind(this);
        var param = localStorage.getItem('applicationid');
	    
        axios.get(baseurl+'/getelegibilitydate/'+localStorage.getItem('applicationid')).then(response => {
                       this.setState({ offervalid: response.data });
		});		
		axios.get(baseurl+'/getAppData/'+localStorage.getItem('applicationid')).then(response1 => {
			this.setState({ appstatus: response1.data });
			
        });	
		
		axios.get(baseurl+'/getofferletterdetails/'+localStorage.getItem('applicationid')).then(response => {
                       this.setState({
				universitydetails: response.data.universitydetails,
				studentdetails: response.data.studentdetails,
				coursedetails: response.data.coursedetails[0],
				getallid: response.data.getallid,
      		});
		});
			
	
  }
 

toggleSuccess() {
		this.setState({
			success: !this.state.success,
		});
	}


toggleFailure() {
	this.setState({
		failure: !this.state.failure,

	});
}

viewofferaccept = event => {
	
	  axios.get(baseurl+'/offeraccept/'+localStorage.getItem('applicationid')).then(response => {
                        if(response.data.status_code == 200){
						 this.setState({ success: true });	
						 window.location.href= "/#/makepaymentTution";
						}else{
						 toast.error("Error");
						}
        });
	
}

successpayment = event => {
	    axios.get(baseurl+'/getcourseidwithappid/'+localStorage.getItem('applicationid')).then(response => {
               localStorage.setItem('selectcoursedraft',response.data);
               window.location.href= "/#/makepaymentTution";	
         		   
        });
}

viewofferreject = event => {
	  axios.get(baseurl+'/offerdeclined/'+localStorage.getItem('applicationid')).then(response => {
                        if(response.data.status_code == 200){
						 this.setState({ failure: true });	
						}else{
						 toast.error("Error");
						}
        });
		       
}

closeall() {
		window.location.reload();
	}



backbtn() {
	  window.location.href= "/#/sendapplicationinprocess";
}


	render() {
		const { errors } = this.state;
		const { showhide } = this.state;
		console.log(this.state.showhide);
		const imgpath = `${config.baseurl}`;
		//const date = this.state.getallid.course_startdate;
		//const newDate = new Date(date.setMonth(date.getMonth()+8));
    return (
  <div className="foe-studen-container send-app-page pt-5">
  
        <Modal isOpen={this.state.success} toggle={this.toggleFailure}
					className={'modal-md ' + 'register-popup sucess-pop' + ' ' + this.props.className}>
					<ModalBody>
						<div className="modal_header mb-4">
							 <a href="/#/sendapplication"><span>&nbsp;&nbsp;&nbsp;<img src={Closebtn} alt="close-icon"className="uni-icon" /></span></a>
						</div>
						<div className="px-5 pt-3 pb-5 text-center">
							<div className="mb-3 sucess-head">Thank you!</div>
							<div className="mb-4 sucess-text">The Invoice will be sent to you shortly. Please make the
payment to receive the confirmation of Enrolment.</div>
                           <a onClick={this.successpayment}><Button color="primary" className="d-offer mx-auto">OK</Button></a>
						</div>
					</ModalBody>

				</Modal>
				
				 <Modal isOpen={this.state.failure} toggle={this.toggleSuccess}
					className={'modal-md' + 'register-popup sucess-pop' + ' ' + this.props.className}>
					<ModalBody>
						<div className="modal_header mb-4">
						  <a href="/#/sendapplication"><span>&nbsp;&nbsp;&nbsp;<img src={Closebtn} alt="close-icon"className="uni-icon" /></span></a>
						</div>
						<div className="px-5 pt-3 pb-5 text-center">
							<div className="mb-3 sucess-head">Thank you!</div>
							<div className="mb-4 sucess-text">Offer is Declined.</div>
                            <a href="/#/sendapplication"><Button color="primary" className="d-offer mx-auto">OK</Button></a>
						</div>
					</ModalBody>

				</Modal>
						
        <div className="foe-student-box pt-3">
	   
        <Container>
		<Row>
            <Col xs="12" sm="12" xl="7" md="7" lg="7" className="mx-auto" >
			 <div className="row mb-3">
				<div className="col-md-2 col-lg-2">
			      <div className="mb-4"> <a onClick={this.backbtn} className="col-12 backarrow mt-3" style={{cursor:"pointer"}} ><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a></div>
				</div>
				<div className="col-md-9 col-lg-9">
				<h3 className="app-title">View Letter of Offer</h3>
				</div>
			 </div> 
			 <Card className="uni-right-card p-4 letter-offer">
			 <div className="row">
				<div className="col-md-4 col-lg-4">
			      <div className="mb-4"> <span className="pr-1 pt-4"> <img src={imgpath+this.state.universitydetails.logo_image} alt="" /></span> </div>
				</div>
				<div className="col-md-8 text-right col-lg-8">
					<div className="address px-3 mt-3">
						<p>{this.state.universitydetails.location}</p>
						<p>{this.state.universitydetails.country_name}</p>
					</div>
					<div className="address px-3 mt-3">
						<p><span className="pr-3">@</span>{this.state.universitydetails.email}</p>
						<p><span className="pr-3">m</span>{this.state.universitydetails.phone}</p>
					</div>
					{/*<div className="address px-3 mt-3">
						<p>test dsadsf</p>
						<p>test dsadsf</p>
						<p>test dsadsf</p>
					</div>  */}
					<h3 className="app-title px-3 pt-3">Letter of Offer</h3>
				</div>
			 </div>
			 <div className="row mb-3">
				<div className="col-md-12 text-left col-lg-12">
					<div className="address px-3 mt-3">
						<p>{this.state.studentdetails.first_name}</p>
						<p>{this.state.studentdetails.address}</p>
						<p>{this.state.studentdetails.city},{this.state.studentdetails.state}</p>
					</div>
					<div className="px-3 mt-3">
						<h6>{this.state.offervalid}</h6>
					</div>
					<div className="px-3 mt-3">
						<h4>Congratulations {this.state.studentdetails.first_name}</h4>
					</div>
					<div className="px-3 mt-3">
						<p>Your application to {this.state.universitydetails.institute_name} has been successful and your offer letter is attached.</p>
						<p>Please check your offer carefully and notify us immediately if any of the details are incorrect.</p>
						<p>Your offer contains details of your course,its duration,campus location,tution fees,and OHSC charges.Your offer is subjected to the terms and condition that are outlined in your acceptance package.</p>
						<p>To accept your offer,please follow the instruction on our "accept your offer" page at:
						{this.state.universitydetails.institute_name}</p>
						<p>Information about arrival services,registration,orientation and environment will be sent to you once your have accepted your offer</p>
						<p>We look forward to welcoming you to {this.state.universitydetails.institute_name}</p>
					</div>
				</div>
			 </div>
				  
			 </Card>
			</Col>

			<Col xs="12" sm="12" xl="7" md="7" lg="7" className="mx-auto" >
			 <Card className="uni-right-card p-4 letter-offer mb-0">
			 <div className="row mb-3">
				<div className="col-md-6 col-lg-6">
			      <div className="mb-4"> <span className="pr-1 pt-4"> <img src={imgpath+this.state.universitydetails.logo_image} alt="" /></span> </div>
				  <h3 className="px-3 pt-3">Your Letter of Offer</h3>
				</div>
				<div className="col-md-6 text-right col-lg-6">
					<div className="address px-3 mb-3 mt-3">
					{/*<p>test dsadsf</p>
					<p>test dsadsf</p>  */}
					</div>

					<div className="address px-3 mt-3">
						<p>Application ID : {this.state.application}</p>
						<p>Student ID: {this.state.studentdetails.id}</p>
						
					</div>
				</div>
			 </div>
			 <div className="row mb-3">
				<div className="col-md-12 text-left col-lg-12">					
					<div className="px-3 mt-3">
						<p>Dear {this.state.studentdetails.first_name}</p>
						<p>{this.state.universitydetails.institute_name} is pleased to offer you admission into the following program in {this.state.universitydetails.country_name} Please read this offer letter carefully as it contains important information relating to your {this.state.universitydetails.institute_name} admission.</p>
						<p>This offer may need to be reassessed if it is found that you have undertaken any further undisclosed academic study between the date of your last qualification and your commencement  at {this.state.universitydetails.institute_name}</p>
						
					</div>
				</div>
			 </div>
			 <div className="two-block-sec  mb-3">				
				<div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Program</label>  </div>
				  <div className="col-md-8 col-lg-8"> {this.state.coursedetails.heading}  </div>		
			 	</div>
				 <div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Location/Campus</label>  </div>
				  <div className="col-md-8 col-lg-8"> {this.state.universitydetails.location}  </div>		
			 	</div>
				 <div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Intake </label>  </div>
				  <div className="col-md-8 col-lg-8"> {this.state.getallid.course_startdate}   </div>		
			 	</div>
				 <div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Register/Enrol</label>  </div>
				  <div className="col-md-8 col-lg-8"> http://university.formeeexpress.com/#/login   </div>		
			 	</div>
				 <div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Program start date</label>  </div>
				  <div className="col-md-8 col-lg-8"> {this.state.getallid.course_startdate}   </div>		
			 	</div>
				 <div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Expected completion date</label>  </div>
				  <div className="col-md-8 col-lg-8"> {this.state.coursedetails.completed_date} </div>		
			 	</div>
				 <div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Offered program duration </label>  </div>
				  <div className="col-md-8 col-lg-8"> {this.state.coursedetails.tenure}  </div>		
			 	</div>
				<div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Inducative annual tution fees</label>  </div>
				  <div className="col-md-8 col-lg-8"> AU${this.state.coursedetails.tution_fee}  </div>		
			 	</div>
				<div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Inducative total tution fees</label>  </div>
				  <div className="col-md-8 col-lg-8"> AU${this.state.coursedetails.tution_fee}  </div>		
			 	</div>
			</div>	
			<div className=" mb-3">	
			
			{/*	<div className="row mx-0">
				 
				  <div className="col-md-12 col-lg-12"> <p>To accept your offer, a deposit for the applicable program,fees and OHSC is required
</p> 
 </div>		
			 	</div>


				
				<div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Program 1 deposit:</label>  </div>
				  <div className="col-md-8 col-lg-8">  AU$ 7,000.00  </div>		
			 	</div>
				 <div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">    <label>Total despoit amount </label>  </div>
				  <div className="col-md-8 col-lg-8">  AU$ 7,000.00  </div>		
			 	</div>
				 <div className="list-items row mx-0">
				  <div className="col-md-4 col-lg-4">     <label>OHSC</label>  </div>
				  <div className="col-md-8 col-lg-8"> 
				  	<div className="address mt-3">
						<p> AU$ 1,326.00(Single) or </p>
						<p> AU$ 4,503.20(Couple) or</p>
						<p> AU$ 6,649.50(Family) </p>
					</div> </div>		
			</div>   */}
				 <div className="row mt-3 mx-0">
				 
				  <div className="col-md-12 col-lg-12"> <p>Your {this.state.universitydetails.institute_name} is also subjected to the terms and conditions outlined in your acceptance package.These terms and conditions can be viewed when you accept your offer.This offer is also subject to you meeting the Universitys Simplified Student Visa Framework(SSVF) requirements and will be considered invalid should you fail to meet these requirements. </p>  </div>		
			 	</div>
				 <div className="row mx-0">
				 
				  <div className="col-md-12 col-lg-12"> <p>If you have any question about this offer,Please do not hesitate to contact the Admissions helpdesk.</p>  </div>		
			 	</div>
				 <div className="row mx-0">
				 
				  <div className="col-md-12 col-lg-12"> <p>We look forward to welcoming you to {this.state.universitydetails.institute_name}.</p>  </div>		
			 	</div>
			</div>  
			<div className="row mb-3">
				
				<div className="col-md-12 mt-4  col-lg-12">
					
					<div className="address px-3 mt-3">
					   <p>{this.state.universitydetails.first_name}</p>
						<p>{this.state.universitydetails.position}</p>
						<p>{this.state.universitydetails.institute_name}</p>
						
					</div>
				</div>
			 </div>
			 
			 </Card>
			 
			 <div className="offer-footer mb-4">
				        <div className="offer-footer-inner">
						     <p>Offer Valid Till  : <strong>{this.state.offervalid}</strong></p>
						</div>
						{this.state.appstatus == 3 ?  
						<div className="offer-footer-layer d-flex justify-content-end">		
						 
						  <Button color="primary" onClick={this.viewofferreject} className="d-offer">Decline an offer</Button>
                         <Button color="secondary" onClick={this.viewofferaccept} className="a-offer">Accept your Offer</Button> 
						</div>: <p></p> }
				   </div>
				   
			</Col>
			 
		</Row>
        </Container>	
		</div>
      </div>
    );
  }
}

export default Applicationacceptoffer;
