import "./Education.css";
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
    <div className="Education">
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
              <div className="pr-header">
                 <h3>Education Summary</h3>
             </div>
              
           <div className="destination-box">
                <div className="row">
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">COUNTRY OF EDUCATION</Label>
                            <Input type="select" id="educountryid" onChange={this.handleEducountryidChange}>
                              <option value="">Select</option>
                              { this.state.country.map(country => 
                                <option value={country.id} selected={this.state.educountryid == country.id}>
                                {country.country_name}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.educountryid}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">HIGHEST LEVEL OF EDUCATION</Label>
                            <Input type="select" id="highedulevel" onChange={this.handleHighedulevelChange}>
                              <option value="">Select</option>
                              { this.state.level.map(level => 
                                <option value={level.id} selected={this.state.highedulevel == level.id}>
                                {level.level_name}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.highedulevel}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">GRADING SCHEME</Label>
                            <Input type="select" id="gradingscheme" onChange={this.handleGradingschemeChange}>
                              <option value="">Select</option>
                              { this.state.grade.map(grade => 
                                <option value={grade.id} selected={this.state.gradingscheme == grade.id}>
                                {grade.grading_scheme}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.gradingscheme}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">GRADE SCALE (OUT OF)</Label>
                            <Input type="select" id="gradingscale" onChange={this.handleGradingscaleChange}>
                              <option value="">Select</option>
                              { this.state.graderange.map(graderange => 
                                <option value={graderange.id} selected={this.state.gradingscale == graderange.id}>
                                {graderange.grade_range}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.gradingscale}</h6>
                     </div>

                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">GRADE AVERAGE</Label>
                            <Input
                              type="number"
                              className="form-control"
                              placeholder="Enter Grade Average"
                              onChange={this.handleGradeaverageChange} 
                              value={this.state.gradeaverage}
                              id="gradeaverage"
                              onInput = {(e) =>{
                                e.target.value = Math.max(0, parseFloat(e.target.value) ).toString().slice(0,6)
                                }}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.gradeaverage}</h6>
                     </div>

                </div>

                <div className="form-check my-3">
                 <input type="checkbox" className="form-check-input" value="1"  
                 id="mostrecent"  onChange={this.handleMostrecentChange} />
                 <label className="form-check-label">Graduated from most recent school</label>
                </div>             

           </div>
           <div className="personal-box-inner">
             <div className="pr-header">
                 <h3>Schools Attended</h3>
             </div>
             <div className="row">

                    <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">LEVEL OF EDUCATION</Label>
                            <Input type="select" id="edulevel" onChange={this.handleEdulevelChange}>
                              <option value="">Select Level of Education</option>
                              { this.state.elevel.map(elevel => 
                                <option value={elevel.id} selected={this.state.edulevel == elevel.id}>
                                {elevel.educationlevel_name}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.edulevel}</h6>
                     </div>

                    <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">COUNTRY OF INSTITUTION</Label>
                            <Input type="select" id="insticountry" onChange={this.handleInsticountryChange}>
                              <option value="">Select Country</option>
                              { this.state.country.map(country => 
                                <option value={country.id} selected={this.state.insticountry == country.id}>
                                {country.country_name}</option> 
                              )}
                            </Input>
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.insticountry}</h6>
                     </div>

             <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">NAME OF INSTITUTION</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name of Institution"
                              onChange={this.handleInstitutenameChange} 
                              value={this.state.institutename	}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.institutename}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">PRIMARY LANGUAGE OF INSTRUCTION</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Language of Instruction"
                              onChange={this.handleLanginstructionChange} 
                              value={this.state.langinstruction}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.langinstruction}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">ATTENDED INSTITUTION FROM</Label>
                            
                            <DatePicker
                                selected={this.state.attendedfrom}
                                onChange={this.handleAttendedfromChange} 
                                dateFormat="yyyy-MM-dd"
                                id="attendedfrom"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="YYYY-MMM-DD"
                                
                              />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.attendedfrom}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">ATTENDED INSTITUTION TO</Label>
                            
                            <DatePicker
                                selected={this.state.attendedto}
                                onChange={this.handleAttendedtoChange} 
                                dateFormat="yyyy-MM-dd"
                                id="attendedto"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="YYYY-MMM-DD"
                                
                              />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.attendedto}</h6>
                     </div>

                    <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">DEGREE AWARDED</Label>
                            
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Degree Awarded"
                              onChange={this.handleAwardeddegreeChange} 
                              value={this.state.awardeddegree}
                              id="awardeddegree"
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.awardeddegree}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">DEGREE AWARDED ON</Label>
                            
                            <DatePicker
                                selected={this.state.awardedon}
                                onChange={this.handleAwardedonChange} 
                                dateFormat="yyyy-MM-dd"
                                id="awardedon"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="YYYY-MMM-DD"
                                
                              />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.awardedon}</h6>
                     </div>

                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">INSTITUTE EMAIL</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="..."
                              onChange={this.handleInstemailChange} 
                              value={this.state.instemail}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.instemail}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">INSTITUTE PHONE Number</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="..."
                              onChange={this.handleInstphoneChange} 
                              value={this.state.instphone}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.instphone}</h6>
                     </div>

                    <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Address</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Address.."
                              onChange={this.handleInsaddrChange} 
                              value={this.state.insaddr}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.insaddr}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">City/Town</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter City/Town..."
                              onChange={this.handleInscityChange} 
                              value={this.state.inscity}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.inscity}</h6>
                     </div>

                  <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Province/State</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Province..."
                              onChange={this.handleInstateChange} 
                              value={this.state.instate}
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.instate}</h6>
                     </div>
                     <div className="col-md-6">
                     <FormGroup>
                            <Label className="uni-label">Postal/Zip Code</Label>
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Enter Postal/Zip Code... "
                              id="szip"
                              onChange={this.handleInszipChange} 
                              value={this.state.inszip}
                              id="inszip"
                            />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{this.state.errors.inszip}</h6>
                     </div>
                     
             </div>
           </div>
           


           <div className="col-12 d-flex justify-content-end">
            <Button color="primary" className="score-back mx-4" data-toggle="tab" href="#tab1" role="tab">BACK</Button>
            <Button color="primary" className="score-save" type="submit" onClick={this.onSubmit.bind(this)}>SAVE</Button>
          </div>
           
          </div>
     </div>
    </div>
  );
};

export default template;
