import React, { Component } from 'react';
import { Link  , Redirect } from 'react-router-dom';
import { Label, Button, Card, FormGroup, CardBody, CardHeader, CardGroup, ListGroup ,ListGroupItem, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//API Base Url
//const API_BASE = "https://formeeadmin.bicsglobal.com/addsectionabout";
/*
function submitForm(contentType, data, setResponse, path) {
  axios({
  url: `https://formeeadmin.bicsglobal.com/addsectionabout`,
  method: 'POST',
  data: data,
  headers: {
    'Content-Type': contentType
  }
  }).then((response) => {
  setResponse(response.data);
  }).catch((error) => {
  setResponse("error");
  })
}


class Addsubsectionabout extends Component {

  constructor(props) {
	 
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      university_id: 1,
     //university_campus_id:'1',
     // university_campus_subsections_id: '',
      layout: 'normal',
      heading: '',
	  id:'',
      sub_heading: '',
      description :'',
      upload_photo: [],
	  schemas: [],
	  schemas_id: [],
      fileLength: '',
	 // selectedValue:'',
      errors: {
        description: '',
        heading: '',
        sub_heading: '',
        fileLength: ''
      },
      formData: new FormData()
    };
  
  axios.get('https://formeeadmin.bicsglobal.com/getsubsection').then(response => {
		//console.log("_______________");
		//console.log(response);
         this.setState({
                   schemas: response.data.heading,
                   schemas_id: response.data.id
               });
        })
   //alert(localStorage.getItem('idsub'));
  }
  
  
  handleChange = param => e => {
   axios.get('https://formeeadmin.bicsglobal.com/getsubsectionbyid/'+param).then(response1 => {
		console.log(response1);
		this.setState({
                   id: response1.data.result.id,
                   heading: response1.data.result.heading,
                   sub_heading: response1.data.result.sub_heading,
                   description: response1.data.result.description
               });
         
        })
		e.preventDefault();
		document.querySelector('li.active').classList.remove('active');
		e.target.className = "list-group-item active";
};


 handleClick = param => e => {
this.setState({ id: '' });
	this.setState({ heading: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description: '' });
	this.setState({ errors: '' });
	//e.preventDefault();
	//document.querySelector('li.active').classList.remove('active');
	//e.target.className = "list-group-item active";
}



  onFileChange = (event) => {
		this.setState({fileLength: event.target.files.length});
    if(event.target.files.length < 3 ){
      for(let i = 0; i < event.target.files.length; i++) {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
      }
    }
	}
  
handleDescriptionChange = event => {
	this.setState({description: event.target.value});
}

handleHeadingChange = event => {
	this.setState({heading: event.target.value});
}

childFunction= param => e => {
	//alert(param);
        e.preventDefault();
        this.props.functionCallFromParent(param);
		//alert("dsdsds");
    }

handleSubHeadingChange = event => {
  this.setState({sub_heading: event.target.value});
}

validate = () => {
  const errors = {};
	if(this.state.description.trim() === '')
	{
	  errors.description = 'Description is required';
  }
  if(this.state.heading.trim() === '')
	{
		errors.heading = 'Heading is required';
  }
  if(this.state.sub_heading.trim() === '')
  {
    errors.sub_heading = "Sub Heading is required";
  }
  if(this.state.fileLength > 2){
    errors.fileLength = "Maximum 2 Files Only Allowed to Upload";
  }
  return Object.keys(errors).length === 0 ? null : errors;
};

  onSubmit = e => {
    e.preventDefault()
    const errors = this.validate();

    this.setState({ errors });
    if (errors) return;
    // const formdata = {
    //   university_id: this.state.university_id,
		// 	description : this.state.description,
    //   no_of_campuses : this.state.no_of_campuses,
    //   sports_facilities: this.state.sports_facilities,
    //   upload_photo: this.state.upload_photo
    // }
    // const formData = new FormData();
	
			  
    this.state.formData.append("id", this.state.id);
    this.state.formData.append("university_id", 1);
   // this.state.formData.append("university_campus_id", this.state.university_campus_id);
    this.state.formData.append("description", this.state.description);
    this.state.formData.append("heading", this.state.heading);
    this.state.formData.append("sub_heading", this.state.sub_heading);

    submitForm("multipart/form-data", this.state.formData, (msg) => { toast.success(msg.message);  setTimeout(function () { 
        location.reload(true); 
      }, 5000); }, 'aboutsubsection');
    
    //console.log(formData);
  		
    
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() });
	}
	
	render() {
	console.log(this.props.selectedValue);	
	const { selectedValue } = this.state;
    const { errors } = this.state;
    return (
	
	 
            
         
      <div className="campus-box" >
        <Container>
		   
        <Row>
          <Col md="9">
          <Form encType="multipart/form-data">
            <CardGroup className="custom_group">
              <Card className="uni-right-card">
              
                <CardHeader>
                <div className="row">
                <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
                <FormGroup >
                  <Label for="layout">Choose Layout</Label>
                  <Input type="select" name="layout" id="layout" onChange={this.handleLayoutChange} >
                    <option value="normal">Normal</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </Input>
                </FormGroup>
                </div>
                </div>
                </CardHeader>
                <CardBody>
                  <div className="row">
                    <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                      <FormGroup >
                        <Label for="heading">Add Heading</Label>
						 <Input type="hidden" name="id" className="form-control"  value={this.state.id} onChange={this.handleIdChange} />
                        <Input type="text" maxLength="200" name="heading" id="heading" value={this.state.heading} onChange={this.handleHeadingChange} />
                      </FormGroup>
                      <h6 style={{color: 'red'}}>{this.state.errors.heading}</h6>
                      </div>
                      <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                      <FormGroup >
                        <Label for="sub_heading">Add Sub Heading</Label>
                        <Input type="text" maxLength="200" name="sub_heading" id="sub_heading" value={this.state.sub_heading} onChange={this.handleSubHeadingChange} />
                      </FormGroup>
                      <h6 style={{color: 'red'}}>{this.state.errors.sub_heading}</h6>
                      </div>
                      <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
                      <FormGroup >
                        <strong><Label for="description">Description</Label></strong>
                      <FormGroup className="uni-para-content">
                         <Input type="textarea" name="description" id="description_about" maxLength="5000" value={this.state.description} onChange={this.handleDescriptionChange} />
                      </FormGroup>

                      <Input type="hidden" name="university_id" value={this.state.university_id} />
                     
                      </FormGroup>
                      </div>
                      
                      <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
                        <FormGroup >
                          <Label for="campussub_upload_photo">Upload Photos</Label>
                          <Input type="file" id="campussub_upload_photo" name="upload_photo[]" accept="image/*" multiple onChange={this.onFileChange} ref={ref=> this.fileInput = ref} />
                        </FormGroup>
                        <h6 style={{color: 'red'}}>{this.state.errors.fileLength}</h6>
                      </div>
                      </div>
                      <div className="d-flex justify-content-end">
                      <Button color="primary" className="prview-btn">Preview</Button>
                      <Button color="success" onClick={this.onSubmit.bind(this)}  className="px-4 save-btn">Save</Button>
                      </div>

                </CardBody>
                </Card>
              </CardGroup>
              </Form>
            </Col>
			
			
			<Card className="col-md-3 list-card uni-no-padd">
					  <CardHeader className="card-list-header">
                          
   					  
						<span className="card-list-head"><strong class='add'> <a 
                    data-toggle="tab"
                    href="#Aboutus"
                    role="tab">
                    About
                  </a></strong></span>
						
						<div className="card-header-actions">
						  
						</div>
					  </CardHeader>
					  <CardBody className="uni-no-padd">
						<ListGroup className="university-list">
                          <Scrollbars style={{ height: 300 }}>
						{this.state.schemas.map((schema, index) => ( 
						  <ListGroupItem onClick={this.handleChange(this.state.schemas_id[index])}>{ schema }</ListGroupItem>
						    ))}
                             </Scrollbars>
							  <a className="btn btn-primary campus-btn"
                    data-toggle="tab"
                    href="#aboutsubsection"
                    role="tab">
                    Add SubSection
              </a>
						</ListGroup>
						
					  </CardBody>
					</Card>
					
					 
					
          </Row>
        </Container>
      </div>
    );
  }
}

export default Addsubsectionabout;   */
