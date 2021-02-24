import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Link  , Redirect } from 'react-router-dom';
import config from '../../config.json';
import deakinlogo from '../../assets/img/university/deakin_logo.jpg';
import deleteicon from '../../assets/img/university/delete.svg';
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
import Flagicon from '../../assets/img/student/flag-my-icon.svg';
import $ from 'jquery';
import axios from 'axios';
import Pricon from '../../assets/img/student/folder-icon.svg';
import Mailcon from '../../assets/img/student/folder-icon-mail.svg';
import Bluefolder from '../../assets/img/student/blue-folder.svg';
import Redfolder from '../../assets/img/student/red-folder.svg';
import Grayfolder from '../../assets/img/student/gray-folder.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var baseurl = `${config.baseurl}`;

class Generalresources extends Component {
  constructor(props) {
    super(props);
    
	
    this.state = {
      large: false,
	  sentapplicationlist:[],
	  
    };
	

	 
  }

  
	  
	   componentDidMount() {
      axios.get(baseurl+'/sentapplicationlist/'+localStorage.getItem('studentid')).then(response => {
         this.setState({
                   sentapplicationlist: response.data,
               });
        })
		 
  }
  
 


  render() {
	   const imgpath = `${config.baseurl}`;
    return (
      <div className="foe-studen-container pt-5 send-app-2 send-app-page pb-5">
	  
	  
        <div className="foe-student-box">
          <Container>
		  <ToastContainer/>
            <Row>
            <Col xs="12" sm="2" xl="2" md="2" lg="2" className="pr-0">
              <Card className="uni-left-card uni-right-border">
                <CardBody className="pr-0">
                <ListGroup className="left-list float-right">
                    <a href="/#/draftapplication"><ListGroupItem>Draft Application</ListGroupItem></a>
                    <a href="/#/sendapplication"><ListGroupItem className="active">Sent Application</ListGroupItem></a>
                    <ListGroupItem>Current Application</ListGroupItem>
                </ListGroup>
                </CardBody>
              </Card>
            </Col>
			<Col xs="12" sm="10" xl="10" md="10" lg="10" className="px-0">
              <Card className="uni-left-card uni-right-border">
                <CardBody className="pr-0">
				<Row>
				<div className="col-md-6 px-5">
				<h3>General Resources</h3>
				</div>
				<div className="col-md-6 d-flex justify-content-end">
				<select class="form-control w-50 checksame" value="" id="" name="" required="">
				<option value="">Recently</option>
				</select>
				</div>
				</Row>
				
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

export default Generalresources;
