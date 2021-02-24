import "./AppPersonalinfo.css";
import Addmore from '../Addmore/Addmore';
import React from "react";
import {  Badge,  Button,  ButtonDropdown,  ButtonGroup,  ButtonToolbar,  Card,  CardBody,  CardFooter,
  CardHeader,  CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table,
  Container, ListGroup, ListGroupItem, Media,Form, FormGroup, FormText, FormFeedback, Input,
  InputGroup,InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label
} from 'reactstrap';

import Infoicon from '../../assets/img/student/info-icon.svg';
import Closeicon from '../../assets/img/close-btn.svg';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function template() {
	const showtab = () => {
      this.setState({ addMore : false, selectedQuestion: null })
    }
  return (
    <div className="apppersonalinfo">
     <div className="row">
	 
	   {/*{this.state.contentclose3 ?
          <div className="col-12">
            <div className="complete-box flex-column">
            <div className="com-top d-flex justify-content-end">
           <img src={Closeicon} alt="home-icon" onClick={this.closepop4}   className="uni-icon pr-2" />
           </div>
           <div className="com-top">
           <img src={Infoicon} alt="home-icon"  className="uni-icon pr-2" /> PLEASE COMPLETE YOUR PROFILE?
           </div>
           <div className="com-body">
            <p className="com-text"><strong>Save time :</strong> complete your profile once and use for multiple enquiries/applications<br/>
            <strong>Receive the best guidance from institutions :</strong> allow them to send you the most accurate information possible
            </p>
           </div>
           </div>
          </div>
	   :null
	   }*/}
	  
          <div className="col-12 col-md-9 app-mob-order-2 per-box pb-4">
              
			  
			<p style={{display:this.state.addMore==false?"block":"none"}}> 
           <div className="personal-box-inner">
             <div className="pr-header">
                 <h3>Personal Information</h3>
                 <span>(As indicated on your passport)</span>
             </div>
				

			<div className="row">
             <div className="col-md-6">
			 
                     <FormGroup>
                            <Label className="uni-label">First Name</Label>
                            <Input
                              type="text"
                              className="form-control "
                              placeholder="First Name"
                              onChange={this.handleFnameChange} 
                              value={this.state.fname}
                              disabled={this.state.disabled}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.fname}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Last Name</Label>
                            <Input
                              type="text"
                              className="form-control "
                              placeholder="Last Name"
                              onChange={this.handleLnameChange} 
                              value={this.state.lname}
                              disabled={this.state.disabled}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.lname}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Date of Birth</Label>
                            {/*
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="YYYY-MMM-DD"
                              onChange={this.handleDobChange} 
                              value={this.state.dateofbirth}
                            /> */}
                            <DatePicker
                                selected={this.state.dateofbirth}
                                onChange={this.handleDobChange} 
                                dateFormat="yyyy-MM-dd"
								className=''
                                id="dateofbirth"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="YYYY-MMM-DD"
                                maxDate={new Date()}
                                disabled={this.state.disabled}
                                
                              />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.dateofbirth}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">First Language</Label>
                            <Input
                              type="text"
                              className="form-control "
                              placeholder="Enter First Language..."
                              onChange={this.handleFlangChange} 
                              value={this.state.flang}
                              disabled={this.state.disabled}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.flang}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Country of Citizenship</Label>
                            <Input disabled={this.state.disabled} type="select" id="citiship" onChange={this.handleCitishipChange} className=''>
                              <option value="">Select</option>
                              { this.state.country.map(country => 
                                <option value={country.id} selected={this.state.citiship == country.id}>
                                {country.country_name}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.citiship}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Passport Number</Label>
                            <Input
                            disabled={this.state.disabled}
                              type="text"
                              className="form-control "
                              placeholder="Enter Passport Number..."
                              onChange={this.handlePassnoChange} 
                              value={this.state.passno}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.passno}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Gender</Label>
                            <Input disabled={this.state.disabled} type="select" id="sgender" onChange={this.handleSgenderChange} className=''>
                              <option value="">Select</option>
                              <option value="male" selected={'male' == this.state.sgender}>Male</option>
                              <option value="female" selected={'female' == this.state.sgender}>Female</option>
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.sgender}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Marital Status</Label>
                            <Input  disabled={this.state.disabled} type="select" id="smarital" onChange={this.handleSmaritalChange} className=''>
                              <option value="">Select</option>
                              <option value="single" selected={'single' == this.state.smarital}>Single</option>
                              <option value="married" selected={'married' == this.state.smarital}>Married</option>
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.smarital}</h6>
                     </div>
             </div>
           </div>
           <div className="personal-box-inner address">
             <div className="pr-header">
                 <h3>Address Detail</h3>
                      </div>
             <div className="row">
             <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Address</Label>
                            <Input
                              type="text"
                              className="form-control "
                              placeholder="Enter Address.."
                              onChange={this.handleSaddrChange} 
                              value={this.state.saddr}
                              disabled={this.state.disabled}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.saddr}</h6>
                     </div>
                     <div className="col-md-6">						  
						  <FormGroup>
                            <Label className="uni-label">City/Town</Label>
                            <Input disabled={this.state.disabled} type="select" id="scity" onChange={this.handleScityChange} className=''>
                              <option value="">Select</option>
                              { this.state.cities.map(cities => 
                                <option value={cities.id} selected={this.state.scity == cities.id}>
                                {cities.name}</option> 
                              )}
                            </Input>
                          </FormGroup>
						  
						  
						  
						  
						  
						  
                          <h6 style={{color: 'red'}}>{this.state.errors.scity}</h6>
                     </div>
           
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Country</Label>
                            <Input disabled={this.state.disabled} type="select" id="scountry" onChange={this.handleScountryChange}  className=''>
                              <option value="">Select</option>
                              { this.state.country.map(country => 
                                <option value={country.id} selected={this.state.scountry == country.id}>
                                {country.country_name}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.scountry}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Province/State</Label>
                             <Input disabled={this.state.disabled} type="select" id="sstate" onChange={this.handleSstateChange}  className=''>
                              <option value="">Select</option>
                              { this.state.states.map(states => 
                                <option value={states.id} selected={this.state.sstate == states.id}>
                                {states.name}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.sstate}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Postal/Zip Code</Label>
                            <Input
                            disabled={this.state.disabled}
                              type="text"
                              className="form-control "
                              placeholder="Enter Postal/Zip Code... "
                              id="szip"
                              onChange={this.handleSzipChange} 
                              value={this.state.szip}
                              id="szip"
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.szip}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Email</Label>
                            <Input
                            disabled={this.state.disabled}
                              type="text"
                              className="form-control "
                              placeholder="Enter Email.."
                              onChange={this.handleSemailChange} 
                              value={this.state.semail}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.semail}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Phone Number</Label>
                              <div class="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                <input disabled={this.state.disabled} type="text" className="form-control type-bbo " 
                                placeholder="+ 01" 
                                onChange={this.handleSphcodeChange} 
                                value={this.state.sphcode}
                                id="sphcode"
                                />
                                </span>
                              </div>
                              <input disabled={this.state.disabled} type="number" className="form-control " placeholder="Phone Number" 
                              onChange={this.handleSphnoChange} 
                              value={this.state.sphno}
                              
                              />
                            </div>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.sphno}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">cellphone number</Label>
                              <div class="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                <input disabled={this.state.disabled} type="text" className="form-control type-bbo " 
                                placeholder="+ 01" 
                                onChange={this.handleSmbcodeChange} 
                                value={this.state.smbcode}
                                id="smbcode"
                                />
                                </span>
                              </div>
                              <input disabled={this.state.disabled} type="number" className="form-control " placeholder="Cell Number"
                               onChange={this.handleSmbnoChange} 
                               value={this.state.smbno}
                               
                              />
                            </div>
                            <h6 style={{color: 'red'}}>{this.state.errors.smbno}</h6>
                          </FormGroup>
                     </div>
              
             </div>
           </div>
		   
		   
		   
	
  
            <div className="col-12 d-flex justify-content-end">
           {this.state.disabled===false?(<Button color="primary" className="score-save " type="submit" onClick={this.onSubmit.bind(this)}>SAVE</Button>
     ):( <Button
      color="primary"
      className="score-save aftersave"
      onClick={this.nexttab}
    >
      NEXT
    </Button>)}
			
     
           </div>
        </p> 
<p style={{display:this.state.addMore== true ?"block":"none"}}>
  <Addmore clearAddmore={this.state.clearAddmore} getQuestiondata={this.getQuestiondata} selectedQuestion={this.state.selectedQuestion}></Addmore>
                              
   </p>        

           
           
          </div>
		  <div className="col-12 col-md-3 app-mob-order-1 " >
		   <div className=" list-card uni-no-padd card mt-3 add-more-box" >
                                     <button className="list-group-item"
                                        // className="nav-l"
                                        onClick={() => showtab()}
                                      >
                                        General <br/> Information
                                       </button> 
                                      
                               
          
			   
			     <div className="uni-no-padd card-body app-order-list">
                                  <ul className="university-list list-group">
                                    <div className="stepone">
                                      <div className="steptwo">
                                        {this.state.questiondata.map((question, index)=>
                                          <li id="about" key={index} className="list-group-item" onClick={()=>this.setQuestiondata(index)}>{question.question[0]}</li>
                                        )}
                                        
                                      
                                        </div>
                                        
                                           </div></ul></div> 
			   
			   </div>                 </div>
			   
     </div>
    </div>

  );
};

export default template;
