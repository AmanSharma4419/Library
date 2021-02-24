import React, { Component } from 'react';
import { Link  , Redirect , withRouter } from 'react-router-dom';
import { Button, Card, FormGroup, CardBody,CardHeader,ListGroup ,ListGroupItem, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import config from '../../config.json';
import { Scrollbars } from 'react-custom-scrollbars';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var baseurl = `${config.baseurl}`;

class Category extends Component {

  constructor(props) {
    super(props);

	this.onSubmit = this.onSubmit.bind(this);
    this.state = {
	  id :'',
	  heading :'',
	  sub_heading : '',
	  description : '',
	   schemas: [],
	   schemas_id: [],
    selectedTeam: "",
    validationError: "",
	planets: [],
	  errors:{}
    };
	
	var param = localStorage.getItem('universityid');	
	axios.get(baseurl+'/get_categories/'+param).then(response => {
		console.log(response);
         this.setState({
                   schemas: response.data.heading,
                   schemas_id: response.data.id
               });
        })
		
  }
  
 
 handleChange = param => e => {
   axios.get(baseurl+'/get_category/'+param).then(response1 => {
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
  
handleHeadingChange = event => {
	this.setState({heading: event.target.value});
}
handleIdChange = event => {
	this.setState({id: event.target.value});
}

handleSubHeadingChange = event => {
	this.setState({sub_heading: event.target.value});
}

handleDescriptionChange = event => {
	this.setState({description: event.target.value});
}
validate = () => {
     const errors = {};
	 if(this.state.heading.trim() === '')
		{
			errors.heading = 'Heading is required';
		}
		if(this.state.sub_heading.trim() === '')
		{
			errors.sub_heading = 'Sub Heading is required';
		}
		if(this.state.description.trim() === '')
		{
			errors.description = 'Description is required';
		}
   	 return Object.keys(errors).length === 0 ? null : errors;
};



 onSubmit = e => {
   e.preventDefault()
   
	const errors = this.validate();
	this.setState({ errors });
	if (errors) return;
   
    const products = {
           
			  id : this.state.id,
			  sub_heading : this.state.sub_heading,
              heading : this.state.heading,
              description : this.state.description,
              program_coordinator_id : 1,
              university_id : localStorage.getItem('universityid')
        
		}
		
		  let uri = baseurl+'/store_category';
       // alert(" successfully !..");
      const post = axios.post(uri, products).then((response) => {
      if(response.data.status_code =="200")
	  {
      toast.success(response.data.message);
      
      setTimeout(function () { 
        window.location.reload(true); 
      }, 5000);

		  //window.location.reload();
	  }
	  else
	  {
      toast.success(response.data.message);  
	  }
      });


		
	this.setState({ id: '' });
	this.setState({ heading: '' });
	this.setState({ sub_heading: '' });
	this.setState({ description: '' });
	this.setState({ errors: '' }); 
	
	
	}
	componentDidMount() {
    fetch(baseurl+'/get_categories')
      .then(response => response.json())
      .then(json => this.setState({ users: json.data }));
  }
	
	render() {
	const { errors } = this.state;
	console.log(this.state.schemas);
    return (
      <div className="category-box" >
        <Container>
<ToastContainer/>
          <Row>
            <Col md="9">
              <CardGroup className="custom_group">
                <Card className="uni-right-card">
                  <CardBody>
                    <Form>
      <div className="row">
        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
              <InputGroup className="mb-3">
                       <label className="card-label">Add heading</label>
                        <Input type="hidden" name="id" className="form-control"  value={this.state.id} onChange={this.handleIdChange} />
                        <Input type="text" name="heading" className="form-control" placeholder="Heading" value={this.state.heading} onChange={this.handleHeadingChange} />
              </InputGroup>
              <h6 style={{color: 'red'}}>{errors.heading}</h6>
        </div>
        <div className="col-xl-6 col-md-6 col-sm-6 col-lg-6 col-12 card-from-group">
        <InputGroup className="mb-4">
        <label className="card-label">Add sub - heading</label>
                  
                        <Input type="text" name="sub_heading" className="form-control" placeholder="Sub Heading" value={this.state.sub_heading} onChange={this.handleSubHeadingChange}/>
                      </InputGroup>
					  <h6 style={{color: 'red'}}>{errors.sub_heading}</h6>
        </div>

        <div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group-text">
        <InputGroup className="mb-4">
        <label className="card-label">Description</label>
                        <textarea rows="3" cols="100" width="100%" name="description" placeholder="Add your description" value={this.state.description} onChange={this.handleDescriptionChange}/>

                      </InputGroup>
					  <h6 style={{color: 'red'}}>{errors.description}</h6>
        </div>
<div className="col-xl-12 col-md-12 col-sm-12 col-lg-12 col-12 card-from-group">
<FormGroup>
<label className="card-label">Assign Program Coordinator</label>              
                              <div class="btn-group">
                                  <button type="button" class="btn btn-secondary">Dr Kelly Anne</button>
                                  <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-expanded="false" data-reference="parent">
                                   <i class="fa fa-angle-down"></i>
                                  </button>
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                    <a class="dropdown-item">Dr Kelly</a>
                                    <a class="dropdown-item">Dr Anne</a>
                                  
                                  </div>
                            </div>
                            </FormGroup>
</div>
      </div>
    <Row className="uni-drag-drop">
                      <Col xs="12">
                      
         
                      </Col>
                      </Row>
                      <Row className="uni-no-mar">
                        <Col xs="12">
                          <Button color="primary"  type="submit" onClick={this.onSubmit.bind(this)} className="px-4 float-md-right save-btn">Save</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
			
			<Card className="col-md-3 list-card uni-no-padd">
					  <CardHeader className="card-list-header"> 
						<span className="card-list-head" onClick={this.handleClick('hi')}><strong class='add'> + Add Subsection</strong></span>
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
						</ListGroup>
					  </CardBody>
					</Card>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Category;
