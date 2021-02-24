// import { ReactToPdf } from 'react-to-pdf';
// const ref = React.createRef();

import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Link, Redirect } from "react-router-dom";
import config from "../../config.json";
import deakinlogo from "../../assets/img/university/deakin_logo.jpg";
import deleteicon from "../../assets/img/university/delete.svg";
import downloadicon from "../../assets/img/download-icon.svg";
import formee_logo from "../../assets/img/brand/formee-footer-logo.png";
// import { Document } from 'react-pdf'
import jsPDF from "jspdf";

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
  Form,
  ModalFooter,
  InputGroupAddon,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  Label,
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
} from "reactstrap";
import Pricon from "../../assets/img/student/personal-icon.svg";
import Flagicon from "../../assets/img/student/flag-my-icon.svg";
import $ from "jquery";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Invoice } from "./invoice";
import { Receipt } from "./receipt";
import { Details } from "./details";

var baseurl = `${config.baseurl}`;

function submitForm(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/store_carddetails`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
      //console.log(response.data, "post");
      //window.location.reload(false);
      if (response.data == "error") {
        toast.error("Please Login");
      }
      setTimeout(function () {
        window.location.reload(true);
      }, 3500);
    })
    .catch((error) => {
      setResponse("error");
    });
}

class Paymentdetails extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      large: false,
      sentapplicationlist: [],
      paidpayments: [],
      paymenttype: [],
      studentdetails: [],
      downloadpaidpayment: "",
      unpaidpayments: [],
      downloadunpaidpayment: "",
      collapse: true,
      // fadeIn: true,
      errors: {},
      payby: "",
      cardnumber: "",
      cardname: "",
      zipcode: "",
      // date:'',
      security: "",
      date: null,
      formData: new FormData(),
      contentclose3: true,
      sdob: "",
      purchaseRemember: 1,
      isChecked: false,
      receipt: [],
      invoiceData: [],
      id: 0,
      stripe_tokenid: null,
      //  completeprofile:localStorage.getItem('completeprofile'),
    };
  }

  handleCheck = (event) => {
    debugger;
    if (!this.state.isChecked) {
      this.setState({ purchaseRemember: 0 });
      this.setState({ isChecked: true });
    } else {
      this.setState({ purchaseRemember: 1 });
      this.setState({ isChecked: false });
    }
  };
  handlepaybyChange = (event) => {
    var index = 0;

    let newarr = this.state.paymenttype.filter(
      (ite) => ite.pay_by === event.target.value
    );

    console.log(newarr, "credit");
    if (newarr.length !== 0) {
      newarr.map((ite) => {
        this.setState({
          payby: ite.pay_by,
          cardnumber: ite.creditcard_number,
          cardname: ite.creditcard_name,
          zipcode: ite.zipcode,
          id: ite.id,
          stripe_tokenid: ite.stripe_tokenid,
          // date:'',
          security: ite.security_code,
          purchaseRemember: ite.purchase_remember,
          date: new Date(ite.expiry_date),
          isChecked: ite.purchase_remember === 0 ? true : false,
        });
      });
    } else {
      this.setState({
        cardnumber: "",
        cardname: "",
        zipcode: "",
        // date:'',
        security: "",
        purchaseRemember: 1,
        date: null,
        isChecked: false,
      });
    }

    this.setState({ payby: event.target.value });
  };
  handlecardnumberChange = (event) => {
    this.setState({ cardnumber: event.target.value });
  };
  handlecardnameChange = (event) => {
    this.setState({ cardname: event.target.value });
  };
  handlezipcodeChange = (event) => {
    this.setState({ zipcode: event.target.value });
  };
  handledateChange = (event) => {
    this.setState({ date: event });
    console.log(event, "date");
  };
  handlesecurityChange = (event) => {
    this.setState({ security: event.target.value });
  };

  componentDidMount() {
    debugger;

    axios
      .get(
        baseurl + "/sentapplicationlist/" + localStorage.getItem("studentid")
      )
      .then((response) => {
        this.setState({
          sentapplicationlist: response.data,
        });
      });
    let appFee_paid = [];
    let tutionFee_paid = [];
    axios
      .get(
        baseurl + "/getStudentPaidPayments/" + localStorage.getItem("studentid")
      )
      .then((response) => {
        debugger;
        if (response.data.app_fee) {
          response.data.app_fee.map((ite) => {
            appFee_paid.push(ite);
          });
        }
        if (response.data.tution_fee) {
          response.data.tution_fee.map((ite) => {
            tutionFee_paid.push(ite);
          });
        }
        let arr = [...appFee_paid.concat(tutionFee_paid)];
        this.setState({
          paidpayments: arr,
        });
      })
      .catch((err) => {
        debugger;
        console.log(err, "checking error in paid");
      });
    console.log(this.state.paidpayments, "paid");
    let appFee_unpaid = [];
    let tutionFee_unpaid = [];
    axios
      .get(
        baseurl +
          "/getStudentUnpaidPayments/" +
          localStorage.getItem("studentid")
      )
      .then((response) => {
        debugger;
        if (response.data.app_fee) {
          response.data.app_fee.map((ite) => {
            appFee_unpaid.push(ite);
          });
        }
        if (response.data.tution_fee) {
          response.data.tution_fee.map((ite) => {
            tutionFee_unpaid.push(ite);
          });
        }
        let arr = [...appFee_unpaid.concat(tutionFee_unpaid)];
        this.setState({
          unpaidpayments: arr,
        });
        console.log(response.data, "unpaid");
      })
      .catch((err) => {
        debugger;
        console.log("Error in Unpaid", err);
        this.setState({
          unpaidpayments: [],
        });
      });

    console.log(this.state.unpaidpayments, "unpaid");

    axios
      .get(baseurl + "/getCarddetails/" + localStorage.getItem("studentid"))
      .then((response) => {
        this.setState({
          paymenttype: response.data.card_details,
        });
        console.log(this.state.paymenttype, "paymentType");

        // console.log(Object.keys(this.state.paymenttype).length)

        // this.setState({
        //   payby: this.paymenttype.pay_by,
        //   // payby = this.paymenttype.,
        //   cardnumber: this.paymenttype.creditcard_number,
        //   cardname: this.paymenttype.creditcard_name,
        //   // date:'',
        //   security: this.paymenttype.security_code,
        //   date: new Date(this.paymenttype.expiry_date),
        // });
      });
  }

  validate() {
    var numberOnly = /^[0-9\b]+$/;

    var txtOnly = /^[A-Za-z]/;
    debugger;
    const errors = {};
    if (this.state.cardnumber.trim() === "") {
      errors.cardnumber = "Card Number is required";
    } else if (this.state.cardname.trim() === "") {
      errors.cardname = "Card Name is required";
    } else if (this.state.zipcode.trim() === "") {
      errors.zipcode = "Zip code is required";
    } else if (this.state.security.trim() === "") {
      errors.security = "Security is required";
    } else if (this.state.date === null) {
      errors.date = "Date is required";
    } else {
      if (!this.state.cardnumber.match(numberOnly)) {
        errors.cardnumber = "Card Number must be a digits";
      } else if (this.state.cardnumber.trim().length !== 16) {
        errors.cardnumber = "Card Number must have 16 digits";
      } else if (!this.state.cardname.match(txtOnly)) {
        errors.cardname = "Card Name must be a text";
      } else if (!this.state.security.match(numberOnly)) {
        errors.security = "Security must be a digits";
      } else if (this.state.security.trim().length !== 3) {
        errors.security = "Security must have 3 digits";
      } else {
        this.onSubmit();
      }
    }

    this.setState({ errors });
  }

  makepayment = (param) => (e) => {
    localStorage.setItem("selectcoursedraft", param);
    //alert(param);
    window.location.href = "#/makepayment";
  };

  makepaymenttution = (param) => (e) => {
    localStorage.setItem("selectcoursedraft", param);
    window.location.href = "#/makepaymentTution";
  };

  onSubmit = () => {
    debugger;
    this.state.formData.append("pay_by", this.state.payby);
    this.state.formData.append("creditcard_number", this.state.cardnumber);
    //this.state.formData.append("dateofbirth", $("#dateofbirth").val());
    this.state.formData.append("creditcard_name", this.state.cardname);
    this.state.formData.append("zipcode", this.state.zipcode);
    this.state.formData.append("security_code", this.state.security);
    this.state.formData.append(
      "purchase_remember",
      this.state.purchaseRemember
    );

    if (this.state.date != null) {
      var sdob = new Date(this.state.date);

      var options = { year: "numeric", month: "long", day: "numeric" };

      this.state.sdob = new Intl.DateTimeFormat("en-US", options).format(sdob);
    }
    console.log(sdob);
    this.state.formData.append("expiry_date", this.state.sdob);
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append("number", this.state.cardnumber);
    this.state.formData.append("exp_month", sdob.getMonth());
    this.state.formData.append("exp_year", sdob.getFullYear());
    this.state.formData.append("cvc", this.state.security);

    // const errors = this.validate();
    // this.setState({ errors });

    // if (errors) return;

    //this.state.formData.append("student_id", 1);

    //submitForm("multipart/form-data", this.state.formData, (msg) => console.log(msg.message), 'student');
    submitForm(
      "multipart/form-data",
      this.state.formData,
      (msg) =>
        this.state.payby === "Credit"
          ? toast.success("Credit " + msg.message)
          : this.state.payby === "Paypal"
          ? toast.success("Paypal " + msg.message)
          : this.state.payby === "Stripe" && msg.message === undefined
          ? toast.error("Please enter valid card details")
          : this.state.payby === "Stripe"
          ? toast.success("Stripe " + msg.message)
          : null,
      "student"
    );

    this.setState({ imgfile: "" });
    this.setState({ upload_studphoto: "" });
    this.setState({ formData: new FormData() });

    this.setState({ errors: "" });
  };

  apply = (e) => {
    //alert(param);
    //alert(localStorage.getItem('applicationid'));
    window.location = "/#/Applicationacceptoffer";
  };

  viewapplication = (param) => (e) => {
    localStorage.setItem("applicationid", param);
    //localStorage.setItem('universityid',param);
    window.location = "/#/sendapplicationinprocess";
  };

  paymentdownload = (param) => (e) => {
    // console.log(e.target.value,param);
    localStorage.setItem("applicationid", param.application_id);
    axios
      .get(baseurl + "/getapppersonal/" + localStorage.getItem("applicationid"))
      .then((response) => {
        console.log(response.data.stu_personal);
        // this.state.studentdetails = await response.stu_personal;
        // this.setState({
        //     studentdetails : response.data.stu_personal,
        // });

        // console.log(this.state.studentdetails);
        // https://formeeadmin.bicsglobal.com/getapppersonal
        var doc = new jsPDF("p", "pt");
        doc.setFontSize(15);
        doc.text("General Information", 550, 30, "right");

        doc.addImage(formee_logo, "PNG", 10, 40, 200, 50);

        doc.setFont("helvetica");
        doc.setFontType("normal");
        doc.setFontSize(10);
        doc.text(480, 60, "Formee Express :", "right");
        doc.text(
          500,
          60,
          response.data.stu_personal.id != null
            ? response.data.stu_personal.id.toString()
            : ""
        );
        doc.setFontSize(10);
        doc.text(480, 70, "Student Name :", "right");
        doc.text(
          500,
          70,
          response.data.stu_personal.first_name != null
            ? response.data.stu_personal.first_name.toString()
            : ""
        );
        // doc.setFontSize(10);
        doc.text(480, 80, "Login  Email :", "right");
        doc.text(
          500,
          80,
          response.data.stu_personal.addr_email != null
            ? response.data.stu_personal.addr_email.toString()
            : ""
        );
        // doc.setFontSize(10);
        doc.text(480, 90, "Primary Email :", "right");
        doc.text(
          500,
          90,
          response.data.stu_personal.addr_email != null
            ? response.data.stu_personal.addr_email.toString()
            : ""
        );
        // doc.setFontSize(10);

        doc.text(480, 100, "Dob :", "right");
        doc.text(
          500,
          100,
          response.data.stu_personal.dateof_birth != null
            ? response.data.stu_personal.dateof_birth.toString()
            : ""
        );
        doc.setFontSize(10);
        doc.text(480, 110, "Phone Number :", "right");
        doc.text(
          500,
          110,
          response.data.stu_personal.phone != null
            ? response.data.stu_personal.phone.toString()
            : ""
        );
        // doc.setFontSize(10);
        doc.text(480, 120, "First Language :", "right");
        doc.text(
          500,
          120,
          response.data.stu_personal.first_language != null
            ? response.data.stu_personal.first_language.toString()
            : ""
        );
        // doc.setFontSize(10);
        doc.text(480, 130, "Gender :", "right");
        doc.text(
          500,
          130,
          response.data.stu_personal.gender != null
            ? response.data.stu_personal.gender.toString()
            : ""
        );
        // doc.setFontSize(10);

        // doc.setFontSize(15);
        // doc.text(20, 150,'Education');
        // doc.setFontSize(10);
        // doc.text(20, 170, 'COUNTRY OF EDUCATION :')
        // doc.text(200, 170, ((response.data.stu_education.country_name)!=null)?(response.data.stu_education.country_name).toString():'');
        // doc.setFontSize(10);
        // doc.text(20, 180, 'HIGHEST LEVEL OF EDUCATION:')
        // doc.text(200, 180, ((response.data.stu_education.educationlevel_name)!=null)?(response.data.stu_education.educationlevel_name).toString():'');
        // // doc.setFontSize(10);
        // doc.text(20, 190, 'LEVEL OF EDUCATION:')
        // doc.text(200, 190, ((response.data.eduhis.edulevel )!=null)?(response.data.eduhis.edulevel ).toString():'');
        // doc.setFontSize(10);
        // doc.text(480, 130, 'LEVEL OF EDUCATION  :','right')
        // doc.text(500, 130, ((response.data.stu_education.gender)!=null)?(response.data.stu_education.gender).toString():'');
        // doc.setFontSize(10);

        doc.setFontSize(15);
        doc.text(20, 150, "Education");
        doc.setFontSize(8);
        doc.text(20, 170, "COUNTRY OF EDUCATION :");
        doc.text(
          200,
          170,
          response.data.stu_education.country_name != null
            ? response.data.stu_education.country_name.toString()
            : ""
        );
        doc.setFontSize(8);
        doc.text(20, 180, "HIGHEST LEVEL OF EDUCATION:");
        doc.text(
          200,
          180,
          response.data.stu_education.educationlevel_name != null
            ? response.data.stu_education.educationlevel_name.toString()
            : ""
        );
        doc.setFontSize(8);
        doc.text(20, 190, "LEVEL OF EDUCATION:");
        doc.text(
          200,
          190,
          response.data.eduhis.edulevel != null
            ? response.data.eduhis.edulevel.toString()
            : ""
        );
        // doc.setFontSize(10);
        // doc.text(480, 130, 'LEVEL OF EDUCATION  :','right')
        // doc.text(500, 130, ((response.data.stu_education.gender)!=null)?(response.data.stu_education.gender).toString():'');
        // doc.setFontSize(10);

        doc.setFontSize(13);
        doc.text(20, 220, "Test Scores");
        doc.setFontSize(8);
        doc.text(20, 240, "READING SCORES :");
        doc.text(
          200,
          240,
          response.data.stu_testscore.reading_score != null
            ? response.data.stu_testscore.reading_score.toString()
            : "-"
        );
        doc.setFontSize(8);
        doc.text(20, 250, "LISTENING SCORES :");
        doc.text(
          200,
          250,
          response.data.stu_testscore.listening_score != null
            ? response.data.stu_testscore.listening_score.toString()
            : "-"
        );
        // doc.setFontSize(10);
        doc.text(20, 260, "WRITING SCORES:");
        doc.text(
          200,
          260,
          response.data.stu_testscore.writing_score != null
            ? response.data.stu_testscore.writing_score.toString()
            : "-"
        );
        doc.setFontSize(10);
        // doc.text(20, 275,' Additional Qualifications');

        doc.setFontSize(10);

        doc.text(20, 280, "GRE Exam Scores :");
        doc.setFontSize(8);
        doc.text(20, 300, "GRE EXAM DATE :");
        doc.text(
          200,
          300,
          response.data.stu_testscore.gre_exam_date != null
            ? response.data.stu_testscore.gre_exam_date.toString()
            : ""
        );
        doc.setFontSize(8);
        doc.text(20, 310, "Verbal SCORES:");

        doc.text(
          200,
          310,
          response.data.stu_testscore.gre_verbal_score != null
            ? response.data.stu_testscore.gre_verbal_score.toString()
            : ""
        );
        // doc.setFontSize(10);

        doc.text(20, 320, "Quantitative SCORES:");

        doc.text(
          200,
          320,
          response.data.stu_testscore.gre_quanitative_score != null
            ? response.data.stu_testscore.gre_quanitative_score.toString()
            : ""
        );
        // doc.setFontSize(10);

        doc.text(20, 330, "Writing Score:");

        doc.text(
          200,
          330,
          response.data.stu_testscore.gmat_writing_score != null
            ? response.data.stu_testscore.gmat_writing_score.toString()
            : ""
        );

        doc.setFontSize(10);

        doc.text(20, 345, "Gmat Exam scores:");

        doc.setFontSize(8);
        doc.text(20, 360, "GMAT EXAM DATE :");
        doc.text(
          200,
          360,
          response.data.stu_testscore.gmat_exam_date != null
            ? response.data.stu_testscore.gmat_exam_date.toString()
            : ""
        );
        doc.setFontSize(8);
        doc.text(20, 370, "Verbal SCORES:");

        doc.text(
          200,
          370,
          response.data.stu_testscore.gmat_verbal_score != null
            ? response.data.stu_testscore.gmat_verbal_score.toString()
            : ""
        );
        // doc.setFontSize(10);

        doc.text(20, 380, "Quantitative SCORES:");

        doc.text(
          200,
          380,
          response.data.stu_testscore.gmat_quanitative_score != null
            ? response.data.stu_testscore.gmat_quanitative_score.toString()
            : ""
        );
        // doc.setFontSize(10);

        doc.text(20, 390, "Writing Score:");

        doc.text(
          200,
          390,
          response.data.stu_testscore.gmat_writing_score != null
            ? response.data.stu_testscore.gmat_writing_score.toString()
            : ""
        );

        // doc.text(200, 330, ((response.data.stu_testscore.gmat_writing_score )!=null)?(response.data.stu_testscore.gmat_writing_score ).toString():'');
        // doc.setFontSize(10);

        doc.save("details.pdf");
      });
  };

  // paymenthistorydownload = (param) => (e) => {
  //   // console.log(e.target.value,param);
  //   var doc = new jsPDF("p", "pt");
  //   doc.text(20, 20, "Payment Details");
  //   doc.addImage(formee_logo, "PNG", 350, 20, 200, 50);

  //   doc.setFont("helvetica");
  //   doc.setFontType("normal");
  //   doc.setFontSize(10);
  //   doc.text(20, 60, "Payer ID:");
  //   doc.text(130, 60, param.id.toString());
  //   doc.setFontSize(10);
  //   doc.text(20, 80, "Recipient Name:");
  //   doc.text(130, 80, param.recipient_name.toString());
  //   doc.setFontSize(10);
  //   doc.text(20, 100, "Recipient  Email:");
  //   doc.text(130, 100, param.recipient_email.toString());
  //   doc.setFontSize(10);
  //   doc.text(20, 120, "Payment Date:");
  //   doc.text(130, 120, param.payment_date.toString());
  //   doc.setFontSize(10);
  //   doc.text(20, 140, "Student ID:");
  //   doc.text(130, 140, param.studentid.toString());
  //   doc.setFontSize(10);
  //   doc.text(20, 160, "Course ID:");
  //   doc.text(130, 160, param.courseid.toString());
  //   doc.text(20, 180, "Tution Fee");
  //   doc.text(130, 180, param.tution_fee.toString());
  //   doc.text(20, 200, "Amount");
  //   doc.text(130, 200, param.amount.toString());
  //   doc.save("details.pdf");
  // };

  generateinvoiceandreceipt = (param) => {
    // console.log(paidpayment);
    // var doc = new jsPDF('p', 'pt');

    // var img = new Image();
    debugger;
    const applicationid = param.application_id;
    localStorage.setItem("applicationid", applicationid);

    if (param.payment_type === "Application fee") {
      axios
        .get(baseurl + "/getStudentReceiptByAppl/" + applicationid)
        .then((response) => {
          debugger;
          console.log(response.data.payment_details, "Receipt Data");
          //localStorage.setItem("receipt", null);
          this.setState({ receipt: response.data.payment_details });
          let discount_invoice =
            this.state.invoiceData !== "0"
              ? Number(this.state.invoiceData.amount) * 0.05
              : 0;
          let total_invoice =
            this.state.invoiceData !== "0"
              ? Number(this.state.invoiceData.amount) - discount_invoice
              : 0;

          // let receipt = JSON.parse(localStorage.getItem("receipt"));

          let discount_receipt =
            this.state.receipt !== "0"
              ? Number(this.state.receipt.amount) * 0.05
              : 0;
          let total_receipt =
            this.state.receipt !== "0"
              ? Number(this.state.receipt.amount) - discount_receipt
              : 0;

          var doc = new jsPDF();

          // right details
          doc.addImage(formee_logo, "PNG", 10, 20, 60, 50);
          doc.setFontSize(10);
          doc.text("Formee Express", 200, 30, "right");
          doc.text("41 Boundary Line", 200, 35, "right");
          doc.text("North melbourne VIC 3051", 200, 40, "right");
          doc.text("ABN no", 200, 45, "right");
          doc.text("@info@formeexpress.com", 200, 53, "right");
          doc.text("M+ 678565432", 200, 60, "right");

          // recipient
          doc.setFontSize(13);
          doc.text("Recipient", 20, 75, "left");
          if (param.payment_type === "Application fee") {
            doc.setFontSize(10);
            doc.text(
              this.state.receipt.customer_first_name +
                " " +
                this.state.receipt.customer_last_name,
              20,
              85,
              "left"
            );
            doc.text(this.state.receipt.customer_address, 20, 90, "left");

            doc.text("@" + this.state.receipt.customer_email, 20, 106, "left");
            doc.text("M" + this.state.receipt.customer_mobile, 20, 111, "left");
          } else {
            doc.setFontSize(10);
            doc.text(
              this.state.invoiceData.customer_first_name +
                " " +
                this.state.invoiceData.customer_last_name,
              20,
              85,
              "left"
            );
            doc.text(this.state.invoiceData.customer_address, 20, 90, "left");

            doc.text(
              "@" + this.state.invoiceData.customer_email,
              20,
              106,
              "left"
            );
            doc.text(
              "M" + this.state.invoiceData.customer_mobile,
              20,
              111,
              "left"
            );
          }

          // doc.addImage(formee_logo, "PNG", 10, 20, 60, 50);
          if (param.payment_type === "Application fee") {
            doc.setFontSize(20);
            doc.text("Receipt", 200, 75, "right");
            doc.setFontSize(10);
            doc.text("DATE " + this.state.receipt.paid_date, 200, 85, "right");
            doc.text(
              "RECEIPT NO. " + this.state.receipt.receipt_no,
              200,
              90,
              "right"
            );
          } else {
            doc.setFontSize(20);
            doc.text("Invoice", 200, 75, "right");
            doc.setFontSize(10);
            doc.text(
              "DATE " + this.state.invoiceData.paid_date,
              200,
              85,
              "right"
            );
            doc.text(
              "INVOICE NO. " + this.state.invoiceData.invoice_no,
              200,
              90,
              "right"
            );
          }

          // recipient
          //  doc.setFontSize(13);
          //  doc.text("Recipient", 20,75,'left');
          if (param.payment_type === "Application fee") {
            doc.setFontSize(10);
            doc.text("INSTITUTES NAME", 20, 125, "left");
            doc.text(this.state.receipt.institute_name, 20, 130, "left");
            doc.text(this.state.receipt.course_name, 20, 135, "left");
          } else {
            doc.setFontSize(10);
            doc.text("INSTITUTES NAME", 20, 125, "left");
            doc.text(this.state.invoiceData.institute_name, 20, 130, "left");
            doc.text(this.state.invoiceData.course_name, 20, 135, "left");
          }

          doc.setFontSize(10);
          doc.text("description", 20, 145, "left");
          doc.text("fee", 150, 145, "right");
          doc.text("amount", 200, 145, "right");
          //  doc.line(20, 150, 200, 150);
          if (param.payment_type === "Application fee") {
            doc.text(this.state.receipt.fee_detail, 20, 155, "left");
            doc.text(
              "$" + this.state.receipt.amount + "AUD",
              150,
              155,
              "right"
            );
            doc.text(
              "$" + this.state.receipt.amount + "AUD",
              200,
              155,
              "right"
            );

            doc.line(20, 160, 200, 160);
            doc.text("Sub Total", 130, 175, "left");
            doc.text(
              "$" + this.state.receipt.amount + "AUD",
              200,
              175,
              "right"
            );
            //  doc.text("$15000", 200,165,'right');
            // doc.line(130, 190, 200, 170);
            doc.line(130, 180, 200, 180);

            doc.text("Discount 5%", 130, 185, "left");
            doc.text("$" + discount_receipt + "AUD", 200, 185, "right");
            doc.line(130, 190, 200, 190);

            doc.text("Total", 130, 195, "left");
            doc.text("$" + total_receipt + "AUD", 200, 195, "right");
            //  doc.line(130, 190, 200, 190);
          } else {
            doc.text(this.state.invoiceData.fee_detail, 20, 165, "left");
            doc.text(
              "$" + this.state.invoiceData.amount + "AUD",
              150,
              165,
              "right"
            );
            doc.text("$" + this.state.invoiceData.amount, 200, 165, "right");

            doc.line(20, 170, 200, 170);
            doc.text("Sub Total", 130, 175, "left");
            doc.text(
              "$" + this.state.invoiceData.amount + "AUD",
              200,
              175,
              "right"
            );
            //  doc.text("$15000", 200,165,'right');
            // doc.line(130, 190, 200, 170);
            doc.line(130, 180, 200, 180);

            doc.text("Discount 5%", 130, 185, "left");
            doc.text("$" + discount_invoice + "AUD", 200, 185, "right");
            doc.line(130, 190, 200, 190);

            doc.text("Total", 130, 195, "left");
            doc.text("$" + total_invoice + "AUD", 200, 195, "right");
            //  doc.line(130, 190, 200, 190);
          }

          doc.text(
            "To transfer the amount select payment method here",
            130,
            205,
            "left"
          );

          // doc.text("Notes",135 ,195,'left');

          doc.text("Notes", 20, 220, "left");

          doc.text(
            " 1.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quod eo liquidius faciet,si perspexerit rerum inter eas verborumne sit controversia.Tu autem negas fortem esse quemquam posse, qui dolorem malum putet.",
            20,
            230,
            "left"
          );
          doc.text(
            " 2. Tum Torquatus: Prorsus, inquit, assentior; Duo Reges: constructio interrete. Cupit enim dícere nihil posse ad beatam vitam deesse sapienti. Erit enim instructus ad mortem contemnendam, ad exilium, ad ipsum etiam dolorem. ",
            20,
            230,
            "left"
          );
          doc.text(
            "3. Minime vero, inquit ille, consentit. Quae qui non vident, nihil umquam magnum accognitione dignum amaverunt. Sed quid sentiat, non videtis.",
            20,
            230,
            "left"
          );
          if (param.payment_type === "Application fee") {
            doc.save("receipt.pdf");
          } else {
            doc.save("invoice.pdf");
          }
        })
        .catch((err) => {
          debugger;
          //window.location.href = "#/paymentDetails";
        });
      console.log(this.state.receipt, "Receipt Data State");
    } else {
      axios
        .get(
          baseurl +
            "/getStudentInvoiceByAppl/" +
            localStorage.getItem("applicationid")
        )
        .then((response) => {
          console.log(response.data, "Invoice Data");
          this.setState({ invoiceData: response.data.payment_details });

          let discount_invoice =
            this.state.invoiceData !== "0"
              ? Number(this.state.invoiceData.amount) * 0.05
              : 0;
          let total_invoice =
            this.state.invoiceData !== "0"
              ? Number(this.state.invoiceData.amount) - discount_invoice
              : 0;

          // let receipt = JSON.parse(localStorage.getItem("receipt"));

          let discount_receipt =
            this.state.receipt !== "0"
              ? Number(this.state.receipt.amount) * 0.05
              : 0;
          let total_receipt =
            this.state.receipt !== "0"
              ? Number(this.state.receipt.amount) - discount_receipt
              : 0;

          var doc = new jsPDF();

          // right details
          doc.addImage(formee_logo, "PNG", 10, 20, 60, 50);
          doc.setFontSize(10);
          doc.text("Formee Express", 200, 30, "right");
          doc.text("41 Boundary Line", 200, 35, "right");
          doc.text("North melbourne VIC 3051", 200, 40, "right");
          doc.text("ABN no", 200, 45, "right");
          doc.text("@info@formeexpress.com", 200, 53, "right");
          doc.text("M+ 678565432", 200, 60, "right");

          // recipient
          doc.setFontSize(13);
          doc.text("Recipient", 20, 75, "left");
          if (param.payment_type === "Application fee") {
            doc.setFontSize(10);
            doc.text(
              this.state.receipt.customer_first_name +
                " " +
                this.state.receipt.customer_last_name,
              20,
              85,
              "left"
            );
            doc.text(this.state.receipt.customer_address, 20, 90, "left");

            doc.text("@" + this.state.receipt.customer_email, 20, 106, "left");
            doc.text("M" + this.state.receipt.customer_mobile, 20, 111, "left");
          } else {
            doc.setFontSize(10);
            doc.text(
              this.state.invoiceData.customer_first_name +
                " " +
                this.state.invoiceData.customer_last_name,
              20,
              85,
              "left"
            );
            doc.text(this.state.invoiceData.customer_address, 20, 90, "left");

            doc.text(
              "@" + this.state.invoiceData.customer_email,
              20,
              106,
              "left"
            );
            doc.text(
              "M" + this.state.invoiceData.customer_mobile,
              20,
              111,
              "left"
            );
          }

          // doc.addImage(formee_logo, "PNG", 10, 20, 60, 50);
          if (param.payment_type === "Application fee") {
            doc.setFontSize(20);
            doc.text("Receipt", 200, 75, "right");
            doc.setFontSize(10);
            doc.text("DATE " + this.state.receipt.paid_date, 200, 85, "right");
            doc.text(
              "RECEIPT NO. " + this.state.receipt.receipt_no,
              200,
              90,
              "right"
            );
          } else {
            doc.setFontSize(20);
            doc.text("Invoice", 200, 75, "right");
            doc.setFontSize(10);
            doc.text(
              "DATE " + this.state.invoiceData.paid_date,
              200,
              85,
              "right"
            );
            doc.text(
              "INVOICE NO. " + this.state.invoiceData.invoice_no,
              200,
              90,
              "right"
            );
          }

          // recipient
          //  doc.setFontSize(13);
          //  doc.text("Recipient", 20,75,'left');
          if (param.payment_type === "Application fee") {
            doc.setFontSize(10);
            doc.text("INSTITUTES NAME", 20, 125, "left");
            doc.text(this.state.receipt.institute_name, 20, 130, "left");
            doc.text(this.state.receipt.course_name, 20, 135, "left");
          } else {
            doc.setFontSize(10);
            doc.text("INSTITUTES NAME", 20, 125, "left");
            doc.text(this.state.invoiceData.institute_name, 20, 130, "left");
            doc.text(this.state.invoiceData.course_name, 20, 135, "left");
          }

          doc.setFontSize(10);
          doc.text("description", 20, 145, "left");
          doc.text("fee", 150, 145, "right");
          doc.text("amount", 200, 145, "right");
          //  doc.line(20, 150, 200, 150);
          if (param.payment_type === "Application fee") {
            doc.text(this.state.receipt.fee_detail, 20, 155, "left");
            doc.text(
              "$" + this.state.receipt.amount + "AUD",
              150,
              155,
              "right"
            );
            doc.text(
              "$" + this.state.receipt.amount + "AUD",
              200,
              155,
              "right"
            );

            doc.line(20, 160, 200, 160);
            doc.text("Sub Total", 130, 175, "left");
            doc.text(
              "$" + this.state.receipt.amount + "AUD",
              200,
              175,
              "right"
            );
            //  doc.text("$15000", 200,165,'right');
            // doc.line(130, 190, 200, 170);
            doc.line(130, 180, 200, 180);

            doc.text("Discount 5%", 130, 185, "left");
            doc.text("$" + discount_receipt + "AUD", 200, 185, "right");
            doc.line(130, 190, 200, 190);

            doc.text("Total", 130, 195, "left");
            doc.text("$" + total_receipt + "AUD", 200, 195, "right");
            //  doc.line(130, 190, 200, 190);
          } else {
            doc.text(this.state.invoiceData.fee_detail, 20, 165, "left");
            doc.text(
              "$" + this.state.invoiceData.amount + "AUD",
              150,
              165,
              "right"
            );
            doc.text("$" + this.state.invoiceData.amount, 200, 165, "right");

            doc.line(20, 170, 200, 170);
            doc.text("Sub Total", 130, 175, "left");
            doc.text(
              "$" + this.state.invoiceData.amount + "AUD",
              200,
              175,
              "right"
            );
            //  doc.text("$15000", 200,165,'right');
            // doc.line(130, 190, 200, 170);
            doc.line(130, 180, 200, 180);

            doc.text("Discount 5%", 130, 185, "left");
            doc.text("$" + discount_invoice + "AUD", 200, 185, "right");
            doc.line(130, 190, 200, 190);

            doc.text("Total", 130, 195, "left");
            doc.text("$" + total_invoice + "AUD", 200, 195, "right");
            //  doc.line(130, 190, 200, 190);
          }

          doc.text(
            "To transfer the amount select payment method here",
            130,
            205,
            "left"
          );

          // doc.text("Notes",135 ,195,'left');

          doc.text("Notes", 20, 220, "left");

          doc.text(
            " 1.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quod eo liquidius faciet,si perspexerit rerum inter eas verborumne sit controversia.Tu autem negas fortem esse quemquam posse, qui dolorem malum putet.",
            20,
            230,
            "left"
          );
          doc.text(
            " 2. Tum Torquatus: Prorsus, inquit, assentior; Duo Reges: constructio interrete. Cupit enim dícere nihil posse ad beatam vitam deesse sapienti. Erit enim instructus ad mortem contemnendam, ad exilium, ad ipsum etiam dolorem. ",
            20,
            230,
            "left"
          );
          doc.text(
            "3. Minime vero, inquit ille, consentit. Quae qui non vident, nihil umquam magnum accognitione dignum amaverunt. Sed quid sentiat, non videtis.",
            20,
            230,
            "left"
          );
          if (param.payment_type === "Application fee") {
            doc.save("receipt.pdf");
          } else {
            doc.save("invoice.pdf");
          }
        })
        .catch((err) => {
          // window.location.href = "#/paymentDetails";
        });
    }
  };
  render() {
    console.log(this.state.receipt, "render");
    const imgpath = `${config.baseurl}`;
    return (
      <div className="pt-5 send-app-2 send-app-page pb-5">
        <div className="foe-student-box mt-4 pt-2">
          <Container>
            <ToastContainer />
            <Row>
              <Col xs="12" sm="12" xl="3" md="12" lg="3">
                <Card className="uni-left-card">
                  <CardBody className="pr-0">
                    <ListGroup className="left-list">
                      <Link to="/dashboard">
                        <ListGroupItem>Dashboard</ListGroupItem>
                      </Link>
                      <Link to="/studentprofile">
                        <ListGroupItem>Personal Information</ListGroupItem>
                      </Link>
                      <Link to="/changepassword">
                        <ListGroupItem>Change password</ListGroupItem>
                      </Link>
                      <Link to="/paymentDetails">
                        <ListGroupItem className="active">
                          Payments
                        </ListGroupItem>
                      </Link>

                      <Link to="/documentation">
                        <ListGroupItem>Documentation</ListGroupItem>
                      </Link>

                      <Link to="/profilenotification">
                        <ListGroupItem>Notification</ListGroupItem>
                      </Link>
                      <Link to="/savedsearch">
                        <ListGroupItem>Saved Searches</ListGroupItem>
                      </Link>
                      {/* <ListGroupItem  className="active">Payments</ListGroupItem> */}
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>

              <Col
                xs="12"
                sm="12"
                xl="9"
                md="12"
                lg="9"
                className="payment-table-sec"
              >
                <div className="uni-right-card">
                  <div className="px-3">
                    <Row>
                      <div className="col-md-12">
                        <div className="px-0 col-12 mt-3 view-application-tab">
                          <div className="row">
                            <div className="profile-student pay-detail col-12 px-0">
                              <div id="main">
                                <div className="container px-0">
                                  <div className="accordion" id="faq">
                                    <div className="card">
                                      <div
                                        className="card-header"
                                        id="faqhead1"
                                      >
                                        <a
                                          href="#"
                                          className="btn btn-header-link collapsed pl-5"
                                          data-toggle="collapse"
                                          data-target="#faq1"
                                          aria-expanded="true"
                                          aria-controls="faq1"
                                        >
                                          PAYMENT DETAILS
                                        </a>
                                      </div>
                                      <div
                                        id="faq1"
                                        className="collapse"
                                        aria-labelledby="faqhead1"
                                        data-parent="#faq"
                                      >
                                        <div className="card-body px-5 pt-0">
                                          <div className="row">
                                            <div className="col-md-6">
                                              <FormGroup>
                                                <Label className="uni-label ">
                                                  Pay by
                                                </Label>
                                                <Input
                                                  type="select"
                                                  id="payby"
                                                  onChange={
                                                    this.handlepaybyChange
                                                  }
                                                  className=""
                                                >
                                                  <option value="">
                                                    Select
                                                  </option>
                                                  <option
                                                    value="Credit"
                                                    selected={
                                                      "Credit" ==
                                                      this.state.payby
                                                    }
                                                  >
                                                    Credit
                                                  </option>
                                                  <option
                                                    value="Paypal"
                                                    selected={
                                                      "Paypal" ==
                                                      this.state.payby
                                                    }
                                                  >
                                                    Paypal
                                                  </option>
                                                  <option
                                                    value="Stripe"
                                                    selected={
                                                      "Stripe" ==
                                                      this.state.payby
                                                    }
                                                  >
                                                    Stripe
                                                  </option>
                                                </Input>
                                              </FormGroup>
                                              <h6 style={{ color: "red" }}>
                                                {this.state.errors.fname}
                                              </h6>
                                            </div>
                                          </div>
                                          {this.state.payby === "Credit" ||
                                          this.state.payby === "Paypal" ||
                                          this.state.payby === "Stripe" ? (
                                            <React.Fragment>
                                              {" "}
                                              <div className="row">
                                                <div className="col-md-6">
                                                  <FormGroup>
                                                    <Label className="uni-label">
                                                      Card Number{" "}
                                                    </Label>
                                                    <Input
                                                      type="text"
                                                      className="form-control "
                                                      placeholder="0000 - 0000 - 0000 - 0000"
                                                      onChange={
                                                        this
                                                          .handlecardnumberChange
                                                      }
                                                      value={
                                                        this.state.cardnumber
                                                      }
                                                    />
                                                  </FormGroup>
                                                  <h6 style={{ color: "red" }}>
                                                    {
                                                      this.state.errors
                                                        .cardnumber
                                                    }
                                                  </h6>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col-md-6">
                                                  <FormGroup>
                                                    <Label className="uni-label">
                                                      Card Name{" "}
                                                    </Label>
                                                    <Input
                                                      type="text"
                                                      className="form-control "
                                                      placeholder=""
                                                      onChange={
                                                        this
                                                          .handlecardnameChange
                                                      }
                                                      value={
                                                        this.state.cardname
                                                      }
                                                    />
                                                  </FormGroup>
                                                  <h6 style={{ color: "red" }}>
                                                    {this.state.errors.cardname}
                                                  </h6>
                                                </div>
                                              </div>
                                              <div className="row">
                                                <div className="col-md-3">
                                                  <FormGroup>
                                                    <Label className="uni-label">
                                                      Security{" "}
                                                    </Label>
                                                    <Input
                                                      type="text"
                                                      className="form-control "
                                                      placeholder="---"
                                                      onChange={
                                                        this
                                                          .handlesecurityChange
                                                      }
                                                      value={
                                                        this.state.security
                                                      }
                                                    />
                                                  </FormGroup>
                                                  <h6 style={{ color: "red" }}>
                                                    {this.state.errors.security}
                                                  </h6>
                                                </div>

                                                <div className="col-md-3">
                                                  <FormGroup>
                                                    <Label className="uni-label">
                                                      Expiry Date{" "}
                                                    </Label>
                                                    <DatePicker
                                                      selected={
                                                        this.state.date === null
                                                          ? null
                                                          : this.state.date
                                                      }
                                                      onChange={(e) => {
                                                        this.handledateChange(
                                                          e
                                                        );
                                                      }}
                                                      dateFormat="yyyy-MM-dd"
                                                      className="form-control"
                                                      id="date"
                                                      showMonthDropdown
                                                      showYearDropdown
                                                      dropdownMode="select"
                                                      placeholderText="YYYY-MM-DD"
                                                      minDate={new Date()}
                                                    />
                                                  </FormGroup>
                                                  <h6 style={{ color: "red" }}>
                                                    {this.state.errors.date}
                                                  </h6>
                                                </div>

                                                <div className="col-md-3">
                                                  <FormGroup>
                                                    <Label className="uni-label">
                                                      Zipcode{" "}
                                                    </Label>
                                                    <Input
                                                      type="text"
                                                      className="form-control "
                                                      placeholder=""
                                                      onChange={
                                                        this.handlezipcodeChange
                                                      }
                                                      value={this.state.zipcode}
                                                    />
                                                  </FormGroup>
                                                  <h6 style={{ color: "red" }}>
                                                    {this.state.errors.zipcode}
                                                  </h6>
                                                </div>
                                              </div>
                                              <div className="row mt-3">
                                                <div className="col-md-6">
                                                  <FormGroup>
                                                    <input
                                                      type="checkbox"
                                                      className="check-blue"
                                                      onChange={
                                                        this.handleCheck
                                                      }
                                                      checked={
                                                        this.state.isChecked
                                                      }
                                                    />
                                                    {/* <p>Checkbox: {msg}</p> */}{" "}
                                                    <Label className="uni-label checkbox-pay pl-2">
                                                      Remember for further
                                                      purchases{"  "}
                                                    </Label>
                                                  </FormGroup>
                                                </div>
                                              </div>
                                              <div className="col-12 d-flex justify-content-end">
                                                <Button
                                                  color="primary"
                                                  className="score-save "
                                                  type="submit"
                                                  onClick={this.validate.bind(
                                                    this
                                                  )}
                                                >
                                                  SAVE
                                                </Button>
                                              </div>
                                            </React.Fragment>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card">
                                      <div
                                        className="card-header"
                                        id="faqhead2"
                                      >
                                        <a
                                          href="#"
                                          className="btn btn-header-link collapsed pl-5"
                                          data-toggle="collapse"
                                          data-target="#faq2"
                                          aria-expanded="false"
                                          aria-controls="faq2"
                                        >
                                          UNPAID
                                        </a>
                                        {/* <a
                                          href="#"
                                          className="btn btn-header-link collapsed"
                                        >
                                          UNPAID
                                        </a> */}
                                      </div>

                                      <div
                                        id="faq2"
                                        className="collapse"
                                        aria-labelledby="faqhead2"
                                        data-parent="#faq"
                                      >
                                        {/* <div> */}
                                        <div className="card-flex py-0">
                                          <div className="card-flex  table-responsive py-0">
                                            <table className="mb-0 draft-table table table-responsive-sm display nowrap dataTable dtr-inline collapsed">
                                              <tr>
                                                <th>University</th>
                                                <th>Due Date</th>
                                                <th>Fees</th>
                                                <th>Tax</th>
                                                <th>Total Amount</th>
                                                <th className="program-width">
                                                  Status
                                                </th>
                                                <th></th>
                                                <th>Download</th>
                                                {/* <th></th> */}
                                                {/*<th></th>*/}
                                              </tr>
                                              {/* {this.state.draftapplication.map((draftapplication, index) => ( */}
                                              {/* <tr> */}
                                              {this.state.unpaidpayments !==
                                              undefined
                                                ? this.state.unpaidpayments.map(
                                                    (paidpayment) => (
                                                      <tr>
                                                        <td>
                                                          {paidpayment.institute_name ===
                                                          null
                                                            ? "-"
                                                            : paidpayment.institute_name}
                                                        </td>
                                                        <td className="weight-600">
                                                          {paidpayment.due_date}
                                                        </td>
                                                        <td>
                                                          {paidpayment.payment_type ===
                                                          "Application fee"
                                                            ? "Application Fee "
                                                            : "Tution Fee "}
                                                          <span>
                                                            AUD $
                                                            {
                                                              paidpayment.tution_fee
                                                            }{" "}
                                                          </span>
                                                        </td>
                                                        <td>Tax : </td>
                                                        <td className="weight-600">
                                                          AUD $
                                                          {paidpayment.amount}
                                                        </td>
                                                        <td className="color-orange ">
                                                          {paidpayment.paymentstatus !=
                                                          1
                                                            ? "payment pending"
                                                            : "Paid"}
                                                        </td>
                                                        <td>
                                                          {paidpayment.payment_type ===
                                                          "Application fee" ? (
                                                            <Button
                                                              color="primary"
                                                              className="add-staff-bn pr-10"
                                                              onClick={this.makepayment(
                                                                paidpayment.courseid
                                                              )}
                                                            >
                                                              Make a Payment
                                                            </Button>
                                                          ) : (
                                                            <Button
                                                              color="primary"
                                                              className="add-staff-bn pr-10"
                                                              onClick={this.makepaymenttution(
                                                                paidpayment.courseid
                                                              )}
                                                            >
                                                              Make a Payment
                                                            </Button>
                                                          )}
                                                        </td>

                                                        <td>
                                                          {/* <PDFDownloadLink
                                                            document={
                                                              <Details
                                                                data={
                                                                  paidpayment
                                                                }
                                                              />
                                                            }
                                                            fileName="details.pdf"
                                                          > */}
                                                          <img
                                                            className=" pr-10"
                                                            src={downloadicon}
                                                            onClick={this.paymentdownload(
                                                              paidpayment
                                                            )}
                                                          />
                                                          {/* </PDFDownloadLink> */}
                                                          <img
                                                            className="svg-table-icon"
                                                            src={deleteicon}
                                                          />
                                                        </td>
                                                      </tr>
                                                    )
                                                  )
                                                : null}
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card">
                                      <div
                                        className="card-header"
                                        id="faqhead3"
                                      >
                                        <a
                                          href="#"
                                          className="btn btn-header-link collapsed pl-5"
                                          data-toggle="collapse"
                                          data-target="#faq3"
                                          aria-expanded="true"
                                          aria-controls="faq3"
                                        >
                                          PAYMENTS HISTORY
                                        </a>
                                      </div>

                                      <div
                                        id="faq3"
                                        className="collapse"
                                        aria-labelledby="faqhead3"
                                        data-parent="#faq"
                                      >
                                        <div className="card-flex py-0">
                                          <div className="card-flex  table-responsive py-0">
                                            <table className="mb-0 draft-table table table-responsive-sm display nowrap dataTable dtr-inline collapsed">
                                              <tr>
                                                <th>University</th>
                                                <th className="program-width">
                                                  Payment Date
                                                </th>
                                                <th>Transaction ID</th>
                                                <th>Fees</th>
                                                <th>Tax</th>
                                                <th>Total Amount</th>
                                                <th>Status</th>
                                                <th></th>
                                                <th>Download</th>
                                                {/* <th></th> */}
                                                {/*<th></th>*/}
                                              </tr>

                                              {this.state.paidpayments !==
                                              undefined
                                                ? this.state.paidpayments.map(
                                                    (paidpayment, index) => (
                                                      <tr>
                                                        <td>
                                                          {paidpayment.institute_name ===
                                                          null
                                                            ? "-"
                                                            : paidpayment.institute_name}
                                                        </td>
                                                        <td className="program-width weight-600">
                                                          {
                                                            paidpayment.paid_date
                                                          }
                                                        </td>
                                                        <td>
                                                          {
                                                            paidpayment.paymentID
                                                          }
                                                        </td>
                                                        <td>
                                                          {paidpayment.payment_type ===
                                                          "Application fee"
                                                            ? "Application Fee "
                                                            : "Tution Fee "}
                                                          <span>
                                                            AUD $
                                                            {
                                                              paidpayment.tution_fee
                                                            }{" "}
                                                          </span>
                                                        </td>
                                                        <td>Tax : </td>
                                                        <td className="weight-600">
                                                          AUD $
                                                          {paidpayment.amount}
                                                        </td>

                                                        <td className="color-orange weight-600">
                                                          {paidpayment.paymentstatus !=
                                                          1
                                                            ? "Pending"
                                                            : "Paid"}
                                                        </td>
                                                        <td>
                                                          {paidpayment.payment_type ===
                                                          "Application fee" ? (
                                                            // <PDFDownloadLink
                                                            //   document={
                                                            //     <Receipt
                                                            //       data={
                                                            //         paidpayment
                                                            //       }
                                                            //     />
                                                            //   }
                                                            //   fileName="receipt.pdf"
                                                            // >
                                                            <Button
                                                              className="font-12"
                                                              onClick={() => {
                                                                this.generateinvoiceandreceipt(
                                                                  paidpayment
                                                                );
                                                              }}
                                                            >
                                                              View Receipt
                                                            </Button>
                                                          ) : // </PDFDownloadLink>
                                                          paidpayment.payment_type ===
                                                            "Tution fee" ? (
                                                            // <PDFDownloadLink
                                                            //   document={
                                                            //     <Invoice
                                                            //       data={
                                                            //         paidpayment
                                                            //       }
                                                            //     />
                                                            //   }
                                                            //   fileName="invoice.pdf"
                                                            // >
                                                            //   View Invoice
                                                            // </PDFDownloadLink>
                                                            <Button
                                                              onClick={this.generateinvoiceandreceipt(
                                                                paidpayment
                                                              )}
                                                            >
                                                              View Invoice
                                                            </Button>
                                                          ) : null}
                                                        </td>
                                                        <td>
                                                          {/* <PDFDownloadLink
                                                            document={
                                                              <Details
                                                                data={
                                                                  paidpayment
                                                                }
                                                              />
                                                            }
                                                            fileName="details.pdf"
                                                          > */}
                                                          <img
                                                            className=" pr-10"
                                                            src={downloadicon}
                                                            onClick={this.paymentdownload(
                                                              paidpayment
                                                            )}
                                                          />
                                                          {/* </PDFDownloadLink> */}
                                                          <img
                                                            className="svg-table-icon"
                                                            src={deleteicon}
                                                          />
                                                        </td>
                                                      </tr>
                                                      // {/* ))} */}
                                                    )
                                                  )
                                                : null}
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Row>
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

export default Paymentdetails;
