import React, { Component } from 'react';
import { Link  , Redirect } from 'react-router-dom';
import { Label, Button, Card, CardBody, CardHeader, FormGroup,ListGroup,ListGroupItem, CardGroup,Modal,ModalBody,ModalFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config.json';
/*
import deleteicon from '../../assets/img/university/delete_icn.svg';
import Logicon from '../../assets/img/university/log-icon.svg';
import Loggicon from '../../assets/img/university/log-gray-icon.svg';
import Penicon from '../../assets/img/university/pen-icon.svg';
import Closebtn from '../../assets/img/close-btn.svg';*/
import PdfIcon from '../../assets/img/pdf.png';
import DocIcon from '../../assets/img/document.png';
import Pricon from '../../assets/img/student/folder-icon.svg';
import Mailcon from '../../assets/img/student/folder-icon-mail.svg';
import Bluefolder from '../../assets/img/student/blue-folder.svg';
import Redfolder from '../../assets/img/student/red-folder.svg';
import Grayfolder from '../../assets/img/student/gray-folder.svg';
import './style.css';
import $ from "jquery";
// import 'video-react/dist/video-react.css'; 
// import { Player } from 'video-react';
import ReactPlayer from 'react-player'
var baseurl = `${config.baseurl}`;
var baseurl_loc = `${config.baseurl_loc}`;
var baseurl_file = `${config.baseurl_file}`;
//API Base Url



class Librarygre extends Component {

  constructor(props) {
    super(props);


    this.state = {
		large: false,
		errors: {},
		folders:[],
		files:[],
		original_files:[],
		filesext:[],
		folders_id:[],
		formData: new FormData()
    };
	
	var param = localStorage.getItem('universityid');	
	axios.get(baseurl_loc+'getGreLibrary/2/2').then(response => {	
		console.log(response);
         this.setState({
					folders: response.data.folders,
				   files: response.data.files,
				   original_files: response.data.original_files,
                   filesext: response.data.filesext,
                   folders_id: response.data.folders_id,
				   });
		 })
		
  }
  handleClick = param => e => {
	axios.get(baseurl_loc+'getLibraryFiles/'+param).then(response => {	
		console.log(response);
         this.setState({
				   files: response.data.files,
				   original_files: response.data.original_files,
                   filesext: response.data.filesext,
				   });
		 })
}

getFiles(schema,ext,original_files) 
{ 
	if(ext == "image")
	{
	return <div className="col-md-4 col-lg-4 col-xl-4 lib-box mt-3">
					   <div class="media-lib">
						<a href={baseurl_file+'Library/'+schema} download><img class="mr-3" src={baseurl_file+'Library/'+schema} alt="file name"/></a>
						<div class="media-body">
						<a  href={baseurl_file+'Library/'+schema} target="_blank" id='down_img' ><h5 class="mt-0">{original_files}</h5></a>
						</div>
						</div>
					</div>
	}
	if(ext == "pdf")
	{
		return <div className="col-md-4 col-lg-4 col-xl-4 lib-box mt-3">
					   <div class="media-lib">
						<img class="mr-3" src={PdfIcon} alt="file name"/>
						<div class="media-body">
						<a  href={baseurl_file+'Library/'+schema} target="_blank" id='down_img' ><h5 class="mt-0">{original_files}</h5></a>
						</div>
						</div>
					</div>

	}
	if(ext == "video")
	{
		return <div className="col-md-4 col-lg-4 col-xl-4 lib-box mt-3">
		<div class="media-lib">
		<ReactPlayer class="mr-3" controls url={baseurl_file+'Library/'+schema} width="300" height="100"/>
		
		 <div class="media-body">
		<h5 class="mt-0">{original_files}</h5>
		 </div>
		 </div>
	 </div>

	}
	else
	{
		return <div className="col-md-4 col-lg-4 col-xl-4 lib-box mt-3">
					   <div class="media-lib">
						<a href={baseurl_file+'Library/'+schema} download><img class="mr-3" src={DocIcon} alt="file name"/></a>
						<div class="media-body">
						<a  href={baseurl_file+'Library/'+schema} target="_blank" id='down_img' ><h5 class="mt-0">{original_files}</h5></a>
						</div>
						</div>
					</div>
	}

}

validate() {
     const errors = {};
	 var minmax = /^.{0,15}$/
				
	 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	     const email = this.state.emailst;
	 if(this.state.name_st === ''){
	 errors.name_st = 'Name is required';
	 }else if(this.state.lastname_st === ''){
	 errors.lastname_st = 'Last Name is required';
	 }else if(this.state.emailst === ''){
	 errors.emailst = 'Email is required';
     }else if(!email.match(re)) {
	 errors.emailst = 'Invalid email';
     }else if(this.state.account_type_st === '') {
	 errors.account_type_st = 'Select campus';
     }else{
		this.onSubmit(); 
	 }  
	 
	 
   	 this.setState({ errors });
};
onSubmit() {
  // e.preventDefault()
   
   this.setState({large: false});
   var id = this.state.id_st;
   var name = this.state.name_st;
   var email = this.state.emailst; 
   var phone = this.state.phone_st;
   var lastname = this.state.lastname_st;
   var account_type = this.state.account_type_st;
   var university_id = localStorage.getItem('universityid');
  
				
		const products ={
					id: id,
					name: name,
					email: email,
					account_type: account_type,
					lastname: lastname,
					university_id:university_id
					}	
		let uri = baseurl+'/update_invites';
		const post = axios.post(uri, products).then((response) => {
		if(response.data.status_code =="200")
		{
		
		toast.success(response.data.message);
		setTimeout(function () 
		{ 
		window.location.reload(true);

		}, 3000);
		}
		else
		{
			toast.error(response.data.message);  
		}
		});

   
  
}



	render() {
		const { errors } = this.state;
	 const { showhide } = this.state;
	console.log(this.state.showhide);
    return (
      <div className="entry-box invite-box staff-page pt-5 pb-4 bg-white lib-box" >
	   
        <Container>
		<ToastContainer />
          <Row>
		  <Col xs="12" sm="12" xl="3" md="12" lg="3" >
              <Card className="uni-left-card">
                <CardBody>
                <ListGroup className="left-list">
                   <Link to="Librarygeneral"><ListGroupItem>General Resources</ListGroupItem></Link>
					<Link to="Libraryielts"><ListGroupItem >IELTS</ListGroupItem></Link>
					<Link to="Librarygmat"><ListGroupItem >GMAT</ListGroupItem></Link>
					<Link to="Librarygre"><ListGroupItem >GRE</ListGroupItem></Link>
                </ListGroup>
                </CardBody>
              </Card>
			  <Card className="uni-left-card mt-3 lib-left">
                <CardBody>
                <ListGroup className="left-list">
                   <Link to="Librarygeneral"><ListGroupItem>Video Tutoring Resources</ListGroupItem></Link>
					<Link to="Libraryieltsvid"><ListGroupItem>IELTS</ListGroupItem></Link>
					<Link to="Librarygmatvid" ><ListGroupItem className="active">GMAT</ListGroupItem></Link>
					<Link to="Librarygrevid"><ListGroupItem >GRE</ListGroupItem></Link>
                </ListGroup>
                </CardBody>
              </Card>

            </Col>
			<Col xs="12" sm="12" xl="9" md="12" lg="9">
              <Card className="uni-right-card lib-right-box">
                <CardBody>
					<div className="row">
						<div class="col-sm-10 lib-add my-4">
							<h4 class="d-inline-block pr-md-5 pr-3">Documents</h4>
						</div>
					</div>
				<div className="row">
					<div className="col-12">
                           <label className="card-label">folders</label>
					</div>
					
					{this.state.folders.map((schema, index) => ( 
                    <div className="col-md-4 col-lg-4 col-xl-4 lib-box">
					<div class="media" onClick={this.handleClick(this.state.folders_id[index])}>
					 <img class="mr-3" onClick={this.handleClick(this.state.folders_id[index])} src={Pricon} alt="file name" />
					 <div class="media-body" onClick={this.handleClick(this.state.folders_id[index])}>
						 <h5 class="mt-0" onClick={this.handleClick(this.state.folders_id[index])}>{schema}</h5>
					 </div>
					 </div>
				 </div>
					))}

				</div>
				<div className="row mt-4">
					<div className="col-12">
                           <label className="card-label">files</label>
					</div>
					{this.state.files.map((schema, index) => ( 
						this.getFiles(schema,this.state.filesext[index],this.state.original_files[index])

					

					))}

					

				</div>
				</CardBody>
			</Card>
			</Col>
          </Row>
        </Container>	
			
      </div>
    );
  }
}

export default Librarygre;
