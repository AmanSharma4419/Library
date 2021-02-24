import React from "react";
import template from "./Personalinfo.jsx";
import config from "../../config.json";

import $ from "jquery";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var baseurl = `${config.baseurl}`;

// API Call Url //
function submitForm(contentType, data, setResponse, path) {
  // console.log('submitForm storestudentgeninfo', data);
  axios({
    url: baseurl + `/storestudentgeninfo`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
      //window.location.reload(false);

      // setTimeout(function () {
      // window.location.reload(true);
      //  }, 3000);
    })
    .catch((error) => {
      setResponse("error");
    });
}

class Personalinfo extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      country: [],
      states: [],
      cities: [],
      level: [],
      grade: [],

      sdesti: "",
      slevel: "",
      slike: "",
      splan: "",
      title: "",
      middleName: "",
      fname: "",
      lname: "",
      dateofbirth: "",
      flang: "",
      citiship: "",
      passno: "",
      sgender: "",
      smarital: "",
      saddr1: "",
      saddr2: "",
      scity: "",
      scountry: "",
      sstate: "",
      szip: "",
      semail: "",
      sphcode: "",
      sphno: "",
      smbcode: "",
      smbno: "",
      kname: "",
      kcontact: "",
      sdob: "",
      edusublevel: [],

      xxxx: new Date(),

      errors: {},
      formData: new FormData(),
      contentclose3: true,
      completeprofile: localStorage.getItem("completeprofile"),
    };

    axios.get(baseurl + "/get_country").then((response) => {
      console.log(response);

      this.setState({
        country: response.data,
      });
    });
    /*
     handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };*/

    axios.get(baseurl + "/get_leveldetails").then((response) => {
      console.log(response);
      this.setState({
        //level: response.data.level,
        grade: response.data.grade,
      });
    });

    this.getGeneraldata();
  }

  closepop4 = () => {
    this.setState({
      contentclose3: false,
    });
  };

  nexttab = () => {
    $("#tab2").addClass("active");
    $("#tab1").removeClass("active");
    $(".generaltab").removeClass("active");
    $(".educationtab").addClass("active");
  };

  getGeneraldata() {
    axios
      .get(baseurl + "/get_generalinfo/" + localStorage.getItem("studentid"))
      .then((response) => {
        //console.log(response.data[0].state);
        //alert(response.data.length);
        //alert(new Date(response.data[0].dateof_birth)+'--'+response.data[0].dateof_birth);

        if (response.data.length > "0") {
          if (response.data[0].dateof_birth != null) {
            var sdob = new Date(response.data[0].dateof_birth);
          }

          axios
            .get(baseurl + "/get_state/" + response.data[0].addr_country)
            .then((response) => {
              this.setState({
                states: response.data,
              });
            });

          axios
            .get(baseurl + "/get_city/" + response.data[0].state)
            .then((response) => {
              this.setState({
                cities: response.data,
              });
            });


          this.setState({
            //examdate: new Date(response.data[0].exam_date),
            sdesti: response.data[0].study_destination
              ? response.data[0].study_destination
              : "",
            slevel: response.data[0].study_level_id
              ? response.data[0].study_level_id
              : "",
            slike: response.data[0].study_course
              ? response.data[0].study_course
              : "",
            splan: response.data[0].year ? response.data[0].year : "",

            fname: response.data[0].first_name
              ? response.data[0].first_name
              : "",
            lname: response.data[0].last_name ? response.data[0].last_name : "",
            dateofbirth: sdob,
            flang: response.data[0].first_language
              ? response.data[0].first_language
              : "",
            citiship: response.data[0].nationality
              ? response.data[0].nationality
              : "",
            passno: response.data[0].passport_no
              ? response.data[0].passport_no
              : "",
            sgender: response.data[0].gender ? response.data[0].gender : "",
            smarital: response.data[0].marital_status
              ? response.data[0].marital_status
              : "",

            saddr: response.data[0].address ? response.data[0].address : "",
            scity: response.data[0].city ? response.data[0].city : "",
            scountry: response.data[0].addr_country
              ? response.data[0].addr_country
              : "",
            sstate: response.data[0].state ? response.data[0].state : "",
            szip: response.data[0].zipcode ? response.data[0].zipcode : "",
            semail: response.data[0].addr_email
              ? response.data[0].addr_email
              : "",
            sphcode: response.data[0].ph_code ? response.data[0].ph_code : "",
            sphno: response.data[0].phone ? response.data[0].phone : "",
            smbcode: response.data[0].cell_code
              ? response.data[0].cell_code
              : "",
            smbno: response.data[0].cellphone ? response.data[0].cellphone : "",
          });

          axios
            .get(
              baseurl + "/geteducatlevel/" + response.data[0].study_destination
            )
            .then((response) => {
              this.setState({
                edusublevel: response.data,
              });
            });
        }
      });
  }

  handleSdestiChange = (event) => {
    this.setState({ sdesti: event.target.value });
    axios
      .get(baseurl + "/geteducatlevel/" + event.target.value)
      .then((response) => {
        this.setState({
          edusublevel: response.data,
        });
      });
  };
  handleSlevelChange = (event) => {
    this.setState({ slevel: event.target.value });
  };
  handleSlikeChange = (event) => {
    this.setState({ slike: event.target.value });
  };
  handleSplanChange = (event) => {
    this.setState({ splan: event.target.value });
  };

  handleFnameChange = (event) => {
    this.setState({ fname: event.target.value });
  };
  handleTnameChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleLnameChange = (event) => {
    this.setState({ lname: event.target.value });
  };
  handleMnameChange = (event) => {
    this.setState({ middleName: event.target.value });
  };
  //handleDobChange = (event) => { this.setState({ dateofbirth: event.target.value }); };
  handleDobChange = (date) => {
    this.setState({ dateofbirth: date });
  };

  handleFlangChange = (event) => {
    this.setState({ flang: event.target.value });
  };
  handleKnameChange = (event) => {
    this.setState({ kname: event.target.value });
  };
  handleKcontactChange = (event) => {
    this.setState({ kcontact: event.target.value });
  };
  handleCitishipChange = (event) => {
    this.setState({ citiship: event.target.value });
  };
  handlePassnoChange = (event) => {
    this.setState({ passno: event.target.value });
  };
  handleSgenderChange = (event) => {
    this.setState({ sgender: event.target.value });
  };
  handleSmaritalChange = (event) => {
    this.setState({ smarital: event.target.value });
  };

  handleSaddr1Change = (event) => {
    this.setState({ saddr1: event.target.value });
  };
  handleSaddr2Change = (event) => {
    this.setState({ saddr2: event.target.value });
  };
  handleScityChange = (event) => {
    this.setState({ scity: event.target.value });
  };
  handleScountryChange = (event) => {
    this.setState({ scountry: event.target.value });
    axios.get(baseurl + "/get_state/" + event.target.value).then((response) => {
      this.setState({
        states: response.data,
      });
      this.setState({
        cities: [],
      });
    });
  };
  handleSstateChange = (event) => {
    this.setState({ sstate: event.target.value });
    axios.get(baseurl + "/get_city/" + event.target.value).then((response) => {
      this.setState({
        cities: response.data,
      });
    });
  };
  handleSzipChange = (event) => {
    this.setState({ szip: event.target.value });
  };
  handleSemailChange = (event) => {
    this.setState({ semail: event.target.value });
  };
  handleSphcodeChange = (event) => {
    var regrx = /^[0-9]+$/;
    if (event.target.value.match(regrx) || event.target.value === "")
      this.setState({ sphcode: event.target.value });
  };
  handleSphnoChange = (event) => {
    var regrx = /^[0-9]+$/;
    if (event.target.value.match(regrx) || event.target.value === "")
      this.setState({ sphno: event.target.value });
  };
  handleSmbcodeChange = (event) => {
    var regrx = /^[0-9]+$/;
    if (event.target.value.match(regrx) || event.target.value === "")
      this.setState({ smbcode: event.target.value });
  };
  handleSmbnoChange = (event) => {
    var regrx = /^[0-9]+$/;
    if (event.target.value.match(regrx) || event.target.value === "")
      this.setState({ smbno: event.target.value });
  };

  validate = () => {
    debugger;
    const errors = {};

    var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const semail = this.state.semail.trim();

    var regAln = /^[a-zA-Z0-9]+$/;
    var pasmax = /^.{4,20}$/;
    var zipmax = /^.{3,8}$/;
    var minmax = /^.{9,14}$/;
    //var code = /^\+\d{1,2}$/
    var code = /^\d{2}$/;

    var regNam = /^[a-zA-Z\s]+$/;

    //alert( this.state.fname.trim().length );

    //if($("#examdate").val().trim() === '') { errors.xxxx = 'Please select'; }

    if (this.state.sdesti === "") {
      errors.sdesti = "Please select";
    }
    if (this.state.slevel === "") {
      errors.slevel = "Please select";
    }
    if (this.state.slike === "") {
      errors.slike = "Please select";
    }
    if (this.state.splan === "") {
      errors.splan = "Please select";
    }

    if (this.state.title === ""){
      errors.title = "This is required";
    }

    if (this.state.fname === "") {
      errors.fname = "This is required";
    } else if (this.state.fname.trim().length < 3) {
      errors.fname = "Enter valid name";
    } else if (!this.state.fname.match(regNam)) {
      errors.fname = "Enter valid name";
    }

    if (this.state.middleName && this.state.middleName.trim().length < 2) {
      errors.middleName = "Enter valid name";
    } else if (!this.state.middleName.match(regNam)) {
      errors.middleName = "Enter valid name";
    }

    if (this.state.lname === "") {
      errors.lname = "This is required";
    } else if (this.state.lname.trim().length < 2) {
      errors.lname = "Enter valid name";
    } else if (!this.state.lname.match(regNam)) {
      errors.lname = "Enter valid name";
    }

    //if(this.state.dateofbirth.trim() === '') { errors.dateofbirth = 'This is required'; }
    if ($("#dateofbirth").val().trim() === "") {
      errors.dateofbirth = "This is required";
    }

    if (this.state.flang === "") {
      errors.flang = "This is required";
    }
    if (this.state.citiship === "") {
      errors.citiship = "Please select";
    }

    if (this.state.passno === "") {
      errors.passno = "This is required";
    } else if (!this.state.passno.match(pasmax)) {
      errors.passno = "Enter valid number";
    } else if (!this.state.passno.match(regAln)) {
      errors.passno = "Enter valid number";
    }

    if (this.state.sgender === "") {
      errors.sgender = "Please select";
    }
    if (this.state.smarital === "") {
      errors.smarital = "Please select";
    }

    if (this.state.saddr === "") {
      errors.saddr = "This is required";
    } else if (this.state.saddr.trim().length < 15) {
      errors.saddr = "Enter valid address";
    }

    if (this.state.scity === "") {
      errors.scity = "This is required";
    }
    // else if( this.state.scity.trim().length <= 5 ) { errors.scity = 'Enter valid City/Town'; }

    if (this.state.scountry === "") {
      errors.scountry = "Please select";
    }

    if (this.state.sstate === "") {
      errors.sstate = "This is required";
    }
    //else if( this.state.sstate.trim().length <= 5 ) {  errors.sstate = 'Enter valid Province/State'; }

    if (this.state.szip === "") {
      errors.szip = "This is required";
    } else if (!$("#szip").val().match(zipmax)) {
      errors.szip = "Enter valid code";
    } else if (!$("#szip").val().match(regAln)) {
      errors.szip = "Enter valid code";
    }
    //else if(!this.state.szip.match(zipmax)) { errors.szip = 'Enter valid postal/zip code'; }
    //else if(!this.state.szip.match(regAln)) { errors.szip = 'Enter valid postal/zip code'; }

    if (this.state.semail === "") {
      errors.semail = "This is required";
    } else if (!semail.match(regEx)) {
      errors.semail = "Invalid email";
    }

    if (this.state.sphcode === "") {
      errors.sphno = "Code is required";
    } else if (!$("#sphcode").val().match(code)) {
      errors.sphno = "Enter valid code";
    }
    //else if(!this.state.sphcode.match(code)) { errors.sphno = 'Enter valid code'; }

    if (this.state.sphno === "") {
      errors.sphno = "This is required";
    } else if (!this.state.sphno.match(minmax)) {
      errors.sphno = "Enter a valid phone number between 9 to 14 digits";
    }

    if (this.state.smbcode === "") {
      errors.smbno = "Code is required";
    } else if (!$("#smbcode").val().match(code)) {
      errors.smbno = "Enter valid code";
    }
    //else if(!this.state.smbcode.match(code)) { errors.smbno = 'Enter valid code'; }

    if (this.state.smbno === "") {
      errors.smbno = "This is required";
    } else if (!this.state.smbno.match(minmax)) {
      errors.smbno = "Enter a valid phone number between 9 to 14 digits";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  onSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    //this.state.formData.append("examdate", $("#examdate").val());
    this.state.formData.append("sdesti", this.state.sdesti);
    this.state.formData.append("slevel", this.state.slevel);
    this.state.formData.append("slike", this.state.slike);
    this.state.formData.append("splan", this.state.splan);
    this.state.formData.append("fname", this.state.fname);
    this.state.formData.append("lname", this.state.lname);
    this.state.formData.append("dateofbirth", $("#dateofbirth").val());
    this.state.formData.append("flang", this.state.flang);
    this.state.formData.append("citiship", this.state.citiship);
    this.state.formData.append("passno", this.state.passno);
    this.state.formData.append("sgender", this.state.sgender);
    this.state.formData.append("smarital", this.state.smarital);
    this.state.formData.append("saddr", this.state.saddr);
    this.state.formData.append("scity", this.state.scity);
    this.state.formData.append("scountry", this.state.scountry);
    this.state.formData.append("sstate", this.state.sstate);
    this.state.formData.append("szip", this.state.szip);
    this.state.formData.append("semail", this.state.semail);
    this.state.formData.append("sphcode", this.state.sphcode);
    this.state.formData.append("sphno", this.state.sphno);
    this.state.formData.append("smbcode", this.state.smbcode);
    this.state.formData.append("smbno", this.state.smbno);

    //this.state.formData.append("student_id", 1);
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    console.log('PersonalInfo State', this.state);
    // submitForm(
    //   "form-data",
    //   this.state.formData,
    //   (msg) => {
    //     toast.success(msg.message);
    //     setTimeout(function () {
    //       //window.location.reload(true);
    //       $("#tab2").addClass("active");
    //       $("#tab1").removeClass("active");
    //       $(".generaltab").removeClass("active");
    //       $(".educationtab").addClass("active");
    //     }, 3000);
    //   },
    //   "student"
    // );

    //submitForm("form-data", this.state.formData, (msg) => console.log(msg.message), 'student');
    //submitForm("form-data", this.state.formData, (msg) => toast.success("ok"), 'student');

    // this.setState({ sdesti: '' });
    // this.setState({ slevel: '' });
    // this.setState({ slike: '' });
    // this.setState({ splan: '' });
    // this.setState({ fname: '' });
    // this.setState({ lname: '' });
    // this.setState({ dateofbirth: '' });
    // this.setState({ flang: '' });
    // this.setState({ citiship: '' });
    // this.setState({ passno: '' });
    // this.setState({ sgender: '' });
    // this.setState({ smarital: '' });
    // this.setState({ saddr: '' });
    // this.setState({ scity: '' });
    // this.setState({ scountry: '' });
    // this.setState({ sstate: '' });
    // this.setState({ szip: '' });
    // this.setState({ semail: '' });
    // this.setState({ sphcode: '' });
    // this.setState({ sphno: '' });
    // this.setState({ smbcode: '' });
    // this.setState({ smbno: '' });

    this.setState({ errors: "" });

    toast.success("Saved successfully!..");
  };

  render() {
    return template.call(this);
  }
}

export default Personalinfo;
