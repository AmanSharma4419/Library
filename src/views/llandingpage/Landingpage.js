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
  NavLink,
} from "reactstrap";

import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import SecondaryHeaderProgram from './../SecondaryHeaderProgram/index';
import logo from '../../assets/img/university-sub-logo.svg';
import Phoneicon from '../../assets/img/university/phone-icon.svg';
import Mailhicon from '../../assets/img/university/mail-high-icon.svg';
import Locateicon from '../../assets/img/university/locate-icon.svg';
import Greenicon from '../../assets/img/university/green-tick-icon.svg';
import Ratingicon from '../../assets/img/university/rating-icon.svg';
import add_icon from '../../assets/img/add_icon.png';


class Landingpage extends Component {

  constructor(props) {
    super(props);

	this.onSubmit = this.onSubmit.bind(this);
   this.state = {
	  cat :[],
	  fac :[],
	  dep : [],
	  cou : [],
	  id :'',
	  heading :'',
	  sub_heading : '',
	  description : '',
	   schemas: [],
	   schemas_id: [],
    selectedTeam: "",
    validationError: "",
	planets: [],
	  errors:{}
    };
	
	
	var param = localStorage.getItem('universityid');
	axios.get('https://formeeadmin.bicsglobal.com/get_landingpagedetails/'+param).then(response => {
		console.log(response);
         this.setState({
                   cat: response.data.cat,
                   cou: response.data.cou,
				   fac: response.data.fac,
                   dep: response.data.dep
               });
        })
	
		
  }
  
 

  
handleHeadingChange = event => {
	this.setState({heading: event.target.value});
}

handleSubHeadingChange = event => {
	this.setState({sub_heading: event.target.value});
}

handleDescriptionChange = event => {
	this.setState({description: event.target.value});
}
validate = () => {
     const errors = {};
	 if(this.state.heading.trim() === '')
		{
			errors.heading = 'Heading is required';
		}
		if(this.state.sub_heading.trim() === '')
		{
			errors.sub_heading = 'Sub Heading is required';
		}
		if(this.state.description.trim() === '')
		{
			errors.description = 'Description is required';
		}
   	 return Object.keys(errors).length === 0 ? null : errors;
};

handleClick = param => e => {
	 this.props.history.push({
  pathname: '/program',
  data: param // your data array of objects
})
}

 onSubmit = e => {
   e.preventDefault()
   
	const errors = this.validate();
	this.setState({ errors });
	if (errors) return;
   
    const products = {
           
			  sub_heading : this.state.sub_heading,
              heading : this.state.heading,
              description : this.state.description,
              program_coordinator_id : 1,
              university_id : 1
        
		}
		
		  let uri = 'https://formeeadmin.bicsglobal.com/store_category';
       // alert(" successfully !..");
      const post = axios.post(uri, products).then((response) => {
      if(response.data.status_code =="200")
	  {
		  alert(response.data.message);
		  window.location.reload();
	  }
	  else
	  {
		alert(response.data.message);  
	  }
      });


		
	this.setState({ heading: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description: '' });
	this.setState({ errors: '' }); 
	
	
	}
	componentDidMount() {
    
  }
	
	render() {
	const { errors } = this.state;
	console.log(this.state.schemas);
    return (
      <div className="category-box" >
		<header className="app-header secondary-app-header">
         <div className="university-secondary-header">
          <SecondaryHeaderProgram></SecondaryHeaderProgram>
        </div>
        </header>
        <Container>
          <Row className="uni-dash-section">
    <li onClick={this.handleClick('d')}> hi</li>
            <Col xs="9">
                  <div className="col-md-12 pt-4 row uni-dashboard-left">
					<div className="col-md-3 text-center">
						<h6 className="text-center">CATEGORIES</h6>
						<ul>
						{this.state.cat.map((schema, index) => ( 
							<li>{ schema }</li>		
						))}							
						</ul>
						<ul>
						<li className="text-center"><a onClick={this.handleClick('category')}><img height='10' src={add_icon}></img></a></li>
						</ul>
					</div>
					<div className="col-md-3 text-center">
						<h6 className="text-center">FACULTIES</h6>
						<ul>
							{this.state.fac.map((schema, index) => ( 
							<li>{ schema }</li>		
						))}																
						</ul>
						<ul>
						<li className="text-center"><a onClick={this.handleClick('faculty')}><img height='10' src={add_icon}></img></a></li>
						</ul>
					 </div>
					 <div className="col-md-3 text-center">
						<h6 className="text-center">DEPARTMENTS</h6>
						<ul>
							{this.state.dep.map((schema, index) => ( 
							<li>{ schema }</li>		
						))}					
										
						</ul>
						<ul>
						<li className="text-center"><a onClick={this.handleClick('department')}><img height='10' src={add_icon}></img></a></li>
						</ul>
					 </div>
					 <div className="col-md-3 text-center">
						<h6 className="text-center">COURSES</h6>
						<ul>
							{this.state.cou.map((schema, index) => ( 
							<li>{ schema }</li>		
						))}					
											
										
						</ul>
						<ul>
						<li className="text-center"><a onClick={this.handleClick('course')}><img height='10' src={add_icon}></img></a></li>
						</ul>
					 </div>
                    
                  </div>
            </Col>

            <div className="col-md-3 uni-dash-rgt mt-3 pl-0">
				<h3 className="mb-4">Bachelor of commerce</h3>
				<div className="row mb-3">
					<div className="col-4"><img src={logo} alt="home-icon"  className="sub-logo" width="80" /></div>
					<div className="col-8">
						<h5>Deakin University</h5>
						<span>(Member since 2018)</span>
					</div>
				</div>
				<h6 className="sub-land">Description</h6>
				<p>Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Cras ipsum id cras neque,
lacus vitae vel dolor. Et vitae, eleifend sit ut
quam integer massa. Consectetur cursus
ridiculus nisl urna adipiscing diam aliquet
pulvinar risus. Cursus aliquam tincidunt eu
placerat.</p>
<div className="contat-detail">
<h6 className="sub-land">contact details</h6>
<div className="row">
      <div className="col-6 d-box">
	  <img src={Phoneicon} alt="home-icon"  className="uni-icon" /><span>0404 233 244</span>
	  </div>
	  <div className="col-6 d-box">
	  <img src={Mailhicon} alt="home-icon"  className="uni-icon" /><span>info@deakin.com</span>
</div>
<div className="col-6 d-box">
<img src={Locateicon} alt="home-icon"  className="uni-icon" /><span>Barry Plant - Highton<br/>
Shops 4-5, 65-71 Barrabool Road,<br/> HIGHTON, VIC 3216</span>
</div>
</div>
</div>
				
				
				<h6 className="sub-land">General admission criteria</h6>
					<ul className="pl-0">
						<li><img src={Greenicon} alt="home-icon"  className="uni-icon px-2" />Lorem ipsum dolor sit amet,</li>
						<li><img src={Greenicon} alt="home-icon"  className="uni-icon px-2" />adipiscing elit. Cras ipsum</li>
						<li><img src={Greenicon} alt="home-icon"  className="uni-icon px-2" />Llacus vitae vel dolor.</li>
					</ul>
				<h6>ratings</h6>
				<img src={Ratingicon} alt="home-icon"  className="uni-icon px-2" />
              
			</div>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Landingpage;
