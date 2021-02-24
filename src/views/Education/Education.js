import React from "react";
import template from "./Education.jsx";
import config from "../../config.json";
import $ from "jquery";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var baseurl = `${config.baseurl}`;

// API Call Url //
function submitForm(contentType, data, setResponse, path) {
  console.log("Data", data);
  axios({
    url: baseurl + `/storestuedusummary`,
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
      //   window.location.reload(true);
      // }, 3000);
    })
    .catch((error) => {
      setResponse("error");
    });
}

class Education extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onAddEducation = this.onAddEducation.bind(this);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      country: [],
      level: [],
      grade: [],
      graderange: [],
      elevel: [],
      eLevelValue: "",
      edusublevel: [],
      counter: 1,
      educountryid: "",
      highedulevel: "",
      gradingscheme: "",
      gradingscale1: [],
      gradingscale: "",
      gradingscaleoutoff: "",
      gradeaverage: "",
      recentcheck: 0,
      recent_summ: "",
      edulevel: [""],
      insticountry: [""],
      institutename: [""],
      instituteDetails: [{}],
      langinstruction: [""],
      attendedfrom: [""],
      attendedto: [""],
      awardeddegree: [""],
      awardedon: [""],

      instemail: [""],
      instphone: [""],
      insaddr: [""],
      schoolsattended: ["name"],
      inscity: [""],
      instate: [""],
      inestate: [],
      inecity: [],
      inszip: [""],
      instphone2: "",
      sdate1: "",
      sdate2: "",
      sdate3: "",

      errors: {},
      errors1: {},
      formData: new FormData(),
      content: true,
      gradingrange: "",
      maxrange: "",
      minimumrange: "",

      MostrecentChange: true,

      onchangeDate: [""],
      higheduleveltype: "",
      highest_education_type: "",
      onchnage: false,
      gradeaverageselect: false,
      gradeerror: false,
      inputtext: false,
    };

    axios.get(baseurl + "/get_country").then((response) => {
      this.setState({
        country: response.data,
      });
    });

    // axios.get(baseurl + '/geteducatlevel').then(response => {
    //   this.setState({
    //     edusublevel: response.data,
    //   });
    // })

    axios.get(baseurl + "/get_leveldetails").then((response) => {
      this.setState({
        level: response.data.level,
        //edusublevel: response.data.edusublevel,
        //grade: response.data.grade,
        //graderange: response.data.graderange,
        // elevel: response.data.edulevel,

        // eLevelValue: response.data.edulevel, to be final
      });
    });

    // axios.get(baseurl + '/get_state/' + event.target.value).then(response => {
    //   // const inestate = this.state.inestate
    //   this.setState(
    //     {
    //       inestate: response.data
    //     });
    // })
    this.getEdusummary();
  }

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

  getEdusummary() {
    //axios.get('https://formeeadmin.bicsglobal.com/get_edusummary/1').then(response => {
    axios
      .get(baseurl + "/get_edusummary/" + localStorage.getItem("studentid"))
      .then((response) => {
        console.log("main response*****", response.data.summary[0]);
        // alert(response.data.summary[0].highest_educationlevel_id)
        if (response.data.summary.length > 0) {
          this.setState({
            educountryid: response.data.summary[0].education_country_id,
            highedulevel: response.data.summary[0].highest_educationlevel_id,
            gradingscheme: response.data.summary[0].grading_scheme_id,
            gradingscale: response.data.summary[0].grading_scheme_range_id,
            gradeaverage: response.data.summary[0].grade_average,
            recentcheck: response.data.summary[0].recent_check,
            higheduleveltype: response.data.summary[0].highest_education_type,
            eLevelValue: response.data.summary[0].educationlevel_id,
            sdesti: response.data.schools[0].institute_country_id,
          });

          console.log("main edulevel", this.state.highedulevel);

          axios
            .get(
              baseurl +
              "/admin_system_grading_range/" +
              this.state.gradingscheme
            )
            .then((response) => {
              //this.setState({ gradingscale1: response.data });
              if (response.data.gradingrange == 0) {
                this.setState({
                  gradingrange: response.data.gradingrange,
                  gradingscale1: response.data.result,
                });
              } else {
                this.setState({
                  gradingrange: response.data.gradingrange,
                  minimumrange: response.data.result.minimum,
                  maxrange: response.data.result.maximum,
                });
              }
            });

          axios
            .get(baseurl + "/geteducatlevel/" + this.state.educountryid)
            .then((response) => {
              console.log("res edulevel", response);
              this.setState(
                {
                  edusublevel: response.data,
                },
                () => console.log("edusub", this.state.edusublevel)
              );
            });

          axios
            .get(baseurl + "/geteducatlevel/" + response.data.schools[0].institute_country_id)
            .then((response) => {
              this.setState({
                elevel: response.data,
              });
              console.log("target123", response)
            });

          console.log(
            "eduCatidd",
            response.data.summary[0].education_country_id
          );

          // Grading scheme
          axios
            .get(
              baseurl +
              "/admin_system_grading_range/" +
              this.state.gradingscheme
            )
            .then((res) => {
              if (res.data.gradingrange == 0) {
                this.setState({
                  gradingrange: res.data.gradingrange,
                  gradingscale1: res.data.result,
                });
              } else {
                this.setState({
                  gradingrange: res.data.gradingrange,
                  minimumrange: res.data.result.minimum,
                  maxrange: res.data.result.maximum,
                  gradingscale:
                    response.data.summary[0].grading_scheme_range_id,
                });
              }
            });

          axios
            .get(
              baseurl + "/get_leveldetailseducatid/" + this.state.highedulevel
            )
            .then((response) => {
              console.log("leeeve", response.data);
              this.setState({
                grade: response.data.grade,
              });
            });

          if (response.data.summary[0].recent_check == "1") {
            this.setState({ recent_summ: "checked" });
          }
        }

        if (response.data.schools.length > "0") {
          if (response.data.schools[0].attended_from != null) {
            let datearr = response.data.schools[0].attended_from.split(",");
            var sdate1 = [];
            datearr.forEach((date) => {
              sdate1.push(new Date(date));
            });
          }

          if (response.data.schools[0].attended_to != null) {
            var sdate2 = [];
            let datearr = response.data.schools[0].attended_to.split(",");
            datearr.forEach((date) => {
              sdate2.push(new Date(date));
            });
          }

          if (response.data.schools[0].awarded_on != null) {
            var sdate3 = [];
            let datearr = response.data.schools[0].awarded_on.split(",");
            datearr.forEach((date) => {
              sdate3.push(new Date(date));
            });
          }

          let countryid = response.data.schools[0].institute_country_id.split(
            ","
          );
          const inestate = [];
          for (let i in countryid) {
            inestate.push([]);
          }
          countryid.forEach((id, index) => {
            axios.get(baseurl + "/get_state/" + id).then((response) => {
              console.log("stateResponse------1", response.data);
              // inestate.push(response.data)
              inestate[index] = response.data;
              this.setState({
                inestate,
              });
              console.log("stateResponse----2", inestate);
            });
          });

          let state = response.data.schools[0].state.split(",");
          const inecity = [];
          for (let i in state) {
            inecity.push([]);
          }
          state.forEach((id, index) => {
            axios.get(baseurl + "/get_city/" + id).then((response) => {
              console.log("CityResponse------1", response.data, id);
              inecity[index] = response.data;
              this.setState({
                inecity,
              });
            });
          });

          const edulevel = response.data.schools[0].educationlevel_id.split(
            ","
          );
          const insticountry = response.data.schools[0].institute_country_id.split(
            ","
          );
          const institutename = response.data.schools[0].institute_name.split(
            ","
          );
          const langinstruction = response.data.schools[0].language_instruction.split(
            ","
          );
          const awardeddegree = response.data.schools[0].awarded_degree.split(
            ","
          );
          const instemail = response.data.schools[0].institute_email.split(",");
          const instphone = response.data.schools[0].institute_phone.split(",");
          const insaddr = response.data.schools[0].address.split("+");
          const inscity = response.data.schools[0].city.split(",");
          const instate = response.data.schools[0].state.split(",");
          const inszip = response.data.schools[0].zipcode.split(",");

          for (let i = 0; i < institutename.length - 1; i++) {
            const schoolsattendedArr = this.state.schoolsattended;
            schoolsattendedArr.push("");
            this.setState({ schoolsattended: schoolsattendedArr });
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
            inszip,
          });
          console.log("AttendedForm", this.state.attendedfrom);
          console.log("stateResponse------3", instate);
          console.log("CityResponse------3", inscity);
        }
      });
  }

  handleEducountryidChange = (event) => {
    // alert(event.target.value);
    this.setState({
      educountryid: event.target.value,
      edusublevel: [],
      grade: [],
      gradingscale1: [],
      gradingscale: "",
      highedulevel: "",
      gradingscheme: "",
    });
    axios
      .get(baseurl + "/geteducatlevel/" + event.target.value)
      .then((response) => {
        this.setState({
          edusublevel: response.data,
        });
      });
  };

  handleHighedulevelChange = (event) => {
    // alert(event.target.value);
    var itemid;
    // alert (event.target.value);
    this.setState({
      grade: [],
      gradingscale1: [],
      gradingscale: "",
    });
    axios
      .get(baseurl + "/get_leveldetailseducatid/" + event.target.value)
      .then((response) => {
        this.setState(
          {
            grade: response.data.grade,
          },
          () => { }
        );
      });

    // To check whether selected option is mainlevel or sublevel
    console.log("this.grade", this.state.grade);
    console.log("evenenen", event.target.value);
    if (event.target.value) {
      this.setState({ onchange: true });
    }
    this.state.edusublevel.map((ub, index) => {
      var found = this.state.edusublevel.findIndex(function (element) {
        if (element.id == event.target.value) {
          itemid = element.id;
        }
        return element.id == event.target.value;
      });

      if (found >= 0) {
        this.setState({
          higheduleveltype: "mainlevel",
          highedulevel: itemid,
        });
      } else {
        var elementfound = ub.sublevel.findIndex(function (element) {
          if (element.id == event.target.value) {
            itemid = element.id;
          }
          return element.id == event.target.value;
        });
        if (elementfound >= 0) {
          this.setState({
            higheduleveltype: "sublevel",
            highedulevel: itemid,
          });
        }
      }
    });
    console.log("itemid", itemid);

    console.log("higheduleveltype111222", this.state.highedulevel);
    console.log("higheduleveltypeee", this.state.higheduleveltype);

    console.log("itemid", itemid);
    var iddata = itemid;
    this.setState({
      highedulevel: 0,
    });
    console.log("higheduleveltype", iddata);
    this.setState(
      {
        highedulevel: iddata,
      },
      () => { }
    );
    console.log("highedulevellast", this.state.highedulevel);
  };

  handleGradingscaleChangeinputtext = (event) => {
    this.setState(
      {
        gradingscale: event.target.value,
        inputtext: true,
      },
      () => {
        console.log("sddd", this.state.gradingscale);
      }
    );
  };
  handleGradingschemeChange = (event) => {
    // localStorage.setItem("gradeValue", event.target.value);
    this.setState({ gradingscheme: event.target.value });
    //get admin_system_grading_range
    axios
      .get(baseurl + "/admin_system_grading_range/" + event.target.value)
      .then((response) => {
        if (response.data.gradingrange == 0) {
          this.setState({
            gradingrange: response.data.gradingrange,
            gradingscale1: response.data.result,
          });
        } else {
          this.setState({
            gradingrange: response.data.gradingrange,
            minimumrange: response.data.result.minimum,
            maxrange: response.data.result.maximum,
            gradingscale: "",
          });
        }
      });
  };
  handleGradingscaleChange = (event) => {
    this.setState({ gradingscale: event.target.value });
  };
  handleGradingscaleoutoffChange = (event) => {
    this.setState({ gradingscaleoutoff: event.target.value })
  }
  handleGradeaverageChange = (event) => {
    this.setState({ gradeaverage: event.target.value });
  };
  handleMostrecentChange = (event) => {
    var datefal = 0;
    var recent_summ = "";
    if (event.target.value == "0") {
      datefal = 1;
      recent_summ = "checked";
    } else {
      datefal = 0;
      recent_summ = "";
    }
    this.setState({ recentcheck: datefal });
    this.setState({ recent_summ: recent_summ });
  };

  // this.setState({ recentcheck:  this.state.recentcheck != 0});

  // handleMostrecentChange = (event) => { this.setState({ MostrecentChange: true}); }
  maxDateHandler = (all_dates) => {
    let recentDataIndex = -1;
    var max_dt = all_dates[0],
      max_dtObj = new Date(all_dates[0]);
    all_dates.forEach(function (dt, index) {
      if (new Date(dt) > max_dtObj) {
        max_dt = dt;
        max_dtObj = new Date(dt);
      }
    });
    return max_dt.toLocaleString();
  };

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

    let recentDataIndex = -1;
    var max_dt = all_dates[0],
      max_dtObj = new Date(all_dates[0]);
    all_dates.forEach(function (dt, index) {
      if (new Date(dt) > max_dtObj) {
        max_dt = dt;
        max_dtObj = new Date(dt);
      }
    });
    return all_dates.indexOf(max_dt);
  };

  handleEdulevelChange = (event, index) => {
    this.setState({ eLevelValue: event.target.value });
    // const edulevelclone = this.state.edulevel;
    // edulevelclone[index] = event.target.value;
    // this.setState({ edulevel: edulevelclone });
  };
  handleInsticountryChange = (event, index) => {
    this.setState({ sdesti: event.target.value });
    console.log("target", event.target.value);
    axios
      .get(baseurl + "/geteducatlevel/" + event.target.value)
      .then((response) => {
        this.setState({
          elevel: response.data,
        });
        console.log("target", response)
      });
    const insticountryclone = this.state.insticountry;
    insticountryclone[index] = event.target.value;
    this.setState({ insticountry: insticountryclone });
    axios.get(baseurl + "/get_state/" + event.target.value).then((response) => {
      // console.log("StateResponse",response)
      const inestate = this.state.inestate;
      const inecity = this.state.inecity;
      inestate[index] = response.data;
      inecity[index] = [];
      this.setState({
        inestate,
        inecity,
      });
    });
  };
  handleInstitutenameChange = (event, index) => {
    const institutenameclone = this.state.institutename;
    institutenameclone[index] = event.target.value;
    this.setState({ institutename: institutenameclone });
  };
  handleLanginstructionChange = (event, index) => {
    const langinstructionclone = this.state.langinstruction;
    langinstructionclone[index] = event.target.value;
    this.setState({ langinstruction: langinstructionclone });
  };
  handleAwardeddegreeChange = (event, index) => {
    const awardeddegreeclone = this.state.awardeddegree;
    awardeddegreeclone[index] = event.target.value;
    this.setState({ awardeddegree: awardeddegreeclone });
  };
  handleInstemailChange = (event, index) => {
    const instemailclone = this.state.instemail;
    instemailclone[index] = event.target.value;
    this.setState({ instemail: instemailclone });
  };
  handleInstphoneChange = (event, index) => {
    console.log("asd", event.target.value);
    const instphoneeclone = this.state.instphone;
    instphoneeclone[index] = event.target.value;
    var regrx = /^[0-9]+$/;
    if (event.target.value.match(regrx) || event.target.value === "")
      this.setState({
        instphone: instphoneeclone,
        instphone2: event.target.value,
      });
  };
  handleInsaddrChange = (event, index) => {
    const insaddrclone = this.state.insaddr;
    insaddrclone[index] = event.target.value;
    this.setState({ insaddr: insaddrclone });
  };
  handleInscityChange = (event, index) => {
    const inscityclone = this.state.inscity;
    inscityclone[index] = event.target.value;
    this.setState({ inscity: inscityclone });
    console.log("city Change", inscityclone);
  };
  handleAttendedfromChange = (date, index) => {
    const attendedfrom = this.state.attendedfrom;
    attendedfrom[index] = date;
    this.setState({ attendedfrom });
  };
  handleAttendedtoChange = (date, index) => {
    const attendedto = this.state.attendedto;
    attendedto[index] = date;
    this.setState({ attendedto });
  };
  handleAwardedonChange = (date, index) => {
    const awardedon = this.state.awardedon;
    awardedon[index] = date;
    this.setState({ awardedon, onchangeDate: date });
  };

  handleInstateChange = (event, index) => {
    const instateclone = this.state.instate;
    instateclone[index] = event.target.value;
    this.setState({ instate: instateclone });
    axios.get(baseurl + "/get_city/" + event.target.value).then((response) => {
      let inecity = this.state.inecity;
      inecity[index] = response.data;
      this.setState({
        inecity,
      });
    });
  };
  handleInszipChange = (event, index) => {
    const inszipclone = this.state.inszip;
    inszipclone[index] = event.target.value;
    this.setState({ inszip: inszipclone });
  };

  closepop = () => {
    this.setState({
      content: false,
    });
  };

  // validate1 = () => {
  //   const errors1 = {};
  //   var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   var minmax = /^.{9,14}$/
  //   if (this.state.instphone2 === '') { errors1.instphone2 = 'This is required'; }
  //   else if (!this.state.instphone2.match(minmax)) { errors1.instphone2 = 'Enter valid phone number'; }

  //   return Object.keys(errors1).length === 0 ? null : errors1;
  // }

  validate = () => {
    const errors = [];

    var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const instemail = String(this.state.instemail).trim();

    var regAln = /^[a-zA-Z0-9]+$/;
    var pasmax = /^.{15,20}$/;
    var zipmax = /^.{3,8}$/;
    var minmax = /^.{9,14}$/;
    var code = /^\+\d{1,2}$/;

    var regNam = /^[a-zA-Z\s]+$/;

    if (this.state.inputtext) {
      // alert(this.state.gradingscale);
      // alert(this.state.minimumrange);
      // alert(this.state.maxrange);

      if (
        this.state.gradingscale > this.state.minimumrange &&
        this.state.gradingscale < this.state.maxrange
      ) {
        // alert("ddddsds");
        this.setState({ gradeerror: false }, () => {
          console.log("elseee", this.state.gradeerror);
        });
      } else {
        // alert();
        errors.push({
          gradingscale:
            "Enter values between" +
            this.state.minimumrange +
            " to " +
            this.state.minimumrange,
        });
        this.setState({ gradeerror: true }, () => {
          //console.log("****data",this.state.gradeerror)
        });
      }
    }
    this.state.schoolsattended.forEach((data, index) => {
      errors.push({});

      // if (this.state.edulevel[index] === "") {
      //   errors[index].edulevel = "Please select";
      // }
      if (this.state.edulevel === "") {
        errors.edulevel = "Please select";
      }
      if (this.state.insticountry[index] === "") {
        errors[index].insticountry = "Please select";
      }

      if (this.state.institutename[index].trim() === "") {
        errors[index].institutename = "This is required";
      } else if (this.state.institutename[index].trim().length < 3) {
        errors[index].institutename = "Enter valid name";
      } else if (!this.state.institutename[index].match(regNam)) {
        errors[index].institutename = "Enter valid name";
      }

      if (this.state.langinstruction[index].trim() === "") {
        errors[index].langinstruction = "This is required";
      } else if (this.state.langinstruction[index].trim().length < 3) {
        errors[index].langinstruction = "Enter valid name";
      } else if (!this.state.langinstruction[index].match(regNam)) {
        errors[index].langinstruction = "Enter valid name";
      }

      if (this.state.attendedfrom[index] === "") {
        errors[index].attendedfrom = "This is required";
      }
      if (this.state.attendedto[index] === "") {
        errors[index].attendedto = "This is required";
      }

      var startDate = new Date(this.state.attendedfrom[index]);
      var endDate = new Date(this.state.attendedto[index]);

      if (startDate > endDate) {
        errors[index].attendedto =
          "Attended institute TO date should be greater than Attended institute FROM date";
      }

      if (this.state.awardeddegree[index] === "") {
        errors[index].awardeddegree = "This is required";
      }
      if (this.state.awardedon[index] === "") {
        errors[index].awardedon = "This is required";
      }

      if (this.state.instemail[index].trim() === "") {
        errors[index].instemail = "This is required";
      } else if (!instemail.match(regEx)) {
        errors[index].instemail = "Invalid email";
      }

      if (this.state.instphone[index] === "") {
        errors[index].instphone = "This is required";
      } else if (!this.state.instphone[index].match(minmax)) {
        errors[index].instphone = "Enter a valid phone number between 9 to 14 digits";
      }

      if (this.state.insaddr[index].trim() === "") {
        errors[index].insaddr = "This is required";
      } else if (this.state.insaddr[index].trim().length < 15) {
        errors[index].insaddr = "Enter valid address";
      }

      if (this.state.inscity[index] === "") {
        errors[index].inscity = "This is required";
      }
      //else if( this.state.inscity.trim().length <= 5 ) { errors.inscity = 'Enter valid City/Town'; }

      if (this.state.instate[index] === "") {
        errors[index].instate = "This is required";
      }
      //else if( this.state.instate.trim().length <= 5 ) { errors.instate = 'Enter valid Province/State'; }

      if (this.state.inszip[index] === "") {
        errors[index].inszip = "This is required";
      } else if (!this.state.inszip[index].match(zipmax)) {
        errors[index].inszip = "Enter valid code";
      } else if (!this.state.inszip[index].match(regAln)) {
        errors[index].inszip = "Enter valid code";
      }
    });

    return Object.keys(errors).length === 0 ? null : errors;
  };

  onAddEducation() {
    const schoolsattendedArr = this.state.schoolsattended;
    schoolsattendedArr.push("");
    this.setState({ schoolsattended: schoolsattendedArr });

    const edulevel = this.state.edulevel;
    const insticountry = this.state.insticountry;
    const institutename = this.state.institutename;
    const langinstruction = this.state.langinstruction;
    const attendedfrom = this.state.attendedfrom;
    const attendedto = this.state.attendedto;
    const awardeddegree = this.state.awardeddegree;
    const awardedon = this.state.awardedon;
    const instemail = this.state.instemail;
    const instphone = this.state.instphone;
    const insaddr = this.state.insaddr;
    const inscity = this.state.inscity;
    const instate = this.state.instate;
    const inszip = this.state.inszip;
    const inestate = this.state.inestate;
    const inecity = this.state.inecity;

    edulevel.push("");
    insticountry.push("");
    institutename.push("");
    langinstruction.push("");
    attendedfrom.push("");
    attendedto.push("");
    awardeddegree.push("");
    awardedon.push("");
    instemail.push("");
    instphone.push("");
    insaddr.push("");
    inscity.push("");
    instate.push("");
    inszip.push("");
    inestate.push([]);
    inecity.push([]);

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
      inecity,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    let errors = this.validate();
    // const errors = this.validate();
    // this.setState({ errors });
    // if (errors) return;

    this.setState({ errors });
    errors = errors.filter((error) => Object.keys(error).length !== 0);
    if (errors.length > 0) return;

    // const errors1= this.validate1();
    // this.setState({ errors1 });
    // if (errors1) return;

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

    $(".edulevel").each(function (i) {
      edulevelArr.push($(this).val());
    });
    $(".insticountry").each(function (i) {
      insticountryArr.push($(this).val());
    });
    $(".institutename").each(function (i) {
      institutenameArr.push($(this).val());
    });
    $(".langinstruction").each(function (i) {
      langinstructionArr.push($(this).val());
    });
    $(".attendedfrom").each(function (i) {
      attendedfromArr.push($(this).val());
    });
    $(".attendedto").each(function (i) {
      attendedtoArr.push($(this).val());
    });
    $(".awardeddegree").each(function (i) {
      awardeddegreeArr.push($(this).val());
    });
    $(".awardedon").each(function (i) {
      awardedonArr.push($(this).val());
    });
    $(".instemail").each(function (i) {
      instemailArr.push($(this).val());
    });
    $(".instphone").each(function (i) {
      instphoneArrArr.push($(this).val());
    });
    $(".insaddr").each(function (i) {
      insaddrArr.push($(this).val());
    });
    $(".inscity").each(function (i) {
      inscityArr.push($(this).val());
    });
    $(".instate").each(function (i) {
      instateArr.push($(this).val());
    });
    $(".inszip").each(function (i) {
      inszipArr.push($(this).val());
    });

    insaddrArr = insaddrArr.join("+");

    localStorage.setItem("highEduLevelValue", this.state.highedulevel);

    //this.state.formData.append("examdate", $("#examdate").val());
    this.state.formData.append("recent_check", this.state.recentcheck);
    this.state.formData.append("educountryid", this.state.educountryid);
    this.state.formData.append("highedulevel", this.state.highedulevel);

    this.state.formData.append("edulevelvalue", this.state.eLevelValue);

    this.state.formData.append("gradingscheme", this.state.gradingscheme);
    this.state.formData.append("gradingscale", this.state.gradingscale);
    this.state.formData.append("gradeaverage", this.state.gradeaverage);
    this.state.formData.append("gradingscaleoutoff", this.state.gradingscaleoutoff);

    // this.state.formData.append("edulevel", edulevelArr);
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
    // attended_grade_scheme
    // attended_grade_average
    // insti_place

    //this.state.formData.append("student_id", 1);
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append("higheduleveltype", this.state.higheduleveltype);

    //submitForm("form-data", this.state.formData, (msg) => console.log(msg.message), 'student');
    //submitForm("form-data", this.state.formData, (msg) => toast.success(msg.message), 'student');

    submitForm(
      "form-data",
      this.state.formData,
      (msg) => {
        toast.success(msg.message);
        setTimeout(function () {
          $("#tab3").addClass("active");
          $("#tab2").removeClass("active");
          $(".educationtab").removeClass("active");
          $(".testscore").addClass("active");
        }, 3000);
      },
      "student"
    );

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

    this.setState({ errors: "" });
    this.setState({ errors1: "" });

    localStorage.setItem("countryValue", this.state.educountryid);
    localStorage.setItem("highEduLevelValue", this.state.highedulevel);
    localStorage.setItem("gradeValue", this.state.gradingscheme);
  };

  render() {
    return template.call(this);
  }
}

export default Education;
