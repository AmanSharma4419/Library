import React, { Component } from "react";
import { 
Badge,Button, Card, CardBody,CardFooter,CardHeader,Col,Collapse,DropdownItem,DropdownMenu,DropdownToggle,Form,FormGroup,FormText,FormFeedback,CardGroup,Input,InputGroup, InputGroupAddon,InputGroupButtonDropdown,InputGroupText,Label,ListGroup,ListGroupItem,Row,Container, TabContent,Nav,NavItem, NavLink,Modal, ModalBody, ModalFooter
} from "reactstrap";

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Scrollbars } from 'react-custom-scrollbars';
import SecondaryHeader from './../SecondaryHeader/SecondaryHeader';
import Campuses from './../Campuses/Campuses';
import Facilities from './../Facilities/Facilities';
import Entryrequirement from './../Entryrequirement/Entryrequirement';
import Universitycontact from './../Universitycontact/Universitycontact';
import Leftmenu from '../../assets/img/left-menu.jpg';
import Studentfacilities from './../Studentfacilities/Studentfacilities';
import Universityfacilities from './../Universityfacilities/Universityfacilities';
import Leftprofile from './../Leftprofile/index';
import config from '../../config.json';

var baseurl = `${config.baseurl}/`;


//API Base Url for probile about store 
function submitForm(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`storeaboutus`,
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

//for subsection store 
function submitForm1(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`addsectionabout`,
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



class Profileaboutus extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.state = {
	  large: false,
      collapse: true,
      fadeIn: true,
      timeout: 300,
	  formData: new FormData(),
	  upload_photo: [],
	  location: '',
	  description:'',
	  errors:{},
	  schemas: [],
	  schemas_id: [],
	  totalstudents: '',
	  showResults: false,
	  estimatedcost: '',
	  fileLength: '',
	  funding: '',
	  selecttype: '',
	  showing: true,
	  imgfile:'',
	  imgfile1:'',
	  
	  //for subsection start
	  university_id: '',
      layout: 'normal',
      heading: '',
	  id:'',
      sub_heading: '',
      description1 :'',
      upload_photo: [],
	  
    };
	
	//to get all subsection and display in right side
	 this.toggleLarge = this.toggleLarge.bind(this);
	 //alert(localStorage.getItem('universityid'));
	
	 var universityid = localStorage.getItem('universityid');
	 var type= "about";
	  axios.get(baseurl+'getsubsection/'+universityid+'/'+type).then(response => {
         this.setState({
                   schemas: response.data.heading,
                   schemas_id: response.data.id
               });
        })
  }
  
   previewbtn(){	
    window.location.href= "/#/viewus";
  }
  
  //to get single value subsection
 /* handleChange = param => e => {
	
   axios.get('https://formeeadmin.bicsglobal.com/getsubsectionbyid/'+param).then(response1 => {
		console.log(response1);
		this.setState({
                   id: response1.data[0].id,
                   heading: response1.data[0].heading,
                   sub_heading: response1.data[0].sub_heading,
                   description1: response1.data[0].description,
                   layout: response1.data[0].layout,
                   imgfile: response1.data[0].filename
               });
         
        })
		//alert();
		e.preventDefault();
        if(document.querySelector('li.active').classList.contains('active')) {
		document.querySelector('li.active').classList.remove('active');
		}
		//e.target.className = "list-group-item active";	
		
};   */


//to get single value subsection in profile 
 handleChange1 = param => e => {
	  //alert(param);
   axios.get(baseurl+'getsubsectionbyid/'+param).then(response1 => {
		
		this.setState({
                   id: response1.data[0].id,
                   heading: response1.data[0].heading,
                   sub_heading: response1.data[0].sub_heading,
                   description1: response1.data[0].description,
                   layout: response1.data[0].layout,
				   imgfile1: response1.data[0].filename
				   
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
	this.setState({ imgfile1: '' });
	this.setState({ errors: '' });
	
}

// for subsection saving and validation start

 onFileChange1 = (event) => {
		this.setState({fileLength: event.target.files.length});
    if(event.target.files.length < 3 ){
      for(let i = 0; i < event.target.files.length; i++) {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
      }
    }
	}
  
handleDescriptionChange1 = event => {
	this.setState({description1: event.target.value});
}

handleHeadingChange = event => {
	this.setState({heading: event.target.value});
}

handleLayoutChange = event => {
	this.setState({layout: event.target.value});
}


handleSubHeadingChange = event => {
  this.setState({sub_heading: event.target.value});
}

validate1 = () => {
  const errors = {};
	if(this.state.description1.trim() === '')
	{
	  errors.description1 = 'Description is required';
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

  
  onSubmit1 = e => {
    e.preventDefault()
    const errors = this.validate1();

    this.setState({ errors });
    if (errors) return;
			  
    this.state.formData.append("id", this.state.id);
    this.state.formData.append("university_id", localStorage.getItem('universityid'));
    this.state.formData.append("description", this.state.description1);
	this.state.formData.append("subsection_type", "about");
    this.state.formData.append("heading", this.state.heading);
    this.state.formData.append("layout", this.state.layout);
    this.state.formData.append("sub_heading", this.state.sub_heading);

   submitForm1("multipart/form-data", this.state.formData, (msg) => { toast.success(msg.message);  setTimeout(function () { 
        window.location.reload(true); 
      }, 5000); }, 'aboutsubsection');
    
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() });
  }
  // for subsection saving and validation end
  
  
    toggleLarge() {
    this.setState({
      large: !this.state.large,
	  
    });
  }


  
 
  onClick = e => {
	  //alert();
    e.preventDefault();
    this.setState({
      showing:  false
    });
	this.setState({ id: '' });
	this.setState({ heading: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description1: '' });
	//this.setState({ layout: '' });
	this.setState({ imgfile1: '' });
	this.setState({ errors: '' });
  };
  
  onClick1 = e => {
	  //alert("1");
    e.preventDefault();
    this.setState({ showing:  true });
  };
  
  onClickdelete = e => {
   var university_id = localStorage.getItem('universityid');
   
      axios.post(
				baseurl+'deleteimage',
					{
					university_id: university_id,
					type: "about",
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
  
  onClickdeletesubsection = e => {
   var sub = this.state.id;
   //alert(sub);
   
            axios.post(
				baseurl+'deleteimagesubsection',
					{
					sub: sub,
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
  
   // for profile saving and validation start
  componentDidMount() {
		var id  = localStorage.getItem('universityid'); 
		
		// var id  = 35; 
		 
		 axios.get(baseurl+'getuniversityabout/'+id).then(response => {
			  //console.log(response.data[0].filename.split('/')[3]);
		  this.setState({ location: response.data[0].location,description: response.data[0].description,funding: response.data[0].funding_type,totalstudents: response.data[0].no_of_students, estimatedcost: response.data[0].estimate_livingcost, selecttype: response.data[0].estimate_livingperiod,imgfile: response.data[0].filename });
         
        })
		 
	
        }

  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  };
  
  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
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
  
  onFileChange = (event) => {
	
    this.setState({fileLength: event.target.files.length});

    if(event.target.files.length < 3 ){
      for(let i = 0; i < event.target.files.length; i++) {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
        // this.setState({
        //   upload_photo: event.target.files[i]
        // });
      }
    }
  }
  
 
 
 
validate = () => {
  const errors = {};
		if(this.state.location === '' || (!this.state.location ))
		{
		errors.location = 'Location is required';
		}
		if(this.state.description === '' || (!this.state.description ))
		{
		errors.description = 'Description is required';
		}
		if((this.state.totalstudents) === '' || (!this.state.totalstudents ))
		{
		errors.totalstudents = 'No of students is required';
		}
		if(this.state.estimatedcost === '' || (!this.state.estimatedcost ))
		{
		errors.estimatedcost = "Estimated living cost is required";
		}
	   if(this.state.fileLength > 2)
		{
		  errors.fileLength = "Maximum 2 files are allowed to upload";
		}
  
   return Object.keys(errors).length === 0 ? null : errors;
};



  onSubmit = (e) => {
    e.preventDefault();

    //console.log(this.state.errors);
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
	
	
  	this.state.formData.append("id", localStorage.getItem('universityid'));
  	this.state.formData.append("description", this.state.description);
  	this.state.formData.append("location", this.state.location);
    // formData.append("upload_photo", this.state.upload_photo, this.state.upload_photo.name);
    this.state.formData.append("totalstudents", this.state.totalstudents);
    this.state.formData.append("funding", this.state.funding);
    this.state.formData.append("estimate_livingperiod", this.state.selecttype);
    this.state.formData.append("estimatedcost", this.state.estimatedcost);

    submitForm("multipart/form-data", this.state.formData, (msg) => toast.success("Saved successfully"), 'university');
	
    //this.setState({ description: '' });
    //this.setState({ location: '' });
    //this.setState({ totalstudents: '' });
    //this.setState({ funding: '' });
    //this.setState({ selecttype: '' }); 
	this.setState({ upload_photo: '' });
	//this.setState({ estimatedcost: '' });
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() }); 
   
  };
   // for profile saving and validation end

  render() {
    const { showing } = this.state;
	const { errors } = this.state;
	
     //var imgfile = this.state.imgfile.split('/')[3];
		 

		  
	return (
	        
               
           
      <div className="animated fadeIn gray-bg-300">
        <header className="app-header secondary-app-header">
         <div className="university-secondary-header">
          <SecondaryHeader></SecondaryHeader>   
        </div>
        </header>
        <Container>
		 <ToastContainer/>
		 
          <Row>
            <Col xs="12" sm="4" xl="4" md="4" lg="4" className="uni-no-padd">
              <Card className="uni-left-card">
                <CardBody>
				 <Row className="uni-no-mar"><Leftprofile></Leftprofile></Row>  
				{/* <Row><img src={Leftmenu} alt="home-icon"  className="left-img" /></Row>  */}
				  
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" sm="8" xl="8" md="8" lg="8" className="uni-no-padd">
              <ul className="nav nav-tabs" id="ProfileTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#Aboutus"
                    role="tab"
                  >
                   about
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Facility"
                    role="tab"
                  >
                    Facilities
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Campus"
                    role="tab"
                  >
                    Campuses
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Entry"
                    role="tab"
                  >
                    Entry Requirements
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Contactus"
                    role="tab"
                  >
                  Contact
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Review"
                    role="tab"
                  >
                    Reviews
                  </a>
                </li>
                
              </ul>
			  
			 
			  
              <div className="tab-content">
                <div className="tab-pane active" id="Aboutus" role="tabpanel">
				<div className="row uni-no-mar">
				
				{ showing 
                  ? 
                  <div className="uni-right-card uni-aboutus col-md-9">
                    <CardHeader>
                      <strong>Description</strong>
                    </CardHeader>
                    <CardBody>
					
                        <FormGroup className="uni-para-content">
							  <textarea class="form-control" ref="description" onChange={this.handleDescriptionChange} id="validationTextarea" placeholder="" rows="20" value={this.state.description}>
							  </textarea>
                        </FormGroup>
					         <h6 style={{color: 'red'}}>{errors.description}</h6>
							 
                        <FormGroup row className="my-0">
                        <Col xs="4">
                          <FormGroup>
                            <Label className="uni-label" htmlFor="city">ADD LOCATION</Label>
                            <Input type="text" id="location" placeholder="Enter your location" value={this.state.location}
                              onChange={this.handleLocationChange} />
                         </FormGroup>
							<h6 style={{color: 'red'}}>{errors.location}</h6>
                        </Col>
                        <Col xs="4">
                        <FormGroup>
                           
						   <Label className="uni-label" htmlFor="postal-code">FUNDING TYPE</Label>
							{/* <div class="btn-group">
                                  <button type="button" class="btn btn-secondary">Public</button>
                                  <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-expanded="false" data-reference="parent">
                                   <i class="fa fa-angle-down"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                    <a class="dropdown-item" href="#">Private</a>
                                    <a class="dropdown-item" href="#">Trust</a>
                                  
                                  </div>
                            </div>  */}
                          <Input type="select" name="funding" id="funding" onChange={this.handleDropdownChange1} >
                              <option value="public" selected={'public' == this.state.funding}>Public</option>
                              <option value="private" selected={'private' == this.state.funding}>Private</option>
                              <option value="trust" selected={'trust' == this.state.funding}>Trust</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col xs="4">
                          <FormGroup>
                            <Label className="uni-label" htmlFor="postal-code">NO. OF STUDENTS</Label>
                            <Input type="number" value={this.state.totalstudents} onChange={this.handleTotalstudentsChange}
                            />
                          </FormGroup>
						  <h6 style={{color: 'red'}}>{errors.totalstudents}</h6>
						
                        </Col>
                      </FormGroup>
					  
                      <Label  className="uni-label" htmlFor="city">ESTIMATED LIVING COST</Label>
                      <FormGroup row className="my-0">
                        <Col xs="3">
                          <FormGroup>
                            <Input type="number" value={this.state.estimatedcost} onChange={this.handleEstimatedcostChange}/>
                          </FormGroup>
						  <h6 style={{color: 'red'}}>{errors.estimatedcost}</h6>
                        </Col>
                        <Col xs="3">
                          <FormGroup>
						 
                            <FormGroup>
                               <Input type="select" name="selecttype" id="selecttype" onChange={this.handleDropdownChange} >
                              <option value="permonth" selected={'permonth' === this.state.selecttype}>Per month</option>
                              <option value="peryear" selected={'peryear' === this.state.selecttype}>Per year</option>
                         
                              </Input>
                            </FormGroup>
                          </FormGroup>
                        </Col>
                      </FormGroup>
					  
                      <FormGroup row>
                        <Col md="3">
                          <Label  className="uni-label" htmlFor="file-multiple-input">
                            UPLOAD PHOTOS
                          </Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input type="file" accept="image/*" onChange={this.onFileChange} name="upload_photo[]" />
                        </Col>
                      </FormGroup>
					  <Row className="uni-drag-drop">
                      <Col xs="12">
					 <div class="row remove-link mb-3 mx-0">
					  <div className="inline pr-3">{this.state.imgfile}</div>
					  { this.state.imgfile ?
					  <a onClick={this.onClickdelete}>Remove</a>
					  : null
					  }
                      
					  </div>
          <div class="upload-drop-zone" id="drop-zone">
            You can also drop your files here
          </div>
                      </Col>
                      </Row>
					  
                      <Button color="primary" type="submit" onClick={this.onSubmit.bind(this)} className="px-4 float-md-right save-btn" > SAVE </Button>
					  <Button color="primary" onClick={this.previewbtn} className="prview-btn px-4 float-md-right save-btn">Preview</Button>
                    </CardBody>
                  </div>
				  
                  
          
		
		   : 
       
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
				    <option value="normal" selected={'normal' === this.state.layout}>Normal</option>
				    <option value="left" selected={'left' === this.state.layout}>Left</option>
				    <option value="right" selected={'right' === this.state.layout}>Right</option>
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
                         <Input type="textarea" name="description" id="description_about" rows="10" maxLength="5000" value={this.state.description1} onChange={this.handleDescriptionChange1} />
                      </FormGroup>
                     <h6 style={{color: 'red'}}>{this.state.errors.description1}</h6>
                      
                     
                      </FormGroup>
                      </div>
                      
                      <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
                           <Label for="about_upload_photo">Upload Photos</Label>
                          <Input type="file" id="about_upload_photo" name="upload_photo[]" accept="image/*" multiple onChange={this.onFileChange1} ref={ref=> this.fileInput = ref} />
						  <FormGroup >
						  <div class="row remove-link mb-3 mx-0">
						  <div>{this.state.imgfile1}</div>
						{ this.state.imgfile1 ?
						<a onClick={this.onClickdeletesubsection}>Remove</a>
						: null
						}
						 </div>

                        </FormGroup>
                        <h6 style={{color: 'red'}}>{this.state.errors.fileLength}</h6>
                      </div>
                      </div>
                      <div className="d-flex justify-content-end">
                      <Button color="primary" onClick={this.previewbtn}  className="prview-btn">Preview</Button>
                      <Button color="success" onClick={this.onSubmit1.bind(this)}  className="px-4 save-btn">Save</Button>
                      </div>

                </CardBody>
                </Card>
              </CardGroup>
              </Form>
            </Col>
			
			
			
		
		  
				}

             <Card className="col-md-3 list-card uni-no-padd">
					  <CardHeader className="card-list-header">
					  <span className="card-list-head"><strong class='add'> <a onClick={this.onClick1}>About</a></strong></span>
					  </CardHeader>
					  <a className="btn btn-primary campus-btn mt-3" onClick={this.onClick}>+ Add SubSection</a> 
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
		  </div>
		 
		 
                </div>
                <div className="tab-pane" id="Facility" role="tabpanel">
                 <Facilities></Facilities>
                </div>

                <div className="tab-pane" id="Campus" role="tabpanel">
                 <Campuses></Campuses>
                </div>

                <div className="tab-pane" id="Studentfacilities" role="tabpanel">
                 <Studentfacilities></Studentfacilities>
                </div>

                <div className="tab-pane" id="Universityfacilities" role="tabpanel">
                 <Universityfacilities></Universityfacilities>
                </div>

				{/*<div className="tab-pane" id="Campussub" role="tabpanel">
                 <Addsubsection></Addsubsection>
                </div>  */}
				{/*<div className="tab-pane" id="aboutsubsection" role="tabpanel">
                <Addsubsectionabout></Addsubsectionabout>
                </div>  */}
                <div className="tab-pane" id="Entry" role="tabpanel">
                 <Entryrequirement></Entryrequirement>
                </div>
                <div className="tab-pane" id="Contactus" role="tabpanel">
                 <Universitycontact></Universitycontact>
                </div>
                <div className="tab-pane" id="Review" role="tabpanel">
                  ..6.
                </div>
				
              </div>
            </Col>
          </Row>
        </Container>
		
		    
      </div>
    );
  }
}

export default Profileaboutus;
