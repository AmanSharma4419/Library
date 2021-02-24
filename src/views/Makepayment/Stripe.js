import React, { useState, createRef, useEffect } from "react";
//import { useToasts } from "react-toast-notifications";
//import Select from "react-select";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import {
  useStripe,
  useElements,
  CardElement,
  // CardNumberElement
} from "@stripe/react-stripe-js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
import axios from "axios";
import config from "../../config.json";
//import { FaCreditCard } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Closebtn from "../../assets/img/close-btn.svg";

var baseurl = `${config.baseurl}/`;

const CheckListTwo = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [applicationfee, setapplicationfee] = useState();
  const [applicationid, setapplicationid] = useState();
  const [paymentsuccess, setpaymentsuccess] = useState(false);
  const [showvalidation, setshowvalidation] = useState(false);

  const [editcard, setEditCard] = useState(false);
  const [cardnumber, setCardNumber] = useState("");
  const [cardexpiredate, setCardExpiredDate] = useState();
  const [cardname, setCardName] = useState(null);
  const [cardpurchase, setCardPurchase] = useState(1);
  const [cardid, setCardID] = useState(0);
  const [cardsecurity, setCardSecurity] = useState("");
  const [cardZip, setCardZip] = useState("");
  const [tokenid, setToken] = useState(null);

  axios
    .get(
      baseurl +
        "getcoursedetails/" +
        localStorage.getItem("selectcoursedraft") +
        "/" +
        localStorage.getItem("studentid")
    )
    .then((response) => {
      setapplicationfee(response.data.courses.application_fee);
      //console.log(response.data);
    });

  axios
    .get(
      baseurl +
        "getapplicationid/" +
        localStorage.getItem("selectcoursedraft") +
        "/" +
        localStorage.getItem("studentid")
    )
    .then((response) => {
      //alert(response.data.courses.id);
      setapplicationid(response.data.courses.id);
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

      if (stripearr.length !== 0) {
        var len = stripearr.length - 1;

        setCardNumber(stripearr[len].creditcard_number);
        setCardExpiredDate(
          moment(stripearr[len].expiry_date).format("DD/MM/YY")
        );
        setCardSecurity(stripearr[len].security_code);
        setCardZip(stripearr[len].zipcode);
        setCardName(stripearr[len].creditcard_name);
        setCardPurchase(stripearr[len].purchase_remember);
        setCardID(stripearr[len].id);
        setToken(stripearr[len].stripe_tokenid);
      } else {
        setEditCard(true);
      }
    });

  const toggleSuccess = () => {
    setpaymentsuccess(!paymentsuccess);
  };

  const closeall = () => {
    window.location.reload();
  };

  // const [amount, applicationid] = useState("");
  // const { addToast } = useToasts();

  const editFunction = (e) => {
    e.preventDefault();
    setEditCard(true);
  };

  const handle_save = async (e) => {
    e.preventDefault();
    // let CardId = "";
    // let CustomerId = "Sho" + " " + "Formee";
    // const cardeelement = elements.getElement(CardElement);
    // let cardError;
    // if (cardeelement !== null) {
    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card: cardeelement,
    //   });
    //   if (paymentMethod) {
    //     //paymentDetails = paymentMethod;

    //     await stripe
    //       .createToken(cardeelement)
    //       .then((res) => {
    //         console.log("Token", res);
    //         CardId = res.token.id;
    //         props.parentcallback(res.token.id);
    //         toast.success("Payment details saved successfully");
    //         setEditCard(false);
    //       })
    //       .catch((err) => {
    //         console.log("Error Token", err);
    //       });
    //   } else {
    //     //toast.error("Not valid");
    //     setshowvalidation(true);
    //   }

    // }

    let formData = new FormData();
    formData.append("pay_by", "Stripe");
    formData.append("creditcard_number", cardnumber);
    formData.append("creditcard_name", cardname);
    formData.append("zipcode", cardZip);
    formData.append("security_code", cardsecurity);
    formData.append("purchase_remember", cardpurchase);
    if (cardid !== 0) {
      formData.append("id", cardid);
    }
    if (cardexpiredate != null) {
      var sdob = new Date(cardexpiredate);

      var options = { year: "numeric", month: "long", day: "numeric" };

      var dob = new Intl.DateTimeFormat("en-US", options).format(sdob);
      formData.append("expiry_date", dob);
    }

    formData.append("student_id", localStorage.getItem("studentid"));

    axios.post(baseurl + "store_carddetails", formData).then((response) => {
      toast.success("Payment Details Saved Successfully.");
    });

    let formd = new FormData();
    formd.append("number", cardnumber);
    formd.append("exp_month", sdob.getMonth());
    formd.append("exp_year", sdob.getFullYear());
    formd.append("cvc", cardsecurity);

    axios.post(baseurl + "/stripetokencreate", formd).then((respo) => {
      console.log(respo, "respo");
      alert("hi");
      props.parentcallback(tokenid);
    });
  };

  const handleCardNumber = (ev) => {
    setCardNumber(ev.target.value);
  };

  return (
    <React.Fragment>
      <div className="skp-list-container2">
        <Modal
          isOpen={paymentsuccess}
          toggle={toggleSuccess}
          className={
            "modal-md " + "register-popup sucess-pop" + " " + "ok"
            //this.props.className
          }
        >
          <ModalBody>
            <div className="modal_header mb-4">
              <span>
                &nbsp;&nbsp;&nbsp;
                <img
                  src={Closebtn}
                  alt="close-icon"
                  onClick={closeall}
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
                onClick={closeall}
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

        <form className="form-horizontal fin-payment" onSubmit={handle_save}>
          <div className="form-group">
            {editcard ? (
              <React.Fragment>
                <label>Card Number</label>
                <input
                  type="text"
                  value={cardnumber}
                  className="form-control"
                  onChange={handleCardNumber}
                />
                <label>Expire Date</label>
                <input
                  type="date"
                  value={cardexpiredate}
                  className="form-control"
                  onChange={(e) => {
                    setCardExpiredDate(e.target.value);
                  }}
                />
                <label>Security</label>
                <input
                  type="text"
                  value={cardsecurity}
                  className="form-control"
                  onChange={(e) => {
                    setCardSecurity(e.target.value);
                  }}
                />
                <label>Zip Code</label>
                <input
                  type="text"
                  value={cardZip}
                  className="form-control"
                  onChange={(e) => {
                    setCardZip(e.target.value);
                  }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <label>Card Number</label>
                <input
                  type="text"
                  value={cardnumber}
                  readOnly
                  className="form-control"
                />
                <label>Expire Date</label>
                <input
                  type="text"
                  value={cardexpiredate}
                  readOnly
                  className="form-control"
                />
                <label>Security</label>
                <input
                  type="text"
                  value={cardsecurity}
                  readOnly
                  className="form-control"
                />
                <label>Zip Code</label>
                <input
                  type="text"
                  value={cardZip}
                  readOnly
                  className="form-control"
                />
              </React.Fragment>
            )}
          </div>
          {showvalidation ? (
            <span style={{ color: "red" }}>Please enter valid details</span>
          ) : (
            <></>
          )}

          <div className="col-md-12 col-xl-12 col-lg-12 col-12 skp-align-right d-flex justify-content-end mb-5">
            {editcard ? (
              <button
                type="submit"
                className="btn btn-primary make-paymrnt-btn green-btn"
              >
                Save
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary make-paymrnt-btn"
                onClick={editFunction}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CheckListTwo;
