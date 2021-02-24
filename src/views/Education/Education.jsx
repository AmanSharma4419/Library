import "./Education.css";
import React from "react";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Container,
  ListGroup,
  ListGroupItem,
  Media,
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
} from "reactstrap";

import Infoicon from "../../assets/img/student/info-icon.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Closeicon from "../../assets/img/close-btn.svg";

function template() {
  const { disabled } = this.props;
  const { errors, errors1 } = this.state;

  const prods = this.state.edusublevel.map((ub, index) => {
    console.log("ubb", ub);
    console.log("change", this.state.higheduleveltype);

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
          {/* <option value="" className="boldclass" disabled >
            {ub.mainlevel}
          </option> */}

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
          {/* <option value="" className="boldclass" disabled >
              {ub.mainlevel}
            </option> */}

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
          {/* <option value="" className="boldclass" disabled >
              {ub.mainlevel}
            </option> */}

          {sublevel}
        </>
      );
    }

  });

  const prods1 = this.state.elevel.map((ub, index) => {
    console.log("ubb", ub)

    if (this.state.higheduleveltype == "sublevel") {
      if (ub.sublevel.length > 0) {
        var sublevel = ub.sublevel.map((sublevel, i) => {
          return (
            <option
              value={sublevel.id}
              selected={this.state.eLevelValue == sublevel.id}
            >
              {sublevel.educationlevel_name}
            </option>
          );
        });
      }

      return (
        <>
          <option value={ub.id} selected={this.state.eLevelValue == ub.id}>
            {ub.mainlevel}
          </option>

          {sublevel}
        </>
      );
    }
    if (this.state.higheduleveltype == "mainlevel") {
      console.log("maainnnnn ***", this.state.highedulevel)
      if (ub.sublevel.length > 0) {
        var sublevel = ub.sublevel.map((sublevel, i) => {
          return (
            <option
              value={sublevel.id}
              selected={this.state.eLevelValue == sublevel.id}
            >
              {sublevel.educationlevel_name}
            </option>
          );
        });
      }

      return (
        <>
          <option value={ub.id} selected={this.state.eLevelValue == ub.id}>
            {ub.mainlevel}
          </option>
          {sublevel}
        </>
      );
    } else {
      if (ub.sublevel.length > 0) {

        var sublevel = ub.sublevel.map((sublevel, i) => {
          return (
            <option
              value={sublevel.id}
              selected={this.state.eLevelValue == sublevel.id}
            >
              {sublevel.educationlevel_name}
            </option>
          );
        });
      }

      return (
        <>
          <option value={ub.id} selected={this.state.eLevelValue == ub.id}>
            {ub.mainlevel}
          </option>
          {sublevel}
        </>
      );
    }

  });

  return (
    <div className="Education">
      <div className="row">
        {this.state.content ? (
          <div className="col-12">
            <div className="complete-box flex-column">
              <div className="row">
                <div className="com-top col-6">
                  <img
                    src={Infoicon}
                    alt="home-icon"
                    className="uni-icon pr-2"
                  />{" "}
                  <span className="align-middle">
                    PLEASE COMPLETE YOUR PROFILE?
                  </span>
                </div>
                <div className="com-top col-6 d-flex justify-content-end">
                  <img
                    src={Closeicon}
                    onClick={this.closepop}
                    alt="home-icon"
                    className="uni-icon pr-2"
                  />
                </div>
              </div>
              <div className="com-body">
                <p className="com-text mb-0">
                  <strong>Save time :</strong> Complete your profile once and
                  use for multiple enquiries/applications
                  <br />
                  <strong>
                    Receive the best guidance from institutions :
                  </strong>{" "}
                  Allow them to send you the most accurate information possible
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div className="col-12 per-box py-4">
          <div className="pr-header col-10 pl-2">
            <h3 className="px-0">Education Summary</h3>
          </div>
          <div className="personal-box-inner row px-0 px-sm-0 px-md-0 px-lg-4 px-xl-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="row pl-4 px-sm-4 px-md-0 px-lg-0 px-xl-0">
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">COUNTRY OF EDUCATION</Label>
                  <div class="select-wrapper">
                    <Input
                      type="select"
                      id="educountryid"
                      onChange={this.handleEducountryidChange}
                      className="disablepro"
                      placeholder="Select"
                    >
                      <option value="">Select</option>
                      {this.state.country.map((country) => (
                        <option
                          value={country.id}
                          selected={this.state.educountryid == country.id}
                        >
                          {country.country_name}
                        </option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>
                  {this.state.errors.educountryid}
                </h6>
              </div>

              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">
                    HIGHEST LEVEL OF EDUCATION
                  </Label>
                  <div class="select-wrapper">
                    <Input
                      type="select"
                      id="highedulevel"
                      onChange={this.handleHighedulevelChange}
                      className="disablepro"
                      placeholder="Select"
                    >
                      <option value="">Select</option>
                      {prods}
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>
                  {this.state.errors.highedulevel}
                </h6>
              </div>

              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">GRADING SCHEME</Label>
                  <div class="select-wrapper">
                    <Input
                      type="select"
                      id="gradingscheme"
                      onChange={this.handleGradingschemeChange}
                      className="disablepro"
                      placeholder="Select"
                    >
                      <option value="">Select</option>
                      {this.state.grade.map((grade) => (
                        <option
                          value={grade.id}
                          selected={this.state.gradingscheme == grade.id}
                        >
                          {grade.grading_scheme}
                        </option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>
                  {this.state.errors.gradingscheme}
                </h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">GRADING SCALE (OUT OFF)</Label>
                  <div class="select-wrapper">
                    <Input
                      type="select"
                      id="gradingscheme"
                      onChange={this.handleGradingscaleoutoffChange}
                      className="disablepro"
                      placeholder="Select"
                    >
                      <option value="">Select</option>
                      {this.state.grade.map((grade) => (
                        <option
                          value={grade.id}
                          selected={this.state.gradingscheme == grade.id}
                        >
                          {grade.grading_scheme}
                        </option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>
                  {this.state.errors.gradingscheme}
                </h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">GRADE AVERAGE</Label>
                  <div class="select-wrapper">

                    {this.state.gradingrange == 0 ?
                      <Input
                        type="select"
                        id="gradingscale"
                        onChange={this.handleGradingscaleChange}
                        className="disablepro"
                        placeholder="Select">
                        <option value="">Select</option>
                        {this.state.gradingscale1.map(graderange1 =>
                          <option value={graderange1.id} selected={this.state.gradingscale == graderange1.id}>{graderange1.grade_label}</option>
                        )}

                      </Input>
                      :
                      <Input type="number" className="disablepro" value={this.state.gradingscale}
                        onChange={this.handleGradingscaleChangeinputtext}
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                        }}
                      />
                    }
                  </div>
                </FormGroup>

                {this.state.gradeerror ? (<h6 style={{ color: "red" }}> Enter values between {this.state.minimumrange} to {this.state.maxrange}

                </h6>) : null}

              </div>

              <div className="col-md-6">
                {/*<FormGroup>
                  <Label className="uni-label">GRADE AVERAGE</Label>
                  <Input
                    type="number"
                    className="form-control disablepro"
                    placeholder="Enter Grade Average"
                    onChange={this.handleGradeaverageChange}
                    value={this.state.gradeaverage}
                    id="gradeaverage"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseFloat(e.target.value))
                        .toString()
                        .slice(0, 6);
                    }}
                  />
			   </FormGroup>  */}
                <h6 className="error" style={{ color: "red" }}>
                  {this.state.errors.gradeaverage}
                </h6>
              </div>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input disablepro"
                // defaultChecked={this.state.recentcheck}
                checked={this.state.recent_summ}
                id="mostrecent"
                onChange={this.handleMostrecentChange}
                value={this.state.recentcheck}
              />
              <label className="form-check-label">
                Graduated from most recent school
              </label>
            </div>
          </div>

          {this.state.recentcheck == true ? (
            <div>
              {this.state.awardedon.map((data, index) => (
                <div>
                  {this.maxDateHandler(this.state.awardedon) ==
                    data.toLocaleString() ? (
                      <>


                        <div className="row personal-box-inner row pl-2 pr-0 pr-sm-2 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
                          <h3 className="col-10 pr-header-recent">Recent Schools Attended</h3>

                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">
                                COUNTRY OF INSTITUTION
                            </Label>
                              <div class="select-wrapper">
                                <Input
                                  type="select"
                                  onChange={(evt) =>
                                    this.handleInsticountryChange(evt, index)
                                  }
                                  id="insticountry"
                                  className="disablepro insticountry"
                                  disabled={disabled}
                                >
                                  <option value="">Select Country</option>
                                  {this.state.country.map((country) => (
                                    <option
                                      value={country.id}
                                      selected={
                                        this.state.insticountry[index] ==
                                        country.id
                                      }
                                    >
                                      {country.country_name}
                                    </option>
                                  ))}
                                </Input>
                              </div>
                            </FormGroup>
                          </div>

                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">
                                LEVEL OF EDUCATION
                            </Label>
                              <div class="select-wrapper">
                                <Input
                                  type="select"
                                  id="edulevel"
                                  onChange={(evt) =>
                                    this.handleEdulevelChange(evt, index)
                                  }
                                  className="disablepro edulevel"
                                  disabled={disabled}
                                >
                                  <option value="">
                                    Select Level of Education
                                </option>
                                  {/* {this.state.elevel.map((elevel) => (
                                  <option
                                    value={elevel.id}
                                    selected={
                                      this.state.edulevel[index] == elevel.id
                                    }
                                  >
                                    {elevel.educationlevel_name}
                                  </option>
                                ))} */}
                                  {prods1}
                                </Input>
                              </div>
                            </FormGroup>
                          </div>

                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">
                                NAME OF INSTITUTION
                            </Label>
                              <Input
                                type="text"
                                className="form-control disablepro institutename"
                                placeholder="Enter Name of Institution"
                                value={this.state.institutename[index]}
                                onChange={(evt) =>
                                  this.handleInstitutenameChange(evt, index)
                                }
                                disabled={disabled}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">
                                PRIMARY LANGUAGE OF INSTRUCTION
                            </Label>
                              <Input
                                type="text"
                                className="form-control disablepro langinstruction"
                                placeholder="Enter Language of Instruction"
                                onChange={(evt) =>
                                  this.handleLanginstructionChange(evt, index)
                                }
                                value={this.state.langinstruction[index]}
                                disabled={disabled}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">
                                ATTENDED INSTITUTION FROM
                            </Label>
                              <DatePicker
                                selected={this.state.attendedfrom[index]}
                                onChange={(date) =>
                                  this.handleAttendedfromChange(date, index)
                                }
                                dateFormat="yyyy-MM-dd"
                                id="attendedfrom"
                                className="disablepro attendedfrom"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="YYYY-MMM-DD"
                                disabled={disabled}
                              // maxDate={new Date()}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">
                                ATTENDED INSTITUTION TO
                            </Label>

                              <DatePicker
                                selected={this.state.attendedto[index]}
                                onChange={(date) =>
                                  this.handleAttendedtoChange(date, index)
                                }
                                dateFormat="yyyy-MM-dd"
                                className="disablepro attendedto"
                                id="attendedto"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="YYYY-MMM-DD"
                                disabled={disabled}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">DEGREE AWARDED</Label>

                              <Input
                                type="text"
                                className="form-control disablepro awardeddegree"
                                placeholder="Enter Degree Awarded"
                                onChange={(evt) =>
                                  this.handleAwardeddegreeChange(evt, index)
                                }
                                value={this.state.awardeddegree[index]}
                                id="awardeddegree"
                                disabled={disabled}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">
                                DEGREE AWARDED ON
                            </Label>

                              <DatePicker
                                selected={this.state.awardedon[index]}
                                onChange={(date) => {
                                  this.handleAwardedonChange(date, index);
                                }}
                                dateFormat="yyyy-MM-dd"
                                className="disablepro awardedon"
                                id="awardedon"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="YYYY-MMM-DD"
                                disabled={disabled}
                              />
                            </FormGroup>
                          </div>

                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">INSTITUTE EMAIL</Label>
                              <Input
                                type="text"
                                className="form-control disablepro instemail"
                                placeholder="..."
                                onChange={(evt) =>
                                  this.handleInstemailChange(evt, index)
                                }
                                value={String(this.state.instemail[index]).trim()}
                                disabled={disabled}
                                onKeyDown={(e) =>
                                  e.keyCode === 32 && e.preventDefault()
                                }
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">
                                INSTITUTE PHONE Number
                            </Label>
                              <Input
                                type="number"
                                className="form-control disablepro instphone"
                                placeholder="..."
                                onChange={(evt) =>
                                  this.handleInstphoneChange(evt, index)
                                }
                                value={this.state.instphone[index]}
                                disabled={disabled}
                                onKeyDown={(e) =>
                                  (e.keyCode === 69 ||
                                    e.keyCode === 190 ||
                                    e.keyCode === 186 ||
                                    e.keyCode === 187 ||
                                    e.keyCode === 189) &&
                                  e.preventDefault()
                                }
                              />
                            </FormGroup>
                            <h6 className="error" style={{ color: "red" }}>
                              {errors[index] ? errors[index].instphone : null}{" "}
                            </h6>
                          </div>

                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">Address</Label>
                              <Input
                                type="text"
                                className="form-control disablepro insaddr"
                                placeholder="Enter Address.."
                                onChange={(evt) =>
                                  this.handleInsaddrChange(evt, index)
                                }
                                value={this.state.insaddr[index]}
                                disabled={disabled}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">City/Town</Label>
                              <div class="select-wrapper">
                                <Input
                                  type="select"
                                  id="scity"
                                  onChange={(evt) =>
                                    this.handleInscityChange(evt, index)
                                  }
                                  className="disablepro inscity"
                                  disabled={disabled}
                                >
                                  <option value="">Select</option>
                                  {this.state.inecity[index]
                                    ? this.state.inecity[index].map((cities) => (
                                      <option
                                        value={cities.id}
                                        selected={
                                          this.state.inscity[index] == cities.id
                                        }
                                      >
                                        {cities.name}
                                      </option>
                                    ))
                                    : null}
                                </Input>
                              </div>
                            </FormGroup>
                          </div>

                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">Province/State</Label>
                              <div class="select-wrapper">
                                <Input
                                  type="select"
                                  id="instate"
                                  onChange={(evt) =>
                                    this.handleInstateChange(evt, index)
                                  }
                                  className="disablepro instate"
                                  disabled={disabled}
                                >
                                  <option value="">Select</option>
                                  {this.state.inestate[index]
                                    ? this.state.inestate[index].map((states) => (
                                      <option
                                        value={states.id}
                                        selected={
                                          this.state.instate[index] == states.id
                                        }
                                      >
                                        {states.name}
                                      </option>
                                    ))
                                    : null}
                                </Input>
                              </div>
                            </FormGroup>
                          </div>
                          <div className="col-md-6 pr-0 pr-sm-3">
                            <FormGroup>
                              <Label className="uni-label">Postal/Zip Code</Label>
                              <Input
                                type="text"
                                className="form-control disablepro inszip"
                                placeholder="Enter Postal/Zip Code... "
                                id="szip"
                                onChange={(evt) =>
                                  this.handleInszipChange(evt, index)
                                }
                                value={this.state.inszip[index]}
                                id="inszip"
                                disabled={disabled}
                              />
                            </FormGroup>
                          </div>
                        </div>
                      </>
                    ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {this.state.schoolsattended.map((element, index) => (
            <>
              {this.state.recentcheck == true ? (
                this.maxIndexHandler(this.state.awardedon) != index ? (
                  <div className="personal-box-inner attend mt-1 row pr-0 pr-sm-4 pl-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
                    <div className="pr-header">
                      <h3 id="demo">
                        Schools Attended{" "}
                        <span className="counter">{index + 1}</span>
                      </h3>
                    </div>
                    <div className="row">

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            COUNTRY OF INSTITUTION
                          </Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="insticountry"
                              onChange={(evt) =>
                                this.handleInsticountryChange(evt, index)
                              }
                              className="disablepro insticountry"
                              disabled={disabled}
                            >
                              <option value="">Select Country</option>
                              {this.state.country.map((country) => (
                                <option
                                  value={country.id}
                                  selected={
                                    this.state.insticountry[index] == country.id
                                  }
                                >
                                  {country.country_name}
                                </option>
                              ))}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].insticountry : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            LEVEL OF EDUCATION
                          </Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="edulevel"
                              onChange={(evt) =>
                                this.handleEdulevelChange(evt, index)
                              }
                              className="disablepro edulevel"
                              disabled={disabled}
                            >
                              <option value="">
                                Select Level of Education
                              </option>
                              {/* {this.state.elevel.map((elevel) => (
                                <option
                                  value={elevel.id}
                                  selected={
                                    this.state.edulevel[index] == elevel.id
                                  }
                                >
                                  {elevel.educationlevel_name}
                                </option>
                              ))} */}
                              {prods1}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].edulevel : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            NAME OF INSTITUTION
                          </Label>
                          <Input
                            type="text"
                            className="form-control disablepro institutename"
                            placeholder="Enter Name of Institution"
                            onChange={(evt) =>
                              this.handleInstitutenameChange(evt, index)
                            }
                            value={this.state.institutename[index]}
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].institutename : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            PRIMARY LANGUAGE OF INSTRUCTION
                          </Label>
                          <Input
                            type="text"
                            className="form-control disablepro langinstruction"
                            placeholder="Enter Language of Instruction"
                            onChange={(evt) =>
                              this.handleLanginstructionChange(evt, index)
                            }
                            value={this.state.langinstruction[index]}
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].langinstruction : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            ATTENDED INSTITUTION FROM
                          </Label>

                          <DatePicker
                            selected={this.state.attendedfrom[index]}
                            onChange={(date) =>
                              this.handleAttendedfromChange(date, index)
                            }
                            dateFormat="yyyy-MM-dd"
                            id="attendedfrom"
                            className="disablepro attendedfrom"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="YYYY-MMM-DD"
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].attendedfrom : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            ATTENDED INSTITUTION TO
                          </Label>

                          <DatePicker
                            selected={this.state.attendedto[index]}
                            onChange={(date) =>
                              this.handleAttendedtoChange(date, index)
                            }
                            dateFormat="yyyy-MM-dd"
                            className="disablepro attendedto"
                            id="attendedto"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="YYYY-MMM-DD"
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].attendedto : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">DEGREE AWARDED</Label>

                          <Input
                            type="text"
                            className="form-control disablepro awardeddegree"
                            placeholder="Enter Degree Awarded"
                            onChange={(evt) =>
                              this.handleAwardeddegreeChange(evt, index)
                            }
                            value={this.state.awardeddegree[index]}
                            id="awardeddegree"
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].awardeddegree : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">DEGREE AWARDED ON</Label>

                          <DatePicker
                            selected={this.state.awardedon[index]}
                            onChange={(date) => {
                              this.handleAwardedonChange(date, index);
                            }}
                            dateFormat="yyyy-MM-dd"
                            className="disablepro awardedon"
                            id="awardedon"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="YYYY-MMM-DD"
                            disabled={disabled}
                          />
                        </FormGroup>

                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].awardedon : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">INSTITUTE EMAIL</Label>
                          <Input
                            type="text"
                            className="form-control disablepro instemail"
                            placeholder="..."
                            onChange={(evt) =>
                              this.handleInstemailChange(evt, index)
                            }
                            value={String(this.state.instemail[index]).trim()}
                            disabled={disabled}
                            onKeyDown={(e) =>
                              e.keyCode === 32 && e.preventDefault()
                            }
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].instemail : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            INSTITUTE PHONE Number
                          </Label>
                          <Input
                            type="text"
                            className="form-control disablepro instphone"
                            placeholder="..."
                            onChange={(evt) =>
                              this.handleInstphoneChange(evt, index)
                            }
                            value={this.state.instphone[index]}
                            disabled={disabled}
                            onKeyDown={(e) =>
                              (e.keyCode === 69 ||
                                e.keyCode === 190 ||
                                e.keyCode === 186 ||
                                e.keyCode === 187 ||
                                e.keyCode === 189) &&
                              e.preventDefault()
                            }
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].instphone : null}{" "}
                        </h6>
                      </div>
                      {/* {this.state.errors1.instphone2} */}
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">Address</Label>
                          <Input
                            type="text"
                            className="form-control disablepro insaddr"
                            placeholder="Enter Address.."
                            onChange={(evt) =>
                              this.handleInsaddrChange(evt, index)
                            }
                            value={this.state.insaddr[index]}
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].insaddr : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">Province/State</Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="instate"
                              onChange={(evt) =>
                                this.handleInstateChange(evt, index)
                              }
                              className="disablepro instate"
                              disabled={disabled}
                            >
                              <option value="">Select</option>
                              {this.state.inestate[index]
                                ? this.state.inestate[index].map((states) => (
                                  <option
                                    value={states.id}
                                    selected={
                                      this.state.instate[index] == states.id
                                    }
                                  >
                                    {states.name}
                                  </option>
                                ))
                                : null}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].instate : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">City/Town</Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="scity"
                              onChange={(evt) =>
                                this.handleInscityChange(evt, index)
                              }
                              className="disablepro inscity"
                              disabled={disabled}
                            >
                              <option value="">Select</option>
                              {this.state.inecity[index]
                                ? this.state.inecity[index].map((cities) => (
                                  <option
                                    value={cities.id}
                                    selected={
                                      this.state.inscity[index] == cities.id
                                    }
                                  >
                                    {cities.name}
                                  </option>
                                ))
                                : null}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].inscity : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">Postal/Zip Code</Label>
                          <Input
                            type="text"
                            className="form-control disablepro inszip"
                            placeholder="Enter Postal/Zip Code... "
                            id="szip"
                            onChange={(evt) =>
                              this.handleInszipChange(evt, index)
                            }
                            value={this.state.inszip[index]}
                            id="inszip"
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].inszip : null}
                        </h6>
                      </div>
                    </div>
                  </div>
                ) : null
              ) : (
                  <div className="personal-box-inner attend row px-4 col-10">
                    <div className="pr-header schatnd">
                      <h3 id="demo">
                        Schools Attended{" "}
                        <span className="counter">{index + 1}</span>
                      </h3>
                    </div>
                    <div className="row">


                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            COUNTRY OF EDUCATION
                        </Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="insticountry"
                              onChange={(evt) =>
                                this.handleInsticountryChange(evt, index)
                              }
                              className="disablepro insticountry"
                              disabled={disabled}
                            >
                              <option value="">Select Country</option>
                              {this.state.country.map((country) => (
                                <option
                                  value={country.id}
                                  selected={
                                    this.state.insticountry[index] == country.id
                                  }
                                >
                                  {country.country_name}
                                </option>
                              ))}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].insticountry : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">PLACE OF EDUCATION</Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="edulevel"
                              onChange={(evt) =>
                                this.handleEdulevelChange(evt, index)
                              }
                              className="disablepro edulevel"
                              disabled={disabled}
                            >
                              <option value="">Select Place of Education</option>

                              {prods1}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].edulevel : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">LEVEL OF EDUCATION</Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="edulevel"
                              onChange={(evt) =>
                                this.handleEdulevelChange(evt, index)
                              }
                              className="disablepro edulevel"
                              disabled={disabled}
                            >
                              <option value="">Select Level of Education</option>
                              {/* {this.state.elevel.map((elevel) => (
                              <option
                                value={elevel.id}
                                selected={
                                  this.state.edulevel[index] == elevel.id
                                }
                              >
                                {elevel.educationlevel_name}
                              </option>
                            ))} */}
                              {prods1}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].edulevel : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">INSTITUTE NAME</Label>
                          <Input
                            type="text"
                            className="form-control disablepro institutename"
                            placeholder="Enter Name of Institution"
                            onChange={(evt) =>
                              this.handleInstitutenameChange(evt, index)
                            }
                            value={this.state.institutename[index]}
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].institutename : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">GRADING SCHEME</Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="gradingscheme"
                              onChange={this.handleGradingschemeChange}
                              className="disablepro"
                              placeholder="Select"
                            >
                              <option value="">Select</option>
                              {this.state.grade.map((grade) => (
                                <option
                                  value={grade.id}
                                  selected={this.state.gradingscheme == grade.id}
                                >
                                  {grade.grading_scheme}
                                </option>
                              ))}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {this.state.errors.gradingscheme}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">GRADE AVERAGE</Label>
                          <div class="select-wrapper">

                            {this.state.gradingrange == 0 ?
                              <Input
                                type="select"
                                id="gradingscale"
                                onChange={this.handleGradingscaleChange}
                                className="disablepro"
                                placeholder="Select">
                                <option value="">Select</option>
                                {this.state.gradingscale1.map(graderange1 =>
                                  <option value={graderange1.id} selected={this.state.gradingscale == graderange1.id}>{graderange1.grade_label}</option>
                                )}

                              </Input>
                              :
                              <Input type="number" className="disablepro" value={this.state.gradingscale}
                                onChange={this.handleGradingscaleChangeinputtext}
                                onInput={(e) => {
                                  e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 6)
                                }}
                              />
                            }
                          </div>
                        </FormGroup>

                        {this.state.gradeerror ? (<h6 style={{ color: "red" }}> Enter values between {this.state.minimumrange} to {this.state.maxrange}

                        </h6>) : null}

                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            ATTENDED INSTITUTION FROM(OPTIONAL)
                        </Label>

                          <DatePicker
                            selected={this.state.attendedfrom[index]}
                            onChange={(date) =>
                              this.handleAttendedfromChange(date, index)
                            }
                            dateFormat="yyyy-MM-dd"
                            id="attendedfrom"
                            className="disablepro attendedfrom"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="YYYY-MMM-DD"
                            disabled={disabled}
                            maxDate={new Date()}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].attendedfrom : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            ATTENDED INSTITUTION TO(OPTIONAL)
                        </Label>

                          <DatePicker
                            selected={this.state.attendedto[index]}
                            onChange={(date) =>
                              this.handleAttendedtoChange(date, index)
                            }
                            dateFormat="yyyy-MM-dd"
                            className="disablepro attendedto"
                            id="attendedto"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="YYYY-MMM-DD"
                            disabled={disabled}
                            maxDate={new Date()}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].attendedto : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label"> NAME OF DEGREE </Label>

                          <Input
                            type="text"
                            className="form-control disablepro awardeddegree"
                            placeholder="Enter Degree Awarded"
                            onChange={(evt) =>
                              this.handleAwardeddegreeChange(evt, index)
                            }
                            value={this.state.awardeddegree[index]}
                            id="awardeddegree"
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].awardeddegree : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">DEGREE AWARDED ON</Label>

                          <DatePicker
                            selected={this.state.awardedon[index]}
                            onChange={(date) => {
                              this.handleAwardedonChange(date, index);
                            }}
                            dateFormat="yyyy-MM-dd"
                            className="disablepro awardedon"
                            id="awardedon"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            placeholderText="YYYY-MMM-DD"
                            disabled={disabled}
                            maxDate={new Date()}
                          />
                        </FormGroup>

                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].awardedon : null}
                        </h6>
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">INSTITUTE EMAIL</Label>
                          <Input
                            type="text"
                            className="form-control disablepro instemail"
                            placeholder="..."
                            onChange={(evt) =>
                              this.handleInstemailChange(evt, index)
                            }
                            value={String(this.state.instemail[index]).trim()}
                            disabled={disabled}
                            onKeyDown={(e) =>
                              e.keyCode === 32 && e.preventDefault()
                            }
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].instemail : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">
                            INSTITUTE PHONE Number
                        </Label>
                          <Input
                            type="number"
                            className="form-control disablepro instphone"
                            placeholder="..."
                            onChange={(evt) =>
                              this.handleInstphoneChange(evt, index)
                            }
                            value={this.state.instphone[index]}
                            disabled={disabled}
                            onKeyDown={(e) =>
                              (e.keyCode === 69 ||
                                e.keyCode === 190 ||
                                e.keyCode === 186 ||
                                e.keyCode === 187 ||
                                e.keyCode === 189) &&
                              e.preventDefault()
                            }
                          />
                        </FormGroup>
                        <h6  className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].instphone : null}
                        </h6>
                        {/* <h6 style={{ color: 'red' }}>{errors[index] ? errors[index].instphone : null} {this.state.errors1.instphone2}</h6> */}
                      </div>

                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">Address (OPTIONAL)</Label>
                          <Input
                            type="text"
                            className="form-control disablepro insaddr"
                            placeholder="Enter Address.."
                            onChange={(evt) =>
                              this.handleInsaddrChange(evt, index)
                            }
                            value={this.state.insaddr[index]}
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].insaddr : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">City/Town (OPTIONAL)</Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="scity"
                              onChange={(evt) =>
                                this.handleInscityChange(evt, index)
                              }
                              className="disablepro inscity"
                              disabled={disabled}
                            >
                              <option value="">Select</option>
                              {this.state.inecity[index]
                                ? this.state.inecity[index].map((cities) => (
                                  <option
                                    value={cities.id}
                                    selected={
                                      this.state.inscity[index] == cities.id
                                    }
                                  >
                                    {cities.name}
                                  </option>
                                ))
                                : null}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].inscity : null}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">Province (OPTIONAL)</Label>
                          <div class="select-wrapper">
                            <Input
                              type="select"
                              id="instate"
                              onChange={(evt) =>
                                this.handleInstateChange(evt, index)
                              }
                              className="disablepro instate"
                              disabled={disabled}
                            >
                              <option value="">Select</option>
                              {this.state.inestate[index]
                                ? this.state.inestate[index].map((states) => (
                                  <option
                                    value={states.id}
                                    selected={
                                      this.state.instate[index] == states.id
                                    }
                                  >
                                    {states.name}
                                  </option>
                                ))
                                : null}
                            </Input>
                          </div>
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].instate : null}
                        </h6>
                      </div>



                      <div className="col-md-6">
                        <FormGroup>
                          <Label className="uni-label">Postal/Zip Code (OPTIONAL)</Label>
                          <Input
                            type="text"
                            className="form-control disablepro inszip"
                            placeholder="Enter Postal/Zip Code... "
                            id="szip"
                            onChange={(evt) =>
                              this.handleInszipChange(evt, index)
                            }
                            value={this.state.inszip[index]}
                            id="inszip"
                            disabled={disabled}
                          />
                        </FormGroup>
                        <h6 className="error" style={{ color: "red" }}>
                          {errors[index] ? errors[index].inszip : null}
                        </h6>
                      </div>
                    </div>
                  </div>
                )}
            </>
          ))}
          <div class="row mt-5 pr-3">
            <div className="col-6">
              <Button
                color="primary"
                className="ml-0 add beforesave blue-addmore"
                type="submit"
                onClick={this.onAddEducation}
              >
                + Add More
              </Button>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <Button
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
              </Button>
              <Button
                color="primary"
                className="score-back mx-4 beforesave"
                onClick={this.prevtab}
              >
                BACK
              </Button>
              <Button
                color="primary"
                className="score-save beforesave"
                type="submit"
                onClick={this.onSubmit.bind(this)}
              >
                SAVE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default template;
