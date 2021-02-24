import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  RadioButton,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Media,
} from "reactstrap";

/*
import Campuses from './../Pages/Campuses/Campuses';

import Facilities from './../Facilities/Facilities';

import Entryrequirement from './../Pages/Entryrequirement/Entryrequirement';

import Universitycontact from './../Universitycontact/Universitycontact';
import Leftmenu from '../../assets/img/left-menu.jpg';
import { Addsubsection } from "../Pages/Campuses/index";

import Studentfacilities from './../Studentfacilities/Studentfacilities';
import Universityfacilities from './../Universityfacilities/Universityfacilities';
*/

import ProfileBanner from "../../assets/img/viewus_bg.jpg";
import buliding from "../../assets/img/university/img_01.jpg";
import fullimg from "../../assets/img/university/img_02.jpg";
import universityimg from "../../assets/img/university/img_03.png";
import studentimg from "../../assets/img/university/img_04.png";
import studenthub from "../../assets/img/university/img_05.jpg";
import deakinlogo from "../../assets/img/university/deakin_logo.jpg";
import bargraph from "../../assets/img/university/bar_graph.svg";
import contlogo from "../../assets/img/university/australia_circle_flag.svg";
import favourites from "../../assets/img/university/favourites.svg";
import heart from "../../assets/img/university/heart.svg";
import eyeicon from "../../assets/img/university/view_simple.svg";
import ratingfive from "../../assets/img/university/rating-five.svg";
import rating from "../../assets/img/university/rating.svg";
import ratingthree from "../../assets/img/university/rating-three.svg";
import ratingtwo from "../../assets/img/university/rating-two.svg";
import ratingone from "../../assets/img/university/rating-one.svg";
import backarrow from "../../assets/img/university/back_arrow.svg";
import Phoneicon from "../../assets/img/university/phone-icon.svg";
import Calendaricon from "../../assets/img/university/calendar-icon.svg";
import Mailicon from "../../assets/img/university/mail-high-icon.svg";
import Prefimg1 from "../../assets/img/pref-img-1.svg";
import Prefimg2 from "../../assets/img/pref-img-2.svg";
import Flagimg1 from "../../assets/img/flag-1.svg";
import Flagimg2 from "../../assets/img/flag-2.svg";
import Flagimg3 from "../../assets/img/flag-3.svg";
import Flagimg4 from "../../assets/img/flag-4.svg";
import Chartimg from "../../assets/img/chart-img.svg";
import Certificate from "../../assets/img/certificate.svg";
import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config.json";

var baseurl = `${config.baseurl}`;
class LeaveReviewUniversity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: [],
      facility: [],
      facilityuniversity: [],
      facilitystudent: [],
      //campusmain: [],
      //campussub: [],
      items: [],
      campus: [],
      aboutsub: [],
      language: [],
      facilitysub: [],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      formData: new FormData(),
      upload_photo: [],
      location: "",
      errors: {},
      overall_star: 0,
      totalstudents: 0,
      estimatedcost: 0,
      fileLength: "",
      funding: "",
      logo: "",
      banner: "",
      services_offered: [],
      agentdetails: [],
      review: "",
      countlike:"",
      rank:""
    };

    this.handleLayoutChange = this.handleLayoutChange.bind(this);
    this.handleChangeone = this.handleChangeone.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    var id = localStorage.getItem("selectuniversity");
    axios
    .get(baseurl + "/getstudent_wishlist/" + id)
    .then((response) => {
      console.log(response.data);
      var itemrank;
      var itemrankdata =response.data.user_info.findIndex(function (element) { 
        if(element.university_id==localStorage.getItem("selectuniversity")){
          itemrank=element.rank
      
        }
        return element.university_id == localStorage.getItem("selectuniversity"); 
      });
      console.log("itemrank",itemrank)
      //this.setState({data: [...json]});
      this.setState({
        countlike: response.data.gettotalcount,
        rank:itemrank
      });
    })
    //alert(id);
    axios.get(baseurl + "/getuniversityabout/" + id).then((response) => {
      // if (response.data.length > "0") {
      //console.log(response.data.agentdetails.company_name);
      this.setState({
        agentdetails: response.data[0],
      });
      // }
    });
    var agent_id = localStorage.getItem("selectuniversity");
    axios
      .get(baseurl + "/get_reviews_byuniversityid/" + agent_id)
      .then((response) => {
        this.setState({
          items: response.data,
        });
      });
  }

  componentDidMount() {}

  handleLayoutChange(e) {
    this.setState({
      selectedOption: e.target.value,
    });
  }
  handleChangeone(e) {
    this.setState({
      review: e.target.value,
    });
  }

  handleSubmit(e) {
    var student_id = localStorage.getItem("studentid");
    var agent_id = localStorage.getItem("selectuniversity");

    e.preventDefault();
    const products = {
      university_id: agent_id,
      student_id: student_id,
      no_of_ratings: this.state.selectedOption,
      review_message: this.state.review,
    };

    let uri = baseurl + "/store_university_student_reviews";
    const post = axios.post(uri, products).then((response) => {
      this.props.history.push("/universityabout");
      toast.success("Saved successfully!..");
    });
  }

  render() {
    console.log(this.state.agentdetails.company_name);
    const imgpath = `${config.baseurl}`;
    let overall_star = 0;

    this.state.items.map((item) => {
      overall_star = overall_star + item.no_of_ratings;
    });
    const overall_review = overall_star / this.state.items.length;
    return (
      <div className="animated fadeIn gray-bg-300 foe-viewus">
        <form className="was-validated" onSubmit={this.handleSubmit}>
          <div className="container-fluid px-0">
            <div className="top-section">
              <div className="container mb-5">
                <div className="col-md-8 leave-review mx-auto">
                  <a
                    className="col-6 backarrow mt-5 pl-md-5 pt-3"
                    href="/#/universityabout"
                  >
                    <span className="pr-1">
                      <img src={backarrow} alt="" />
                    </span>
                    Back
                  </a>
                  <div className="content-block mt-3 partner-info row mx-0 col-md-9">
                    <div className="col-md-4 my-4">
                      <img
                        src={imgpath + this.state.agentdetails.filename}
                        alt=""
                      />{" "}
                    </div>
                    <div className="col-md-8 cont-rgt my-4">
                      <h5 className="cont-rgt-head">
                        {this.state.agentdetails.institute_name}
                      </h5>
                      <div className="mt-2 cont-rgt-contry">
                        <span className="pr-1">
                          <h4></h4>
                        </span>

                        <span className="pr-1">
                          <img src={contlogo} alt="" />
                        </span>
                      </div>
                      <div className="mt-2 cont-rgt-grap">
                        <span className="pr-1">
                          <img src={bargraph} alt="" />
                        </span>
                        The World Rankings : {this.state.rank}
                      </div>
                      <div className="mt-2 row px-3 mx-0">
                        <div className="icon-align row">
                          <div className="pr-1">
                            <img src={eyeicon} alt="" />
                          </div>
                          <div>
                            0<br />
                            Views
                          </div>
                        </div>
                        <div className="icon-align row">
                          <div className="pr-1">
                            <img src={favourites} alt="" />
                          </div>
                          <div>
                            {this.state.countlike}<br />
                            Favourites
                          </div>
                        </div>
                        <div className="icon-align">
                          <div>
                            {overall_review.toFixed() == 5 ? (
                              <img src={ratingfive} alt="" />
                            ) : overall_review.toFixed() == 4 ? (
                              <img src={rating} alt="" />
                            ) : overall_review.toFixed() == 3 ? (
                              <img src={ratingthree} alt="" />
                            ) : overall_review.toFixed() == 2 ? (
                              <img src={ratingtwo} alt="" />
                            ) : (
                              <img src={ratingone} alt="" />
                            )}
                          </div>
                          <div>Reviews ({this.state.items.length})</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="review-subactor" />
                  <div className="col-md-12 pb-5">
                    <div className="col-md-10 row">
                      <div className="col-md-2 px-0">
                        <label className="card-label">Your review</label>
                      </div>

                      <div className="col-md-6">
                        <div onChange={this.handleLayoutChange}>
                          <div className="col-12 mb-1">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="radio"
                                name="star"
                                required
                                value="5"
                                class="custom-control-input"
                                name="example1"
                              />
                              <label
                                class="custom-control-label"
                                for="customCheck"
                              >
                                <img src={ratingfive} alt="" />{" "}
                              </label>{" "}
                              5 Excellent
                            </div>
                          </div>
                          <div className="col-12 mb-1">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="radio"
                                name="star"
                                checked={this.state.selectedOption === "4"}
                                class="custom-control-input"
                                value="4"
                                name="example1"
                              />
                              <label
                                class="custom-control-label"
                                for="customCheck"
                              >
                                <img src={rating} alt="" />{" "}
                              </label>{" "}
                              4 Very good
                            </div>
                          </div>
                          <div className="col-12 mb-1">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="radio"
                                name="star"
                                onChange={this.handleChange}
                                checked={this.state.selectedOption === "3"}
                                class="custom-control-input"
                                value="3"
                                name="example1"
                              />
                              <label
                                class="custom-control-label"
                                for="customCheck"
                              >
                                <img src={ratingthree} alt="" />{" "}
                              </label>{" "}
                              3 Average
                            </div>
                          </div>
                          <div className="col-12 mb-1">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="radio"
                                name="star"
                                onChange={this.handleChange}
                                checked={this.state.selectedOption === "2"}
                                class="custom-control-input"
                                value="2"
                                name="example1"
                              />
                              <label
                                class="custom-control-label"
                                for="customCheck"
                              >
                                <img src={ratingtwo} alt="" />{" "}
                              </label>{" "}
                              2 Poor
                            </div>
                          </div>
                          <div className="col-12 mb-1">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="radio"
                                onChange={this.handleChange}
                                name="star"
                                checked={this.state.selectedOption === "1"}
                                class="custom-control-input"
                                value="1"
                                name="example1"
                              />
                              <label
                                class="custom-control-label"
                                for="customCheck"
                              >
                                <img src={ratingone} alt="" />{" "}
                              </label>{" "}
                              1 Terrible
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 pb-4">
                    <div className="">
                      <div className="">
                        <label className="card-label">Your review</label>
                        <textarea
                          id="review"
                          name="review"
                          onChange={this.handleChangeone}
                          className="form-control w-100 checksame"
                          id=""
                          placeholder="Write a review..."
                          name=""
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <hr className="review-subactor" />
                  <div className="text-center pb-4">
                    <button type="submit" class="btn btn-outline-secondary">
                      Send
                    </button>
                    <a href="/#/universityabout" className="mt-4 d-block">
                      Delete Review
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LeaveReviewUniversity;
