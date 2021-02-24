import React    from "react";
import template from "./AppUploadDocument.jsx";
import config from '../../config.json';

import $ from 'jquery';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var baseurl = `${config.baseurl}`;

// API Call Url //
function submitForm(contentType, data, setResponse, path) 
{
  axios({
      url: `${config.baseurl}/storestudocs`,
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': contentType
      }
  }).then((response) => {
    setResponse(response.data);
    //window.location.reload(false);

    
    if(response.data == "error")
    {
      toast.error("Please Login");
    }

   setTimeout(function () { 
     localStorage.setItem('completeprofile', 1);
	 
      window.location = "/#/makepayment";
   }, 3000);

  }).catch((error) => {
    setResponse("error");
  })
}


class AppUploadDocument extends React.Component
{
    constructor(props) 
    {
      super(props);

      this.onSubmit = this.onSubmit.bind(this);
      
      this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      disabled:localStorage.getItem("fromApplicationType")==="Sent"?true:false,
      foldertype : '',
      docs: [],
		  pers:[],
		  trans:[],
      
      errors:{},
      formData: new FormData(),
      upload_photo: [],
      fileLength: '',
	  contentclose2:true,
	  filename:'',
showtranscripts:false,
showpersonal:false
      };

      axios.get(baseurl+'/get_studocuments/'+localStorage.getItem('studentid')).then(response => 
      {
        console.log(response);
        //alert(response.data.docs.length);
        this.setState({
            pers: response.data.pers,
            trans: response.data.trans,
        
        });

        axios.get(baseurl + '/documentsrequired_student/' + localStorage.getItem('applicationid')).then(res => {
          console.log('res1', response.data.docs, res.data);
          this.setState(
            {
              docs: response.data.docs.concat(res.data),
            });
        })
        
      })
      
    }



    // handleFolderChange = (event) => { this.setState({ foldertype: event.target.value }); };

    handleFolderChange = param => e => {
      //handleFolderChange = param => {
        //alert(param);
        this.setState({ foldertype: param });
        if(param == 1){
        $('.personal').addClass('active');
        $('.transcripts').removeClass('active');
         this.setState({ showpersonal: true  });
          this.setState({ showtranscripts: false  });
        }else{
        $('.transcripts').addClass('active');
        $('.personal').removeClass('active');
        this.setState({ showtranscripts: true  });
        this.setState({ showpersonal: false  });	
        }
        
        
      }

      onClickdelete = param => e => {
        //handleFolderChange = param => {
          //alert(param);
          
          axios.get(baseurl+'/delete_studocuments/'+localStorage.getItem('studentid')+'/'+param).then(response => 
            {
                   
               toast.success("Deleted successfully");
               setTimeout(function(){ window.location.reload(); }, 2000);
              
             
            })
          
        }


    onFileChange = (event) => 
    {
		
		
		
      this.setState({fileLength: event.target.files.length});
      if(event.target.files.length < 2 )
      {
        for(let i = 0; i < event.target.files.length; i++) 
        {
		 this.setState({
            filename: event.target.files[0].name
        });
          this.state.formData.append('upload_photo[]', event.target.files[i], event.target.files[i].name);
        }
      }
    }

closepop3 = () => {
	  this.setState({
            contentclose2: false,
          });
  }
  
    prevtab = () => {
		$("#tab4").addClass("active");
		$("#tab5").removeClass("active");
		$(".uploadtab").removeClass("active");	   
		$(".bgtab").addClass("active");	
  }


    validate = () => 
    {
      const errors = {};

      // if ( this.state.fileLength === '')
      // {
        // errors.fileLength = "Please select upload files";
      // }
      // else if( this.state.fileLength > 1 )
      // {
        // errors.fileLength = "Maximum 1 files are allowed to upload";
      // }


      const fi = document.getElementById('upfile'); 
        // Check if any file is selected. 
		//alert(fi.value); 
		 var filePath = fi.value; 
		 var allowedExtensions =  /(\.jpg|\.pdf|\.png)$/i; 
              
          
		
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
                /*
                else if (file < 2048) 
                { 
                    alert("File too small, please select a file greater than 2mb"); 
                } 
                alert(file + '</b> KB');*/
				else if(!allowedExtensions.exec(filePath)) { 
                errors.fileLength = 'Invalid file type.Allowed file types are jpg,png,pdf';
                } 
            } 
        }

      return Object.keys(errors).length === 0 ? null : errors;
    }
	componentDidMount(){
    
    
		if(localStorage.getItem('completeprofile') == 1) {
			//alert();
		$(".disablepro").prop("disabled", true);
		$('.aftersave').attr('style','display: block !important');
		$('.beforesave').attr('style','display: none !important');
		
		}else{
			//alert("1");
		$(".disablepro").prop("disabled", false);
		$('.beforesave').attr('style','display: block !important');
		$('.aftersave').attr('style','display: none !important');
      
		}
		//alert(localStorage.getItem('completeprofile'));
		
	}


    onSubmit = (e) => {
      e.preventDefault();
  
  
      const errors = this.validate();
      this.setState({ errors });
      if (errors) return;

      var mess="";
      axios.get(baseurl+'/get_allappcomplete/'+localStorage.getItem('studentid')).then(response => 
            {
              mess=response.data.message;
             
              if(mess!=="Not filled"){

              
      
                this.state.formData.append("foldertype", this.state.foldertype);
                //this.state.formData.append("profilefilled", 1);
                //this.state.formData.append("student_id", 1);
                this.state.formData.append("student_id", localStorage.getItem('studentid'));
              
             // if(this.state.fileLength !== ''){ 
                                
              //submitForm("multipart/form-data", this.state.formData, (msg) => console.log(msg.message), 'student');
              //submitForm("multipart/form-data", this.state.formData, (msg) => toast.success(msg.message), 'student');
              submitForm("form-data", this.state.formData, (msg) => { toast.success('Application saved successfully');   }, 'student');
               
             // }else{
                
              // setTimeout(function () { 
              // toast.success('Profile12 completed successfully');
              // localStorage.setItem('completeprofile', 1);
               // window.location.reload(true); 
              // }, 5000); 
                
             // }
          
               
                }
                else{toast.warning("Please Complete your profile to make payment.")}
          
            });

            this.setState({ foldertype: '' });
            this.setState({ imgfile: '' });
            this.setState({ upload_photo: '' });
            this.setState({ formData: new FormData() });
      
            this.setState({ errors: '' });
           
      
    };



  render() 
  {
    const { errors } = this.state;

    const imgpath = `${config.baseurl}`;

    return template.call(this);
  }
}

export default AppUploadDocument;
