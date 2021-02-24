import React    from "react";
import template from "./AppTestscore.jsx";
import QueTestAddMore from './../Addmore/TestAddMore';
import config from '../../config.json';
import $ from 'jquery';
import axios from 'axios';
//import config from '../../config.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var baseurl = `${config.baseurl}`;



// API Call Url //
function submitForm(contentType, data, setResponse, path) 
{
  axios({
       url: baseurl+`/storetestscores_app`,
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': contentType
      }
  }).then((response) => {
    setResponse(response.data);
    //window.location.reload(false);

   // setTimeout(function () { 
   //   window.location.reload(true); 
   // }, 4000); 

  }).catch((error) => {
    setResponse("error");
  })
}




class AppTestscore extends React.Component 
{

    constructor(props) 
    {
      super(props);

      this.onSubmit = this.onSubmit.bind(this);
      this.getQuestiondata2 = this.getQuestiondata2.bind(this);
		this.setQuestiondata2 = this.setQuestiondata2.bind(this);
      this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      disabled:localStorage.getItem("fromApplicationType")==="Sent"?true:false,
		
		TestAddMore: false,
		questiondata2:[],
		selectedQuestion2: null,
      examtype : '',
      examdate : '',
      readingscore : '',
      listeningscore : '',
      writingscore : '',
      speakingscore : '',
      englishCheck : '',

      greexamdate : '',
      greverbalscore : '',
      greverbalrank : '',
      grequanitativescore : '',
      grequanitativerank : '',
      grewritingscore : '',
      grewritingrank : '',
      greCheck : '',

      gmatexamdate: '',
      gmatverbalscore: '',
      gmatverbalrank: '',
      gmatquanitativescore: '',
      gmatquanitativerank: '',
      gmatwritingscore: '',
      gmatwritingrank: '',
      gmattotalscore: '',
      gmattotalrank: '',
      gmatCheck: '',

      errors:{},
      formData: new FormData(),
      //examdate: new Date(),
      examdateN : '',
      greexamdateN : '',
      gmatexamdateN : '',
	  contentclose:true,
	  //buttonshow:localStorage.getItem('completeprofile'),

      };

      this.getTestscoresdata();
      
  }
  
  getQuestiondata2(question) {
    this.setState({ questiondata2: question })
  }
   setQuestiondata2(index) {
    this.setState({ selectedQuestion2: index, TestAddMore: true })
  }
   closepop1 = () => {
	  this.setState({
            contentclose: false,
          });
  }


  getTestscoresdata()
  {
	  
      //axios.get('https://formeeadmin.bicsglobal.com/get_testscores/1').then(response => {
      axios.get(baseurl+'/get_testscores_app/'+localStorage.getItem('studentid')).then(response => {
      //alert(response.data.length);
      if((response.data.length > '0') ) 
      { 
          if ( response.data[0].exam_date != null )
          {
            var examdateN = new Date(response.data[0].exam_date);
          }

          if ( response.data[0].gre_exam_date != null )
          {
            var greexamdateN = new Date(response.data[0].gre_exam_date);
          }

          if ( response.data[0].gmat_exam_date != null )
          {
            var gmatexamdateN = new Date(response.data[0].gmat_exam_date);
          }

          this.setState({
                  examtype: response.data[0].exam_type,
                  examdate: examdateN,
                  readingscore: response.data[0].reading_score,
                  listeningscore: response.data[0].listening_score,
                  writingscore: response.data[0].writing_score,
                  speakingscore: response.data[0].speaking_score,
                  englishCheck: response.data[0].notestscores,

                  greexamdate: greexamdateN,
                  greverbalscore: response.data[0].gre_verbal_score,
                  greverbalrank: response.data[0].gre_verbal_rank,
                  grequanitativescore: response.data[0].gre_quanitative_score,
                  grequanitativerank: response.data[0].gre_quanitative_rank,
                  grewritingscore: response.data[0].gre_writing_score,
                  grewritingrank: response.data[0].gre_writing_rank,
                  greCheck: response.data[0].nogrescores,

                  gmatexamdate: gmatexamdateN,
                  gmatverbalscore: response.data[0].gmat_verbal_score,
                  gmatverbalrank: response.data[0].gmat_verbal_rank,
                  gmatquanitativescore: response.data[0].gmat_quanitative_score,
                  gmatquanitativerank: response.data[0].gmat_quanitative_rank,
                  gmatwritingscore: response.data[0].gmat_writing_score,
                  gmatwritingrank: response.data[0].gmat_writing_rank,
                  gmattotalscore: response.data[0].gmat_total_score,
                  gmattotalrank: response.data[0].gmat_total_rank,
                  gmatCheck: response.data[0].nogmatscores,
             });

            
            if( response.data[0].notestscores )
            {
              $( "#englishCheck" ).prop( "checked", true );
            }
            if( response.data[0].nogrescores )
            {
              $( "#greCheck" ).prop( "checked", true );
            }
            if( response.data[0].nogmatscores )
            {
              $( "#gmatCheck" ).prop( "checked", true );
            }
           
      }

      })

   }

   

  //handleChange = date => { this.setState({ startDate: date }); };

  handleExamtypeChange = (event) => { this.setState({ examtype: event.target.value }); };

  //handleExamdateChange = (event) => { this.setState({ examdate: event.target.value }); };
  handleExamdateChange = date => { this.setState({ examdate: date }); };

  handleReadingscoreChange = (event) => { this.setState({ readingscore: event.target.value }); };
  handleListeningscoreChange = (event) => { this.setState({ listeningscore: event.target.value }); };
  handleWritingscoreChange = (event) => { this.setState({ writingscore: event.target.value }); };
  handleSpeakingscoreChange = (event) => { this.setState({ speakingscore: event.target.value }); };
  handleEnglishCheckChange = (event) => { this.setState({ englishCheck: $("#englishCheck").is(":checked") }); };

  //handleGreexamdateChange = (event) => { this.setState({ greexamdate: event.target.value }); };
  handleGreexamdateChange = date => { this.setState({ greexamdate: date }); };

  handleGreverbalscoreChange = (event) => { this.setState({ greverbalscore: event.target.value }); };
  handleGreverbalrankChange = (event) => { this.setState({ greverbalrank: event.target.value }); };
  handleGrequanitativescoreChange = (event) => { this.setState({ grequanitativescore: event.target.value }); };
  handleGrequanitativerankChange = (event) => { this.setState({ grequanitativerank: event.target.value }); };
  handleGrewritingscoreChange = (event) => { this.setState({ grewritingscore: event.target.value }); };
  handleGrewritingrankChange = (event) => { this.setState({ grewritingrank: event.target.value }); };
  handleGrecheckChange = (event) => { this.setState({ greCheck: $("#greCheck").is(":checked") }); };

  //handleGmatexamdateChange = (event) => { this.setState({ gmatexamdate: event.target.value }); };
  handleGmatexamdateChange = date => { this.setState({ gmatexamdate: date }); };

  handleGmatverbalscoreChange = (event) => { this.setState({ gmatverbalscore: event.target.value }); };
  handleGmatverbalrankChange = (event) => { this.setState({ gmatverbalrank: event.target.value }); };
  handleGmatquanitativescoreChange = (event) => { this.setState({ gmatquanitativescore: event.target.value }); };
  handleGmatquanitativerankChange = (event) => { this.setState({ gmatquanitativerank: event.target.value }); };
  handleGmatwritingscoreChange = (event) => { this.setState({ gmatwritingscore: event.target.value }); };
  handleGmatwritingrankChange = (event) => { this.setState({ gmatwritingrank: event.target.value }); };
  handleGmattotalscoreChange = (event) => { this.setState({ gmattotalscore: event.target.value }); };
  handleGmattotalrankChange = (event) => { this.setState({ gmattotalrank: event.target.value }); };
  handleGmatCheckChange = (event) => { this.setState({ gmatCheck: $("#gmatCheck").is(":checked") }); };
  


  validate = () => 
    {
      const errors = {};

      if( !$("#englishCheck").is(":checked") )
      {
        //alert(1);
        if($("#examtype").val().trim() === '') { errors.examtype = 'Please select'; }
        if($("#examdate").val().trim() === '') { errors.examdate = 'Please select'; }
        if($("#readingscore").val().trim() === '') { errors.readingscore = 'This is required'; }
        if($("#listeningscore").val().trim() === '') { errors.listeningscore = 'This is required'; }
        if($("#writingscore").val().trim() === '') { errors.writingscore = 'This is required'; }
        if($("#speakingscore").val().trim() === '') { errors.speakingscore = 'This is required'; }
      }

      if( !$("#greCheck").is(":checked") )
      {
        //alert(2);
        if($("#greexamdate").val().trim() === '') { errors.greexamdate = 'Please select'; }
        if($("#greverbalscore").val().trim() === '') { errors.greverbalscore = 'This is required'; }
        if($("#greverbalrank").val().trim() === '') { errors.greverbalscore = 'This is required'; }
        if($("#grequanitativescore").val().trim() === '') { errors.grequanitativescore = 'This is required'; }
        if($("#grequanitativerank").val().trim() === '') { errors.grequanitativescore = 'This is required'; }
        if($("#grewritingscore").val().trim() === '') { errors.grewritingscore = 'This is required'; }
        if($("#grewritingrank").val().trim() === '') { errors.grewritingscore = 'This is required'; }
      }

      if( !$("#gmatCheck").is(":checked") )
      {
        //alert(3);
        if($("#gmatexamdate").val().trim() === '') { errors.gmatexamdate = 'Please select'; }
        if($("#gmatverbalscore").val().trim() === '') { errors.gmatverbalscore = 'This is required'; }
        if($("#gmatverbalrank").val().trim() === '') { errors.gmatverbalscore = 'This is required'; }

        if($("#gmatquanitativescore").val().trim() === '') { errors.gmatquanitativescore = 'This is required'; }
        if($("#gmatquanitativerank").val().trim() === '') { errors.gmatquanitativescore = 'This is required'; }

        if($("#gmatwritingscore").val().trim() === '') { errors.gmatwritingscore = 'This is required'; }
        if($("#gmatwritingrank").val().trim() === '') { errors.gmatwritingscore = 'This is required'; }

        if($("#gmattotalscore").val().trim() === '') { errors.gmattotalscore = 'This is required'; }
        if($("#gmattotalrank").val().trim() === '') { errors.gmattotalscore = 'This is required'; }
      }
      
        
      return Object.keys(errors).length === 0 ? null : errors;
  };
  
  
  nexttab = () => {
	   $("#tab4").addClass("active");
       $("#tab3").removeClass("active");
       $(".AppTestscore").removeClass("active");	   
       $(".bgtab").addClass("active");		
	   
  }
  
   prevtab = () => {
		$("#tab2").addClass("active");
		$("#tab3").removeClass("active");
		$(".AppTestscore").removeClass("active");	   
		$(".educationtab").addClass("active");	
  }



  onSubmit = (e) => {
    e.preventDefault();


    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
   
    
    this.state.formData.append("examtype", this.state.examtype);

    this.state.formData.append("examdate", $("#examdate").val());

    this.state.formData.append("readingscore", this.state.readingscore);
    this.state.formData.append("listeningscore", this.state.listeningscore);
    this.state.formData.append("writingscore", this.state.writingscore);
    this.state.formData.append("speakingscore", this.state.speakingscore);
    this.state.formData.append("englishCheck", this.state.englishCheck);

    this.state.formData.append("greexamdate", $("#greexamdate").val());
    this.state.formData.append("greverbalscore", this.state.greverbalscore);
    this.state.formData.append("greverbalrank", this.state.greverbalrank);
    this.state.formData.append("grequanitativescore", this.state.grequanitativescore);
    this.state.formData.append("grequanitativerank", this.state.grequanitativerank);
    this.state.formData.append("grewritingscore", this.state.grewritingscore);
    this.state.formData.append("grewritingrank", this.state.grewritingrank);
    this.state.formData.append("greCheck", this.state.greCheck);

    this.state.formData.append("gmatexamdate", $("#gmatexamdate").val());
    this.state.formData.append("gmatverbalscore", this.state.gmatverbalscore);
    this.state.formData.append("gmatverbalrank", this.state.gmatverbalrank);
    this.state.formData.append("gmatquanitativescore", this.state.gmatquanitativescore);
    this.state.formData.append("gmatquanitativerank", this.state.gmatquanitativerank);
    this.state.formData.append("gmatwritingscore", this.state.gmatwritingscore);
    this.state.formData.append("gmatwritingrank", this.state.gmatwritingrank);
    this.state.formData.append("gmattotalscore", this.state.gmattotalscore);
    this.state.formData.append("gmattotalrank", this.state.gmattotalrank);
    this.state.formData.append("gmatCheck", this.state.gmatCheck);


    //this.state.formData.append("student_id", 1);
    this.state.formData.append("student_id", localStorage.getItem('studentid'));
    
    //submitForm("form-data", this.state.formData, (msg) => console.log(msg.message), 'student');
    //submitForm("form-data", this.state.formData, (msg) => toast.success(msg.message), 'student');
	
	submitForm("form-data", this.state.formData, (msg) => { toast.success(msg.message);  setTimeout(function () {
       $("#tab4").addClass("active");
       $("#tab3").removeClass("active");
       $(".AppTestscore").removeClass("active");	   
       $(".bgtab").addClass("active");	   
      }, 3000); }, 'student');


    // this.setState({ examtype: '' });
    // this.setState({ examdate: '' });
    // this.setState({ readingscore: '' });
    // this.setState({ listeningscore: '' });
    // this.setState({ writingscore: '' });
    // this.setState({ speakingscore: '' });
    // this.setState({ englishCheck: '' });

    // this.setState({ greexamdate: '' });
    // this.setState({ greverbalscore: '' });
    // this.setState({ greverbalrank: '' });
    // this.setState({ grequanitativescore: '' });
    // this.setState({ gmatquanitativerank: '' });
    // this.setState({ grewritingscore: '' });
    // this.setState({ grewritingrank: '' });
    // this.setState({ greCheck: '' });

    // this.setState({ gmatexamdate: '' });
    // this.setState({ gmatverbalscore: '' });
    // this.setState({ gmatverbalrank: '' });
    // this.setState({ gmatquanitativescore: '' });
    // this.setState({ gmatquanitativerank: '' });
    // this.setState({ gmatwritingscore: '' });
    // this.setState({ gmatwritingrank: '' });
    // this.setState({ gmattotalscore: '' });
    // this.setState({ gmattotalrank: '' });
    // this.setState({ gmatCheck: '' });

    this.setState({ errors: '' });
  };


  render() 
  {
    const { errors } = this.state;

    return template.call(this);
  }
}

export default AppTestscore;
