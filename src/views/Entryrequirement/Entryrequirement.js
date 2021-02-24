import React, { Component } from 'react';
import { Link  , Redirect } from 'react-router-dom';
import { Label, Button, Card, CardBody, CardHeader, FormGroup,ListGroup,ListGroupItem, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config.json';

var baseurl = `${config.baseurl}/`;
//API Base Url

function submitForm(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`storeentryrequirement`,
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


class Entryrequirement extends Component {

  constructor(props) {
    super(props);

	this.onSubmit = this.onSubmit.bind(this);
	this.onSubmit1 = this.onSubmit1.bind(this);
    this.state = {
		layout: 'normal',
		description:'',
		url: '',
		upload_photo: [],
		fileLength: '',
		errors: {
		description: '',
		url: '',
		entryid: '',
		fileLength: '',
		},
		
		//for subsection start
		university_id: '',
		layout: 'normal',
		heading: '',
		id:'',
		sub_heading: '',
		description1 :'',
		upload_photo: [],
		schemas: [],
	    schemas_id: [],
	    imgfile: '',
		imgfile1: '',
		formData: new FormData()
    };
	
	 var universityid = localStorage.getItem('universityid');
	 var type= "entryrequirement";
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
  
 // for subsection saving and validation start
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
	    this.setState({ showhide:  false });	
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
    this.state.formData.append("subsection_type", "entryrequirement");
    this.state.formData.append("heading", this.state.heading);
    this.state.formData.append("layout", this.state.layout);
    this.state.formData.append("sub_heading", this.state.sub_heading);

   submitForm1("multipart/form-data", this.state.formData, (msg) => { toast.success(msg.message);  setTimeout(function () { 
        window.location.reload(true); 
      }, 5000);
	  }, 'aboutsubsection');
    
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() });
  }
  // for subsection saving and validation end

  onFileChange = (event) => {
		// this.setState({
		// 	upload_photo: event.target.files[0]
    // });
    this.setState({fileLength: event.target.files.length});
    if(event.target.files.length < 3 ){
      for(let i = 0; i < event.target.files.length; i++) {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
      }
    }
	}
	
	 // // for profile saving and validation start
      componentDidMount() {
		var id  = localStorage.getItem('universityid'); 
		
		 
		 axios.get(baseurl+'getentryrequirement/'+id).then(response => {
			if((response.data.length > '0') ) {
		  this.setState({ entryid: response.data[0].id,description: response.data[0].description,url: response.data[0].url,imgfile: response.data[0].filename });
			}
         })
	  this.setState({ showhide: true }); 
	
        }
		
		
  onClick = e => {
	  //alert();
    e.preventDefault();
    this.setState({ showhide:  false });
	this.setState({ id: '' });
	this.setState({ heading: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description1: '' });
	this.setState({ imgfile1: '' });
	this.setState({ errors: '' });
  };
  
  onClick1 = e => {
	  //alert("1");
    e.preventDefault();
    this.setState({ showhide:  true });
  };
  
  onClickdelete = e => {
   var university_id = localStorage.getItem('universityid');
   
      axios.post(
				baseurl+'deleteimage',
					{
					university_id: university_id,
					type: "entryrequirement",
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
  
  handleDescriptionChange = event => {
    this.setState({description: event.target.value});
  }

  handleurlChange = event => {
    this.setState({url: event.target.value});
  }

validate = () => {
  const errors = {};
	   if(this.state.description === '' || (!this.state.description ))
		{
		errors.description = 'Description is required';
		}
		
		if(this.state.url === '' || (!this.state.url ))
		{
		errors.url = 'URL is required';
		}
		
	
  if(this.state.fileLength > 1){
    errors.fileLength = "Maximum 1 Files Only Allowed to Upload";
  }
  return Object.keys(errors).length === 0 ? null : errors;
};

  onSubmit = e => {
    e.preventDefault()
   
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
   
    
    this.state.formData.append("entryid", this.state.entryid);
    this.state.formData.append("university_id", localStorage.getItem('universityid'));
    this.state.formData.append("description", this.state.description);
    this.state.formData.append("url", this.state.url);


    submitForm("multipart/form-data", this.state.formData, (msg) => {toast.success(msg.message);}, 'entryrequirement');
    
    // console.log(this.state.formData);
  		
    //this.setState({ description: '' });
    //this.setState({ url: '' });
    //this.setState({ upload_photo: '' });
    this.setState({ errors: '' }); 
    this.setState({ formData: new FormData() });
	}
	
	render() {
	 const { showhide } = this.state;
	console.log(this.state.showhide);
    return (
      <div className="entry-box" >
        <Container>

          <Row>
		  { showhide 
             ? 
          
            <Col md="9">
            <Form encType="multipart/form-data">
              <CardGroup className="custom_group">
                <Card className="uni-right-card">
                <CardHeader>
                      <strong>Description</strong>
                    </CardHeader>
                  <CardBody>
                     <Input type="hidden" name="entryid" className="form-control"  value={this.state.entryid} onChange={this.handleIdChange} />
                    <FormGroup className="uni-para-content">
                    <Input type="hidden" name="university_id" value={this.state.university_id} />
                    <Input type="textarea" maxLength="5000" rows="20" id="description" name="description" value={this.state.description} onChange={this.handleDescriptionChange} />
                       
                      </FormGroup>
                         <h6 style={{color: 'red'}}>{this.state.errors.description}</h6>
                      
                     
                      <div className="row">
                      <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
                      <InputGroup className="mb-4">
                        <Label className="url-label" for="url">Do You Have URL Link For Entry Requirements?</Label>
                        <Input type="text" maxLength="255" name="url" id="url" placeholder="https://www.deakin.edu.au/courses/how-to-apply/international-students" className="form-control url-control" value={this.state.url} onChange={this.handleurlChange}/>
                      </InputGroup>
					            <h6 style={{color: 'red'}}>{this.state.errors.url}</h6>
                        </div>
                        <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
                        <InputGroup className="mb-4">
                          <Label  className="photos-label"> Upload photos </Label>
						  
                        <Input type="file" accept="image/*" multiple onChange={this.onFileChange} name="upload_photo[]" />
                      </InputGroup>
                      <h6 style={{color: 'red'}}>{this.state.errors.fileLength}</h6>
                        </div>
                        </div>
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
                    
                    
                      <div className="d-flex justify-content-end">
                      <Button color="primary" onClick={this.previewbtn} className="prview-btn">Preview</Button>
                      <Button color="success" onClick={this.onSubmit.bind(this)} className="px-4 save-btn">Save</Button>
                   </div>
                    
                  </CardBody>
                </Card>
              </CardGroup>
              </Form>
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
					  <span className="card-list-head"><strong class='add'> <a onClick={this.onClick1}>Entry Requirement</a></strong></span>
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
          </Row>
        </Container>	
				
         
      </div>
    );
  }
}

export default Entryrequirement;
