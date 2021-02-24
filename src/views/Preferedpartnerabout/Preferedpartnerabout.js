import React, { Component } from "react";
import logo from "../../assets/img/formee_logo_dark.svg";
import formee_logo from "../../assets/img/brand/formee-logo.svg";
import Clearicon from "../../assets/img/filter-clear.png";
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
  Modal,
  ModalBody,
  FormText,
  FormFeedback,
  Input,
  Progress,
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
  NavItem,
  NavLink,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
  Media,
} from "reactstrap";
import axios from "axios";
import config from "../../config.json";

import SecondaryHeader from "./../SecondaryHeader/SecondaryHeader";
/*
import Campuses from './../Pages/Campuses/Campuses';

import Facilities from './../Facilities/Facilities';

import Entryrequirement from './../Pages/Entryrequirement/Entryrequirement';

import Universitycontact from './../Universitycontact/Universitycontact';
import Leftmenu from '../../assets/img/left-menu.jpg';
import { Addsubsection } from "../Pages/Campuses/index";

import Studentfacilities from './../Studentfacilities/Studentfacilities';
import Universityfacilities from './../Universityfacilities/Universityfacilities';
*/
import ProfileBanner from "../../assets/img/viewus_bg.jpg";
import commentbtn from "../../assets/img/blue_snt.svg";
import locateicon from "../../assets/img/university/locate-icon.svg";
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
import eyeicon from "../../assets/img/university/view_simple.svg";
import ratingfive from "../../assets/img/university/rating-five.svg";
import rating from "../../assets/img/university/rating.svg";
import ratingthree from "../../assets/img/university/rating-three.svg";
import ratingtwo from "../../assets/img/university/rating-two.svg";
import ratingone from "../../assets/img/university/rating-one.svg";
import backarrow from "../../assets/img/university/back_arrow.svg";
import Phoneicon from "../../assets/img/university/phone-icon.svg";
import Calendaricon from "../../assets/img/university/calendar-icon.svg";
import Mailicon from "../../assets/img/university/mail-high-icon.svg";

import Prefimg2 from "../../assets/img/pref-img-2.svg";
import Flagimg1 from "../../assets/img/flag-1.svg";
import Flagimg2 from "../../assets/img/flag-2.svg";
import Flagimg3 from "../../assets/img/flag-3.svg";
import Flagimg4 from "../../assets/img/flag-4.svg";
import Chartimg from "../../assets/img/chart_image2.jpg";
import Certificate from "../../assets/img/certificate.svg";
import Certificategreen from "../../assets/img/certificategreen.svg";
import partner1 from "../../assets/img/partner1.png";
import $ from "jquery";

import Flagimg_Span from "../../assets/img/university/spain-flag-round-icon-256.png";
import Flagimg_French from "../../assets/img/university/france.svg";
import Flagimg_China from "../../assets/img/university/china.svg";
import Flagimg_India from "../../assets/img/university/india.svg";
import Flagimg_Arab from "../../assets/img/university/uae.svg";
import Flagimg_Italy from "../../assets/img/university/italy.svg";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 import editicon from "../../assets/img/edit_icon.png";
import deleteicon from "../../assets/img/delete.png";

var baseurl = `${config.baseurl}`;

localStorage.setItem("terminateContract", "true");

function submitStore(contentType, data, setResponse, path) {
  axios({
    url: baseurl + `/fav_agent`,
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

class Viewus extends Component {
  constructor(props) {
    super(props);

    //this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      tot_star: 0,
      overall_star: 0,
      favcount: "0",
      studpname: "",
      no_of_5_star: 0,
      no_of_4_star: 0,
      no_of_3_star: 0,
      no_of_2_star: 0,
      no_of_1_star: 0,
      average_review: 0,
      tot_reviews: 0,
      about: [],
      facility: [],
      facilityuniversity: [],
      facilitystudent: [],
      //campusmain: [],
      agentreviews: [],
      campus: [],
      aboutsub: [],
      language: [],
      facilitysub: [],
      collapse: true,
      fadeIn: true,
      timeout: 300,
      formData: new FormData(),
      upload_photo: [],
      getstorewishlistdata: [],
      location: "",
      errors: {},
      totalstudents: 0,
      estimatedcost: 0,
      fileLength: "",
      funding: "",
      logo: "",
      banner: "",
      services_offered: [],
      agentdetails: [],
      agentabout: [],
      agentportfolio: [],
      university_partnerships: [],
      portfolio_certifications: [],
      preferred_partners_list_name: [],
      preferred_partners_list_image: [],
      preferred_partners_list_phone: [],
      preferred_partners_list_email: [],
      preferred_partners_list_acc_type: [],
      preferred_partners_count: 0,
      preferred_partners_list: {},
      items: [],
      star_percentage: [],
      otherTabSelected: true,
      relationship_status: "",
      country: [],
      listuniversityid: [],
      listuniversityname: [],
      editcomment: false,
      likecount:"",
      rank:""
    };

    this.toggleLarge = this.toggleLarge.bind(this);

    var id = localStorage.getItem("agentid");


    axios
    .get(baseurl + "/getAgentsData/" + localStorage.getItem("agent_id"))
    .then((response) => {
     console.log("**************************", response);
      this.setState({
        likecount: response.data.fav_count,
        rank: response.data.rank,
      });

      console.log("valrank", this.state.likecount);

    });

    axios.get(baseurl + "/get_country").then((response) => {
      console.log("1", response);
      this.setState({
        country: response.data,
      });
    });

    //alert(id);
    axios.get(baseurl + "/getratingscount/" + id).then((response) => {
      console.log(response.data.star[0]);

      this.setState({
        star_percentage: response.data.star[0],
      });
    });

    axios
      .get(baseurl + "/getlogowithagent/" + localStorage.getItem("agentid"))
      .then((response) => {
        let arr = [];
        response.data.logoimage.map((items) => {
          arr.push(items);
        });
        this.setState({ university_partnerships: arr });
      });
  }
  handleCommentText = (e) => {
    this.setState({ commentText: e.target.value });
  };

  handleEditCommentText = (e) => {
    this.setState({ commentText: e.target.value });
  };

  getstorewishlist = () => {
    axios
      .get(baseurl + "/get_favAgent/" + localStorage.getItem("studentid"))
      .then((response) => {
        // console.log("get response", response);
        this.setState({ getstorewishlistdata: response.data });
      });
  };

  datastorewishlist = (data) => {
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append("agent_id", data);
    this.state.formData.append("command", "Favourite");
    confirmAlert({
      title: "Confirm",
      message: "Are you sure ?. You need to Add Favourite",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            submitStore(
              "form-data",
              this.state.formData,
              (msg) => {
                if (msg.status_code == 200) {
                  toast.success(msg.message);
                  setTimeout(function () {}, 3000);
                  this.getstorewishlist();
                  window.location.reload();
                } else {
                  toast.error(msg.message);
                  setTimeout(function () {}, 3000);
                }
              },
              "student"
            ),
        },
        {
          label: "No",
          onClick: () => this.getstorewishlist(),
        },
      ],
    });
  };

  deleteagent = (data) => {
    this.state.formData.append("student_id", localStorage.getItem("studentid"));
    this.state.formData.append("agent_id", data);
    this.state.formData.append("command", "Unfavourite");
    confirmAlert({
      title: "Confirm",
      message: "Are you sure ?. You need to Remove Favourite",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            submitStore(
              "form-data",
              this.state.formData,
              (msg) => {
                if (msg.status_code == 200) {
                  toast.success(msg.message);
                  setTimeout(function () {}, 3000);
                  this.getstorewishlist();
                } else {
                  toast.error(msg.message);
                  setTimeout(function () {}, 3000);
                }
              },
              "student"
            ),
        },
        {
          label: "No",
          onClick: () => this.getstorewishlist(),
        },
      ],
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

  componentDidMount() {
    localStorage.setItem("ppAboutPageOpened", "true");
    this.filterHandler();

    axios
      .get(baseurl + "/get_generalinfo/" + localStorage.getItem("studentid"))
      .then((response) => {
        if (response.data.length > "0") {
          this.setState({
            studpname: response.data[0].filename,
          });
        }
      });

    this.getstorewishlist();

    this.getData();
    var id = localStorage.getItem("agentid");

    axios
      .get(
        baseurl +
          "/get_agentreview_access/" +
          localStorage.getItem("agentid") +
          "/" +
          localStorage.getItem("studentid")
      )
      .then((response) => {
        console.log(response);
        this.setState({
          relationship_status: response.data.message,
        });
      });

    axios.get(baseurl + "/getuniversityabout/" + id).then((response) => {
      if (response.data.length > "0") {
        //alert(response.data[0].banner_image);
        this.setState({
          logo: response.data[0].logo_image,
          banner: response.data[0].banner_image,
        });
      }
      console.log("asdj", response.data);
    });

    axios
      .get(baseurl + "/get_agent_portfolio_images/" + id)
      .then((response) => {
        this.setState({
          portfolio_certifications: response.data.portfolio_img,
        });
      });

    axios
      .get(baseurl + "/get_agentstafflandingpages/" + id)
      .then((response) => {
        //console.log(response, "checking res");
        let img = [];
        let img_count = response.data.name.length - response.data.image.length;

        if (response.data.name.length > response.data.image.length) {
          for (let i = 0; i < img_count; i++) {
            img.push({ company_logo: null, company_logo_orig: null });
          }
        }

        let pho = [];
        let pho_count = response.data.name.length - response.data.phone.length;

        if (response.data.name.length > response.data.phone.length) {
          for (let i = 0; i < pho_count; i++) {
            pho.push(null);
          }
        }

        let eml = [];
        let eml_count = response.data.name.length - response.data.email.length;

        if (response.data.name.length > response.data.email.length) {
          for (let i = 0; i < eml_count; i++) {
            eml.push(null);
          }
        }

        let acc = [];
        let acc_count =
          response.data.name.length - response.data.acc_type.length;

        if (response.data.name.length > response.data.acc_type.length) {
          for (let i = 0; i < acc_count; i++) {
            acc.push(null);
          }
        }

        this.setState({
          preferred_partners_count: response.data.count,
          preferred_partners_list_name: response.data.name,
          preferred_partners_list_phone: response.data.phone.concat(pho),
          preferred_partners_list_image: response.data.image.concat(img),
          preferred_partners_list_email: response.data.email.concat(eml),
          preferred_partners_list_acc_type: response.data.acc_type.concat(acc),
          preferred_partners_list: {
            acc_type: response.data.acc_type.concat(acc),
            name: response.data.name,
            phone: response.data.phone.concat(pho),
            image: response.data.image.concat(img),
            email: response.data.email.concat(eml),
          },
        });
      });

    axios
      .get(baseurl + "/get_agentdetails/" + localStorage.getItem("agentid"))
      .then((response) => {
        console.log(response.data);
        //alert(response.data.about[0].id);
        this.setState({
          agentdetails: response.data.agentdetails,
          agentabout: response.data.agentabout,
          agentportfolio: response.data.agentportfolio,
          favcount: response.data.fav_count,
        });

        console.log(
          "get_agentdetails",
          response.data,
          localStorage.getItem("agentid")
        );
        if (response.data.agentabout !== null) {
          this.setState({
            address:
              response.data.agentdetails.street_address +
              " , " +
              response.data.agentdetails.city +
              " , " +
              response.data.agentdetails.state +
              " , " +
              response.data.agentdetails.contact_postalcode,
          });

          let langs = [];
          let lang = String(response.data.agentabout.languages_offered).split(
            ","
          );
          lang.map((ite) => {
            langs.push(ite);
          });
          //console.log(this.state.language, "spoke");

          let services = [];
          let arr = String(response.data.agentabout.services_offered).split(
            "• "
          );
          arr.map((ite, index) => {
            if (index !== 0) {
              //this.state.agentabout.services_offered.push(ite);
              services.push(ite);
            }
          });

          // let partners = [];
          // let arr1 = String(response.data.agentabout.university_partnerships).split(",");
          // arr1.map((ite, index) => {
          // partners.push(ite);

          // });

          //  console.log(partners, "partners");
          this.setState({ language: langs, services_offered: services });
        }
      });

    $(".facility-link").click(function () {
      //id of the link which is being clicked
      $("html, body").animate(
        {
          scrollTop: $("#Facility1").offset().top - 170, //id of div to be scrolled
        },
        1000
      );
    });

    $(".campus-link").click(function () {
      //id of the link which is being clicked
      $("html, body").animate(
        {
          scrollTop: $("#Facility1").offset().top - 170, //id of div to be scrolled
        },
        1000
      );
    });

    $(".contact-link").click(function () {
      //id of the link which is being clicked
      $("html, body").animate(
        {
          scrollTop: $("#Contactus1").offset().top - 170, //id of div to be scrolled
        },
        1000
      );
    });

    $(".reviews-link").click(function () {
      //id of the link which is being clicked
      $("html, body").animate(
        {
          scrollTop: $("#Reviews").offset().top - 170, //id of div to be scrolled
        },
        1000
      );
    });
  }

  searchedValue1 = (alluniversities, allcourse, allProgram) => {
    let {
      universitylist,
      filtereduniversitylist,
      todos,
      filteredTodos,
    } = this.state;
    const coursearr = [...allcourse];

    //console.log("non modified university", alluniversities)

    // if (universitylist.length > 0) {
    // 	filtereduniversitylist = universitylist.filter(university=>{
    // 		for(let i=0; i < alluniversities.length; i++) {
    // 			return alluniversities[i].university_id == university.id
    // 		}
    // 	})
    // } else {
    filtereduniversitylist = alluniversities;
    // }

    // Fiter Courses
    // const filteredCourses = coursearr.filter(course=>{
    // 	for(let i=0; i < filtereduniversitylist.length; i++) {
    // 		if(universitylist.length > 0) return course.university_id == filtereduniversitylist[i].id
    // 		else return course.university_id == filtereduniversitylist[i].university_id
    // 	}
    // })
    const filteredCourses = [...coursearr];

    console.log(filtereduniversitylist);

    filteredTodos = allProgram;

    console.log("filtered university", filtereduniversitylist);

    console.log("filtered programs", filteredTodos);

    this.setState({ filtereduniversitylist, filteredCourses, filteredTodos });
  };

  selectedText(value) {
    //alert(value);
    this.setState({
      searchsuggestion: [],
      preferedpartner: value,
    });
  }

  validate1 = () => {
    const errors = {};

    if (this.state.preferedpartner === "" || !this.state.preferedpartner) {
      errors.preferedpartner = "Select preferred partner is required";
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validate2 = () => {
    const errors = {};
    if (this.state.searchdestination === "") {
      if (this.state.searchlocation === "" || !this.state.searchlocation) {
        errors.searchlocation = "Select Location is required";
      }
    }
    if (this.state.searchlocation === "") {
      if (
        this.state.searchdestination === "" ||
        !this.state.searchdestination
      ) {
        errors.searchdestination = "Select Destination Country  is required";
      }
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0 ? null : errors;
  };

  resetsearchFilterApi = () => {
    this.setState({
      searchlocation: "",
      searchdestination: "",
      searchrating: "",
      searchlanguage: "",
      searchradio: "",
      searchuniversity: "",
      searchagenttype: "",
      errors: "",
    });
    // this.toggleLarge();
  };

  selectedlocation = (e) => {
    console.log(e);
    if (e.key == "location") {
      axios.get(baseurl + "getcountrybaseduniv/" + e.value).then((response) => {
        this.setState({
          listuniversityid: response.data.universityid,
          listuniversityname: response.data.universityname,
        });
        console.log("list university", response);
      });
    } else {
      axios.get(baseurl + "getcountrybaseduniv/" + e.value).then((response) => {
        this.setState({
          listuniversityid: response.data.universityid,
          listuniversityname: response.data.universityname,
        });
        console.log("list university", response);
      });
    }
  };

  savesearchFilterApi = (e) => {
    e.preventDefault();
    const errors = this.validate2();
    this.setState({ errors });
    if (errors) return;

    const data = {
      student_id: localStorage.getItem("studentid"),
      location: this.state.searchlocation,
      destinationcountry: this.state.searchdestination,
      language: this.state.searchlanguage,
      universityname: this.state.searchuniversity,
      rating: this.state.searchrating,
      success_ratio: this.state.searchradio,
      agency_type: this.state.searchagenttype,
    };
    //alert(data.selectpartner);

    const post = axios
      .post(baseurl + "preferredpartner_searchsave", data)
      .then((response) => {
        if (response.status == 200) {
          toast.success("Search Saved Successfully");
        } else {
          toast.error("Somethink Went Wrong, Please try again");
        }
        // console.log(response.data);
        // this.setState({
        //   universitylist: response.data,
        //   filtereduniversitylist: response.data,
        //   currentPage1: 1,
        // });
        // this.resetsearchFilterApi();
      });
    this.setState({ errors: "" });
  };

  // searchfilter
  searchFilterApi = (e) => {
    this.setState({ showAllPreferedPartner: false });
    e.preventDefault();
    const errors = this.validate2();
    this.setState({ errors });
    if (errors) return;

    const data = {
      location: this.state.searchlocation,
      destination_location: this.state.searchdestination,
      language: this.state.searchlanguage,
      university: this.state.searchuniversity,
      searchrating: this.state.searchrating,
      searchradio: this.state.searchradio,
      searchagenttype: this.state.searchagenttype,
    };
    //alert(data.selectpartner);

    axios.post(baseurl + "/filterpreferrred", data).then((response) => {
      if (response.status == 200) {
        toast.success("Record Searched Successfully");
        this.setState({
          universitylist: response.data,
          filtereduniversitylist: response.data,
          currentPage1: 1,
        });

        // Get eligiblity searched data from PP about page
        if (localStorage.getItem("ppAboutPageOpened") === "true") {
          // Send the eligiblity searched values to institute page
          const searchedData = {
            universitylist: response.data,
            filtereduniversitylist: response.data,
            currentPage1: 1,
          };
          localStorage.setItem(
            "ppAboutPageSearchedData",
            JSON.stringify(searchedData)
          );
          localStorage.removeItem("ppAboutPageOpened");
          if (this.state.universitylist > 0) {
            toast.success("Records searched successfully");
          }
          setTimeout(() => {
            window.location.href = "/#/preferedpartnerlist";
          }, 2000);
        }

        console.log("univ list", this.state.universitylist);
        this.resetsearchFilterApi();
        this.setState({ large: false });
      } else {
        toast.error("Somethink Went Wrong, Please try again");
      }
      // toast.success(response.message);
    });
    this.setState({ errors: "", large: false });
  };

  //for institute validate and save end

  filterHandler = () => {
    this.setState({ visible: this.state.visible != true });
  };

  selectprogram = (e) => {
    this.setState({ selectprogram: 2 });
    this.setState({ searchtext: "" });
    this.setState({ searchtextprogram: "" });
  };

  closeall() {
    window.location.reload();
  }

  closeall1() {
    window.location.reload();
  }

  getData = () => {
    var id = localStorage.getItem("agentid");

    axios
      .get(baseurl + "/get_agent_student_reviews_byagentid/" + id)
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

  storepreferdata = (storedata) => {
    // console.log('store detail', storedata);
    localStorage.removeItem("agentstore");
    const data = {
      id: storedata.data.agent_id,
      email: storedata.data.company_email,
    };
    localStorage.setItem("agentstore", JSON.stringify(data));
    window.location = "/#/composemail";
  };

  handleCertificate = (param) => (e) => {
    window.open(`${config.baseurl}` + "/Portfolioimages/" + param);
  };

  PostLikeBox = (params) => (e) => {
    let fd = new FormData();
    fd.append("review_id", params.id);
    fd.append("agent_id", params.agent_id);
    fd.append("sender_id", localStorage.getItem("universityid"));
    fd.append("sender_type", "Agent");
    //fd.append("message", this.state.commentText);
    fd.append("like_counts", 1);

    axios.post(baseurl + "/savereviewlike", fd).then(this.getData());
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

  PostComment = (params) => (e) => {
    let fd = new FormData();
    fd.append("review_id", params.id);
    fd.append("agent_id", params.agent_id);
    fd.append("sender_id", localStorage.getItem("studentid"));
    fd.append("sender_type", "Student");
    fd.append("message", this.state.commentText);

    axios.post(baseurl + "/savereviewcomment", fd).then(
      this.getData(),
      this.setState({
        commentText: "",
        OpenComment: false,
        currentReviewId: 0,
      })
    );
  };

  PostEditComment = (params, typ) => (e) => {
    let fd = new FormData();
    fd.append("id", params.id);
    fd.append("category", typ);
    fd.append("message", this.state.commentText);

    axios.post(baseurl + "/editreviews_studentagent", fd).then(
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
      .post(baseurl + "/deletereviews_studentagent", fd)
      .then(this.getData());
  };

  handleClickReview = (e) => {
    this.setState({ otherTabSelected: false });
    $(".about-section").removeClass("tab-selected").addClass("d-none");
    $(".review-section").removeClass("d-none").addClass("tab-selected");
  };

  handleClickNotReview = (e) => {
    if (!this.state.otherTabSelected) {
      $(".review-section").removeClass("tab-selected").addClass("d-none");
      $(".about-section").removeClass("d-none").addClass("tab-selected");
      this.setState({ otherTabSelected: true });
      $(e.target).trigger("click");
    }
  };

  LeaveReview = () => (e) => {
    if (this.state.relationship_status === "found") {
      window.location.href = "/#/LeaveReview";
    } else {
      toast.warning("You are not authorized to give review.");
    }
  };

  toggleLarge() {
    this.setState({
      large: !this.state.large,
      todos: [],
      filteredTodos: [],
    });
  }

  render() {
    const { errors } = this.state;
    //alert();
    const imgpath = `${config.baseurl}`;
    let overall_star = 0;

    this.state.items.map((item) => {
      overall_star = overall_star + item.no_of_ratings;
    });

    const overall_review = overall_star / this.state.items.length;
    console.log("this.state.agentdetails", this.state.agentdetails);
    return (
      <div className="animated fadeIn gray-bg-300 foe-viewus">
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
              <div className="Education">
                <div className="row mx-0">
                  <div
                    className="filter-clear d-flex justify-content-end w-100"
                    onClick={this.toggleLarge}
                  >
                    <a style={{ color: "white", cursor: "pointer" }}>
                      Hide Filter&nbsp;&nbsp;&nbsp;
                      <img src={Clearicon} alt="" className="uni-icon" />
                    </a>
                  </div>
                  <div className="filter-group-box">
                    <div className="filter-group">
                      <div className="col-md-12">
                        <h3>
                          <b>More Search Filters</b>
                        </h3>
                        <FormGroup>
                          <Label className="uni-label">Location</Label>
                          <Input
                            type="select"
                            id="location"
                            value={this.state.searchlocation}
                            onChange={(e) => (
                              this.setState({ searchlocation: e.target.value }),
                              this.selectedlocation({
                                value: e.target.value,
                                key: "location",
                              })
                            )}
                            className=""
                          >
                            <option value="">Select</option>
                            {this.state.country.map((country) => (
                              <option value={country.id}>
                                {country.country_name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: "red" }}>
                          {this.state.errors.searchlocation}
                        </h6>
                      </div>
                      <div className="col-md-12">
                        <FormGroup>
                          <Label className="uni-label">
                            Destination Country
                          </Label>
                          <Input
                            type="select"
                            id="country"
                            value={this.state.searchdestination}
                            onChange={(e) => (
                              this.setState({
                                searchdestination: e.target.value,
                              }),
                              this.selectedlocation({
                                value: e.target.value,
                                key: "dcountry",
                              })
                            )}
                            className=""
                          >
                            <option value="">Select</option>
                            {this.state.country.map((country) => (
                              <option value={country.id}>
                                {country.country_name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                        <h6 style={{ color: "red" }}>
                          {this.state.errors.searchdestination}
                        </h6>
                      </div>

                      <div className="col-md-12">
                        <FormGroup>
                          <Label className="uni-label">Rating</Label>
                          <Input
                            type="select"
                            id="rating"
                            value={this.state.searchrating}
                            onChange={(e) =>
                              this.setState({ searchrating: e.target.value })
                            }
                            className=""
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-md-12">
                        <FormGroup>
                          <Label className="uni-label">Language</Label>
                          <Input
                            type="select"
                            id="language"
                            value={this.state.searchlanguage}
                            onChange={(e) =>
                              this.setState({ searchlanguage: e.target.value })
                            }
                            className=""
                          >
                            <option value="">Select</option>
                            <option value="English">English</option>
                            <option value="Epanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="Italian">Italian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Arab">Arab</option>
                            <option value="Hindi">Hindi</option>
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-md-12">
                        <FormGroup>
                          <Label className="uni-label">Success Radio</Label>
                          <Input
                            type="select"
                            id="radio"
                            value={this.state.searchradio}
                            onChange={(e) =>
                              this.setState({ searchradio: e.target.value })
                            }
                            className=""
                          >
                            <option value="">Select</option>
                            <option value="1">1</option>
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-md-12">
                        <FormGroup>
                          <Label className="uni-label">University</Label>
                          <Input
                            type="select"
                            id="university"
                            value={this.state.searchuniversity}
                            onChange={(e) =>
                              this.setState({
                                searchuniversity: e.target.value,
                              })
                            }
                            className=""
                          >
                            <option value="">Select</option>
                            {this.state.listuniversityname.map((e) => (
                              <option value={e}>{e}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </div>

                      <div className="col-md-12">
                        <FormGroup>
                          <Label className="uni-label">Agent Type</Label>
                          <Input
                            type="select"
                            id="searchagenttype"
                            value={this.state.searchagenttype}
                            onChange={(e) =>
                              this.setState({ searchagenttype: e.target.value })
                            }
                            className=""
                          >
                            <option value="">Select</option>
                            <option value="0">Public</option>
                            <option value="1">Private</option>
                          </Input>
                        </FormGroup>
                      </div>
                    </div>

                    <div className="col-12 d-flex filter-bottom flex-column">
                      {/* <h2>Do You Want To Save This Search?<img style={{ cursor: "default", marginBottom: "5px" }} src={Infoicon} alt="home-icon" className="uni-icon pr-2" /></h2> */}
                      <div className="float-right">
                        {/* <Button color="primary" className="score-save beforesave" type="submit" onClick={this.savesearchFilterApi.bind(this)} >SAVE</Button> */}
                        <Button
                          color="primary"
                          className="score-save beforesave reset"
                          type="submit"
                          onClick={() => this.resetsearchFilterApi()}
                        >
                          Reset All
                        </Button>
                        <Button
                          color="primary"
                          className="score-save beforesave reset"
                          type="submit"
                          onClick={this.searchFilterApi.bind(this)}
                          style={{ marginLeft: "40px" }}
                        >
                          Search
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </ModalBody>
        </Modal>

        <div className="container-fluid px-0">
          <div className="top-section">
            <div className="img-block">
              {" "}
              <img src={ProfileBanner} alt="" />
            </div>
            <div className="agent-edit-box">
              <a href="#" className="pl-lg-5 pt-lg-4">
                &lt; Return to Edit
              </a>
            </div>
            <div className="container">
              <div className="content-block partner-short-info row mx-0 col-md-6">
                <div className="col-md-4 pt-4">
                  {" "}
                  <img
                    src={
                      imgpath + "/Agent/" + this.state.agentdetails.company_logo
                    }
                    alt=""
                  />{" "}
                </div>
                <div className="col-md-8 cont-rgt my-4">
                  <h5 className="cont-rgt-head">
                    {this.state.about != null &&
                    this.state.about.institute_name != "" ? (
                      <span>{this.state.about.institute_name}</span>
                    ) : (
                      <span></span>
                    )}{" "}
                    <span className="heart-icon">
                      {this.getIndex(
                        this.state.agentdetails.agent_id,
                        this.state.getstorewishlistdata,
                        "agent_id"
                      ) == this.state.agentdetails.agent_id ? (
                        <img
                          src={heart2}
                          alt=""
                          onClick={() =>
                            this.deleteagent(this.state.agentdetails.agent_id)
                          }
                        />
                      ) : (
                        <img
                          src={heart}
                          alt=""
                          onClick={() =>
                            this.datastorewishlist(
                              this.state.agentdetails.agent_id
                            )
                          }
                        />
                      )}
                    </span>
                  </h5>
                  <div className="mt-2 cont-rgt-contry">
                    <span className="pr-1">
                      <h4>{this.state.agentdetails.company_name} </h4>
                    </span>{" "}
                    <span className="pr-1">
                      {" "}
                      <img src={contlogo} alt="" className="pp-fix-margin" />
                    </span>
                    {this.state.agentdetails.country_name != null &&
                    this.state.agentdetails.country_name != "" ? (
                      <span>{this.state.agentdetails.country_name}</span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div className="mt-2 cont-rgt-grap">
                    {" "}
                    <span className="pr-1">
                      {" "}
                      <img src={bargraph} alt="" />
                    </span>
                    The World Rankings : {this.state.rank}{" "}
                  </div>
                  <div className="mt-2 row px-3 mx-0">
                    <div className="icon-align row">
                      <div className="pr-1">
                        {" "}
                        <img src={eyeicon} alt="" />
                      </div>
                      <div>
                        0<br />
                        Views
                      </div>
                    </div>
                    <div className="icon-align row pl-3">
                      <div className="pr-1">
                        {" "}
                        <img src={favourites} alt="" />
                      </div>
                      <div>
                        {this.state.likecount}
                        <br />
                        Favourites
                      </div>
                    </div>
                    <div className="icon-align pl-5">
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
                <div className="border-bottom-line">
                  <div className="container">
                    {/* <ul className="nav nav-tabs filter-btn" id="" role="">
                     <li className="nav-item"> 
                     <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#About1"
                        role="tab"
                      > 
                         <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        &nbsp;&nbsp;&nbsp; FILTER{" "} 
                      </a> 
                    </li> 
                  </ul> */}

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
                          className="nav-link filter filter-btn-fix font-10pt pad-2rem"
                          data-toggle="tab"
                          role="tab"
                        >
                          <i class="fa fa-chevron-left" aria-hidden="true"></i>
                          &nbsp;&nbsp;FILTER
                        </a>
                      </li>
                    </ul>

                    <ul
                      className="nav nav-tabs partner-tab"
                      id="ProfileTab"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#"
                          role="tab"
                          onClick={this.handleClickNotReview}
                        >
                          {" "}
                          About{" "}
                        </a>
                      </li>
                      {/* <li className="nav-item">
                  <a className="nav-link facility-link" data-toggle="tab" href="#Facility1" role="tab" > Facilities</a>
                </li> */}
                      <li className="nav-item">
                        <a
                          className="nav-link campus-link"
                          data-toggle="tab"
                          href="#"
                          role="tab"
                          onClick={this.handleClickNotReview}
                        >
                          Portfolio{" "}
                        </a>
                      </li>
                      {/*<li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#Entry1" role="tab" > Entry Requirements</a>
                </li>*/}
                      <li className="nav-item">
                        <a
                          className="nav-link contact-link"
                          data-toggle="tab"
                          href="#"
                          role="tab"
                          onClick={this.handleClickNotReview}
                        >
                          {" "}
                          Preferred Partners{" "}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link reviews-link"
                          data-toggle="tab"
                          href="#"
                          role="tab"
                          onClick={this.handleClickReview}
                        >
                          {" "}
                          Reviews{" "}
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link contact-link"
                          data-toggle="tab"
                          href="#"
                          role="tab"
                        >
                          {" "}
                          Contact Us{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="container mx-auto tab-content foe-view-content">
                  <div className="tab-pane active" id="About1" role="tabpanel">
                    <div className="col-md-12 about-section mx-0 px-0 row tab-selected">
                      {/*<a
                        className="col-6 backarrow mt-3 pl-md-5 pt-3"
                        href="/#/preferedpartnerlist"
                      >
                        <span className="pr-1">
                          <img src={backarrow} alt="" />
                        </span>
                        Back
                      </a>*/}

                      <div className="agent-about w-100">
                        <div className="row  px-4 pt-5">
                          <h2 className="col-md-6 review-title about-title mt-4 mb-4 pl-md-5">
                            {" "}
                            ABOUT US{" "}
                          </h2>
                          <div className="col-6 text-right pr-4 mb-4">
                            <button
                              className="btn mt-4 px-4  btn-light green-border mr-5"
                              onClick={() =>
                                this.storepreferdata({
                                  data: this.state.agentdetails,
                                })
                              }
                            >
                              Send Message
                            </button>
                          </div>
                          <div className="col-md-7 col-sm-7 col-lg-7 col-12 about-left-block pl-md-5">
                            <div className="col-md-12 px-0">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <th width="40%" scope="col">
                                      LOCATION
                                    </th>
                                    <td width="60%">
                                      {this.state.agentabout !== null &&
                                      this.state.agentabout.location != null &&
                                      this.state.agentabout.location != "" ? (
                                        <span>
                                          {this.state.agentabout.location}
                                        </span>
                                      ) : (
                                        <span></span>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            {this.state.preferred_partners_count !== 0 ? (
                              <div className="pref-part">
                                <h3 className="my-3">
                                  {this.state.preferred_partners_count}{" "}
                                  preferred partners
                                </h3>
                                <div className="pref-part-list">
                                  <ListGroup horizontal>
                                    {this.state.preferred_partners_list_image.map(
                                      (ite) => {
                                        return (
                                          <ListGroupItem tag="a">
                                            {ite.company_logo !== null &&
                                            ite.company_logo !== "" ? (
                                              <img
                                                src={
                                                  imgpath +
                                                  "/Agent/" +
                                                  ite.company_logo
                                                }
                                                alt="preferred partner"
                                                className="parter-img"
                                              />
                                            ) : (
                                              <img
                                                src={logo}
                                                alt="preferred partner"
                                                className="parter-img"
                                              />
                                            )}
                                          </ListGroupItem>
                                        );
                                      }
                                    )}
                                  </ListGroup>
                                  <ListGroup horizontal>
                                    {this.state.preferred_partners_list_name.map(
                                      (name) => {
                                        return (
                                          <ListGroupItem tag="a">
                                            <p className="partner-name">
                                              {name}
                                            </p>
                                          </ListGroupItem>
                                        );
                                      }
                                    )}
                                  </ListGroup>
                                </div>
                              </div>
                            ) : null}

                            <div className="pref-part">
                              <h3 className="my-3">Languages Spoken</h3>
                              <div className="pref-part-list">
                                <ListGroup horizontal>
                                  {this.state.language.map((language) => {
                                    return (
                                      <ListGroupItem
                                        tag="a"
                                        className="lang-flag"
                                      >
                                        {language === "English" ? (
                                          <img
                                            src={Flagimg1}
                                            alt="preferred partner"
                                            className="parter-img"
                                          />
                                        ) : language === "Spanish" ? (
                                          <img
                                            src={Flagimg_Span}
                                            alt="preferred partner"
                                            className="parter-img"
                                          />
                                        ) : language === "Arab" ? (
                                          <img
                                            src={Flagimg_Arab}
                                            alt="preferred partner"
                                            className="parter-img"
                                          />
                                        ) : language === "Hindi" ? (
                                          <img
                                            src={Flagimg_India}
                                            alt="preferred partner"
                                            className="parter-img"
                                          />
                                        ) : language === "Chinese" ? (
                                          <img
                                            src={Flagimg_China}
                                            alt="preferred partner"
                                            className="parter-img"
                                          />
                                        ) : language === "Italian" ? (
                                          <img
                                            src={Flagimg_Italy}
                                            alt="preferred partner"
                                            className="parter-img"
                                          />
                                        ) : (
                                          <img
                                            src={Flagimg_French}
                                            alt="preferred partner"
                                            className="parter-img"
                                          />
                                        )}
                                        <p className="partner-name mx-auto">
                                          {language}
                                        </p>
                                      </ListGroupItem>
                                    );
                                  })}
                                </ListGroup>
                              </div>
                            </div>

                            <div className="col-md-12 left-cont-heg agent-content px-0">
                              {this.state.agentabout != null &&
                              this.state.agentabout.description != "" ? (
                                <p class="subdesc">
                                  {this.state.agentabout.description}
                                </p>
                              ) : (
                                <p></p>
                              )}
                            </div>

                            <div className="pref-part mb-3 service-part">
                              <h3 className="my-3">Services Offered</h3>

                              {this.state.services_offered !== null &&
                              this.state.services_offered !== "null"
                                ? this.state.services_offered.map((item) => {
                                    return (
                                      <div className="pref-part-list service-list-space">
                                        <ListGroup>
                                          <ListGroupItem>{item}</ListGroupItem>
                                        </ListGroup>
                                      </div>
                                    );
                                  })
                                : null}
                            </div>
                          </div>

                          <div className="col-md-5 col-sm-5 col-lg-5 col-12 about-left-block pl-md-5 mt-5">
                            {/*left-content*/}
                            <div className="col-md-12 col-sm-12 col-lg-12 mt-5">
                              <div className="agent-st-left pref-part">
                                <h3>student Statistics</h3>
                                <div className="chart-inner">
                                  <img
                                    src={Chartimg}
                                    alt="dummy image"
                                    className="chat-img"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="pref-part pt-3">
                              <h3 className="my-3 col-12">
                                University Partnership
                              </h3>
                              <div className="pref-part-list">
                                <ListGroup
                                  horizontal
                                  className="flex-wrap col-12 univ-partner-logo"
                                >
                                  {this.state.university_partnerships.map(
                                    (items) => {
                                      return (
                                        <ListGroupItem
                                          className="col-4"
                                          tag="a"
                                        >
                                          <img
                                            src={
                                              items.logo_image !== ""
                                                ? imgpath + items.logo_image
                                                : logo
                                            }
                                            alt="preferred partner"
                                            className="parter-img mb-2"
                                          />
                                          {items.univname}
                                        </ListGroupItem>
                                      );
                                    }
                                  )}
                                </ListGroup>
                              </div>
                            </div>

                            <div className="col-md-12 col-sm-12 col-lg-12 mb-4">
                              <div className="agent-st-left pt-3 pref-part">
                                <h3>Contact Details</h3>
                                <div className="chart-inner">
                                  <ListGroup horizontal className="flex-wrap">
                                    <ListGroupItem tag="a">
                                      <img
                                        src={Phoneicon}
                                        className="ag-icon"
                                      />
                                      &nbsp;
                                      {
                                        this.state.agentdetails.contact_phone
                                      }{" "}
                                    </ListGroupItem>
                                    <ListGroupItem tag="a">
                                      <img src={Mailicon} className="ag-icon" />
                                      &nbsp;
                                      {this.state.agentdetails.company_email}
                                    </ListGroupItem>
                                    <ListGroupItem
                                      tag="a"
                                      className="mt-0 pt-0"
                                    >
                                      <img
                                        src={locateicon}
                                        className="ag-icon"
                                      />
                                      &nbsp;
                                      {
                                        this.state.agentdetails.company_name
                                      }{" "}
                                      <br></br>
                                      <span className="mx-3">
                                        {this.state.address}
                                      </span>
                                    </ListGroupItem>
                                  </ListGroup>
                                </div>
                              </div>
                            </div>

                            {/*end-left-content*/}
                          </div>
                        </div>
                      </div>
                      {/* about subsection */}
                      {this.state.aboutsub.map((aboutsub) => (
                        <div className="col-md-12 about-stud-hub px-0 row mx-0">
                          <div className="col-md-6 px-0 stud-hub-left pt-5">
                            {aboutsub.layout == "right" ? (
                              <p class="subdesc pl-md-5 pt-3">
                                <h2>{aboutsub.heading}</h2>
                                {aboutsub.description}
                              </p>
                            ) : (
                              <img
                                src={imgpath + aboutsub.filename}
                                width="555"
                                height="535"
                                alt=""
                              />
                            )}
                          </div>

                          <div className="col-md-6 stud-hub-right0 px-0">
                            {aboutsub.layout == "right" ? (
                              <img
                                src={imgpath + aboutsub.filename}
                                width="555"
                                height="535"
                                alt=""
                              />
                            ) : (
                              <p class="subdesc pl-md-5 pt-5">
                                <h2>{aboutsub.heading}</h2>
                                {aboutsub.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                      {/* about subsection */}

                      <div
                        id="Facility1"
                        className="col-md-12 about-facility px-0"
                      >
                        <div className="col-md-8 mx-auto text-center py-4">
                          <h2 className="mb-2 review-title about-title">
                            portfolio
                          </h2>
                          {this.state.agentportfolio !== null &&
                          this.state.agentportfolio.description != null &&
                          this.state.agentportfolio.description != "" ? (
                            <p class="subdesc">
                              {this.state.agentportfolio.description}
                            </p>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>
                      {/* <div className="col-md-12 about-uni-section mt-5 row mx-0">
						<div className="col-md-6 about-uni-left px-0">
							<h5>Our Facilities</h5>
							<h2>University Facilities</h2>
							{( (this.state.facilityuniversity != null && this.state.facilityuniversity.description != '') ? (<p class="subdesc">{this.state.facilityuniversity.description}</p>):(<p></p>) )}
							
						</div>
						 <div className="col-md-6 about-uni-right px-0 text-right">

								 {( (this.state.facilityuniversity != null && this.state.facilityuniversity.filename != '') ? (<img src={imgpath+this.state.facilityuniversity.filename}  width="415" height="394" alt="" />):(<p></p>) )}
								 
							
						 </div>
					 </div>
					 <div className="col-md-12 about-stud-left mt-5 row mx-0">
						<div className="col-md-6 px-0">
							<h5>Our Facilities</h5>
							<h2>Student Facilities</h2>
							{( (this.state.facilitystudent != null && this.state.facilitystudent.description != '') ? (<p class="subdesc">{this.state.facilitystudent.description}</p>):(<p></p>) )}
							

						</div>
						 <div className="col-md-6 about-stud-right px-0 text-right">
						 {( (this.state.facilitystudent != null && this.state.facilitystudent.filename != '') ? (<img src={imgpath+this.state.facilitystudent.filename}  width="415" height="394" alt="" />):(<p></p>) )}

             
						 </div>
					 </div>   */}

                      {/* facility subsection */}
                      {/* {this.state.facilitysub.map(facilitysub => (

						
					<div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0 bg-fo">

					<div className="col-md-6 px-0 stud-hub-left">
					
						
						{(facilitysub.layout == 'right' ? (<p class="subdesc h-100 pl-md-5 pt-3 pr-3"><div className="w-100 br-bottom"><h2>{facilitysub.heading}</h2>{facilitysub.description}</div></p>):(<img src={imgpath+facilitysub.filename} width="415" height="394" alt="" />) )}
					
					</div>

					<div className="col-md-6 stud-hub-right0">
					
						{(facilitysub.layout == 'right' ? (<img src={imgpath+facilitysub.filename} width="555" height="527" alt="" />):(<p class="subdesc h-100 pt-3"><div className="w-100 br-bottom"><h2>{facilitysub.heading}</h2>{facilitysub.description} </div></p>) )}
				   
					</div>

						
					</div>
					) ) } */}
                      {/* facility subsection */}

                      <div className="agent-static w-100 d-flex align-items-center justify-content-center">
                        <div className="col-md-9 col-sm-10 col-lg-9 col-xl-9 mx-auto">
                          <div className="row">
                            <div className="col-md-12 col-sm-12 col-lg-12">
                              <div className="agent-st-right">
                                <h3 className="text-center">Certifications</h3>
                                <div className="agent-cer-box">
                                  <ButtonGroup
                                    horizontal
                                    className="mx-auto flex-wrap"
                                  >
                                    {this.state.portfolio_certifications.map(
                                      (itms) => {
                                        return (
                                          <Button
                                            className="mx-3 green-border col-5 mx-1"
                                            onClick={this.handleCertificate(
                                              itms.upload_file
                                            )}
                                          >
                                            <img
                                              src={Certificategreen}
                                              alt="certificate-icon"
                                              className="cer-icon"
                                            />
                                            &nbsp;{itms.file_name}
                                          </Button>
                                        );
                                      }
                                    )}
                                  </ButtonGroup>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*  <div
                        className="col-md-12 about-stud-hub mt-5 px-0 row mx-0 pl-md-5 pr-md-5 p-3 agent-campus"
                        id="Campus1"
                      >
                        <h1 className="col-md-12 about-title mt-4 mb-3 campustitle ">
                          {" "}
                          Preferred Partners{" "}
                        </h1>
                        <h4 className="ref-h4 col-12">
                          Find a preferred partner
                        </h4>
                        {/*<div className="col-md-6 px-0 stud-hub-left">
						{( (this.state.campusmain != null && this.state.campusmain.filename != '') ? (<img src={imgpath+this.state.campusmain.filename} width="555" height="527" alt="" />):(<p></p>) )}	
						</div>

						<div className="col-md-6 stud-hub-right0">
						{( (this.state.campusmain != null && this.state.campusmain.description != '') ? (<p>{this.state.campusmain.description}</p>):(<p></p>) )}
						</div>*/}

                      {/* {this.state.campus.map(campus => (

							<div className="col-md-12 about-stud-hub px-0 row mx-0 uni-campus-red-bx" key={campus.id}>

								<div className="col-md-6 px-0 stud-hub-left">
								{(campus.layout == 'right' ? (<p class="subdesc pl-md-5 pt-3">{campus.description}</p>):(<img src={imgpath+campus.filename} width="555" height="527" alt="" />) )}
								</div>

								<div className="col-md-6 stud-hub-right0">
								{(campus.layout == 'right' ? (<img src={imgpath+campus.filename} width="555" height="527" alt="" />):(<p class="subdesc pl-md-5 pt-5">{campus.description}</p>) )}
								</div>

							</div>
						) ) }
             }

                        <div className="pref-part-box w-100">
                          <div className="row col-md-9">
                            <div className="col-md-8 pr-0">
                              <Label className="uni-label" for="exampleSelect">
                                I'm seeking a preferred partner around
                              </Label>
                              <Input type="text" />
                            </div>
                            <div className="col-md-4 pl-0">
                              <Label className="uni-label" for="exampleSelect">
                                preferably within
                              </Label>
                              <Input
                                type="select"
                                name="select"
                                id="exampleSelect"
                              >
                                <option>1 km</option>
                                <option>2 km</option>
                                <option>3 km</option>
                                <option>4 km</option>
                                <option>5 km</option>
                              </Input>
                            </div>
                          </div>
                        </div>
                        <div className="pref-part-box-2 w-100 my-2">
                          <div className="row col-md-9">
                            <div className="col-md-6 ">
                              <Label className="uni-label" for="exampleSelect">
                                First name (optional)
                              </Label>
                              <Input type="text" />
                            </div>
                            <div className="col-md-6">
                              <Label className="uni-label" for="exampleSelect">
                                last name (optional)
                              </Label>
                              <Input type="text" />
                            </div>
                          </div>
                        </div>
                      </div>  */}

                      {/* Campus sub section */}

                      {/* Campus sub section */}

                      {/*
          <div className="col-md-12 about-stud-hub mt-5 px-0 row mx-0">
           <h1 className="col-md-12 about-title mt-4 mb-3"> CONTACT US </h1>
           <span>General enquiries and campus contacts</span>

            {this.state.campussub.map(campussub => (
            <div class="col-md-12">
              <div className="col-md-6">
                <p>{campussub.heading}</p>
                <p>{campussub.sub_heading}</p>
              </div>
            </div>
            ) ) }
					 </div>
						*/}
                      {/* contact us */}
                      <div
                        id="Contactus1"
                        className="uni-contact-box w-100 agent-contact px-5 pt-0 pb-0 boder-transparent"
                      >
                        <h2 className="col-md-12 review-title about-title mt-4 mb-4 campustitle ">
                          {" "}
                          OUR PREFERRED PARTNERS{" "}
                        </h2>
                        <div className="row my-0 col-md-12">
                          <div className="agent-pr-list w-100">
                            <div className="pref-part">
                              <div className="row">
                                {this.preferred_partners_count !== 0
                                  ? this.state.preferred_partners_list_name.map(
                                      (name, index) => {
                                        return (
                                          <div className="col-md-4 col-12 card mx-2 mb-5">
                                            <Media className="px-3 py-3">
                                              <Media left>
                                                <img
                                                  src={
                                                    this.state
                                                      .preferred_partners_list_image[
                                                      index
                                                    ].company_logo !== null &&
                                                    this.state
                                                      .preferred_partners_list_image[
                                                      index
                                                    ].company_logo !== ""
                                                      ? imgpath +
                                                        "/Agent/" +
                                                        this.state
                                                          .preferred_partners_list_image[
                                                          index
                                                        ].company_logo
                                                      : partner1
                                                  }
                                                  className="pref-img"
                                                />
                                              </Media>
                                              <Media body className="pl-3">
                                                <Media heading>{name}</Media>
                                                <p>
                                                  {
                                                    this.state
                                                      .preferred_partners_list_acc_type[
                                                      index
                                                    ]
                                                  }
                                                </p>
                                                <ListGroup horizontal>
                                                  <ListGroupItem tag="a">
                                                    <img
                                                      src={Phoneicon}
                                                      className="ag-icon"
                                                    />
                                                    &nbsp;Call{" "}
                                                  </ListGroupItem>
                                                  <ListGroupItem tag="a">
                                                    <img
                                                      src={Mailicon}
                                                      className="ag-icon"
                                                    />
                                                    &nbsp;Email
                                                  </ListGroupItem>
                                                  <ListGroupItem tag="a">
                                                    <img
                                                      src={Calendaricon}
                                                      className="ag-icon"
                                                    />
                                                    &nbsp;Meeting
                                                  </ListGroupItem>
                                                </ListGroup>
                                              </Media>
                                            </Media>
                                            <div className="mx-2">
                                              <h5>
                                                91% of application success
                                              </h5>
                                              <div className="mb-1">
                                                <Progress value="91"></Progress>
                                              </div>
                                              <p>Last worked 1year ago</p>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )
                                  : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="row">
									<div className="col-12 my-3">
									<h1 className="contact-title">contact us</h1>
									</div>

									<div className="col-12 mb-3">
										<p className="contact-letter">
											General enquiries and campus contacts
										</p>
									</div>
							</div> */}

                        {/* {this.state.campus.map(campus => (
									<div className="row">
										<div className="col-12">
											<div className="contact-header-title">
												<h3>{campus.location}</h3>
											</div>
										</div>
										<div className="col-12 my-4">
											<p className="campus-name">
											{campus.location}
											</p>
										</div>
										<div className="col-md-3 col-sm-3 col-lg-3 contact-block">
											<Card className="contact-card">
												<CardBody>
													<CardTitle>Opening Hours</CardTitle>
													<CardText>
														8.30 am–5 pm,
														<br /> Mon to Fri
													</CardText>
													<CardText>
														<img
															src={Phoneicon}
															alt="home-icon"
															className="uni-icon pr-2"
														/>{" "}
														+61 3 9244 6100
													</CardText>
												</CardBody>
											</Card>
										</div>
										<div className="col-md-3 col-sm-3 col-lg-3 contact-block">
											<Card className="contact-card">
												<CardBody>
													<CardTitle>Street Address</CardTitle>
													<CardText>
														{campus.address}
													</CardText>
												</CardBody>
											</Card>
										</div>
										<div className="col-md-3 col-sm-3 col-lg-3 contact-block">
											<Card className="contact-card">
												<CardBody>
													<CardTitle>Mailing Address</CardTitle>
													<CardText>
													{campus.address}
													</CardText>
												</CardBody>
											</Card>
										</div>
										<div className="col-md-3 col-sm-3 col-lg-3 contact-block">
											<Card className="contact-card">
												<CardBody>
											
													<CardText>
													<Button color="primary" className="contact-btn-1">Contact us</Button>
													</CardText>
													<CardText>
													<Button color="primary" className="contact-btn-1"> <img
															src={Calendaricon}
															alt="home-icon"
															className="uni-icon pr-2"
														/>{" "}request meeting</Button> 
													</CardText>
												</CardBody>
											</Card>
										</div>
									</div>
								) ) } */}
                      </div>
                      {/* conatct us */}
                    </div>

                    <div className="col-md-12 card review-section card border-transparent mx-0 px-0 row d-none">
                      {/*******Review section*********/}
                      <div
                        className="col-md-12 review-section-pp "
                        id="Reviews"
                      >
                        <a
                          className="col-md-12 backarrow mt-3 pl-md-5 pt-3"
                          href="#/profile"
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
                        <h2 className="col-md-12 review-title  about-title mt-4 mb-3 pl-md-5">
                          {" "}
                          REVIEWS{" "}
                        </h2>
                        <div className="row col-12">
                          <div className="col-6 pl-5">
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
                                  <span className="font-weight-bold">
                                    {" "}
                                    Poor{" "}
                                  </span>
                                ) : (
                                  <span className="font-weight-bold">
                                    Terrible
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="row mt-4">
                              <span className="col-3">5 Excellent</span>{" "}
                              <span className="col-6">
                                <Progress
                                  color="warning"
                                  value={
                                    this.state.star_percentage.totalfivestar
                                  }
                                />
                              </span>{" "}
                              <span className="col-3 row">
                                <span class="review-ellipsis text-nowrap">{this.state.star_percentage.totalfivestar}</span>%
                              </span>
                            </div>
                            <div className="row mt-1">
                              <span className="col-3">4 Very good</span>{" "}
                              <span className="col-6">
                                <Progress
                                  color="warning"
                                  value={
                                    this.state.star_percentage.totalfourstar
                                  }
                                />
                              </span>{" "}
                              <span className="col-3 row">
                              <span class="review-ellipsis text-nowrap">{this.state.star_percentage.totalfourstar}</span>%
                              </span>
                            </div>
                            <div className="row mt-1">
                              <span className="col-3">3 Average</span>{" "}
                              <span className="col-6">
                                <Progress
                                  color="warning"
                                  value={
                                    this.state.star_percentage.totalthreestar
                                  }
                                />
                              </span>{" "}
                              <span className="col-3 row">
                              <span class="review-ellipsis text-nowrap">{this.state.star_percentage.totalthreestar}</span>%
                              </span>
                            </div>
                            <div className="row mt-1">
                              <span className="col-3">2 Poor</span>{" "}
                              <span className="col-6">
                                <Progress
                                  color="warning"
                                  value={
                                    this.state.star_percentage.totalsecondstar
                                  }
                                />
                              </span>{" "}
                              <span className="col-3 row">
                              <span class="review-ellipsis text-nowrap">{this.state.star_percentage.totalsecondstar}</span>%
                              </span>
                            </div>
                            <div className="row mt-1">
                              <span className="col-3">Terrible</span>{" "}
                              <span className="col-6">
                                <Progress
                                  color="warning"
                                  value={
                                    this.state.star_percentage.totalonestar
                                  }
                                />
                              </span>{" "}
                              <span className="col-3 row">
                              <span class="review-ellipsis text-nowrap">{this.state.star_percentage.totalonestar}</span>%
                              </span>
                            </div>
                          </div>

                          <div className="col-2 py-5 mx-5 select-wrapper">
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
                              className="nav-link btn font-10 weight-600 btn-primary inti-btn active mt-3 black-outline box-shadow-high"
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

                      <div className="col-md-11 mx-5 mb-5 review-section-pp">
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
                                  <div className="col-10">
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
                                                      this.state.studpname ===
                                                      null
                                                        ? formee_logo
                                                        : baseurl +
                                                          this.state.studpname
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
                                                          .handleEditCommentText
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

                                  <div className="col-2">{item.datechange}</div>
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
                                      {item.comment.length} Comment
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
                                                    ? it.sender_type === "Agent"
                                                      ? baseurl +
                                                        "/Agent/" +
                                                        it.sender_image
                                                      : baseurl +
                                                        it.sender_image
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
                                                                        .studpname ===
                                                                      null
                                                                        ? formee_logo
                                                                        : baseurl +
                                                                          this
                                                                            .state
                                                                            .studpname
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
                                                                          .handleEditCommentText
                                                                      }
                                                                      name="firstname"
                                                                      value={
                                                                        this
                                                                          .state
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
                                            this.state.studpname === null
                                              ? formee_logo
                                              : baseurl + this.state.studpname
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
      </div>
    );
  }
}

export default Viewus;
