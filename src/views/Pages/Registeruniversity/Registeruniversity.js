import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
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
  InputGroupText,
} from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import axios from "axios";
import Closebtn from "../../../assets/img/close-btn.svg";
import config from "../../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backarrow from "../../../assets/img/back_arrow.svg";
var baseurl = `${config.baseurl}`;
//var baseurl = 'http://27.33.2.229/';

class Registeruniversity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      large: false,
      registersuccess: false,
      institute: "",
      country: "",
      firstname: "",
      position: "",
      email: "",
      lastname: "",
      phone: "",
      phonecode: "",
      website: "",
      message: "",
      errors: {},
      selectedIndex: 0,
      countrylist: [],
      activeItem: "",
      activeItem1: "",
      activeItem2: "",
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.step1validate = this.step1validate.bind(this);
    this.step2validate = this.step2validate.bind(this);
    this.handleSelect1 = this.handleSelect1.bind(this);
    this.handleButtonClick1 = this.handleButtonClick1.bind(this);

    axios.get(baseurl + "/get_country").then((response) => {
      console.log(response);
      //this.setState({data: [...json]});
      this.setState({
        countrylist: response.data,
      });
    });
  }

  handleSelect1 = (index) => {
    this.setState({ selectedIndex: index });
  };

  handleButtonClick1 = () => {
    this.setState({ selectedIndex: 0 });
    this.setState({ activeItem: "" });
  };
  handleButtonClick2 = () => {
    this.setState({ selectedIndex: 1 });
    this.setState({ activeItem1: "" });
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

  //componentDidMount() {

  //const query = new URLSearchParams(this.props.location.search);
  //const token = query.get('success');

  // alert(window.location.href);
  //}

  step1validate() {
    const errors = {};
    if (this.state.institute.trim() === "") {
      errors.institute = "Institute name is required";
      this.setState({ errors });
    }
    if (this.state.country.trim() === "") {
      errors.country = "Country name is required";
      this.setState({ errors });
    } else {
      this.setState({ selectedIndex: 1 });
      this.setState({ activeItem: 1 });
    }

    //console.log(this.state.errors);
    //this.setState({ selectedIndex: 1 });
    //debugger;
  }

  step2validate() {
    const errors = {};

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = this.state.email;

    var minmax = /^.{9,14}$/;
    var code = /^\+\d{1,2}$/;

    if (this.state.firstname.trim() === "") {
      errors.firstname = "First name is required";
    }
    if (this.state.position.trim() === "") {
      errors.position = "Position is required";
    }
    if (this.state.email.trim() === "") {
      errors.email = "Email is required";
    }
    if (!email.match(re)) {
      errors.email = "Invalid email";
    }
    if (this.state.lastname.trim() === "") {
      errors.lastname = "Last name is required";
    }
    if (this.state.phonecode.trim() === "") {
      errors.phone = "Phone code is required";
    }
    if (!this.state.phonecode.match(code)) {
      errors.phone = "Enter valid Phone code number";
    }
    if (this.state.phone.trim() === "") {
      errors.phone = "Phone is required";
    }
    if (!this.state.phone.match(minmax)) {
      errors.phone = "Enter a valid phone number between 9 to 14 digits";
    }
    if (this.state.website.trim() === "") {
      errors.website = "Website is required";
    } else {
      this.setState({ selectedIndex: 2 });
      this.setState({ activeItem1: 2 });
    }
    this.setState({ errors });
  }

  closeall() {
    window.location.reload();
  }

  handleInstituteChange = (event) => {
    this.setState({ institute: event.target.value });
  };

  handlestatusDropdownChange = (event) => {
    this.setState({ country: event.target.value });
  };

  handleFnameChange = (event) => {
    this.setState({ firstname: event.target.value });
  };

  handlePositionChange = (event) => {
    this.setState({ position: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleLastnameChange = (event) => {
    this.setState({ lastname: event.target.value });
  };

  handlePhoneChange = (event) => {
    this.setState({ phone: event.target.value });
  };

  handlePhonecodeChange = (event) => {
    this.setState({ phonecode: event.target.value });
  };

  handleWebsiteChange = (event) => {
    this.setState({ website: event.target.value });
  };

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  onSubmit = (e) => {
    //alert(this.state.phonecode.substring(1));
    e.preventDefault();
    // this.setState({ large: false });
    // this.setState({ aftersuccess: true });

    /*  alert(this.state.institute);
   alert(this.state.country);
   alert(this.state.firstname);
   alert(this.state.position);
   alert(this.state.email);
   alert(this.state.lastname);
   alert(this.state.phone);
   alert(this.state.website);
   alert(this.state.message);  */
    const data = {
      institute: this.state.institute,
      country: this.state.country,
      firstname: this.state.firstname,
      position: this.state.position,
      email: this.state.email,
      lastname: this.state.lastname,
      phonecode: this.state.phonecode.substring(1),
      phone: this.state.phone,
      website: this.state.website,
      message: this.state.message,
    };

    const post = axios
      .post(baseurl + "/storeuniversity", data)
      .then((response) => {
        if (response.data == 100) {
          toast.error("Email already exists");
          //alert("Email not exists");
        } else {
          this.setState({ large: false });
          this.setState({ registersuccess: true });
        }
      });
  };

  render() {
    //console.log(this.state.currentTab);
    const { errors } = this.state;
    const generalstart = `${config.generalstart}`;

    return (
      <div className="animated fadeIn foe-register">
        <ToastContainer />
        <Row className="uni-no-mar p-0">
          <Col className="p-0">
            <CardBody className="p-0">
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
                      Thank You For Your Interest
                      <br />
                      We Will Get Back To You Soon
                    </div>

                    <a
                      href="/#/login"
                      style={{ background: "#2B6A6C", fontSize: "12px" }}
                      color="link "
                      className="px-0 register-link-a"
                    >
                      BACK TO HOMEPAGE
                    </a>
                  </div>
                </ModalBody>
              </Modal>
              <div>
                <div className="head-1 mt-4 mb-3 pb-2">STUDENT PORTAL</div>
                <div className="head-2 pb-2">
                  <h3>Welcome to Formee Express</h3>
                </div>
                <div className="head-3 pb-4 mb-1">Don't have an account?</div>
                <Button color="primary" type="submit" className="px-4 mb-5">
                  Sign up
                </Button>
                <div className="head-4 pt-0 pt-sm-0 pt-md-2 pt-lg-2 pt-xl-3 pb-3 mt-0 mt-sm-0 mt-md-4 mt-lg-4 mt-xl-4">
                  By signing up or logging in, You agree to our terms &
                  conditions and privacy policy
                </div>
              </div>
              {/*<a className="back-btn mr-3" href={generalstart}>
                <Button color="link" className="px-0 ">
                  <span className="pr-1">
                    {" "}
                    <img src={backarrow} alt="" />
                  </span>{" "}
                  <span className="align-middle">Back </span>
                </Button>
              </a>*/}

              {/*<Button onClick={this.toggleLarge} className="mr-1 register-btn">
                Sign Up
              </Button>*/}
              <Modal
                isOpen={this.state.large}
                toggle={this.toggleLarge}
                className={
                  "modal-lg " + "register-popup" + " " + this.props.className
                }
              >
                <ModalBody>
                  <div className="modal_header">
                    <span>
                      Clear All&nbsp;&nbsp;&nbsp;
                      <img
                        src={Closebtn}
                        alt="close-icon"
                        onClick={this.closeall}
                        className="uni-icon"
                      />
                    </span>
                  </div>
                  <Form>
                    <Tabs
                      selectedIndex={this.state.selectedIndex}
                      onSelect={this.handleSelect1}
                    >
                      <TabList>
                        <Tab
                          className={
                            this.state.activeItem === 1
                              ? "step1 activestep1"
                              : "step1"
                          }
                          disabled
                        >
                          Step 1
                        </Tab>
                        <Tab
                          className={
                            this.state.activeItem1 === 2
                              ? "step2 activestep2"
                              : "step2"
                          }
                          disabled
                        >
                          Step 2
                        </Tab>
                        <Tab
                          className={
                            this.state.activeItem2 === 3
                              ? "step3 activestep3"
                              : "step3"
                          }
                          disabled
                        >
                          Step 3
                        </Tab>
                      </TabList>

                      <TabPanel className="step1">
                        <label>Institute name</label>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend"></InputGroupAddon>
                          <Input
                            type="text"
                            name="institute"
                            placeholder="Enter Institute Name"
                            value={this.state.institute}
                            onChange={this.handleInstituteChange}
                            required
                          />
                        </InputGroup>
                        <h6 style={{ color: "red" }}>{errors.institute}</h6>

                        <label>Country</label>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend"></InputGroupAddon>
                          <Input
                            type="select"
                            name="country"
                            id="country"
                            onChange={this.handlestatusDropdownChange}
                          >
                            <option value="">Select</option>
                            {this.state.countrylist.map((unicountry) => (
                              <option
                                value={unicountry.id}
                                selected={this.state.country == unicountry.id}
                              >
                                {unicountry.country_name}
                              </option>
                            ))}
                          </Input>
                        </InputGroup>
                        <h6 style={{ color: "red" }}>{errors.country}</h6>
                        <ModalFooter>
                          <Button onClick={this.step1validate}>START</Button>
                        </ModalFooter>
                      </TabPanel>

                      <TabPanel className="step2">
                        <div className="container">
                          <span className="tab-subtitle">Contact Person</span>
                          <div className="row">
                            <div className="col-sm">
                              <label>First name</label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                <Input
                                  type="text"
                                  name="firstname"
                                  placeholder="Enter Firstname"
                                  value={this.state.firstname}
                                  onChange={this.handleFnameChange}
                                />
                              </InputGroup>
                              <h6 style={{ color: "red" }}>
                                {errors.firstname}
                              </h6>

                              <label>Position</label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                <Input
                                  type="text"
                                  name="position"
                                  placeholder="Enter Position"
                                  value={this.state.position}
                                  onChange={this.handlePositionChange}
                                />
                              </InputGroup>
                              <h6 style={{ color: "red" }}>
                                {errors.position}
                              </h6>

                              <label>Email address</label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                <Input
                                  type="email"
                                  name="email"
                                  placeholder="Enter Email"
                                  value={this.state.email}
                                  onChange={this.handleEmailChange}
                                />
                              </InputGroup>
                              <h6 style={{ color: "red" }}>{errors.email}</h6>
                            </div>

                            <div className="col-sm">
                              <label>Last name</label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                <Input
                                  type="text"
                                  name="lastname"
                                  placeholder="Enter lastname"
                                  value={this.state.lastname}
                                  onChange={this.handleLastnameChange}
                                />
                              </InputGroup>
                              <h6 style={{ color: "red" }}>
                                {errors.lastname}
                              </h6>

                              <label>Phone</label>
                              <InputGroup className="mb-3 foe-phone">
                                <InputGroupAddon addonType="prepend">
                                  <Input
                                    className="code-no"
                                    type="number"
                                    name="phone"
                                    placeholder="+91"
                                    value={this.state.phonecode}
                                    onChange={this.handlePhonecodeChange}
                                    onKeyDown={(e) =>
                                      (e.keyCode === 69 ||
                                        e.keyCode === 190 ||
                                        e.keyCode === 187 ||
                                        e.keyCode === 189) &&
                                      e.preventDefault()
                                    }
                                  />
                                </InputGroupAddon>
                                <Input
                                  type="number"
                                  name="phone"
                                  placeholder="Enter phone"
                                  value={this.state.phone}
                                  onChange={this.handlePhoneChange}
                                  onKeyDown={(e) =>
                                    (e.keyCode === 69 ||
                                      e.keyCode === 190 ||
                                      e.keyCode === 187 ||
                                      e.keyCode === 189) &&
                                    e.preventDefault()
                                  }
                                />
                              </InputGroup>
                              <h6 style={{ color: "red" }}>{errors.phone}</h6>

                              <label>Website</label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                <Input
                                  type="text"
                                  name="website"
                                  placeholder="Enter website"
                                  value={this.state.website}
                                  onChange={this.handleWebsiteChange}
                                />
                              </InputGroup>
                              <h6 style={{ color: "red" }}>{errors.website}</h6>
                            </div>
                          </div>
                        </div>

                        <ModalFooter>
                          <Button
                            color="primary"
                            onClick={this.handleButtonClick1}
                            className="px-4 back-btn"
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
                          <div className="row">
                            <div className="col-sm">
                              <label className="tab-subtitle">Message</label>
                              <div className="tell-us">
                                Tell us about yourself
                              </div>
                              <InputGroup className="mb-3 foe-textbox">
                                <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                <textarea
                                  type="text"
                                  name="message"
                                  placeholder="Type here"
                                  cols={100}
                                  rows={10}
                                  value={this.state.message}
                                  onChange={this.handleMessageChange}
                                />
                              </InputGroup>
                            </div>
                          </div>
                        </div>

                        <ModalFooter>
                          <Button
                            color="primary"
                            onClick={this.handleButtonClick2}
                            className="px-4 back-btn"
                          >
                            BACK
                          </Button>
                          <Button
                            color="primary"
                            type="submit"
                            onClick={this.onSubmit.bind(this)}
                            className="px-4"
                          >
                            SEND ENQUIRY
                          </Button>
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

export default Registeruniversity;
