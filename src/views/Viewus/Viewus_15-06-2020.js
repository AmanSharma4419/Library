import React, { Component } from "react";
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
  NavLink,
} from "reactstrap";
import axios from 'axios';


import SecondaryHeader from './../SecondaryHeader/SecondaryHeader';

import Campuses from './../Pages/Campuses/Campuses';

import Facilities from './../Facilities/Facilities';

import Entryrequirement from './../Pages/Entryrequirement/Entryrequirement';

import Universitycontact from './../Universitycontact/Universitycontact';
import Leftmenu from '../../assets/img/left-menu.jpg';
import { Addsubsection } from "../Pages/Campuses/index";

import Studentfacilities from './../Studentfacilities/Studentfacilities';
import Universityfacilities from './../Universityfacilities/Universityfacilities';
import ProfileBanner from '../../assets/img/university/profile-banner.jpg';
import buliding from '../../assets/img/university/img_01.jpg';
import fullimg from '../../assets/img/university/img_02.jpg';
import universityimg from '../../assets/img/university/img_03.png';
import studentimg from '../../assets/img/university/img_04.png';
import studenthub from '../../assets/img/university/img_05.jpg';
import deakinlogo from '../../assets/img/university/deakin_logo.jpg';
import bargraph from '../../assets/img/university/bar_graph.svg';
import contlogo from '../../assets/img/university/australia_circle_flag.svg';
import favourites from '../../assets/img/university/favourites.svg';
import heart from '../../assets/img/university/heart.svg';
import eyeicon from '../../assets/img/university/view_simple.svg';
import rating from '../../assets/img/university/rating.svg';
import backarrow from '../../assets/img/university/back_arrow.svg';

//API Base Url
function submitForm(contentType, data, setResponse, path) {
  axios({
  url: `https://formeeadmin.bicsglobal.com/storeaboutus`,
  method: 'POST',
  data: data,
  headers: {
    'Content-Type': contentType
  }
  }).then((response) => {
  setResponse(response.data);
  }).catch((error) => {
  setResponse("error");
  })
}

class Viewus extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
	  formData: new FormData(),
	  upload_photo: [],
	  location: '',
	  errors:{},
	  totalstudents: 0,
	  estimatedcost: 0,
	  fileLength: '',
	  funding: ''
    };
  }

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  };

  handleTotalstudentsChange = (event) => {
    this.setState({ totalstudents: event.target.value });
  };

  handleEstimatedcostChange = (event) => {
    this.setState({ estimatedcost: event.target.value });
  };

  handleDropdownChange = (event) => {
    this.setState({ selecttype: event.target.value });
  };

  handleDropdownChange1 = (event) => {
    this.setState({ funding: event.target.value });
  };
  
  onFileChange = (event) => {
		// this.setState({
		// 	upload_photo: event.target.files[0]
    // });
    
    this.setState({fileLength: event.target.files.length});

    if(event.target.files.length < 3 ){
      for(let i = 0; i < event.target.files.length; i++) {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
        // this.setState({
        //   upload_photo: event.target.files[i]
        // });
      }
    }
  }
  
 
 
validate = () => {
  const errors = {};
	if(this.state.location === '')
	{
	  errors.location = 'Location is required';
    }
  // if(this.state.totalstudents === '')
  // {
	  // errors.totalstudents = 'Total students is required';
  // }
  // if(this.state.estimatedcost === '')
  // {
    // errors.estimatedcost = "Select estimated cost";
  // }
  
   if(this.state.fileLength > 2)
    {
      errors.fileLength = "Maximum 2 files are allowed to upload";
    }
  
   return Object.keys(errors).length === 0 ? null : errors;
};

  onSubmit = (e) => {
    e.preventDefault();

   
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;


    /*const products = {
      location: this.state.location,
      totalstudents: this.state.totalstudents,
      funding: this.state.funding,
      selecttype: this.state.selecttype,
      estimatedcost: this.state.estimatedcost,
    }; */
	
	
	
  	this.state.formData.append("location", this.state.location);
    // formData.append("upload_photo", this.state.upload_photo, this.state.upload_photo.name);
    this.state.formData.append("totalstudents", this.state.totalstudents);
    this.state.formData.append("funding", this.state.funding);
    this.state.formData.append("selecttype", this.state.selecttype);
    this.state.formData.append("estimatedcost", this.state.estimatedcost);

    submitForm("multipart/form-data", this.state.formData, (msg) => console.log(msg), 'university');

    //console.log(products);

    // const post = axios.post('https://formeeadmin.bicsglobal.com/storeaboutus', products).then((response) => {
     alert("Success");
    // //this.props.history.push('/clients/view');
    // //toast.success("Updated successfully!..");
    // });
	
    /*this.setState({ location: '' });
    this.setState({ totalstudents: '' });
    this.setState({ funding: '' });
    this.setState({ selecttype: '' }); 
	this.setState({ upload_photo: '' });
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() }); */
   
  };

  render() {
	const { errors } = this.state;
	console.log(this.state.errors);
    return (
      <div className="animated fadeIn gray-bg-300">
        <header className="app-header secondary-app-header">
         <div className="university-secondary-header">
          <SecondaryHeader></SecondaryHeader>   
        </div>
        </header>
        <div className="container-fluid px-0">
			<div className="top-section">
				<div className="img-block"> <img src={ProfileBanner} alt="" /></div>
				<div className="container">
					<div className="content-block row mx-0 col-md-5">
						<div className="col-md-4"> <img src={deakinlogo} alt="" /> </div>
						<div className="col-md-8 cont-rgt">
							<h5 className="cont-rgt-head">Deakin University <span className="heart-icon"> <img src={heart} alt="" /></span> </h5>
							<div className="mt-2 cont-rgt-contry"> <span className="pr-1"> <img src={contlogo} alt="" /></span>Australia</div>
							<div className="mt-2 cont-rgt-grap"> <span className="pr-1"> <img src={bargraph} alt="" /></span>The World Rankings : 301 </div>
							<div className="mt-2 row px-3 mx-0">
								<div className="icon-align row mr-5"><div className="pr-1"> <img src={eyeicon} alt="" /></div><div>23234<br/>Views</div></div>
								<div className="icon-align row mr-5"><div className="pr-1"> <img src={favourites} alt="" /></div><div>23234<br/>Favourites</div></div>
								<div className="icon-align"><div> <img src={rating} alt="" /></div><div>Reviews (25)</div></div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			<div className="container-fluid profile-viewus px-0">
				<div className="container">
			<div className="menu-section">
			<ul className="nav nav-tabs filter-btn" id="" role="">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#About1"
                    role="tab"
                  >
                   FILLTER
                  </a>
                </li>  
              </ul>
			<ul className="nav nav-tabs mb-5" id="ProfileTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#About1"
                    role="tab"
                  >
                   about
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Facility1"
                    role="tab"
                  >
                    Facilities
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Campus1"
                    role="tab"
                  >
                    Campuses
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Entry1"
                    role="tab"
                  >
                    Entry Requirements
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Contactus1"
                    role="tab"
                  >
                  Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Review1"
                    role="tab"
                  >
                    Reviews
                  </a>
                </li>
                
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="About1" role="tabpanel">
                  <div className="col-md-12 about-section mx-0 px-0 row">
					<a className="col-12 backarrow mt-3"><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a>
					 <h1 className="col-md-12 about-title mt-4 mb-3"> ABOUT US </h1>
					 <div className="col-md-6 about-left-block">
						<div className="col-md-12 px-0">
							<table className="table">
							  <tbody>
								<tr>
								  <th scope="col">First</th>
								  <td>Mark</td>
								</tr>
								<tr>
								  <th scope="col">First</th>
								  <td>Mark</td>
								</tr>
								<tr>
								  <th scope="col">First</th>
								  <td>Mark</td>
								</tr>
								<tr>
								  <th scope="col">First</th>
								  <td>Mark</td>
								</tr>
							  </tbody>
							</table>
						</div>
						<div className="col-md-12 left-cont-heg px-0">
							<p><b>Lorem ipsum dolor si t amet , consectetur adipiscing el i t . Al iquam consequat nibh interdum volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.</b></p>
							<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
						</div>
						
					 </div>
					 <div className="col-md-6 about-right-block px-0 text-right">
						<img src={buliding} alt="" />
					 </div>
					 <div className="col-md-12 fullwidth-banner px-0">
						<div className="">
							<img src={fullimg} alt="" />
						</div>
					 </div>
					 <div className="col-md-12 about-facility px-0">
						<div className="col-md-8 mx-auto text-center">
							<h2 className="mb-4">Facilities</h2>
							<p>s the wor ld shi f ts increasingly towards digi tal , Deakin Universi ty invests in
state-of-the-ar t learning faci l i t ies and tools. I ts latest technology helps equip students
wi th the knowledge and ski l ls requi red be successful for the jobs of tomor row.</p>


<p>Deakin students who choose to study engineer ing wi l l benefit f rom i ts cut t ing-edge
digi tal manufactur ing and 3D pr int ing in the Cent re for Advanced Design in Engineer ing
Training (CADET) .
 Deakin students choosing to study media wi l l enjoy the oppor tuni ty to
refine thei r ski l ls in i ts indust ry-standard newsroom and creat ive media lab.

Nursing students can pract ice t reat ing pat ients in Deakin</p>
						</div>
					 </div>
					 <div className="col-md-12 about-uni-section mt-5 row mx-0">
						<div className="col-md-6 about-uni-left px-0">
							<h5>Our Facilities</h5>
							<h2>University Facilities</h2>
							<p>Your Dictumst lacinia diam, nunc, rhoncus cursus
habitasse pretium, tortor quis. Lorem euismod nibh urna
nec.Lorem ipsum dolor sit amet, consectetur adipiscing
elit. Aliquam consequat nibh interdum volutpat mauris
vitae habitant. Nisi felis semper eget neque. Dictumst
lacinia diam, nunc, rhoncus cursus habitasse pretium,
tortor quis. Lorem euismod nibh urna nec.</p>
<p>Your Dictumst lacinia diam, nunc, rhoncus cursus
habitasse pretium, tortor quis. Lorem euismod nibh urna
nec.Lorem ipsum dolor sit amet, consectetur adipiscing
elit. Aliquam consequat nibh interdum volutpat mauris
vitae habitant. Nisi felis semper eget neque. Dictumst
lacinia diam, nunc, rhoncus cursus habitasse pretium,
tortor quis. Lorem euismod nibh urna nec.</p>
						</div>
						 <div className="col-md-6 about-uni-right px-0 text-right">
							<img src={universityimg} alt="" />
						 </div>
					 </div>
					 <div className="col-md-12 about-stud-left mt-5 row mx-0">
						<div className="col-md-6 px-0">
							<h5>Our Facilities</h5>
							<h2>Student Facilities</h2>
							<p>Your Dictumst lacinia diam, nunc, rhoncus cursus
habitasse pretium, tortor quis. Lorem euismod nibh urna
nec.Lorem ipsum dolor sit amet, consectetur adipiscing
elit. Aliquam consequat nibh interdum volutpat mauris
vitae habitant. Nisi felis semper eget neque. Dictumst
lacinia diam, nunc, rhoncus cursus habitasse pretium,
tortor quis. Lorem euismod nibh urna nec.</p>
<p>Your Dictumst lacinia diam, nunc, rhoncus cursus
habitasse pretium, tortor quis. Lorem euismod nibh urna
nec.Lorem ipsum dolor sit amet, consectetur adipiscing
elit. Aliquam consequat nibh interdum volutpat mauris
vitae habitant. Nisi felis semper eget neque. Dictumst
lacinia diam, nunc, rhoncus cursus habitasse pretium,
tortor quis. Lorem euismod nibh urna nec.</p>

						</div>
						 <div className="col-md-6 about-stud-right px-0 text-right">
							<img src={studentimg} alt="" />
						 </div>
					 </div>
					 
					 <div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0">
						<div className="col-md-6 px-0 stud-hub-left">
							<img src={studenthub} alt="" />
						 </div>
						<div className="col-md-6 stud-hub-right">
							<h2>Student Hub</h2>
							<p>Your Dictumst lacinia diam, nunc, rhoncus cursus
habitasse pretium, tortor quis. Lorem euismod nibh urna
nec.Lorem ipsum dolor sit amet, consectetur adipiscing
elit. Aliquam consequat nibh interdum volutpat mauris
vitae habitant. Nisi felis semper eget neque. Dictumst
lacinia diam, nunc, rhoncus cursus habitasse pretium,
tortor quis. Lorem euismod nibh urna nec.</p>
<p>Your Dictumst lacinia diam, nunc, rhoncus cursus
habitasse pretium, tortor quis. Lorem euismod nibh urna
nec.Lorem ipsum dolor sit amet, consectetur adipiscing
elit. Aliquam consequat nibh interdum volutpat mauris
vitae habitant. Nisi felis urna nec.</p>
<p>Your Dictumst lacinia diam, nunc, rhoncus cursus
habitasse pretium, tortor quis. Lorem euismod nibh urna
nec.Lorem ipsum dolor sit amet</p>
						</div>
						 
					 </div>
					 
				  </div>
				  
				  
                  </div>
                  <div className="tab-pane" id="Facility1" role="tabpanel">
				  <div className="col-md-12 about-section mx-0 px-0 row">
					<a className="col-12 backarrow mt-3"><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a>
					 <h1 className="col-md-12 about-title mt-4 mb-3"> ABOUT US1 </h1>
					 <div className="col-md-6 about-left-block">
						<div className="col-md-12 px-0">
							
						</div>
						<div className="col-md-12 left-cont-heg px-0">
							<p><b>Lorem ipsum dolor si t amet , consectetur adipiscing el i t . Al iquam consequat nibh interdum volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.</b></p>
							<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
						</div>
						
					 </div>
					 <div className="col-md-6 about-right-block px-0 text-right">
						<img src={buliding} alt="" />
					 </div>
					 
					
					
					 
					 
					 
					 
				  </div>
                  </div>
                  <div className="tab-pane" id="Campus1" role="tabpanel">
						<div className="col-md-12 about-section mx-0 px-0 row">
					<a className="col-12 backarrow mt-3"><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a>
					 <h1 className="col-md-12 about-title mt-4 mb-3"> ABOUT US2 </h1>
					 <div className="col-md-6 about-left-block">
						<div className="col-md-12 px-0">
							
						</div>
						<div className="col-md-12 left-cont-heg px-0">
							<p><b>Lorem ipsum dolor si t amet , consectetur adipiscing el i t . Al iquam consequat nibh interdum volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.</b></p>
							<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
						</div>
						
					 </div>
					 <div className="col-md-6 about-right-block px-0 text-right">
						<img src={buliding} alt="" />
					 </div>
					 
					
					
					 
					 
					 
					 
				  </div>
                  </div>
                  <div className="tab-pane" id="Entry1" role="tabpanel">
					<div className="col-md-12 about-section mx-0 px-0 row">
					<a className="col-12 backarrow mt-3"><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a>
					 <h1 className="col-md-12 about-title mt-4 mb-3"> ABOUT US3 </h1>
					 <div className="col-md-6 about-left-block">
						<div className="col-md-12 px-0">
							
						</div>
						<div className="col-md-12 left-cont-heg px-0">
							<p><b>Lorem ipsum dolor si t amet , consectetur adipiscing el i t . Al iquam consequat nibh interdum volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.</b></p>
							<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
						</div>
						
					 </div>
					 <div className="col-md-6 about-right-block px-0 text-right">
						<img src={buliding} alt="" />
					 </div>
					 
					
					
					 
					 
					 
					 
				  </div>
                  </div>
                  <div className="tab-pane" id="Contactus1" role="tabpanel">
						<div className="col-md-12 about-section mx-0 px-0 row">
					<a className="col-12 backarrow mt-3"><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a>
					 <h1 className="col-md-12 about-title mt-4 mb-3"> ABOUT US4 </h1>
					 <div className="col-md-6 about-left-block">
						<div className="col-md-12 px-0">
							
						</div>
						<div className="col-md-12 left-cont-heg px-0">
							<p><b>Lorem ipsum dolor si t amet , consectetur adipiscing el i t . Al iquam consequat nibh interdum volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.</b></p>
							<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
						</div>
						
					 </div>
					 <div className="col-md-6 about-right-block px-0 text-right">
						<img src={buliding} alt="" />
					 </div>
					 
					
					
					 
					 
					 
					 
				  </div>
                  </div>
                 
                  <div className="tab-pane" id="Review1" role="tabpanel">
					<div className="col-md-12 about-section mx-0 px-0 row">
					<a className="col-12 backarrow mt-3"><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a>
					 <h1 className="col-md-12 about-title mt-4 mb-3"> ABOUT US5 </h1>
					 <div className="col-md-6 about-left-block">
						<div className="col-md-12 px-0">
							
						</div>
						<div className="col-md-12 left-cont-heg px-0">
							<p><b>Lorem ipsum dolor si t amet , consectetur adipiscing el i t . Al iquam consequat nibh interdum volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.</b></p>
							<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
<p>Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet ,
consectetur adipiscing el i t . Al iquam consequat nibh interdum
volutpat maur is vi tae habi tant . Nisi fel is semper eget neque.
Dictumst lacinia diam, nunc, rhoncus cursus habi tasse pret ium,
tor tor quis. Lorem euismod nibh urna nec. Nisi fel is semper
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec. er
eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
habi tasse pret ium, tor tor quis. Lorem euismod nibh urna nec.
Nisi fel is semper eget neque. Dictumst lacinia diam, nunc </p>
						</div>
						
					 </div>
					 <div className="col-md-6 about-right-block px-0 text-right">
						<img src={buliding} alt="" />
					 </div>
					 
					
					
					 
					 
					 
					 
				  </div>
                  </div>
              </div>
      </div>
				</div>
			</div>
			
			
			
			
        </div>
      </div>
    );
  }
}

export default Viewus;
