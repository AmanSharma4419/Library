import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Modal,
  Form,
  Input,
  InputGroup,
  ModalBody,
  InputGroupAddon,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import Closebtn from "../../../assets/img/close-btn.svg";
import backarrow from "../../../assets/img/back_arrow.svg";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import "react-toastify/dist/ReactToastify.css";
import config from "../../../config.json";
//import Select from 'react-select';
//import countryList from 'react-select-country-list';
var baseurl = `${config.baseurl}`;

class Register extends Component {
  constructor(props) {
    super(props);
    //this.options = countryList().getData()
    //this.options1 = countryList().getData()
    this.state = {
      large: false,
      registersuccess: false,
      errors: {},
      country: [],
      studentcountry: "",
      citizen: "",
      nationality: "",
      firstname: "",
      email: "",
      lastname: "",
      password: "",
      studentselectcountry: "",
      year: "",
      agree: "",
      subject: "",
      options: this.options,
      options1: this.options1,
      selectedIndex: 0,
      activeItem: "",
      activeItem1: "",
      activeItem2: "",
      activeItem3: "",
      inputClass: "",
      inputClass1: "",
      inputClass2: "",
      inputClass3: "",
      studylevels: [],
      currentPage: 1,
      todosPerPage: 2,
      ppid: "",
      enable_disable_register_button: true,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.step1validate = this.step1validate.bind(this);
    this.step2validate = this.step2validate.bind(this);
    this.step3validate = this.step3validate.bind(this);
    this.step4validate = this.step4validate.bind(this);
    this.handleSelect1 = this.handleSelect1.bind(this);
    this.handleButtonClick1 = this.handleButtonClick1.bind(this);
    this.handleButtonClick2 = this.handleButtonClick2.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.changeHandlercountry = this.changeHandlercountry.bind(this);

    axios.get(baseurl + "/get_country").then((response) => {
      console.log(response);
      //this.setState({data: [...json]});
      this.setState({
        country: response.data,
      });
    });
  }

  clearall = (param) => (e) => {
    //alert(param);

    if (param == 0) {
      this.setState({ studentcountry: "" });
      this.setState({ citizen: "" });
      this.setState({ nationality: "" });
    } else if (param == 1) {
      this.setState({ firstname: "" });
      this.setState({ email: "" });
      this.setState({ lastname: "" });
      this.setState({ password: "" });
    } else if (param == 2) {
      this.setState({ studentselectcountry: "" });
      this.setState({ year: "" });
      this.setState({ subject: "" });
    } else {
      this.setState({ agree: "" });
      this.setState({ year: "" });
      this.setState({ subject: "" });
    }
  };

  changeHandler = (value) => {
    this.setState({ value });
  };

  changeHandlercountry = (value1) => {
    this.setState({ value1 });
  };

  handleSelect1 = (index) => {
    this.setState({ selectedIndex: index });
    this.setState({ activeItem: "" });
  };

  handleButtonClick1 = () => {
    this.setState({ selectedIndex: 0 });
    this.setState({ activeItem1: "" });
  };

  handleButtonClick2 = () => {
    this.setState({ selectedIndex: 1 });
    this.setState({ activeItem2: "" });
  };

  handleButtonClick3 = () => {
    this.setState({ selectedIndex: 2 });
    this.setState({ enable_disable_register_button: true });
  };

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleSuccess() {
    this.setState({
      registersuccess: !this.state.registersuccess,
    });
  }

  componentDidMount() {
    $(document).ready(function () {
      $(".react-tabs ul li").click(function () {
        $(this).addClass(function (index) {
          return "item-" + index;
        });
      });
    });
  }

  step1validate() {
    const errors = {};
    var errvalue = false;
    if (this.state.studentcountry === "") {
      errors.studentcountry = "Country is required";
      errvalue = true;
    }
    // else if(this.state.citizen === ''){
    // errors.citizen = 'Please select';
    // }
    if (this.state.nationality === "") {
      errors.nationality = "Nationality is required";
      errvalue = true;
    }
    if (!errvalue) {
      this.setState({ selectedIndex: 1 });
      this.setState({ activeItem: 1 });
    }

    this.setState({ errors });
  }

  step2validate() {
    var pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = this.state.email;
    var errvalue = false;
    const errors = {};
    if (this.state.firstname.trim() === "") {
      errors.firstname = "First name is required";
      errvalue = true;
    }
    if (this.state.lastname.trim() === "") {
      errors.lastname = "Last name is required";
      errvalue = true;
    }
    if (this.state.email.trim() === "") {
      errors.email = "Email is required";
      errvalue = true;
    }
    if (this.state.email.trim() !== "") {
      if (!email.match(re)) {
        errors.email = "Invalid email";
        errvalue = true;
      }
    }
    if (this.state.password.trim() === "") {
      errors.password = "Password is required";
      errvalue = true;
    }
    if (this.state.password.trim() !== "") {
      if (!this.state.password.match(pwd)) {
        errors.password =
          "Minimum 8 characters with combination of uppercase,lowercase,number,special character required";
        errvalue = true;
      }
    }
    if (!errvalue) {
      this.setState({ selectedIndex: 2 });
      this.setState({ activeItem1: 2 });
    }
    this.setState({ errors });
  }

  step3validate() {
    const errors = {};
    var errvalue = false;
    if (this.state.studentselectcountry === "") {
      errors.studentselectcountry = "Please select";
      errvalue = true;
    }
    if (this.state.subject === "") {
      errors.subject = "Please Select";
      errvalue = true;
    }
    if (this.state.year === "") {
      errors.year = "Please Select";
      errvalue = true;
    }
    if (!errvalue) {
      this.setState({ selectedIndex: 3 });
      this.setState({ activeItem2: 3 });
    }
    this.setState({ errors });
  }

  step4validate() {
    const errors = {};
    if (this.state.agree.trim() === "") {
      errors.agree = "Please select";
    } else {
      this.onSubmit();
    }
    this.setState({ errors });
  }

  handleCitizenChange = (event) => {
    this.setState({ citizen: event.target.value });
    event.target.classList.add("navigation-active");
  };

  handleNationalityChange = (event) => {
    this.setState({ nationality: event.target.value });
    event.target.classList.add("navigation-active");
    this.setState({ inputClass1: "activedrop" });
  };

  handleFnameChange = (event) => {
    this.setState({ firstname: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePPIDChange = (event) => {
    this.setState({ ppid: event.target.value });
  };

  handleLastnameChange = (event) => {
    this.setState({ lastname: event.target.value });
  };

  handleYearChange = (event) => {
    this.setState({ year: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleNewletterChange = (event) => {
    this.setState({ newsletter: event.target.value });
  };

  handlePartnerChange = (event) => {
    this.setState({ partner: event.target.value });
  };

  handleAgreeChange = (event) => {
    this.setState({ agree: event.target.value });
  };

  handleSubjectChange = (event) => {
    //alert(event.target.value);
    this.setState({ subject: event.target.value });
    event.target.classList.add("navigation-active");
    this.setState({ inputClass3: "activedrop" });
  };

  handleStudentselectcountryChange = (event) => {
    this.setState({ studentselectcountry: event.target.value });
    event.target.classList.add("navigation-active");
    this.setState({ inputClass2: "activedrop" });

    axios
      .get(baseurl + "/geteducatlevel/" + event.target.value)
      .then((response) => {
        this.setState({
          studylevels: response.data,
        });
      });
  };

  handleStudentcountryChange = (event) => {
    this.setState({ studentcountry: event.target.value });
    event.target.classList.add("navigation-active");
    this.setState({ inputClass: "activedrop" });
  };

  closeall() {
    window.location.reload();
  }

  // closelogin(){
  // window.location.reload();
  // // alert();
  // }

  onSubmit() {
    //e.preventDefault()
    this.setState({ enable_disable_register_button: false });
    const data = {
      citizen: this.state.citizen,
      nationality: this.state.nationality,
      firstname: this.state.firstname,
      email: this.state.email,
      lastname: this.state.lastname,
      password: this.state.password,
      newsletter: this.state.newsletter,
      partner: this.state.partner,
      agree: this.state.agree,
      subject: this.state.subject,
      studentcountry: this.state.studentcountry,
      studentselectcountry: this.state.studentselectcountry,
      year: this.state.year,
      agent_id: this.state.ppid,
    };

    const post = axios
      .post(baseurl + "/storestudent", data)
      .then((response) => {
        if (response.data == 100) {
          toast.error("Email already exists");

          //alert("Email not exists");
        } else if (response.data == 200) {
          this.setState({ large: false });
          this.setState({
            registersuccess: true,
            enable_disable_register_button: true,
          });
        } else if (response.data === "Agent not exists") {
          toast.error("Invalid Preferred Partner ID");
          this.setState({ enable_disable_register_button: true });
        } else {
          toast.error("Error");
        }
      });
  }

  render() {
    const {
      errors,
      studylevels,
      currentPage,
      todosPerPage,
      subject,
    } = this.state;
    const generalstart = `${config.generalstart}`;
    console.log(this.state.subject);

    // const indexOfLastTodo = currentPage * todosPerPage;
    // const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    // const currentTodos = studylevels.slice(indexOfFirstTodo, indexOfLastTodo);

    const prods = studylevels.map((ub, index) => {
      const sublevel = ub.sublevel.map((sublevel, i) => {
        return (
          <option value={sublevel.id} selected={subject == sublevel.id}>
            {sublevel.educationlevel_name}
          </option>
        );
      });
      // return (
      // 	<>
      // 	<option value="" className="boldclass" disabled>{ub.mainlevel}</option>
      // 	{sublevel}
      // 	</>
      // );

      return (
        <>
          <option value={ub.id}>{ub.mainlevel}</option>
          {sublevel}
        </>
      );
    });

    return (
      <div className="animated fadeIn foe-register foe-student-reg">
        <ToastContainer />
        <Modal
          isOpen={this.state.registersuccess}
          toggle={this.toggleSuccess}
          className={
            "modal-md " +
            "register-popup sucess-pop" +
            " " +
            this.props.className
          }
        >
          <ModalBody>
            <div className="modal_header mb-4">
              <span>
                &nbsp;&nbsp;&nbsp;
                <img
                  src={Closebtn}
                  alt="close-icon"
                  onClick={this.closeall}
                  className="uni-icon"
                />
              </span>
            </div>
            <div className="p-5 text-center">
              <div className="mb-5 sucess-text">
                You have successfully Registered. Please check your mail to
                activate your account.
              </div>

              <a
                onClick={this.closeall}
                style={{ cursor: "pointer" }}
                color="link"
                className="px-0 register-link-a continue-btn"
              >
                CONTINUE TO LOGIN
              </a>
            </div>
          </ModalBody>
        </Modal>

        <Row className="uni-no-mar p-0">
          <Col className="p-0">
            <CardBody className="p-0">
              <div>
                <div className="head-1 mt-4 mb-3 pb-2">STUDENT PORTAL</div>
                <div className="head-2 pb-2">
                  <h3>Welcome to Formee Express</h3>
                </div>
                <div className="head-3 pb-4 mb-1">Don't have an account?</div>
                <Button
                  color="primary"
                  type="submit"
                  className="px-4 mb-5"
                  onClick={this.toggleLarge}
                >
                  Sign up
                </Button>
                <div className="head-4 pt-0 pt-sm-0 pt-md-2 pt-lg-2 pt-xl-3 pb-3 mt-0 mt-sm-0 mt-md-4 mt-lg-4 mt-xl-4">
                  By signing up or logging in, You agree to our terms &
                  conditions and privacy policy
                </div>
              </div>
              {/*<a className="back-btn mr-5 offset-md-1 offset-lg-1" href={generalstart}>
                      <Button color="link" className="px-0 no-icon"><span className="pr-1"> <img src={backarrow} alt="" /></span><span className="align-middle"> Back</span> </Button> 
						   </a>*/}
              {/*<Button onClick={this.toggleLarge} className="mr-1 signup-btn">Sign Up</Button>*/}
              <Modal
                isOpen={this.state.large}
                toggle={this.toggleLarge}
                className={
                  "modal-lg " +
                  "register-popup student-popup-box" +
                  " " +
                  this.props.className
                }
              >
                <div className="modal_header">
                  <span onClick={this.clearall(this.state.selectedIndex)}>
                    Clear All&nbsp;&nbsp;&nbsp;
                    <img
                      src={Closebtn}
                      alt="close-icon"
                      onClick={this.closeall}
                      className="uni-icon"
                    />
                  </span>
                </div>
                <ModalBody className="student-popup">
                  <Form>
                    <Tabs
                      selectedIndex={this.state.selectedIndex}
                      onSelect={this.handleSelect1}
                    >
                      <TabList>
                        <Tab
                          className={
                            this.state.activeItem === 1
                              ? "step1 step-click activestep1"
                              : "step1 step-click"
                          }
                          disabled
                        >
                          Start
                        </Tab>
                        <Tab
                          className={
                            this.state.activeItem1 === 2
                              ? "step2 step-click activestep2"
                              : "step2 step-click"
                          }
                          disabled
                        >
                          Step 1
                        </Tab>
                        <Tab
                          className={
                            this.state.activeItem2 === 3
                              ? "step3 step-click activestep3"
                              : "step3 step-click"
                          }
                          disabled
                        >
                          Step 2
                        </Tab>
                        <Tab
                          className={
                            this.state.activeItem3 === 4
                              ? "step4 step-click activestep4"
                              : "step4 step-click"
                          }
                          disabled
                        >
                          Finish
                        </Tab>
                      </TabList>

                      <TabPanel className="step1">
                        <h5 className="mt-4 mb-4 text-center">Get Start</h5>
                        <div className="col-12 px-0">
                          <label>Country of your residence</label>
                          <InputGroup className="mb-2">
                            <InputGroupAddon addonType="prepend"></InputGroupAddon>
                            <Input
                              type="select"
                              name="studentcountry"
                              id="studentcountry"
                              onChange={this.handleStudentcountryChange}
                              className={this.state.inputClass}
                            >
                              <option value="">Select Country</option>
                              {this.state.country.map((user) => (
                                <option
                                  value={user.id}
                                  selected={
                                    this.state.studentcountry == user.id
                                  }
                                >
                                  {user.country_name}
                                </option>
                              ))}
                            </Input>
                          </InputGroup>
                          <h6
                            className="error-msg-fix"
                            style={{ color: "red" }}
                          >
                            {errors.studentcountry}
                          </h6>
                        </div>
                        {/* <div className="col-12 px-0">
							<label className="mt-3">Is this your country of citizenship?</label>
							<div onChange={this.handleCitizenChange} >
							<div className="custom-control custom-radio custom-control-inline mr-5">
							<input className="custom-control-input" type="radio" checked={this.state.citizen === "yes"} value="yes" name="yes"/>  <label className="custom-control-label"> Yes </label>
							</div>
							<div className="custom-control custom-radio custom-control-inline">
							<input className="custom-control-input" type="radio" checked={this.state.citizen === "no"} value="no" name="no"/> <label className="custom-control-label"> No </label>
							</div>
							</div>
                            <h6 className="error-msg-fix" style={{color: 'red'}}>{errors.citizen}</h6>
							</div> */}
                        <div className="col-12 px-0">
                          <label className="mt-3">Your Nationality</label>
                          <InputGroup className="mb-2">
                            <InputGroupAddon addonType="prepend"></InputGroupAddon>
                            <Input
                              type="select"
                              name="nationality"
                              id="nationality"
                              value={this.state.nationality}
                              onChange={this.handleNationalityChange}
                              className={this.state.inputClass1}
                            >
                              <option value="">Select</option>
                              {this.state.country.map((nationality) => (
                                <option
                                  value={nationality.id}
                                  selected={
                                    this.state.nationality == nationality.id
                                  }
                                >
                                  {nationality.country_name}
                                </option>
                              ))}
                            </Input>
                          </InputGroup>
                          <h6
                            className="error-msg-fix"
                            style={{ color: "red" }}
                          >
                            {errors.nationality}
                          </h6>
                        </div>
                        <ModalFooter className="pt-4">
                          <Button onClick={this.step1validate}>START</Button>
                        </ModalFooter>
                      </TabPanel>

                      <TabPanel className="step2">
                        <div className="container">
                          <h5 className="mt-4 mb-4">Your details</h5>
                          <div className="row">
                            <div className="col-12 row">
                              <div className="col-6 my-2">
                                <label>First name</label>
                                <InputGroup className="mb-2">
                                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                  <Input
                                    type="text"
                                    name="firstname"
                                    placeholder="Type here"
                                    value={this.state.firstname}
                                    onChange={this.handleFnameChange}
                                  />
                                </InputGroup>
                                <h6
                                  className="error-msg-fix"
                                  style={{ color: "red" }}
                                >
                                  {errors.firstname}
                                </h6>
                              </div>
                              <div className="col-6 my-2">
                                <label>Last name</label>
                                <InputGroup className="mb-2">
                                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                  <Input
                                    type="text"
                                    name="lastname"
                                    placeholder="Type here"
                                    value={this.state.lastname}
                                    onChange={this.handleLastnameChange}
                                  />
                                </InputGroup>
                                <h6
                                  className="error-msg-fix"
                                  style={{ color: "red" }}
                                >
                                  {errors.lastname}
                                </h6>
                              </div>
                            </div>

                            <div className="col-12 row">
                              <div className="col-6 my-3">
                                <label>Email address</label>
                                <InputGroup className="mb-2">
                                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                  <Input
                                    type="email"
                                    name="email"
                                    placeholder="Type here"
                                    value={this.state.email.trim()}
                                    onChange={this.handleEmailChange}
                                    onKeyDown={(e) =>
                                      e.keyCode === 32 && e.preventDefault()
                                    }
                                  />
                                </InputGroup>
                                <h6
                                  className="error-msg-fix"
                                  style={{ color: "red" }}
                                >
                                  {errors.email}
                                </h6>
                              </div>
                              <div className="col-6 my-3">
                                <label>Password</label>
                                <InputGroup className="mb-2">
                                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                  <Input
                                    type="password"
                                    name="password"
                                    placeholder="Type here"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                  />
                                </InputGroup>
                                <h6
                                  className="error-msg-fix pswrd-err-msg-fix"
                                  style={{ color: "red" }}
                                >
                                  {errors.password}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>

                        <ModalFooter className="mt-4">
                          <Button
                            color="primary"
                            onClick={this.handleButtonClick1}
                            className="px-4"
                          >
                            BACK
                          </Button>
                          <Button
                            color="secondary"
                            onClick={this.step2validate}
                          >
                            NEXT
                          </Button>
                        </ModalFooter>
                      </TabPanel>

                      <TabPanel className="step3">
                        <div className="container">
                          <h5 className="mt-4 mb-4">I'm interested in</h5>
                          <div className="row">
                            <div className="col-sm">
                              <label>Where do you want to study?</label>
                              <InputGroup className="mb-3">
                                <Input
                                  type="select"
                                  name="studentselectcountry"
                                  id="studentselectcountry"
                                  onChange={
                                    this.handleStudentselectcountryChange
                                  }
                                  className={this.state.inputClass2}
                                >
                                  <option value="">Choose a Country</option>
                                  {this.state.country.map(
                                    (studentselectcountry) => (
                                      <option
                                        value={studentselectcountry.id}
                                        selected={
                                          this.state.studentselectcountry ==
                                          studentselectcountry.id
                                        }
                                      >
                                        {studentselectcountry.country_name}
                                      </option>
                                    )
                                  )}
                                </Input>
                              </InputGroup>
                              <h6
                                className="error-msg-fix"
                                style={{ color: "red" }}
                              >
                                {errors.studentselectcountry}
                              </h6>
                            </div>

                            <div className="col-sm">
                              <label>What do you want to study?</label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                <Input
                                  type="select"
                                  name="subject"
                                  id="subject"
                                  onChange={this.handleSubjectChange}
                                  className={this.state.inputClass3}
                                >
                                  <option value="">Choose a Subject</option>
                                  {prods}
                                </Input>
                              </InputGroup>
                              <h6
                                className="error-msg-fix"
                                style={{ color: "red" }}
                              >
                                {errors.subject}
                              </h6>
                            </div>
                          </div>
                          <div className="row mx-0 mt-3 mb-3">
                            <label className="col-12 reg-label uni-no-padd">
                              When would you like to study?
                            </label>
                            <div
                              className="student-check-block"
                              onChange={this.handleYearChange}
                            >
                              <div className="custom-control custom-radio custom-control-inline ">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  checked={this.state.year === "2020"}
                                  value="2020"
                                />{" "}
                                <label className="custom-control-label">
                                  {" "}
                                  <span className="check-1">2020</span>{" "}
                                </label>
                              </div>
                              <div className="custom-control custom-radio custom-control-inline ">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  checked={this.state.year === "2021"}
                                  value="2021"
                                />
                                <label className="custom-control-label">
                                  {" "}
                                  <span className="check-1">2021</span>{" "}
                                </label>
                              </div>
                              <div className="custom-control custom-radio custom-control-inline ">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  checked={this.state.year === "2022"}
                                  value="2022"
                                />{" "}
                                <label className="custom-control-label">
                                  {" "}
                                  <span className="check-1">2022</span>{" "}
                                </label>
                              </div>
                              <div className="custom-control custom-radio custom-control-inline ">
                                <input
                                  className="custom-control-input"
                                  type="radio"
                                  checked={this.state.year === "2023"}
                                  value="2023"
                                />{" "}
                                <label className="custom-control-label">
                                  {" "}
                                  <span className="check-1">2023</span>{" "}
                                </label>
                              </div>
                            </div>
                            <h6 style={{ color: "red" }}>{errors.year}</h6>
                          </div>
                        </div>

                        <ModalFooter>
                          <Button
                            color="primary"
                            onClick={this.handleButtonClick2}
                            className="px-4"
                          >
                            BACK
                          </Button>
                          <Button
                            color="secondary"
                            onClick={this.step3validate}
                          >
                            NEXT
                          </Button>
                        </ModalFooter>
                      </TabPanel>

                      <TabPanel className="step4">
                        <div className="col-12 row">
                          <div className="col-6 my-2">
                            <label>Preferred Partner ID:</label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend"></InputGroupAddon>
                              <Input
                                type="text"
                                name="ppid"
                                placeholder="Example: PP0120"
                                value={this.state.ppid}
                                onChange={this.handlePPIDChange}
                              />
                            </InputGroup>
                          </div>
                        </div>

                        <h6 className="mt-4 mb-4">
                          GET EMAIL UPDATES to stay informed (Optional)
                        </h6>

                        <div onChange={this.handleNewletterChange}>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              id="newsletter"
                              type="radio"
                              value="1"
                              name="newsletter"
                            />
                            <label className="custom-control-label">
                              {" "}
                              Newsletters <br />
                              Top tips including visa and scholarship
                              information from our in-house experts{" "}
                            </label>
                          </div>
                        </div>

                        <div onChange={this.handlePartnerChange}>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              id="partner"
                              type="radio"
                              value="1"
                              name="partner"
                            />
                            <label className="custom-control-label">
                              University and partner updates <br />
                              Emails on behalf of universities and carefully
                              selected third-party partners{" "}
                            </label>
                          </div>
                        </div>
                        <hr />
                        <div onChange={this.handleAgreeChange}>
                          <div className="custom-control custom-radio custom-control-inline">
                            <input
                              className="custom-control-input"
                              id="agree"
                              type="radio"
                              value="1"
                              name="agree"
                            />{" "}
                            <label className="custom-control-label">
                              {" "}
                              I confirm I am over 16 and I agree to Formee
                              Express Terms and Conditions & Privacy Notice.{" "}
                            </label>
                          </div>
                        </div>
                        <h6 style={{ color: "red" }}>{errors.agree}</h6>

                        <ModalFooter>
                          {/*<Button color="primary"  type="submit" onClick={this.onSubmit.bind(this)} className="px-4">Register</Button> */}
                          <Button
                            color="primary"
                            onClick={this.handleButtonClick3}
                            className="px-4"
                          >
                            BACK
                          </Button>
                          {this.state.enable_disable_register_button ===
                          true ? (
                            <Button
                              color="primary"
                              onClick={this.step4validate}
                            >
                              Register
                            </Button>
                          ) : null}
                        </ModalFooter>
                      </TabPanel>
                    </Tabs>
                  </Form>
                </ModalBody>
              </Modal>
            </CardBody>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Register;
