import React, { Component } from "react";
import { Link  , Redirect } from 'react-router-dom';
import { Badge,  Button,  Card,  CardBody,  CardFooter,  CardHeader,  Col,  Collapse,  DropdownItem,  DropdownMenu,
  DropdownToggle,  Fade,  Form,  FormGroup,  FormText,  FormFeedback,  Input,  InputGroup,  InputGroupAddon, 
  InputGroupButtonDropdown,  InputGroupText,  Label, ListGroup,ListGroupItem, CardGroup ,Row,  Container,  TabContent,  TabPane,  Nav,  
  NavItem,  NavLink } from "reactstrap";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import config from '../../config.json';
import { Scrollbars } from 'react-custom-scrollbars';
var baseurl = `${config.baseurl}/`;


// API Call Url //
function submitForm(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`storeuniversityfacility`,
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

/*
//for student
function submitFormstudent(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`storeuniversityfacilitystudent`,
  method: 'POST',
  data: data,
  headers: {
    'Content-Type': contentType
  }
  }).then((response) => {
  setResponse(response.data);
  //console.log(response.data);
  //window.location.reload(false);

  setTimeout(function () { 
   window.location.reload(true); 
 }, 4000);

  }).catch((error) => {
  setResponse("error");
  })
}

//for university
function submitFormuniversity(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`storeuniversityfacilityuniversity`,
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
  */

class Facilities extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    //this.onSubmituniversity = this.onSubmituniversity.bind(this);
    //this.onSubmitstudent = this.onSubmitstudent.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      description : '',
      classrooms : '',
      sportsfacilities : '',
      imgfile : '',
      errors:{},
      formData: new FormData(),
      upload_photo: [],
      fileLength: '',
	  showsubsection: true,
	  showuniversity:false,
	  showstudent:false,
    
	  //for subsection start
	  university_id: '',
      layout: '',
      heading: '',
	  id:'',
      sub_heading: '',
      description1 :'',
	  schemas: [],
	  schemas_id: [],
      upload_photo: [],
	  
	  //for university
	  //descriptionuniversity:'',
	  //imgfileuniversity:'',
	  
	  //for student
	  //descriptionstudent:'',
	  //imgfilestudent:'',
	  universityfacilityid:'',
	  studentid:'',
	  facilityid:'',
    };


    this.getFacilitydata();
    //this.getFacilitystudentdata();
    //this.getFacilityuniversitydata();
	
	//get subsection module start
	 var universityid = localStorage.getItem('universityid');
	 var type= "facility";
	  axios.get(baseurl+'getsubsection/'+universityid+'/'+type).then(response => {
         this.setState({
                   schemas: response.data.heading,
                   schemas_id: response.data.id
               });
        })
    //get subsection module end   

  }
  
  previewbtn(){	
    window.location.href= "/#/viewus";
  }
  
//------------------------ for subsection saving and validation start  ------------------------------//
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
	    this.setState({ showsubsection:  false });	
	    this.setState({ showstudent:  false });	
	    this.setState({ showuniversity:  false });	
	    e.preventDefault();
		document.querySelector('li.active').classList.remove('active');
		e.target.className = "list-group-item active";
	  
};


 handleClick = param => e => {
    this.setState({ id: '' });
	this.setState({ heading: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description1: '' });
	this.setState({ imgfile1: '' });
	this.setState({ errors: '' });
	
}
 
 


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
    this.state.formData.append("subsection_type", "facility");
    this.state.formData.append("heading", this.state.heading);
    this.state.formData.append("layout", this.state.layout);
    this.state.formData.append("sub_heading", this.state.sub_heading);

   submitForm1("multipart/form-data", this.state.formData, (msg) => { toast.success(msg.message);  setTimeout(function () { 
        window.location.reload(true); 
      }, 5000); }, 'aboutsubsection');
    
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() });
  }
  //------------------- for subsection saving and validation end--------------------------------------------------//
  
  
  //------------------------for university ---------------------------//
  
 /* 
 handleDescriptionuniChange = (event) => {
    this.setState({ descriptionuniversity: event.target.value });
  };

  
  onFileuniversityChange = (event) => {
    this.setState({fileLength: event.target.files.length});
    if(event.target.files.length < 3 )
    {
      for(let i = 0; i < event.target.files.length; i++) 
      {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
      }
    }
  }


  validateuniversity = () => {
    const errors = {};
    if($("#descriptionuniversity").val().trim() === '')
    {
      errors.descriptionuniversity = 'Description is required';
    }

    return Object.keys(errors).length === 0 ? null : errors;
};

  
  onSubmituniversity = (e) => {
    e.preventDefault();

    const errors = this.validateuniversity();
    this.setState({ errors });
    if (errors) return;

    this.state.formData.append("description", this.state.descriptionuniversity);    
    this.state.formData.append("university_id", localStorage.getItem('universityid'));
    
    submitFormuniversity("multipart/form-data", this.state.formData, (msg) => toast.success(msg.message), 'university');

    //this.setState({ descriptionuniversity: '' });
    //this.setState({ imgfileuniversity: '' });
    this.setState({ upload_photo: '' });
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() });
   
  };
  
  //------------------------for university end ------------------------------------//
  
  //------------------------for student start ---------------------------------------//
  
   
 handleDescriptionstuChange = (event) => {
	// alert();
    this.setState({ descriptionstudent: event.target.value });
  };

  
  onFilestuChange = (event) => {
    this.setState({fileLength: event.target.files.length});
    if(event.target.files.length < 3 )
    {
      for(let i = 0; i < event.target.files.length; i++) 
      {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
      }
    }
  }


  validatestudent = () => {
    const errors = {};
    if($("#descriptionstudent").val().trim() === '')
    {
      errors.descriptionstudent = 'Description is required';
    }
    return Object.keys(errors).length === 0 ? null : errors;
};

  
  onSubmitstudent = (e) => {
    e.preventDefault();

    const errors = this.validatestudent();
    this.setState({ errors });
    if (errors) return;
	
	//alert(this.state.descriptionstudent);

    this.state.formData.append("description", this.state.descriptionstudent);    
    this.state.formData.append("university_id", localStorage.getItem('universityid'));
    
    submitFormstudent("multipart/form-data", this.state.formData, (msg) => toast.success(msg.message), 'university');

    //this.setState({ descriptionstudent: '' });
    //his.setState({ imgfilestudent: '' });
    this.setState({ upload_photo: '' });
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() });
   
  }; */
  
  //--------------------------------------- student end --------------------------------------------//
  
 
 getFacilitydata()
  {
	  
    axios.get(baseurl+'get_facility/'+localStorage.getItem('universityid')+'/main').then(response => {
      if((response.data.length > '0') ) 
      { 
          this.setState({
			  facilityid:response.data[0].id,
              description: response.data[0].description,
              classrooms: response.data[0].no_of_classrooms,
              sportsfacilities: response.data[0].sports_facilities,
              imgfile: response.data[0].filename
             });
      }

      })

   }
   
   //student data
 /*   getFacilitystudentdata()
  {
	  
    axios.get(baseurl+'get_facility/'+localStorage.getItem('universityid')+'/student').then(response => {
      console.log(response);
      //alert(response.data.length);
      if((response.data.length > '0') ) 
      { 
          //alert(response.data[0].description);
          this.setState({
			  studentid:response.data[0].id,
              descriptionstudent: response.data[0].description,
              imgfilestudent: response.data[0].filename
             });
      }
      })
   }
   
    //university data
    getFacilityuniversitydata()
  {
	  
    axios.get(baseurl+'get_facility/'+localStorage.getItem('universityid')+'/university').then(response => {
      console.log(response);
      if((response.data.length > '0') ) 
      { 
          this.setState({
			  universityfacilityid: response.data[0].id,
              descriptionuniversity: response.data[0].description,
              imgfileuniversity: response.data[0].filename
             });
      }

      })

   }   */

    
//------------------------------for facility validation start -------------------------------------------//

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
    this.setState({fileLength: event.target.files.length});
    if(event.target.files.length < 3 )
    {
      for(let i = 0; i < event.target.files.length; i++) 
      {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
      }
    }
  }
  
  //---------------------delete --------------------------------//
  onClickdelete = e => {
   var university_id = localStorage.getItem('universityid');
   var university_id = localStorage.getItem('universityid');
   
      axios.post(
				baseurl+'deleteimage',
					{
					university_id: university_id,
					type: "facility",
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


  validate = () => {
    const errors = {};

    if($("#txtdescription").val().trim() === '')
    {
      errors.description = 'Description is required';
    }
    if($("#txtclassrooms").val().trim() === '')
    {
      errors.classrooms = 'No.of Classrooms is required';
    }
    if($("#sports_facilities").val().trim() === '--Select--')
    {
      errors.sportsfacilities = 'Sports Facilities is required';
    }
    if(this.state.fileLength > 2)
    {
      errors.fileLength = "Maximum 2 files are allowed to upload";
    }
    return Object.keys(errors).length === 0 ? null : errors;
};

   onClickuniversity = e => {
		this.setState({ showuniversity:  true });
		this.setState({ showstudent:  false });	  
		this.setState({ showsubsection:  false });	  
   }
   
   onClickstudent = e => {
		this.setState({ showstudent:  true });
		this.setState({ showuniversity:  false });
		this.setState({ showsubsection:  false });
   }

	onClick = e => {
	//alert();
	e.preventDefault();
	this.setState({ showsubsection:  false });
	this.setState({ showstudent:  false });
	this.setState({ showuniversity:  false });
	this.setState({ id: '' });
	this.setState({ heading: '' });
	this.setState({ layout: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description1: '' });
	this.setState({ imgfile1: '' });
	this.setState({ errors: '' });
	};
	
	
  onClick1 = e => {
	  //alert("1");
    e.preventDefault();
    this.setState({ showsubsection:  true });
    this.setState({ showstudent:  false });
    this.setState({ showuniversity:  false });
  };
  
  //for main facility
  onClickdeletefacility = e => {
   var university_id = localStorage.getItem('universityid');
   var facilityid = this.state.facilityid;
  // alert(facilityid);
      axios.post(
				baseurl+'deleteimagefacility',
					{
					university_id: university_id,
					facilityid: facilityid,
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
  
   //for university facility
  onClickdeletefacilityuniversity = e => {
   var university_id = localStorage.getItem('universityid');
   var facilityid = this.state.universityfacilityid;
  // alert(facilityid);
      axios.post(
				baseurl+'deleteimagefacility',
					{
					university_id: university_id,
					facilityid: facilityid,
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
  
   //for student facility
  onClickdeletestudent = e => {
   var university_id = localStorage.getItem('universityid');
   var facilityid = this.state.studentid;
  // alert(facilityid);
      axios.post(
				baseurl+'deleteimagefacility',
					{
					university_id: university_id,
					facilityid: facilityid,
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
  

  
  onSubmit = (e) => {
    e.preventDefault();


    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    this.state.formData.append("description", this.state.description);
    this.state.formData.append("classrooms", this.state.classrooms);
    this.state.formData.append("sportsfacilities", this.state.sportsfacilities);
    this.state.formData.append("university_id", localStorage.getItem('universityid'));
    
    submitForm("multipart/form-data", this.state.formData, (msg) => toast.success(msg.message), 'university');
   
    //this.setState({ description: '' });
    //this.setState({ classrooms: '' });
    //this.setState({ sportsfacilities: '' });
    this.setState({ imgfile: '' });
    this.setState({ errors: '' });
  };

//------------------------------------for facility validation end -------------------------------------------//



  render() {
    const { errors } = this.state;
	const { showsubsection } = this.state;
    return (
      <div className="animated fadeIn gray-bg-300">
	  
        <Container>
         
          <Row>
		    { showsubsection 
             ? 
			 
            <Col xs="9" >
                  <Card className="uni-right-card">
                    <CardHeader>
                      <strong>Description</strong>
                    </CardHeader>
                    <CardBody>
					 <Input type="hidden" name="facilityid" value={this.state.facilityid}/>
                    <FormGroup className="uni-para-content">
					       
                          <textarea class="form-control" ref="description" value={this.state.description} onChange={this.handleDescriptionChange} id="txtdescription" placeholder="" rows="20" required />
                          
                          
                      </FormGroup>
                      <h6 style={{color: 'red'}}>{errors.description}</h6>

                      <FormGroup row className="my-0">
                        <Col xs="6">
                          <FormGroup>
                            <Label className="uni-label" htmlFor="classrooms">NO.OF CLASSROOMS</Label>
                            <Input type="number" id="txtclassrooms" value={this.state.classrooms} onChange={this.handleClassroomChange} />
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{errors.classrooms}</h6>
                        </Col>
                        <Col xs="6">
                          <FormGroup>
                            <Label className="uni-label" htmlFor="sports_facilities">SPORTS FACILITIES</Label>
                              
                            <select onChange={this.handleSportsfacilitiesChange} class="custom-select my-1 mr-sm-3 form-control" id="sports_facilities">
                              <option vaule="" selected={'' == this.state.sportsfacilities}>--Select--</option>
                              <option value="1" selected={'1' == this.state.sportsfacilities}>1</option>
                              <option value="2" selected={'2' == this.state.sportsfacilities}>2</option>
                              <option value="3" selected={'3' == this.state.sportsfacilities}>3</option>
                              <option value="4" selected={'4' == this.state.sportsfacilities}>4</option>
                              <option value="5" selected={'5' == this.state.sportsfacilities}>5</option>
                            </select>
                            
                          </FormGroup>
                          <h6 style={{color: 'red'}}>{errors.sportsfacilities}</h6>
                        </Col>
                        
                      </FormGroup>

                     
                     <label for="inputPassword5">UPLOAD PHOTOS</label>
					 {/* <div class="my-4">{this.state.imgfile}</div>  */}
                      <FormGroup row>
                      
                        <Col xs="12" md="9">
                          <Input type="file" accept="image/*" multiple onChange={this.onFileChange} name="upload_photo[]" />
                        </Col>
						<div class="row remove-link mb-3 mx-0">
					  <div className="inline pr-3">{this.state.imgfile}</div>
					  { this.state.imgfile ?
					  <a onClick={this.onClickdeletefacility}>Remove</a>
					  : null
					  }
                      
					  </div>
                      </FormGroup>
                      <h6 style={{color: 'red'}}>{this.state.errors.fileLength}</h6>
                   
                      
                      <Row className="uni-drag-drop">
                      <Col xs="12">
                      
          <div class="upload-drop-zone" id="drop-zone">
            You can also drop your files here
          </div>
                      </Col>
                      </Row>
                      
                      {/*<Row className="uni-no-mar">
                      <Col xs="12">*/}
                      <Button color="primary" type="submit" onClick={this.onSubmit.bind(this)} className="px-4 float-md-right save-btn">
                        SAVE
                      </Button>
                      <Button color="primary" onClick={this.previewbtn} className="prview-btn px-4 float-md-right save-btn btn btn-primary">Preview</Button>
                      {/*</Col>
                      </Row> */}
                    </CardBody>
                  </Card>
               
            </Col>
			
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
                      <Button color="primary" onClick={this.previewbtn} className="prview-btn">Preview</Button>
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
					  <span className="card-list-head"><strong class='add'> <a onClick={this.onClick1}>Facilities</a></strong></span>
					  </CardHeader>
					  {/*<a className="btn btn-primary campus-btn my-4" data-toggle="tab" href="#Universityfacilities" role="tab"> University Facilities</a>
					  <a className="btn btn-primary campus-btn" data-toggle="tab" href="#Studentfacilities" role="tab"> Student Facilities </a>  
					  
					  <a className="btn btn-primary campus-btn my-4" onClick={this.onClickuniversity}> University Facilities</a>
					  <a className="btn btn-primary campus-btn" onClick={this.onClickstudent}> Student Facilities </a>  
                     */}
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

          </Row>
        </Container>
      </div>
    );
  }
}

export default Facilities;
