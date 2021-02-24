import React, { createRef } from "react";
import template from "./FilterStudent1.jsx";

import config from '../../config.json';
import $, { type } from 'jquery';
import axios from 'axios';
import moment from 'moment';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mount } from "enzyme";


var baseurl = `${config.baseurl}`;
var baseurl1 = `${config.baseurl}/`;
// API Call Url //

var momentdate = [];
let i;
let m = moment();
for (i = moment().year(); i <= moment().year() + 1; i++) {
    for (var j = 0; j < 12; j++) {
        momentdate.push(
            m
                .months(j)
                .year(i)
                .format("MMMM YYYY")
        );
    }
}
function submitSearch(contentType, data, setResponse, path) {

    axios({
        url: baseurl + `/store_searches`,
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': contentType
        }
    })
        .then((response) => {
            setResponse(response.data);


        }).catch((error) => {
            setResponse("error");
        })

}



function submitForm(contentType, data, setResponse, path) {

    axios({
        url: baseurl + `/storestuedusummarynew`,
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': contentType
        }
    })
    //  Test Score
    axios({
        url: baseurl + `/storetestscoresnew`,
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': contentType
        }
    })
        .then((response) => {
            setResponse(response.data);
            //window.location.reload(false);


            // setTimeout(function () { 
            //   window.location.reload(true); 
            // }, 3000);

        }).catch((error) => {
            setResponse("error");
        })

}



class FilterStudent1 extends React.Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onsaveSearch = this.onsaveSearch.bind(this)
        this.toggleSearch = this.toggleSearch.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.searchVal = this.searchVal.bind(this);
        this.searchVal1 = this.searchVal1.bind(this);
        this.validate1 = this.validate1.bind(this);
        
        this.highedulevelvalue = React.createRef()
        // this.onAddEducation = this.onAddEducation.bind(this);

        this.state = {
            collapse: true,
            fadeIn: true,
            timeout: 300,
            country: [],
            level: [],
            grade: [],
            graderange: [],
            fullmonth: momentdate,
            elevel: [],
            edusublevel: [],
            allfacultylevel: [],
            allcategorylevel: [],
            universitycourse: [],
            counter: 1,
            study: props.searchHistory.study ? props.searchHistory.study : '',
            uniname: props.searchHistory.universityname ? props.searchHistory.universityname : '',
            location: '',
            educountryid: '',
            highedulevel: '',

            programhighlevel: props.searchHistory.programhighlevel ? props.searchHistory.programhighlevel : '',
            programintake:  props.searchHistory.programintake ? props.searchHistory.programintake : '',
            programcategory: props.searchHistory.programcategory ? props.searchHistory.programcategory : '',
            Programfaculty: props.searchHistory.Programfaculty ? props.searchHistory.Programfaculty : '',

            gradingscheme: '',

            gradeaverage: props.searchHistory.grading_average ? props.searchHistory.grading_average: '',
            // recentcheck: 0,

            gre_examscore: props.searchHistory.gre_score ? props.searchHistory.gre_score: 0,
            gmat_examscore: props.searchHistory.gmat_score ? props.searchHistory.gmat_score: 0,


            recent_summ: props.searchHistory.eligibility_check ? props.searchHistory.eligibility_check : 0,


            univtpe: props.searchHistory.sch_university ? props.searchHistory.sch_university : 0,
            insttype: props.searchHistory.sch_institute ? props.searchHistory.sch_institute : 0,
            schooltype: props.searchHistory.sch_school ? props.searchHistory.sch_school : 0,
            tafestype: props.searchHistory.sch_tafe ? props.searchHistory.sch_tafe : 0,
            searchOption: false,
            searchBtn: false,

            edulevel: [''],
            insticountry: [''],
            institutename: [''],
            instituteDetails: [{}],
            langinstruction: [''],
            attendedfrom: [''],
            attendedto: [''],
            awardeddegree: [''],
            awardedon: [''],


            instemail: [''],
            instphone: [''],
            insaddr: [''],
            schoolsattended: ['name'],
            inscity: [''],
            instate: [''],
            inestate: [],
            inecity: [],
            inszip: [''],


            nationality: '',

            sdate1: '',
            sdate2: '',
            sdate3: '',

            errors: {},
            formData: new FormData(),
            content: true,



            MostrecentChange: true,

            onchangeDate: [''],
            filterdata: [],


            //  Test Score


            examtype: props.searchHistory.exam_type ? props.searchHistory.exam_type : '',

            examPropType: '',

            readingscore: props.searchHistory.reading ? props.searchHistory.reading : '',
            listeningscore: props.searchHistory.listening ? props.searchHistory.listening : '',
            writingscore: props.searchHistory.writing ? props.searchHistory.writing : '',
            speakingscore: props.searchHistory.speaking ? props.searchHistory.speaking : '',
            id: props.searchHistory.id ? props.searchHistory.id : '',


            examtypeCopy: '',
            readingscoreCopy: '',
            listeningscoreCopy: '',
            writingscoreCopy: '',
            speakingscoreCopy: '',




            course_name: [],
            id: [],
            courses: [],
            country_id: props.searchHistory.country_id ? props.searchHistory.country_id : 0,
            alluniversitydetails: [],
            instituteType: [],

            search: false,
            saveHistoryLocationLoaded: props.searchHistory ? true : false,

            instituteCount: '',
            noBtnSelected: localStorage.getItem("noBtnSelected") == "true" ? true : false, 
        };
        this.getEdusummary();

        axios.get(baseurl + '/get_studentSearch/39').then(response => {
            // console.log("Get Student Search" + response)
            console.log(JSON.stringify(response))
        })

        axios.get(baseurl + '/get_country').then(response => {
            this.setState(
                {
                    country: response.data,
                });
        })

     

        axios.get(baseurl + '/getAllcourses').then(response => {
            // console.log("all courses", response)

            this.setState({
                courses: response.data
            });

        })

        axios.get(baseurl + '/getallfaculty').then(response => {
            // console.log('facultys12', response, response.data);
            this.setState({
                allfacultylevel: response.data,
            });
        })

        axios.get(baseurl + '/getallcategory').then(response => {
            // console.log('category', response, response.data);
            this.setState({
                allcategorylevel: response.data,
            });
        })


        // axios.get(baseurl + '/universities').then(response => {
        //     console.log("  Institute Type " + response)
        //     this.setState({
        //         instituteType: response.data
        //     });

        // })


        axios.get(baseurl + '/alluniversitydetails').then(response => {
            let alluniversitydetails = [...response.data.result]
            alluniversitydetails.forEach(university => {
                university.programcourses = []
                for (let programcourse of response.data.programcourses) {
                    programcourse.level_name = programcourse.prerequiste_education
                    if (programcourse.university_id === university.university_id) university.programcourses.push(programcourse)
                }
                return university
            })
            // console.log("All Univeristy Details", response.data, alluniversitydetails)
            this.setState({
                alluniversitydetails
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
       
        this.getTestscoresdata();
        this.getNationality();

    }


    getNationality() {
        axios.get(baseurl1 + 'get_generalinfo/' + localStorage.getItem('studentid')).then(response => {
            // console.log(response);
            //alert(response.data.length);
            //alert(new Date(response.data[0].dateof_birth)+'--'+response.data[0].dateof_birth);

            if ((response.data.length > '0')) {

                if (response.data[0].created_at != null)
                    //options.timeZone = 'UTC';
                    //options.timeZoneName = 'short';
                    //console.log(new Intl.DateTimeFormat('en-US', options).format(date));

                    //alert (new Intl.DateTimeFormat('en-US', options).format(sdob));

                    this.setState(
                        {
                            nationality: response.data[0].country_name

                        });


            }

        })
    }


    getEdusummary() {

        //axios.get('https://formeeadmin.bicsglobal.com/get_edusummary/1').then(response => {
        axios.get(baseurl + '/get_edusummary/' + localStorage.getItem('studentid')).then(response => {

//  console.log('get_edusummary', response.data);
            if ((response.data.summary.length > '0')) {
                this.setState({

                    educountryid: response.data.summary[0].education_country_id,
                    highedulevel: response.data.summary[0].highest_educationlevel_id,
                    gradingscheme: response.data.summary[0].grading_scheme_id,

                    gradeaverage: response.data.summary[0].grade_average,
                    // recentcheck: response.data.summary[0].recent_check
                });

                axios
                .get(baseurl + "/geteducatlevel/" + response.data.summary[0].education_country_id)
                .then((response) => {
                    console.log('education level2', response);
                    this.setState({
                        edusublevel: response.data,
                    });
                });
    

            }

            if ((response.data.schools.length > '0')) {




                const edulevel = response.data.schools[0].educationlevel_id.split(",")
                const insticountry = response.data.schools[0].institute_country_id.split(",")
                const institutename = response.data.schools[0].institute_name.split(",")



                for (let i = 0; i < institutename.length - 1; i++) {
                    const schoolsattendedArr = this.state.schoolsattended
                    schoolsattendedArr.push("")
                    this.setState({ schoolsattended: schoolsattendedArr })
                }

                this.setState({

                    edulevel,
                    insticountry,
                    institutename,

                });
                // console.log("stateResponse------3", instate)
                // console.log("CityResponse------3", inscity)
            }

        })

    }


    // get year by month



    //   Test Score


    getTestscoresdata() {

        //axios.get('https://formeeadmin.bicsglobal.com/get_testscores/1').then(response => {
        axios.get(baseurl + '/get_testscores/' + localStorage.getItem('studentid')).then(response => {
            if ((response.data.length > '0')) {


                this.setState({
                    examtype: response.data[0].exam_type,



                    readingscore: response.data[0].reading_score,
                    listeningscore: response.data[0].listening_score,
                    writingscore: response.data[0].writing_score,
                    speakingscore: response.data[0].speaking_score,
                    id: response.data[0].id,

                    examtypeCopy: response.data[0].exam_type,
                    readingscoreCopy: response.data[0].reading_score,
                    listeningscoreCopy: response.data[0].listening_score,
                    writingscoreCopy: response.data[0].writing_score,
                    speakingscoreCopy: response.data[0].speaking_score,

                });




            }

        })

    }


    handleNationality = (event) => { this.setState({ nationality: event.target.value }); };

    handleLocation = (event) => { this.setState({ location: event.target.value }); };

    handleStudy = (event) => { this.setState({ study: event.target.value }); };

    handleUnivname = (event) => { this.setState({ uniname: event.target.value }); };

    // TestScore

    handleExamtypeChange = (event) => {


        let { examtype, examtypeCopy, readingscoreCopy, listeningscoreCopy, writingscoreCopy, speakingscoreCopy } = this.state


        if (this.state.examtypeCopy != event.target.value) {

            this.setState({ examtype: event.target.value, readingscore: "", listeningscore: "", writingscore: "", speakingscore: "" });

        }
        if (this.state.examtypeCopy == event.target.value) {

            this.setState({ examtype: examtypeCopy, readingscore: readingscoreCopy, listeningscore: listeningscoreCopy, writingscore: writingscoreCopy, speakingscore: speakingscoreCopy });
        }
    };

    //handleExamdateChange = (event) => { this.setState({ examdate: event.target.value }); };


    handleReadingscoreChange = (event) => { this.setState({ readingscore: event.target.value }); };
    handleListeningscoreChange = (event) => { this.setState({ listeningscore: event.target.value }); };
    handleWritingscoreChange = (event) => { this.setState({ writingscore: event.target.value }); };
    handleSpeakingscoreChange = (event) => { this.setState({ speakingscore: event.target.value }); };


    // Program
    handleProgramHighedulevelChange = (event) => { this.setState({ programhighlevel: event.target.value }); };
    handleProgramIntakelevelChange = (event) => { this.setState({ programintake: event.target.value }); };
    handleProgramcategoryChange = (event) => { this.setState({ programcategory: event.target.value }); };
    handleProgramfacultyChange = (event) => { this.setState({ Programfaculty: event.target.value }); };

    // Education



    handleEducountryidChange = (event) => {
        this.setState({ educountryid: event.target.value });
        axios
            .get(baseurl + "/geteducatlevel/" + event.target.value)
            .then((response) => {
                console.log('education level', response);
                this.setState({
                    edusublevel: response.data,
                });
            });
    };
    handleHighedulevelChange = (event) => {
        this.setState({
            highedulevel: event.target.value
        });
    };
    handleGradingschemeChange = (event) => { this.setState({ gradingscheme: event.target.value }); };

    handleGradeaverageChange = (event) => { this.setState({ gradeaverage: event.target.value }); };
    handleMostrecentChange = (event) => {
        let recent_summ = this.state.recent_summ == 0 ? 1 : 0;
        // this.setState({ recentcheck: datefal });
        this.setState({ recent_summ });

    }

    handleGreExamScore = (event) => {
        // let gre_examscore = !this.state.gre_examscore;
        let gre_examscore = this.state.gre_examscore == 0 ? 1 : 0;
        this.setState({ gre_examscore });
    }

    handleGmatExamScore = (event) => {
        let gmat_examscore = this.state.gmat_examscore == 0 ? 1 : 0;
        this.setState({ gmat_examscore });

    }

    handleUnivType = (event) => {
        let univtpe = this.state.univtpe == 0 ? 1 : 0;
        this.setState({ univtpe });
        console.log("Univ Type", univtpe)

    }


    handleInstType = (event) => {

        let insttype = this.state.insttype == 0 ? 1 : 0;
        this.setState({ insttype });
        console.log("Inst Type", insttype)

    }

    handleSchoType = (event) => {
        let schooltype = this.state.schooltype == 0 ? 1 : 0;
        this.setState({ schooltype });

    }
    handleTafeType = (event) => {
        let tafestype = this.state.tafestype == 0 ? 1 : 0;
        this.setState({ tafestype });

    }



    // this.setState({ recentcheck:  this.state.recentcheck != 0}); 

    // handleMostrecentChange = (event) => { this.setState({ MostrecentChange: true}); }




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


    resetAll = () => {
        this.setState({ study: "" })
        this.setState({ location: "" })
        this.setState({ educountryid: "" })
        this.setState({ highedulevel: "" })
        this.setState({ gradingscheme: "" })
        this.setState({ gradeaverage: "" })

        this.setState({ programhighlevel: "" })
        this.setState({ programintake: "" })
        this.setState({ programcategory: "" })
        this.setState({ Programfaculty: "" })

        this.setState({ examtype: "" })
        this.setState({ readingscore: "" })
        this.setState({ listeningscore: "" })
        this.setState({ writingscore: "" })
        this.setState({ speakingscore: "" })

    }

    toggleSearch() {
        this.setState({
            searchBtn: !this.state.searchBtn,
        });

    }

    searchVal1 = () => e => {
        e.preventDefault();
        let errors = this.validate1();
        if (Object.keys(errors).length !== 0) return;

        const data = {
            educountryid: this.state.educountryid,
            highedulevel: this.state.highedulevel,
            gradeaverage: this.state.gradeaverage,
            gradingscheme: this.state.examtype,
            readingscore: this.state.readingscore,
            listeningscore: this.state.listeningscore,
            writingscore: this.state.writingscore,
            speakingscore: this.state.speakingscore,
            recent_summ: this.state.recent_summ,
            student_id: localStorage.getItem('studentid')
        }
        console.log("sent data", data);
        
        axios.post(baseurl + '/getsecondfilter', data).then((response) => {
            console.log('instituteList',response.data);
            // if ((response.data.length > '0')) {

            // Get eligiblity searched data from university about page 
            if (localStorage.getItem("universityAboutPageOpened") === "true") {
                // Send the eligiblity searched values to institute page
                const searchedData = {
                    instituteList: response.data.institutelist,
                    totalList: response.data.totallist,
                };
                localStorage.setItem("universityAboutPageSearchedData", JSON.stringify(searchedData));
                localStorage.removeItem("universityAboutPageOpened");
                toast.success("Records searched successfully");
                setTimeout(() => {
                    window.location.href = "/#/institutelist";
                }, 2000);
            }

            this.props.searchedValue(response.data.institutelist, response.data.totallist);
            
            this.setState(
                {instituteCount : response.data.institutelist.length}
            // }
            );
            console.log("success message2", this.state.instituteCount);
            if (this.state.instituteCount > 0){
                toast.success("Records searched successfully")
            }
            // else {
            //     toast.error("No records found");
            // }
        });

        // Retain the searched values
        const educationCountry = $("#educountryid").val();
        const educationLevel = $("#highedulevel").val();
        const gradeAverage = $("#gradeaverage").val();
        const examType = $("#examtype").val();
        const readingScore = $("#readingscore").val();
        const writingScore = $("#writingscore").val();
        const listeningScore = $("#listeningscore").val();
        const speakingScore = $("#speakingscore").val();
        const greExamScore = $("#gre_examscore").prop('checked');
        const gmatExamScore = $("#gmat_examscore").prop('checked');
        const showEligible = $("#mostrecent").prop('checked');

        // Set the retained searched values
        const selectedValues = {
            educationCountry, educationLevel, gradeAverage, examType, readingScore, writingScore, listeningScore, speakingScore, greExamScore, gmatExamScore, showEligible
        };

        localStorage.setItem("noBtnSelectedData", JSON.stringify(selectedValues));
        localStorage.setItem("noBtnSelected", "true");

        toast.success("Records searched successfully") 

        this.props.closePanel();
    }

    searchVal = () => e => {
        // alert("successfully");
        // Hide all university and program details
        e.preventDefault();
        let coursesArr = [];
        let { alluniversitydetails, study, uniname, location, educountryid, courses, gradeaverage, highedulevel, listeningscore, readingscore, speakingscore, writingscore, examtype, recent_summ, univtpe, insttype, schooltype, tafestype, programhighlevel, programintake, programcategory, Programfaculty } = this.state
        console.log("saved state", this.state);
        // this.setState({universitycourse : []})
        // localStorage.setItem('permit', false)

        courses.course_name.map((course, index) => {
            coursesArr.push({
                course_name: course,
                course_id: courses.id[index],
                university_id: courses.university_id[index],
                generic_doc: courses[`generic_doc${courses.id[index]}`][0],
                grade_min: courses.grade_min[index],
                lan_exam: courses[`lan_exam${courses.id[index]}`][0],
                listening: courses[`listening${courses.id[index]}`][0],
                prerequiste_education: courses.prerequiste_education[index],
                qua_exam: courses[`qua_exam${courses.id[index]}`][0],
                qua_max: courses[`qua_max${courses.id[index]}`][0],
                qua_min: courses[`qua_min${courses.id[index]}`][0],
                reading: courses[`reading${courses.id[index]}`][0],
                speaking: courses[`speaking${courses.id[index]}`][0],
                writing: courses[`writing${courses.id[index]}`][0],
            })
        })

//to provide active coursename in link when redirecting to university about
localStorage.setItem("universitycourse", study);
localStorage.setItem("searchDone", true);

        const checkEducationLevel = (value, id) => {
            let ispresent = false;
            this.state.edusublevel.map(mainlevel => {
                mainlevel.sublevel.map(sublevelval => {
                    if (sublevelval.educationlevel_name == value) {
                        if (sublevelval.id == id) {
                            ispresent = true;
                        }
                    }
                })
            })
            return ispresent
        }


        const data = {
            study: this.state.study,
            uniname: this.state.uniname,
            location: this.state.location,
            univtpe: this.state.univtpe,
            insttype: this.state.insttype,
            programhighlevel: this.state.programhighlevel,
            programintake: this.state.programintake,
            programcategory: this.state.programcategory,
            programfaculty: this.state.Programfaculty,
            student_id: localStorage.getItem('studentid')


        }


        axios.post(baseurl + '/getfirstfilter', data).then((response) => {
            console.log("success",response.data);
            // if ((response.data.length > '0')) {
            
            // Get searched data from university about page 
            if (localStorage.getItem("universityAboutPageOpened") === "true") {
                // Send the searched values to institute page
                const searchedData = {
                    instituteList: response.data.institutelist,
                    totalList: response.data.totallist,
                };
                localStorage.setItem("universityAboutPageSearchedData", JSON.stringify(searchedData));
                localStorage.removeItem("universityAboutPageOpened");
                // toast.success("Records searched successfully");
                setTimeout(() => {
                    window.location.href = "/#/institutelist";
                }, 2000);
            }

            this.props.searchedValue(response.data.institutelist, response.data.totallist);
            // console.log("success message1", response.data.institutelist.length);
            this.setState(
                {instituteCount : response.data.institutelist.length}
            // }
            );
            console.log("success message1", this.state.instituteCount);
            // if (this.state.instituteCount > 0){
                toast.success("Records searched successfully");
            // }
            // }
        });


        // && course.lan_exam.toLowerCase() == examtype.toLowerCase()
        // && course.prerequiste_education == highedulevel 



        //     if (highedulevel !== "" && !recent_summ) {
        //         coursesArr = coursesArr.filter(course => checkEducationLevel(course.prerequiste_education, highedulevel))
        //         alluniversitydetails = alluniversitydetails.filter(university => {
        //             for (let course of coursesArr) {               
        //                  if (course.university_id == university.university_id) return true
        //             }
        //         })
        //     }

        //     if (programhighlevel !== "" ) {         
        //       coursesArr = coursesArr.filter(course => checkEducationLevel(course.prerequiste_education, programhighlevel))
        //       alluniversitydetails = alluniversitydetails.filter(university => {
        //           for (let course of coursesArr) {                
        //               if (course.university_id == university.university_id) return true
        //           }              
        //       })
        //   }

        //   alluniversitydetails = alluniversitydetails.filter(university => {
        //     for (let course of universitycourse) {            
        //         if (course.university_id == university.university_id) return true
        //     }              
        // })

        if (recent_summ) {
            // Works Combined if elibility checkbox is clicked
            coursesArr = coursesArr.filter(course => {
                return (
                    (checkEducationLevel(course.prerequiste_education, highedulevel)) &&
                    (parseInt(course.grade_min) < parseInt(gradeaverage)) &&
                    (listeningscore !== "" ? parseInt(course.listening) <= parseInt(listeningscore) : true) &&
                    (readingscore !== "" ? parseInt(course.reading) <= parseInt(readingscore) : true) &&
                    (speakingscore !== "" ? parseInt(course.speaking) <= parseInt(speakingscore) : true) &&
                    (writingscore !== "" ? parseInt(course.writing) <= parseInt(writingscore) : true) &&
                    (examtype !== "" ? (course.lan_exam ? course.lan_exam.toLowerCase() : null)
                        == (examtype ? examtype.toLowerCase() : null) : true)

                )
            })

            alluniversitydetails = alluniversitydetails.filter(university => {
                // var alloweddata = []
                // var coursedeta = false;                
                for (let course of coursesArr) {
                    if (course.university_id == university.university_id) {
                        // localStorage.setItem('permit', true)
                        return true
                    }
                }
                // return(coursedeta);
            })

            console.log('alluniversitydetails alluniversitydetails alluniversitydetails', alluniversitydetails);
        } else {
            //Works separately

            // coursesArr = coursesArr.filter(course => {
            //     return (
            //         (gradeaverage !== "" ? parseInt(course.grade_min) <= parseInt(gradeaverage) : true) &&
            //         (listeningscore !== "" ? parseInt(course.listening) <= parseInt(listeningscore) : true) &&
            //         (readingscore !== "" ? parseInt(course.reading) <= parseInt(readingscore) : true) &&
            //         (speakingscore !== "" ? parseInt(course.speaking) <= parseInt(speakingscore) : true) &&
            //         (writingscore !== "" ? parseInt(course.writing) <= parseInt(writingscore) : true) &&
            //         (examtype !== "" ? (course.lan_exam ? course.lan_exam.toLowerCase() : null) == (examtype ? examtype.toLowerCase() : null) : true)
            //     )
            // })

            // if (gradeaverage !== "" && listeningscore !== "" && readingscore !== "" && speakingscore !== "" && writingscore !== "" && examtype !== "") {
            // alluniversitydetails = alluniversitydetails.filter(university => {
            //     for (let course of coursesArr) {
            //         if (course.university_id == university.university_id) return true
            //     }
            // })
            // }

            coursesArr = coursesArr.filter(course => {
                return (
                    (((highedulevel !== "" ? checkEducationLevel(course.prerequiste_education, highedulevel) : null) && !recent_summ) &&
                        (parseInt(course.grade_min) < parseInt(gradeaverage))) ||
                    (((highedulevel !== "" ? checkEducationLevel(course.prerequiste_education, highedulevel) : null) && !recent_summ)) ||
                    (((highedulevel !== "" ? checkEducationLevel(course.prerequiste_education, highedulevel) : null) && !recent_summ) &&
                        (parseInt(course.grade_min) < parseInt(gradeaverage)) &&
                        (examtype !== "" ? (course.lan_exam ? course.lan_exam.toLowerCase() : null) == (examtype ? examtype.toLowerCase() : null) : true)) ||
                    (((highedulevel !== "" ? checkEducationLevel(course.prerequiste_education, highedulevel) : null) && !recent_summ) &&
                        (parseInt(course.grade_min) < parseInt(gradeaverage)) &&
                        (listeningscore !== "" ? parseInt(course.listening) <= parseInt(listeningscore) : true) &&
                        (readingscore !== "" ? parseInt(course.reading) <= parseInt(readingscore) : true) &&
                        (speakingscore !== "" ? parseInt(course.speaking) <= parseInt(speakingscore) : true) &&
                        (writingscore !== "" ? parseInt(course.writing) <= parseInt(writingscore) : true) &&
                        (examtype !== "" ? (course.lan_exam ? course.lan_exam.toLowerCase() : null) == (examtype ? examtype.toLowerCase() : null) : true)) ||
                    (study !== "" ? course.course_name.toLowerCase().includes(study.toLowerCase()) : null) ||
                    (study !== "" ? course.course_name.toLowerCase().includes(study.toLowerCase()) : null) && (highedulevel !== "" ? checkEducationLevel(course.prerequiste_education, highedulevel) : null) ||
                    (programhighlevel !== "" ? checkEducationLevel(course.prerequiste_education, programhighlevel) : null)
                )
            })

            // console.log('fil courses', coursesArr)

            alluniversitydetails = alluniversitydetails.filter(university => {
                var category = false;
                var faculty = false;
                var monthdata = false;
                var progeducation = false;
                var sty = false;
                for (let stys of university.programcourses) {
                    if (stys.heading == study) { sty = true }
                }
                for (let pedu of university.programcourses) {
                    if (pedu.prerequiste_education == programhighlevel) { progeducation = true }
                }
                for (let cat of university.programcourses) {
                    if (cat.category_id == programcategory) { category = true }
                }

                for (let facult of university.programcourses) {
                    if (facult.faculty_id == Programfaculty) { faculty = true }
                }
                for (let mo of university.programcourses) {
                    // console.log('programintake', moment(course.startdate_fall).format('MMMM YYYY'))
                    if (moment(mo.startdate_fall).format('MMMM YYYY') == programintake || moment(mo.startdate_spring).format('MMMM YYYY') == programintake || moment(mo.startdate_summer).format('MMMM YYYY') == programintake || moment(mo.startdate_winter).format('MMMM YYYY') == programintake) { monthdata = true }
                }

                let univercou = false;
                for (let course of coursesArr) {
                    if (course.university_id == university.university_id) { univercou = true }
                }

                return (
          univercou ||
          sty ||
          university.country_name
            .toLowerCase()
            .includes(location.toLowerCase()) ||
          (sty &&
            university.country_name
              .toLowerCase()
              .includes(location.toLowerCase())) ||
          university.country_id == educountryid ||
          category ||
          faculty ||
          monthdata ||
          progeducation ||
          (progeducation && category) ||
          (progeducation && category && faculty) ||
          (progeducation && category && faculty && monthdata)
        );
      });
            // if (study !== "" && location == "" ) {
            //     coursesArr = coursesArr.filter(course => course.course_name.toLowerCase().includes(study.toLowerCase()));
            //     alluniversitydetails = alluniversitydetails.filter(university => {
            //         for (let course of coursesArr) {                    
            //             if (course.university_id == university.university_id ) return true
            //         }
            //     })
            // }
        }

        // console.log("all fitered courses and univ",alluniversitydetails)


        const universityFilter = (alluniversitydetails) => {


            const getType = () => {
                const types = []
                if (univtpe) types.push("university")
                if (insttype) types.push("institutes")
                if (schooltype) types.push("schools")
                if (tafestype) types.push("tafe")
                return types
            }
            const type = getType()

            const checkType = (type, selectedTypes) => {
                let typePresent = false;
                selectedTypes.map(selectedType => {
                    if (type == selectedType) typePresent = true
                })
                return typePresent
            }

            return alluniversitydetails.filter((university) => {
                return (
                  (type.length > 0
                    ? checkType(university.institute_type, type)
                    : true) &&
                  (location !== "" || educountryid !== ""
                    ? (location !== ""
                        ? university.country_name
                            .toLowerCase()
                            .includes(location.toLowerCase())
                        : null) ||
                      (educountryid !== ""
                        ? university.country_id == educountryid
                        : null)
                    : 1)
            )});
        }

        const programviewFilter = alluniversitydetails => {
            const getType = () => {
                const types = []
                if (univtpe) types.push("university")
                if (insttype) types.push("institutes")
                if (schooltype) types.push("schools")
                if (tafestype) types.push("tafe")
                return types
            }
            const type = getType()


            // Filter Programs
            const filterProgramCourse = (alluniversitydetails) => {
                alluniversitydetails.forEach(university => {
                    return university.programcourses = university.programcourses.filter(programcourse => {
                        for (let course of coursesArr) {
                            if (course.course_id == programcourse.id && course.university_id == programcourse.university_id) { return true }
                        }
                    })
                })
                return alluniversitydetails
            }
            alluniversitydetails = filterProgramCourse(alluniversitydetails)

            // FilterUniversity Based on courses
            alluniversitydetails = alluniversitydetails.filter(university => {
                for (let i = 0; i < coursesArr.length; i++) {
                    if (coursesArr[i].university_id == university.university_id) return true
                }
            })

            const checkType = (type, selectedTypes) => {
                let typePresent = false;
                selectedTypes.map(selectedType => {
                    if (type == selectedType) typePresent = true
                })
                return typePresent
            }

            return alluniversitydetails.filter((university) => {
                console.log(
                  "location program filter",
                  location !== ""
                    ? university.country_name
                        .toLowerCase()
                        .includes(location.toLowerCase())
                    : true || educountryid !== ""
                    ? university.country_id == educountryid
                    : true,
                  university.country_id,
                  university.country_name
                );
                return (
                  (type.length > 0
                    ? checkType(university.institute_type, type)
                    : true) &&
                  (location !== "" || educountryid !== ""
                    ? (location !== ""
                        ? university.country_name
                            .toLowerCase()
                            .includes(location.toLowerCase())
                        : null) ||
                      (educountryid !== ""
                        ? university.country_id == educountryid
                        : null)
                    : true)
                )
            })
        }


        //  this.props.searchedValue(universityFilter(alluniversitydetails), coursesArr, programviewFilter(alluniversitydetails))

        // console.log("courses==>",courses.map(data=> data.course_name))
        // console.log("Filtered Course", courses.filter(data=>data ==highedulevel ))


        // });

        // console.log("Course", courses)

        //     console.log("Filtered Course", courses.prerequiste_education.filter(data=> data == coursevalue ? courses: null))
        
        this.props.closePanel(); 
 
  };


    closepop = () => {
        this.setState({
            content: false,
        });
    }


    validate = () => {
        const errors = [];

        // if (this.state.study == '') { errors.study = 'Fill the data' }
        // if (this.state.location == '') { errors.location = 'Fill the data' }
        if (this.state.educountryid == '') { errors.educountryid = 'Fill the data' }
        if (this.state.highedulevel == '') { errors.highedulevel = 'Fill the data' }
        if (this.state.gradingscheme == '') { errors.gradingscheme = 'Fill the data' }
        if (this.state.gradeaverage == '') { errors.gradeaverage = 'Fill the data' }
        if (this.state.examtype == '') { errors.examtype = 'Fill the data' }
        if (this.state.readingscore == '') { errors.readingscore = 'Fill the data' }
        if (this.state.listeningscore == '') { errors.listeningscore = 'Fill the data' }
        if (this.state.writingscore == '') { errors.writingscore = 'Fill the data' }
        if (this.state.speakingscore == '') { errors.speakingscore = 'Fill the data' }

        if (this.state.programhighlevel == '') { errors.programhighlevel = 'Fill the data' }
        if (this.state.programintake == '') { errors.programintake = 'Fill the data' }
        if (this.state.programcategory == '') { errors.programcategory = 'Fill the data' }
        if (this.state.Programfaculty == '') { errors.Programfaculty = 'Fill the data' }



        return Object.keys(errors).length === 0 ? {} : errors;
    };


    validate1 = () => {
        const errors = [];
        //alert();
        // if (this.state.study == '') { errors.study = 'Fill the data' }
        // if (this.state.location == '') { errors.location = 'Fill the data' }
        //if (this.state.educountryid == '') { errors.educountryid = 'Fill the data' }
        if (this.state.highedulevel == '') { errors.highedulevel = 'Fill the data' }
        //if (this.state.gradingscheme == '') { errors.gradingscheme = 'Fill the data' }
        if (this.state.gradeaverage == '') { errors.gradeaverage = 'Fill the data' }
        // if (this.state.examtype == '') { errors.examtype = 'Fill the data' }
        //if (this.state.readingscore == '') { errors.readingscore = 'Fill the data' }
        // if (this.state.listeningscore == '') { errors.listeningscore = 'Fill the data' }
        // if (this.state.writingscore == '') { errors.writingscore = 'Fill the data' }
        // if (this.state.speakingscore == '') { errors.speakingscore = 'Fill the data' }


        // if (this.state.programhighlevel == '') { errors.programhighlevel = 'Fill the data' }
        // if (this.state.programintake == '') { errors.programintake = 'Fill the data' }
        // if (this.state.programcategory == '') { errors.programcategory = 'Fill the data' }
        // if (this.state.Programfaculty == '') { errors.Programfaculty = 'Fill the data' }

        return Object.keys(errors).length === 0 ? {} : errors;
    };

    oncheckvalidation = (e)  => {
        e.preventDefault();
        //alert();
        const errors = this.validate1();
        this.setState({ errors });

        if (Object.keys(errors).length !== 0) {
            if (errors) return;
        } else {
            this.setState({ searchBtn: true })
        }
        //alert(errors.length); 

        //this.setState({ searchBtn: true })
        //if (errors) return;

    }

    onsaveSearch = (e) => {

        e.preventDefault();

        // this.setState({ errors: '' })

        // let errors = this.validate()
        // this.setState({ errors, searchBtn: false })
        // // errors = errors.filter(error => Object.keys(error).length !== 0)
        // console.log("Get Errors Array", errors, Object.keys(errors).length)
        // if (Object.keys(errors).length !== 0) return;


        //this.state.formData.append("examdate", $("#examdate").val());
        // this.state.formData.append("recent_check", this.state.recentcheck);
        this.state.formData.append("study", this.state.study);
        this.state.formData.append("location", this.state.location);
        this.state.formData.append("universityname", this.state.uniname);
        this.state.formData.append("educountryid", this.state.educountryid);
        this.state.formData.append("highedulevel", this.state.highedulevel);
        this.state.formData.append("gradingscheme", this.state.gradingscheme);
        this.state.formData.append("gradeaverage", this.state.gradeaverage);
        this.state.formData.append("id", this.state.id);

        this.state.formData.append("programhighlevel", this.state.programhighlevel);
        this.state.formData.append("programintake", this.state.programintake);
        this.state.formData.append("programcategory", this.state.programcategory);
        this.state.formData.append("Programfaculty", this.state.Programfaculty);

        //  Test Score


        this.state.formData.append("examtype", this.state.examtype);

        // this.state.formData.append("examdate", $("#examdate").val());

        this.state.formData.append("readingscore", this.state.readingscore);
        this.state.formData.append("listeningscore", this.state.listeningscore);
        this.state.formData.append("writingscore", this.state.writingscore);
        this.state.formData.append("speakingscore", this.state.speakingscore);

        this.state.formData.append("grescore", this.state.gre_examscore);
        this.state.formData.append("gmatscore", this.state.gmat_examscore);
        this.state.formData.append("listeningscore", this.state.listeningscore);
        this.state.formData.append("writingscore", this.state.writingscore);
        this.state.formData.append("speakingscore", this.state.speakingscore);

        this.state.formData.append("sch_university", this.state.univtpe);
        this.state.formData.append("sch_institute", this.state.insttype);
        this.state.formData.append("sch_school", this.state.schooltype);
        this.state.formData.append("sch_tafe", this.state.tafestype);
        this.state.formData.append("eligibility_check", this.state.recent_summ);


        //this.state.formData.append("student_id", 1);
        this.state.formData.append("student_id", localStorage.getItem('studentid'));


        submitSearch("form-data", this.state.formData, (msg) => {
            toast.success("Search Saved Successfully"); setTimeout(function () {
                // toast.success( msg.message); setTimeout(function () {

                $("#tab3").addClass("active");
                $("#tab2").removeClass("active");
                $(".educationtab").removeClass("active");
                $(".testscore").addClass("active");

                //Test score
                $("#tab4").addClass("active");
                $("#tab3").removeClass("active");
                $(".testscore").removeClass("active");
                $(".bgtab").addClass("active");
            }, 3000);
        }, 'student');
        
        // this.searchVal()
        this.props.closePanel()

    }


    onSubmit = (e) => {
        e.preventDefault();

        this.setState({ errors: '' })

        // console.log("Get Errors", typeof this.validate(), this.validate())

        this.setState({ searchBtn: false });
        // errors = errors.filter(error => Object.keys(error).length !== 0)

        // let errors = this.validate1()
        // this.setState({ errors, searchBtn: false })
        // // errors = errors.filter(error => Object.keys(error).length !== 0)
        // console.log("Get Errors Array", errors, Object.keys(errors).length)
        // if (Object.keys(errors).length !== 0) return;


        //this.state.formData.append("examdate", $("#examdate").val());
        // this.state.formData.append("recent_check", this.state.recentcheck);
        this.state.formData.append("educountryid", this.state.educountryid);
        this.state.formData.append("highedulevel", this.state.highedulevel);
        this.state.formData.append("gradingscheme", this.state.gradingscheme);
        this.state.formData.append("gradeaverage", this.state.gradeaverage);
        this.state.formData.append("id", this.state.id);

        // this.state.formData.append("programhighlevel", this.state.programhighlevel);
        // this.state.formData.append("programintake", this.state.programintake);
        // this.state.formData.append("programcategory", this.state.programcategory);
        // this.state.formData.append("Programfaculty", this.state.Programfaculty);

        //  Test Score


        this.state.formData.append("examtype", this.state.examtype);

        // this.state.formData.append("examdate", $("#examdate").val());

        this.state.formData.append("readingscore", this.state.readingscore);
        this.state.formData.append("listeningscore", this.state.listeningscore);
        this.state.formData.append("writingscore", this.state.writingscore);
        this.state.formData.append("speakingscore", this.state.speakingscore);

        //this.state.formData.append("student_id", 1);
        this.state.formData.append("student_id", localStorage.getItem('studentid'));


        // this.setState({ errors: '' });

        // let errors = this.validate()
        // this.setState({ errors })
        // errors = errors.filter(error => Object.keys(error).length !== 0)
        // if (errors.length > 0) return;

        submitForm("form-data", this.state.formData, (msg) => {
            // toast.success("Record Searched Successfully"); 
            setTimeout(function () {
                // toast.success( msg.message); setTimeout(function () {

                $("#tab3").addClass("active");
                $("#tab2").removeClass("active");
                $(".educationtab").removeClass("active");
                $(".testscore").addClass("active");

                //Test score
                $("#tab4").addClass("active");
                $("#tab3").removeClass("active");
                $(".testscore").removeClass("active");
                $(".bgtab").addClass("active");
            }, 3000);
        }, 'student');

        //this.searchVal()
        let errors = this.validate1();
        if (Object.keys(errors).length !== 0) return;

        const data = {
            educountryid: this.state.educountryid,
            highedulevel: this.state.highedulevel,
            gradeaverage: this.state.gradeaverage,
            gradingscheme: this.state.examtype,
            readingscore: this.state.readingscore,
            listeningscore: this.state.listeningscore,
            writingscore: this.state.writingscore,
            speakingscore: this.state.speakingscore,
            recent_summ: this.state.recent_summ,
            student_id: localStorage.getItem('studentid')


        }


        axios.post(baseurl + '/getsecondfilter', data).then((response) => {
            console.log("insList", response.data);
            // if ((response.data.length > '0')) {
            debugger; 
            // Get searched data from university about page 
            if (localStorage.getItem("universityAboutPageOpened") === "true") {
                // Send the searched values to institute page
                const searchedData = {
                    instituteList: response.data.institutelist,
                    totalList: response.data.totallist,
                };
                localStorage.setItem("universityAboutPageSearchedData", JSON.stringify(searchedData));
                localStorage.removeItem("universityAboutPageOpened");
                toast.success("Records searched successfully");
                setTimeout(() => {
                    window.location.href = "/#/institutelist";
                }, 2000);
            }

            this.props.searchedValue(response.data.institutelist, response.data.totallist);
            // console.log("success message", response.data.institutelist.length);
            this.setState(
                {instituteCount : response.data.institutelist.length}
                
            // }
            );
            // if (this.state.instituteCount > 0){
                toast.success("Records searched successfully") 
            // }
            // else {
            //     toast.error("No records found")
            // }
            
            // }
        });
        
        this.props.closePanel();

    };

    render() {
        console.log(this.state.errors);
        return template.call(this);
    }
}

export default FilterStudent1;