import "./Personalinfo.css";
import React from "react";
import {  Badge,  Button,  ButtonDropdown,  ButtonGroup,  ButtonToolbar,  Card,  CardBody,  CardFooter,
  CardHeader,  CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table,
  Container, ListGroup, ListGroupItem, Media,Form, FormGroup, FormText, FormFeedback, Input,
  InputGroup,InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label
} from 'reactstrap';

import Infoicon from '../../assets/img/student/info-icon.svg';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function template() {
  return (
    <div className="personalinfo">
     <div className="row">
          <div className="col-12">
            <div className="complete-box flex-column">
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
          <div className="col-12 per-box py-4">
              <div className="match-box py-2">
              to get more relevant results, including "Best match" and apply to programs and schools that align with your background, skills, and interests.
              </div>
           <div className="destination-box">
                <div className="row">
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">STUDY DESTINATION<span>*</span></Label>
                            <Input type="select" id="sdesti" onChange={this.handleSdestiChange}>
                              <option value="">Select</option>
                              { this.state.country.map(country => 
                                <option value={country.id} selected={this.state.sdesti == country.id}>
                                {country.country_name}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.sdesti}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">STUDY LEVEL<span>*</span></Label>
                            <Input type="select" id="slevel" onChange={this.handleSlevelChange}>
                              <option value="">Select</option>
                              { this.state.level.map(level => 
                                <option value={level.id} selected={this.state.slevel == level.id}>
                                {level.level_name}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.slevel}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">What would you like to study?</Label>
                            <Input type="select" id="slike" onChange={this.handleSlikeChange}>
                              <option value="">Select</option>
                              { this.state.grade.map(grade => 
                                <option value={grade.id} selected={this.state.slike == grade.id}>
                                {grade.grading_scheme}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.slike}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">When you plan to study?</Label>
                            <Input type="select" id="splan" onChange={this.handleSplanChange}>
                              <option value="">Select</option>
                              <option selected={'July-2020' == this.state.splan} value="July-2020">July 2020</option>
                              <option selected={'Aug-2020' == this.state.splan} value="Aug-2020">Aug 2020</option>
                              <option selected={'Sep-2020' == this.state.splan} value="Sep-2020">Sep 2020</option>
                              <option selected={'Oct-2020' == this.state.splan} value="Oct-2020">Oct 2020</option>
                              <option selected={'Nov-2020' == this.state.splan} value="Nov-2020">Nov 2020</option>
                              <option selected={'Dec-2020' == this.state.splan} value="Dec-2020">Dec 2020</option>
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.splan}</h6>
                     </div>
                </div>
           </div>
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
                              className="form-control"
                              placeholder="First Name"
                              onChange={this.handleFnameChange} 
                              value={this.state.fname}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.fname}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Last Name</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Last Name"
                              onChange={this.handleLnameChange} 
                              value={this.state.lname}
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
                                id="dateofbirth"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="YYYY-MMM-DD"
                                maxDate={new Date()}
                                
                              />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.dateofbirth}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">First Language</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter First Language..."
                              onChange={this.handleFlangChange} 
                              value={this.state.flang}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.flang}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Country of Citizenship</Label>
                            <Input type="select" id="citiship" onChange={this.handleCitishipChange}>
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
                              type="text"
                              className="form-control"
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
                            <Input type="select" id="sgender" onChange={this.handleSgenderChange}>
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
                            <Input type="select" id="smarital" onChange={this.handleSmaritalChange}>
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
                              className="form-control"
                              placeholder="Enter Address.."
                              onChange={this.handleSaddrChange} 
                              value={this.state.saddr}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.saddr}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">City/Town</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter City/Town..."
                              onChange={this.handleScityChange} 
                              value={this.state.scity}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.scity}</h6>
                     </div>
           
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Country</Label>
                            <Input type="select" id="scountry" onChange={this.handleScountryChange}>
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
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Province..."
                              onChange={this.handleSstateChange} 
                              value={this.state.sstate}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.sstate}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Postal/Zip Code</Label>
                            <Input
                              type="text"
                              className="form-control"
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
                              type="text"
                              className="form-control"
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
                                <input type="text" className="form-control type-bbo" 
                                placeholder="+ 01" 
                                onChange={this.handleSphcodeChange} 
                                value={this.state.sphcode}
                                id="sphcode"
                                />
                                </span>
                              </div>
                              <input type="number" className="form-control" placeholder="Phone Number" 
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
                                <input type="text" className="form-control type-bbo" 
                                placeholder="+ 01" 
                                onChange={this.handleSmbcodeChange} 
                                value={this.state.smbcode}
                                id="smbcode"
                                />
                                </span>
                              </div>
                              <input type="number" className="form-control" placeholder="Cell Number"
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
          <Button color="primary" className="score-save" type="submit" onClick={this.onSubmit.bind(this)}>SAVE</Button>
          </div>
           
          </div>
     </div>
    </div>
  );
};

export default template;
