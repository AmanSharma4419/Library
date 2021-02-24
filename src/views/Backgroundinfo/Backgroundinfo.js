import React    from "react";
import template from "./Backgroundinfo.jsx";
import config from '../../config.json';
import $ from 'jquery';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
var baseurl = `${config.baseurl}`;


// API Call Url //
function submitForm(contentType, data, setResponse, path) {
  axios({
  url: baseurl+`/storestudentbackgroundinfo`,
  method: 'POST',
  data: data,
  headers: {
    'Content-Type': contentType
  }
  }).then((response) => {
  setResponse(response.data);
  //window.location.reload(false);

  //setTimeout(function () { 
   // window.location.reload(true); 
  //}, 4000);

  }).catch((error) => {
  setResponse("error");
  })
}




class Backgroundinfo extends React.Component 
{


  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      refusedvisa : '',
      visapermit : '',
      txtdetails : '',
      errors:{},
      formData: new FormData(),
	  contentclose1:true,
	  completeprofile:localStorage.getItem('completeprofile'),
    
    };

    this.getBackgroundinfodata();
      
  }
  
 
	   
	    nexttab = () => {
	   $("#tab5").addClass("active");
       $("#tab4").removeClass("active");
       $(".bgtab").removeClass("active");	   
       $(".uploadtab").addClass("active");	
	   
  }
  
   prevtab = () => {
		$("#tab3").addClass("active");
		$("#tab4").removeClass("active");
		$(".bgtab").removeClass("active");	   
		$(".testscore").addClass("active");	
  }
  
  
  closepop2 = () => {
	  this.setState({
            contentclose1: false,
          });
  }

  getBackgroundinfodata()
  {
	  
      
      //axios.get('https://formeeadmin.bicsglobal.com/get_backgroundinfo/1').then(response => {
      axios.get(baseurl+'/get_backgroundinfo/'+localStorage.getItem('studentid')).then(response => {
      console.log(response);
      //alert(response.data.length);
      if((response.data.length > '0') ) 
      { 
          //alert(response.data[0].refused_visa +'-'+response.data[0].validpermit_visa);
          this.setState({
              refusedvisa: response.data[0].refused_visa,
              visapermit: response.data[0].validpermit_visa,
              txtdetails: response.data[0].details
             });

            if( response.data[0].refused_visa )
            {
              $("input[name=refusedvisa]").val(['yes']);
            }
            else
            {
              $("input[name=refusedvisa]").val(['no']);
            }
      }

      })

   }

    handleRefusedvisaChange = (event) => {
      this.setState({ refusedvisa: event.target.value });
    };
  
    handleVisapermitChange = (event) => {
      this.setState({ visapermit: event.target.value });
    };
  
    handleTxtdetailsChange = (event) => {
      this.setState({ txtdetails: event.target.value });
    };

  

    validate = () => 
    {
      const errors = {};

      var radioValue = $("input[name='refusedvisa']:checked").val();

      //$("input[name=refusedvisa]").val(['yes']);
      //$("#txtdetails").val("Dolly Duck");
      //alert(this.state.visapermit.trim());

      if(!radioValue)
      { 
        errors.refusedvisa = 'Please select';
      }  

      if(this.state.visapermit === '')
      {
        errors.visapermit = 'Please select';
      }
      
      if( radioValue === "yes" || this.state.visapermit === '1' )
      {
          //alert('1'); {/*if( this.state.txtdetails.trim() === '' )*/}
          //alert($("#txtdetails").val().trim());
        if( ($("#txtdetails").val().trim() === '') || ($("#txtdetails").val().trim() === null) )
        {
          errors.txtdetails = 'Please enter provide details';
        }
      }
      
      return Object.keys(errors).length === 0 ? null : errors;
  };


  onSubmit = (e) => {
    e.preventDefault();


    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
   
    this.state.formData.append("refusedvisa", $("input[name='refusedvisa']:checked").val());
    
    this.state.formData.append("visapermit", this.state.visapermit);
    this.state.formData.append("txtdetails", this.state.txtdetails);
    //this.state.formData.append("student_id", 1);
    this.state.formData.append("student_id", localStorage.getItem('studentid'));
    
    //submitForm("form-data", this.state.formData, (msg) => console.log(msg.message), 'student');
    //submitForm("form-data", this.state.formData, (msg) => toast.success(msg.message), 'student');
    
	submitForm("form-data", this.state.formData, (msg) => { toast.success(msg.message);  setTimeout(function () {
       $("#tab5").addClass("active");
       $("#tab4").removeClass("active");
       $(".bgtab").removeClass("active");	   
       $(".uploadtab").addClass("active");	   
      }, 3000); }, 'student');


    // // this.setState({ refusedvisa: '' });
    // // this.setState({ visapermit: '' });
    // // this.setState({ txtdetails: '' });
    this.setState({ errors: '' });
  };


  render() 
  {
    const { errors } = this.state;
    return template.call(this);
  }


}

export default Backgroundinfo;
