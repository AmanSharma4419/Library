import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link, Redirect } from 'react-router-dom';
import config from '../../config.json';
import deakinlogo from '../../assets/img/university/deakin_logo.jpg';
import RMT from '../../assets/img/rmt-university.png';
import deleteicon from '../../assets/img/university/delete.svg';
import Downicon from '../../assets/img/download-icon.svg';
import Hearticon from '../../assets/img/heart-icon.svg';
import Rateicon from '../../assets/img/rating-yellow.svg';
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
  ListGroup, ListGroupItem, Media
} from 'reactstrap';
import moment from 'moment';
import Pricon from '../../assets/img/student/personal-icon.svg';
import Flagicon from '../../assets/img/university/australia_circle_flag.svg';
import $ from 'jquery';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eyeicon from "../../assets/img/university/view_simple.svg";
import formeelogo from "../../assets/img/brand/formee-logo.svg";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
var baseurl = `${config.baseurl}`;


function submitStore(contentType, data, setResponse, path) {

  axios({
    url: baseurl + `/fav_agent`,
    method: 'POST',
    data: data,
    headers: {
      'Content-Type': contentType
    }
  })
    .then((response) => {
      setResponse(response.data);
    }).catch((error) => {
      setResponse("error");
    })

}

class ProfilewishlistReferralPartners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
      sentapplicationlist: [],
      getstorewishlistdata: [],
      about: [],
      filterdata: [],
      filtervalue: 'all',
      favcount: '',
      agentdetails: [],
      agentabout: [],
      formData: new FormData(),
    };
  }

  componentDidMount() {
    this.getstorewishlist();
    axios
      .get(baseurl + "/get_agentdetails/" + localStorage.getItem("agentid"))
      .then((response) => {
        console.log(response.data);
        //alert(response.data.about[0].id);
        this.setState({
          agentdetails: response.data.agentdetails,
          agentabout: response.data.agentabout,
          favcount: response.data.fav_count
        });
      })
  }

  getstorewishlist = () => {
    axios.get(baseurl + '/get_favAgent/' + localStorage.getItem('studentid')).then(response => {
      console.log('get response', response);
      this.setState({ getstorewishlistdata: response.data });
      // this.onChangeFilterValue('all', response.data);
    });
  }

  onChangeFilterValue = e => {
    // const current = new Date();
    // const currentpastdate = current.getDate() - e;
    // const allfilter = e !== "all" ? dates.filter(items => moment(new Date(items.created_date)).format('yyyy-MM-DD, h:mm:ss a') >= moment(new Date()).format('yyyy-MM-DD, h:mm:ss a') && moment(new Date(items.created_date)).format('yyyy-MM-DD, h:mm:ss a') <= moment(new Date(currentpastdate)).format('yyyy-MM-DD, h:mm:ss a')) : dates;
    // // const allfilter = e !== "all" ? dates.filter(items => new Date(items.created_date) >= new Date() && new Date(items.created_date) <= new Date(currentpastdate)) : dates;
    // // dates.sort((a, b) => e !== "all" ? new Date(a.created_date) > new Date(current.setDate(currentpastdate)) : dates);
    // console.log('onChangeFilterValue', allfilter, moment(new Date(currentpastdate)).format('yyyy-MM-DD, h:mm:ss a'));
    // this.setState({ filterdata: allfilter, filtervalue: e });
    this.setState({filtervalue: e });
  }

  deleteagent = data => {
    this.state.formData.append("student_id", localStorage.getItem('studentid'));
    this.state.formData.append("agent_id", data);
    this.state.formData.append("command", "Unfavourite");
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure ?. You need to Remove Favourite',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            submitStore("form-data", this.state.formData, (msg) => {
              if (msg.status_code == 200) {
                toast.success(msg.message); setTimeout(function () {
                }, 3000);
                this.getstorewishlist();
              } else {
                toast.error(msg.message); setTimeout(function () {
                }, 3000);
              }

            }, 'student')
        },
        {
          label: 'No',
          onClick: () => this.getstorewishlist()
        }
      ]
    })
  }

  viewagent = e => {
    if (e) {
      localStorage.getItem("agentid")
      localStorage.setItem('agentid', e);
      window.location = "/#/preferedpartnerabout";
    }
  }


  render() {
    const imgpath = `${config.baseurl}`;

    const sorted = this.state.getstorewishlistdata.sort((a, b) => {
     
      if (this.state.filtervalue == "all") {
        const isReversed = "asc" === "asc" ? 1 : -1;
        return isReversed * a.created_date.localeCompare(b.created_date); 
      } else {
        const isReversed = this.state.filtervalue === "asc" ? 1 : -1;
        return isReversed * a.company_name.localeCompare(b.company_name);
      }
    });

    return (
      <div className="foe-studen-container pt-5 send-app-2 send-app-page pb-5 profile-wishlist">
        <div className="foe-student-box draft-app-page">
          <Container>
            <ToastContainer />
            <Row>
              <Col xs="12" sm="2" xl="2" md="2" lg="2" className="pr-0">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0">
                    <ListGroup className="left-list float-right">
                      <a href="/#/profilewishlist"><ListGroupItem >Recently viewed</ListGroupItem></a>
                      <a href="/#/profilewishlistinstitute"><ListGroupItem >Institutes</ListGroupItem></a>
                      <a href="/#/profilewishlistReferralPartners"><ListGroupItem className="active">Preferred Partner</ListGroupItem></a>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="10" xl="10" md="10" lg="10" className="px-0">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0">
                    <Row>
                      <div className="col-md-8 ">
                        <h3 className="d-block pr-4 favrite-header">Favourite</h3> <span className="noti-p">(You have {sorted.length ? sorted.length : '0'} save)</span>
                      </div>
                      <div className="col-md-4 d-flex justify-content-end">
                        <select className="form-control w-50 checksame" value={this.state.filtervalue} onChange={(e) => this.onChangeFilterValue(e.target.value)}>
                          <option value="all" onChange={() => this.onChangeFilterValue('all')}>Recently</option>
                          <option value="asc">A-Z </option>   
                          <option value="desc">Z-A </option>                       
                        </select>
                      </div>
                    </Row>


                    <div className="wishlist-row">
                      {sorted.map(data =>
                        <div className="row wishlist-inner">

                          <div className="col-12 col-md-8 col-sm-8 wishlist-left">
                            <div className="col-12 row">
                              <div className="col-3 d-flex align-items-center">
                               {data.company_logo? <img className="wishlist-logo"
                                  src={
                                    imgpath + "/Agent/" + data.company_logo
                                  }
                                  alt=""
                                /> : 
                                <img src={formeelogo} alt="" className="wishlist-logo" />
                                }
                                {/* <img src={imgpath + data.logo_image} alt="" className="wishlist-logo" /> */}
                              </div>
                              <div className="col-9 mt-3 acc-down">
                                <div className="wishlist-name">
                                  <h2>{data.company_name ? data.company_name : ''}</h2>
                                </div>
                                <div className="wishlist-coun">
                                  <div className="media">
                                    <img className="mr-3" src={Flagicon} alt="Generic placeholder image" />
                                    <div className="media-body">
                                          <h5 className="mt-0">{data.country_name}</h5>                                       
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 row">
                              {/* <div className="col-12 py-2">
                              <div className="wishlist-univer-name">
                                <h3>
                                  Bachelor of Arts - Business Administration - Management - Human Resource Management
                                   </h3>
                              </div>
                            </div> */}
                              <div className="col-3">
                                <p className="wishlist-category"> <img className="mr-1" src={eyeicon} alt="fav" /> 0</p>
                                <p className="wishlist-material">VIEWS</p>
                              </div>
                              <div className="col-3">
                          <p className="wishlist-category"> <img className="mr-1" src={Hearticon} alt="fav" />{this.state.favcount}</p>
                                <p className="wishlist-material">FAVOURITES</p>
                              </div>
                              <div className="col-3">
                                <p className="wishlist-category text-center"><img className="mr-0" src={Rateicon} alt="rate" /></p>
                                <p className="wishlist-material text-center">REVIEWS (0)</p>
                              </div>
                              {/* <div className="col-3">
                              <p className="wishlist-category text-center">$$$</p>
                              <p className="wishlist-material">Consultancy Fees</p>
                            </div> */}
                            </div>
                          </div>
                          <div className="col-12 col-md-4 col-sm-4 wishlist-right">
                            <div className="wishlist-btn-group">
                              <button className="btn wishlist-btn" onClick={()=> this.viewagent(data.agent_id)}>See more info</button>
                              <a onClick={()=> this.deleteagent(data.agent_id)}>
                                <img
                                  className="mr-3"
                                  src={deleteicon}
                                  alt="delete"
                                  className="uni-icon" width="16"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* 
                      <div className="row wishlist-inner">
                        <div className="col-12 col-md-8 col-sm-8 wishlist-left">
                          <div className="col-12 row">
                            <div className="col-3 d-flex align-items-center">
                              <img src={RMT} alt="" className="wishlist-logo" />
                            </div>
                            <div className="col-9 mt-3 acc-down">
                              <div className="wishlist-name">
                                <h2>RMIT University</h2>
                              </div>
                              <div className="wishlist-coun">
                                <div className="media">
                                  <img className="mr-3" src={Flagicon} alt="Generic placeholder image" />
                                  <div className="media-body">
                                    <h5 className="mt-0">Australia</h5>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 row">
                            <div className="col-12 py-2">
                              <div className="wishlist-univer-name">
                                <h3>
                                  Bachelor of Arts - Business Administration - Management - Human Resource Management
                                   </h3>
                              </div>
                            </div>
                            <div className="col-3">
                              <p className="wishlist-category">Study Type</p>
                              <p className="wishlist-material">Undergraduate</p>
                            </div>
                            <div className="col-3">
                              <p className="wishlist-category"> <img className="mr-1" src={Hearticon} alt="fav" /> TUITION FEE</p>
                              <p className="wishlist-material">$25,473.00 AUD</p>
                            </div>
                            <div className="col-3">
                              <p className="wishlist-category text-center"><img className="mr-0" src={Rateicon} alt="rate" /></p>
                              <p className="wishlist-material text-center">Free</p>
                            </div>
                            <div className="col-3">
                              <p className="wishlist-category text-center">$$$</p>
                              <p className="wishlist-material">Consultancy Fees</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 wishlist-right">
                          <div className="wishlist-btn-group">
                            <button className="btn wishlist-btn">See more info</button>
                            <a href="#">
                              <img
                                className="mr-3"
                                src={deleteicon}
                                alt="delete"
                                className="uni-icon" width="16"
                              />
                            </a>
                          </div>
                        </div>
                      </div>


                      <div className="row wishlist-inner"> 
                        <div className="col-12 col-md-8 col-sm-8 wishlist-left">
                          <div className="col-12 row">
                            <div className="col-3 d-flex align-items-center">
                              <img src={RMT} alt="" className="wishlist-logo" />
                            </div>
                            <div className="col-9 mt-3 acc-down">
                              <div className="wishlist-name">
                                <h2>RMIT University</h2>
                              </div>
                              <div className="wishlist-coun">
                                <div className="media">
                                  <img className="mr-3" src={Flagicon} alt="Generic placeholder image" />
                                  <div className="media-body">
                                    <h5 className="mt-0">Australia</h5>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 row">
                            <div className="col-12 py-2">
                              <div className="wishlist-univer-name">
                                <h3>
                                  Bachelor of Arts - Business Administration - Management - Human Resource Management
                                   </h3>
                              </div>
                            </div>
                            <div className="col-3">
                              <p className="wishlist-category">Study Type</p>
                              <p className="wishlist-material">Undergraduate</p>
                            </div>
                            <div className="col-3">
                              <p className="wishlist-category">TUITION FEE</p>
                              <p className="wishlist-material">$25,473.00 AUD</p>
                            </div>
                            <div className="col-3">
                              <p className="wishlist-category">APPLICATION FEE</p>
                              <p className="wishlist-material">Free</p>
                            </div>
                            <div className="col-3">
                              <p className="wishlist-category">Campus</p>
                              <p className="wishlist-material">Burwood - Melbourne</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-md-4 col-sm-4 wishlist-right">
                          <div className="wishlist-btn-group">
                            <button className="btn wishlist-btn">See more info</button>
                            <a href="#">
                              <img
                                className="mr-3"
                                src={deleteicon}
                                alt="delete"
                                className="uni-icon" width="16"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default ProfilewishlistReferralPartners;
