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
import eyeicon from "../../assets/img/university/view_simple.svg";
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
import Pricon from '../../assets/img/student/personal-icon.svg';
import Flagicon from '../../assets/img/university/australia_circle_flag.svg';
import formeelogo from "../../assets/img/brand/formee-logo.svg";
import $ from 'jquery';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
var agentid = '';
class Profilewishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      large: false,
      sortType: 'all',
      sentapplicationlist: [],
      getstorewishlistdata: [],
      getstorewishlistdata1: [],
      about: [],
      filterdata: [],
      filtervalue: '',
      favcount: '',
      formData: new FormData(),
    };
  }

  componentDidMount() {
    this.getstorewishlist();
  }

  getstorewishlist = () => {
    const arraydata = [];
    axios.get(baseurl + '/getWishlist/' + localStorage.getItem('studentid')).then(response => {
      console.log('get response', response);
      // for (let i = 0; i < response.data.result.length; i++) {
      //   arraydata.push(response.data.result[i]);
      // }
      this.setState({ getstorewishlistdata: response.data.result });
    });

    

    axios.get(baseurl + '/get_favAgent/' + localStorage.getItem('studentid')).then(response => {
      console.log('get response', response);
      // for (let i = 0; i < response.data.length; i++) {
      //   arraydata.push(response.data[i]);
      // }
      // this.setState({ getstorewishlistdata: response.data });
      // this.onChangeFilterValue('all', response.data);
      // console.log('list data', arraydata);
    
      this.setState({ getstorewishlistdata1: response.data });
      if ( response.data.length) {
        axios
          .get(baseurl + "/get_agentdetails/" +  response.data[0].agent_id)
          .then((response) => {
            console.log(response.data);
            //alert(response.data.about[0].id);
            this.setState({
              favcount: response.data.fav_count
            });
          })
      }

    });


  }

  removestorewishlist = (e) => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure ?. You need to Remove Favourite',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            axios.get(baseurl + '/deleteWishlist/' + e).then(response => {
              toast.success("Favourite Removed Successfully"); setTimeout(function () {
              }, 3000);
              this.getstorewishlist();
            })
        },
        {
          label: 'No',
          onClick: () => this.getstorewishlist()
        }
      ]
    })
  }

  viewthedetails = (e) => {
    if (e) {
      localStorage.setItem('selectuniversity', e);
      window.location = "/#/universityabout";
    }
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

  onChangeFilterValue = data => {
    this.setState({ sortType: data });
  }


  render() {
    const imgpath = `${config.baseurl}`;
    // console.log('passed data', this.state.getstorewishlistdata);

    const recdata = [];

    const data2 = this.state.getstorewishlistdata ? this.state.getstorewishlistdata.map(j => (
      recdata.push(j)
    )) : '';

    // console.log('data', this.state.pendingtutionfee);
    const data6 = this.state.getstorewishlistdata1 ? this.state.getstorewishlistdata1.map(s => (
      recdata.push(s)
    )) : '';

   
    const sorted = recdata.sort((a, b) => {
      if (this.state.sortType == "all") {
        const isReversed = "asc" === "asc" ? 1 : -1;
        return isReversed * a.created_date.localeCompare(b.created_date);
      } else {  
        const isReversed = this.state.sortType === "asc" ? 1 : -1;
        return isReversed * a.commonname.localeCompare(b.commonname);
      }
   
    });

    return (
      <div className="foe-studen-container pt-5 send-app-2 send-app-page pb-5 profile-wishlist">
        <div className="foe-student-box draft-app-page">
          <Container>
            <ToastContainer />
            <Row>
              <Col xs="12" sm="12" xl="2" md="2" lg="2" className="pr-0 prof-wish-menu">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0">
                    <ListGroup className="left-list float-right line-height">
                      <a href="/#/profilewishlist"><ListGroupItem className="active">Recently viewed</ListGroupItem></a>
                      <a href="/#/profilewishlistinstitute"><ListGroupItem>Institutes</ListGroupItem></a>
                      <a href="/#/profilewishlistReferralPartners"><ListGroupItem>Preferred Partner</ListGroupItem></a>
                    </ListGroup>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" sm="12" xl="10" md="10" lg="10" className="px-0">
                <Card className="uni-left-card uni-right-border">
                  <CardBody className="pr-0">
                    <Row>
                      <div className="col-md-8 ">
                        <h3 className="d-block pr-4 favrite-header">Favourite</h3><span className="noti-p">(You have {recdata ? recdata.length : '0'} save)</span>
                      </div>
                      <div className="col-md-4 d-flex justify-content-end">
                        <select className="form-control w-50 checksame" value={this.state.sortType} onChange={(e) => this.onChangeFilterValue(e.target.value)}>
                          <option value="all" onChange={() => this.onChangeFilterValue('all')}>Recently</option>
                          <option value="asc" onChange={() => this.onChangeFilterValue('asc')}>A-Z </option>
                          <option value="desc" onChange={() => this.onChangeFilterValue('desc')}>Z-A </option>
                        </select>
                      </div>
                    </Row>

                    <div className="wishlist-row">
                      {sorted.map(data =>
                        <div className="row wishlist-inner">
                          <div className="col-12 col-md-8 col-sm-8 wishlist-left">
                            <div className="col-12 row m-0">
                              <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 px-0 d-flex align-items-center">
                                {data.university_id ? (data.logo_image ? <img src={imgpath + data.logo_image} alt="" 
                                className="wishlist-logo" /> :  <img src={
                                  formeelogo
                                } alt="" className="wishlist-logo" />) : null}
                                {data.agent_id ? (data.company_logo ? <img src={
                                  imgpath + "/Agent/" + data.company_logo
                                } alt="" className="wishlist-logo" /> : <img src={
                                  formeelogo
                                } alt="" className="wishlist-logo" /> ): null}
                              </div>
                              <div className="col-12 col-lg-9 mt-3 acc-down">
                                <div className="wishlist-name text-center text-lg-left">
                                  <h2>{data.institute_name ? data.institute_name : (data.company_name ? data.company_name : '')}</h2>
                                </div>
                                <div className="wishlist-coun">
                                  <div className="media px-0 col-4 col-sm-6 col-lg-12 mx-auto">
                                    <img className="mr-3" src={Flagicon} alt="" />
                                    <div className="media-body">
                                      <h5 className="mt-0">{data.country_name}</h5>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 ">
                              <div className="row">
                                {data.course_name ? <div className="col-12 py-2">
                                  <div className="wishlist-univer-name">
                                    <h3>
                                      {data.course_name}
                                      {/* Bachelor of Arts - Business Administration - Management - Human Resource Management */}
                                    </h3>
                                  </div>
                                </div> : null}
                              </div>
                              {data.university_id ?
                                <div className="row">
                                  <div className="col-6 col-lg-3">
                                    <p className="wishlist-category">Study Type</p>
                                    <p className="wishlist-material">{data.study_type}</p>
                                  </div>
                                  <div className="col-6 col-lg-3">
                                    <p className="wishlist-category">TUITION FEE</p>
                                    <p className="wishlist-material">${data.tution_fee}</p>
                                  </div>
                                  <div className="col-6 col-lg-3">
                                    <p className="wishlist-category">APPLICATION FEE</p>
                                    <p className="wishlist-material">{data.application_fee}</p>
                                  </div>
                                  <div className="col-6 col-lg-3">
                                    <p className="wishlist-category">Campus</p>
                                    <p className="wishlist-material">-</p>
                                  </div>
                                </div>
                                :
                                null
                              }
                              {data.agent_id ?
                                <div className="row">
                                  <div className="col-12 col-lg-3 text-center text-lg-left">
                                    <p className="wishlist-category"> <img className="mr-1" src={eyeicon} alt="fav" /> 0</p>
                                    <p className="wishlist-material">VIEWS</p>
                                  </div>

                                  <div className="col-12 col-lg-3 text-center text-lg-left">
                                    <p className="wishlist-category"> <img className="mr-1" src={Hearticon} alt="fav" />{this.state.favcount}</p>
                                    <p className="wishlist-material">FAVOURITES</p>
                                  </div>


                                  <div className="col-12 col-lg-3">
                                    <p className="wishlist-category text-center"><img className="mr-0" src={Rateicon} alt="rate" /></p>
                                    <p className="wishlist-material text-center">REVIEWS (0)</p>
                                  </div>
                                </div>
                                : null}



                            </div>
                          </div>
                          <div className="col-12 col-md-4 col-sm-4 wishlist-right">
                            {data.university_id ?
                              <div className="wishlist-btn-group">
                                <button className="btn wishlist-btn" onClick={() => this.viewthedetails(data.university_id)}>See more info</button>
                                <a onClick={() => this.removestorewishlist(data.id)}>
                                  <img
                                    className="mr-3"
                                    src={deleteicon}
                                    alt="delete"
                                    className="uni-icon" width="16"
                                  />
                                </a>
                              </div> : null}
                            {data.agent_id ?
                              <div className="wishlist-btn-group">
                                <button className="btn wishlist-btn" onClick={() => this.viewagent(data.agent_id)}>See more info</button>
                                <a onClick={() => this.deleteagent(data.agent_id)}>
                                  <img
                                    className="mr-3"
                                    src={deleteicon}
                                    alt="delete"
                                    className="uni-icon" width="16"
                                  />
                                </a>
                              </div>
                              : null}
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

export default Profilewishlist;
