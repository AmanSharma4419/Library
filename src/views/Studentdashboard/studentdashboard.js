import React, { Component, lazy, Suspense } from "react";
import "./studentdashboard.css";
import { Bar, Line } from "react-chartjs-2";
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  Modal,
  ModalBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  ModalFooter,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  ListGroup,
  ListGroupItem,
  Media,
  Container,
  Table,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import config from "../../config.json";

import 'react-day-picker/lib/style.css';
import axios from "axios";
import { getStyle, hexToRgba } from "@coreui/coreui/dist/js/coreui-utilities";

var baseurl = `${config.baseurl}/`;

const Widget03 = lazy(() => import("../../views/Widgets/Widget03"));
class studentdashboard extends Component {
  render() {
    return (
      <div className="student-main-dashboard-wrapper">
        <Container>
          <Row>
            <Col xs="12" sm="12" xl="3" md="12" lg="3">
              <Card className="uni-left-card">
                <CardBody>
                  <ListGroup className="left-list">

                    <ListGroupItem> <Link to="/Academicbeginner">IELTS ACADEMIC Beginner</Link></ListGroupItem>
                    <ListGroupItem>  <Link to="/Academicbeginner">IELTS ACADEMIC Intermediate</Link></ListGroupItem>
                    <ListGroupItem>  <Link to="/Academicbeginner">IELTS ACADEMIC Advanced</Link></ListGroupItem>
                    <ListGroupItem> <Link to="/Academicbeginner">ELTS GENERAL </Link></ListGroupItem>
                    <ListGroupItem>  <Link to="/Academicbeginner"> IELTS ACADEMIC Beginner  </Link></ListGroupItem>
                    <ListGroupItem><Link to="/Academicbeginner">IELTS ACADEMIC Intermediate  </Link></ListGroupItem>
                    <ListGroupItem><Link to="/Academicbeginner">IELTS ACADEMIC Advanced </Link></ListGroupItem>

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
              className="uni-right-card"
            >
              <Row className="mx-0">

              </Row>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export default studentdashboard;
