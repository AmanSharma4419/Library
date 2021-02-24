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
import './style.css';
import $ from "jquery";
var baseurl = `${config.baseurl}`;
//API Base Url



class Applicationnote extends Component {

  constructor(props) {
    super(props);


    this.state = {
		large: false,
		layout: 'normal',
		description:'',
		url: '',
		id_st: '',
		emailst: '',
		account_type_st: '',
		lastname_st: '',
		name_st :'',
		upload_photo: [],
		fileLength: '',
		errors: {},
		name: '',
		account_type: '',
		phone: '',
		email: '',
		capusidid: '',
		//for subsection start
		university_id: '',
		layout: 'normal',
		heading: '',
		id:[],
		
		upload_photo: [],
		schemas: [],
	    schemas_id: [],
	    inv_name: [],
	    inv_email: [],
	    inv_acc: [],
	    inv_id: [],
	    invblk_id: [],
	    dates: [],
	    name: [],
	    email: [],
	    account_type: [],
	    lastname: [],
	    imgfile: '',
		imgfile1: '',
		inv_count: 0,
		acc_type:[],
		acc_type_id:[],
		formData: new FormData()
    };
	//alert(this.state.email_st);
	this.validate = this.validate.bind(this);
	this.toggleLarge = this.toggleLarge.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
	
 var param = localStorage.getItem('universityid');	
	axios.get(baseurl+'/get_stafflandingpages/'+param).then(response => {	

         this.setState({
                   id: response.data.id,
                   name: response.data.name,
                   email: response.data.email,
                   acc_type: response.data.acc_type,
                   acc_type_id: response.data.acc_type_id,
                   lastname: response.data.lastname,
                   account_type: response.data.account_type
				   });
        })
  }
 
handleCloseClick = param => e => 
{
	this.setState({large: false});
}
  
toggleLarge() {
	
    this.setState({
      large: !this.state.large,
	  
    });
  }
 

filterInvites(param1) {
  axios.get(baseurl+'get_staffinvitesfilter/'+param1).then(response => {
	  console.log(response.data.acc_type_id);
          this.setState({
                   inv_name: response.data.inv_name,
                   inv_email: response.data.inv_email,
                   inv_acc: response.data.inv_acc,
                   inv_id: response.data.inv_id,
                   invblk_id: response.data.invblk_id,
                   dates: response.data.dates,
                   acc_type: response.data.acc_type,
                   inv_status: response.data.inv_status,
                   inv_count: response.data.inv_count,
                   acc_type_id: response.data.acc_type_id
               });
        })
}
handleChange = param => e => 
{
	var univ_id = localStorage.getItem('universityid');
	axios.get(baseurl+'/get_stafflandingpagesfilter/'+param+'/'+univ_id).then(response => 
	{
			this.setState({
				id: response.data.id,
				name: response.data.name,
				email: response.data.email,
				acc_type: response.data.acc_type,
				acc_type_id: response.data.acc_type_id,
				lastname: response.data.lastname,
				account_type: response.data.account_type
			});
    })
	e.preventDefault();
	document.querySelector('li.active').classList.remove('active');
	e.target.className = "list-group-item active";
};
handleNameChange = event => {
	this.setState({name_st: event.target.value});
}

handlePhoneChange = event => {
	this.setState({phone_st: event.target.value});
}

handleEmailChange = event => {
	this.setState({emailst: event.target.value});
}


handleAcctypeChange = event => {
	//alert(event.target.value);
	this.setState({account_type_st: event.target.value});
}

handleLastnameChange = event => {
	//alert(event.target.value);
	this.setState({lastname_st: event.target.value});
}
updateStaff(id,name,lastname,email,account_type) 
{
	this.setState({id_st: id});
	this.setState({name_st: name});
	this.setState({lastname_st: lastname});
	this.setState({emailst: email});
	this.setState({account_type_st: account_type});
	this.toggleLarge();
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
getAccIndex(indexid) 
{ 
	var arr = this.state.acc_type_id;
	var index = arr.indexOf(parseInt(indexid));
	return this.state.acc_type[index];
}
handleAllchange = event => {
	var param = localStorage.getItem('universityid');	
	axios.get(baseurl+'/get_stafflandingpages/'+param).then(response => {	

         this.setState({
                   id: response.data.id,
                   name: response.data.name,
                   email: response.data.email,
                   acc_type: response.data.acc_type,
                   acc_type_id: response.data.acc_type_id,
                   lastname: response.data.lastname,
                   account_type: response.data.account_type
				   });
        })
}

	render() {
		const { errors } = this.state;
	 const { showhide } = this.state;
	console.log(this.state.showhide);
    return (
      <div className="entry-box invite-box staff-page" >
	   
        <Container>
		<ToastContainer />
          <Row>
            
          </Row>
        </Container>	
			
      </div>
    );
  }
}

export default Applicationnote;
