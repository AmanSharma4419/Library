import "./AppEducation.css";
import EduAddmore from '../Addmore/EduAddMore';
import React from "react";
import {
  Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter,
  CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table,
  Container, ListGroup, ListGroupItem, Media, Form, FormGroup, FormText, FormFeedback, Input,
  InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label
} from 'reactstrap';

import Infoicon from '../../assets/img/student/info-icon.svg';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Closeicon from '../../assets/img/close-btn.svg';

function template() {

  
  const { errors } = this.state
  
  const prods = this.state.edusublevel.map((ub, index) => {
    const sublevel = ub.sublevel.map((sublevel, i) => {
      return (
        <option
          value={sublevel.id}
          selected={this.state.highedulevel == sublevel.id}
        >
          {sublevel.educationlevel_name}
        </option>
      );
    });
    return (
      <>
        <option value="" className="boldclass" disabled>
          {ub.mainlevel}
        </option>
        {sublevel}
      </>
    );
  });
  
  const edutab = () => {
  
      this.setState({EduaddMore:false, selectedQuestion1: null})
    }
   
   
  return (
    
    <div className="appeducation">
      
      <div className="row">

         {/*{this.state.content ?
          <div className="col-12">
            <div className="complete-box flex-column">
              <div className="com-top d-flex justify-content-end">
                <img src={Closeicon} onClick={this.closepop} alt="home-icon" className="uni-icon pr-2" />
              </div>
              <div className="com-top">
                <img src={Infoicon} alt="home-icon" className="uni-icon pr-2" /> PLEASE COMPLETE YOUR PROFILE?
       </div>
              <div className="com-body">
                <p className="com-text"><strong>Save time :</strong> complete your profile once and use for multiple enquiries/applications<br />
                  <strong>Receive the best guidance from institutions :</strong> allow them to send you the most accurate information possible
      </p>
              </div>
            </div>
          </div>
          : null
        }*/}
		
           <div className="col-12 col-md-9 per-box pb-4">
		   <p style={{display:this.state.EduaddMore==false?"block":"none"}}>
          <div className="pr-header">
            <h3>Education Summary</h3>
          </div>
          <div className="destination-box">
            <div className="row">

              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">COUNTRY OF EDUCATION</Label>
                  <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="educountryid" onChange={this.handleEducountryidChange} className="">
                    <option value="">Select</option>
                    {this.state.country.map(country =>
                      <option value={country.id} selected={this.state.educountryid == country.id}>
                        {country.country_name}</option>
                    )}
                  </Input>
                </FormGroup>
                <h6 style={{ color: 'red' }}>{this.state.errors.educountryid}</h6>
              </div>

              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">HIGHEST LEVEL OF EDUCATION</Label>
                  <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="highedulevel" onChange={this.handleHighedulevelChange} className="">
                    <option value="">Select</option>
					{prods}
					
                  </Input>
                </FormGroup>
                <h6 style={{ color: 'red' }}>{this.state.errors.highedulevel}</h6>
              </div>




              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">GRADING SCHEME</Label>
                  <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="gradingscheme" onChange={this.handleGradingschemeChange} className="">
                    <option value="">Select</option>
                    {this.state.grade.map(grade =>
                      <option value={grade.id} selected={this.state.gradingscheme == grade.id}>
                        {grade.grading_scheme}</option>
                    )}
                  </Input>
                </FormGroup>
                <h6 style={{ color: 'red' }}>{this.state.errors.gradingscheme}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">GRADE SCALE (OUT OF)</Label>
                  <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="gradingscale" onChange={this.handleGradingscaleChange} className="">
                    <option value="">Select</option>
                    {this.state.graderange.map(graderange =>
                      <option value={graderange.id} selected={this.state.gradingscale == graderange.id}>
                        {graderange.grade_range}</option>
                    )}
                  </Input>
                </FormGroup>
                <h6 style={{ color: 'red' }}>{this.state.errors.gradingscale}</h6>
              </div>

              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">GRADE AVERAGE</Label>
                  <Input
                  disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                    type="number"
                    className="form-control "
                    placeholder="Enter Grade Average"
                    onChange={this.handleGradeaverageChange}
                    value={this.state.gradeaverage}
                    id="gradeaverage"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                    }}
                  />
                </FormGroup>
                <h6 style={{ color: 'red' }}>{this.state.errors.gradeaverage}</h6>
              </div>

            </div>
  
            <div className="form-check my-3">
			<Label className="check-name" >
              <input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="checkbox" className="form-check-input "
                // defaultChecked={this.state.recentcheck}
                checked={this.state.recent_summ}
                id="mostrecent" onChange={this.handleMostrecentChange} value={this.state.recentcheck} />
				<span className="checkmark"></span>
				</Label>
              <label className="form-check-label pl-3">Graduated from most recent school</label>
            </div>

          </div>


          {this.state.recentcheck == true ?
            <div >


              {this.state.awardedon.map((data, index) => <div>{this.maxDateHandler(this.state.awardedon) == data.toLocaleString() ?
                <>
                  <h3 >Recent Schools Attended</h3>

                  <div className="row">

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">LEVEL OF EDUCATION</Label>
                        <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="edulevel" onChange={(evt) => this.handleEdulevelChange(evt, index)} className=" edulevel" >
                          <option value="">Select Level of Education</option>
                          {this.state.elevel.map(elevel =>
                            <option value={elevel.id} selected={this.state.edulevel[index] == elevel.id}>
                              {elevel.educationlevel_name}</option>
                          )}
                        </Input>
                      </FormGroup>

                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">COUNTRY OF INSTITUTION</Label>
                        <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" onChange={(evt) => this.handleInsticountryChange(evt, index)} id="insticountry" className=" insticountry" >
                          <option value="">Select Country</option>
                          {this.state.country.map(country =>
                            <option value={country.id} selected={this.state.insticountry[index] == country.id}>
                              {country.country_name}</option>
                          )}
                        </Input>
                      </FormGroup>

                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">NAME OF INSTITUTION</Label>
                        <Input
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          type="text"
                          className="form-control  institutename"
                          placeholder="Enter Name of Institution"
                          value={this.state.institutename[index]}
                          onChange={(evt) => this.handleInstitutenameChange(evt, index)}
                          
                        />
                      </FormGroup>

                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">PRIMARY LANGUAGE OF INSTRUCTION</Label>
                        <Input
                          type="text"
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          className="form-control  langinstruction"
                          placeholder="Enter Language of Instruction"
                          onChange={(evt) => this.handleLanginstructionChange(evt, index)}
                          value={this.state.langinstruction[index]}
                          
                        />
                      </FormGroup>

                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">ATTENDED INSTITUTION FROM</Label>

                        <DatePicker
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          selected={this.state.attendedfrom[index]}
                          onChange={(date) => this.handleAttendedfromChange(date, index)}
                          dateFormat="yyyy-MM-dd"
                          id="attendedfrom"
                          className=" attendedfrom"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="YYYY-MMM-DD"
                          
                        />
                      </FormGroup>

                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">ATTENDED INSTITUTION TO</Label>

                        <DatePicker
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          selected={this.state.attendedto[index]}
                          onChange={(date) => this.handleAttendedtoChange(date, index)}
                          dateFormat="yyyy-MM-dd"
                          className=" attendedto"
                          id="attendedto"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="YYYY-MMM-DD"
                          
                        />
                      </FormGroup>

                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">DEGREE AWARDED</Label>

                        <Input
                          type="text"
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          className="form-control  awardeddegree"
                          placeholder="Enter Degree Awarded"
                          onChange={(evt) => this.handleAwardeddegreeChange(evt, index)}
                          value={this.state.awardeddegree[index]}
                          id="awardeddegree"
                          
                        />
                      </FormGroup>

                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">DEGREE AWARDED ON</Label>

                        <DatePicker
                          selected={this.state.awardedon[index]}
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          onChange={(date) => { this.handleAwardedonChange(date, index) }}
                          dateFormat="yyyy-MM-dd"
                          className=" awardedon"
                          id="awardedon"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="YYYY-MMM-DD"
                          
                        />
                      </FormGroup>

                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">INSTITUTE EMAIL</Label>
                        <Input
                          type="text"
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          className="form-control  instemail"
                          placeholder="..."
                          onChange={(evt) => this.handleInstemailChange(evt, index)}
                          value={this.state.instemail[index]}
                          
                        />
                      </FormGroup>

                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">INSTITUTE PHONE Number</Label>
                        <Input
                          type="text"
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          className="form-control  instphone"
                          placeholder="..."
                          onChange={(evt) => this.handleInstphoneChange(evt, index)}
                          value={this.state.instphone[index]}
                          
                        />
                      </FormGroup>

                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">Address</Label>
                        <Input
                          type="text"
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          className="form-control  insaddr"
                          placeholder="Enter Address.."
                          onChange={(evt) => this.handleInsaddrChange(evt, index)}
                          value={this.state.insaddr[index]}
                          
                        />
                      </FormGroup>

                    </div>
                    <div className="col-md-6">

                      <FormGroup>
                        <Label className="uni-label">City/Town</Label>


                        <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="scity" onChange={(evt) => this.handleInscityChange(evt, index)} className=' inscity' >
                          <option value="">Select</option>
                          {this.state.inecity[index] ? this.state.inecity[index].map(cities =>
                            <option value={cities.id} selected={this.state.inscity[index] == cities.id}>
                              {cities.name}</option>
                          ) : null}
                        </Input>
                      </FormGroup>

                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">Province/State</Label>


                        <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="instate" onChange={(evt) => this.handleInstateChange(evt, index)} className=' instate' >
                          <option value="">Select</option>
                          {this.state.inestate[index] ? this.state.inestate[index].map(states =>
                            <option value={states.id} selected={this.state.instate[index] == states.id}>
                              {states.name}</option>
                          ) : null}
                        </Input>
                      </FormGroup>

                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">Postal/Zip Code</Label>
                        <Input
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          type="text"
                          className="form-control  inszip"
                          placeholder="Enter Postal/Zip Code... "
                          id="szip"
                          onChange={(evt) => this.handleInszipChange(evt, index)}
                          value={this.state.inszip[index]}
                          id="inszip"
                          
                        />
                      </FormGroup>

                    </div>
                  </div>


                </>


                : null}
              </div>)}
            </div> : null}



          {
            this.state.schoolsattended.map((element, index) =>
              <>{this.state.recentcheck == true ?
                this.maxIndexHandler(this.state.awardedon) != index ?
                  <div className="personal-box-inner attend">
                    <div className="pr-header">
                      <h3 id="demo">Schools Attended <span className="counter">{index + 1}</span></h3>
                    </div>
                    <div className="row">

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">LEVEL OF EDUCATION</Label>
                          <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="edulevel" onChange={(evt) => this.handleEdulevelChange(evt, index)} className=" edulevel" >
                            <option value="">Select Level of Education</option>
                            {this.state.elevel.map(elevel =>
                              <option value={elevel.id} selected={this.state.edulevel[index] == elevel.id}>
                                {elevel.educationlevel_name}</option>
                            )}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].edulevel : null}</h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">COUNTRY OF INSTITUTION</Label>
                          <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="insticountry" onChange={(evt) => this.handleInsticountryChange(evt, index)} className=" insticountry" >
                            <option value="">Select Country</option>
                            {this.state.country.map(country =>
                              <option value={country.id} selected={this.state.insticountry[index] == country.id}>
                                {country.country_name}</option>
                            )}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].insticountry : null}</h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">NAME OF INSTITUTION</Label>
                          <Input
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            type="text"
                            className="form-control  institutename"
                            placeholder="Enter Name of Institution"
                            onChange={(evt) => this.handleInstitutenameChange(evt, index)}
                            value={this.state.institutename[index]}
                            
                          />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].institutename : null}</h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">PRIMARY LANGUAGE OF INSTRUCTION</Label>
                          <Input
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            type="text"
                            className="form-control  langinstruction"
                            placeholder="Enter Language of Instruction"
                            onChange={(evt) => this.handleLanginstructionChange(evt, index)}
                            value={this.state.langinstruction[index]}
                            
                          />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].langinstruction : null}</h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">ATTENDED INSTITUTION FROM</Label>

                          <DatePicker
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            selected={this.state.attendedfrom[index]}
                            onChange={(date) => this.handleAttendedfromChange(date, index)}
                            dateFormat="yyyy-MM-dd"
                            id="attendedfrom"
                            className=" attendedfrom"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="YYYY-MMM-DD"
                            
                          />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].attendedfrom : null}</h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">ATTENDED INSTITUTION TO</Label>

                          <DatePicker
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            selected={this.state.attendedto[index]}
                            onChange={(date) => this.handleAttendedtoChange(date, index)}
                            dateFormat="yyyy-MM-dd"
                            className=" attendedto"
                            id="attendedto"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="YYYY-MMM-DD"
                            
                          />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].attendedto : null}</h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">DEGREE AWARDED</Label>

                          <Input
                            type="text"
                            disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            className="form-control  awardeddegree"
                            placeholder="Enter Degree Awarded"
                            onChange={(evt) => this.handleAwardeddegreeChange(evt, index)}
                            value={this.state.awardeddegree[index]}
                            id="awardeddegree"
                            
                          />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].awardeddegree : null}</h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">DEGREE AWARDED ON</Label>

                          <DatePicker
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            selected={this.state.awardedon[index]}
                            onChange={(date) => { this.handleAwardedonChange(date, index) }}
                            dateFormat="yyyy-MM-dd"
                            className=" awardedon"
                            id="awardedon"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="YYYY-MMM-DD"
                            
                          />
                        </FormGroup>

                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].awardedon : null}</h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">INSTITUTE EMAIL</Label>
                          <Input
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            type="text"
                            className="form-control  instemail"
                            placeholder="..."
                            onChange={(evt) => this.handleInstemailChange(evt, index)}
                            value={this.state.instemail[index]}
                            
                          />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].instemail : null}</h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">INSTITUTE PHONE Number</Label>
                          <Input
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            type="text"
                            className="form-control  instphone"
                            placeholder="..."
                            onChange={(evt) => this.handleInstphoneChange(evt, index)}
                            value={this.state.instphone[index]}
                            
                          />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].instphone : null}</h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">Address</Label>
                          <Input
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            type="text"
                            className="form-control  insaddr"
                            placeholder="Enter Address.."
                            onChange={(evt) => this.handleInsaddrChange(evt, index)}
                            value={this.state.insaddr[index]}
                            
                          />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].insaddr : null}</h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">Province/State</Label>


                          <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="instate" onChange={(evt) => this.handleInstateChange(evt, index)} className=' instate' >
                            <option value="">Select</option>
                            {this.state.inestate[index] ? this.state.inestate[index].map(states =>
                              <option value={states.id} selected={this.state.instate[index] == states.id}>
                                {states.name}</option>
                            ) : null}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].instate : null}</h6>
                      </div>


                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">City/Town</Label>


                          <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="scity" onChange={(evt) => this.handleInscityChange(evt, index)} className=' inscity' >
                            <option value="">Select</option>
                            {this.state.inecity[index] ? this.state.inecity[index].map(cities =>
                              <option value={cities.id} selected={this.state.inscity[index] == cities.id}>
                                {cities.name}</option>
                            ) : null}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].inscity : null}</h6>
                      </div>


                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">Postal/Zip Code</Label>
                          <Input
                          disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                            type="text"
                            className="form-control  inszip"
                            placeholder="Enter Postal/Zip Code... "
                            id="szip"
                            onChange={(evt) => this.handleInszipChange(evt, index)}
                            value={this.state.inszip[index]}
                            id="inszip"
                            
                          />
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].inszip : null}</h6>
                      </div>
                    </div>
                  </div>
                  : null
                :






                <div className="personal-box-inner attend">
                  <div className="pr-header">
                    <h3 id="demo">Schools Attended <span className="counter">{index + 1}</span></h3>
                  </div>
                  <div className="row">

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">LEVEL OF EDUCATION</Label>
                        <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="edulevel" onChange={(evt) => this.handleEdulevelChange(evt, index)} className=" edulevel" >
                          <option value="">Select Level of Education</option>
                          {this.state.elevel.map(elevel =>
                            <option value={elevel.id} selected={this.state.edulevel[index] == elevel.id}>
                              {elevel.educationlevel_name}</option>
                          )}
                        </Input>
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].edulevel : null}</h6>
                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">COUNTRY OF INSTITUTION</Label>
                        <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="insticountry" onChange={(evt) => this.handleInsticountryChange(evt, index)} className=" insticountry" >
                          <option value="">Select Country</option>
                          {this.state.country.map(country =>
                            <option value={country.id} selected={this.state.insticountry[index] == country.id}>
                              {country.country_name}</option>
                          )}
                        </Input>
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].insticountry : null}</h6>
                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">NAME OF INSTITUTION</Label>
                        <Input
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          type="text"
                          className="form-control  institutename"
                          placeholder="Enter Name of Institution"
                          onChange={(evt) => this.handleInstitutenameChange(evt, index)}
                          value={this.state.institutename[index]}
                          
                        />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].institutename : null}</h6>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">PRIMARY LANGUAGE OF INSTRUCTION</Label>
                        <Input
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          type="text"
                          className="form-control  langinstruction"
                          placeholder="Enter Language of Instruction"
                          onChange={(evt) => this.handleLanginstructionChange(evt, index)}
                          value={this.state.langinstruction[index]}
                          
                        />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].langinstruction : null}</h6>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">ATTENDED INSTITUTION FROM</Label>

                        <DatePicker
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          selected={this.state.attendedfrom[index]}
                          onChange={(date) => this.handleAttendedfromChange(date, index)}
                          dateFormat="yyyy-MM-dd"
                          id="attendedfrom"
                          className=" attendedfrom"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="YYYY-MMM-DD"
                          
                        />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].attendedfrom : null}</h6>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">ATTENDED INSTITUTION TO</Label>

                        <DatePicker
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          selected={this.state.attendedto[index]}
                          onChange={(date) => this.handleAttendedtoChange(date, index)}
                          dateFormat="yyyy-MM-dd"
                          className=" attendedto"
                          id="attendedto"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="YYYY-MMM-DD"
                          
                        />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].attendedto : null}</h6>
                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">DEGREE AWARDED</Label>

                        <Input
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          type="text"
                          className="form-control  awardeddegree"
                          placeholder="Enter Degree Awarded"
                          onChange={(evt) => this.handleAwardeddegreeChange(evt, index)}
                          value={this.state.awardeddegree[index]}
                          id="awardeddegree"
                          
                        />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].awardeddegree : null}</h6>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">DEGREE AWARDED ON</Label>

                        <DatePicker
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          selected={this.state.awardedon[index]}
                          onChange={(date) => { this.handleAwardedonChange(date, index) }}
                          dateFormat="yyyy-MM-dd"
                          className=" awardedon"
                          id="awardedon"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          placeholderText="YYYY-MMM-DD"
                          
                        />
                      </FormGroup>

                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].awardedon : null}</h6>
                    </div>

                    <div className="col-md-6">
                      <FormGroup>

                        <Label className="uni-label">INSTITUTE EMAIL</Label>
                        <Input
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          type="text"
                          className="form-control  instemail"
                          placeholder="..."
                          onChange={(evt) => this.handleInstemailChange(evt, index)}
                          value={this.state.instemail[index]}
                          
                        />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].instemail : null}</h6>
                    </div>
                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">INSTITUTE PHONE Number</Label>
                        <Input
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          type="text"
                          className="form-control  instphone"
                          placeholder="..."
                          onChange={(evt) => this.handleInstphoneChange(evt, index)}
                          value={this.state.instphone[index]}
                          
                        />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].instphone : null}</h6>
                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">Address</Label>
                        <Input
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          type="text"
                          className="form-control  insaddr"
                          placeholder="Enter Address.."
                          onChange={(evt) => this.handleInsaddrChange(evt, index)}
                          value={this.state.insaddr[index]}
                          
                        />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].insaddr : null}</h6>
                    </div>

                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">Province/State</Label>


                        <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="instate" onChange={(evt) => this.handleInstateChange(evt, index)} className=' instate' >
                          <option value="">Select</option>
                          {this.state.inestate[index] ? this.state.inestate[index].map(states =>
                            <option value={states.id} selected={this.state.instate[index] == states.id}>
                              {states.name}</option>
                          ) : null}
                        </Input>
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].instate : null}</h6>
                    </div>


                    <div className="col-md-6">

                      <FormGroup>
                        <Label className="uni-label">City/Town</Label>


                        <Input disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false} type="select" id="scity" onChange={(evt) => this.handleInscityChange(evt, index)} className=' inscity' >
                          <option value="">Select</option>
                          {this.state.inecity[index] ? this.state.inecity[index].map(cities =>
                            <option value={cities.id} selected={this.state.inscity[index] == cities.id}>
                              {cities.name}</option>
                          ) : null}
                        </Input>
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].inscity : null}</h6>
                    </div>


                    <div className="col-md-6">
                      <FormGroup>
                        <Label className="uni-label">Postal/Zip Code</Label>
                        <Input
                        disabled={localStorage.getItem("fromApplicationType")==="Sent"?true:false}
                          type="text"
                          className="form-control  inszip"
                          placeholder="Enter Postal/Zip Code... "
                          id="szip"
                          onChange={(evt) => this.handleInszipChange(evt, index)}
                          value={this.state.inszip[index]}
                          id="inszip"
                          
                        />
                      </FormGroup>
                      <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].inszip : null}</h6>
                    </div>
                  </div>
                </div>

              }

              </>)}


          <Button color="primary" className="score-save add beforesave" type="submit" onClick={this.onAddEducation}>Add More</Button>


          <div className="col-12 d-flex justify-content-end">
           
           {localStorage.getItem("fromApplicationType")!=="Sent"?( <Button color="primary" className="score-save " type="submit" onClick={this.onSubmit.bind(this)}>SAVE</Button>):(
           <div className="col-12 d-flex justify-content-end"> <Button
                color="primary"
                className="score-back mx-4 aftersave"
                onClick={this.prevtab}
              >
                BACK
              </Button>
              <Button
                color="primary"
                className="score-save aftersave"
                onClick={this.nexttab}
              >
                NEXT
              </Button></div>)}
          </div>
	</p>
 <p style={{display:this.state.EduaddMore==true?"block":"none"}}>
                                        <EduAddmore clearEduaddmore={this.state.clearEduaddmore}  getQuestiondata={this.getQuestiondata1} selectedQuestion={this.state.selectedQuestion1}></EduAddmore>
                                      </p>
        </div>
		
		<div className="col-12 col-md-3" >
		   <div className=" list-card uni-no-padd mt-3 add-more-box" >
                                      
                                      <button className="list-group-item w-100"
                                        // className="nav-l"
                                       onClick={() => edutab()}
                                      >
									  
                                       Education
                                       </button>
									   
									 
                               
                               
          
			   
			     <div className="uni-no-padd card-body">
                                  <ul className="university-list list-group">
                                    <div className="stepone">
                                      <div className="steptwo">
                                         {this.state.questiondata1.map((question, index)=>
                                          <li id="about" key={index} className="list-group-item" onClick={()=>this.setQuestiondata1(index)}>{question.question[0]}</li>
                                        )}
                                      
                                        </div>
                                        
                                           </div></ul></div> 
			   
			   </div>                 </div>
      </div>
    </div>
  );
};

export default template;
