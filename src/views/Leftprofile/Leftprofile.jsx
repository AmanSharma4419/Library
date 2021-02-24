import "./Leftprofile.css";
import React from "react";
import {
  Badge,Button, Card, CardBody, CardFooter, CardHeader,Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle,Fade, Form,
  FormGroup,FormText,FormFeedback,Input,InputGroup,InputGroupAddon,InputGroupButtonDropdown,InputGroupText,Label,
  Row,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import config from '../../config.json';
import logo from '../../assets/img/university-sub-logo.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function template() {
	 const imgpath = `${config.baseurl}`;
  return (

 <div className="Leftprofile leftoverview">
 <ToastContainer/>
     <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-8">
              <h3 className="subletter">Profile</h3>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-4">
                 <div className="float-right">
                 <a href="/#/viewus"><span className="view-letter">View As &nbsp;&nbsp;<i class="fa fa-angle-right"></i></span></a>
                 </div>
            </div>
     </div>
     <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6 profile-icon">
                <div className="profile-box-inner">
				{this.state.logo ?
                <img src={imgpath+this.state.logo} alt="home-icon"  className="sub-logo-profile" />
				:
				<img src={logo} alt="home-icon"  className="sub-logo-profile" />
				}
                </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 profile-btn-upload">
            <div className="profile-btn-inner">
			 <Input type="file" id="univlogo" accept="image/*" onChange={this.onFileChange} name="upload_logo[]" />
			{/*<Button color="primary" className="save-btn">+ Upload profile photo</Button>  */}
            </div>
         </div>
     </div>
	  <h6 style={{color: 'red'}}>{this.state.errors.fileLength}</h6>
	  <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6 profile-icon">
                <div className="profile-box-inner">
				{this.state.banner ?
                <img src={imgpath+this.state.banner} alt="home-icon"  className="sub-logo-profile" />
				:
				<img src={logo} alt="home-icon"  className="sub-logo-profile" />
				}
                </div>
          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 profile-btn-upload">
            <div className="profile-btn-inner">
			 <Input type="file" id="univbanner" accept="image/*" onChange={this.onFileChange1} name="upload_banner[]" />
			{/* <Button color="primary" className="save-btn">+ Upload Banner photo</Button>  */}
            </div>
         </div>
     </div>
	  <h6 style={{color: 'red'}}>{this.state.errors.fileLength1}</h6>
	   
	 <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6 profile-btn-upload">
		  <Label className="uni-label profile-label">CHOOSE LAYOUT</Label>
            <div className="profile-btn-inner">
                            <div onChange={this.handleLayoutChange} >
							<div className="custom-control custom-radio custom-control-inline mr-5">
							<input className="custom-control-input" type="radio" value="1" checked={this.state.layout === "1"} name="layout"/>  <label className="custom-control-label"> Modern </label>
							</div>
							<div className="custom-control custom-radio custom-control-inline">
							<input className="custom-control-input" type="radio" value="2" checked={this.state.layout === "2"} name="layout"/> <label className="custom-control-label"> Simple </label>
							</div>
							</div>
			</div>
         </div>
     </div>
	 <h6 style={{color: 'red'}}>{this.state.errors.layout}</h6>
     <div className="row">
     <FormGroup className="col-md-12 col-lg-12 mt-3">
     <FormGroup>
        <Label className="uni-label profile-label">COUNTRY</Label>
        <Input type="select" name="studentselectcountry" id="studentselectcountry" onChange={this.handleUniselectcountryChange}>
          <option value="">Choose a Country</option> 
         { this.state.country.map(studentselectcountry => <option value={studentselectcountry.id} selected={this.state.univcountry == studentselectcountry.id}>{studentselectcountry.country_name}</option> )}	
        </Input>
      </FormGroup>
      </FormGroup>
	  <h6 style={{color: 'red'}}>{this.state.errors.univcountry}</h6>
      <FormGroup className="col-md-12 col-lg-12 grey-color">
      <Label className="uni-label profile-label">CONTACT DETAILS</Label>
					 <FormGroup>
             <Label className="uni-label">PHONE NUMBER</Label>
			 <Input type="number" name="phone" className="form-control" placeholder="Enter phone" value={this.state.phone} onChange={this.handlePhoneChange} />
             </FormGroup>
			 <h6 style={{color: 'red'}}>{this.state.errors.phone}</h6>
             <FormGroup>
             <Label className="uni-label" >EMAIL</Label>
             <Input type="email" name="email" className="form-control" placeholder="Enter Email" value={this.state.email} onChange={this.handleEmailChange} disabled/>
             </FormGroup>
			 <h6 style={{color: 'red'}}>{this.state.errors.email}</h6>
      </FormGroup>

      <FormGroup className="col-md-12 col-lg-12 grey-color">
      <Label className="uni-label profile-label">GENERAL ADMISSION CRITERIA</Label>
					 <FormGroup>
             <Label className="uni-label">DESCRIPTION</Label>
			 {/* <Input type="textarea" className="profile-text" name="text"  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ipsum id cras neque," />  */}
			 <textarea type="text" name="message" placeholder="Type here" cols={40} rows={5} value={this.state.message} onChange={this.handleAdmincritetiaChange} />
             </FormGroup>

      </FormGroup>
	  <h6 style={{color: 'red'}}>{this.state.errors.message}</h6>

	  {/* <FormGroup className="col-md-12 col-lg-12">
					 <FormGroup>
             <Label className="uni-label" >invite recruitment partners</Label>
             <Input  className="form-control partner-input" type="text"  />
             </FormGroup>
      </FormGroup>  */}
	  
      <FormGroup className="col-md-12 col-lg-12">
      <div className="col-md-12 profile-btn-upload">
            <div className="profile-bottom-inner">
            <Button color="primary"  type="submit" disabled onClick={this.onSubmit.bind(this)} className="px-4 float-md-right save-btn">save</Button>
			
            </div>
         </div>
      </FormGroup>
     </div>
    </div>
  );
};

export default template;
