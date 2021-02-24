import React, { Component } from "react";
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu,
  DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon,
  InputGroupButtonDropdown, InputGroupText, Label, Row, Container, TabContent, TabPane, Nav,
  NavItem, NavLink, CardTitle, CardText, CardDeck,
  CardSubtitle } from "reactstrap";
import axios from 'axios';
import config from '../../config.json';

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
import Phoneicon from "../../assets/img/university/phone-icon.svg";
import Calendaricon from "../../assets/img/university/calendar-icon.svg";
import $ from 'jquery';

var baseurl = `${config.baseurl}`;

class Viewus extends Component {
  constructor(props) {
    super(props);

    //this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        about: [],
        facility: [],
        facilityuniversity: [],
        facilitystudent: [],
        //campusmain: [],
        //campussub: [],
		campus: [],
		aboutsub:[],
		facilitysub:[],
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

		axios.get(baseurl+'/get_universitydetails/'+localStorage.getItem('universityid')).then(response => 
		{
      		console.log(response);
			//alert(response.data.about[0].id);
      		this.setState({
				about: response.data.about,
				facility: response.data.facility,
				facilityuniversity: response.data.facilityuniversity,
				facilitystudent: response.data.facilitystudent,
				//campusmain: response.data.campusmain,
				//campussub: response.data.campussub,
				aboutsub: response.data.aboutsub,
				campus: response.data.campus,
				facilitysub: response.data.facilitysub,
      		});
      		//console.log(this.state.about[0].id);
    	})
    
  }

    componentDidMount(){
		$(".facility-link").click(function(){   //id of the link which is being clicked
			$('html, body').animate({
				   scrollTop: $("#Facility1").offset().top - 170   //id of div to be scrolled
			}, 1000);
	  });

	  $(".campus-link").click(function(){   //id of the link which is being clicked
		$('html, body').animate({
			   scrollTop: $("#Campus1").offset().top - 170   //id of div to be scrolled
		}, 1000);
  });

  $(".contact-link").click(function(){   //id of the link which is being clicked
	$('html, body').animate({
		   scrollTop: $("#Contactus1").offset().top - 170   //id of div to be scrolled
	}, 1000);
});

	}
 
 
  render() {
  const { errors } = this.state;
		//alert();
  const imgpath = `${config.baseurl}`;

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
						
							<h5 className="cont-rgt-head">{( (this.state.about != null && this.state.about.institute_name != '') ? (<span>{this.state.about.institute_name}</span>):(<span></span>) )} <span className="heart-icon"> <img src={heart} alt="" /></span> </h5>
							<div className="mt-2 cont-rgt-contry"> <span className="pr-1"> <img src={contlogo} alt="" /></span> 
							{( (this.state.about != null && this.state.about.country_name != '') ? (<span>{this.state.about.country_name}</span>):(<span></span>) )} 
							</div>
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
                  <a className="nav-link" data-toggle="tab" href="#About1" role="tab" > FILLTER </a>
                </li>  
              </ul>

							<ul className="nav nav-tabs mb-5" id="ProfileTab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#About1" role="tab" > about </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link facility-link" data-toggle="tab" href="#Facility1" role="tab" > Facilities</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link campus-link" data-toggle="tab" href="#Campus1" role="tab">Campuses </a>
                </li>
                {/*<li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#Entry1" role="tab" > Entry Requirements</a>
                </li>*/}
                <li className="nav-item">
                  <a className="nav-link contact-link" data-toggle="tab" href="#Contactus1" role="tab" > Contact </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#Review1" role="tab" > Reviews </a>
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
								  <td>{( (this.state.about != null && this.state.about.location != '') ? (<span>{this.state.about.location}</span>):(<span></span>) )}</td>
								</tr>
								<tr>
								  <th scope="col">FUNDING TYPE</th>
								  <td>{( (this.state.about != null && this.state.about.funding_type != '') ? (<span>{this.state.about.funding_type}</span>):(<span></span>) )}</td>
								</tr>
								<tr>
								  <th scope="col">NO OF STUDENTS</th>
								  <td>{( (this.state.about != null && this.state.about.no_of_students != '') ? (<span>{this.state.about.no_of_students}</span>):(<span></span>) )}</td>
								</tr>
								<tr>
								  <th scope="col">ESTIMATE LIVING COST</th>
								  <td>
											{( (this.state.about != null && this.state.about.estimate_livingcost != '') ? (<span>{this.state.about.estimate_livingcost}</span>):(<span></span>) )}

											{( (this.state.about != null && this.state.about.estimate_livingperiod != '') ? (<span> / {this.state.about.estimate_livingperiod}</span>):(<span></span>) )}
									</td>
								</tr>
							  </tbody>
							</table>
						</div>
						<div className="col-md-12 left-cont-heg px-0">
								{( (this.state.about != null && this.state.about.description != '') ? (<p class="subdesc">{this.state.about.description}</p>):(<p></p>) )}
						
						</div>
						
					 </div>
					 <div className="col-md-6 about-right-block px-0 text-right">
						{/* <img src={buliding} alt="" /> */}
						
						{( (this.state.about != null && this.state.about.filename != '' && this.state.about.filename != null) ? (<img src={imgpath+this.state.about.filename} width="450" height="604" />):(<p></p>) )}
            
					 </div>

					 {/* about subsection */}
					 {this.state.aboutsub.map(aboutsub => (

						
						<div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0">

						<div className="col-md-6 px-0 stud-hub-left">
							
							{(aboutsub.layout == 'right' ? (<p class="subdesc"><h2>{aboutsub.heading}</h2>{aboutsub.description}</p>):(<img src={imgpath+aboutsub.filename} width="555" height="527" alt="" />) )}
						</div>

						<div className="col-md-6 stud-hub-right0">
							{(aboutsub.layout == 'right' ? (<img src={imgpath+aboutsub.filename} width="555" height="527" alt="" />):(<p class="subdesc"><h2>{aboutsub.heading}</h2>{aboutsub.description}</p>) )}
						</div>

							
						</div>
						) ) }
					 {/* about subsection */}

					 <div className="col-md-12 fullwidth-banner px-0">
						<div className="">
						{( (this.state.facility != null && this.state.facility.filename != '') ? (<img src={imgpath+this.state.facility.filename} width="1170" height="365" />):(<p></p>) )}
            
              
						</div>
					 </div>

					 <div id="Facility1" className="col-md-12 about-facility px-0">
						<div className="col-md-8 mx-auto text-center">
							<h2 className="mb-4">Facilities</h2>
							{( (this.state.facility != null && this.state.facility.description != '') ? (<p class="subdesc">{this.state.facility.description}</p>):(<p></p>) )}
							
						</div>
					 </div>
					 {/* <div className="col-md-12 about-uni-section mt-5 row mx-0">
						<div className="col-md-6 about-uni-left px-0">
							<h5>Our Facilities</h5>
							<h2>University Facilities</h2>
							{( (this.state.facilityuniversity != null && this.state.facilityuniversity.description != '') ? (<p class="subdesc">{this.state.facilityuniversity.description}</p>):(<p></p>) )}
							
						</div>
						 <div className="col-md-6 about-uni-right px-0 text-right">

								 {( (this.state.facilityuniversity != null && this.state.facilityuniversity.filename != '') ? (<img src={imgpath+this.state.facilityuniversity.filename}  width="415" height="394" alt="" />):(<p></p>) )}
								 
							
						 </div>
					 </div>
					 <div className="col-md-12 about-stud-left mt-5 row mx-0">
						<div className="col-md-6 px-0">
							<h5>Our Facilities</h5>
							<h2>Student Facilities</h2>
							{( (this.state.facilitystudent != null && this.state.facilitystudent.description != '') ? (<p class="subdesc">{this.state.facilitystudent.description}</p>):(<p></p>) )}
							

						</div>
						 <div className="col-md-6 about-stud-right px-0 text-right">
						 {( (this.state.facilitystudent != null && this.state.facilitystudent.filename != '') ? (<img src={imgpath+this.state.facilitystudent.filename}  width="415" height="394" alt="" />):(<p></p>) )}

             
						 </div>
					 </div>   */}
  

					 {/* facility subsection */}
					 {this.state.facilitysub.map(facilitysub => (

						
					<div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0">

					<div className="col-md-6 px-0 stud-hub-left">
						
						{(facilitysub.layout == 'right' ? (<p class="subdesc"><h2>{facilitysub.heading}</h2>{facilitysub.description}</p>):(<img src={imgpath+facilitysub.filename} width="415" height="394" alt="" />) )}
					</div>

					<div className="col-md-6 stud-hub-right0">
						{(facilitysub.layout == 'right' ? (<img src={imgpath+facilitysub.filename} width="555" height="527" alt="" />):(<p class="subdesc"><h2>{facilitysub.heading}</h2>{facilitysub.description}</p>) )}
					</div>

						
					</div>
					) ) }
					{/* facility subsection */}

					 
					 
					 
					 <div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0" id="Campus1">
           				<h1 className="col-md-12 about-title mt-4 mb-3 campustitle"> CAMPUSES </h1>

						{/*<div className="col-md-6 px-0 stud-hub-left">
						{( (this.state.campusmain != null && this.state.campusmain.filename != '') ? (<img src={imgpath+this.state.campusmain.filename} width="555" height="527" alt="" />):(<p></p>) )}	
						</div>

						<div className="col-md-6 stud-hub-right0">
						{( (this.state.campusmain != null && this.state.campusmain.description != '') ? (<p>{this.state.campusmain.description}</p>):(<p></p>) )}
						</div>*/}

						{this.state.campus.map(campus => (

							<div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0" key={campus.id}>

								<div className="col-md-6 px-0 stud-hub-left">
								{(campus.layout == 'right' ? (<p class="subdesc">{campus.description}</p>):(<img src={imgpath+campus.filename} width="555" height="527" alt="" />) )}
								</div>

								<div className="col-md-6 stud-hub-right0">
								{(campus.layout == 'right' ? (<img src={imgpath+campus.filename} width="555" height="527" alt="" />):(<p class="subdesc">{campus.description}</p>) )}
								</div>

							</div>
						) ) }
            

						 
					 </div>

           {/* Campus sub section */}

					
          {/* Campus sub section */}

					{/*
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
						*/}
					 {/* contact us */}
					 <div id="Contactus1" className="uni-contact-box w-100">
							<div className="row">
									<div className="col-12 my-3">
									<h1 className="contact-title">contact us</h1>
									</div>

									<div className="col-12 mb-3">
										<p className="contact-letter">
											General enquiries and campus contacts
										</p>
									</div>
							</div>

								{this.state.campus.map(campus => (
									<div className="row">
										<div className="col-12">
											<div className="contact-header-title">
												<h3>{campus.location}</h3>
											</div>
										</div>
										<div className="col-12 my-4">
											<p className="campus-name">
											{campus.location}
											</p>
										</div>
										<div className="col-md-3 col-sm-3 col-lg-3 contact-block">
											<Card className="contact-card">
												<CardBody>
													<CardTitle>Opening Hours</CardTitle>
													<CardText>
														8.30 am–5 pm,
														<br /> Mon to Fri
													</CardText>
													<CardText>
														<img
															src={Phoneicon}
															alt="home-icon"
															className="uni-icon pr-2"
														/>{" "}
														+61 3 9244 6100
													</CardText>
												</CardBody>
											</Card>
										</div>
										<div className="col-md-3 col-sm-3 col-lg-3 contact-block">
											<Card className="contact-card">
												<CardBody>
													<CardTitle>Street Address</CardTitle>
													<CardText>
														{campus.address}
													</CardText>
												</CardBody>
											</Card>
										</div>
										<div className="col-md-3 col-sm-3 col-lg-3 contact-block">
											<Card className="contact-card">
												<CardBody>
													<CardTitle>Mailing Address</CardTitle>
													<CardText>
													{campus.address}
													</CardText>
												</CardBody>
											</Card>
										</div>
										<div className="col-md-3 col-sm-3 col-lg-3 contact-block">
											<Card className="contact-card">
												<CardBody>
											
													<CardText>
													<Button color="primary" className="contact-btn-1">Contact us</Button>
													</CardText>
													<CardText>
													<Button color="primary" className="contact-btn-1"> <img
															src={Calendaricon}
															alt="home-icon"
															className="uni-icon pr-2"
														/>{" "}request meeting</Button> 
													</CardText>
												</CardBody>
											</Card>
										</div>
									</div>
								) ) }
            </div>
					 {/* conatct us */}


					 
				  </div>
				  
				  
                  </div>


                  {/*<div className="tab-pane" id="Facility1" role="tabpanel0">
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
                  </div>*/}
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
