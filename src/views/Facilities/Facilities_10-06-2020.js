import React, { Component } from "react";
import { Link  , Redirect } from 'react-router-dom';
import { Badge,  Button,  Card,  CardBody,  CardFooter,  CardHeader,  Col,  Collapse,  DropdownItem,  DropdownMenu,
  DropdownToggle,  Fade,  Form,  FormGroup,  FormText,  FormFeedback,  Input,  InputGroup,  InputGroupAddon, 
  InputGroupButtonDropdown,  InputGroupText,  Label,  Row,  Container,  TabContent,  TabPane,  Nav,  
  NavItem,  NavLink } from "reactstrap";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API Call Url //
function submitForm(contentType, data, setResponse, path) {
  axios({
  url: `https://formeeadmin.bicsglobal.com/storeuniversityfacility`,
  method: 'POST',
  data: data,
  headers: {
    'Content-Type': contentType
  }
  }).then((response) => {
  setResponse(response.data);
  //window.location.reload(false);
  }).catch((error) => {
  setResponse("error");
  })
}



class Facilities extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      description : '',
      classrooms : '',
      sportsfacilities : '',
      errors:{},
      formData: new FormData(),
      upload_photo: [],
      fileLength: ''
    };
  }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleClassroomChange = (event) => {
    this.setState({ classrooms: event.target.value });
  };

  handleSportsfacilitiesChange = (event) => {
    this.setState({ sportsfacilities: event.target.value });
  };

  onFileChange = (event) => {
		// this.setState({
		// 	upload_photo: event.target.files[0]
    // });
    
    this.setState({fileLength: event.target.files.length});

    if(event.target.files.length < 3 )
    {
      for(let i = 0; i < event.target.files.length; i++) 
      {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
        // this.setState({
        //   upload_photo: event.target.files[i]
        // });
      }
    }
  }


  validate = () => {
    const errors = {};
    if(this.state.description.trim() === '')
    {
      errors.description = 'Description is required';
      //this.refs.description.focus();
    }

    if(this.state.classrooms.trim() === '')
    {
      errors.classrooms = 'No.of Classrooms is required';
    }

    if(this.state.sportsfacilities.trim() === '')
    {
      errors.sportsfacilities = 'Sports Facilities is required';
    }

    if(this.state.fileLength > 2)
    {
      errors.fileLength = "Maximum 2 files are allowed to upload";
    }

    return Object.keys(errors).length === 0 ? null : errors;
};

  
  onSubmit = (e) => {
    e.preventDefault();


    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    /*
    const products = {
      description: this.state.description,
      classrooms: this.state.classrooms,
      sportsfacilities: this.state.sportsfacilities,
      
    };
    console.log(products);
    */
    this.state.formData.append("description", this.state.description);
    this.state.formData.append("classrooms", this.state.classrooms);
    this.state.formData.append("sportsfacilities", this.state.sportsfacilities);
    this.state.formData.append("university_id", 1);
    
    submitForm("multipart/form-data", this.state.formData, (msg) => toast.success(msg.message), 'university');


    // const post = axios.post('http://172.18.1.62:8000/api/task/', products).then((response) => {
    // alert(response);
    // this.props.history.push('/clients/view');
    // toast.success("Updated successfully!..");
    // });

    this.setState({ description: '' });
    this.setState({ password: '' });
    this.setState({ errors: '' });
  };

 



  render() {
    const { errors } = this.state;
    return (
      <div className="animated fadeIn gray-bg-300">
        <Container>
         
          <Row>
    
            <Col xs="9" >
      
                  <Card className="uni-right-card">
                    <CardHeader>
                      <strong>Description</strong>
                    </CardHeader>
                    <CardBody>
                    <FormGroup className="uni-para-content">
                          <textarea class="form-control" ref="description" onChange={this.handleDescriptionChange} id="validationTextarea" placeholder="" rows="20" required>
                          {this.state.description}
                          </textarea>
                      </FormGroup>
                      <h6 style={{color: 'red'}}>{errors.description}</h6>

                      <FormGroup row className="my-0">
                        <Col xs="6">
                          <FormGroup>
                            <Label className="uni-label" htmlFor="classrooms">NO.OF CLASSROOMS</Label>
                            <Input type="number" value={this.state.classrooms} onChange={this.handleClassroomChange} />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{errors.classrooms}</h6>
                        </Col>
                        <Col xs="6">
                          <FormGroup>
                            <Label className="uni-label" htmlFor="sports_facilities">SPORTS FACILITIES</Label>
                              
                            <select onChange={this.handleSportsfacilitiesChange} class="custom-select my-1 mr-sm-3 form-control" id="sports_facilities">
                              <option vaule="" selected>Choose...</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                                  
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{errors.sportsfacilities}</h6>
                        </Col>
                        
                      </FormGroup>

                     
                     <label for="inputPassword5">UPLOAD PHOTOS</label>
                      <FormGroup row>
                        <Col md="3">
                          <Label htmlFor="file-multiple-input">
                            File
                          </Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="file" accept="image/*" multiple onChange={this.onFileChange} name="upload_photo[]" />
                        </Col>
                      </FormGroup>
                      <h6 style={{color: 'red'}}>{this.state.errors.fileLength}</h6>
                   
                      
                      <Row className="uni-drag-drop">
                      <Col xs="12">
                      
          <div class="upload-drop-zone" id="drop-zone">
            You can also drop your files here
          </div>
                      </Col>
                      </Row>
                      
                      <Row className="uni-no-mar">
                      <Col xs="12">
                      <Button color="primary" type="submit" onClick={this.onSubmit.bind(this)} className="px-4 float-md-right save-btn">
                        SAVE
                      </Button>
                      </Col>
                      </Row>
                    </CardBody>
                  </Card>
               
            </Col>

            <Card className="col-md-3 list-card uni-no-padd">
					    <CardHeader className="card-list-header">
					      <span className="card-list-head"><strong>Facilities</strong></span>
					    </CardHeader>

					    <CardBody className="uni-no-padd">
                <a className="btn btn-primary campus-btn my-4" data-toggle="tab" href="#Universityfacilities" role="tab"> University Facilities</a>
                <a className="btn btn-primary campus-btn" data-toggle="tab" href="#Studentfacilities" role="tab"> Student Facilities </a>
					    </CardBody>

              
					  </Card>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Facilities;
