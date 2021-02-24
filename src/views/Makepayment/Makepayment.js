import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";

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
  FormGroup,
  Label,
  Input,
  DropdownToggle,
  Progress,
  Row,
  Table,
  Container,
  ListGroup,
  ListGroupItem,
  Media,
  Modal,
  ModalBody,
} from "reactstrap";
import Pricon from "../../assets/img/student/personal-icon.svg";
import Flagicon from "../../assets/img/student/flag-my-icon.svg";
import $ from "jquery";
import Personalinfo from "./../Personalinfo/Personalinfo";
import Education from "./../Education/Education";
import Testscore from "./../Testscore/Testscore";
import Backgroundinfo from "./../Backgroundinfo/index";
import UploadDocment from "./../UploadDocment/UploadDocment";
import axios from "axios";
import config from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deakinlogo from "../../assets/img/university/deakin_logo.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaypalExpressBtn from "react-paypal-express-checkout";
import Closebtn from "../../assets/img/close-btn.svg";
import Paypalbtn from "../../assets/img/paypal.svg";
import stripepay from "../../assets/img/stippay.png";
import CheckListTwo from "./Stripe.js";
var baseurl = `${config.baseurl}/`;

// API Call Url //

function submitFormData(contentType, data) {
  axios({
    url: baseurl + `store_carddetails`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      toast.success("Payment Details Saved Successfully.");
    })
    .catch((error) => {
      toast.error("Payment Details Not Saved.");
    });
}

function submitForm(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `storebilling`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
    })
    .catch((error) => {
      setResponse("error");
    });
}

class Makepayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editpaypalCard: false,
      editcreditCard: false,
      editstripeCard: false,
      fname: "",
      lname: "",
      bfname: "",
      lfname: "",
      baddr: "",
      bcity: "",
      bcountry: "",
      bstate: "",
      bzip: "",
      bphcode: "",
      bphno: "",

      fname1: "",
      lname1: "",

      bfname1: "",
      lfname1: "",
      baddr1: "",
      bcity1: "",
      bcountry1: "",
      bstate1: "",
      bzip1: "",
      bphcode1: "",
      bphno1: "",

      country: [],
      sdob: "",
      disabled: true,
      states: [],
      cities: [],
      saddr: "",
      scity: "",
      scountry: "",
      sstate: "",
      szip: "",
      sphcode: "",
      sphno: "",
      errors: {},
      formData: new FormData(),
      universityid: "",
      logo: "",
      institute_name: "",
      coursename: "",
      application_fee: "",
      pay_purchase_remember: false,
      stripe_purchase_remember: false,
      credit_purchase_remember: false,
      large: false,
      responsestatus: "",
      paymentsuccess: false,
      payment: "",
      applicationid: "",
      paymenttype: "",
      feeType: "",
      creditcardnumber: "",
      creditcardexpiredate: "",
      creditcardsecurity: "",
      creditcardzip: "",
      stripecardnumber: "",
      stripecardexpiredate: "",
      stripecardsecurity: "",
      creditcardzip: "",
      paypalcardnumber: "",
      paypalcardexpiredate: "",
      paypalcardsecurity: "",
      paypalcardzip: "",
      res_token: "",
      paycarddataId: 0,
      paypurchase_remember_value: 0,
      paycreditcardname: "",
      creditcarddataId: 0,
      creditpurchase_remember_value: 0,
      creditcreditcardname: "",
      stripecarddataId: 0,
      stripepurchase_remember_value: 0,
      stripecreditcardname: "",
    };

    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getGeneraldata();
    axios.get(baseurl + "get_country").then((response) => {
      console.log(response);

      this.setState({
        country: response.data,
      });
    });
  }

  getGeneraldata() {
    //alert();
    // alert(localStorage.getItem('selectcoursedraft'));
    // alert(localStorage.getItem('studentid'));

    axios
      .get(
        baseurl +
          "getapplicationid/" +
          localStorage.getItem("selectcoursedraft") +
          "/" +
          localStorage.getItem("studentid")
      )
      .then((response) => {
        console.log("courseData", response.data);
        this.setState({
          applicationid: response.data.courses.id,
          course_startdate: response.data.courses.course_startdate,
          course_enddate: response.data.courses.course_enddate,
        });
      });

    axios
      .get(baseurl + "getCarddetails/" + localStorage.getItem("studentid"))
      .then((response) => {
        var paypalarr = [];
        var creditarr = [];
        var stripearr = [];
        response.data.card_details.map((item) => {
          if (item.pay_by === "Paypal") {
            paypalarr.push(item);
          }

          if (item.pay_by === "Stripe") {
            stripearr.push(item);
          }

          if (item.pay_by === "Credit") {
            creditarr.push(item);
          }
        });

        if (paypalarr.length !== 0) {
          var len = paypalarr.length - 1;
          this.setState({
            paycreditcardname: paypalarr[len].creditcard_name,
            paypurchase_remember_value: paypalarr[len].purchase_remember,
            paycarddataId: paypalarr[len].id,
            paypalcardnumber: paypalarr[len].creditcard_number,
            paypalcardexpiredate: moment(paypalarr[len].expiry_date).format(
              "YYYY-MM-DD"
            ),
            paypalcardsecurity: paypalarr[len].security_code,
            paypalcardzip: paypalarr[len].zipcode,
          });
          if (paypalarr[len].purchase_remember === 0) {
            this.setState({
              pay_purchase_remember: true,
              paymenttype: "paypal",
            });
          }
        } else {
          this.setState({ editpaypalCard: true });
        }

        if (stripearr.length !== 0) {
          debugger;
          var len = stripearr.length - 1;

          this.setState({
            res_token: stripearr[len].stripe_tokenid,
            stripecreditcardname: stripearr[len].creditcard_name,
            stripepurchase_remember_value: stripearr[len].purchase_remember,
            stripecarddataId: stripearr[len].id,
            stripecardnumber: stripearr[len].creditcard_number,
            stripecardexpiredate: moment(stripearr[len].expiry_date).format(
              "YYYY-MM-DD"
            ),
            stripecardsecurity: stripearr[len].security_code,
            stripecardzip: stripearr[len].zipcode,
          });
          if (stripearr[len].purchase_remember === 0) {
            this.setState({
              stripe_purchase_remember: true,
              paymenttype: "stripe",
            });
          }
        }

        if (creditarr.length !== 0) {
          var len = creditarr.length - 1;
          this.setState({
            creditcreditcardname: creditarr[len].creditcard_name,
            creditpurchase_remember_value: creditarr[len].purchase_remember,
            creditcarddataId: creditarr[len].id,
            creditcardnumber: creditarr[len].creditcard_number,
            creditcardexpiredate: moment(creditarr[len].expiry_date).format(
              "YYYY-MM-DD"
            ),
            creditcardsecurity: creditarr[len].security_code,
            creditcardzip: creditarr[len].zipcode,
          });
          if (creditarr[len].purchase_remember === 0) {
            this.setState({
              credit_purchase_remember: true,
              paymenttype: "credit",
            });
          }
        } else {
          this.setState({ editcreditCard: true });
        }
      });

    axios
      .get(
        baseurl +
          "getuniversityidwithcourseid/" +
          localStorage.getItem("selectcoursedraft")
      )
      .then((response) => {
        this.setState({ universityid: response.data });
        axios
          .get(baseurl + "getuniversityabout/" + response.data)
          .then((response1) => {
            if (response1.data.length > "0") {
              this.setState({
                logo: response1.data[0].logo_image,
                institute_name: response1.data[0].institute_name,
              });
              //console.log(response.data);
            }
          });
      });

    axios
      .get(
        baseurl +
          "getcoursedetails/" +
          localStorage.getItem("selectcoursedraft") +
          "/" +
          localStorage.getItem("studentid")
      )
      .then((response) => {
        this.setState({
          coursename: response.data.courses.heading,
          application_fee: response.data.courses.application_fee,
        });

        //console.log(response.data);
      });

    console.log(localStorage, "storage");

    axios
      .get(baseurl + "get_generalinfo/" + localStorage.getItem("studentid"))
      .then((response) => {
        if (response.data.length > "0") {
          if (response.data[0].dateof_birth != null) {
            var sdob = new Date(response.data[0].dateof_birth);
          }

          axios
            .get(baseurl + "get_state/" + response.data[0].addr_country)
            .then((response) => {
              this.setState({
                states: response.data,
              });
            });

          axios
            .get(baseurl + "get_city/" + response.data[0].state)
            .then((response) => {
              this.setState({
                cities: response.data,
              });
            });

          this.setState({
            fname: response.data[0].first_name,
            lname: response.data[0].last_name,
            dateofbirth: sdob,
            sgender: response.data[0].gender,

            saddr: response.data[0].address,
            scity: response.data[0].city,
            scountry: response.data[0].addr_country,
            sstate: response.data[0].state,
            szip: response.data[0].zipcode,
            sphcode: response.data[0].ph_code,
            sphno: response.data[0].phone,

            fname1: response.data[0].first_name,
            lname1: response.data[0].last_name,
            dateofbirth1: sdob,
            sgender1: response.data[0].gender,

            saddr1: response.data[0].address,
            scity1: response.data[0].city,
            scountry1: response.data[0].addr_country,
            sstate1: response.data[0].state,
            szip1: response.data[0].zipcode,
            sphcode1: response.data[0].ph_code,
            sphno1: response.data[0].phone,
          });
        }
      });
  }

  handleFnameChange = (event) => {
    this.setState({ fname: event.target.value });
  };
  handleLnameChange = (event) => {
    this.setState({ lname: event.target.value });
  };

  handleSaddrChange = (event) => {
    this.setState({ saddr: event.target.value });
  };
  handleScityChange = (event) => {
    this.setState({ scity: event.target.value });
  };
  handleScountryChange = (event) => {
    this.setState({ scountry: event.target.value });
    axios.get(baseurl + "get_state/" + event.target.value).then((response) => {
      this.setState({
        states: response.data,
      });
      this.setState({
        cities: [],
      });
    });
  };
  handleSstateChange = (event) => {
    this.setState({ sstate: event.target.value });
    axios.get(baseurl + "get_city/" + event.target.value).then((response) => {
      this.setState({
        cities: response.data,
      });
    });
  };
  handleSzipChange = (event) => {
    this.setState({ szip: event.target.value });
  };
  handleSphcodeChange = (event) => {
    this.setState({ sphcode: event.target.value });
  };
  handleSphnoChange = (event) => {
    this.setState({ sphno: event.target.value });
  };

  toggleSuccess() {
    this.setState({
      paymentsuccess: !this.state.paymentsuccess,
    });
  }

  paymenttype() {
    this.setState({
      paymenttype: "stripe",
      pay_purchase_remember: false,
      credit_purchase_remember: false,
      stripe_purchase_remember: true,
    });
  }

  paymenttype1() {
    this.setState({
      paymenttype: "paypal",
      pay_purchase_remember: true,
      credit_purchase_remember: false,
      stripe_purchase_remember: false,
    });
  }

  paymenttype2() {
    this.setState({
      paymenttype: "credit",
      pay_purchase_remember: false,
      credit_purchase_remember: true,
      stripe_purchase_remember: false,
    });
  }

  closeall() {
    window.location.href = "/#/sendapplication";
  }

  // validate = () =>
  // {
  // const errors = {};

  // var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  // var regAln = /^[a-zA-Z0-9]+$/
  // var pasmax = /^.{4,20}$/
  // var zipmax = /^.{3,8}$/
  // var minmax = /^.{10,15}$/
  // var code = /^\+\d{1,2}$/

  // var regNam = /^[a-zA-Z\s]+$/

  // if(this.state.bfname === '') { errors.fname = 'This is required'; }
  // if(this.state.blname === '') { errors.lname = 'This is required'; }
  // if(this.state.baddr === '') { errors.saddr = 'This is required'; }
  // if(this.state.bcity === '') { errors.scity = 'This is required'; }
  // if(this.state.bcountry === '') { errors.scountry = 'Please select'; }
  // if(this.state.bstate === '') { errors.sstate = 'This is required'; }

  // if(this.state.bzip === '') { errors.szip = 'This is required'; }

  // if(this.state.bphcode === '') { errors.sphno = 'Code is required'; }

  // if(this.state.bphno === '') { errors.sphno = 'This is required'; }

  // return Object.keys(errors).length === 0 ? null : errors;
  // };

  onSubmit = (e) => {
    e.preventDefault();

    // const errors = this.validate();
    //this.setState({ errors });
    // if (errors) return;

    this.state.formData.append("fname", this.state.fname);
    this.state.formData.append("lname", this.state.lname);
    this.state.formData.append("saddr", this.state.saddr);
    this.state.formData.append("scity", this.state.scity);
    this.state.formData.append("scountry", this.state.scountry);
    this.state.formData.append("sstate", this.state.sstate);
    this.state.formData.append("szip", this.state.szip);
    this.state.formData.append("sphcode", this.state.sphcode);
    this.state.formData.append("sphno", this.state.sphno);

    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append(
      "course_id",
      localStorage.getItem("selectcoursedraft")
    );
    this.state.formData.append("university_id", this.state.universityid);

    submitForm(
      "form-data",
      this.state.formData,
      (msg) => {
        toast.success(msg.message);
        setTimeout(function () {}, 3000);
      },
      "student"
    );

    this.setState({ errors: "" });
  };

  editCardDetails = (param) => (e) => {
    if (param === "paypal") {
      this.setState({ editpaypalCard: true });
    }
    if (param === "credit") {
      this.setState({ editcreditCard: true });
    }
    if (param === "stripe") {
      this.setState({ editstripeCard: true });
    }
  };

  callbackfunction = (evt) => (e) => {
    this.setState({ res_token: e });
  };

  SaveStripePayment = () => (e) => {
    debugger;

    if (this.state.stripecardexpiredate != null) {
      var sdobstrie = new Date(this.state.stripecardexpiredate);

      var options = { year: "numeric", month: "long", day: "numeric" };

      var dob = new Intl.DateTimeFormat("en-US", options).format(sdobstrie);
      //formData.append("expiry_date", dob);
      let formd = new FormData();
      formd.append("number", this.state.stripecardnumber);
      formd.append("exp_month", sdobstrie.getMonth());
      formd.append("exp_year", sdobstrie.getFullYear());
      formd.append("cvc", this.state.stripecardsecurity);
      if (this.state.stripecarddataId !== 0) {
        formd.append("id", this.state.stripecarddataId);
      }
      axios
        .post(baseurl + "stripetokencreate", formd)
        .then((respo) => {
          console.log(respo, "respo");
          const data = {
            responsestatus: 1,
            //payment: this.state.payment,
            studentid: localStorage.getItem("studentid"),
            courseid: localStorage.getItem("selectcoursedraft"),
            amount: this.state.application_fee,
            applicationid: this.state.applicationid,
            token: respo.data,
            email: localStorage.getItem("studentemail"),
          };

          const post = axios
            .post(baseurl + "savepaymentstripe", data)
            .then((response) => {
              debugger;
              if (response.data.status_code == 200) {
                // toast.success("Payment done");
                this.toggleSuccess();
              } else {
                toast.error("Payment cancelled");
              }
            })
            .catch((err) => {
              toast.error("Please enter valid card details.");
            });
        })
        .catch((err) => {
          toast.error("Please enter valid card details.");
        });
    }
  };
  onSAve = (param) => (e) => {
    debugger;
    var formData = new FormData();
    if (param === "Paypal") {
      this.setState({ editpaypalCard: false });
      formData.append("pay_by", "Paypal");
      formData.append("creditcard_number", this.state.paypalcardnumber);
      formData.append("creditcard_name", this.state.paycreditcardname);
      formData.append("zipcode", this.state.paypalcardzip);
      formData.append("security_code", this.state.paypalcardsecurity);
      formData.append("purchase_remember", this.state.pay_purchase_remember);
      if (this.state.paycarddataId !== 0) {
        formData.append("id", this.state.paycarddataId);
      }

      if (this.state.paypalcardexpiredate != null) {
        var sdob = new Date(this.state.paypalcardexpiredate);

        var options = { year: "numeric", month: "long", day: "numeric" };

        var dob = new Intl.DateTimeFormat("en-US", options).format(sdob);
        formData.append("expiry_date", dob);
      }

      formData.append("student_id", localStorage.getItem("studentid"));
      submitFormData("multipart/form-data", formData);
    }

    if (param === "Credit") {
      this.setState({ editcreditCard: false });
      formData.append("pay_by", "Credit");
      formData.append("creditcard_number", this.state.creditcardnumber);
      formData.append("creditcard_name", this.state.creditcreditcardname);
      formData.append("zipcode", this.state.creditcardzip);
      formData.append("security_code", this.state.creditcardsecurity);
      formData.append("purchase_remember", this.state.credit_purchase_remember);
      if (this.state.creditcarddataId !== 0) {
        formData.append("id", this.state.creditcarddataId);
      }

      if (this.state.creditcardexpiredate != null) {
        var sdob = new Date(this.state.creditcardexpiredate);

        var options = { year: "numeric", month: "long", day: "numeric" };

        var dob = new Intl.DateTimeFormat("en-US", options).format(sdob);
        formData.append("expiry_date", dob);
      }

      formData.append("student_id", localStorage.getItem("studentid"));
      submitFormData("multipart/form-data", formData);
    }

    if (param === "Stripe") {
      debugger;

      formData.append("pay_by", "Stripe");
      formData.append("creditcard_number", this.state.stripecardnumber);
      formData.append("creditcard_name", this.state.stripecreditcardname);
      formData.append("zipcode", this.state.stripecardzip);
      formData.append("security_code", this.state.stripecardsecurity);
      formData.append("purchase_remember", this.state.stripe_purchase_remember);
      if (this.state.stripecarddataId !== 0) {
        formData.append("id", this.state.stripecarddataId);
      }

      if (this.state.stripecardexpiredate != null) {
        var sdobstrie = new Date(this.state.stripecardexpiredate);

        var options = { year: "numeric", month: "long", day: "numeric" };

        var dob = new Intl.DateTimeFormat("en-US", options).format(sdobstrie);
        formData.append("expiry_date", dob);
      }

      formData.append("student_id", localStorage.getItem("studentid"));
      this.setState({ editstripeCard: false });
      submitFormData("multipart/form-data", formData);
    }
  };

  render() {
    const { errors } = this.state;
    const fee = this.state.application_fee;
    const imgpath = `${config.baseurl}`;

    const onSuccess = (payment) => {
      // Congratulation, it came here means everything's fine!
      console.log("The payment was succeeded!", payment);
      this.setState({ responsestatus: 1 });
      this.setState({ payment: payment });

      const data = {
        responsestatus: 1,
        payment: this.state.payment,
        studentid: localStorage.getItem("studentid"),
        courseid: localStorage.getItem("selectcoursedraft"),
        amount: this.state.application_fee,
        applicationid: this.state.applicationid,
      };

      const post = axios
        .post(baseurl + "savepayment", data)
        .then((response) => {
          if (response.data.status_code == 200) {
            this.setState({ paymentsuccess: true });
          } else {
            toast.error("Payment cancelled");
          }
        });
    };

    const onCancel = (payment) => {
      // User pressed "cancel" or close Paypal's popup!
      //console.log('The payment was cancelled!', data);
      this.setState({ responsestatus: 0 });
      this.setState({ payment: payment });
      const data = {
        responsestatus: 0,
        payment: this.state.payment,
        studentid: localStorage.getItem("studentid"),
        courseid: localStorage.getItem("selectcoursedraft"),
        amount: this.state.application_fee,
      };

      const post = axios
        .post(baseurl + "savepayment", data)
        .then((response) => {
          if (response.data.status_code == 100) {
            toast.error("Payment cancelled");
          }
        });
    };

    const onError = (err) => {
      console.log("Error!", err);
    };

    let env = "sandbox"; // you can set here to 'production' for production
    let currency = "USD"; // or you can set this value from your props or state
    let total = fee;
    const client = {
      sandbox:
        "AQl_r_FfteZ0jPsI1g672qEEUwxAoF34LXKHcW07NVMt0APl4iWExF4vTN_qr6V8evtP7MUoptwm9X--",
      // production: 'YOUR-PRODUCTION-APP-ID',
    };

    return (
      <div className="foe-studen-container payment-container bg-white">
        <Modal
          isOpen={this.state.paymentsuccess}
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
              <div className="mb-5 sucess-text">Payment is Successful </div>
              <p>
                Thank you for your payment. Your transaction has been completed
                and a receipt has been sent to your payments History.
              </p>

              <a
                onClick={this.closeall}
                style={{ cursor: "pointer" }}
                color="link"
                className="px-4"
              >
                VIEW RECEIPT
              </a>

              <a
                href="/#/sendapplication"
                style={{ cursor: "pointer" }}
                color="link"
                className="px-0"
              >
                ENROLLMENT FORM
              </a>
            </div>
          </ModalBody>
        </Modal>
        <div className="foe-student-box">
          <Container>
            <ToastContainer />
            <Row>
              <Col xs="12" sm="12" xl="8" md="12" lg="8">
                <Card className="uni-right-card">
                  <CardBody>
                    <div className="row">
                      <div className="profile-student col-12">
                        <ul
                          className="nav nav-tabs"
                          id="ProfileTab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active generaltab"
                              data-toggle="tab"
                              href="#tab1"
                              role="tab"
                            >
                              <span>01</span>Customer info
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link educationtab"
                              data-toggle="tab"
                              href="#tab2"
                              role="tab"
                            >
                              <span>02</span>Billing info
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link testscore"
                              data-toggle="tab"
                              href="#tab3"
                              role="tab"
                            >
                              <span>03</span>Payment Selection
                            </a>
                          </li>
                        </ul>

                        {/*<div className="d-flex justify-content-end col-12">
                      <div className="perc-box">5% Complete</div>
              </div>*/}

                        <div className="tab-content">
                          <div
                            className="tab-pane active"
                            id="tab1"
                            role="tabpanel"
                          >
                            <div className="d-flex justify-content-end col-12"></div>
                            <div className="personal-box-inner payment-box">
                              <div className="row">
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      First Name
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control disablepro"
                                      placeholder="First Name"
                                      value={this.state.fname1}
                                      disabled
                                    />
                                  </FormGroup>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      Last Name
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control disablepro"
                                      disabled
                                      placeholder="Last Name"
                                      value={this.state.lname1}
                                    />
                                  </FormGroup>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      Date of Birth
                                    </Label>
                                    {/*
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="YYYY-MMM-DD"
                              onChange={this.handleDobChange} 
                              value={this.state.dateofbirth}
                            /> */}
                                    <DatePicker
                                      selected={this.state.dateofbirth1}
                                      dateFormat="yyyy-MM-dd"
                                      disabled
                                      className="disablepro form-control"
                                      id="dateofbirth"
                                      showMonthDropdown
                                      showYearDropdown
                                      dropdownMode="select"
                                      placeholderText="YYYY-MMM-DD"
                                      maxDate={new Date()}
                                    />
                                  </FormGroup>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">Gender</Label>
                                    <Input
                                      type="select"
                                      id="sgender"
                                      className="disablepro"
                                      disabled
                                    >
                                      <option value="">Select</option>
                                      <option
                                        value="male"
                                        selected={"male" == this.state.sgender1}
                                      >
                                        Male
                                      </option>
                                      <option
                                        value="female"
                                        selected={
                                          "female" == this.state.sgender1
                                        }
                                      >
                                        Female
                                      </option>
                                    </Input>
                                  </FormGroup>
                                </div>
                              </div>
                            </div>
                            <div className="pr-header mt-3">
                              <h3>Address Detail</h3>
                            </div>
                            <div className="personal-box-inner address payment-box mt-3">
                              <div className="row">
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">Address</Label>
                                    <Input
                                      type="text"
                                      className="form-control disablepro"
                                      placeholder="Enter Address.."
                                      disabled
                                      value={this.state.saddr1}
                                    />
                                  </FormGroup>
                                  <h6 style={{ color: "red" }}>
                                    {this.state.errors.saddr}
                                  </h6>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      City/Town
                                    </Label>
                                    <Input
                                      type="select"
                                      id="scity"
                                      className="disablepro"
                                      disabled
                                    >
                                      <option value="">Select</option>
                                      {this.state.cities.map((cities) => (
                                        <option
                                          value={cities.id}
                                          selected={
                                            this.state.scity1 == cities.id
                                          }
                                        >
                                          {cities.name}
                                        </option>
                                      ))}
                                    </Input>
                                  </FormGroup>
                                </div>

                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">Country</Label>
                                    <Input
                                      type="select"
                                      id="scountry"
                                      disabled
                                      className="disablepro"
                                    >
                                      <option value="">Select</option>
                                      {this.state.country.map((country) => (
                                        <option
                                          value={country.id}
                                          selected={
                                            this.state.scountry1 == country.id
                                          }
                                        >
                                          {country.country_name}
                                        </option>
                                      ))}
                                    </Input>
                                  </FormGroup>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      Province/State
                                    </Label>
                                    <Input
                                      type="select"
                                      id="sstate"
                                      disabled
                                      className="disablepro"
                                    >
                                      <option value="">Select</option>
                                      {this.state.states.map((states) => (
                                        <option
                                          value={states.id}
                                          selected={
                                            this.state.sstate1 == states.id
                                          }
                                        >
                                          {states.name}
                                        </option>
                                      ))}
                                    </Input>
                                  </FormGroup>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      Postal/Zip Code
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control disablepro"
                                      placeholder="Enter Postal/Zip Code... "
                                      id="szip"
                                      value={this.state.szip1}
                                      disabled
                                      id="szip"
                                    />
                                  </FormGroup>
                                </div>

                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      Phone Number
                                    </Label>
                                    <div class="input-group mb-3">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <input
                                            type="text"
                                            className="form-control type-bbo disablepro"
                                            placeholder="+ 01"
                                            value={this.state.sphcode1}
                                            disabled
                                            id="sphcode"
                                          />
                                        </span>
                                      </div>
                                      <input
                                        type="number"
                                        className="form-control disablepro"
                                        placeholder="Phone Number"
                                        disabled
                                        value={this.state.sphno1}
                                      />
                                    </div>
                                  </FormGroup>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane" id="tab2" role="tabpanel">
                            <div className="d-flex justify-content-end col-12"></div>
                            <div className="personal-box-inner payment-box">
                              <div className="row">
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      First Name
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control disablepro"
                                      placeholder="First Name"
                                      onChange={this.handleFnameChange}
                                      value={this.state.fname}
                                    />
                                  </FormGroup>
                                  <h6 style={{ color: "red" }}>
                                    {this.state.errors.fname}
                                  </h6>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      Last Name
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control disablepro"
                                      placeholder="Last Name"
                                      onChange={this.handleLnameChange}
                                      value={this.state.lname}
                                    />
                                  </FormGroup>
                                  <h6 style={{ color: "red" }}>
                                    {this.state.errors.lname}
                                  </h6>
                                </div>
                              </div>
                            </div>
                            <div className="pr-header mt-3">
                              <h3>Address Detail</h3>
                            </div>
                            <div className="personal-box-inner address payment-box mt-3">
                              <div className="row">
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">Address</Label>
                                    <Input
                                      type="text"
                                      className="form-control disablepro"
                                      placeholder="Enter Address.."
                                      onChange={this.handleSaddrChange}
                                      value={this.state.saddr}
                                    />
                                  </FormGroup>
                                  <h6 style={{ color: "red" }}>
                                    {this.state.errors.saddr}
                                  </h6>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      City/Town
                                    </Label>
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
                                          selected={
                                            this.state.scity == cities.id
                                          }
                                        >
                                          {cities.name}
                                        </option>
                                      ))}
                                    </Input>
                                  </FormGroup>
                                  <h6 style={{ color: "red" }}>
                                    {this.state.errors.scity}
                                  </h6>
                                </div>

                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">Country</Label>
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
                                          selected={
                                            this.state.scountry == country.id
                                          }
                                        >
                                          {country.country_name}
                                        </option>
                                      ))}
                                    </Input>
                                  </FormGroup>
                                  <h6 style={{ color: "red" }}>
                                    {this.state.errors.scountry}
                                  </h6>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      Province/State
                                    </Label>
                                    <Input
                                      type="select"
                                      id="sstate"
                                      onChange={this.handleSstateChange}
                                      className="disablepro"
                                    >
                                      <option value="">Select</option>
                                      {this.state.states.map((states) => (
                                        <option
                                          value={states.id}
                                          selected={
                                            this.state.sstate == states.id
                                          }
                                        >
                                          {states.name}
                                        </option>
                                      ))}
                                    </Input>
                                  </FormGroup>
                                  <h6 style={{ color: "red" }}>
                                    {this.state.errors.sstate}
                                  </h6>
                                </div>
                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      Postal/Zip Code
                                    </Label>
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
                                  <h6 style={{ color: "red" }}>
                                    {this.state.errors.szip}
                                  </h6>
                                </div>

                                <div className="col-md-6">
                                  <FormGroup>
                                    <Label className="uni-label">
                                      Phone Number
                                    </Label>
                                    <div class="input-group mb-3">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text">
                                          <input
                                            type="text"
                                            className="form-control type-bbo disablepro"
                                            placeholder="+ 01"
                                            onChange={this.handleSphcodeChange}
                                            value={this.state.sphcode}
                                            id="sphcode"
                                          />
                                        </span>
                                      </div>
                                      <input
                                        type="number"
                                        className="form-control disablepro"
                                        placeholder="Phone Number"
                                        onChange={this.handleSphnoChange}
                                        value={this.state.sphno}
                                      />
                                    </div>
                                    <h6 style={{ color: "red" }}>
                                      {this.state.errors.smbno}
                                    </h6>
                                  </FormGroup>
                                </div>
                                <Button
                                  color="primary"
                                  className="score-save ml-3"
                                  type="submit"
                                  onClick={this.onSubmit.bind(this)}
                                >
                                  SAVE
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="tab-pane" id="tab3" role="tabpanel">
                            <div className="makepayment-three">
                              {/* <div className="card-body personal-box-inner mb-4 col-md-10">
                 <div className="custom-control custom-radio my-2">
                   <input type="radio" className="custom-control-input form-check-input" value="0" checked="" />
                   <label className="radio-label custom-control-label">Credit Card</label>
                   <p>test</p>
                 </div>
                    <div className="col-md-12">
                    <div className="row">
                  <div className="col-sm-12">
                  <div className="form-group">
                  <label className="uni-label" for="name">Account Holder Name</label>
                  <input className="form-control account_holder_name" id="account_holder_name" type="text" autocomplete="off" placeholder="Enter your name" name="account_holder_name" required="" />
                  </div>
                  </div>
                  </div>

                  <div className="row">
                  <div className="col-sm-12">
                  <div className="form-group">
                  <label className="uni-label" for="ccnumber">BSB</label>
                  <input className="form-control bsb" id="bsb" type="text" required="" name="bsb" autocomplete="off" data-parsley-minlength="6" data-parsley-minlength-message="Bsb number must be at least 6 characters" data-parsley-required="true" />
                  </div>
                  </div>
                  </div>
                  
                  <div className="row">
                  <div className="col-sm-12">
                  <div className="form-group">
                  <label className="uni-label" for="ccnumber">Account Number</label>
                  <input className="form-control account_number" id="account_number" type="text" required="" name="account_number" data-parsley-minlength="10" data-parsley-minlength-message="Account Number must be at least 10 characters" data-parsley-required="true" autocomplete="off" />
                  </div>
                  </div>
                  </div>
                  
                  <div className="row">
                  <div className="col-sm-12">
                  <div className="form-group">
                  <label className="uni-label" for="name">Bank</label>
                  <input className="form-control bank_name" id="bank_name" type="text" placeholder="Enter your name" required="" name="bank_name" autocomplete="off" />
                  </div>
                  </div>
                  </div>
                    </div>  

                  </div>  */}
                              <div className="card-body personal-box-inner mb-4 payment-box">
                                <div className="custom-control custom-radio my-2">
                                  <div className=" d-flex justify-content-between">
                                    <div className="pay-box">
                                      <input
                                        type="radio"
                                        name="paymentmethod"
                                        onClick={() => this.paymenttype1()}
                                        className="custom-control-input form-check-input"
                                        value="0"
                                        checked={
                                          this.state.pay_purchase_remember
                                        }
                                      />
                                      <label className="radio-label pay-radio custom-control-label pl-3">
                                        PAYPAL
                                      </label>
                                    </div>
                                    <div className="paybox-2">
                                      <img
                                        src={Paypalbtn}
                                        alt="paypal"
                                        className="uni-icon"
                                      />
                                    </div>
                                  </div>
                                  <div className="payment-option">
                                    <p className="pl-4">
                                      You will be redirected to PayPal website
                                      to complete your purchase securely.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {this.state.paymenttype === "paypal" ? (
                                <React.Fragment>
                                  <div>
                                    <label>Card Number</label>
                                    {this.state.editpaypalCard ? (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.paypalcardnumber}
                                        onChange={(e) => {
                                          this.setState({
                                            paypalcardnumber: e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.paypalcardnumber}
                                        readOnly
                                      />
                                    )}

                                    <label>Expiry Date</label>
                                    {this.state.editpaypalCard ? (
                                      <input
                                        className="form-control"
                                        type="date"
                                        value={this.state.paypalcardexpiredate}
                                        onChange={(e) => {
                                          this.setState({
                                            paypalcardexpiredate:
                                              e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.paypalcardexpiredate}
                                        readOnly
                                      />
                                    )}

                                    <label>Security</label>
                                    {this.state.editpaypalCard ? (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.paypalcardsecurity}
                                        onChange={(e) => {
                                          this.setState({
                                            paypalcardsecurity: e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.paypalcardsecurity}
                                        readOnly
                                      />
                                    )}

                                    <label>Zip Code</label>
                                    {this.state.editpaypalCard ? (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.paypalcardzip}
                                        onChange={(e) => {
                                          this.setState({
                                            paypalcardzip: e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.paypalcardzip}
                                        readOnly
                                      />
                                    )}
                                    {!this.state.editpaypalCard ? (
                                      <React.Fragment>
                                        <div className="col-12 d-flex justify-content-end my-3">
                                          <button
                                            className="btn-primary make-paymrnt-btn"
                                            onClick={this.editCardDetails(
                                              "paypal"
                                            )}
                                          >
                                            Edit
                                          </button>{" "}
                                        </div>
                                      </React.Fragment>
                                    ) : (
                                      <React.Fragment>
                                        <div className="col-12 d-flex justify-content-end my-3">
                                          <button
                                            className="btn-primary make-paymrnt-btn green-btn"
                                            onClick={this.onSAve("Paypal")}
                                          >
                                            Save
                                          </button>{" "}
                                        </div>
                                      </React.Fragment>
                                    )}
                                  </div>

                                  <br />
                                  <br />
                                  <br />
                                </React.Fragment>
                              ) : null}
                              <div className="card-body personal-box-inner mb-4 payment-box">
                                <div className="custom-control custom-radio my-2">
                                  <div className=" d-flex justify-content-between">
                                    <div className="pay-box">
                                      <input
                                        type="radio"
                                        className="custom-control-input form-check-input"
                                        value="1"
                                        name="paymentmethod"
                                        onClick={() => this.paymenttype()}
                                        //checked=""
                                        checked={
                                          this.state.stripe_purchase_remember
                                        }
                                      />
                                      <label className="radio-label pay-radio custom-control-label pl-3">
                                        STRIPE
                                      </label>
                                    </div>
                                    <div className="paybox-2">
                                      <img
                                        src={stripepay}
                                        alt="paypal"
                                        width="125"
                                        className="uni-icon"
                                      />
                                    </div>
                                  </div>
                                  <div className="payment-option">
                                    <p className="pl-4">
                                      You will be redirected to Stripe website
                                      to complete your purchase securely.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {this.state.paymenttype === "stripe" ? (
                                <React.Fragment>
                                  <div>
                                    <label>Card Number</label>
                                    {this.state.editstripeCard ? (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.stripecardnumber}
                                        onChange={(e) => {
                                          this.setState({
                                            stripecardnumber: e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.stripecardnumber}
                                        readOnly
                                      />
                                    )}

                                    <label>Expiry Date</label>
                                    {this.state.editstripeCard ? (
                                      <input
                                        className="form-control"
                                        type="date"
                                        value={this.state.stripecardexpiredate}
                                        onChange={(e) => {
                                          this.setState({
                                            stripecardexpiredate:
                                              e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.stripecardexpiredate}
                                        readOnly
                                      />
                                    )}

                                    <label>Security</label>
                                    {this.state.editstripeCard ? (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.stripecardsecurity}
                                        onChange={(e) => {
                                          this.setState({
                                            stripecardsecurity: e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.stripecardsecurity}
                                        readOnly
                                      />
                                    )}

                                    <label>Zip Code</label>
                                    {this.state.editstripeCard ? (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.stripecardzip}
                                        onChange={(e) => {
                                          this.setState({
                                            stripecardzip: e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.stripecardzip}
                                        readOnly
                                      />
                                    )}
                                    {!this.state.editstripeCard ? (
                                      <div className="col-12 d-flex justify-content-end my-3">
                                        <button
                                          className="btn-primary make-paymrnt-btn"
                                          onClick={this.editCardDetails(
                                            "stripe"
                                          )}
                                        >
                                          Edit
                                        </button>{" "}
                                      </div>
                                    ) : (
                                      <React.Fragment>
                                        <div className="col-12 d-flex justify-content-end my-3">
                                          <button
                                            className="btn-primary make-paymrnt-btn"
                                            onClick={this.onSAve("Stripe")}
                                          >
                                            Save
                                          </button>{" "}
                                        </div>
                                      </React.Fragment>
                                    )}
                                  </div>
                                </React.Fragment>
                              ) : null}

                              <div className="card-body personal-box-inner mb-4 payment-box">
                                <div className="custom-control custom-radio my-2">
                                  <div className=" d-flex justify-content-between">
                                    <div className="pay-box">
                                      <input
                                        type="radio"
                                        className="custom-control-input form-check-input"
                                        value="2"
                                        name="paymentmethod"
                                        onClick={() => this.paymenttype2()}
                                        checked={
                                          this.state.credit_purchase_remember
                                        }
                                      />
                                      <label className="radio-label  pay-radio custom-control-label pl-3">
                                        CREDIT
                                      </label>
                                    </div>
                                    <div className="paybox-2">
                                      <img
                                        src={stripepay}
                                        alt="paypal"
                                        width="125"
                                        className="uni-icon"
                                      />
                                    </div>
                                  </div>
                                  <div className="payment-option">
                                    <p className="pl-4">
                                      You will be redirected to website to
                                      complete your purchase securely.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {this.state.paymenttype === "credit" ? (
                                <React.Fragment>
                                  <div>
                                    <label>Card Number</label>
                                    {this.state.editcreditCard ? (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.creditcardnumber}
                                        onChange={(e) => {
                                          this.setState({
                                            creditcardnumber: e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.creditcardnumber}
                                        readOnly
                                      />
                                    )}

                                    <label>Expiry Date</label>
                                    {this.state.editcreditCard ? (
                                      <input
                                        className="form-control"
                                        type="date"
                                        value={this.state.creditcardexpiredate}
                                        onChange={(e) => {
                                          this.setState({
                                            creditcardexpiredate:
                                              e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.creditcardexpiredate}
                                        readOnly
                                      />
                                    )}

                                    <label>Security</label>
                                    {this.state.editcreditCard ? (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.creditcardsecurity}
                                        onChange={(e) => {
                                          this.setState({
                                            creditcardsecurity: e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.creditcardsecurity}
                                        readOnly
                                      />
                                    )}

                                    <label>Zip Code</label>
                                    {this.state.editcreditCard ? (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.creditcardzip}
                                        onChange={(e) => {
                                          this.setState({
                                            creditcardzip: e.target.value,
                                          });
                                        }}
                                      />
                                    ) : (
                                      <input
                                        className="form-control"
                                        type="text"
                                        value={this.state.creditcardzip}
                                        readOnly
                                      />
                                    )}
                                    {!this.state.editcreditCard ? (
                                      <div className="col-12 d-flex justify-content-end my-3">
                                        <button
                                          className="btn-primary make-paymrnt-btn"
                                          onClick={this.editCardDetails(
                                            "credit"
                                          )}
                                        >
                                          Edit
                                        </button>{" "}
                                      </div>
                                    ) : (
                                      <React.Fragment>
                                        <div className="col-12 d-flex justify-content-end my-3">
                                          <button
                                            className="btn-primary make-paymrnt-btn"
                                            onClick={this.onSAve("Credit")}
                                          >
                                            Save
                                          </button>{" "}
                                        </div>
                                      </React.Fragment>
                                    )}
                                  </div>
                                </React.Fragment>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col
                xs="12"
                sm="12"
                xl="4"
                md="12"
                lg="4"
                className="payment-right"
              >
                <div className="makepay-right">
                  <div className="checkout-box">
                    <div className=" d-flex justify-content-between">
                      <div className="pay-box">
                        <label className="card-label">Cart</label>
                      </div>
                      <div className="paybox-2">
                        <span className="check-value">
                          <span className="pro-value">1</span>
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 row">
                      <div className="col-5">
                        <div className="checkout-img">
                          <img
                            src={imgpath + this.state.logo}
                            width="50"
                            height=""
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="col-7 check-univerity">
                        <p>
                          {this.state.institute_name}
                          <br />
                          {this.state.coursename}
                          <br />
                          Course Start Date: {this.state.course_startdate}
                          <br />
                          Course End Date: {this.state.course_enddate}
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="col-md-12 row cart-det pb-5 mb-3 mt-3">
                        <div className="col-7">
                          <span>Application Fee</span>
                        </div>
                        <div className="col-5">
                          <span>
                            $
                            {String(this.state.application_fee).replace(
                              ".",
                              ","
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 subtotal-list row">
                      <div className="col-7">
                        <span>Subtotal</span>
                      </div>
                      <div className="col-5 right-list">
                        <span>
                          $
                          {String(this.state.application_fee).replace(".", ",")}
                        </span>
                      </div>
                      <div className="col-7">
                        <span>Fee</span>
                      </div>
                      <div className="col-5 right-list">
                        <span>$0,00</span>
                      </div>
                    </div>
                    <div className="col-md-12 total-price row">
                      <div className="col-7">
                        <span>Total</span>
                      </div>
                      <div className="col-5 right-list">
                        <span>
                          $
                          {String(this.state.application_fee).replace(".", ",")}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 d-flex justify-content-end my-3">
                      {this.state.paymenttype === "paypal" ||
                      this.state.paymenttype === "credit" ? (
                        <PaypalExpressBtn
                          env={env}
                          client={client}
                          currency={currency}
                          total={total}
                          onError={onError}
                          onSuccess={onSuccess}
                          onCancel={onCancel}
                        />
                      ) : this.state.paymenttype === "stripe" ? (
                        <button
                          className="btn-primary make-payment-btn-left"
                          onClick={this.SaveStripePayment()}
                        >
                          Make a Payment
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Makepayment;
