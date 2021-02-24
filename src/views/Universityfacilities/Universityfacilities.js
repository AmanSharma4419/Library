import $ from 'jquery';
import React, { Component } from "react";
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu,
  DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon,
  InputGroupButtonDropdown, InputGroupText, Label, Row, Container, TabContent, TabPane, Nav,
  NavItem, NavLink } from "reactstrap";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API Call Url //
function submitForm(contentType, data, setResponse, path) {
  axios({
  url: `https://formeeadmin.bicsglobal.com/storeuniversityfacilityuniversity`,
  method: 'POST',
  data: data,
  headers: {
    'Content-Type': contentType
  }
  }).then((response) => {
  setResponse(response.data);
  //window.location.reload(false);

  setTimeout(function () { 
    window.location.reload(true); 
  }, 4000);

  }).catch((error) => {
  setResponse("error");
  })
}



class Universityfacilities extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      description : '',
      imgfile :'',
      errors:{},
      formData: new FormData(),
      upload_photo: [],
      fileLength: ''
    };

    this.getFacilitydata();

  }


  getFacilitydata()
  {
	  
    axios.get('https://formeeadmin.bicsglobal.com/get_facility/'+localStorage.getItem('universityid')+'/university').then(response => {
      console.log(response);
      //alert(response.data.length);
      if((response.data.length > '0') ) 
      { 
          //alert(response.data[0].description);
          this.setState({
              description: response.data[0].description,
              imgfile: response.data[0].filename
             });
      }

      })

   }

  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
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
    //if(this.state.description.trim() === '')
    if($("#txtudescription").val().trim() === '')
    {
      errors.description = 'Description is required';
      //this.refs.description.focus();
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
    this.state.formData.append("university_id", localStorage.getItem('universityid'));
    
    submitForm("multipart/form-data", this.state.formData, (msg) => toast.success(msg.message), 'university');


    // const post = axios.post('http://172.18.1.62:8000/api/task/', products).then((response) => {
    // alert(response);
    // this.props.history.push('/clients/view');
    // toast.success("Updated successfully!..");
    // });

    this.setState({ description: '' });
    this.setState({ imgfile: '' });
    this.setState({ upload_photo: '' });
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() });
   
  };

 



  render() {
    const { errors } = this.state;
    return (
      <div className="animated fadeIn gray-bg-300">
        <Container>
          
          <Row>
            
            <Col xs="9">
              

              <div className="tab-content">
                <div className="tab-pane active" id="home" role="tabpanel">
                  <Card className="uni-right-card">
                    <CardHeader>
                      <strong>Description</strong>
                    </CardHeader>
                    <CardBody>
                      <FormGroup className="uni-para-content">
                        
                        
                          <textarea class="form-control" ref="description" value={this.state.description} onChange={this.handleDescriptionChange} id="txtudescription" placeholder="" rows="20" required>
                          {this.state.description}
                          </textarea>
                          
                      </FormGroup>
                      <h6 style={{color: 'red'}}>{errors.description}</h6>

                      

                     
                     <label for="inputPassword5">UPLOAD PHOTOS</label>
                     <div class="my-4">{this.state.imgfile}</div>
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

                      <Button color="primary" type="submit" onClick={this.onSubmit.bind(this)} className="px-4 float-md-right save-btn">
                        SAVE
                      </Button>
                    </CardBody>
                  </Card>
                </div>
                
              </div>
            </Col>

            <Card className="col-md-3 list-card uni-no-padd">
					    

					    <CardBody className="uni-no-padd">
                <a className="btn btn-primary campus-btn my-4" data-toggle="tab" href="#Facilities" role="tab"> Facilities</a>

                <span className="btn btn-primary campus-btn my-4"><strong> University Facilities</strong></span> 

                <a className="btn btn-primary campus-btn my-4" data-toggle="tab" href="#Studentfacilities" role="tab"> Student Facilities</a>

					    </CardBody>
            
            </Card>

          </Row>
        </Container>
      </div>
    );
  }
}

export default Universityfacilities;
