import "./Personalinfo.css";
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
import Closeicon from "../../assets/img/close-btn.svg";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function template() {
  // const prods = this.state.edusublevel.map((ub, index) => {
  //   const sublevel = ub.sublevel.map((sublevel, i) => {
  //     return (
  //       <option value={sublevel.id} selected={this.state.slevel == sublevel.id}>
  //         {sublevel.educationlevel_name}
  //       </option>
  //     );
  //   });
  //   return (
  //     <>
  //       <option value={ub.id}>
  //         {ub.mainlevel}
  //       </option>
  //       {sublevel}
  //     </>
  //   );
  // });
  const { disabled } = this.props;
  const { errors, errors1 } = this.state;

  const prods = this.state.edusublevel.map((ub, index) => {
    if (this.state.higheduleveltype == "sublevel") {
      const sublevel = ub.sublevel.map((sublevel, i) => {
        return (
          <option
            value={sublevel.id}
            selected={this.state.slevel == sublevel.id}
          >
            {sublevel.educationlevel_name}
          </option>
        );
      });

      return (
        <>
          <option value={ub.id} >
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

          >
            {sublevel.educationlevel_name}
          </option>
        );
      });

      return (
        <>
          <option value={ub.id} selected={this.state.slevel == ub.id}>
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

          >
            {sublevel.educationlevel_name}
          </option>
        );
      });

      return (
        <>
          <option value={ub.id} selected={this.state.slevel == ub.id}>
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


  return (
    <div className="personalinfo">
      <div className="row">
        {this.state.contentclose3 ? (
          <div className="col-12">
            <div className="complete-box flex-column">
              <div className="row">
                <div className="com-top col-10">
                  <img
                    src={Infoicon}
                    alt="home-icon"
                    className="uni-icon pr-2"
                  />{" "}
                  <span className="align-middle">
                    PLEASE COMPLETE YOUR PROFILE?
                  </span>
                </div>
                <div className="com-top col-2 d-flex justify-content-end">
                  <img
                    src={Closeicon}
                    alt="home-icon"
                    onClick={this.closepop4}
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
          <div className="match-box py-2 col-10">
            to get more relevant results, including "Best match" and apply to
            programs and schools that align with your background, skills, and
            interests.
          </div>
          <div className="destination-box row px-0 px-sm-0 px-md-0 px-lg-4 px-xl-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="row pl-4 px-sm-4 px-md-0 px-lg-0 px-xl-0">
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">
                    STUDY DESTINATION<span>*</span>
                  </Label>
                  <div className="select-wrapper">
                    <Input
                      type="select"
                      id="sdesti"
                      onChange={this.handleSdestiChange}
                      className="disablepro"
                    >
                      <option value="">Select</option>
                      {this.state.country.map((country) => (
                        <option
                          value={country.id}
                          selected={this.state.sdesti == country.id}
                        >
                          {country.country_name}
                        </option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.sdesti}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">
                    STUDY LEVEL<span>*</span>
                  </Label>
                  <div className="select-wrapper">
                    <Input
                      type="select"
                      id="slevel"
                      onChange={this.handleSlevelChange}
                      className="disablepro"
                    >
                      <option value="">Select</option>
                      {prods}
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.slevel}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">
                    What would you like to study?
                  </Label>

                  <Input
                    type="text"
                    className="form-control disablepro"
                    placeholder="What would you like to study?"
                    onChange={this.handleSlikeChange}
                    value={this.state.slike}
                  />
                  {/* <Input type="select" id="slike" onChange={this.handleSlikeChange} className="disablepro">
								<option value="">Select</option>
                              { this.state.grade.map(grade => 
                                <option value={grade.id} selected={this.state.slike == grade.id}>
                                {grade.grading_scheme}</option> 
								)}  </Input> */}
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.slike}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">When you plan to study?</Label>
                  <div className="select-wrapper">
                    <Input
                      type="select"
                      id="splan"
                      onChange={this.handleSplanChange}
                      className="disablepro"
                    >
                      <option value="">Select</option>
                      <option
                        selected={"2020" == this.state.splan}
                        value="2020"
                      >
                        2020
                      </option>
                      <option
                        selected={"2021" == this.state.splan}
                        value="2021"
                      >
                        2021
                      </option>
                      <option
                        selected={"2022" == this.state.splan}
                        value="2022"
                      >
                        2022
                      </option>
                      <option
                        selected={"2023" == this.state.splan}
                        value="2023"
                      >
                        2023
                      </option>
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.splan}</h6>
              </div>
            </div>
          </div>
          <div className="personal-box-inner row   px-0 px-sm-0 px-md-0 px-lg-4 px-xl-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="pr-header pl-4 px-sm-4 px-md-0 px-lg-0 px-xl-0">
              <h3>Personal Information</h3>
              <span>(As indicated on your passport)</span>
            </div>
            <div className="row pl-4 px-sm-4 px-md-0 px-lg-0 px-xl-0 pi_wrap">
              <div className="col-md-6 w-20">
                  <FormGroup>
                    <Label className="uni-label">TITLE </Label>
                    <div className="select-wrapper">
                    <select name="title" id="title" className="form-control disablepro" onChange={this.handleTnameChange}
                      value={this.state.title}>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                    </div>
                  </FormGroup>
                  <h6 className="error" style={{ color: "red" }}>{this.state.errors.title}</h6>
              </div>
                <div className="col-md-6 w-26">
                  <FormGroup>
                    <Label className="uni-label">FIRST NAME</Label>
                    <Input
                      type="text"
                      className="form-control disablepro"
                      placeholder="First Name"
                      onChange={this.handleFnameChange}
                      value={this.state.fname}
                    />
                  </FormGroup>
                  <h6 className="error" style={{ color: "red" }}>{this.state.errors.fname}</h6>
                </div>
                <div className="col-md-6 w-26">
                  <FormGroup>
                    <Label className="uni-label">MIDDLE NAME</Label>
                    <Input
                      type="text"
                      className="form-control disablepro"
                      placeholder="Middle Name"
                      onChange={this.handleMnameChange}
                      value={this.state.middleName}
                    />
                  </FormGroup>
                  <h6 className="error" style={{ color: "red" }}>{this.state.errors.lname}</h6>
                </div>
                <div className="col-md-6 w-26">
                  <FormGroup>
                    <Label className="uni-label">LAST NAME</Label>
                    <Input
                      type="text"
                      className="form-control disablepro"
                      placeholder="Last Name"
                      onChange={this.handleLnameChange}
                      value={this.state.lname}
                    />
                  </FormGroup>
                  <h6 className="error" style={{ color: "red" }}>{this.state.errors.lname}</h6>
                </div>
            </div>
           
            <div className="row pl-4 px-sm-4 px-md-0 px-lg-0 px-xl-0">
              
              
              
              
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
                    className="disablepro"
                    id="dateofbirth"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="YYYY-MMM-DD"
                    maxDate={new Date()}
                  />
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>
                  {this.state.errors.dateofbirth}
                </h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">First Language</Label>
                  <Input
                    type="text"
                    className="form-control disablepro"
                    placeholder="Enter First Language..."
                    onChange={this.handleFlangChange}
                    value={this.state.flang}
                  />
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.flang}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">Country of Citizenship</Label>
                  <div className="select-wrapper">
                    <Input
                      type="select"
                      id="citiship"
                      onChange={this.handleCitishipChange}
                      className="disablepro"
                    >
                      <option value="">Select</option>
                      {this.state.country.map((country) => (
                        <option
                          value={country.id}
                          selected={this.state.citiship == country.id}
                        >
                          {country.country_name}
                        </option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.citiship}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">Passport Number</Label>
                  <Input
                    type="text"
                    className="form-control disablepro"
                    placeholder="Enter Passport Number..."
                    onChange={this.handlePassnoChange}
                    value={this.state.passno}
                  />
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.passno}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">Gender</Label>
                  <div className="select-wrapper">
                    <Input
                      type="select"
                      id="sgender"
                      onChange={this.handleSgenderChange}
                      className="disablepro"
                    >
                      <option value="">Select</option>
                      <option
                        value="male"
                        selected={"male" == this.state.sgender}
                      >
                        Male
                      </option>
                      <option
                        value="female"
                        selected={"female" == this.state.sgender}
                      >
                        Female
                      </option>
                      <option
                        value="non-binary"
                        selected={"non-binary" == this.state.sgender}
                      >
                        Non-Binary
                      </option>
                      <option
                        value="disclose"
                        selected={"disclose" == this.state.sgender}
                      >
                        I dont want to disclose
                      </option>
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.sgender}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">Marital Status</Label>
                  <div className="select-wrapper">
                    <Input
                      type="select"
                      id="smarital"
                      onChange={this.handleSmaritalChange}
                      className="disablepro"
                    >
                      <option value="">Select</option>
                      <option
                        value="single"
                        selected={"single" == this.state.smarital}
                      >
                        Single
                      </option>
                      <option
                        value="married"
                        selected={"married" == this.state.smarital}
                      >
                        Married
                      </option>
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.smarital}</h6>
              </div>
            </div>
          </div>
          <div className="personal-box-inner address row px-0 px-sm-0 px-md-0 px-lg-4 px-xl-4 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
            <div className="pr-header pl-4 px-sm-4 px-md-0 px-lg-0 px-xl-0">
              <h3 class="cntct_detail">Contact Details</h3>
            </div>
            <div className="row pl-4 px-sm-4 px-md-0 px-lg-0 px-xl-0">
              <div className="col-md-12">
                <FormGroup>
                  <Label className="uni-label">ADDRESS LINE 1</Label>
                  <Input
                    type="text"
                    className="form-control "
                    placeholder="Address Line 1"
                    onChange={this.handleSaddr1Change}
                    value={this.state.saddr1}
                  />
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.saddr1}</h6>
              </div>
              <div className="col-md-12">
                <FormGroup>
                  <Label className="uni-label">ADDRESS LINE 2</Label>
                  <Input
                    type="text"
                    className="form-control "
                    placeholder="Address Line 2"
                    onChange={this.handleSaddr2Change}
                    value={this.state.saddr2}
                  />
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.saddr2}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">COUNTRY</Label>
                  <div className="select-wrapper">
                    <Input
                      type="select"
                      id="scountry"
                      onChange={this.handleScountryChange}
                      className="disablepro"
                    >
                      <option value="">Select</option>
                      {this.state.country.map((country) => (
                        <option
                          value={country.id}
                          selected={this.state.scountry == country.id}
                        >
                          {country.country_name}
                        </option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.scountry}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">PROVINCE/STATE</Label>
                  <div className="select-wrapper">
                    <Input
                      type="text"
                      id="sstate"
                      onChange={this.handleSstateChange}
                      className="disablepro"
                      placeholder="Enter Province..."
                    >
                      {/* <option value="">Select</option>
                      {this.state.states.map((states) => (
                        <option
                          value={states.id}
                          selected={this.state.sstate == states.id}
                        >
                          {states.name}
                        </option>
                      ))} */}
                    </Input>
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.sstate}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">POSTAL/ZIP CODE</Label>
                  <Input
                    type="text"
                    className="form-control disablepro"
                    placeholder="Enter Postal/Zip Code... "
                    id="szip"
                    onChange={this.handleSzipChange}
                    value={this.state.szip}
                    id="szip"
                  />
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.szip}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">EMAIL</Label>
                  <Input
                    type="text"
                    className="form-control disablepro"
                    placeholder="Enter Email.."
                    onChange={this.handleSemailChange}
                    value={this.state.semail.trim()}
                    onKeyDown={(e) =>
                      e.keyCode === 32 && e.preventDefault()
                    }
                  />
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.semail}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">PHONE NUMBER</Label>
                  <div class="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text static-plus">
                        <input
                          type="number"
                          className="form-control type-bbo disablepro number-arrow-disable"
                          placeholder="91"
                          onChange={this.handleSphcodeChange}
                          value={this.state.sphcode}
                          id="sphcode"
                          onKeyDown={(e) =>
                            (e.keyCode === 69 ||
                              e.keyCode === 190 ||
                              e.keyCode === 186 ||
                              e.keyCode === 187 ||
                              e.keyCode === 189) &&
                            e.preventDefault()
                          }
                        />
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control disablepro number-arrow-disable"
                      placeholder="Phone Number"
                      onChange={this.handleSphnoChange}
                      value={this.state.sphno}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 ||
                          e.keyCode === 190 ||
                          e.keyCode === 186 ||
                          e.keyCode === 187 ||
                          e.keyCode === 189) &&
                        e.preventDefault()
                      }
                    />
                  </div>
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.sphno}</h6>
              </div>

              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">ALTERNATE NUMBER</Label>
                  <div class="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text static-plus">
                        <input
                          type="number"
                          className="form-control type-bbo disablepro number-arrow-disable"
                          placeholder="91"
                          onChange={this.handleSmbcodeChange}
                          value={this.state.smbcode}
                          id="smbcode"
                          onKeyDown={(e) =>
                            (e.keyCode === 69 ||
                              e.keyCode === 190 ||
                              e.keyCode === 186 ||
                              e.keyCode === 187 ||
                              e.keyCode === 189) &&
                            e.preventDefault()
                          }
                        />
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control disablepro number-arrow-disable"
                      placeholder="Cell Number"
                      onChange={this.handleSmbnoChange}
                      value={this.state.smbno}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 ||
                          e.keyCode === 190 ||
                          e.keyCode === 186 ||
                          e.keyCode === 187 ||
                          e.keyCode === 189) &&
                        e.preventDefault()
                      }
                    />
                  </div>
                  <h6 className="error" style={{ color: "red" }}>{this.state.errors.smbno}</h6>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">NEXT OF KIN NAME </Label>
                  <Input
                    type="text"
                    className="form-control disablepro"
                    placeholder=" First and last name"
                    onChange={this.handleKnameChange}
                    value={this.state.kname}
                  />
                </FormGroup>
                <h6 className="error" style={{ color: "red" }}>{this.state.errors.kname}</h6>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">NEXT OF KIN CONTACT NUMBER </Label>
                  <div class="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text static-plus">
                        <input
                          type="number"
                          className="form-control type-bbo disablepro number-arrow-disable"
                          placeholder="91"
                          onChange={this.handleSmbcodeChange}
                          value={this.state.smbcode}
                          id="smbcode"
                          onKeyDown={(e) =>
                            (e.keyCode === 69 ||
                              e.keyCode === 190 ||
                              e.keyCode === 186 ||
                              e.keyCode === 187 ||
                              e.keyCode === 189) &&
                            e.preventDefault()
                          }
                        />
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control disablepro number-arrow-disable"
                      placeholder="Phone Number"
                      onChange={this.handleKcontactChange}
                      value={this.state.kcontact}
                      onKeyDown={(e) =>
                        (e.keyCode === 69 ||
                          e.keyCode === 190 ||
                          e.keyCode === 186 ||
                          e.keyCode === 187 ||
                          e.keyCode === 189) &&
                        e.preventDefault()
                      }
                    />
                  </div>
                  <h6 className="error" style={{ color: "red" }}>{this.state.errors.kcontact}</h6>
                </FormGroup>
              </div>
              {/* <div className="col-md-6">
                <FormGroup>
                  <Label className="uni-label">City/Town</Label>
                  <div className="select-wrapper">
                    <Input
                      type="select"
                      id="scity"
                      onChange={this.handleScityChange}
                      className="disablepro"
                    >
                      <option value="">Select</option>
                      {this.state.cities.map((cities) => (
                        <option
                          value={cities.id}
                          selected={this.state.scity == cities.id}
                        >
                          {cities.name}
                        </option>
                      ))}
                    </Input>
                  </div>
                </FormGroup>

                <h6 style={{ color: "red" }}>{this.state.errors.scity}</h6>
              </div> */}



            </div>
          </div>

          <div className="col-12 d-flex justify-content-end">
            <Button
              color="primary"
              className="score-save aftersave"
              onClick={this.nexttab}
            >
              NEXT
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
  );
}

export default template;
