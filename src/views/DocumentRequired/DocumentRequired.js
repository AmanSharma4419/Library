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
var baseurl = `${config.baseurl}`;
//API Base Url

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
	var zipFilename = "Document-Required.zip";

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
		totalrecords:'',
		fileLength:'',
		disabled:localStorage.getItem("fromApplicationType")==="Sent"?true:false,
		opt:'',
		universitydetails:[],
		coursedetails:[],
		docname: [],
		docid: [],
		docid1: [],
		optionid: [],
		formData: new FormData()
    };
	//alert(localStorage.getItem('studentid'));
	//alert(localStorage.getItem('selectcoursedraft'));
	
   var param = localStorage.getItem('selectcoursedraft');

	

	 axios.get(baseurl+'/getapppersonal/'+localStorage.getItem('applicationid')).then(response => 
		{
      		console.log(response);
      		this.setState({
				 universitydetails: response.data.universitydetails,
				 coursedetails: response.data.coursedetails,
				});
    	})
  var univid = 	localStorage.getItem('universityid');
	axios.get(baseurl+'/get_documentlookup/'+ univid).then(response => {	
console.log('res',response);
        this.setState(
        {
          docname: response.data.doc_name,
		  docid: response.data.doc_id,
		   optionid: response.data.option_id,
        });
	})
  }

	componentDidMount() {
		axios.get(baseurl + '/documentsrequired_student/' + localStorage.getItem('applicationid')).then(response => {
			console.log('res1', response);
			this.setState(
				{
					docid1: response.data,
				});
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
	this.setState({fileLength: event.target.files.length});
    if(event.target.files.length < 3 ){
      for(let i = 0; i < event.target.files.length; i++) {
        this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
        this.state.formData.append("docid[]", param);
      }
	}
	console.log("docid", param, "files", event.target.files);
	console.log("docid formData", param, this.state.formData.getAll("upload_photo[]"), this.state.formData.getAll("docid[]"));
}
	
  onSubmit1 = e => {
  // e.preventDefault()
   
  //console.log(this.state.formData);
  this.state.formData.append("studentid", localStorage.getItem('studentid'));
  this.state.formData.append("applicationid", localStorage.getItem('applicationid'));
  
	  submitForm1("multipart/form-data", this.state.formData, (msg) => {
		  toast.success(msg.message);
		  setTimeout(function () {
			  window.location.reload(true);
		  }, 5000);
	  }, 'savedocument');
	  
  }
   
	handleDocumentLabel =  (opt, doc_name, index) => {
		let docid = this.state.docid[index];
		let universityid = localStorage.getItem("universityid");
		const uploadedFiles = this.state.docid1.filter(doc => doc.docid == docid);

		let optLabel = '';
		if (opt === "1") optLabel = "Hide";
		else if (opt === "2") optLabel = "Optional";
		else if (opt === "3") optLabel = "Required";
		console.log(optLabel);
		if (optLabel === "Hide") {
			// return (<tr><td>Hide</td></tr>);
			return;
		} else {
			return (
				<tr>
			{optLabel === 'Required' ? 
					<td className="req-feild">Required</td>
							:
					<td className="req-feild greyfield">Optional</td>
										}
					<td className="des-detail"><div><b> {doc_name}</b><b>({docid})</b><b>{universityid}</b></div></td>
										
				{/*<td className="add-filebtn"><button class="btn btn-outline-primary">+ Add file</button></td>*/}
		{/* {this.state.disabled===false?<td className="add-filebtn"><Input type="file" id="about_upload_photo" name="upload_photo[]" accept="image/*" multiple onChange={this.onFileChange1(this.state.docid[index])} ref={ref=> this.fileInput = ref}/></td>
		:null} */}

					{this.state.disabled === false ?
						uploadedFiles.length > 0 ? (
							<td>
								{uploadedFiles.map(({orgfilename, filename}) => <span>
									<a
										href={
											baseurl +
											filename
										}
										target="_blank"
										download
									>
									{orgfilename}
									<br/>
									</a></span>)}
							</td>
						) : (<td className="add-filebtn"><Input type="file" id="about_upload_photo" name="upload_photo[]" accept="image/*" multiple onChange={this.onFileChange1(this.state.docid[index])} ref={ref => this.fileInput = ref} /></td>)
					: null}

		</tr>
			);
		}
	}  

	// Multiple file download functionality
	multiFilesDownload = e => {
		e.preventDefault();
		const filesInfo = [];
		this.state.docid1.map(({filename, orgfilename}) => {
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
                <Col xs="12" sm="12" xl="12" md="12" lg="12" className="mx-auto" >
			 <Card className="uni-right-card app-inprogress">
			       <div className="offer-header p-3">
					<Row className="mt-2">
						<div className="col-md-8">
						<p><b>Please attach files to complete your application</b></p>
						<span>* {this.state.totalrecords} requirements to be completed</span>
						</div>
						<div className=" text-right col-md-4 app-download" onClick={this.multiFilesDownload}>
						<span>Download All</span>  <img src={downloadicon} alt="" width="14" />
						</div>
					</Row>

					<Row>
					<div class="card-body table-responsive univ-new-table">
						<table class="draft-table table table-responsive-sm display nowrap dataTable dtr-inline collapsed">						                        
							 {this.state.docname.map((doc_name, index) => {	
								 return this.handleDocumentLabel(this.state.optionid[index], doc_name, index)
								  
							 })}
						</table>
					</div>
					</Row>
					{this.state.disabled===false?<Button color="success" onClick={this.onSubmit1.bind(this)}  className="px-4 save-btn">Save</Button>
				 :null}  
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
