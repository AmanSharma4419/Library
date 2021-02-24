import React from "react";
import Addmore from '../Addmore/EduAddMore';
import template from "./AppEducation.jsx";
import config from '../../config.json';
import $ from 'jquery';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var baseurl = `${config.baseurl}`;

// API Call Url //
function submitForm(contentType, data, setResponse, path) {
  console.log("Data", data,);
  axios({
    url: baseurl + `/storestuedusummary_app`,
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
    // }, 3000);

  }).catch((error) => {
    setResponse("error");
  })
}



class AppEducation extends React.Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onAddEducation = this.onAddEducation.bind(this);
	 this.getQuestiondata1 = this.getQuestiondata1.bind(this);
	  this.setQuestiondata1 = this.setQuestiondata1.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      country: [],
      level: [],
      grade: [],
      graderange: [],
      elevel: [],
      edusublevel: [],
      counter: 1,
	   EduaddMore: false,
      educountryid: '',
      highedulevel: '',
      gradingscheme: '',
      gradingscale: '',
      gradeaverage: '',
      recentcheck: 0,
      recent_summ: '',
      edulevel: [''],
      insticountry: [''],
      institutename: [''],
      instituteDetails: [{}],
      langinstruction: [''],
      attendedfrom: [''],
      attendedto: [''],
      awardeddegree: [''],
      awardedon: [''],
		questiondata1:[],
		selectedQuestion1: null,

      instemail: [''],
      instphone: [''],
      insaddr: [''],
      schoolsattended: ['name'],
      inscity: [''],
      instate: [''],
      inestate: [],
      inecity: [],
      inszip: [''],

      sdate1: '',
      sdate2: '',
      sdate3: '',

      errors: {},
      formData: new FormData(),
      content: true,



      MostrecentChange: true,

      onchangeDate: ['']

    };



    axios.get(baseurl + '/get_country').then(response => {

      this.setState(
        {
          country: response.data,
        });
    })

     axios.get(baseurl+'/geteducatlevel').then(response => {
				this.setState({
					edusublevel: response.data,
				});
			})	
	



    axios.get(baseurl + '/get_leveldetails').then(response => {
      this.setState({
        level: response.data.level,
        //edusublevel: response.data.edusublevel,
        grade: response.data.grade,
        graderange: response.data.graderange,
        elevel: response.data.edulevel,
      });
    })

    // axios.get(baseurl + '/get_state/' + event.target.value).then(response => {
    //   // const inestate = this.state.inestate
    //   this.setState(
    //     {
    //       inestate: response.data
    //     });
    // })
    this.getEdusummary();

  }

 getQuestiondata1(question) {
    this.setState({ questiondata1: question })
  }
  setQuestiondata1(index) {
    this.setState({ selectedQuestion1: index, EduaddMore: true })
  }



  nexttab = () => {
    $("#tab3").addClass("active");
    $("#tab2").removeClass("active");
    $(".appeducationtab").removeClass("active");
    $(".testscore").addClass("active");
  }

  prevtab = () => {
    $("#tab1").addClass("active");
    $("#tab2").removeClass("active");
    $(".addeducationtab").removeClass("active");
    $(".generaltab").addClass("active");
  }

  getEdusummary() {

    //axios.get('https://formeeadmin.bicsglobal.com/get_edusummary/1').then(response => {
    axios.get(baseurl + '/get_edusummary_app/' + localStorage.getItem('studentid')).then(response => {


      if ((response.data.summary.length > '0')) {
        this.setState({

          educountryid: response.data.summary[0].education_country_id,
          highedulevel: response.data.summary[0].highest_educationlevel_id,
          gradingscheme: response.data.summary[0].grading_scheme_id,
          gradingscale: response.data.summary[0].grading_scheme_range_id,
          gradeaverage: response.data.summary[0].grade_average,
          recentcheck: response.data.summary[0].recent_check
        });
		
		axios
            .get(
              baseurl +
                "/geteducatlevel/" +
                response.data.summary[0].education_country_id
            )
            .then((response) => {
              this.setState({
                edusublevel: response.data,
              });
            });

          axios
            .get(
              baseurl +
                "/get_leveldetailscountry/" +
                response.data.summary[0].education_country_id
            )
            .then((response) => {
              this.setState({
                grade: response.data.grade,
                graderange: response.data.graderange,
              });
            });
			
        if (response.data.summary[0].recent_check == "1")
          this.setState({ recent_summ: 'checked' });
      }

      if ((response.data.schools.length > '0')) {
        if (response.data.schools[0].attended_from != null) {
          let datearr = response.data.schools[0].attended_from.split(',')
          var sdate1 = [];
          datearr.forEach(date => {
            sdate1.push(new Date(date))
          })
        }

        if (response.data.schools[0].attended_to != null) {
          var sdate2 = [];
          let datearr = response.data.schools[0].attended_to.split(',')
          datearr.forEach(date => {
            sdate2.push(new Date(date))
          })
        }

        if (response.data.schools[0].awarded_on != null) {
          var sdate3 = [];
          let datearr = response.data.schools[0].awarded_on.split(',');
          datearr.forEach(date => {
            sdate3.push(new Date(date))
          })
        }

        let countryid = response.data.schools[0].institute_country_id.split(",");
        const inestate = [];
        for (let i in countryid) {
          inestate.push([])
        }
        countryid.forEach((id, index) => {
          axios.get(baseurl + '/get_state/' + id).then(response => {
            console.log("stateResponse------1", response.data)
            // inestate.push(response.data)
            inestate[index] = response.data
            this.setState({
              inestate
            });
            console.log("stateResponse----2", inestate)

          })
        })

        let state = response.data.schools[0].state.split(',')
        const inecity = []
        for (let i in state) {
          inecity.push([])
        }
        state.forEach((id, index) => {
          axios.get(baseurl + '/get_city/' + id).then(response => {
            console.log("CityResponse------1", response.data, id)
            inecity[index] = response.data
            this.setState(
              {
                inecity
              });
          })
        })



        const edulevel = response.data.schools[0].educationlevel_id.split(",")
        const insticountry = response.data.schools[0].institute_country_id.split(",")
        const institutename = response.data.schools[0].institute_name.split(",")
        const langinstruction = response.data.schools[0].language_instruction.split(",")
        const awardeddegree = response.data.schools[0].awarded_degree.split(",")
        const instemail = response.data.schools[0].institute_email.split(",")
        const instphone = response.data.schools[0].institute_phone.split(",")
        const insaddr = response.data.schools[0].address.split("+")
        const inscity = response.data.schools[0].city.split(",")
        const instate = response.data.schools[0].state.split(",")
        const inszip = response.data.schools[0].zipcode.split(",")


        for (let i = 0; i < institutename.length - 1; i++) {
          const schoolsattendedArr = this.state.schoolsattended
          schoolsattendedArr.push("")
          this.setState({ schoolsattended: schoolsattendedArr })
        }

        this.setState({

          edulevel,
          insticountry,
          institutename,
          langinstruction,
          attendedfrom: sdate1,
          attendedto: sdate2,
          awardeddegree,
          awardedon: sdate3,
          instemail,
          instphone,
          insaddr,
          inscity,
          instate,
          inszip
        });
        console.log("stateResponse------3", instate)
        console.log("CityResponse------3", inscity)
      }

    })

  }


 handleEducountryidChange = (event) => {
    this.setState({ educountryid: event.target.value });
    axios
      .get(baseurl + "/geteducatlevel/" + event.target.value)
      .then((response) => {
        this.setState({
          edusublevel: response.data,
        });
      });

    axios
      .get(baseurl + "/get_leveldetailscountry/" + event.target.value)
      .then((response) => {
        this.setState({
          grade: response.data.grade,
          graderange: response.data.graderange,
        });
      });
  };
  
 // handleEducountryidChange = (event) => { this.setState({ educountryid: event.target.value }); };
  handleHighedulevelChange = (event) => {  this.setState({ highedulevel: event.target.value }); };
  handleGradingschemeChange = (event) => { this.setState({ gradingscheme: event.target.value }); };
  handleGradingscaleChange = (event) => { this.setState({ gradingscale: event.target.value }); };
  handleGradeaverageChange = (event) => { this.setState({ gradeaverage: event.target.value }); };
  handleMostrecentChange = (event) => {
    var datefal = 0;
    var recent_summ = '';
    if (event.target.value == '0') {
      datefal = 1;
      recent_summ = 'checked';
    }
    else {
      datefal = 0;
      recent_summ = '';
    }
    this.setState({ recentcheck: datefal });
    this.setState({ recent_summ: recent_summ });

  }

  // this.setState({ recentcheck:  this.state.recentcheck != 0}); 

  // handleMostrecentChange = (event) => { this.setState({ MostrecentChange: true}); }
  maxDateHandler = (all_dates) => {
    let recentDataIndex = -1
    var max_dt = all_dates[0],
      max_dtObj = new Date(all_dates[0]);
    all_dates.forEach(function (dt, index) {
      if (new Date(dt) > max_dtObj) {
        max_dt = dt;
        max_dtObj = new Date(dt);
      }
    });
    return max_dt.toLocaleString();
  }

  maxIndexHandler = (all_dates) => {
    // let recentDataIndex = 1
    // var max_dt = all_dates[0],
    //   max_dtObj = new Date(all_dates[0]);
    // all_dates.forEach(function (dt, index) {
    //   if (new Date(dt) > max_dtObj) {
    //     max_dt = dt;
    //     max_dtObj = new Date(dt);
    //     return recentDataIndex = index
    //   }
    // });
    // return recentDataIndex


    let recentDataIndex = -1
    var max_dt = all_dates[0],
      max_dtObj = new Date(all_dates[0]);
    all_dates.forEach(function (dt, index) {
      if (new Date(dt) > max_dtObj) {
        max_dt = dt;
        max_dtObj = new Date(dt);
      }
    });
    return all_dates.indexOf(max_dt);
  }

  handleEdulevelChange = (event, index) => {
    const edulevelclone = this.state.edulevel
    edulevelclone[index] = event.target.value
    this.setState({ edulevel: edulevelclone });
  };
  handleInsticountryChange = (event, index) => {
    const insticountryclone = this.state.insticountry
    insticountryclone[index] = event.target.value
    this.setState({ insticountry: insticountryclone });
    axios.get(baseurl + '/get_state/' + event.target.value).then(response => {
      // console.log("StateResponse",response)
      const inestate = this.state.inestate
      const inecity = this.state.inecity
      inestate[index] = response.data
      inecity[index] = []
      this.setState(
        {
          inestate,
          inecity
        });
    })
  };
  handleInstitutenameChange = (event, index) => {
    const institutenameclone = this.state.institutename
    institutenameclone[index] = event.target.value
    this.setState({ institutename: institutenameclone });
  };
  handleLanginstructionChange = (event, index) => {
    const langinstructionclone = this.state.langinstruction
    langinstructionclone[index] = event.target.value
    this.setState({ langinstruction: langinstructionclone });
  };
  handleAwardeddegreeChange = (event, index) => {
    const awardeddegreeclone = this.state.awardeddegree
    awardeddegreeclone[index] = event.target.value
    this.setState({ awardeddegree: awardeddegreeclone });
  };
  handleInstemailChange = (event, index) => {
    const instemailclone = this.state.instemail
    instemailclone[index] = event.target.value
    this.setState({ instemail: instemailclone });
  };
  handleInstphoneChange = (event, index) => {
    const instphoneeclone = this.state.instphone
    instphoneeclone[index] = event.target.value
    this.setState({ instphone: instphoneeclone });
  };
  handleInsaddrChange = (event, index) => {
    const insaddrclone = this.state.insaddr
    insaddrclone[index] = event.target.value
    this.setState({ insaddr: insaddrclone });
  };
  handleInscityChange = (event, index) => {
    const inscityclone = this.state.inscity
    inscityclone[index] = event.target.value
    this.setState({ inscity: inscityclone });
    console.log("city Change", inscityclone)
  };
  handleAttendedfromChange = (date, index) => {
    const attendedfrom = this.state.attendedfrom
    attendedfrom[index] = date
    this.setState({ attendedfrom });
  };
  handleAttendedtoChange = (date, index) => {
    const attendedto = this.state.attendedto
    attendedto[index] = date
    this.setState({ attendedto });
  };
  handleAwardedonChange = (date, index) => {

    const awardedon = this.state.awardedon
    awardedon[index] = date
    this.setState({ awardedon, onchangeDate: date });

  };


  handleInstateChange = (event, index) => {
    const instateclone = this.state.instate
    instateclone[index] = event.target.value
    this.setState({ instate: instateclone });
    axios.get(baseurl + '/get_city/' + event.target.value).then(response => {

      let inecity = this.state.inecity
      inecity[index] = response.data
      this.setState(
        {
          inecity
        });

    })

  };
  handleInszipChange = (event, index) => {
    const inszipclone = this.state.inszip
    inszipclone[index] = event.target.value
    this.setState({ inszip: inszipclone });
  };

  closepop = () => {
    this.setState({
      content: false,
    });
  }


  validate = () => {
    const errors = [];

    var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const instemail = this.state.instemail;

    var regAln = /^[a-zA-Z0-9]+$/
    var pasmax = /^.{15,20}$/
    var zipmax = /^.{3,8}$/
    var minmax = /^.{10,15}$/
    var code = /^\+\d{1,2}$/

    var regNam = /^[a-zA-Z\s]+$/

    this.state.schoolsattended.forEach((data, index) => {
      errors.push({})

      if (this.state.edulevel[index] === '') { errors[index].edulevel = 'Please select'; }
      if (this.state.insticountry[index] === '') { errors[index].insticountry = 'Please select'; }

      if (this.state.institutename[index].trim() === '') { errors[index].institutename = 'This is required'; }
      else if (this.state.institutename[index].trim().length < 3) { errors[index].institutename = 'Enter valid name'; }
      else if (!this.state.institutename[index].match(regNam)) { errors[index].institutename = 'Enter valid name'; }

      if (this.state.langinstruction[index].trim() === '') { errors[index].langinstruction = 'This is required'; }
      else if (this.state.langinstruction[index].trim().length < 3) { errors[index].langinstruction = 'Enter valid name'; }
      else if (!this.state.langinstruction[index].match(regNam)) { errors[index].langinstruction = 'Enter valid name'; }

      if (this.state.attendedfrom[index] === '') { errors[index].attendedfrom = 'This is required'; }
      if (this.state.attendedto[index] === '') { errors[index].attendedto = 'This is required'; }

      var startDate = new Date(this.state.attendedfrom[index]);
      var endDate = new Date(this.state.attendedto[index]);

      if (startDate > endDate) { errors[index].attendedto = 'Attended institute TO date should be greater than Attended institute FROM date'; }

      if (this.state.awardeddegree[index] === '') { errors[index].awardeddegree = 'This is required'; }
      if (this.state.awardedon[index] === '') { errors[index].awardedon = 'This is required'; }




      if (this.state.instemail[index].trim() === '') { errors[index].instemail = 'This is required'; }
      else if (!instemail[index].match(regEx)) { errors[index].instemail = 'Invalid email'; }

      if (this.state.instphone[index] === '') { errors[index].instphone = 'This is required'; }
      else if (!this.state.instphone[index].match(minmax)) { errors[index].instphone = 'Enter a valid phone number between 9 to 14 digits'; }

      if (this.state.insaddr[index].trim() === '') { errors[index].insaddr = 'This is required'; }
      else if (this.state.insaddr[index].trim().length < 15) { errors[index].insaddr = 'Enter valid address'; }

      if (this.state.inscity[index] === '') { errors[index].inscity = 'This is required'; }
      //else if( this.state.inscity.trim().length <= 5 ) { errors.inscity = 'Enter valid City/Town'; }

      if (this.state.instate[index] === '') { errors[index].instate = 'This is required'; }
      //else if( this.state.instate.trim().length <= 5 ) { errors.instate = 'Enter valid Province/State'; }

      if (this.state.inszip[index] === '') { errors[index].inszip = 'This is required'; }
      else if (!this.state.inszip[index].match(zipmax)) { errors[index].inszip = 'Enter valid code'; }
      else if (!this.state.inszip[index].match(regAln)) { errors[index].inszip = 'Enter valid code'; }

    })

    return Object.keys(errors).length === 0 ? null : errors;
  };


  onAddEducation() {
    const schoolsattendedArr = this.state.schoolsattended
    schoolsattendedArr.push("")
    this.setState({ schoolsattended: schoolsattendedArr })

    const edulevel = this.state.edulevel
    const insticountry = this.state.insticountry
    const institutename = this.state.institutename
    const langinstruction = this.state.langinstruction
    const attendedfrom = this.state.attendedfrom
    const attendedto = this.state.attendedto
    const awardeddegree = this.state.awardeddegree
    const awardedon = this.state.awardedon
    const instemail = this.state.instemail
    const instphone = this.state.instphone
    const insaddr = this.state.insaddr
    const inscity = this.state.inscity
    const instate = this.state.instate
    const inszip = this.state.inszip
    const inestate = this.state.inestate
    const inecity = this.state.inecity

    edulevel.push('')
    insticountry.push('')
    institutename.push('')
    langinstruction.push('')
    attendedfrom.push('')
    attendedto.push('')
    awardeddegree.push('')
    awardedon.push('')
    instemail.push('')
    instphone.push('')
    insaddr.push('')
    inscity.push('')
    instate.push('')
    inszip.push('')
    inestate.push([])
    inecity.push([])

    this.setState({

      edulevel,
      insticountry,
      institutename,
      langinstruction,
      attendedfrom,
      attendedto,
      awardeddegree,
      awardedon,
      instemail,
      instphone,
      insaddr,
      inscity,
      instate,
      inszip,
      inestate,
      inecity
    });

  }

  onSubmit = (e) => {
    e.preventDefault();

    let errors = this.validate()
    this.setState({ errors })
    errors = errors.filter(error => Object.keys(error).length !== 0)
    if (errors.length > 0) return;

    var edulevelArr = [];
    var insticountryArr = [];
    var institutenameArr = [];
    var langinstructionArr = [];
    var attendedfromArr = [];
    var attendedtoArr = [];
    var awardeddegreeArr = [];
    var awardedonArr = [];
    var instemailArr = [];
    var instphoneArrArr = [];
    var insaddrArr = [];
    var inscityArr = [];
    var instateArr = [];
    var inszipArr = [];


    $('.edulevel').each(function (i) {
      edulevelArr.push($(this).val());
    });
    $('.insticountry').each(function (i) {
      insticountryArr.push($(this).val());
    });
    $('.institutename').each(function (i) {
      institutenameArr.push($(this).val());
    });
    $('.langinstruction').each(function (i) {
      langinstructionArr.push($(this).val());
    });
    $('.attendedfrom').each(function (i) {
      attendedfromArr.push($(this).val());
    });
    $('.attendedto').each(function (i) {
      attendedtoArr.push($(this).val());
    });
    $('.awardeddegree').each(function (i) {
      awardeddegreeArr.push($(this).val());
    });
    $('.awardedon').each(function (i) {
      awardedonArr.push($(this).val());
    });
    $('.instemail').each(function (i) {
      instemailArr.push($(this).val());
    });
    $('.instphone').each(function (i) {
      instphoneArrArr.push($(this).val());
    });
    $('.insaddr').each(function (i) {
      insaddrArr.push($(this).val());
    });
    $('.inscity').each(function (i) {
      inscityArr.push($(this).val());
    });
    $('.instate').each(function (i) {
      instateArr.push($(this).val());
    });
    $('.inszip').each(function (i) {
      inszipArr.push($(this).val());
    });

    insaddrArr = insaddrArr.join("+")


    //this.state.formData.append("examdate", $("#examdate").val());
    this.state.formData.append("recent_check", this.state.recentcheck);
    this.state.formData.append("educountryid", this.state.educountryid);
    this.state.formData.append("highedulevel", this.state.highedulevel);
    this.state.formData.append("gradingscheme", this.state.gradingscheme);
    this.state.formData.append("gradingscale", this.state.gradingscale);
    this.state.formData.append("gradeaverage", this.state.gradeaverage);

    this.state.formData.append("edulevel", edulevelArr);
    this.state.formData.append("insticountry", insticountryArr);
    this.state.formData.append("institutename", institutenameArr);
    this.state.formData.append("langinstruction", langinstructionArr);
    this.state.formData.append("attendedfrom", attendedfromArr);
    this.state.formData.append("attendedto", attendedtoArr);
    this.state.formData.append("awardeddegree", awardeddegreeArr);
    this.state.formData.append("awardedon", awardedonArr);
    this.state.formData.append("instemail", instemailArr);
    this.state.formData.append("instphone", instphoneArrArr);
    this.state.formData.append("insaddr", insaddrArr);
    this.state.formData.append("inscity", inscityArr);
    this.state.formData.append("instate", instateArr);
    this.state.formData.append("inszip", inszipArr);

    //this.state.formData.append("student_id", 1);
    this.state.formData.append("student_id", localStorage.getItem('studentid'));

    //submitForm("form-data", this.state.formData, (msg) => console.log(msg.message), 'student');
    //submitForm("form-data", this.state.formData, (msg) => toast.success(msg.message), 'student');

    submitForm("form-data", this.state.formData, (msg) => {
      toast.success(msg.message); setTimeout(function () {
        $("#tab3").addClass("active");
        $("#tab2").removeClass("active");
        $(".educationtab").removeClass("active");
        $(".testscore").addClass("active");
      }, 3000);
    }, 'student');

    // this.setState({ educountryid: '' });
    // this.setState({ highedulevel: '' });
    // this.setState({ gradingscheme: '' });
    // this.setState({ gradingscale: '' });
    // this.setState({ gradeaverage: '' });

    // this.setState({ edulevel: '' });
    // this.setState({ insticountry: '' });
    // this.setState({ institutename: '' });
    // this.setState({ langinstruction: '' });
    // this.setState({ attendedfrom: '' });
    // this.setState({ attendedto: '' });
    // this.setState({ awardeddegree: '' });
    // this.setState({ awardedon: '' });
    // this.setState({ instemail: '' });
    // this.setState({ instphone: '' });
    // this.setState({ insaddr: '' });
    // this.setState({ inscity: '' });
    // this.setState({ instate: '' });
    // this.setState({ inszip: '' });

    this.setState({ errors: '' });
  };

  nexttab = () => {
    $("#tab3").addClass("active");
    $("#tab2").removeClass("active");
    $(".educationtab").removeClass("active");
    $(".testscore").addClass("active");
  };

  prevtab = () => {
    $("#tab1").addClass("active");
    $("#tab2").removeClass("active");
    $(".educationtab").removeClass("active");
    $(".generaltab").addClass("active");
  };


  render() {
    
    return template.call(this);
  }
}

export default AppEducation;
