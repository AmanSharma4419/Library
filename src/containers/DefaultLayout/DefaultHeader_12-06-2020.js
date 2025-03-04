import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Container } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/university-logo.svg';
import Homeicon from '../../assets/img/home-icon.svg';
import Searchicon from '../../assets/img/search-icon.svg';
import Notificationicon from '../../assets/img/noti-icon.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
// import SecondaryHeader from './../../views/SecondaryHeader/SecondaryHeader';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
         <Container className="foe-py-2">
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: "100%", height: "auto", alt: 'University Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'University Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none d-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
        <NavItem className="px-4">
            <NavLink to="/dashboard" className="nav-link" ><img src={Searchicon} alt="home-icon"  className="uni-icon" /></NavLink>
          </NavItem>
          <NavItem className="px-4">
            <NavLink to="/dashboard" className="nav-link" ><img src={Homeicon} alt="home-icon"  className="uni-icon" /></NavLink>
          </NavItem>
          <NavItem className="px-4">
            <NavLink to="/dashboard" className="nav-link" >Applications<Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="px-4">
            <Link to="/users" className="nav-link">Programs</Link>
          </NavItem>
          <NavItem className="px-4">
            <NavLink to="#" className="nav-link">Payments</NavLink>
          </NavItem>
          <NavItem className="px-4">
            <NavLink to="#" className="nav-link">Inbox<Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="px-4">
            <NavLink to="#" className="nav-link">ACCOUNT</NavLink>
          </NavItem>
          <NavItem className="px-4">
            <NavLink to="#" className="nav-link">Log out</NavLink>
          </NavItem>
          <NavItem className="px-4">
            <NavLink to="#" className="nav-link"><img src={Notificationicon} alt="Notification-icon"  className="uni-icon" /></NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
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
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
        </Container>
        {/* <div className="university-secondary-header">
          <SecondaryHeader></SecondaryHeader>   
        </div> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
