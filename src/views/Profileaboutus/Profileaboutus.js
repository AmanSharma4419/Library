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



class Profileaboutus extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
    };
  }

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  };

  handleTotalstudentsChange = (event) => {
    this.setState({ totalstudents: event.target.value });
  };

  handleEstimatedcostChange = (event) => {
    this.setState({ estimatedcost: event.target.value });
  };

  handleDropdownChange = (event) => {
    this.setState({ selecttype: event.target.value });
  };

  handleDropdownChange1 = (event) => {
    this.setState({ funding: event.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    //const errors = this.validate();
    //this.setState({ errors });
    //if (errors) return;

    const products = {
      location: this.state.location,
      totalstudents: this.state.totalstudents,
      funding: this.state.funding,
      selecttype: this.state.selecttype,
      estimatedcost: this.state.estimatedcost,
    };

    console.log(products);

    // const post = axios.post('http://172.18.1.62:8000/api/task/', products).then((response) => {
    // alert(response);
    // this.props.history.push('/clients/view');
    // toast.success("Updated successfully!..");
    // });

    // this.setState({ email: '' });
    // this.setState({ password: '' });
    // this.setState({ errors: '' });
  };

  render() {
    return (
      <div className="animated fadeIn gray-bg-300">
    
        <Container>
          <Row>
    
            <Col xs="12" sm="8" xl="8" md="8" lg="8" className="uni-no-padd">
            
                  <Card className="uni-right-card">
                    <CardHeader>
                      <strong>Description</strong>
                    </CardHeader>
                    <CardBody>
                      <FormGroup className="uni-para-content">
                        <strong>Lorem ipsum dolor si t amet , consectetur adipiscing el
                        i t . Al iquam consequat nibh interdum volutpat maur is
                        vi tae habi tant . Nisi fel is semper eget neque.</strong><br/><br/>
                        Dictumst lacinia diam, nunc, rhoncus cursus habi tasse
                        pret ium, tor tor quis. Lorem euismod nibh urna
                        nec.Lorem ipsum dolor si t amet , consectetur adipiscing
                        el i t . Al iquam consequat nibh interdum volutpat maur
                        is vi tae habi tant . Nisi fel is semper eget neque.
                        Dictumst lacinia diam, nunc, rhoncus cursus habi tasse
                        pret ium, tor tor quis. Lorem euismod nibh urna nec.<br/><br/>
                        Lorem euismod nibh urna nec.Lorem ipsum dolor si t amet
                        , consectetur adipiscing el i t . Al iquam consequat
                        nibh interdum volutpat maur is vi tae habi tant . Nisi
                        fel is semper eget neque. Dictumst lacinia diam, nunc,
                        rhoncus cursus habi tasse pret ium, tor tor quis. Lorem
                        euismod nibh urna nec. Nisi fel is semper eget neque.
                        Dictumst lacinia diam, nunc, rhoncus cursus habi tasse
                        pret ium, tor tor quis. Lorem euismod nibh urna nec. er
                        eget neque. Dictumst lacinia diam, nunc, rhoncus cursus
                        habi tasse pret ium, tor tor quis. Lorem euismod nibh
                        urna nec. Nisi fel is semper eget neque. Dictumst
                        lacinia diam, nunc
                      </FormGroup>
                      <FormGroup row className="my-0">
                        <Col xs="4">
                          <FormGroup>
                            <Label className="uni-label" htmlFor="city">ADD LOCATION</Label>
                            <Input
                              type="text"
                              id="location"
                              placeholder="Enter your location"
                              value={this.state.password}
                              onChange={this.handleLocationChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="4">
                          <FormGroup>
                            <Label className="uni-label" htmlFor="postal-code">FUNDING TYPE</Label>
							{/*<div class="btn-group">
                                  <button type="button" class="btn btn-secondary">Public</button>
                                  <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-expanded="false" data-reference="parent">
                                   <i class="fa fa-angle-down"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                    <a class="dropdown-item" href="#">Private</a>
                                    <a class="dropdown-item" href="#">Trust</a>
                                  
                                  </div>
                            </div>  */}
                            <Input
                              type="select"
                              name="funding"
                              id="funding"
                              onChange={this.handleDropdownChange1}
                            >
                              <option value="public">Public</option>
                              <option value="private">Private</option>
                              <option value="trust">Trust</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs="4">
                       
                          <FormGroup>
                            <Label className="uni-label" htmlFor="postal-code">NO. OF STUDENTS</Label>
                            <Input
                              type="number"
                              id="totalstudents"
                              value={this.state.totalstudents}
                              onChange={this.handleTotalstudentsChange}
                            />
                          </FormGroup>
                          {/*<div className="number-input">
  
  <input className="quantity" min="0" name="quantity" value="10.369" type="number" />
  <div className="quantity-box">
  <button className="plus" > <i class="fa fa-angle-down"></i></button>
  <button  className="minus"> <i class="fa fa-angle-up"></i></button>
  </div>
						  </div>  */}
                        </Col>
                      </FormGroup>
                      <Label htmlFor="city">ESTIMATED LIVING COST</Label>
                      <FormGroup row className="my-0">
                        <Col xs="2">
                          <FormGroup>
                            <Input
                              type="number"
                              id="city"
                              value={this.state.estimatedcost}
                              onChange={this.handleEstimatedcostChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col xs="2">
                          <FormGroup>
                            <FormGroup>
                              <Input
                                type="select"
                                name="selecttype"
                                id="selecttype"
                                onChange={this.handleDropdownChange}
                              >
                                <option value="permonth">Per month</option>
                                <option value="peryear">Per year</option>
                              </Input>
                            </FormGroup>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="file-multiple-input">
                            Multiple File input
                          </Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="file"
                            id="file-multiple-input"
                            name="file-multiple-input"
                            multiple
                          />
                        </Col>
                      </FormGroup>
                      <Button
                        color="primary"
                        type="submit"
                        onClick={this.onSubmit.bind(this)}
                        className="px-4"
                      >
                        SAVE
                      </Button>
                    </CardBody>
                  </Card>
               
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Profileaboutus;
