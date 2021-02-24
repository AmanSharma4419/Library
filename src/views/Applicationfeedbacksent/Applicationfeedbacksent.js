import React, { Component } from 'react';
import { Link  , Redirect } from 'react-router-dom';
import { Label, Button, Card, CardBody, CardHeader, FormGroup,ListGroup,ListGroupItem, CardGroup,Modal,ModalBody,ModalFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config.json';
import backarrow from '../../assets/img/university/back_arrow.svg';
import Offerletter from '../../assets/img/offer-letter.jpg';
import deakinlogo from '../../assets/img/university/deakin_logo.jpg';
import downloadicon from '../../assets/img/university/download.png';

// Files required for multidownload
import JSZip from 'jszip';
import JSZipUtils from "jszip-utils";
import saveAs from 'save-as';

import './style.css';
import $ from "jquery";
import { element } from 'prop-types';
var baseurl = `${config.baseurl}`;
//API Base Url

//Download multiple file funcitonality
global.jQuery = require('jquery')
require('jquery-multidownload')

//for subsection store 
function submitForm1(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`/insertdocument`,
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

// Multiple file download functionality
function multipleFileDownloadZip(files){  
	var zip = new JSZip();
	var count = 0;
	var zipFilename = "Application feedbac doc.zip";

	files.forEach(function({link, name}){
	  var filename = "filename.jpeg";
	  // loading a file and add it in a zip file
	  JSZipUtils.getBinaryContent(link, function (err, data) {
		 if(err) {
			throw err; // or handle the error
		 }
		 zip.file(name, data, {binary:true});
		 count++;
		 if (count == files.length) {
		   zip.generateAsync({type:'blob'}).then(function(content) {
			  saveAs(content, zipFilename);
		   });
		}
	  });
	});
}  

class Applicationfeedbacksent extends Component {

  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
	this.onSubmit1 = this.onSubmit1.bind(this);

    this.state = {
		university_id: '',
		docdetails:[],
		checkrecords: [],
		totalrecords:'',
		fileLength:'',
		disabled:localStorage.getItem("fromApplicationType")==="Sent"?true:false,
		opt:'',
		universitydetails:[],
		coursedetails:[],
		docname: [],
		docid: [],
		optionid: [],
		formData: new FormData()

    };
	//alert(localStorage.getItem('studentid'));
	
	
   var param = localStorage.getItem('applicationid');

	
	 axios.get(baseurl+'/getapppersonal/'+localStorage.getItem('applicationid')).then(response => 
		{
      		console.log(response);
      		this.setState({
				 universitydetails: response.data.universitydetails,
				 coursedetails: response.data.coursedetails,
				});
    	})
	
	axios.get(baseurl+'/get_requireddoc/'+param).then(response => {	
		 //alert(response.data.length);
		 console.log("req-doc", response);
		 let doc_items = response.data.docdetails.filter(obj => obj.optionid == 3 || obj.optionid == 2);
		 let checkrecords_items = [];
		 if (response.data.checkrecords.length > 0){
			response.data.checkrecords.filter(e => e !== null).forEach(elem => {
				console.log('check-item', elem);
			   let doc_item = doc_items.filter(d => elem.docid === d.id);
			   elem["optionid"] = doc_item[0].optionid;
			   checkrecords_items.push(elem);
			});

			this.setState({checkrecords: checkrecords_items.sort((a,b)=> b.optionid-a.optionid),});

			console.log("check-records", checkrecords_items);
		 }


        if((response.data.totalrecords > '0')) {
			
         this.setState({
                   docdetails: doc_items,
				   totalrecords: doc_items.length - checkrecords_items.length,
				   });

		console.log(typeof this.state.checkrecords, this.state.checkrecords);
		 }else{
			this.setState({ totalrecords: 0,  });
		 }
        })
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

backbtn() {
	  window.location.href= "/#/sendapplicationinprocess";
}

onFileChange1 = param => event => {
	//hide missing icon after adding file
	if (event.target.files.length > 0) {
		$(event.target).parent().parent().children("td")[2].innerHTML = "";
	}

	this.setState({fileLength: event.target.files.length});
    if(event.target.files.length < 3 ){
      for(let i = 0; i < event.target.files.length; i++) {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
        this.state.formData.append("docid[]", param);
      }
    }
	}
	
	
  onSubmit1 = e => {
  // e.preventDefault()
   
  //console.log(this.state.formData);
  this.state.formData.append("studentid", localStorage.getItem('studentid'));
  this.state.formData.append("applicationid", localStorage.getItem('applicationid'));
  
  submitForm1("multipart/form-data", this.state.formData, (msg) => { toast.success(msg.message);  setTimeout(function () { 
        window.location.reload(true); 
      }, 5000); }, 'savedocument');
	  
  }


	multiFilesDownload = e => {
		e.preventDefault();
		const filesInfo = [];
		this.state.checkrecords.map(({filename, orgfilename}) => {
			// let link = URL.createObjectURL(new Blob([baseurl + filename], {type: 'text/plain'}));
			let fileName = orgfilename;
			let fileLink = filename;
			let fileDetail = {
				link: fileLink,
				name: fileName,
			}
			filesInfo.push(fileDetail);
		});
		console.log("download btn is clicked", filesInfo);
		multipleFileDownloadZip(filesInfo)	
	}

	render() {
		const imgpath = `${config.baseurl}`;
		const { errors } = this.state;
		const { showhide } = this.state;
    return (
       <div className="foe-studen-container  app-feedback-page pt-5">
        <div className="foe-student-box pt-5">
	    <ToastContainer/>
        <Container>
		<Row>
                <Col xs="12" sm="12" xl="8" md="8" lg="8" className="mx-auto" >
			<div className="row mb-3">
			<div className="col-md-2 col-lg-2">
			            <div className="mb-4"> <a onClick={this.backbtn} className="col-12 backarrow mt-3" style={{cursor:"pointer"}} ><span className="pr-1"> <img src={backarrow} alt="" /></span> Back </a></div>
				</div>
				<div className="col-md-9 col-lg-9">
				<h3 className="app-title">View Response</h3>
				</div>
			 </div>
			 <Card className="uni-right-card app-inprogress">
			       <div className="offer-header p-3">
					<Row>
						<div className="col-md-3">
						<img src={imgpath+this.state.universitydetails.logo_image} alt="" width="50px" />
						</div>
						<div className="col-md-9">
						{this.state.coursedetails.heading}
						</div>
					</Row>
					<Row className="mt-2">
						<div className="col-md-8">
						<p><b>Please attach files to complete your application</b></p>
						<span>* {this.state.totalrecords} requirements to be completed</span>
						</div>
						<div className=" text-right col-md-4 app-download" onClick = {this.multiFilesDownload}>
						<span>Download All</span>  <img src={downloadicon} alt="" width="14" />
						</div>
					</Row>
						<Row>
						<div class="card-body table-responsive univ-new-table">
							{this.state.docdetails.length > 0 ?
								<table class="draft-table table table-responsive-sm display nowrap dataTable dtr-inline collapsed">
								
								{this.state.docdetails.sort((a,b)=> b.optionid-a.optionid).map((docdetails, index) => (
								<tr>
									{
										docdetails.optionid == "3" ? (
											<td className="req-feild">Required</td> 
										): <td className="req-feild greyfield">Optional</td>
									}
								
								<td className="des-detail"><div><b>{docdetails.doc_name}</b></div>
								
								</td>
									{
										docdetails.optionid == "3" ? 
										(this.state.checkrecords[index] == "" || this.state.checkrecords[index] == undefined ? <td className="i-style"><span>i</span><div className="pt-1">Missing</div></td> : <td></td>) : <td></td>
									}
								
								{/*<td className="add-filebtn"><button class="btn btn-outline-primary">+ Add file</button></td>*/}
								<td className="add-filebtn">
									{
										this.state.checkrecords[index] !== undefined && this.state.checkrecords[index].orgfilename !== "" ? <span>
											<a
										href={
											baseurl +
											this.state.checkrecords[index].filename
										}
										target="_blank"
										download
									>
									{this.state.checkrecords[index].orgfilename}
									</a>
										</span>
										: 
										<Input type="file" id="about_upload_photo" name="upload_photo[]" accept="image/*" multiple onChange={this.onFileChange1(docdetails.id)} ref={ref=> this.fileInput = ref}/>
									}
									
									
									</td>
								</tr>
	
								
	
								  ) ) }
							</table>
							: null}
	
							{/* Download links for attachments */}
							<div id="download-links" className="d-none"></div>
						</div>
						</Row>
					{
						this.state.totalrecords !== 0 ? <Button color="success" onClick={this.onSubmit1.bind(this)}  className="px-4 save-btn">Save</Button> : null
					}				
					
				   </div>
				   
				   
			 </Card>
			</Col>
          </Row>
        </Container>	
		</div>	
      </div>
    );
  }
}

export default Applicationfeedbacksent;
