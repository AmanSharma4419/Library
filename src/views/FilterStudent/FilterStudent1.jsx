import React from "react";
import {
  Badge, Button, ButtonDropdown, ButtonGroup, ButtonToolbar, Card, CardBody, CardFooter,
  CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress, Row, Table,
  Container, ListGroup, ListGroupItem, Media, Form, FormGroup, FormText, FormFeedback, Input, Modal, ModalBody,
  InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Label, UncontrolledCollapse
} from 'reactstrap';

import Infoicon from '../../assets/img/student/info-icon.svg';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Closeicon from '../../assets/img/close-btn.svg';

import Clearicon from '../../assets/img/filter-clear.png';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import $ from "jquery";
import { countries } from "../../countryCodes";
import config from '../../config.json';
import axios from "axios";

var baseurl = `${config.baseurl}`;

const findCountryName = (countryCode) => {
  let name = "";
  countries.forEach((obj, index) => {
    if (index + 1 === countryCode) {
      name = obj.name;
    }
  });
  return name;
};

function template() {

  const { disabled } = this.props
  const { errors } = this.state

  // Retain saved search values after no button is clicked
  if (this.state.noBtnSelected) {
    //  debugger;
    const { educationCountry, educationLevel, gradeAverage, examType, readingScore, writingScore, listeningScore, speakingScore, greExamScore, gmatExamScore, showEligible } = JSON.parse(localStorage.getItem("noBtnSelectedData"));
    localStorage.setItem("noBtnSelected", "false");

    axios.get(baseurl + "/geteducatlevel/" + educationCountry).then((response) => {
      console.log('education level check', response);
      this.setState({
        edusublevel: response.data,
      });
    });

    setTimeout(() => {
      this.setState({
        noBtnSelected: false,
        gradeaverage: gradeAverage,
        readingscore: readingScore,
        writingscore: writingScore,
        listeningscore: listeningScore,
        speakingscore: speakingScore,
        educountryid: educationCountry,
        highedulevel: educationLevel,
        examtype: examType,
        gre_examscore: greExamScore,
        gmat_examscore: gmatExamScore,
        recent_summ: showEligible,
      });
    }, 500);
  }


  if (this.state.saveHistoryLocationLoaded && this.props.searchHistory.location !== "") {
    // setTimeout(() => {
    //   this.setState({
    //     location:this.props.searchHistory.location,
    //   });
    // }, 1000);
    $("#location option:selected").removeAttr("selected");
    $("#location").val(this.props.searchHistory.location).change();
  }
  if (this.state.programintake !== "") {
    $("#programintake").val(this.state.programintake);
  }

  if (this.state.programhighlevel !== "") {
    $("#programhighlevel").val(this.state.programhighlevel);
  }



  // const prods = this.state.edusublevel.map((ub, index) => {

  //   const sublevel = ub.sublevel.map((sublevel, i) => {
  //     return (

  //       <option value={sublevel.id} selected={this.state.highedulevel == sublevel.id}>{sublevel.educationlevel_name}</option>
  //     );
  //   });
  //   return (
  //     <>
  //       <option value="" className="boldclass" disabled>{ub.mainlevel}</option>
  //       {sublevel}
  //     </>
  //   );
  // });

  const prods = this.state.edusublevel.map((ub, index) => {
    if (this.state.higheduleveltype == "sublevel") {
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
          <option value={ub.id} selected={this.state.highedulevel == ub.id}>
            {ub.mainlevel}
          </option>
          {sublevel}
        </>
      );
    }
    if (this.state.higheduleveltype == "mainlevel") {
      console.log("maainnnnn ***", this.state.highedulevel)
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
          <option value={ub.id} selected={this.state.highedulevel == ub.id}>
            {ub.mainlevel}
          </option>
          {sublevel}
        </>
      );
    } else {
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
          <option value={ub.id} selected={this.state.highedulevel == ub.id}>
            {ub.mainlevel}
          </option>
          {sublevel}
        </>
      );
    }

  });

  const programcatlevel = this.state.edusublevel.map((ub, index) => {

    const sublevel = ub.sublevel.map((sublevel, i) => {
      return (

        <option value={sublevel.id}>{sublevel.educationlevel_name}</option>
      );
    });
    return (
      <>
        <option value="" className="boldclass" disabled>{ub.mainlevel}</option>
        {sublevel}
      </>
    );
  });

  // const onclickHandler =()=>{
  //   this.state.search = true
  //  this.props.searchfunction(this.state.search) 
  //  this.state.search == true ?  this.searchVal() : null
  // }
  return (
    <div className="Education">
      <div className="row mx-0">
        <div className="filter-clear d-flex justify-content-end w-100" onClick={this.props.closePanel}>
          <a style={{ color: "white", cursor: "pointer" }}>Hide Filter&nbsp;&nbsp;&nbsp;
			   <img src={Clearicon} alt="" className="uni-icon" /></a>
        </div>
        <div className="filter-group-box">
          <div className="filter-group">
            <div className="col-md-12">
              <FormGroup>

                <Label className="uni-label">What would you like to study?</Label>
                <Input
                  type="text"
                  className="form-control study"
                  placeholder="Type Here"
                  onChange={this.handleStudy}
                  value={this.state.study}

                />
              </FormGroup>
              {/* <h6 style={{ color: 'red' }}>{this.state.errors.study}</h6> */}
            </div>
            <div className="col-md-12">
              <FormGroup>
                <Label className="uni-label">Where? Location</Label>
                <Input type="select" id="location" onChange={this.handleLocation}>
                  <option value="">Select</option>
                  {this.state.country.map(country =>
                    <option value={country.id} selected={this.state.location == country.id}>
                      {country.country_name}</option>
                  )}
                </Input>
              </FormGroup>

              {/* <h6 style={{ color: 'red' }}>{this.state.errors.location}</h6> */}
            </div>
            <div className="col-md-12">
              <FormGroup>

                <Label className="uni-label">Where? e.g. School name</Label>
                <Input
                  type="text"
                  className="form-control study"
                  placeholder="Type Here"
                  onChange={this.handleUnivname}
                  value={this.state.uniname}

                />
              </FormGroup>
            </div>
          </div>
          <div className="col-12 my-4">
            <h2 className="filter-subheading"> More Search Filters</h2>
          </div>
          <div className="col-12 per-box py-4">
            <div className="flter-shop">
              <div className="col-md-12 filter-radio-btn px-0">
                <Button color="primary" color="primary" id="toggler" className="drop-left">Eligibility</Button>
                <UncontrolledCollapse toggler="#toggler" defaultOpen={true}>
                  <div className="destination-box">
                    <div className="row">

                      {/* <div className="col-12 mb-3">
                <FormGroup>
                  <Label className="uni-label">Do you have a valid Study Permit/ Visa?</Label>
                  <Input type="select" id="visa" onChange={this.handlePermitVisa} className="disablepro">
                              <option value=""> Select </option>
                              <option value='Yes'>Yes</option>
                              <option value='No'>No</option>    
                  </Input>
                </FormGroup>
                <h6 style={{ color: 'red' }}>{this.state.errors.permitvisa}</h6>
              </div> */}


                      <div className="col-12 mb-3">
                        {/* <FormGroup>
                  <Label className="uni-label">Nationality</Label>
                  
                  <Input type="text" className="form-control" placeholder="Nationality"
                                onChange={this.handleNationality} value={this.state.nationality}  
                              >
                    </Input>
                </FormGroup> */}
                        {/* <h6 style={{ color: 'red' }}>{this.state.errors.nationality}</h6> */}
                      </div>

                      <div className="col-12 mb-3">
                        <FormGroup>
                          <Label className="uni-label">Education Country</Label>
                          <Input type="select" id="educountryid" onChange={this.handleEducountryidChange} className="disablepro">
                            <option value="">Select</option>
                            {this.state.country.map(country =>
                              <option value={country.id} selected={this.state.educountryid == country.id}>
                                {country.country_name}</option>
                            )}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.educountryid}</h6>
                      </div>

                      <div className="col-12 mb-3">
                        <FormGroup>
                          <Label className="uni-label">EDUCATION LEVEL</Label>
                          <Input type="select" id="highedulevel" onChange={this.handleHighedulevelChange} className="disablepro">
                            <option value="">Select</option>
                            {prods}

                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.highedulevel}</h6>
                      </div>




                      <div className="col-12 mb-3" style={{ display: "none" }}>
                        <FormGroup>
                          <Label className="uni-label">GRADING SCHEME</Label>
                          <Input type="select" id="gradingscheme" onChange={this.handleGradingschemeChange} className="disablepro">
                            <option value="">Select</option>
                            {this.state.grade.map(grade =>
                              <option value={grade.id} selected={this.state.gradingscheme == grade.id}>
                                {grade.grading_scheme}</option>
                            )}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.gradingscheme}</h6>
                      </div>


                      <div className="col-12 mb-3">
                        <FormGroup>
                          <Label className="uni-label">GRADING AVERAGE</Label>
                          <Input
                            type="number"
                            className="form-control disablepro"
                            placeholder="Enter Grade Average"
                            onChange={this.handleGradeaverageChange}
                            value={this.state.gradeaverage}
                            id="gradeaverage" />
                          {/* onInput={(e) => {
                              e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                            }}  */}

                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.gradeaverage}</h6>
                      </div>

                    </div>



                  </div>
                  <div className="testscore">
                    <div className="row">

                      <div>
                        <div className="col-12 mb-3">
                          <FormGroup>
                            <Label className="uni-label">English Exam Type</Label>
                            <Input type="select" id="examtype" onChange={this.handleExamtypeChange} className='disablepro'>
                              <option value="">Select</option>
                              <option value="toefl" selected={'toefl' == this.state.examtype}>TOEFL</option>
                              <option value="ielts" selected={'ielts' == this.state.examtype}>IELTS</option>
                            </Input>
                          </FormGroup>
                          <h6 style={{ color: 'red' }}>{this.state.errors.examtype}</h6>
                        </div>


                        <div className="row uni-no-mar">
                          <div className="col-md-3">
                            <FormGroup>
                              <Label className="uni-label">Reading Scores</Label>
                              <Input type="number" className="form-control disablepro" placeholder="Score"
                                id="readingscore" onChange={this.handleReadingscoreChange} value={this.state.readingscore}
                                onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                                }}
                              />
                            </FormGroup>
                            <h6 style={{ color: 'red' }}>{this.state.errors.readingscore}</h6>
                          </div>
                          <div className="col-md-3">
                            <FormGroup>
                              <Label className="uni-label">Listening Scores</Label>
                              <Input type="number" className="form-control disablepro" placeholder="Score"
                                id="listeningscore" onChange={this.handleListeningscoreChange} value={this.state.listeningscore}
                                onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                                }}
                              />
                            </FormGroup>
                            <h6 style={{ color: 'red' }}>{this.state.errors.listeningscore}</h6>
                          </div>
                          <div className="col-md-3">
                            <FormGroup>
                              <Label className="uni-label">Writing Scores</Label>
                              <Input type="number" className="form-control disablepro" placeholder="Score"
                                id="writingscore" onChange={this.handleWritingscoreChange} value={this.state.writingscore}
                                onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                                }}
                              />
                            </FormGroup>
                            <h6 style={{ color: 'red' }}>{this.state.errors.writingscore}</h6>
                          </div>
                          <div className="col-md-3">
                            <FormGroup>
                              <Label className="uni-label">Speaking Scores</Label>
                              <Input type="number" className="form-control disablepro" placeholder="Score"
                                id="speakingscore" onChange={this.handleSpeakingscoreChange} value={this.state.speakingscore}
                                onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                                }}
                              />
                            </FormGroup>
                            <h6 style={{ color: 'red' }}>{this.state.errors.speakingscore}</h6>
                          </div>
                          <div className="form-check my-3">
                            <FormGroup>
                              <Label className="check-name" >
                                <input type="checkbox" className="form-check-input" checked={this.state.gre_examscore} onChange={this.handleGreExamScore} id="gre_examscore" />
                                <span className="checkmark"></span>
                              </Label>
                              <label className="form-check-label pl-3">GRE exam scores</label>
                            </FormGroup>
                          </div>
                          <div className="form-check my-3">
                            <FormGroup>
                              <Label className="check-name" >
                                <input type="checkbox" className="form-check-input" checked={this.state.gmat_examscore} onChange={this.handleGmatExamScore} id="gmat_examscore" />
                                <span className="checkmark"></span>
                              </Label>
                              <label className="form-check-label pl-3">GMAT exam scores</label>
                            </FormGroup>
                          </div>

                          <div className="form-check my-3">
                            <Label className="check-name" >
                              <input type="checkbox" className="form-check-input"
                                // defaultChecked={this.state.recentcheck}
                                checked={this.state.recent_summ}
                                id="mostrecent" onChange={this.handleMostrecentChange}
                              // value={this.state.recentcheck}
                              />
                              <span className="checkmark"></span>
                            </Label>
                            <label className="form-check-label pl-3">Show only eligible programs</label>
                          </div>

                          <div className="col-12 d-flex filter-bottom flex-column">
                            <Button color="primary" className="score-save beforesave" type="submit" onClick={this.oncheckvalidation}>Search</Button>
                          </div>


                        </div>
                      </div>
                    </div>

                  </div>
                </UncontrolledCollapse>
              </div>

              <div className="col-md-12 filter-radio-btn px-0 mt-5 purple-box">
                <Button color="primary" color="primary" id="toggler2" className="drop-left">School Filter</Button>
                <UncontrolledCollapse toggler="#toggler2" defaultOpen={false}>
                  {/* <div className="col-md-12 custom-control custom-radio">
							<InputGroup className="mb-4">
                            <label className="card-label">
                            Application Fee
                            </label>
							<Input type="select" name="application_fee" id="SelectLm" bsSize="sm" className="btn btn-secondary">
                              <option value=""> Select </option>
                              <option value='1'>Above 100</option>
                              <option value='2'>Below 100</option>                            
                            </Input>
                          </InputGroup>
						  
						</div>
						
						
						<div className="col-md-12 custom-control custom-radio">
							<InputGroup className="mb-4">
                            <label className="card-label">
                            Tution Fee
                            </label>
							<Input type="select" name="tution_fee" onChange={this.handleTueChange} id="SelectLm" bsSize="sm" className="btn btn-secondary">
                              <option value=""> Select </option>
                              <option value='1'>Above 100</option>
                              <option value='2'>Below 100</option>                            
                            </Input>
                          </InputGroup>						  
						</div> */}
                  <div>
                    <Label className="check-name" >
                      <input type="checkbox" className="form-check-input"
                        // defaultChecked={this.state.recentcheck}
                        checked={this.state.univtpe}
                        id="mostrecent" onChange={this.handleUnivType}
                      // value={this.state.recentcheck}
                      />
                      <span className="checkmark"></span>
                    </Label>
                    <label className="form-check-label pl-3">University</label>
                    <br />
                    <Label className="check-name" >
                      <input type="checkbox" className="form-check-input"
                        // defaultChecked={this.state.recentcheck}
                        checked={this.state.insttype}
                        id="mostrecent" onChange={this.handleInstType}
                      // value={this.state.recentcheck}
                      />
                      <span className="checkmark"></span>
                    </Label>
                    <label className="form-check-label pl-3">Institute</label>

                    <br />
                    <Label className="check-name" >
                      <input type="checkbox" className="form-check-input"
                        // defaultChecked={this.state.recentcheck}
                        checked={this.state.schooltype}
                        id="mostrecent" onChange={this.handleSchoType}
                      // value={this.state.recentcheck}
                      />
                      <span className="checkmark"></span>
                    </Label>
                    <label className="form-check-label pl-3">Schools</label>

                    <br />
                    <Label className="check-name" >
                      <input type="checkbox" className="form-check-input"
                        // defaultChecked={this.state.recentcheck}
                        checked={this.state.tafestype}
                        id="mostrecent" onChange={this.handleTafeType}
                      // value={this.state.recentcheck}
                      />
                      <span className="checkmark"></span>
                    </Label>
                    <label className="form-check-label pl-3">TAFES</label>
                  </div>

                </UncontrolledCollapse>
              </div>

              <div className="col-md-12 filter-radio-btn px-0 mt-5 purple-box">
                <Button color="primary" color="primary" id="togglerp" className="drop-left">Program Filter</Button>
                <UncontrolledCollapse toggler="#togglerp" defaultOpen={false}>
                  <div className="destination-box">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <FormGroup>
                          <Label className="uni-label">EDUCATION LEVEL</Label>
                          <Input type="select" id="programhighlevel" onChange={this.handleProgramHighedulevelChange} className="disablepro">
                            <option value="">Select</option>
                            {programcatlevel}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.programhighlevel}</h6>
                      </div>

                      <div className="col-12 mb-3">
                        <FormGroup>
                          <Label className="uni-label">Intake</Label>
                          <Input type="select" id="programintake" onChange={this.handleProgramIntakelevelChange} className="disablepro">
                            <option value="">Select</option>
                            {this.state.fullmonth.map(value => (
                              <option value={value}>{value}</option>
                            ))}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.programintake}</h6>
                      </div>

                      <div className="col-12 mb-3">
                        <FormGroup>
                          <Label className="uni-label">Category</Label>
                          <Input type="select" id="programcategory" onChange={this.handleProgramcategoryChange} className="disablepro">
                            <option value="">Select</option>
                            {this.state.allcategorylevel.filter(allcategorylevel => allcategorylevel.status == 1).map(category =>
                              <option value={category.id} selected={this.state.programcategory == category.id}>
                                {category.heading}</option>
                            )}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.programcategory}</h6>
                      </div>

                      <div className="col-12 mb-3">
                        <FormGroup>
                          <Label className="uni-label">Faculty</Label>
                          <Input type="select" id="Programfaculty" onChange={this.handleProgramfacultyChange} className="disablepro">
                            <option value="">Select</option>
                            {this.state.allfacultylevel.filter(allfacultylevel => allfacultylevel.status == 1).map(faculty =>
                              <option value={faculty.id} selected={this.state.Programfaculty == faculty.id}>
                                {faculty.heading}</option>
                            )}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: 'red' }}>{this.state.errors.Programfaculty}</h6>
                      </div>
                    </div>
                  </div>
                </UncontrolledCollapse>

              </div>

              {/* <div className="col-md-12 filter-radio-btn px-0 mt-5 orange-box">
<Button color="primary" color="primary" id="toggler3" className="drop-left">Program Filter</Button>
					<UncontrolledCollapse toggler="#toggler3" defaultOpen={false}>	
						<div className="col-md-12 custom-control custom-radio">
							<InputGroup className="mb-4">
                            <label className="card-label">
                            Application Fee
                            </label>
							<Input type="select" name="application_fee" id="SelectLm" bsSize="sm" className="btn btn-secondary">
                              <option value=""> Select </option>
                              <option value='1'>Above 100</option>
                              <option value='2'>Below 100</option>                            
                            </Input>
                          </InputGroup>
						  
						</div>
						
						
						<div className="col-md-12 custom-control custom-radio">
							<InputGroup className="mb-4">
                            <label className="card-label">
                            Tution Fee
                            </label>
							<Input type="select" name="tution_fee" onChange={this.handleTueChange} id="SelectLm" bsSize="sm" className="btn btn-secondary">
                              <option value=""> Select </option>
                              <option value='1'>Above 100</option>
                              <option value='2'>Below 100</option>                            
                            </Input>
                          </InputGroup>						  
						</div>
			</UncontrolledCollapse>
					</div>						 */}

            </div>




            {/*  <div className="form-check my-3">
              <input type="checkbox" className="form-check-input"
                // defaultChecked={this.state.recentcheck}
                checked={this.state.recent_summ}
                id="mostrecent" onChange={this.handleMostrecentChange}
              // value={this.state.recentcheck}
              />
              <label className="form-check-label">Show only eligible programs</label>

            </div>  */}


            <div className="col-12 d-flex justify-content-end">

              {/*<Button color="primary" className="score-save beforesave" type="submit" onClick={this.onsaveSearch.bind(this)}>SAVE</Button>*/}
            </div>


            <div className="col-12 d-flex filter-bottom flex-column">
              <h2>Do You Want To Save This Search?<img style={{ cursor: "default", marginBottom: "5px" }} src={Infoicon} alt="home-icon" className="uni-icon pr-2" /></h2>
              <div className="float-right">
                <Button color="primary" className="score-save beforesave" type="submit" onClick={this.onsaveSearch.bind(this)}>SAVE</Button>
                <Button color="primary" className="score-save beforesave reset" type="submit" onClick={this.resetAll.bind(this)}>Reset All</Button>
                <Button color="primary" className="score-save beforesave reset" type="submit" onClick={this.searchVal()} style={{ marginLeft: "40px" }}>Search</Button>

                {/* onClick={this.searchVal} */}


                {/* <Button color="primary" className="score-save beforesave" type="submit" onClick={this.toggleSearch}>Search</Button> */}

                {/* <Modal isOpen={this.state.searchBtn} toggle={this.toggleSearch}
                  className={'modal-lg ' + 'register-popup mx-auto mt-5 student-popup-box filter-popup' + ' ' + this.props.className}>
                  <ModalBody className="student-popup">
                    <Form>


                      <div className="text-center mx-auto d-flex justify-content-center py-4 row"> */}
                {/* <Button color="primary" className="score-save beforesave reset" type="submit" onClick={this.onSubmit.bind(this)} >Yes</Button> */}
                {/* <h6 className="mb-4 w-100">Are you sure you want to update your profile based on the changes made in filter?</h6>
                        <Button color="primary" className="score-save beforesave reset" type="submit" onClick={this.onSubmit.bind(this)} >Yes</Button>
                        <Button color="primary" className="score-save beforesave reset" type="submit" onClick={this.searchVal()} style={{ marginLeft: "40px" }}>No</Button>
                      </div>


                    </Form>

                  </ModalBody>

                </Modal> */}

                <Modal isOpen={this.state.searchBtn} toggle={this.toggleSearch}
                  className={'modal-lg ' + 'register-popup mx-auto mt-5 student-popup-box filter-popup' + ' ' + this.props.className}>
                  <ModalBody className="student-popup">
                    <Form>


                      <div className="text-center mx-auto d-flex justify-content-center py-4 row">
                        {/* <Button color="primary" className="score-save beforesave reset" type="submit" onClick={this.onSubmit.bind(this)} >Yes</Button> */}
                        <h6 className="mb-4 w-100">Are you sure you want to update your profile based on the changes made in filter?</h6>
                        <Button color="primary" className="score-save beforesave reset" type="submit" onClick={this.onSubmit.bind(this)} >Yes</Button>
                        <Button color="primary" className="score-save beforesave reset" type="submit" onClick={this.searchVal1()} style={{ marginLeft: "40px" }}>No</Button>
                      </div>

                    </Form>

                  </ModalBody>

                </Modal>


              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default template;