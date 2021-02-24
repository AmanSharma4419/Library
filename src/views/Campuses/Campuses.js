import React, { Component, useState } from 'react';
import { Link  , Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, Label, Button, FormGroup, Card, CardBody, CardHeader, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Scrollbars } from 'react-custom-scrollbars';
import config from '../../config.json';

var baseurl = `${config.baseurl}/`;


function submitForm(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`storecampusinfo`,
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

class Campuses extends Component {

  constructor(props) {
    super(props);
    const errors = {};
 

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      university_campuses_id: '',
      location: '',
      address: '',
      description :'',
      upload_photo: [],
      fileLength: '',
      campusid: '',
      schemas: [],
	  schemas_id: [],
      errors: {
        location: '',
        address: '',
        description: '',
        fileLength: ''
      },
      formData: new FormData(),
      regexp : /^[0-9\b]+$/
    };
	
	 var universityid = localStorage.getItem('universityid');
	 
	  axios.get(baseurl+'getcampusesinfo/'+universityid).then(response => {
          this.setState({
                   schemas: response.data.heading,
                   schemas_id: response.data.id
               });
        })
   
  }
  
  onClick = e => {
	  //alert();
    e.preventDefault();
    this.setState({ showhide:  false });
	this.setState({ id: '' });
	this.setState({ location: '' });
	this.setState({ address: '' });
	this.setState({ description: '' });
	this.setState({ imgfile: '' });
	this.setState({ errors: '' });
  };


	handleLocationChange = (event) => {
	this.setState({ location: event.target.value });
	};

	handleAddressChange = (event) => {
	this.setState({ address: event.target.value });
	};

	handleDescChange = (event) => {
	this.setState({ description: event.target.value });
	};

	// handleno_of_campusesChange = (event) => {
	// this.setState({ no_of_campuses : event.target.value });
	// };

	// handleSportsChange = (event) => {
	// this.setState({ sports_facilities: event.target.value });
  // };
  
  previewbtn(){	
    window.location.href= "/#/viewus";
  }

	onFileChange = (event) => {
	this.setState({fileLength: event.target.files.length});
	if(event.target.files.length < 3 ){
	  for(let i = 0; i < event.target.files.length; i++) {
		this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
	  }
	}
	}

 //to get single value subsection in profile 
 handleChange1 = param => e => {
	  //alert(param);
   axios.get(baseurl+'getcampusbuyid/'+param).then(response1 => {
		
		this.setState({
                   campusid: response1.data[0].id,
                   location: response1.data[0].location,
                   address: response1.data[0].address,
                   description: response1.data[0].description,
				   imgfile: response1.data[0].filename
				   
               });
         
        })
		//alert();
	    this.setState({ showing:  false });	
	    e.preventDefault();
		document.querySelector('li.active').classList.remove('active');
		e.target.className = "list-group-item active";
	  
};


 handleClick = param => e => {
    this.setState({ id: '' });
	this.setState({ heading: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description1: '' });
	//this.setState({ layout: '' });
	this.setState({ imgfile: '' });
	this.setState({ errors: '' });
	
}
validate = () => {
  const errors = {};
  if(this.state.location === '')
	{
	  errors.location = 'Campus Location is required';
  }
  if(this.state.address === '')
	{
	  errors.address = 'Campus Address is required';
  }
	if(this.state.description.trim() === '')
	{
	  errors.description = 'Description is required';
  }
  // if(this.state.no_of_campuses.trim() === '')
	// {
		// errors.no_of_campuses = 'No of campuses is required';
  // }
  // if(this.state.sports_facilities === '' || this.state.sports_facilities === '0')
  // {
    // errors.sports_facilities = "Select Sport Facilities";
  // }
  if(this.state.fileLength > 1){
    errors.fileLength = "Maximum 2 Files Only Allowed to Upload";
  }
  return Object.keys(errors).length === 0 ? null : errors;
}

 onClickdelete = e => {
   var id = this.state.campusid;
   var university_id = localStorage.getItem('universityid');
   //alert(id);
   
      axios.post(
				baseurl+'deleteimagecampus',
					{
					university_id: university_id,
					campusid: id
					}
				)

				.then(function(response) {
			     if(response.data == 200){
				 toast.success("Deleted successfully");
				 setTimeout(function(){ window.location.reload(); }, 3000);
				 }
				 
				
				})
				.catch(function(error) {
				//toast.success("Error occured");
				})
   
  };

  onSubmit = e => {
    e.preventDefault()   
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    this.state.formData.append("campusid", this.state.campusid );
    this.state.formData.append("university_id", localStorage.getItem('universityid'));
    this.state.formData.append("layout", "normal");
    this.state.formData.append("location", this.state.location);
    this.state.formData.append("address", this.state.address);
    this.state.formData.append("description", this.state.description);
    this.state.formData.append("no_of_campuses", "0");
    this.state.formData.append("sports_facilities", "0");

    submitForm("multipart/form-data", this.state.formData, (msg) => { toast.success(msg.message);  setTimeout(function () { 
        window.location.reload(true); 
      }, 5000); 
	 }, 'campuses');
	
    this.setState({ location: '' });
    this.setState({ address: '' });
    this.setState({ description: '' });
    this.setState({ no_of_campuses: '' });
    this.setState({ sports_facilities: '' }); 
	this.setState({ upload_photo: '' });
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() }); 
	
	}
  
 

	render() {
  
    return (
      <div className="campus-box" >
        <Container>
          <Row>
            <Col md="9">
            <Form encType="multipart/form-data">
              <CardGroup className="custom_group">
                <Card className="uni-right-card">
                    <CardHeader>
                    </CardHeader>
                  <CardBody>
                  <div className="row">
                  <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                    <FormGroup >
                      <Label className="card-label" for="location">Campus Location</Label>
                      <Input type="text" id="location" maxLength="200" name="location" value={this.state.location} onChange={this.handleLocationChange}/>
                    </FormGroup>
                    <h6 style={{color: 'red'}}>{this.state.errors.location}</h6>
                  </div>
                  <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                    <FormGroup >
                      <Label className="card-label" for="campusSubheading">Campus Address</Label>
                      <Input type="text" id="address" maxLength="200" name="address" value={this.state.address} onChange={this.handleAddressChange}/>
                    </FormGroup>
                    <h6 style={{color: 'red'}}>{this.state.errors.address}</h6>
                  </div>
                    <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
                      <FormGroup >
                        <Label className="card-label"  for="campus_description">Campus Info</Label>
                        <FormGroup className="uni-para-content">
                          <Input type="textarea" id="campus_description" name="description" maxLength="5000"  rows="15" value={this.state.description} onChange={this.handleDescChange} />    
                        </FormGroup>
                          {/* <Input type="hidden" name="_method" value={this.state.formMethod} /> */}
                          <Input type="hidden" name="university_id" value={this.state.university_id} />
                          <Input type="hidden" name="campusid" value={this.state.campusid} />
                          <h6 style={{color: 'red'}}>{this.state.errors.description}</h6>
                      </FormGroup>
                    </div>
					{/* <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                      <FormGroup >
                        <Label className="card-label" for="no_of_campuses">No. of campuses</Label>
                        <Input type="text" id="no_of_campuses" maxLength="3" name="no_of_campuses" value={this.state.no_of_campuses} onChange={this.handleno_of_campusesChange}/>
                      </FormGroup>
					            <h6 style={{color: 'red'}}>{this.state.errors.no_of_campuses}</h6>
                    </div>
                    <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
                      <FormGroup >
                        <Label className="card-label" for="sports_facilities">Sport Facilities</Label>
                        <Input type="select" id="sports_facilities" name="sports_facilities" value={this.state.sports_facilities} onChange={this.handleSportsChange} >
                          <option value="0">Select Facilities</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </Input>
                      </FormGroup>
                      <h6 style={{color: 'red'}}>{this.state.errors.sports_facilities}</h6> 
                    </div>  */}
                    
					<div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
                        <Label for="about_upload_photo">Upload Photos</Label>
                        <Input type="file" id="campus_upload_photo"  name="upload_photo[]" accept="image/*" onChange={this.onFileChange}/>
						 <FormGroup >
						  <div class="row remove-link mb-3 mx-0">
						  <div>{this.state.imgfile}</div>
						{ this.state.imgfile ?
						<a className="ml-5" onClick={this.onClickdelete}>Remove</a>
						: null
						}
						 </div>

                        </FormGroup>
                     
					  
                      <h6 style={{color: 'red'}}>{this.state.errors.fileLength}</h6>
                      </div>
                  </div>
                  <div className="d-flex justify-content-end">
				      <Button color="primary" onClick={this.previewbtn} className="prview-btn">Preview</Button>
                      <Button color="success" onClick={this.onSubmit.bind(this)} className="px-4 save-btn">Save</Button>
                  </div>
                  </CardBody>
                </Card>
              </CardGroup>
              </Form>
            </Col>
                   <Card className="col-md-3 list-card uni-no-padd">
					   {/*  <CardHeader className="card-list-header">
					<span className="card-list-head"><strong class='add'> <a onClick={this.onClick1}>Campuses</a></strong></span> 
					  </CardHeader>  */}
					 <a className="btn btn-primary campus-btn mt-3" onClick={this.onClick}>+ Add more campus</a>  
					 <CardBody className="uni-no-padd">
						<ListGroup className="university-list">
							<Scrollbars style={{ height: 300 }}>
								{this.state.schemas.map((schema, index) => ( 
								<ListGroupItem id="about" onClick={this.handleChange1(this.state.schemas_id[index])}>{ schema }</ListGroupItem>
								))}
							</Scrollbars>
						 
						</ListGroup>
					 </CardBody>
					</Card>	
          </Row>
        </Container>
      </div>
    );
  }
}

export default Campuses;
