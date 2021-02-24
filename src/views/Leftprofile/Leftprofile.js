import React    from "react";
import template from "./Leftprofile.jsx";
import axios from 'axios';
import $ from 'jquery';
import config from '../../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var baseurl = `${config.baseurl}/`;


function submitForm(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`storeprofile`,
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

class Leftprofile extends React.Component {
	constructor(props) {
    super(props);
	
	this.state = {
	  upload_logo: [],		
	  upload_banner: [],
      formData: new FormData() ,
	  layout:'',
	  phone:'',
	  email: localStorage.getItem('universityemail'),
	  univcountry:'',
	  message:'',
	  logo:'',
	  banner:'',
	  fileLength:'',
	  fileLength1:'',
	  errors:{},
	  country:[]
    };
	this.onSubmit = this.onSubmit.bind(this);
	
	  axios.get('https://formeeadmin.bicsglobal.com/get_country').then(response => {
		console.log(response);
		//this.setState({data: [...json]});
         this.setState({
                  country : response.data,
               });
        })   
	
	
	}
	
	
	componentDidMount() {
		//alert(localStorage.getItem('universityemail'));
		var id  = localStorage.getItem('universityid'); 
		 
		 axios.get(baseurl+'getuniversityabout/'+id).then(response => {
		  this.setState({ phone: response.data[0].phone,logo: response.data[0].logo_image,banner: response.data[0].banner_image,layout: response.data[0].layout,univcountry: response.data[0].country_id,message: response.data[0].admissioncriteria_gen });
			  //console.log(response.data);
         
        })
		 
	
        }
	
	//logo
	onFileChange = (event) => {
		//alert();
    this.setState({fileLength: event.target.files.length});
   //alert(event.target.files.length);
    if(event.target.files.length < 2 ){
		//alert();
      for(let i = 0; i < event.target.files.length; i++) {
        this.state.formData.append('upload_logo[]', event.target.files[i], event.target.files[i].name);
      }
    }
  }
  
  //banner
   onFileChange1 = (event) => {
		// alert("1");
    this.setState({fileLength1: event.target.files.length});
    if(event.target.files.length < 2 ){
      for(let i = 0; i < event.target.files.length; i++) {
        this.state.formData.append('upload_banner[]', event.target.files[i], event.target.files[i].name);
      }
    }
  }
  
handleLayoutChange = event => {
	this.setState({layout: event.target.value});
}
handleUniselectcountryChange = event => {
	this.setState({univcountry: event.target.value});
}
handlePhoneChange = event => {
	this.setState({phone: event.target.value});
}
handleEmailChange = event => {
	this.setState({email: event.target.value});
}
handleAdmincritetiaChange = event => {
	this.setState({message: event.target.value});
}
	
	
	validate = () => 
    {
      const errors = {};
	   var minmax = /^.{9,14}$/
	   
        //alert("1");
		    if(this.state.logo === ''){
			if(this.state.fileLength === '' || (!this.state.fileLength )){
			errors.fileLength = "Please upload files";
			}
			}
			
			if(this.state.banner === ''){
			if(this.state.fileLength1 === '' || (!this.state.fileLength1 )){
			errors.fileLength1 = "Please upload files";
			}
			}
			
			if(this.state.layout === ''){
			errors.layout = 'Please select';
			}
			if(this.state.univcountry === ''){
			errors.univcountry = 'Country is required';
			}
			if(this.state.email.trim() === ''){
			errors.email = 'Email is required';
			}
			if(this.state.phone === ''){
			errors.phone = 'Phone is required';
			}
			if(this.state.message === ''){
			errors.message = 'Message is required';
			}
			if(!this.state.phone.match(minmax)) {
			errors.phone = 'Enter a valid phone number between 9 to 14 digits';
			}
		
			
			
	  
	   const fi = document.getElementById('univlogo'); 
        // Check if any file is selected. 
        if (fi.files.length > 0) 
        { 
            for (var i = 0; i <= fi.files.length - 1; i++) 
            { 
  
                const fsize = fi.files.item(i).size; 
                const file = Math.round((fsize / 1024)); 
                // The size of the file. 
                if (file >= 5120) 
                { 
                    errors.fileLength = "File too Big, please select a file less than 5 MB";
                } 
              
            } 
        }
		
		 const filebanner = document.getElementById('univbanner'); 
        // Check if any file is selected. 
        if (filebanner.files.length > 0) 
        { 
            for (var i = 0; i <= filebanner.files.length - 1; i++) 
            { 
  
                const fsize = filebanner.files.item(i).size; 
                const file = Math.round((fsize / 1024)); 
                // The size of the file. 
                if (file >= 5120) 
                { 
                    errors.fileLength1 = "File too Big, please select a file less than 5 MB";
                } 
              
            } 
        }
     

      return Object.keys(errors).length === 0 ? null : errors;
    }

	
	onSubmit = (e) => {
	  const errors = this.validate();
      this.setState({ errors });
      if (errors) return;

         this.state.formData.append("layout", this.state.layout);
         this.state.formData.append("univcountry", this.state.univcountry);
         this.state.formData.append("phone", this.state.phone);
         this.state.formData.append("email", this.state.email);
         this.state.formData.append("message", this.state.message);
         this.state.formData.append("universityid", localStorage.getItem('universityid'));
          //console.log(this.state.formData);
       submitForm("multipart/form-data", this.state.formData, (msg) => {  toast.success('Profile updated successfully'); }, 'profileupdate');
	  
      this.setState({ formData: new FormData() });
      this.setState({ errors: '' });
  };
  
  
	
	
  render() {
	//const { errors } = this.state;
	 const imgpath = `${config.baseurl}`;
    return template.call(this);
  }
}

export default Leftprofile;
