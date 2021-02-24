import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import axios from "axios";

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/formee-logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg';
import Searchicon from '../../assets/img/search-icon.svg';
import config from "../../config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Noteicon from '../../assets/img/student/noti-high-icon.svg';
import Mailicon from '../../assets/img/student/mail-icon.svg';
import Favricon from '../../assets/img/student/favr-icon.svg';
import Flagicon from '../../assets/img/student/flag-icon.svg';
import Uficon from '../../assets/img/student/user-fill-icon.svg';

import Settingsicon from "../../assets/img/settings-icon.svg";
import { countries } from "../../countryCodes";
import Flag from "react-world-flags";

var baseurl = `${config.baseurl}`;
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const style = {
  left: '-10',
};



class DefaultHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      large: false,
      notifyco: '',
      mailco: '',
      fname: "",
      lname: "",
      countryCode: "",
      country: "",


    };
  }


  
  findCountryCode = (countryName) => {
    let code = "";
    countries.forEach((obj) => {
      if (obj.name === countryName) {
        code = obj.code.toLowerCase();
        this.setState({ countryCode: code });
      }
    });
    return code;
  };
  handleChange = event => {
    //alert();
    localStorage.clear();
    sessionStorage.clear();
    window.location = "/#/login";
  }

  componentDidMount() {
    setInterval(() => {
      this.getnotificationdata();
      this.getmaildata();
    }, 10000);
if(localStorage.getItem("studentid")!==null){
    axios
    .get(baseurl + "/get_generalinfo/" + localStorage.getItem("studentid"))
    .then((response) => {
      console.log("name",response);
      this.setState({
        fname: response.data[0].first_name,
        lname: response.data[0].last_name,
        country: response.data[0].country_name,

        
      });    
      this.findCountryCode(response.data[0].country_name);

    });}
  }

  getnotificationdata = () => {
    // get_savedSearch
    const getnotifyvalue = localStorage.getItem('notifyvalue');
    axios
      .get(baseurl + "/get_studentNotification/" + localStorage.getItem("studentid"))
      .then((response) => {
        // console.log("get_studentNotification", response.data);
        this.setState({
          notifyco: response.data.count,
        });
        for (let i = 0; i < response.data.result.length; i++) {
          if (response.data.result[i].is_viewed == '0' && getnotifyvalue < response.data.count) {
            localStorage.removeItem('notifyvalue');
            toast.success(response.data.result[i].notification_message);
            setTimeout(function () { }, 3000);
            localStorage.setItem('notifyvalue', response.data.count );
          }
        }
      });
    // this.getnotificationdata();
  };

  getmaildata = () => {
    const getmailvalue = localStorage.getItem('mailvalue');
    axios
      .get(baseurl + "/get_inboxmail_notification/" + localStorage.getItem("studentid") + "/Student")
      .then((response) => {
        console.log("get_mail", response.data);
        this.setState({
          mailco: response.data.count,
        });
      
        // for (let i = 0; i < response.data.result.length; i++) {
        //   if (response.data.result[i].is_viewed == '0' && getmailvalue < response.data.count) {
        //     localStorage.removeItem('mailvalue');
        //     toast.success(response.data.result[i].notification_message);
        //     setTimeout(function () { }, 3000);
        //     localStorage.setItem('mailvalue', response.data.count );
        //   }

        // }
      });
    // this.getnotificationdata();
  };

  removecount = () => {
    axios.get(baseurl + "/update_notification/" + localStorage.getItem("studentid")).then((response) => {
    });
  }

  removemailcount = () => {
    axios.get(baseurl + "/update_inboxmail_notification/" + localStorage.getItem("studentid")+"/Student").then((response) => {
    });
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <Container className="foe-py-2">
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppNavbarBrand
            full={{ src: logo, width: 249, height: "auto", alt: 'Formee Logo' }}
            minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
          />
          <AppSidebarToggler className="d-md-down-none d-none" display="lg" />

          <Nav className="d-md-down-none d-none" navbar>
            <NavItem className="px-3">
              <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
            </NavItem>
            <NavItem className="px-3">
              <Link to="/users" className="nav-link">Users</Link>
            </NavItem>
            <NavItem className="px-3">
              <NavLink to="#" className="nav-link">Settings</NavLink>
            </NavItem>
          </Nav>
          <Nav className="ml-auto foe-nav-right" navbar>
            {/* <NavItem className="d-md-down-none">
              <NavLink to="/aboutus" className="nav-link active-link"><img src={Searchicon} alt="home-icon" className="uni-icon" /></NavLink>
            </NavItem> */}
            <NavItem className="d-md-down-none">
              <NavLink to="/Librarygeneral" className="nav-link">Library</NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink to="/institutelist" className="nav-link">INSTITUTES</NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink to="/preferedpartnerlist" className="nav-link">Preferred Partners</NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink to="/draftapplication" className="nav-link">applications</NavLink>
            </NavItem>
            <NavItem className="d-md-down-none">
              <NavLink to="" className="nav-link" onClick={this.handleChange}>Logout</NavLink>
            </NavItem>
            <NavItem className="d-md-down-none nav-right-box mr-0">
              <NavLink to="/profilenotification" className="nav-link col-4" onClick={() => this.removecount()}>
                <h6><span className="badge notify rounded-pill bg-danger" style={style}>{this.state.notifyco}</span></h6><img src={Noteicon} alt="home-icon" className="uni-icon" /></NavLink>
              <NavLink to="/profilewishlist" className="nav-link col-4"><img src={Favricon} alt="home-icon" className="uni-icon" /></NavLink>
              <NavLink to="/inboxmail" className="nav-link col-4">
    <h6><span className="badge notifymail rounded-pill bg-danger" style={{left:'52%!important'}} onClick={() => this.removemailcount()}>{this.state.mailco}</span></h6>
                <img src={Mailicon} alt="home-icon" className="uni-icon" /></NavLink>
              {/* <span style={{ cursor: 'pointer' }} className="nav-link" onClick={this.handleChange}><img src={Flagicon} alt="home-icon" className="uni-icon" /></span> */}
              
              <UncontrolledDropdown nav direction="down" className="mr-0">
              {/* <DropdownToggle nav className="px-2">
                <img
                  src={Settingsicon}
                  alt="Notification-icon"
                  className="uni-icon"
                />
              </DropdownToggle> */}
              <DropdownMenu right>
                <DropdownItem header tag="div" className="text-center">
                  <strong>Account</strong>
                </DropdownItem>
                {/* <DropdownItem onClick={this.toggleLarge}>
                  <i className="fa fa-key"></i> Reset password
                </DropdownItem> */}
                {/* <DropdownItem onClick={this.handleChange}>
                  <i className="fa fa-sign-out"></i> Log out
                </DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
            </NavItem>
            <NavLink to="/studentprofile" className="nav-link text-center prof-header-flag"> <Flag
                                className="rounded flg-img mx-1 mb-1  mt-2"
                                code={this.state.countryCode}
                                height="23"
                                fallback={<span>Unknown</span>}
                              />
                              <span className="head-country">{this.state.country}</span><br/></NavLink>

            {/* <NavLink to="/studentprofile" className="nav-link text-center prof-header"><img src={Flagicon} alt="home-icon" width="23" className="uni-icon mt-3 mx-3" /><br/><span className="head-country" > Australia </span></NavLink> */}
            <NavLink to="/studentprofile" className="nav-link text-center prof-header"><img src={Uficon} width="25" alt="home-icon" className="uni-icon mt-3" /><br/><span className="head-account" > {this.state.fname} {this.state.lname} </span></NavLink>
            

            {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          </Nav>
          <AppAsideToggler className="d-md-down-none d-none" />
          {/*<AppAsideToggler className="d-lg-none" mobile />*/}
          <ToastContainer />
        </Container>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
