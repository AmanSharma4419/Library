import React, { Component } from 'react';
import config from "../../../config.json";
import axios from "axios";
import moment from "moment";
import { Link  , Redirect } from 'react-router-dom';
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var baseurl = `${config.baseurl}`;

class MailList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            large: false,
           
        };
    }

    componentDidMount() {

    }

    render() {
        const imgpath = `${config.baseurl}`;
        return (
            <div className="foe-studen-container pt-5 send-app-2 send-app-page pb-5">


                <div className="foe-student-box">
                    <Container>
                        <ToastContainer />
                        <Row>
                            <Col xs="12" sm="2" xl="2" md="2" lg="2" className="pr-0">
                                <Card className="uni-left-card uni-right-border">
                                    <CardBody className="pr-0">
                                        <ListGroup className="left-list float-right">
                                            <a href="/#/" ><ListGroupItem className="active">Draft Application</ListGroupItem></a>
                                            <a href="/#/"><ListGroupItem >Sent Application</ListGroupItem></a>
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
                                                <h3>Inbox</h3>
                                            </div>
                                            <div className="col-md-6 d-flex justify-content-end">
                                                <select class="form-control w-50 checksame" value="" id="" name="" required="">
                                                    <option value="">Recently</option>
                                                </select>
                                            </div>
                                        </Row>
                                        <div className="card-body table-responsive">
                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }

}

export default MailList;