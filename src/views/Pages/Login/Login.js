import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import axios from "axios";
import Registerstudent from "../Register/Register";
import llogo from "../../../assets/img/brand/university-logo.svg";
import eyeicon from "../../../assets/img/eye-pswd.png";
import { ToastContainer, toast } from "react-toastify";
import config from "../../../config.json";
import "react-toastify/dist/ReactToastify.css";
import backarrow from "../../../assets/img/back_arrow.svg";
var baseurl = `${config.baseurl}`;

class Login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const verify = query.get("verify");

    if (verify != null) {
      //alert();
      //this.setState({token: token});
      const data = {
        verify: verify,
      };

      // console.log(products);

      const post = axios
        .post(baseurl + "/verifystudent", data)
        .then((response) => {
          //alert(response.data.message);
          if (response.data.status_code == "100") {
            toast.error(response.data.message);
            var uri = window.location.toString();
            if (uri.indexOf("?") > 0) {
              var clean_uri = uri.substring(0, uri.indexOf("?"));
              window.history.replaceState({}, document.title, clean_uri);
            }
          } else {
            toast.success(response.data.message);
            var uri = window.location.toString();
            if (uri.indexOf("?") > 0) {
              var clean_uri = uri.substring(0, uri.indexOf("?"));
              window.history.replaceState({}, document.title, clean_uri);
            }
          }
        });
    }
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  validate = () => {
    const errors = {};

    //alert(this.state.email.trim());
    if (this.state.email.trim() === "") {
      errors.email = "Email is required";
    } /*else{	
		 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	     const email = this.state.email;
		 if(!email.match(re)) {
		 errors.email = 'Invalid email';
         //return false;
		 }
	  }  */
    if (this.state.password.trim() === "") {
      errors.password = "Password is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    // console.log(products);

    const post = axios
      .post(baseurl + "/checkstudent", data)
      .then((response) => {
        if (response.data == "error") {
          toast.error("Invalid credentials");
        } else if (response.data == "error1") {
          toast.error("Please activate your account");
        } else {
          console.log(response.data[0].id);
          console.log(response.data[0].email);
          localStorage.setItem("studentid", response.data[0].id);
          localStorage.setItem("studentemail", response.data[0].email);
          localStorage.setItem(
            "completeprofile",
            response.data[0].profilefilled
          );
          
          // https://formeeuniversity.bicsglobal.com/#/category
          if (response.data[0].profilefilled !== 1) {
            window.location = "/#/studentlibrary";
          } else {
            window.location = "/#/studentlibrary";
          }
        }
      });

    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ errors: "" });
  };

  mouseoverPass = () => {
    var obj = document.getElementById("myPassword");
    if (obj !== null) {
      obj.type = "text";
    }
  };
  mouseoutPass = () => {
    var obj = document.getElementById("myPassword");
    if (obj !== null) {
      obj.type = "password";
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="app login-bg student-login">
        <div className="col-11 mx-auto">
          <a className="back-btn mr-3" href={`${config.generalurl}`}>
            <Button color="" className="px-0 ">
              <span className="pr-1">
                {" "}
                <img src={backarrow} alt="" />
              </span>{" "}
              <span className="align-middle">Back </span>
            </Button>
          </a>
        </div>
        <div className="mx-auto login-bos">
          <Link to="/login">
            <img src={llogo} alt="formee-logo" className="login-logo" />
          </Link>
        </div>
        <div className="">
          <Row className="justify-content-center uni-no-mar">
            <Container>
              <ToastContainer />
              <Row className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 px-0 mb-5 mx-auto">
                <Col
                  xs="12"
                  sm="12"
                  md="5"
                  lg="4"
                  xl="4"
                  className="student-left-login pt-5 pb-4 px-5"
                >
                  <Registerstudent />
                </Col>
                <Col
                  xs="12"
                  sm="12"
                  md="7"
                  lg="8"
                  xl="8"
                  className="foe-login-inner mx-auto foe-login"
                >
                  <CardGroup className="custom_group">
                    <Card className="p-4 my-3">
                      <CardBody className="pt-0 pt-sm-0 pt-md-5 pt-lg-5 pt-xl-5">
                        <Form>
                          <InputGroup className="mb-3">
                            <label className="foe-login-label">email</label>
                            <Input
                              type="text"
                              name="email"
                              placeholder="Email"
                              value={this.state.email.trim()}
                              onChange={this.handleEmailChange}
                              onKeyDown={(e) =>
                                e.keyCode === 32 && e.preventDefault()
                              }
                            />
                          </InputGroup>
                          <h6 style={{ color: "red" }}>{errors.email}</h6>
                          <InputGroup className="mb-4">
                            <label className="foe-login-label">password</label>
                            <Input
                              id="myPassword"
                              type="password"
                              name="password"
                              className="pswd-field"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.handlePasswordChange}
                            />
                            <span>
                              <img
                                src={eyeicon}
                                alt=""
                                className="eye-icon"
                                onMouseOver={this.mouseoverPass}
                                onMouseOut={this.mouseoutPass}
                              />
                            </span>
                          </InputGroup>
                          <h6 style={{ color: "red" }}>{errors.password}</h6>
                          <Col
                            xs="12 mb-4 px-0"
                            className="text-right login-forgot"
                          >
                            <Link to="/forgot">
                              <a
                                color="link"
                                className="px-0"
                                style={{ color: "#fff" }}
                              >
                                Forgot password?
                              </a>
                            </Link>
                          </Col>
                          <Row className="uni-no-mar">
                            <Col
                              xs="12"
                              className="login-button mt-3 mt-sm-3 mt-md-4 mt-lg-4 mt-xl-4"
                            >
                              <Button
                                color="primary"
                                type="submit"
                                onClick={this.onSubmit.bind(this)}
                                className="px-4"
                              >
                                Login
                              </Button>
                            </Col>
                            {/* <Col xs="6" className="text-right">
						<Link to="/forgot">
                          <Button color="link" className="px-0">Forgot password?</Button>
						   </Link>
                        </Col>  */}
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                    {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
						{<Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
						</Link>}
                    </div>
                  </CardBody>
                </Card> */}
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </Row>
        </div>
      </div>
    );
  }
}

export default Login;
