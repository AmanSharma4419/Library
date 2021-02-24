import React, { Component } from "react";
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu,
  DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon,
  InputGroupButtonDropdown, InputGroupText, Label, Row, Container, TabContent, TabPane, Nav,
  NavItem, NavLink } from "reactstrap";
import axios from 'axios';


import SecondaryHeader from './../SecondaryHeader/SecondaryHeader';
/*
import Campuses from './../Pages/Campuses/Campuses';

import Facilities from './../Facilities/Facilities';

import Entryrequirement from './../Pages/Entryrequirement/Entryrequirement';

import Universitycontact from './../Universitycontact/Universitycontact';
import Leftmenu from '../../assets/img/left-menu.jpg';
import { Addsubsection } from "../Pages/Campuses/index";

import Studentfacilities from './../Studentfacilities/Studentfacilities';
import Universityfacilities from './../Universityfacilities/Universityfacilities';
*/
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



class Viewus extends Component {
  constructor(props) {
    super(props);

    //this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        about: [],
        facility: [],
        facilityuniversity: [],
        facilitystudent: [],
        campusmain: [],
        campussub: [],
        contacts: [],
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

		//axios.get('https://formeeadmin.bicsglobal.com/get_universitydetails/'+localStorage.getItem('universityid')).then(response => 
		axios.get('https://formeeadmin.bicsglobal.com/get_universitydetails/53').then(response => 
		{
      console.log(response);
			//alert(response.data.about[0].id);
      this.setState({
          about: response.data.about,
          facility: response.data.facility,
          facilityuniversity: response.data.facilityuniversity,
          facilitystudent: response.data.facilitystudent,
          campusmain: response.data.campusmain,
          campussub: response.data.campussub,
          contacts: response.data.contacts
      });
      //console.log(this.state.about[0].id);
    })
    
  }

    
 
 
  render() {
  const { errors } = this.state;
		//alert();
  const imgpath = "https://formeeadmin.bicsglobal.com/";

  //console.log(this.state.about[0]);
  //alert(this.state.facility.description);
    
	//console.log(this.state.errors);
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
							<h5 className="cont-rgt-head">{this.state.about.map(univ => ( <span>{univ.institute_name}</span> ))} <span className="heart-icon"> <img src={heart} alt="" /></span> </h5>
							<div className="mt-2 cont-rgt-contry"> <span className="pr-1"> <img src={contlogo} alt="" /></span>{this.state.about.map(univ => ( <span>{univ.country_name}</span> ))}</div>
							<div className="mt-2 cont-rgt-grap"> <span className="pr-1"> <img src={bargraph} alt="" /></span>The World Rankings : 0 </div>
							<div className="mt-2 row px-3 mx-0">
								<div className="icon-align row mr-5"><div className="pr-1"> <img src={eyeicon} alt="" /></div><div>0<br/>Views</div></div>
								<div className="icon-align row mr-5"><div className="pr-1"> <img src={favourites} alt="" /></div><div>0<br/>Favourites</div></div>
								<div className="icon-align"><div> <img src={rating} alt="" /></div><div>Reviews (0)</div></div>
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
                {/*<li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Entry1"
                    role="tab"
                  >
                    Entry Requirements
                  </a>
                </li>*/}
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
					<a className="col-12 backarrow mt-3" href="#/profile"><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a>
					 <h1 className="col-md-12 about-title mt-4 mb-3"> ABOUT US </h1>
					 <div className="col-md-6 about-left-block">
						<div className="col-md-12 px-0">
							<table className="table">
							  <tbody>
								<tr>
								  <th scope="col">LOCATION</th>
								  <td>{this.state.about.map(univ => ( <span>{univ.location}</span> ))}</td>
								</tr>
								<tr>
								  <th scope="col">FUNDING TYPE</th>
								  <td>{this.state.about.map(univ => ( <span>{univ.funding_type}</span> ))}</td>
								</tr>
								<tr>
								  <th scope="col">NO OF STUDENTS</th>
								  <td>{this.state.about.map(univ => ( <span>{univ.no_of_students}</span> ))}</td>
								</tr>
								<tr>
								  <th scope="col">ESTIMATE LIVING COST</th>
								  <td>{this.state.about.map(univ => ( <span>{univ.estimate_livingcost} / {univ.estimate_livingperiod}</span> ))}</td>
								</tr>
							  </tbody>
							</table>
						</div>
						<div className="col-md-12 left-cont-heg px-0">

                {this.state.about.map(univ => ( <p>{univ.description}</p> ))}
						
						</div>
						
					 </div>
					 <div className="col-md-6 about-right-block px-0 text-right">
            {/* <img src={buliding} alt="" /> */}
            {this.state.about.map(univ => ( <img src={imgpath+univ.filename} width="450" height="604" /> ))}
					 </div>

					 <div className="col-md-12 fullwidth-banner px-0">
						<div className="">
            <img src={imgpath+this.state.facility.filename} width="1170" height="365" alt="" />
              
						</div>
					 </div>

					 <div className="col-md-12 about-facility px-0">
						<div className="col-md-8 mx-auto text-center">
							<h2 className="mb-4">Facilities</h2>
							<p>{this.state.facility.description}</p>
						</div>
					 </div>
					 <div className="col-md-12 about-uni-section mt-5 row mx-0">
						<div className="col-md-6 about-uni-left px-0">
							<h5>Our Facilities</h5>
							<h2>University Facilities</h2>
							<p>{this.state.facilityuniversity.description}</p>
						</div>
						 <div className="col-md-6 about-uni-right px-0 text-right">
							<img src={imgpath+this.state.facilityuniversity.filename}  width="415" height="394" alt="" />
						 </div>
					 </div>
					 <div className="col-md-12 about-stud-left mt-5 row mx-0">
						<div className="col-md-6 px-0">
							<h5>Our Facilities</h5>
							<h2>Student Facilities</h2>
							<p>{this.state.facilitystudent.description}</p>

						</div>
						 <div className="col-md-6 about-stud-right px-0 text-right">
             <img src={imgpath+this.state.facilitystudent.filename}  width="415" height="394" alt="" />
						 </div>
					 </div>
					 
					 <div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0">
           <h1 className="col-md-12 about-title mt-4 mb-3 campustitle"> CAMPUSES </h1>

						<div className="col-md-6 px-0 stud-hub-left">
							<img src={imgpath+this.state.campusmain.filename} width="555" height="527" alt="" />
						</div>

						<div className="col-md-6 stud-hub-right0">
							<p>{this.state.campusmain.description}</p>
						</div>
            

						 
					 </div>

           {/* Campus sub section */}

          {/* {this.state.campussub.map( ( {id, filename , description, layout} ) => { return */}
          {this.state.campussub.map(campussub => (

           <div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0" key={campussub.id}>
           
           

						<div className="col-md-6 px-0 stud-hub-left">
              {(campussub.layout == 'right' ? (<p>{campussub.description}</p>):(<img src={imgpath+campussub.filename} width="555" height="527" alt="" />) )}
							{/*<img src={imgpath+filename} width="555" height="527" alt="" /> */}
						</div>

						<div className="col-md-6 stud-hub-right0">
              {(campussub.layout == 'right' ? (<img src={imgpath+campussub.filename} width="555" height="527" alt="" />):(<p>{campussub.description}</p>) )}
							{/*<p>{description}</p>*/}
						</div>


						 
					 </div>
           ) ) }
          {/* }) }*/}

          {/* Campus sub section */}


          <div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0">
           <h1 className="col-md-12 about-title mt-4 mb-3"> CONTACT US </h1>
           <span>General enquiries and campus contacts</span>

            {this.state.campussub.map(campussub => (
            <div class="col-md-12">
              <div className="col-md-6">
                <p>{campussub.heading}</p>
                <p>{campussub.sub_heading}</p>
              </div>
            </div>
            ) ) }

						 
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
