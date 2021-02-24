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
} from "reactstrap";
import $ from "jquery";
 
import SecondaryHeaderProgram from './../SecondaryHeaderProgram/index';

import Category from './../category/Category';

import Department from './../departments/Departments';
import Courses from './../courses/Courses';
import Faculties from './../Faculties/Faculties';
import SecondaryHeader from './../SecondaryHeader/SecondaryHeader';
import Leftmenu from '../../assets/img/left-menu.jpg';
import Leftoverview from './../Leftoverview/index';


class Program extends Component {
  constructor(props) {
    super(props);
	this.state = { tabstatus :''};
	this.state = { preview :''};
	this.state = { data :''};
  }
  

componentDidMount () {
  const { data } = this.props.location
	 
	 if(data)
	 {  
			if(data =='category')
			 { 
			 this.setState({category: 'nav-link category active'});
			 this.setState({faculty: 'nav-link faculty'});
			 this.setState({department: 'nav-link department'});
			 this.setState({course: 'nav-link course'});
			 }
			 if(data =='faculty')
			 { 
			this.setState({category: 'nav-link category'});
			 this.setState({faculty: 'nav-link faculty active'});
			 this.setState({department: 'nav-link department'});
			 this.setState({course: 'nav-link  course'});
			 }
			 if(data =='department')
			 { 
			 this.setState({category: 'nav-link category'});
			 this.setState({faculty: 'nav-link faculty'});
			 this.setState({department: 'nav-link department active'});
			 this.setState({course: 'nav-link course'});
			 $('.department').trigger('click');
			 }
			 if(data =='course')
			 { 
			 this.setState({category: 'nav-link category'});
			 this.setState({faculty: 'nav-link faculty'});
			 this.setState({department: 'nav-link department'});
			 this.setState({course: 'nav-link course active'});
			 } 
	 }
	 else
		 {
			 this.setState({category: 'nav-link category active'});
			 this.setState({faculty: 'nav-link faculty'});
			 this.setState({department: 'nav-link department'});
			 this.setState({course: 'nav-link course'});
		 } 
}
  render() {
	  
	 
	 
    return (
      <div className="animated fadeIn gray-bg-300">
        <header className="app-header secondary-app-header">
         <div className="university-secondary-header">
          <SecondaryHeaderProgram></SecondaryHeaderProgram> 
        </div>
        </header>
        <div className="gray-400">
        <Container>
          <Row>
          <Col xs="12" sm="4" xl="4" md="4" lg="4" className="uni-no-padd">
              <Card className="uni-left-card">
                <CardBody>
                  <Row className="uni-no-mar"><Leftoverview></Leftoverview></Row>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="8" xl="8" md="8" lg="8" className="uni-no-padd">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
				
                  <a className={this.state.category} data-toggle="tab" href="#category" role="tab">
				  
				  Categories
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={this.state.faculty}
                    data-toggle="tab"
                    href="#faculty"
                    role="tab"
                  >
                    faculties
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={this.state.department}
                    data-toggle="tab"
                    href="#department"
                    role="tab"
                  >
                    Departments
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={this.state.course}
                    data-toggle="tab"
                    href="#settings"
                    role="tab"
                  >
                    Courses
                  </a>
                </li>
               
                
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="category" role="tabpanel">
<Category></Category>
                </div>
                <div className="tab-pane" id="faculty" role="tabpanel">
            <Faculties></Faculties>
                </div>
                <div className="tab-pane" id="department" role="tabpanel">
                  <Department></Department>
                </div>
                <div className="tab-pane" id="settings" role="tabpanel">
                  <Courses></Courses>
                </div>
                <div className="tab-pane" id="contact" role="tabpanel">
                  ..5.
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

export default Program;
