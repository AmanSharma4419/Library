import React, { Component } from "react";
import Prefimg1 from "../../assets/img/pref-img-1.svg";
import ratingfive from "../../assets/img/university/rating-five.svg";
//import rating from "../../assets/img/university/rating.svg";
import commentbtn from "../../assets/img/blue_snt.svg";
import ratingthree from "../../assets/img/university/rating-three.svg";
import ratingtwo from "../../assets/img/university/rating-two.svg";
import ratingone from "../../assets/img/university/rating-one.svg";
import formee_logo from "../../assets/img/brand/formee-logo.svg";
import sechicon from "../../assets/img/search-green-icon.svg";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Container,
  TabContent,
  TabPane,
  Nav,
  Media,
  Progress,
  Modal,
  ModalBody,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  UncontrolledCollapse,
  Breadcrumb,
  BreadcrumbItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import config from "../../config.json";
import Closebtn from "../../assets/img/close-btn.svg";

import axios from "axios";
import $ from "jquery";
import ProfileBanner from "../../assets/img/university/profile-banner.jpg";
import buliding from "../../assets/img/university/img_01.jpg";
import fullimg from "../../assets/img/university/img_02.jpg";
import universityimg from "../../assets/img/university/img_03.png";
import studentimg from "../../assets/img/university/img_04.png";
import studenthub from "../../assets/img/university/img_05.jpg";
import deakinlogo from "../../assets/img/university/deakin_logo.jpg";
import bargraph from "../../assets/img/university/bar_graph.svg";
import contlogo from "../../assets/img/university/australia_circle_flag.svg";
import favourites from "../../assets/img/university/favourites.svg";
import heart from "../../assets/img/university/heart.svg";
import heart2 from "../../assets/img/university/red-heart.svg";
import likeicon from "../../assets/img/university/green_heart.svg";
import eyeicon from "../../assets/img/university/view_simple.svg";
import rating from "../../assets/img/university/rating.svg";
import backarrow from "../../assets/img/university/back_arrow.svg";

import Phoneicon from "../../assets/img/university/phone-icon.svg";
import Calendaricon from "../../assets/img/university/calendar-icon.svg";
import Likeicon from "../../assets/img/university/like-icon.svg";

import Homeicon from "../../assets/img/university/home.svg";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FilterStudent1 from "../../views/FilterStudent/FilterStudent1";
import editicon from "../../assets/img/edit_icon.png";
import deleteicon from "../../assets/img/delete.png";

var baseurl = `${config.baseurl}`;

function submitStore(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/store_wishlist`,
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
    })
    .catch((error) => {
      setResponse("error");
    });
}

class Universityabout extends Component {
  constructor(props) {
    super(props);
    $(".hiderow").css("display", "none");
    //this.onSubmit = this.onSubmit.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.toggleFailure = this.toggleFailure.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.state = {
      course: [],
      tution_fee: [],
      app_fee: [],
      levelid: [],
      batchh: [],
      batch: [],
      batch_id: [],
      course: [],
      cat: [],
      cat_id: [],
      about: [],
      facility: [],
      facilityuniversity: [],
      facilitystudent: [],
      campus: [],
      contact: [],
      aboutsub: [],
      entryrequirements: [],
      entryrequirementssub: [],
      facilitysub: [],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      formData: new FormData(),
      upload_photo: [],
      location: "",
      errors: {},
      totalstudents: 0,
      estimatedcost: 0,
      fileLength: "",
      funding: "",
      logo: "",
      banner: "",
      editcomment: false,
      activetopprogram: "",
      activetopabout: "",
      programlink: "",
      aboutlink: "",
      programshow: true,
      coursedetails: [],
      levelname: "",
      rdat: [],
      count: 0,
      seemorecount: 0,
      failuremessage: "",
      eligiblesuccess: false,
      eligiblefailure: false,
      universitycountry: "",
      universitycourse: "",
      universityname: "",
      universityeducation: "",
      prostatus: "",
      startDate: "",
      currency_code: "",
      deleteid: "",
      unvid: "",
      uncourseid: "",
      coursefavids: [],
      getstorewishlistdata: [],
      items: [],
      star_percentage: [],
      studpname: "",
      relationship_status: "",
      searchHistoryValues: [],
      universityMail: "",
      countlike: "",
      rank: "",
      checkEligibilityStatusIdArray: [],
      status: [],
      courseDataList: [],
    };

    console.log(
      "localStorage.getItem()",
      localStorage.getItem("selectuniversity")
    );
    var id = localStorage.getItem("selectuniversity");
    console.log("iddddsdsd", localStorage.getItem("selectuniversity"));
    axios
      .get(
        baseurl +
          "/getstudent_wishlist/" +
          localStorage.getItem("selectuniversity")
      )
      .then((response) => {
        console.log(response.data);
        var itemrank;
        var itemrankdata = response.data.user_info.findIndex(function (
          element
        ) {
          if (
            element.university_id == localStorage.getItem("selectuniversity")
          ) {
            itemrank = element.rank;
          }
          return (
            element.university_id == localStorage.getItem("selectuniversity")
          );
        });
        console.log("itemrank", itemrank);
        //this.setState({data: [...json]});
        this.setState({
          countlike: response.data.gettotalcount,
          rank: itemrank,
        });
      });

    axios
      .get(
        baseurl +
          "/getreview_access/" +
          localStorage.getItem("selectuniversity") +
          "/" +
          localStorage.getItem("studentid")
      )
      .then((response) => {
        console.log(response);
        this.setState({
          relationship_status: response.data.message,
        });
      });
    axios
      .get(baseurl + "/getratingscountbyuniversityid/" + id)
      .then((response) => {
        console.log(response.data.star[0]);

        this.setState({
          star_percentage: response.data.star[0],
        });
      });
    axios
      .get(baseurl + "/get_generalinfo/" + localStorage.getItem("studentid"))
      .then((response) => {
        this.setState({ studpname: response.data[0].filename });
      });
    axios
      .get(
        baseurl +
          "/get_universitydetails/" +
          localStorage.getItem("selectuniversity")
      )
      .then((response) => {
        console.log(response);
        //alert(response.data.about[0].id);
        this.setState({
          about: response.data.about,
          facility: response.data.facility,
          facilityuniversity: response.data.facilityuniversity,
          facilitystudent: response.data.facilitystudent,
          //campusmain: response.data.campusmain,
          //campussub: response.data.campussub,
          aboutsub: response.data.aboutsub,
          campus: response.data.campus,
          contact: response.data.contacts,
          facilitysub: response.data.facilitysub,
          entryrequirements: response.data.entryrequirements,
          entryrequirementssub: response.data.entryrequirementssub,
        });
        //console.log(this.state.about[0].id);
        console.log("about university", this.state.about);
      });

    var param = localStorage.getItem("selectuniversity");
    axios.get(baseurl + "/get_viewas/" + param).then((response) => {
      console.log("courseBF", response.data);

      // Filtering course data based on status value
      let appFee = [];
      let tutionFee = [];
      let levelId = [];
      let courseNames = [];
      let courseId = [];

      response.data.course.forEach(
        ({
          id,
          status,
          application_fee,
          tution_fee,
          heading,
          category_levelid,
        }) => {
          if (status == 1) {
            appFee.push(application_fee);
            tutionFee.push(tution_fee);
            courseNames.push(heading);
            levelId.push(category_levelid);
            courseId.push(id);
          }
        }
      );

      this.setState({
        tution_fee: tutionFee,
        app_fee: appFee,
        levelid: levelId,
        batch: response.data.batch,
        batchh: response.data.batchh,
        course: courseNames,
        cat: response.data.cat,
        cat_id: response.data.cat_id,
        batch_id: response.data.batch_id,
        courseid: courseId,
        count: response.data.count,
      });
      console.log("courseAF", courseNames.length);
    });
  }

  componentDidMount() {
    localStorage.setItem("universityAboutPageOpened", "true");
    this.getData();
    this.getstorewishlist();
    this.handleViewmoreChange();

    var seluniversityid = localStorage.getItem("selectuniversity");
    var selcourseid = localStorage.getItem("selectcourse");
    if (seluniversityid != "" && selcourseid != "") {
      this.setState({ activetopprogram: "tab-pane px-0 active" });
      this.setState({ activetopabout: "tab-pane px-0" });
      this.setState({ aboutlink: "nav-link" });
      this.setState({ programlink: "nav-link active" });
      this.setState({ programshow: false });

      axios
        .get(
          baseurl +
            "/getcoursedetails/" +
            selcourseid +
            "/" +
            localStorage.getItem("studentid")
        )
        .then((response) => {
          console.log(response);
          this.setState({
            levelname: response.data.levelname,
            coursedetails: response.data.courses,
            rdat: response.data,
            prostatus: response.data.prostatus,
            startDate: response.data.start_date,
          });

          console.log("course details", this.state.coursedetails);
        });
    } else {
      this.setState({ activetopabout: "tab-pane px-0 active" });
      this.setState({ activetopprogram: "tab-pane px-0" });
      this.setState({ programlink: "nav-link" });
      this.setState({ aboutlink: "nav-link active" });
    }

    this.setState({
      universitycountry: localStorage.getItem("universitycountry"),
    });
    this.setState({
      universitycourse: localStorage.getItem("universitycourse"),
    });
    this.setState({ universityname: localStorage.getItem("universityname") });
    this.setState({
      universityeducation: localStorage.getItem("universityeducation"),
    });

    // const { universityid } = this.props.location;
    var selectuniversity = localStorage.getItem("selectuniversity");

    axios
      .get(baseurl + "/getuniversityabout/" + selectuniversity)
      .then((response) => {
        if (response.data.length > "0") {
          console.log("shbdiwu", response.data);
          //alert(response.data[0].banner_image);
          this.setState({
            logo: response.data[0].logo_image,
            banner: response.data[0].banner_image,
            unvid: response.data[0].university_id,
            currency_code: response.data[0].currency_code,
            universityMail: response.data[0].email,
          });
          localStorage.setItem(
            "universityidvalue",
            response.data[0].university_id
          );
        }
      });
    // console.log('app_fee', this.state.app_fee);
    // Load search history value
    if (localStorage.getItem("searchHistorySelected") === "true") {
      localStorage.setItem("searchHistorySelected", "false");
      axios
        .get(baseurl + "savesearch/" + localStorage.getItem("searchId"))
        .then((response) => {
          if (response.data.length > 0) {
            const resData = response.data[0];
            console.log("saved search", resData);
            this.setState({
              searchHistoryValues: resData,
            });
          }
        });
      // Open filter section after loaded search history values
      // this.toggleLarge();
      setTimeout(
        function () {
          this.toggleLarge();
        }.bind(this),
        3000
      );

      // setTimeout(this.toggleLarge, 2000);
    }
  }

  searchedValue = (institutelist, allProgram) => {
    let {
      universitylist,
      filtereduniversitylist,
      todos,
      filteredTodos,
    } = this.state;
    filtereduniversitylist = institutelist;

    filteredTodos = allProgram;

    console.log(
      "filtered programs 1231",
      filtereduniversitylist,
      filteredTodos
    );

    this.setState({ filtereduniversitylist, filteredTodos });

    if (institutelist.length == 0) {
      this.setState({ noRecordsFound: true });
    } else if (institutelist.length > 0) {
      this.setState({
        allUniversitySelected: false,
        allProgramListSelected: false,
        noRecordsFound: false,
      });
    }
  };

  storewishlist = () => {
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append("university_id", this.state.unvid);
    this.state.formData.append("course_id", this.state.uncourseid);

    submitStore(
      "form-data",
      this.state.formData,
      (msg) => {
        toast.success("Favourite Saved Successfully");
        setTimeout(function () {}, 3000);
        this.getstorewishlist();
      },
      "student"
    );
  };

  getstorewishlist = () => {
    axios
      .get(baseurl + "/getWishlist/" + localStorage.getItem("studentid"))
      .then((response) => {
        // console.log('getstorewishlist123123', response.data.result[0].university_id);
        this.setState({ getstorewishlistdata: response.data.result });
      });
  };

  //for check elegiblity

  handleChangeApplyprogram = (data) => {
    console.log(this.state.coursedetails, "coursedeta");
    localStorage.setItem("applicationid", data.courseid);
    localStorage.setItem("course_name", this.state.coursedetails.heading);
    localStorage.setItem("fromApplicationType", "Draft");
    localStorage.setItem("courseid", data.courseid);
    localStorage.setItem("expire_date", this.state.rdat.end_date);
    localStorage.setItem("start_date", this.state.rdat.end_date);
    //alert(data);
    localStorage.setItem("universityid", data.unvid);
    localStorage.setItem("selectcoursedraft", data.courseid);
    //alert(data.courseid);

    axios
      .get(
        baseurl +
          "/applycheckeligibility/" +
          localStorage.getItem("studentid") +
          "/" +
          data.courseid
      )
      .then((response) => {
        console.log(response, "repppp");
        localStorage.setItem("applicationid", response.data.message);
        //console.log(response.data);
        //this.setState({ applicationID : response.data.message })
        // localStorage.setItem('selectcoursedraft',response.data.message);
        // window.location = "/#/applications";
        axios
          .get(
            baseurl +
              "/geteligiblestatus/" +
              localStorage.getItem("studentid") +
              "/" +
              data.courseid
          )
          .then((response) => {
            console.log("app check1", response.data);
            if (response.data.result.status >= 2) {
              toast.error("You have already applied for this course");
              return false;
            }

            axios
              .get(baseurl + "/getcoursedetailsdate/" + data.courseid)
              .then((response) => {
                console.log("app check2", response.data);
                // const today = new Date();
                // const applicationend_fall = new Date(
                //   response.data.result.applicationend_fall
                // );
                // const applicationend_spring = new Date(
                //   response.data.result.applicationend_spring
                // );
                // const applicationend_summer = new Date(
                //   response.data.result.applicationend_summer
                // );
                // const applicationend_winter = new Date(
                //   response.data.result.applicationend_winter
                // );
                // const applicationstart_fall = new Date(
                //   response.data.result.applicationstart_fall
                // );
                // const applicationstart_spring = new Date(
                //   response.data.result.applicationstart_spring
                // );
                // const applicationstart_summer = new Date(
                //   response.data.result.applicationstart_summer
                // );
                // const applicationstart_winter = new Date(
                //   response.data.result.applicationstart_winter
                // );

                // if (
                //   (today >= applicationstart_summer &&
                //     today <= applicationend_summer) ||
                //   (today >= applicationstart_spring &&
                //     today <= applicationend_spring) ||
                //   (today >= applicationstart_fall &&
                //     today <= applicationend_fall) ||
                //   (today >= applicationstart_winter &&
                //     today <= applicationend_winter)
                // ) {
                window.location = "/#/applications";
                // } else {
                //   toast.error("Last date for registration is exceeded");
                //   return false;
                // }
              });
          });

        axios
          .get(
            baseurl + "/draftapplication/" + localStorage.getItem("studentid")
          )
          .then((response) => {});
        if (response.data.agent_id !== null) {
          let fd = new FormData();
          fd.append("university_id", data.unvid);
          fd.append("student_id", localStorage.getItem("studentid"));
          fd.append("course_id", data.courseid);
          fd.append("agent_id", response.data.agent_id);
          fd.append("application_id", response.data.message);
          fd.append("course_startdate", localStorage.getItem("start_date"));
          let uri = baseurl + "/saveagentviewer";
          const post = axios.post(uri, fd).then((response) => {});
        }
        //console.log(response.data);
        //this.setState({ applicationID : response.data.message })
        // localStorage.setItem('selectcoursedraft',response.data.message);
        // window.location = "/#/applications";
      });
  };

  getIndex = (value, arr, prop) => {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return value;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  };

  removestorewishlist = (data) => {
    for (var i = 0; i < this.state.getstorewishlistdata.length; i++) {
      if (this.state.getstorewishlistdata[i].course_id === data) {
        const deleteid = this.state.getstorewishlistdata[i].id;
        console.log("jksdnaksdnakd", deleteid);
        axios.get(baseurl + "/deleteWishlist/" + deleteid).then((response) => {
          toast.success("Favourite Removed Successfully");
          setTimeout(function () {}, 3000);
          this.getstorewishlist();
        });
      }
    }
  };

  handleFav = (data) => {
    console.log("click data", data);
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append("university_id", data.unvid);
    this.state.formData.append("course_id", data.uncourseid);

    submitStore(
      "form-data",
      this.state.formData,
      (msg) => {
        toast.success("Favourite Saved Successfully");
        setTimeout(function () {}, 3000);
        this.getstorewishlist();
      },
      "student"
    );
  };

  handleMoreChange = (event) => {
    $(".hiderow").css("display", "table-row");
    $(".seemore").css("display", "none");
  };

  handleViewmoreChange = (param) => (e) => {
    // var mess="";
    // axios.get(baseurl+'/get_allappcompletegeneral/'+localStorage.getItem('studentid')).then(response =>
    //       {
    //         mess=response.data.message;

    //         if(mess!=="Not filled"){
    axios
      .get(
        baseurl +
          "/getcoursedetails/" +
          param +
          "/" +
          localStorage.getItem("studentid")
      )
      .then((response) => {
        console.log("cour", this.state.levelname);
        this.setState({
          levelname: response.data.levelname,
          coursedetails: response.data.courses,
          prostatus: response.data.prostatus,
          startDate: response.data.start_date,
        });
        this.setState({ programshow: false });
        console.log("cour1", this.state.levelname);
      });

    //     }
    //     else{toast.error("Please Complete your profile to apply course")}

    // });
  };

  closeall = (e) => {
    // window.location.reload();
    this.setState({
      eligiblesuccess: !this.state.eligiblesuccess,
    });
  };

  closeall1 = (e) => {
    this.setState({
      eligiblefailure: !this.state.eligiblefailure,
    });
  };

  handleAllChange = (param) => (e) => {
    $(".hiderow").css("display", "none");
    $(".seemore").css("display", "table-row");
    var param = localStorage.getItem("selectuniversity");
    axios.get(baseurl + "/get_viewas/" + param).then((response) => {
      console.log("courseBF", response.data);

      // Filtering course data based on status value
      let appFee = [];
      let tutionFee = [];
      let levelId = [];
      let courseNames = [];
      let courseId = [];

      response.data.course.forEach(
        ({
          id,
          status,
          application_fee,
          tution_fee,
          heading,
          category_levelid,
        }) => {
          if (status == 1) {
            appFee.push(application_fee);
            tutionFee.push(tution_fee);
            courseNames.push(heading);
            levelId.push(category_levelid);
            courseId.push(id);
          }
        }
      );

      this.setState({
        tution_fee: tutionFee,
        app_fee: appFee,
        levelid: levelId,
        batch: response.data.batch,
        batchh: response.data.batchh,
        course: courseNames,
        cat: response.data.cat,
        cat_id: response.data.cat_id,
        batch_id: response.data.batch_id,
        courseid: courseId,
        count: courseNames.length,
      });
      console.log("courseAF", courseNames.length);
      console.log("Show all func", response.data.count);
    });
    $(".stype").removeClass("active");
    e.target.className = "stype active";
  };

  handleChange = (param) => (e) => {
    $(".hiderow").css("display", "none");
    $(".seemore").css("display", "table-row");
    var unv_id = localStorage.getItem("selectuniversity");
    axios
      .get(baseurl + "/get_viewasfilter/" + unv_id + "/" + param)
      .then((response) => {
        // Filtering course data based on status value
        let appFee = [];
        let tutionFee = [];
        let levelId = [];
        let courseNames = [];
        let courseId = [];

        response.data.course.forEach(
          ({
            id,
            status,
            application_fee,
            tution_fee,
            heading,
            category_levelid,
          }) => {
            if (status == 1) {
              appFee.push(application_fee);
              tutionFee.push(tution_fee);
              courseNames.push(heading);
              levelId.push(category_levelid);
              courseId.push(id);
            }
          }
        );
        this.setState({
          tution_fee: tutionFee,
          app_fee: appFee,
          levelid: levelId,
          batch: response.data.batch,
          batchh: response.data.batchh,
          course: courseNames,
          cat: response.data.cat,
          cat_id: response.data.cat_id,
          batch_id: response.data.batch_id,
          courseid: courseId,
          count: response.data.count,
        });
        // this.setState({
        //   tution_fee: response.data.tution_fee,
        //   app_fee: response.data.app_fee,
        //   levelid: response.data.levelid,
        //   batch: response.data.batch,
        //   batchh: response.data.batchh,
        //   course: response.data.cou,
        //   batch_id: response.data.batch_id,
        //   courseid: response.data.courseid,
        //   count: response.data.count,
        //   status: response.data.status,
        // });
        console.log("Show func", response.data.count);
      });
    $(".stype").removeClass("active");
    e.target.className = "stype active";
  };

  getIdNames(parame) {
    return "customRadio" + parame;
  }

  handleAppChange = (event) => {
    $(".hiderow").css("display", "none");
    var unv_id = localStorage.getItem("selectuniversity");
    axios
      .get(
        baseurl + "/get_viewasapplfilter/" + unv_id + "/" + event.target.value
      )
      .then((response) => {
        this.setState({
          tution_fee: response.data.tution_fee,
          app_fee: response.data.app_fee,
          levelid: response.data.levelid,
          batch: response.data.batch,
          batchh: response.data.batchh,
          course: response.data.cou,
          batch_id: response.data.batch_id,
          courseid: response.data.courseid,
          count: response.data.count,
        });
      });
    //this.setState({lan_exam: event.target.value});
  };

  handleTueChange = (event) => {
    $(".hiderow").css("display", "none");
    var unv_id = localStorage.getItem("selectuniversity");
    axios
      .get(
        baseurl + "/get_viewastuefilter/" + unv_id + "/" + event.target.value
      )
      .then((response) => {
        this.setState({
          tution_fee: response.data.tution_fee,
          app_fee: response.data.app_fee,
          levelid: response.data.levelid,
          batch: response.data.batch,
          batchh: response.data.batchh,
          course: response.data.cou,
          batch_id: response.data.batch_id,
          courseid: response.data.courseid,
          count: response.data.count,
        });
      });
    //this.setState({lan_exam: event.target.value});
    
  };

  backlink() {
    window.location = "/#/institutelist";
  }

  backlinkpro() {
    if (localStorage.getItem("selectcourse")) {
      window.location = "/#/institutelist";
    } else {
      //alert("sdsads");
      window.location.reload();
    }
  }

  handleMailprogram = (param) => (e) => {
    //alert(param);
    localStorage.setItem("coursemail", param);
    localStorage.setItem("application_advice", true);
    localStorage.removeItem("agentstore");
    window.location = "/#/composemail";
  };

  //for check elegiblity

  handleChangeElegibilityprogram = (param) => (e) => {
    const { checkEligibilityStatusIdArray } = this.state;
    var mess = "";
    axios
      .get(
        baseurl +
          "/get_allappcompletegeneral/" +
          localStorage.getItem("studentid")
      )
      .then((response) => {
        mess = response.data.message;
        console.log("profile incomplete", response);
        if (mess !== "Not filled") {
          const data = {
            studentid: localStorage.getItem("studentid"),
            courseid: param,
          };

          axios.post(baseurl + "/checkelegibility", data).then((response) => {
            if (response.data.status_code == 200) {
              checkEligibilityStatusIdArray.push(param);
              this.setState({
                eligiblesuccess: true,
                prostatus: "1",
                checkEligibilityStatusIdArray: checkEligibilityStatusIdArray,
              });
            } else {
              this.setState({ failuremessage: response.data.message });
              this.setState({ eligiblefailure: true });
            }
          });
        } else {
          toast.error(
            "Please fill your profile in order to check eligibility criteria"
          );
        }
      });
  };

  toggleSuccess() {
    this.setState({
      eligiblesuccess: !this.state.eligiblesuccess,
    });
  }

  toggleFailure() {
    this.setState({
      eligiblefailure: !this.state.eligiblefailure,
    });
  }

  handleCatChange = (param) => (e) => {
    $(".hiderow").css("display", "none");
    var unv_id = localStorage.getItem("selectuniversity");
    axios
      .get(baseurl + "/get_viewascatfilter/" + unv_id + "/" + param)
      .then((response) => {
        // Filtering course data based on status value
        let appFee = [];
        let tutionFee = [];
        let levelId = [];
        let courseNames = [];
        let courseId = [];

        response.data.course.forEach(
          ({
            id,
            status,
            application_fee,
            tution_fee,
            heading,
            category_levelid,
          }) => {
            if (status == 1) {
              appFee.push(application_fee);
              tutionFee.push(tution_fee);
              courseNames.push(heading);
              levelId.push(category_levelid);
              courseId.push(id);
            }
          }
        );

        this.setState({
          tution_fee: tutionFee,
          app_fee: appFee,
          levelid: levelId,
          batch: response.data.batch,
          batchh: response.data.batchh,
          course: courseNames,
          //  cat: response.data.cat,
          //  cat_id: response.data.cat_id,
          batch_id: response.data.batch_id,
          courseid: courseId,
          count: response.data.count,
        });
      });
  };

  getData = () => {
    var id = localStorage.getItem("selectuniversity");

    axios
      .get(baseurl + "/get_reviews_byuniversityid/" + id)
      .then((response) => {
        this.setState({
          items: response.data,
          items1: response.data,
        });
      });
  };

  handleCommentBox = (params) => (e) => {
    // alert("hi");
    this.setState({
      commentText: "",
      OpenComment: true,
      currentReviewId: params.id,
    });
  };
  handleCommentText = (e) => {
    this.setState({ commentText: e.target.value });
  };
  handleOnchange = (params) => {
    if (params.target.value === "0") {
      this.setState({ items: this.state.items1 });
    }
    if (params.target.value === "1") {
      let one_arr = [];
      this.state.items1.map((chk) => {
        if (chk.no_of_ratings === 1) {
          one_arr.push(chk);
        }
      });
      this.setState({ items: one_arr });
      console.log(this.state.items, "review data");
    }
    if (params.target.value === "2") {
      let one_arr = [];
      this.state.items1.map((chk) => {
        if (chk.no_of_ratings === 2) {
          one_arr.push(chk);
        }
      });
      this.setState({ items: one_arr });
      console.log(this.state.items, "review data");
    }
    if (params.target.value === "3") {
      let one_arr = [];
      this.state.items1.map((chk) => {
        if (chk.no_of_ratings === 3) {
          one_arr.push(chk);
        }
      });
      this.setState({ items: one_arr });
      console.log(this.state.items, "review data");
    }
    if (params.target.value === "4") {
      let one_arr = [];
      this.state.items1.map((chk) => {
        if (chk.no_of_ratings === 4) {
          one_arr.push(chk);
        }
      });
      this.setState({ items: one_arr });
      console.log(this.state.items, "review data");
    }
    if (params.target.value === "5") {
      let one_arr = [];
      this.state.items1.map((chk) => {
        if (chk.no_of_ratings === 5) {
          one_arr.push(chk);
        }
      });
      this.setState({ items: one_arr });
      console.log(this.state.items, "review data");
    }
  };

  PostLikeBox = (params) => (e) => {
    let fd = new FormData();
    fd.append("review_id", params.id);
    fd.append("university_id", params.university_id);
    fd.append("sender_id", localStorage.getItem("studentid"));
    fd.append("sender_type", "Student");
    //fd.append("message", this.state.commentText);
    fd.append("like_counts", 1);

    axios.post(baseurl + "/savereviewlike_university", fd).then(this.getData());
  };

  PostComment = (params) => (e) => {
    let fd = new FormData();
    fd.append("review_id", params.id);
    fd.append("university_id", params.university_id);
    fd.append("sender_id", localStorage.getItem("studentid"));
    fd.append("sender_type", "Student");
    fd.append("message", this.state.commentText);

    axios.post(baseurl + "/savereviewcomment_university", fd).then(
      this.getData(),
      this.setState({
        commentText: "",
        OpenComment: false,
        currentReviewId: 0,
      })
    );
  };

  LeaveReview = () => (e) => {
    if (this.state.relationship_status === "found") {
      window.location.href = "/#/LeaveReviewUniversity";
    } else {
      toast.warning("You are not authorized to give review.");
    }
  };

  toggleLarge() {
    // alert("toggle large");
    this.setState({
      large: !this.state.large,
      todos: [],
      filteredTodos: [],
    });
  }

  ContactUniversity = () => (event) => {
    var id = localStorage.getItem("selectuniversity");
    localStorage.setItem("fromPage", "ContactUs");
    localStorage.setItem("fromUniversityMail", this.state.universityMail);
    localStorage.removeItem("agentstore");
    window.location.href = "/#/composemail";
  };

  RequestMeeting = () => (event) => {
    let fd = new FormData();
    fd.append("type", "Student");
    fd.append("type_id", localStorage.getItem("studentid"));
    fd.append("mail_from", localStorage.getItem("studentemail"));
    fd.append("mail_to", this.state.universityMail);
    fd.append("mail_cc", "");
    fd.append("mail_bcc", "");
    fd.append("composemailid", 0);

    axios.post(baseurl + "/request_meeting", fd).then((response) => {
      toast.success("Meeting requested successfully.");
    });
  };

  handleEditClick = (params) => (e) => {
    this.setState({
      editcomment: true,
      currentReviewId: params.id,
      commentText: params.review_message,
    });
  };

  handleSubEditClick = (params) => (e) => {
    this.setState({
      editcomment: true,
      currentReviewId: params.id,
      commentText: params.message,
    });
  };

  PostEditComment = (params, typ) => (e) => {
    let fd = new FormData();
    fd.append("id", params.id);
    fd.append("category", typ);
    fd.append("message", this.state.commentText);

    axios.post(baseurl + "/editreviews_studentuniversity", fd).then(
      this.getData(),
      this.setState({
        commentText: "",
        editcomment: false,
        currentReviewId: 0,
      })
    );
  };

  DeleteComment = (params, typ) => (e) => {
    let fd = new FormData();
    fd.append("id", params.id);
    fd.append("category", typ);

    axios
      .post(baseurl + "/deletereviews_studentuniversity", fd)
      .then(this.getData());
  };

  render() {
    var arr = {
      1: "Bachelor Degree",
      2: "Post graduate Degree",
      3: "Vocational",
      4: "Doctorates",
    };
    const { errors } = this.state;
    //alert();
    const imgpath = `${config.baseurl}`;
    let overall_star = 0;

    this.state.items.map((item) => {
      overall_star = overall_star + item.no_of_ratings;
    });

    const overall_review = overall_star / this.state.items.length;
    // console.log('about state', this.state.about)
    // console.log('getstorewishlist', this.state.getstorewishlistdata,);
    return (
      <div className="animated fadeIn gray-bg-300">
        <Modal
          isOpen={this.state.eligiblesuccess}
          toggle={this.toggleSuccess}
          className={
            "modal-md " +
            "register-popup sucess-pop" +
            " " +
            this.props.className
          }
        >
          <ModalBody>
            <div className="modal_header mb-4">
              <span>
                &nbsp;&nbsp;&nbsp;
                <img
                  src={Closebtn}
                  alt="close-icon"
                  onClick={this.closeall}
                  className="uni-icon"
                />
              </span>
            </div>
            <div className="p-5 text-center">
              <div className="mb-5 sucess-text">
                Congratulations!. You are eligible to apply for this program.
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.eligiblefailure}
          toggle={this.toggleFailure}
          className={
            "modal-md " +
            "register-popup sucess-pop" +
            " " +
            this.props.className
          }
        >
          <ModalBody>
            <div className="modal_header mb-4">
              <span>
                &nbsp;&nbsp;&nbsp;
                <img
                  src={Closebtn}
                  alt="close-icon"
                  onClick={this.closeall1}
                  className="uni-icon"
                />
              </span>
            </div>
            <div className="p-5 text-center">
              <div className="mb-5 sucess-text">
                You are not eligible to apply for this program.Below are the
                details
              </div>
              <div className="mb-5 sucess-text">
                {this.state.failuremessage}.
              </div>
            </div>
          </ModalBody>
        </Modal>
        <ToastContainer />
        <div className="container-fluid px-0">
          <div className="top-section stud-about-page">
            <div className="img-block">
              {" "}
              <img src={imgpath + this.state.banner} alt="" />
            </div>
            <div className="container">
              <div className="content-block row mx-0 col-md-5">
                <div className="col-md-5">
                  {" "}
                  <img src={imgpath + this.state.logo} alt="" />{" "}
                </div>
                <div className="col-md-7 cont-rgt mt-4">
                  <h5 className="cont-rgt-head">
                    {this.state.about != null &&
                    this.state.about.institute_name != "" ? (
                      <span>{this.state.about.institute_name}</span>
                    ) : (
                      <span></span>
                    )}
                    {/* onClick={() => this.removestorewishlist({ deleteid: this.state.unfav, unvid: this.state.about.university_id, uncourseid: '' })} */}
                    {this.getIndex(
                      this.state.about.university_id,
                      this.state.getstorewishlistdata,
                      "university_id"
                    ) == this.state.about.university_id ? (
                      <span className="heart-icon">
                        {" "}
                        <img src={heart2} alt="" />
                      </span>
                    ) : (
                      <span
                        className="heart-icon"
                        onClick={() =>
                          this.handleFav({
                            deleteid: "",
                            unvid: this.state.about.university_id,
                            uncourseid: "",
                          })
                        }
                      >
                        {" "}
                        <img src={heart} alt="" />
                      </span>
                    )}
                  </h5>
                  <div className="my-3 cont-rgt-contry">
                    {" "}
                    <span className="pr-2">
                      <img src={contlogo} alt="" />
                    </span>
                    {this.state.about != null &&
                    this.state.about.country_name != "" ? (
                      <span>{this.state.about.country_name}</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="my-3 cont-rgt-grap">
                    {" "}
                    <span className="pr-3">
                      {" "}
                      <img src={bargraph} alt="" />
                    </span>
                    The World Rankings : {this.state.rank}{" "}
                  </div>
                  <div className="my-3 row pl-3 fav-rate-box mx-0">
                    <div className="icon-align row">
                      <div className="pr-3">
                        {" "}
                        <img src={eyeicon} alt="" />
                      </div>
                      <div>
                        0<br />
                        Views
                      </div>
                    </div>
                    <div className="icon-align row">
                      <div className="pr-3">
                        {" "}
                        <img src={favourites} alt="" />
                      </div>
                      <div>
                        {this.state.countlike}
                        <br />
                        Favourites
                      </div>
                    </div>
                    <div className="icon-align pl-3">
                      <div>
                        {" "}
                        {overall_review.toFixed() == 5 ? (
                          <img src={ratingfive} alt="" />
                        ) : overall_review.toFixed() == 4 ? (
                          <img src={rating} alt="" />
                        ) : overall_review.toFixed() == 3 ? (
                          <img src={ratingthree} alt="" />
                        ) : overall_review.toFixed() == 2 ? (
                          <img src={ratingtwo} alt="" />
                        ) : (
                          <img src={ratingone} alt="" />
                        )}
                      </div>

                      <div>Reviews ({this.state.items.length})</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid profile-viewus px-0">
            <div className="">
              <div className="menu-section">
                <div className="border-bottom-line fix-relative  uni-about">
                  <div className="container">
                    <ul
                      className="nav nav-tabs filter-btn float-left"
                      id=""
                      role=""
                    >
                      <li
                        className="nav-item mb-5 mt-2"
                        onClick={this.toggleLarge}
                      >
                        <a
                          className="nav-link filter font-10 pad-2rem filter-btn-fix font-10"
                          data-toggle="tab"
                          role="tab"
                          id="filter-button"
                        >
                          {" "}
                          <i class="fa fa-chevron-left" aria-hidden="true"></i>
                          &nbsp;&nbsp;FILTER{" "}
                        </a>
                      </li>
                    </ul>

                    <Modal
                      isOpen={this.state.large}
                      toggle={this.toggleLarge}
                      className={
                        "modal-lg " +
                        "register-popup student-popup-box filter-popup" +
                        " " +
                        this.props.className
                      }
                    >
                      <ModalBody className="student-popup">
                        <Form>
                          {/* <div>Pop up Show</div> */}
                          <FilterStudent1
                            search={this.state.search}
                            searchedValue={this.searchedValue}
                            closePanel={this.toggleLarge}
                            searchHistory={this.state.searchHistoryValues}
                          />
                        </Form>
                      </ModalBody>
                    </Modal>

                    <ul
                      className="nav nav-tabs partner-tab desktop-menu-view"
                      id="ProfileTab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className={this.state.aboutlink}
                          data-toggle="tab"
                          href="#About1"
                          role="tab"
                        >
                          About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          
                          
                          
                        >
                          Facilities
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          
                        >
                          Campuses
                        </a>
                      </li>
                      {/* <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#Entry1"
                          role="tab"
                        >
                          Entry Requirements
                        </a>
                      </li> */}
                      <li className={this.state.programlink + " nav-item"}>
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          
                          role="tab"
                        >
                          Programs
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          
                          
                          
                        >
                          Contact
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#Review"
                          role="tab"
                        >
                          Reviews
                        </a>
                      </li>
                    </ul>

                    {/*toggle-menu */}

                    <div
                      class="panel-group university-about mt-3 mobile-menu-view"
                      id="accordionMenu"
                      role="tablist"
                      aria-multiselectable="true"
                    >
                      <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingFour">
                          <h4 class="panel-title mb-0">
                            <a
                              class="collapsed green-btn toggle-univ-menu"
                              role="button"
                              data-toggle="collapse"
                              data-parent="#accordionMenu"
                              href="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              Menu
                            </a>
                          </h4>
                        </div>
                        <div
                          id="collapseFour"
                          class="panel-collapse collapse"
                          role="tabpanel"
                          aria-labelledby="headingFour"
                        >
                          <div class="panel-body">
                            <ul class="nav">
                              <li>
                                <a
                                  className={this.state.aboutlink}
                                  data-toggle="tab"
                                  href="#About1"
                                  role="tab"
                                >
                                  About
                                </a>
                              </li>
                              <li>
                                <a
                                  className="nav-link"
                                  
                                  
                                  
                                >
                                  Facilities
                                </a>
                              </li>
                              <li>
                                {" "}
                                <a
                                  className="nav-link"
                                  
                                  
                                  
                                >
                                  Campuses
                                </a>
                              </li>
                              <li>
                                <a
                                  className="nav-link"
                                  
                                  
                                  
                                >
                                  Programs
                                </a>
                              </li>
                              <li>
                                <a
                                  className="nav-link"
                                  
                                  
                                  
                                >
                                  Contact
                                </a>
                              </li>
                              <li>
                                <a
                                  className="nav-link"
                                  role="tab"
                                  href="#Review"
                                  data-toggle="tab"
                                >
                                  Reviews
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="foe-breabcrumb container mx-auto">
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <img
                        src={Homeicon}
                        alt="home-icon"
                        className="uni-icon"
                      />
                      &nbsp;&nbsp;<a>Home</a>
                    </BreadcrumbItem>
                    {this.state.universitycountry != "Country" &&
                    this.state.universitycountry != "" ? (
                      <BreadcrumbItem>
                        <a>{this.state.universitycountry}</a>
                      </BreadcrumbItem>
                    ) : (
                      <></>
                    )}
                    <BreadcrumbItem>
                      <a>{this.state.universitycourse}</a>
                    </BreadcrumbItem>
                    {this.state.universityeducation != "Education level" &&
                    this.state.universityeducation != "Qualification" &&
                    this.state.universityeducation != "" ? (
                      <BreadcrumbItem>
                        <a>{this.state.universityeducation}</a>
                      </BreadcrumbItem>
                    ) : (
                      <></>
                    )}
                    <BreadcrumbItem active>Search</BreadcrumbItem>
                    <BreadcrumbItem>
                      <a>{this.state.about.institute_name}</a>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
                <div className="tab-content container mx-auto">
                  <div
                    className={this.state.activetopabout}
                    id="About1"
                    role="tabpanel"
                  >
                    <div className="col-md-12 about-section mx-0 px-0 row pt-5">
                      <a
                        className="col-12 backarrow mt-3 pl-md-5"
                        style={{ cursor: "pointer" }}
                        onClick={this.backlink}
                      >
                        <span className="pr-1">
                          {" "}
                          <img src={backarrow} alt="" />
                        </span>{" "}
                        Back{" "}
                      </a>
                      <h1 className="col-md-12 about-title mt-4 mb-3 pl-md-5">
                        {" "}
                        ABOUT US{" "}
                      </h1>
                      <div className="col-lg-6 about-left-block pl-md-5">
                        <div className="col-md-12 px-0">
                          <table className="table">
                            <tbody>
                              <tr>
                                <th scope="col">LOCATION</th>
                                <td>
                                  {this.state.about != null &&
                                  this.state.about.location != "" ? (
                                    <span>{this.state.about.location}</span>
                                  ) : (
                                    <span></span>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <th scope="col">FUNDING TYPE</th>
                                <td>
                                  {this.state.about != null &&
                                  this.state.about.funding_type != "" ? (
                                    <span>{this.state.about.funding_type}</span>
                                  ) : (
                                    <span></span>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <th scope="col">NO OF STUDENTS</th>
                                <td>
                                  {this.state.about != null &&
                                  this.state.about.no_of_students != "" ? (
                                    <span>
                                      {this.state.about.no_of_students}
                                    </span>
                                  ) : (
                                    <span></span>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <th scope="col">ESTIMATE LIVING COST</th>
                                <td>
                                  {this.state.about != null &&
                                  this.state.about.estimate_livingcost != "" ? (
                                    <span>
                                      {this.state.about.currency_code + " "}
                                      {this.state.about.estimate_livingcost}
                                    </span>
                                  ) : (
                                    <span></span>
                                  )}

                                  {this.state.about != null &&
                                  this.state.about.estimate_livingperiod !=
                                    "" ? (
                                    <span>
                                      {" "}
                                      / {this.state.about.estimate_livingperiod}
                                    </span>
                                  ) : (
                                    <span></span>
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-md-12 left-cont-heg px-0">
                          {this.state.about != null &&
                          this.state.about.description != "" ? (
                            <p className="subdesc">
                              {this.state.about.description}
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 about-right-block px-0 text-right pb-5">
                        {this.state.about != null &&
                        this.state.about.filename != "" &&
                        this.state.about.filename != null ? (
                          <img
                            src={imgpath + this.state.about.filename}
                            width="450"
                            height="604"
                            className="w-100"
                          />
                        ) : (
                          <p></p>
                        )}
                      </div>

                      {/* about subsection */}
                      {this.state.aboutsub.map((aboutsub) => (
                        <div className="col-md-12 about-stud-hub mt-0 px-0 row mx-0">
                          <div className="col-md-6 px-0 stud-hub-left pl-md-5">
                            {aboutsub.layout == "right" ? (
                              <p className="subdesc pt-3">
                                <h2>{aboutsub.heading}</h2>
                                {aboutsub.description}
                              </p>
                            ) : (
                              <img
                                src={imgpath + aboutsub.filename}
                                width="555"
                                height="527"
                                alt=""
                              />
                            )}
                          </div>

                          <div className="col-md-6 stud-hub-right0 px-0">
                            {aboutsub.layout == "right" ? (
                              <img
                                src={imgpath + aboutsub.filename}
                                width="555"
                                height="527"
                                alt=""
                              />
                            ) : (
                              <p className="subdesc pl-md-5 pt-3">
                                <h2>{aboutsub.heading}</h2>
                                {aboutsub.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      {/* about subsection */}
                      {/*facilities */}
                  <div id="aboutfacility">
                  <div className="col-md-12 about-sectio mx-0 px-0 row">
                      

                      <div className="col-md-12 fullwidth-banner mt-0 px-0">
                        {this.state.facility != null &&
                        this.state.facility.filename != "" ? (
                          <img
                            src={imgpath + this.state.facility.filename}
                            width="1170"
                            height="365"
                          />
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div
                        id="Facility1"
                        className="col-md-12 about-facility px-0"
                      >
                        <div className="col-md-8 mx-auto text-center">
                          <h2 className="mb-4">Facilities</h2>
                          {this.state.facility != null &&
                          this.state.facility.description != "" ? (
                            <p className="subdesc">
                              {this.state.facility.description}
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>

                      {this.state.facilitysub.map((facilitysub) => (
                        <div className="col-md-12 about-stud-hub mt-0 px-0 row mx-0">
                          <div className="col-md-6 px-0 stud-hub-left">
                            {facilitysub.layout == "right" ? (
                              <p className="subdesc">
                                <h2>{facilitysub.heading}</h2>
                                {facilitysub.description}
                              </p>
                            ) : (
                              <img
                                src={imgpath + facilitysub.filename}
                                width="565"
                                height="535"
                                alt=""
                              />
                            )}
                          </div>

                          <div className="col-md-6 stud-hub-right0">
                            {facilitysub.layout == "right" ? (
                              <img
                                src={imgpath + facilitysub.filename}
                                width="565"
                                height="535"
                                alt=""
                              />
                            ) : (
                              <p className="subdesc pl-md-5 pt-3">
                                <h2>{facilitysub.heading}</h2>
                                {facilitysub.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/*facility end */}
                  {/*campus*/}
                  <div id="aboutcampus">
                      <div className="campus-boxx">
                        
                        <h1 className="col-md-12 about-title mt-4 mb-3 pl-md-5">
                          CAMPUSES
                        </h1>
                        <p>
                          Deakin has five campuses in Melbourne, Geelong and
                          Warrnambool, which feature world-class facilities and
                          a friendly, welcoming atmosphere. Our Cloud Campus is
                          an innovative online learning environment offering a
                          premium study experience. We also have corporate and
                          learning centres that provide meeting, study and event
                          spaces. Explore our locations in more detail and make
                          the most of what we can offer you.
                        </p>
                      </div>
                      {this.state.campus.map((campus) => (
                        <div
                          className="col-md-12 about-stud-hub mt-0 px-0 row mx-0"
                          key={campus.id}
                        >
                          <div className="col-md-6 px-0 stud-hub-left">
                            {
                              <img
                                src={imgpath + campus.filename}
                                width="555"
                                height="535"
                                alt=""
                              />
                            }
                          </div>

                          <div className="col-md-6 stud-hub-right0">
                            {
                              <p className="subdesc px-md-5 pt-3">
                                {campus.description}
                              </p>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  {/*campus end */}
                  {/*program */}
                  <div id="aboutProgramcontent">
                  {this.state.programshow ? (
                    <div
                      className={this.state.activetopprogram}
                      id="aboutProgram"
                      
                    >
                      <div className="col-md-12 about-sectio mx-0 px-0 row">

                        <h1 className="col-md-3 about-title mt-4 mb-3">
                          PROGRAMS{" "}
                        </h1>
                        <div className="col-lg-9 mt-4 row px-5">
                          <img
                            src={sechicon}
                            className="prog-srch-icon"
                            alt=""
                          />
                          <Input
                            type="text"
                            name="search_program"
                            className="prog-search"
                            placeholder="Search Program"
                          ></Input>
                        </div>
                        <div className="col-lg-3 mt-4 about-left-block">
                          <div className="mb-3">
                            <h4 className="uni-pro-h4">Choose a Category</h4>
                          </div>
                          <div className="col-md-12 filter-radio-btn px-0">
                            <Button
                              color="primary"
                              color="primary"
                              id="toggler"
                              className="drop-left"
                            >
                              Filter by interest area
                            </Button>
                            <UncontrolledCollapse
                              toggler="#toggler"
                              defaultOpen={true}
                            >
                              <ul>
                                {this.state.cat.map((cate, index) => (
                                  <li>
                                    <div className="custom-control custom-radio">
                                      <input
                                        type="radio"
                                        onClick={this.handleCatChange(
                                          this.state.cat_id[index]
                                        )}
                                        id={this.getIdNames(index)}
                                        name="customRadio"
                                        className="custom-control-input"
                                      />
                                      <label
                                        className="custom-control-label"
                                        onClick={this.handleCatChange(
                                          this.state.cat_id[index]
                                        )}
                                        for={this.getIdNames(index)}
                                      >
                                        {cate}
                                      </label>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </UncontrolledCollapse>
                          </div>
                          <div className="col-md-12 filter-radio-btn px-0 mt-5 purple-box">
                            <Button
                              color="primary"
                              color="primary"
                              id="toggler2"
                              className="drop-left"
                            >
                              Refine a Course
                            </Button>
                            <UncontrolledCollapse
                              toggler="#toggler2"
                              defaultOpen={false}
                            >
                              <div className="col-md-12">
                                <div className="card-from-group">
                                  <InputGroup className="mb-4">
                                    <label className="card-label">
                                      Application Fee
                                    </label>
                                    <Input
                                      type="select"
                                      name="application_fee"
                                      onChange={this.handleAppChange}
                                      id="SelectLm"
                                      bsSize="sm"
                                      className="btn btn-secondary"
                                    >
                                      <option value=""> Select </option>
                                      <option value="1">Above 100</option>
                                      <option value="2">Below 100</option>
                                    </Input>
                                  </InputGroup>
                                </div>

                                <div className="card-from-group">
                                  <InputGroup className="mb-4">
                                    <label className="card-label">
                                      Tution Fee
                                    </label>
                                    <Input
                                      type="select"
                                      name="tution_fee"
                                      onChange={this.handleTueChange}
                                      id="SelectLm"
                                      bsSize="sm"
                                      className="btn btn-secondary"
                                    >
                                      <option value=""> Select </option>
                                      <option value="1">Above 100</option>
                                      <option value="2">Below 100</option>
                                    </Input>
                                  </InputGroup>
                                </div>
                              </div>
                            </UncontrolledCollapse>
                          </div>
                        </div>

                        <div className="col-lg-9 about-right-block px-0 text-right">
                          <div className="col-md-11 align-left mt-4 unimenu list-inline mx-auto">
                            <div className="unimenu-1 text-nowrap">
                              <a
                                className="stype active"
                                onClick={this.handleAllChange("All")}
                              >
                                Show all
                              </a>
                              <a
                                className="stype"
                                onClick={this.handleChange("1")}
                              >
                                Bachelor Degree
                              </a>
                              <a
                                className="stype"
                                onClick={this.handleChange("2")}
                              >
                                Post graduate Degree
                              </a>
                              <a
                                className="stype"
                                onClick={this.handleChange("3")}
                              >
                                Vocational
                              </a>
                              <a
                                className="stype"
                                onClick={this.handleChange("4")}
                              >
                                Doctorates
                              </a>
                            </div>

                            <table className="table list-items univ-programs table-responsive-sm">
                              <tbody>
                                {this.state.app_fee.map((appfee, index) => (
                                  <tr
                                    className={
                                      index > 7
                                        ? "allrow hiderow"
                                        : "allrow showrow"
                                    }
                                  >
                                    <td>
                                      <table
                                        width="100%"
                                        cellPadding="0"
                                        cellSpacing="0"
                                        border="0"
                                      >
                                        <tr>
                                          <th colSpan="6">
                                            {this.state.course[index]}
                                          </th>
                                        </tr>
                                        <tr>
                                          <td>
                                            <span>Study Type</span>
                                            <br />
                                            {arr[this.state.levelid[index]]}
                                          </td>
                                          <td>
                                            <span>TUITION FEE</span>
                                            <br />
                                            {this.state.currency_code + " "}
                                            {this.state.tution_fee[index]}
                                          </td>
                                          <td>
                                            <span>APPLICATION FEE</span>
                                            <br />
                                            {this.state.currency_code + " "}
                                            {appfee}
                                          </td>
                                          <td>
                                            <span>Campus</span>
                                            <br />-
                                          </td>
                                          <td className="d-flex min-width-85px">
                                            <div className="d-flex flex-column-reverse">
                                              <a className="btn viewm-btn check-btn">
                                                View More
                                              </a>
                                              <a
                                                onClick={this.handleViewmoreChange(
                                                  this.state.courseid[index]
                                                )}
                                                className="btn viewm-btn green-btn check-btn white-text"
                                              >
                                                CHECK ELIGIBILITY
                                              </a>
                                            </div>
                                            &nbsp;&nbsp;
                                            {this.getIndex(
                                              this.state.courseid[index],
                                              this.state.getstorewishlistdata,
                                              "course_id"
                                            ) == this.state.courseid[index] ? (
                                              <span
                                                className="btn like_btn tbl-btn"
                                                onClick={() =>
                                                  this.removestorewishlist(
                                                    this.state.courseid[index]
                                                  )
                                                }
                                              >
                                                <img
                                                  src={likeicon}
                                                  alt="home-icon"
                                                  className="uni-icon heart-size mt-3"
                                                  width="30"
                                                />
                                              </span>
                                            ) : (
                                              <span
                                                className="btn like_btn tbl-btn"
                                                onClick={() =>
                                                  this.handleFav({
                                                    deleteid: "",
                                                    unvid: this.state.unvid,
                                                    uncourseid: this.state
                                                      .courseid[index],
                                                  })
                                                }
                                              >
                                                <img
                                                  src={Likeicon}
                                                  alt="home-icon"
                                                  className="uni-icon heart-size mt-3"
                                                  width="30"
                                                />
                                              </span>
                                            )}
                                            {/* <span className="btn like_btn tbl-btn" ><img src={Likeicon} alt="home-icon" className="uni-icon" /></span> */}
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                ))}
                                {this.state.count > 8 ? (
                                  <tr className="seemore">
                                    <td>
                                      <table
                                        width="100%"
                                        cellPadding="0"
                                        cellSpacing="0"
                                        border="0"
                                      >
                                        <tr>
                                          <td colspan="4">
                                            <span
                                              onClick={this.handleMoreChange}
                                            >
                                              <button
                                                type="submit"
                                                className="px-4 float-md save-btn btn btn-primary seemore_btn"
                                              >
                                                See more &nbsp;&nbsp;&nbsp;
                                                <i
                                                  className="fa fa-chevron-down"
                                                  aria-hidden="true"
                                                ></i>
                                              </button>
                                            </span>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={this.state.activetopprogram}
                      
                      
                    >
                      <div className="col-md-12 about-sectio mx-0 px-0 row">
                        
                        <div className="row w-100 pro-boxs">
                          <div className="col-md-3">
                            <h1 className="col-md-12 about-title mt-4 mb-3">
                              PROGRAM
                            </h1>
                          </div>
                          <div className="col-md-9">
                            <div className="row mx-0 prog-head-box">
                              <div className="program-heading col-md-8">
                                {this.state.coursedetails.heading}
                              </div>
                              <div className="col-md-4 text-right">
                                {this.getIndex(
                                  this.state.coursedetails.id,
                                  this.state.getstorewishlistdata,
                                  "course_id"
                                ) == this.state.coursedetails.id ? (
                                  <span
                                    className="btn like_btn tbl-btn"
                                    onClick={() =>
                                      this.removestorewishlist(
                                        this.state.coursedetails.id
                                      )
                                    }
                                  >
                                    <img
                                      src={likeicon}
                                      alt="home-icon"
                                      className="uni-icon"
                                    />
                                  </span>
                                ) : (
                                  <span
                                    className="btn like_btn tbl-btn"
                                    onClick={() =>
                                      this.handleFav({
                                        deleteid: "",
                                        unvid: this.state.unvid,
                                        uncourseid: this.state.coursedetails.id,
                                      })
                                    }
                                  >
                                    <img
                                      src={Likeicon}
                                      alt="home-icon"
                                      className="uni-icon"
                                    />
                                  </span>
                                )}
                                {/* <img src={Likeicon} alt="home-icon" className="uni-icon" /> */}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-3 about-left-block">
                          <div className="col-md-12 left-cont-box px-0">
                            <Card className="uni-left-card">
                              <CardBody>
                                <ListGroup className="left-list">
                                  <ListGroupItem className="active">
                                    About this course
                                  </ListGroupItem>
                                  {/*<ListGroupItem>Overview</ListGroupItem>
										
										 <ListGroupItem>Department</ListGroupItem>
										<ListGroupItem>CRICOS</ListGroupItem>6
										<ListGroupItem>Study options</ListGroupItem>
										<ListGroupItem>Entry requirements</ListGroupItem>  */}
                                </ListGroup>
                              </CardBody>
                            </Card>
                          </div>
                        </div>

                        <div className="col-md-6 about-right-block px-0 text-left">
                          <div className="prog-sub-head">
                            What i will learn{" "}
                          </div>
                          <div className="prog-text">
                            {this.state.coursedetails != null &&
                            this.state.coursedetails.description != "" ? (
                              <p className="subdesc">
                                {this.state.coursedetails.description}
                              </p>
                            ) : (
                              <p></p>
                            )}{" "}
                          </div>

                          <div className="pro-list-box">
                            <div className="prog-sub-head">Study options</div>
                            <div className="pro-detail-box">
                              <div className="pro-option">
                                <span className="pro-left-text">
                                  START DATE :
                                </span>{" "}
                                <span className="pro-detail-num">
                                  {this.state.startDate}
                                  {console.log(
                                    "mystartdate",
                                    this.state.startDate
                                  )}
                                </span>
                              </div>
                              <div className="pro-option">
                                <span className="pro-left-text">TENURE :</span>{" "}
                                <span className="pro-detail-num">
                                  {this.state.coursedetails.tenure}
                                </span>
                              </div>
                              <div className="pro-option">
                                <span className="pro-left-text">
                                  TUTION FEE :
                                </span>
                                <span className="pro-detail-num">
                                  {this.state.currency_code}{" "}
                                  {this.state.coursedetails.tution_fee}
                                </span>
                              </div>
                              <div className="pro-option">
                                <span className="pro-left-text">
                                  APPLICATION FEE :
                                </span>{" "}
                                <span className="pro-detail-num">
                                  {this.state.currency_code + " "}
                                  {this.state.coursedetails.application_fee}
                                </span>
                              </div>
                              <div className="pro-option">
                                <span className="pro-left-text">
                                  PREREQUISTE EDUCATION :
                                </span>{" "}
                                <span className="pro-detail-num">
                                  {this.state.levelname}
                                </span>
                              </div>
                              <div className="pro-option">
                                <span className="pro-left-text">GRADE :</span>
                                <span className="pro-detail-num">
                                  {" "}
                                  <span className="w-100">
                                    MIN - {this.state.coursedetails.grade_min}%
                                  </span>{" "}
                                  <span className="w-100">
                                    RECOMMANDED -{" "}
                                    {this.state.coursedetails.grade_recommended}
                                    %
                                  </span>
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 prog-jus-end">
                          <div className="">
                            {this.state.prostatus >= "1" ||
                            this.state.checkEligibilityStatusIdArray.includes(
                              this.state.coursedetails.id
                            ) ? (
                              <a
                                onClick={() =>
                                  this.handleChangeApplyprogram({
                                    courseid: this.state.coursedetails.id,
                                    unvid: this.state.unvid,
                                  })
                                }
                              >
                                <Button
                                  outline
                                  color="primary"
                                  className="btn-check"
                                >
                                  APPLY
                                </Button>
                              </a>
                            ) : (
                              <Button
                                outline
                                color="primary"
                                className="btn-check"
                                onClick={this.handleChangeElegibilityprogram(
                                  this.state.coursedetails.id
                                )}
                              >
                                Check eligibility
                              </Button>
                            )}
                            <br />
                            <Button
                              outline
                              color="primary"
                              className="btn-advice"
                              onClick={this.handleMailprogram(
                                this.state.coursedetails.id
                              )}
                            >
                              Get Application
                              <br /> Advice
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                  {/*program end */}
                  {/*contact */}
                  <div
                    id="aboutContact"
                    className="tab-pane uni-contact-box w-100"
                  >
                    
                    <div className="row px-5">
                      <div className="col-12 my-3">
                        <h1 className="contact-title">contact us</h1>
                      </div>

                      <div className="col-12 mb-3">
                        <p className="contact-letter">
                          General enquiries and campus contacts
                        </p>
                      </div>
                    </div>

                    {this.state.campus.map((campus) => (
                      <div className="row">
                        <div className="col-12">
                          {this.state.contact.filter(
                            (contact) =>
                              contact.status == 1 &&
                              campus.status == 1 &&
                              campus.id == contact.campusid
                          ).length > 0 ? (
                            <div className="contact-header-title">
                              <h3>{campus.location}</h3>
                            </div>
                          ) : null}
                        </div>
                        {console.log("length", this.state.contact.length)}
                        {this.state.contact
                          .filter(
                            (contact) =>
                              contact.status == 1 && campus.status == 1
                          )
                          .map((contactdata) =>
                            campus.id == contactdata.campusid ? (
                              <div className="col-12 contact-block">
                                <div className="col-12 my-4 px-0">
                                  <p className="campus-name">
                                    {" "}
                                    {contactdata.heading}
                                  </p>
                                </div>
                                <div className="col-12 row px-0">
                                  <Card className="contact-card col-3">
                                    <CardBody>
                                      <CardTitle>Opening Hours</CardTitle>
                                      <CardText>
                                        <br /> Mon to Fri
                                      </CardText>
                                      <CardText>
                                        <img
                                          src={Phoneicon}
                                          alt="home-icon"
                                          className="uni-icon pr-2"
                                        />{" "}
                                        {contactdata.phone}
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                  <Card className="contact-card col-3">
                                    <CardBody>
                                      <CardTitle>Street Address</CardTitle>
                                      <CardText>{campus.address}</CardText>
                                    </CardBody>
                                  </Card>
                                  <Card className="contact-card col-3">
                                    <CardBody>
                                      <CardTitle>Mailing Address</CardTitle>
                                      <CardText>{contactdata.email}</CardText>
                                    </CardBody>
                                  </Card>
                                  <Card className="contact-card col-3">
                                    <CardBody>
                                      <CardText>
                                        <Button
                                          color="primary"
                                          className="contact-btn-1 width-162px"
                                        >
                                          Contact us
                                        </Button>
                                      </CardText>
                                      <CardText>
                                        <Button
                                          color="primary"
                                          className="contact-btn-1 width-162px"
                                        >
                                          {" "}
                                          <img
                                            src={Calendaricon}
                                            alt="home-icon"
                                            className="uni-icon pr-2"
                                          />{" "}
                                          request meeting
                                        </Button>
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                </div>
                              </div>
                            ) : null
                          )}
                      </div>
                    ))}
                  </div>

                  {/*contact end*/}
                  {/*review */}
                  
                  {/*review-end */}
                    </div>
                  
                  
                  
                  </div>
                  {/* <div className="tab-pane" id="Facility1" role="tabpanel">
                    <div className="col-md-12 about-section mx-0 px-0 row">
                      <a
                        className="col-12 backarrow mt-3 mb-3 pl-md-5"
                        style={{ cursor: "pointer" }}
                        onClick={this.backlink}
                      >
                        <span className="pr-1">
                          {" "}
                          <img src={backarrow} alt="" />
                        </span>{" "}
                        Back{" "}
                      </a>

                      <div className="col-md-12 fullwidth-banner mt-0 px-0">
                        {this.state.facility != null &&
                        this.state.facility.filename != "" ? (
                          <img
                            src={imgpath + this.state.facility.filename}
                            width="1170"
                            height="365"
                          />
                        ) : (
                          <p></p>
                        )}
                      </div>
                      <div
                        id="Facility1"
                        className="col-md-12 about-facility px-0"
                      >
                        <div className="col-md-8 mx-auto text-center">
                          <h2 className="mb-4">Facilities</h2>
                          {this.state.facility != null &&
                          this.state.facility.description != "" ? (
                            <p className="subdesc">
                              {this.state.facility.description}
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>

                      {this.state.facilitysub.map((facilitysub) => (
                        <div className="col-md-12 about-stud-hub mt-0 px-0 row mx-0">
                          <div className="col-md-6 px-0 stud-hub-left">
                            {facilitysub.layout == "right" ? (
                              <p className="subdesc">
                                <h2>{facilitysub.heading}</h2>
                                {facilitysub.description}
                              </p>
                            ) : (
                              <img
                                src={imgpath + facilitysub.filename}
                                width="565"
                                height="535"
                                alt=""
                              />
                            )}
                          </div>

                          <div className="col-md-6 stud-hub-right0">
                            {facilitysub.layout == "right" ? (
                              <img
                                src={imgpath + facilitysub.filename}
                                width="565"
                                height="535"
                                alt=""
                              />
                            ) : (
                              <p className="subdesc pl-md-5 pt-3">
                                <h2>{facilitysub.heading}</h2>
                                {facilitysub.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div> */}

                  <div
                    className="tab-pane campus-tabs"
                    id="Campus1"
                    role="tabpanel"
                  >
                    {/* <div className="col-md-12 about-section mx-0 px-0 row ">
                      <div className="campus-boxx">
                        <a
                          className="col-12 backarrow mt-3 pl-md-5 "
                          style={{ cursor: "pointer" }}
                          onClick={this.backlink}
                        >
                          <span className="pr-1">
                            {" "}
                            <img src={backarrow} alt="" />
                          </span>{" "}
                          Back{" "}
                        </a>
                        <h1 className="col-md-12 about-title mt-4 mb-3 pl-md-5">
                          CAMPUSES
                        </h1>
                        <p>
                          Deakin has five campuses in Melbourne, Geelong and
                          Warrnambool, which feature world-class facilities and
                          a friendly, welcoming atmosphere. Our Cloud Campus is
                          an innovative online learning environment offering a
                          premium study experience. We also have corporate and
                          learning centres that provide meeting, study and event
                          spaces. Explore our locations in more detail and make
                          the most of what we can offer you.
                        </p>
                      </div>
                      {this.state.campus.map((campus) => (
                        <div
                          className="col-md-12 about-stud-hub mt-0 px-0 row mx-0"
                          key={campus.id}
                        >
                          <div className="col-md-6 px-0 stud-hub-left">
                            {
                              <img
                                src={imgpath + campus.filename}
                                width="555"
                                height="535"
                                alt=""
                              />
                            }
                          </div>

                          <div className="col-md-6 stud-hub-right0">
                            {
                              <p className="subdesc px-md-5 pt-3">
                                {campus.description}
                              </p>
                            }
                          </div>
                        </div>
                      ))}
                    </div> */}
                  </div>

                  <div className="tab-pane" id="Entry1" role="tabpanel">
                    <div className="col-md-12 about-section mx-0 px-0 row">
                      <a
                        className="col-12 backarrow mt-3 pl-md-5"
                        style={{ cursor: "pointer" }}
                        onClick={this.backlink}
                      >
                        <span className="pr-1">
                          {" "}
                          <img src={backarrow} alt="" />
                        </span>{" "}
                        Back{" "}
                      </a>
                      <h1 className="col-md-12 about-title mt-4 mb-3 pl-md-5 ">
                        ENTRY REQUIREMENTS
                      </h1>
                      <div className="col-md-6 about-left-block">
                        <div className="col-md-12 left-cont-heg px-0 mb-4">
                          {this.state.entryrequirements != null &&
                          this.state.entryrequirements.description != "" ? (
                            <p className="subdesc pl-md-5 pt-3">
                              {this.state.entryrequirements.description}
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                        <div className="pl-5">
                          INTERNATIONAL REQUIREMENTS :{" "}
                          {this.state.entryrequirements != null &&
                          this.state.entryrequirements.url != "" ? (
                            <p className="subdesc pl-md-3 pt-3">
                              {this.state.entryrequirements.url}
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6 about-right-block px-0 text-right">
                        {this.state.entryrequirements != null &&
                        this.state.entryrequirements.filename != "" &&
                        this.state.entryrequirements.filename != null ? (
                          <img
                            src={
                              imgpath + this.state.entryrequirements.filename
                            }
                            width="450"
                            height="604"
                          />
                        ) : (
                          <p></p>
                        )}
                      </div>

                      {/* about subsection */}
                      {this.state.entryrequirementssub.map(
                        (entryrequirementssub) => (
                          <div className="col-md-12 about-stud-hub px-0 row mx-0">
                            <div className="col-md-6 px-0 stud-hub-left">
                              {entryrequirementssub.layout == "right" ? (
                                <p className="subdesc pl-md-5 pt-3">
                                  <h2>{entryrequirementssub.heading}</h2>
                                  {entryrequirementssub.description}
                                </p>
                              ) : (
                                <img
                                  src={imgpath + entryrequirementssub.filename}
                                  width="555"
                                  height="535"
                                  alt=""
                                />
                              )}
                            </div>

                            <div className="col-md-6 stud-hub-right0">
                              {entryrequirementssub.layout == "right" ? (
                                <img
                                  src={imgpath + entryrequirementssub.filename}
                                  width="555"
                                  height="535"
                                  alt=""
                                />
                              ) : (
                                <p className="subdesc pl-md-5 pt-3">
                                  <h2>{entryrequirementssub.heading}</h2>
                                  {entryrequirementssub.description}
                                </p>
                              )}
                            </div>
                          </div>
                        )
                      )}
                      {/* about subsection */}
                    </div>
                  </div>

                  

                  {/* <div
                    id="Contactus1"
                    className="tab-pane uni-contact-box w-100"
                    role="tabpanel"
                  >
                    <a
                      className="col-12 backarrow mt-3"
                      style={{ cursor: "pointer" }}
                      onClick={this.backlink}
                    >
                      <span className="pr-1">
                        {" "}
                        <img src={backarrow} alt="" />
                      </span>{" "}
                      Back{" "}
                    </a>
                    <div className="row">
                      <div className="col-12 my-3">
                        <h1 className="contact-title">contact us</h1>
                      </div>

                      <div className="col-12 mb-3">
                        <p className="contact-letter">
                          General enquiries and campus contacts
                        </p>
                      </div>
                    </div>

                    {this.state.campus.map((campus) => (
                      <div className="row">
                        <div className="col-12">
                          {this.state.contact.filter(
                            (contact) =>
                              contact.status == 1 &&
                              campus.status == 1 &&
                              campus.id == contact.campusid
                          ).length > 0 ? (
                            <div className="contact-header-title">
                              <h3>{campus.location}</h3>
                            </div>
                          ) : null}
                        </div>
                        {console.log("length", this.state.contact.length)}
                        {this.state.contact
                          .filter(
                            (contact) =>
                              contact.status == 1 && campus.status == 1
                          )
                          .map((contactdata) =>
                            campus.id == contactdata.campusid ? (
                              <div className="col-12 contact-block">
                                <div className="col-12 my-4 px-0">
                                  <p className="campus-name">
                                    {" "}
                                    {contactdata.heading}
                                  </p>
                                </div>
                                <div className="col-12 row px-0">
                                  <Card className="contact-card col-3">
                                    <CardBody>
                                      <CardTitle>Opening Hours</CardTitle>
                                      <CardText>
                                        <br /> Mon to Fri
                                      </CardText>
                                      <CardText>
                                        <img
                                          src={Phoneicon}
                                          alt="home-icon"
                                          className="uni-icon pr-2"
                                        />{" "}
                                        {contactdata.phone}
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                  <Card className="contact-card col-3">
                                    <CardBody>
                                      <CardTitle>Street Address</CardTitle>
                                      <CardText>{campus.address}</CardText>
                                    </CardBody>
                                  </Card>
                                  <Card className="contact-card col-3">
                                    <CardBody>
                                      <CardTitle>Mailing Address</CardTitle>
                                      <CardText>{contactdata.email}</CardText>
                                    </CardBody>
                                  </Card>
                                  <Card className="contact-card col-3">
                                    <CardBody>
                                      <CardText>
                                        <Button
                                          color="primary"
                                          className="contact-btn-1 width-162px"
                                        >
                                          Contact us
                                        </Button>
                                      </CardText>
                                      <CardText>
                                        <Button
                                          color="primary"
                                          className="contact-btn-1 width-162px"
                                        >
                                          {" "}
                                          <img
                                            src={Calendaricon}
                                            alt="home-icon"
                                            className="uni-icon pr-2"
                                          />{" "}
                                          request meeting
                                        </Button>
                                      </CardText>
                                    </CardBody>
                                  </Card>
                                </div>
                              </div>
                            ) : null
                          )}
                      </div>
                    ))}
                  </div> */}
                  <div
                    className="tab-pane background-white mb-5"
                    id="Review"
                    role="tabpanel"
                  >
                    {/*******Review section*********/}
                    <div className="col-md-12 review-section-pp" id="Reviews">
                      <a
                        className="col-md-12 backarrow mt-3 pl-md-5 pt-3"
                        href="#/institutelist"
                      >
                        <span className="pr-1">
                          {" "}
                          <img
                            src="/static/media/back_arrow.432612cd.svg"
                            alt=""
                          />
                        </span>{" "}
                        Back{" "}
                      </a>
                      <h2 className="col-md-12 review-title about-title mt-4 mb-3 pl-md-5">
                        {" "}
                        REVIEWS{" "}
                      </h2>
                      <div className="row col-12">
                        <div className="col-12 col-lg-5 pl-0 pl-sm-2 pl-md-4 pl-lg-5 ">
                          <div className="">
                            <div className="font-weight-bold">
                              {overall_review.toFixed() == "NaN"
                                ? 0
                                : overall_review.toFixed(1)}{" "}
                              <span className="ver-text-bottom">
                                {overall_review.toFixed() == 5 ? (
                                  <img src={ratingfive} alt="" />
                                ) : overall_review.toFixed() == 4 ? (
                                  <img src={rating} alt="" />
                                ) : overall_review.toFixed() == 3 ? (
                                  <img src={ratingthree} alt="" />
                                ) : overall_review.toFixed() == 2 ? (
                                  <img src={ratingtwo} alt="" />
                                ) : (
                                  <img src={ratingone} alt="" />
                                )}
                              </span>{" "}
                              {overall_review.toFixed(2) == "NaN"
                                ? 0
                                : overall_review.toFixed(1)}{" "}
                              of 5.0 /
                              {overall_review.toFixed() == 5 ? (
                                <span className="font-weight-bold">
                                  {" "}
                                  Excellent{" "}
                                </span>
                              ) : overall_review.toFixed() == 4 ? (
                                <span className="font-weight-bold">
                                  {" "}
                                  Very good{" "}
                                </span>
                              ) : overall_review.toFixed() == 3 ? (
                                <span className="font-weight-bold">
                                  {" "}
                                  Average{" "}
                                </span>
                              ) : overall_review.toFixed() == 2 ? (
                                <span className="font-weight-bold"> Poor </span>
                              ) : (
                                <span className="font-weight-bold">
                                  Terrible
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="row mt-4">
                            <span className="col-12 col-sm-4">5 Excellent</span>{" "}
                            <span className=" col-12 col-sm-7">
                              <Progress
                                color="warning"
                                value={this.state.star_percentage.totalfivestar}
                              />
                            </span>{" "}
                            <span className="col-1">
                              {this.state.star_percentage.totalfivestar}%
                            </span>
                          </div>
                          <div className="row mt-1">
                            <span className="col-12 col-sm-4">4 Very good</span>{" "}
                            <span className="col-12 col-sm-7">
                              <Progress
                                color="warning"
                                value={this.state.star_percentage.totalfourstar}
                              />
                            </span>{" "}
                            <span className="col-1">
                              {this.state.star_percentage.totalfourstar}%
                            </span>
                          </div>
                          <div className="row mt-1">
                            <span className="col-12 col-sm-4">3 Average</span>{" "}
                            <span className="col-12 col-sm-7">
                              <Progress
                                color="warning"
                                value={
                                  this.state.star_percentage.totalthreestar
                                }
                              />
                            </span>{" "}
                            <span className="col-1">
                              {this.state.star_percentage.totalthreestar}%
                            </span>
                          </div>
                          <div className="row mt-1">
                            <span className="col-12 col-sm-4">2 Poor</span>{" "}
                            <span className="col-12 col-sm-7">
                              <Progress
                                color="warning"
                                value={
                                  this.state.star_percentage.totalsecondstar
                                }
                              />
                            </span>{" "}
                            <span className="col-1">
                              {this.state.star_percentage.totalsecondstar}%
                            </span>
                          </div>
                          <div className="row mt-1">
                            <span className="col-12 col-sm-4">Terrible</span>{" "}
                            <span className="col-12 col-sm-7">
                              <Progress
                                color="warning"
                                value={this.state.star_percentage.totalonestar}
                              />
                            </span>{" "}
                            <span className="col-1">
                              {this.state.star_percentage.totalonestar}%
                            </span>
                          </div>
                        </div>

                        <div className="col-10 col-sm-4 col-lg-2 py-5 mx-5">
                          <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                            onChange={this.handleOnchange}
                          >
                            <option value="0">All star</option>
                            <option value="5">Excellent</option>
                            <option value="4">Very good</option>
                            <option value="3">Average</option>
                            <option value="2">Poor</option>
                            <option value="1">Terrible</option>
                          </Input>

                          <a
                            className="nav-link btn font-10 weight-600 btn-primary inti-btn active mt-3 black-outline box-shadow"
                            onClick={this.LeaveReview()}
                          >
                            LEAVE A REVIEW{" "}
                          </a>
                        </div>
                      </div>
                      <div class="pref-part col-md-12 ">
                        <h3 className="about-title mt-4 mb-3 pl-md-5">
                          {" "}
                          Reviews ({this.state.items.length})
                        </h3>
                      </div>
                    </div>

                    <div className="col-md-11 mx-0 mx-md-5 mb-5 review-section-pp">
                      {this.state.items.map((item, index) => (
                        <div className="col-md-12 col-12">
                          <Media>
                            <Media left>
                              <img
                                src={
                                  item.studentprofile === null
                                    ? formee_logo
                                    : imgpath + item.studentprofile
                                }
                                className="pref-img pt-0"
                              />
                            </Media>
                            <Media body className="pt-3 pl-2">
                              <Media className="row">
                                <div className="col-12 col-md-10">
                                  <div className="col-12">
                                    <span className="">
                                      {" "}
                                      {item.studentname}{" "}
                                    </span>
                                    {item.no_of_ratings == 5 ? (
                                      <span className="font-weight-bold">
                                        {" "}
                                        Excellent{" "}
                                      </span>
                                    ) : item.no_of_ratings == 4 ? (
                                      <span className="font-weight-bold">
                                        {" "}
                                        Very good{" "}
                                      </span>
                                    ) : item.no_of_ratings == 3 ? (
                                      <span className="font-weight-bold">
                                        {" "}
                                        Average{" "}
                                      </span>
                                    ) : item.no_of_ratings == 2 ? (
                                      <span className="font-weight-bold">
                                        {" "}
                                        Poor{" "}
                                      </span>
                                    ) : (
                                      <span className="font-weight-bold">
                                        {" "}
                                        Terrible{" "}
                                      </span>
                                    )}
                                    <span className="ver-text-bottom">
                                      {item.no_of_ratings == 5 ? (
                                        <img src={ratingfive} alt="" />
                                      ) : item.no_of_ratings == 4 ? (
                                        <img src={rating} alt="" />
                                      ) : item.no_of_ratings == 3 ? (
                                        <img src={ratingthree} alt="" />
                                      ) : item.no_of_ratings == 2 ? (
                                        <img src={ratingtwo} alt="" />
                                      ) : (
                                        <img src={ratingone} alt="" />
                                      )}
                                    </span>{" "}
                                  </div>

                                  <div className="col-12 font-weight-italics mt-2">
                                    {this.state.editcomment &&
                                    item.id === this.state.currentReviewId ? (
                                      <div class="row">
                                        <div className="col-1"> </div>
                                        <div className="col-11 comment-bgcolor">
                                          <div className="col-md-12 col-12">
                                            <Media>
                                              <Media left>
                                                <img
                                                  src={
                                                    this.state.studpname !==
                                                    null
                                                      ? baseurl +
                                                        this.state.studpname
                                                      : formee_logo
                                                  }
                                                  className="pref-img pt-0"
                                                />
                                              </Media>
                                              <Media body className="pt-2 pl-2">
                                                <Media className="row"></Media>
                                                <InputGroup className="mb-3">
                                                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                                  <Input
                                                    type="text"
                                                    onChange={
                                                      this.handleCommentText
                                                    }
                                                    name="firstname"
                                                    value={
                                                      this.state.commentText
                                                    }
                                                    placeholder="edit a comment"
                                                  />
                                                  <Button
                                                    className="width-10 comment-snt-btn"
                                                    onClick={this.PostEditComment(
                                                      item,
                                                      "main"
                                                    )}
                                                  >
                                                    <img
                                                      src={commentbtn}
                                                      className="comment-btn-img"
                                                    />
                                                  </Button>
                                                </InputGroup>
                                              </Media>
                                            </Media>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      item.review_message
                                    )}{" "}
                                    {localStorage.getItem("studentid") ===
                                    String(item.student_id) ? (
                                      <React.Fragment>
                                        {" "}
                                        <img
                                          src={editicon}
                                          width="20 px"
                                          height="20 px"
                                          onClick={this.handleEditClick(item)}
                                        ></img>
                                        <img
                                          src={deleteicon}
                                          width="20 px"
                                          height="20 px"
                                          onClick={this.DeleteComment(
                                            item,
                                            "main"
                                          )}
                                        ></img>
                                      </React.Fragment>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="col-12 col-md-2">
                                  {item.datechange}
                                </div>
                              </Media>
                              <ListGroup horizontal>
                                <ListGroupItem
                                  tag="a"
                                  style={{ cursor: "pointer" }}
                                  onClick={this.PostLikeBox(item)}
                                  className="border-transparent py-0"
                                >
                                  {item.total_like === 0
                                    ? null
                                    : item.total_like}{" "}
                                  Like
                                </ListGroupItem>
                                <ListGroupItem
                                  tag="a"
                                  className="border-transparent py-0"
                                >
                                  <span
                                    className="font-12px mx-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={this.handleCommentBox(item)}
                                  >
                                    {item.comment && item.comment.length}{" "}
                                    Comment
                                  </span>
                                </ListGroupItem>
                              </ListGroup>
                            </Media>
                          </Media>
                          {item.comment && item.comment.length !== 0
                            ? item.comment.map((it) => {
                                return (
                                  <div class="row">
                                    <div className="col-1"> </div>
                                    <div className="col-11 comment-bgcolor">
                                      <div className="col-md-12 col-12">
                                        <Media>
                                          <Media left>
                                            <img
                                              src={
                                                it.sender_image !== null
                                                  ? baseurl + it.sender_image
                                                  : formee_logo
                                              }
                                              alt="comment image"
                                              className="commen-reply-img pref-img pt-0"
                                            />
                                          </Media>
                                          <Media body className="pt-3 pl-2">
                                            <Media className="row">
                                              <div className="col-12">
                                                <div className="col-12">
                                                  <span className="">
                                                    {it.sender_name}{" "}
                                                  </span>
                                                  <span className="font-weight-bold">
                                                    {this.state.editcomment &&
                                                    it.id ===
                                                      this.state
                                                        .currentReviewId ? (
                                                      <div class="row">
                                                        <div className="col-1">
                                                          {" "}
                                                        </div>
                                                        <div className="col-11 comment-bgcolor">
                                                          <div className="col-md-12 col-12">
                                                            <Media>
                                                              <Media left>
                                                                <img
                                                                  src={
                                                                    this.state
                                                                      .studpname !==
                                                                    null
                                                                      ? baseurl +
                                                                        this
                                                                          .state
                                                                          .studpname
                                                                      : formee_logo
                                                                  }
                                                                  className="pref-img pt-0"
                                                                />
                                                              </Media>
                                                              <Media
                                                                body
                                                                className="pt-2 pl-2"
                                                              >
                                                                <Media className="row"></Media>
                                                                <InputGroup className="mb-3">
                                                                  <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                                                  <Input
                                                                    type="text"
                                                                    onChange={
                                                                      this
                                                                        .handleCommentText
                                                                    }
                                                                    name="firstname"
                                                                    value={
                                                                      this.state
                                                                        .commentText
                                                                    }
                                                                    placeholder="edit a comment"
                                                                  />
                                                                  <Button
                                                                    className="width-10 comment-snt-btn"
                                                                    onClick={this.PostEditComment(
                                                                      it,
                                                                      "sub"
                                                                    )}
                                                                  >
                                                                    <img
                                                                      src={
                                                                        commentbtn
                                                                      }
                                                                      className="comment-btn-img"
                                                                    />
                                                                  </Button>
                                                                </InputGroup>
                                                              </Media>
                                                            </Media>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    ) : (
                                                      it.message
                                                    )}{" "}
                                                    {localStorage.getItem(
                                                      "studentid"
                                                    ) ===
                                                    String(it.sender_id) ? (
                                                      <React.Fragment>
                                                        {" "}
                                                        <img
                                                          src={editicon}
                                                          width="20 px"
                                                          height="20 px"
                                                          onClick={this.handleSubEditClick(
                                                            it
                                                          )}
                                                        ></img>
                                                        <img
                                                          src={deleteicon}
                                                          width="20 px"
                                                          height="20 px"
                                                          onClick={this.DeleteComment(
                                                            it,
                                                            "sub"
                                                          )}
                                                        ></img>
                                                      </React.Fragment>
                                                    ) : null}
                                                  </span>
                                                </div>
                                              </div>
                                            </Media>
                                          </Media>
                                        </Media>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : null}

                          {this.state.OpenComment &&
                          item.id === this.state.currentReviewId ? (
                            <div class="row">
                              <div className="col-1"> </div>
                              <div className="col-11 comment-bgcolor">
                                <div className="col-md-12 col-12">
                                  <Media>
                                    <Media left>
                                      <img
                                        src={
                                          this.state.studpname !== null
                                            ? baseurl + this.state.studpname
                                            : formee_logo
                                        }
                                        className="pref-img pt-0"
                                      />
                                    </Media>
                                    <Media body className="pt-2 pl-2">
                                      <Media className="row"></Media>
                                      <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                        <Input
                                          type="text"
                                          onChange={this.handleCommentText}
                                          name="firstname"
                                          placeholder="write a comment"
                                        />
                                        <Button
                                          className="width-10 comment-snt-btn"
                                          onClick={this.PostComment(item)}
                                        >
                                          <img
                                            src={commentbtn}
                                            className="comment-btn-img"
                                          />
                                        </Button>
                                      </InputGroup>
                                    </Media>
                                  </Media>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    {/*******Review section*********/}
                  </div>

                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Universityabout;
